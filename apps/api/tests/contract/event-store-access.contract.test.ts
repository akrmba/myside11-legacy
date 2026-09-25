import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

test("EventStoreAccessAPI contract is defined", () => {
  const content = readFileSync(
    join(process.cwd(), "golden/contracts/event-store-access-patterns.md"),
    "utf8",
  );
  assert.match(content, /EventStoreAccessAPI/);
  assert.match(content, /append-only/);
});
