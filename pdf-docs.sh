#!/bin/sh

set -eu

pdf_port="${PDF_PORT:-4173}"
pdf_build_dir="${PDF_BUILD_DIR:-public-pdf}"
pdf_output="${PDF_OUTPUT:-pdf/docs.pdf}"
pdf_base_url="http://127.0.0.1:${pdf_port}/"
pdf_server_log=$(mktemp "${TMPDIR:-/tmp}/precice-pdf-server.XXXXXX")
pdf_server_pid=""

cleanup() {
  if [ -n "${pdf_server_pid}" ]; then
    kill "${pdf_server_pid}" 2>/dev/null || true
    wait "${pdf_server_pid}" 2>/dev/null || true
  fi
  rm -f "${pdf_server_log}"
}
trap cleanup EXIT INT TERM

for command in hugo prince python3 curl; do
  if ! command -v "${command}" >/dev/null 2>&1; then
    echo "Required command not found: ${command}" >&2
    exit 1
  fi
done

hugo --gc --minify --cleanDestinationDir \
  --environment pdf \
  --renderSegments pdf \
  --destination "${pdf_build_dir}" \
  --baseURL "${pdf_base_url}"

pdf_input_list="${pdf_build_dir}/pdf/prince-list.txt"
if [ ! -s "${pdf_input_list}" ]; then
  echo "Hugo did not generate ${pdf_input_list}" >&2
  exit 1
fi

python3 -m http.server "${pdf_port}" \
  --bind 127.0.0.1 \
  --directory "${pdf_build_dir}" \
  >"${pdf_server_log}" 2>&1 &
pdf_server_pid=$!

pdf_attempt=0
until curl --fail --silent --output /dev/null "${pdf_base_url}pdf/title.html"; do
  pdf_attempt=$((pdf_attempt + 1))
  if [ "${pdf_attempt}" -ge 20 ]; then
    cat "${pdf_server_log}" >&2
    echo "Timed out waiting for the local PDF server." >&2
    exit 1
  fi
  sleep 0.25
done

mkdir -p "$(dirname "${pdf_output}")"
prince --javascript \
  --input-list="${pdf_input_list}" \
  -o "${pdf_output}"

echo "Generated ${pdf_output}"
