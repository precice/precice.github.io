#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { load } from "cheerio";

const HEADING_SELECTOR = "h1,h2,h3,h4,h5,h6";
const EXCLUDED_SELECTOR = "script,style,iframe";
const CALLOUT_SELECTOR = ".alert,[role='alert']";

// Preserve the production Algolia ranking and highlighting contract.
export const INDEX_SETTINGS = Object.freeze({
  searchableAttributes: [
    "title",
    "headings",
    "unordered(content)",
    "collection,categories,tags",
  ],
  customRanking: [
    "desc(date)",
    "desc(custom_ranking.heading)",
    "asc(custom_ranking.position)",
  ],
  unretrievableAttributes: ["custom_ranking"],
  attributesToHighlight: [
    "title",
    "headings",
    "content",
    "html",
    "collection",
    "categories",
    "tags",
  ],
  highlightPreTag: '<em class="ais-Highlight">',
  highlightPostTag: "</em>",
  attributesToSnippet: ["content:55"],
  snippetEllipsisText: "…",
  distinct: true,
  attributeForDistinct: "url",
  attributesForFaceting: [
    "type",
    "searchable(collection)",
    "searchable(categories)",
    "searchable(tags)",
    "searchable(title)",
  ],
});

export function parseCliArgs(args) {
  const options = {
    batchSize: 1000,
    dryRun: false,
    input: "public/algolia.json",
    maxRecordSize: undefined,
  };

  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index];

    if (argument === "--dry-run") {
      options.dryRun = true;
      continue;
    }

    if (argument === "--help" || argument === "-h") {
      options.help = true;
      continue;
    }

    if (argument === "--input" || argument === "--batch-size" || argument === "--max-record-size") {
      const value = args[index + 1];
      if (!value || value.startsWith("--")) {
        throw new Error(`Missing value for ${argument}.`);
      }
      index += 1;

      if (argument === "--input") {
        options.input = value;
      } else if (argument === "--batch-size") {
        options.batchSize = positiveInteger(value, argument);
      } else {
        options.maxRecordSize = positiveInteger(value, argument);
      }
      continue;
    }

    throw new Error(`Unknown option: ${argument}`);
  }

  return options;
}

export function validateSearchExport(searchExport) {
  if (!searchExport || typeof searchExport !== "object" || Array.isArray(searchExport)) {
    throw new Error("Algolia export must be a JSON object.");
  }
  if (searchExport.schemaVersion !== 1) {
    throw new Error(`Unsupported Algolia export schema: ${searchExport.schemaVersion}.`);
  }
  if (!Array.isArray(searchExport.pages)) {
    throw new Error("Algolia export must contain a pages array.");
  }
  if (typeof searchExport.nodesToIndex !== "string" || !searchExport.nodesToIndex.trim()) {
    throw new Error("Algolia export must define nodesToIndex.");
  }
  if (!Number.isInteger(searchExport.maxRecordSize) || searchExport.maxRecordSize <= 0) {
    throw new Error("Algolia export must define a positive integer maxRecordSize.");
  }

  for (const page of searchExport.pages) {
    if (!page || typeof page !== "object") {
      throw new Error("Algolia export contains an invalid page.");
    }
    if (typeof page.title !== "string" || typeof page.url !== "string") {
      throw new Error("Every Algolia export page must contain title and url strings.");
    }
    if (typeof page.html !== "string" || typeof page.plain !== "string") {
      throw new Error("Every Algolia export page must contain html and plain strings.");
    }
  }

  return searchExport;
}

export function createRecords(searchExport, options = {}) {
  validateSearchExport(searchExport);

  const maxRecordSize = options.maxRecordSize ?? searchExport.maxRecordSize;
  if (!Number.isInteger(maxRecordSize) || maxRecordSize <= 0) {
    throw new Error("maxRecordSize must be a positive integer.");
  }

  const records = [];
  for (const page of searchExport.pages) {
    const pageRecords = extractPageRecords(page, searchExport.nodesToIndex);
    for (const record of pageRecords) {
      records.push(...fitRecord(record, maxRecordSize));
    }
  }

  if (records.length === 0) {
    throw new Error("The Algolia export did not produce any indexable records.");
  }

  return records;
}

export function recordByteSize(record) {
  return Buffer.byteLength(JSON.stringify(record), "utf8");
}

export async function readSearchExport(inputPath) {
  let source;
  try {
    source = await readFile(inputPath, "utf8");
  } catch (error) {
    throw new Error(`Unable to read Algolia export at ${inputPath}: ${error.message}`);
  }

  try {
    return validateSearchExport(JSON.parse(source));
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error(`Algolia export at ${inputPath} is not valid JSON: ${error.message}`);
    }
    throw error;
  }
}

