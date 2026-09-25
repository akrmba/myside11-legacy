import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

test("VendorIngestEventSchema contract is defined", () => {
  const content = readFileSync(
    join(process.cwd(), "golden/contracts/vendor-ingest-schema-boundary.md"),
    "utf8",
  );
  assert.match(content, /VendorIngestEventSchema/);
  assert.match(content, /idempotencyKey/);
});
