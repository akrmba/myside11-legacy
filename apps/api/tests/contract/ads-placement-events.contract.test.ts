import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

test("AdsPlacementEventAPI contract is defined", () => {
  const content = readFileSync(
    join(process.cwd(), "golden/contracts/ads-placement-events.md"),
    "utf8",
  );
  assert.match(content, /AdsPlacementEventAPI/);
  assert.match(content, /ad_suppressed/);
});
