import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

test("ProviderDataAdapter contract is defined", () => {
  const content = readFileSync(
    join(process.cwd(), "golden/contracts/provider-adapter-interface.md"),
    "utf8",
  );
  assert.match(content, /ProviderDataAdapter/);
  assert.match(content, /Version: `1.0.0`/);
});
