import assert from "node:assert/strict";
import test from "node:test";
import { EntitlementsController } from "../../src/api/entitlements-controller";

test("pro users have ads suppressed and pro access enabled", () => {
  const controller = new EntitlementsController();
  const result = controller.evaluate("PRO");
  assert.equal(result.shouldRequestAds, false);
  assert.equal(result.proFeaturesAllowed, true);
});

