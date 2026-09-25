import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

test("EntitlementDecisionAPI contract is defined", () => {
  const content = readFileSync(
    join(
      process.cwd(),
      "golden/contracts/subscription-entitlement-check-interface.md",
    ),
    "utf8",
  );
  assert.match(content, /EntitlementDecisionAPI/);
  assert.match(content, /UNKNOWN/);
});