export async function uploadRecords({ appId, apiKey, batchSize, indexName, records }) {
  const { algoliasearch } = await import("algoliasearch");
  const client = algoliasearch(appId, apiKey);

  const settingsResponse = await client.setSettings({
    indexName,
    indexSettings: INDEX_SETTINGS,
  });
  await client.waitForTask({ indexName, taskID: settingsResponse.taskID });

  return client.replaceAllObjects({
    indexName,
    objects: records,
    batchSize,
    scopes: ["settings", "rules", "synonyms"],
  });
}

export async function run(options, environment = process.env, logger = console) {
  const inputPath = path.resolve(options.input);
  const searchExport = await readSearchExport(inputPath);
  const records = createRecords(searchExport, options);
  const maxRecordSize = options.maxRecordSize ?? searchExport.maxRecordSize;

  logger.log(
    `Prepared ${records.length} Algolia records from ${searchExport.pages.length} pages ` +
      `(maximum record size: ${maxRecordSize} bytes).`,
  );

  if (options.dryRun) {
    logger.log("Dry run complete. No Algolia request was made.");
    return records;
  }

  const appId = environment.ALGOLIA_APP_ID;
  const apiKey = environment.ALGOLIA_WRITE_API_KEY;
  const indexName = environment.ALGOLIA_INDEX_NAME;
  const missing = [
    ["ALGOLIA_APP_ID", appId],
    ["ALGOLIA_WRITE_API_KEY", apiKey],
    ["ALGOLIA_INDEX_NAME", indexName],
  ]
    .filter(([, value]) => !value)
    .map(([name]) => name);

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(", ")}.`);
  }

  await uploadRecords({
    appId,
    apiKey,
    batchSize: options.batchSize,
    indexName,
    records,
  });
  logger.log(`Replaced all records in Algolia index ${indexName}.`);

  return records;
}

function extractPageRecords(page, nodesToIndex) {
  const $ = load(page.html);
  let nodes;
  try {
    nodes = $(`${HEADING_SELECTOR},${nodesToIndex}`).toArray();
  } catch (error) {
    throw new Error(`Invalid nodesToIndex selector ${JSON.stringify(nodesToIndex)}: ${error.message}`);
  }

  const hierarchy = Array(6).fill(null);
  const shared = sharedPageFields(page);
  const records = [];
  let anchor = "";
  let headingLevel = null;
  let position = 0;

  for (const node of nodes) {
    const element = $(node);
    if (isExcludedFromSearch(element)) {
      continue;
    }

    const tagName = node.tagName?.toLowerCase();

    if (tagName && /^h[1-6]$/.test(tagName)) {
      headingLevel = Number(tagName[1]) - 1;
      hierarchy[headingLevel] = normaliseWhitespace(element.text());
      hierarchy.fill(null, headingLevel + 1);
      anchor = findAnchor($, element) || anchor;
    }

    if (!element.is(nodesToIndex)) {
      continue;
    }

    const searchableElement = element.clone();
    searchableElement.find(EXCLUDED_SELECTOR).remove();
    const content = normaliseWhitespace(searchableElement.text());
    if (!content) {
      continue;
    }

    records.push({
      ...shared,
      anchor,
      content,
      custom_ranking: {
        heading: headingWeight(headingLevel),
        position,
      },
      headings: hierarchy.filter(Boolean),
      html: $.html(searchableElement).trim(),
    });
    position += 1;
  }

  if (records.length > 0) {
    return records;
  }

  const fallbackContent = searchableDocumentText($) || page.title;
  return [
    {
      ...shared,
      anchor: "",
      content: fallbackContent,
      custom_ranking: { heading: 100, position: 0 },
      headings: [],
      html: escapeHtml(fallbackContent),
    },
  ];
}

function isExcludedFromSearch(element) {
  return element.is(EXCLUDED_SELECTOR) || element.closest(`${EXCLUDED_SELECTOR},${CALLOUT_SELECTOR}`).length > 0;
}

function searchableDocumentText($) {
  const document = $.root().clone();
  document.find(`${EXCLUDED_SELECTOR},${CALLOUT_SELECTOR}`).remove();
  return normaliseWhitespace(document.text());
}

function sharedPageFields(page) {
  const record = {
    categories: normaliseArray(page.categories),
    collection: page.section || undefined,
    date: Number.isInteger(page.date) ? page.date : undefined,
    keywords: normaliseSearchValue(page.keywords),
    tags: normaliseArray(page.tags),
    title: page.title,
    type: page.kind || "page",
    url: page.url,
  };

  return removeUndefined(record);
}

function fitRecord(record, maxRecordSize) {
  const completed = withObjectId(record);
  if (recordByteSize(completed) <= maxRecordSize) {
    return [completed];
  }

  const baseRecord = { ...record };
  const fragments = [];
  const words = record.content.match(/\S+/gu) ?? [];
  let fragment = "";

  for (const word of words) {
    const candidate = fragment ? `${fragment} ${word}` : word;
    if (fitsAsTextRecord(baseRecord, candidate, fragments.length, maxRecordSize)) {
      fragment = candidate;
      continue;
    }

    if (fragment) {
      fragments.push(textRecord(baseRecord, fragment, fragments.length));
      fragment = "";
    }

    if (fitsAsTextRecord(baseRecord, word, fragments.length, maxRecordSize)) {
      fragment = word;
      continue;
    }

    fragments.push(...splitLongWord(baseRecord, word, fragments.length, maxRecordSize));
  }

  if (fragment) {
    fragments.push(textRecord(baseRecord, fragment, fragments.length));
  }

  if (fragments.length === 0) {
    throw new Error(`Record for ${record.url} cannot fit within ${maxRecordSize} bytes.`);
  }

  return fragments;
}

function fitsAsTextRecord(baseRecord, content, fragmentIndex, maxRecordSize) {
  return recordByteSize(textRecord(baseRecord, content, fragmentIndex)) <= maxRecordSize;
}

function splitLongWord(baseRecord, word, startIndex, maxRecordSize) {
  const fragments = [];
  let fragment = "";

  for (const character of word) {
    const candidate = `${fragment}${character}`;
    if (fitsAsTextRecord(baseRecord, candidate, startIndex + fragments.length, maxRecordSize)) {
      fragment = candidate;
      continue;
    }

    if (!fragment) {
      throw new Error(`Record for ${baseRecord.url} cannot fit within ${maxRecordSize} bytes.`);
    }

    fragments.push(textRecord(baseRecord, fragment, startIndex + fragments.length));
    fragment = character;
  }

  if (fragment) {
    fragments.push(textRecord(baseRecord, fragment, startIndex + fragments.length));
  }

  return fragments;
}

function textRecord(baseRecord, content, fragmentIndex) {
  return withObjectId({
    ...baseRecord,
    content,
    html: escapeHtml(content),
    custom_ranking: {
      ...baseRecord.custom_ranking,
      position: baseRecord.custom_ranking.position + fragmentIndex / 1000,
    },
  });
}

function withObjectId(record) {
  const objectID = createHash("sha256")
    .update(JSON.stringify(record))
    .digest("hex");
  return { ...record, objectID };
}

function findAnchor($, element) {
  const directAnchor = element.attr("name") || element.attr("id");
  if (directAnchor) {
    return directAnchor;
  }

  const descendant = element.find("[name],[id]").first();
  return descendant.attr("name") || descendant.attr("id") || "";
}

function headingWeight(level) {
  return level === null ? 100 : 100 - (level + 1) * 10;
}

function normaliseWhitespace(value) {
  return String(value ?? "").replace(/\s+/gu, " ").trim();
}

function normaliseArray(value) {
  if (value === null || value === undefined || value === "") {
    return [];
  }
  return Array.isArray(value) ? value.map(String).filter(Boolean) : [String(value)];
}

function normaliseSearchValue(value) {
  if (value === null || value === undefined || value === "") {
    return undefined;
  }
  return Array.isArray(value) ? value.map(String).filter(Boolean) : String(value);
}

function removeUndefined(object) {
  return Object.fromEntries(Object.entries(object).filter(([, value]) => value !== undefined));
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/gu, (character) => {
    const replacements = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return replacements[character];
  });
}

function positiveInteger(value, optionName) {
  const number = Number(value);
  if (!Number.isInteger(number) || number <= 0) {
    throw new Error(`${optionName} must be a positive integer.`);
  }
  return number;
}

function printHelp() {
  console.log(`Usage: npm run algolia:index -- [options]

Options:
  --input <path>             Hugo export to read (default: public/algolia.json)
  --dry-run                  Validate and transform records without uploading
  --max-record-size <bytes>  Override the Hugo export record-size limit
  --batch-size <count>       Records per Algolia batch (default: 1000)
  -h, --help                 Show this help text

Environment variables for uploads:
  ALGOLIA_APP_ID
  ALGOLIA_WRITE_API_KEY
  ALGOLIA_INDEX_NAME`);
}

async function main() {
  const options = parseCliArgs(process.argv.slice(2));
  if (options.help) {
    printHelp();
    return;
  }
  await run(options);
}

const executedAsCli = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (executedAsCli) {
  main().catch((error) => {
    console.error(`Algolia indexing failed: ${error.message}`);
    process.exitCode = 1;
  });
}
