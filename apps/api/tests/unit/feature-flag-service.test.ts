import assert from "node:assert/strict";
import test from "node:test";
import { InMemoryFeatureFlagAuditRepo } from "../../src/flags/feature-flag-audit-repo";
import { FeatureFlagService } from "../../src/flags/feature-flag-service";

test("feature flags default to OFF and support scoped overrides", () => {
  const auditRepo = new InMemoryFeatureFlagAuditRepo();
  const service = new FeatureFlagService(auditRepo);

  assert.equal(service.isEnabled("near_live_fast", "prod"), false);

  service.setFlag({
    key: "near_live_fast",
    environment: "prod",
    state: "ON",
    actor: "admin-1",
    reason: "staged rollout",
  });

  assert.equal(service.isEnabled("near_live_fast", "prod"), true);
});

