import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

test("ShareLinkPayloadAPI contract is defined", () => {
  const content = readFileSync(
    join(process.cwd(), "golden/contracts/share-link-payload-rules.md"),
    "utf8",
  );
  assert.match(content, /ShareLinkPayloadAPI/);
  assert.match(content, /must never include direct PII/);
});
