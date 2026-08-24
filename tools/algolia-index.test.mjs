import assert from "node:assert/strict";
import test from "node:test";
import {
  createRecords,
  parseCliArgs,
  recordByteSize,
  validateSearchExport,
} from "./algolia-index.mjs";

const searchExport = {
  schemaVersion: 1,
  nodesToIndex: "p,code,table",
  maxRecordSize: 20_000,
  pages: [
    {
      title: "Example Guide",
      url: "/docs/example/",
      html: `
        <h2 id="install">Installation</h2>
        <p>Use <code>tool-config</code> to configure the application.</p>
        <table><tbody><tr><td>Property</td><td>Value</td></tr></tbody></table>
        <script>ignored content</script>
      `,
      plain: "Use tool-config to configure the application. Property Value",
      section: "docs",
      kind: "page",
      tags: ["tool"],
      categories: [],
      keywords: "configuration",
      date: 1_784_198_400,
    },
  ],
};

test("creates Jekyll-compatible records with heading and anchor metadata", () => {
  const records = createRecords(searchExport);

  assert.equal(records.length, 3);
  assert.equal(records[0].title, "Example Guide");
  assert.equal(records[0].url, "/docs/example/");
  assert.equal(records[0].anchor, "install");
  assert.deepEqual(records[0].headings, ["Installation"]);
  assert.match(records[0].html, /^<p>/);
  assert.equal(records[1].content, "tool-config");
  assert.equal(records[2].content, "PropertyValue");
  assert.equal(records[0].custom_ranking.heading, 80);
  assert.match(records[0].objectID, /^[a-f0-9]{64}$/);
  assert.equal(records.some((record) => record.content.includes("ignored content")), false);
});

test("creates deterministic object IDs", () => {
  const first = createRecords(searchExport).map((record) => record.objectID);
  const second = createRecords(searchExport).map((record) => record.objectID);

  assert.deepEqual(first, second);
});

test("excludes callouts so a tutorial result starts with its introduction", () => {
  const calloutExport = structuredClone(searchExport);
  calloutExport.nodesToIndex = "p";
  calloutExport.pages[0].html = `
    <div class="alert alert-info" role="alert"><p>Note: Download the example files.</p></div>
    <p>This document introduces the example setup.</p>
  `;
  calloutExport.pages[0].plain = "Note: Download the example files. This document introduces the example setup.";

  const records = createRecords(calloutExport);

  assert.equal(records.length, 1);
  assert.equal(records[0].content, "This document introduces the example setup.");
  assert.equal(records[0].content.includes("Download the example files"), false);
});

test("splits oversized records without exceeding the configured limit", () => {
  const longExport = structuredClone(searchExport);
  longExport.nodesToIndex = "p";
  longExport.pages[0].html = `<p>${"word ".repeat(400)}</p>`;
  longExport.pages[0].plain = "word ".repeat(400);

  const records = createRecords(longExport, { maxRecordSize: 500 });

  assert.ok(records.length > 1);
  assert.ok(records.every((record) => recordByteSize(record) <= 500));
});

test("rejects invalid Hugo exports and command-line arguments", () => {
  assert.throws(() => validateSearchExport({ schemaVersion: 2 }), /Unsupported Algolia export schema/);
  assert.throws(() => parseCliArgs(["--batch-size", "0"]), /positive integer/);
  assert.throws(() => parseCliArgs(["--unexpected"]), /Unknown option/);
});
