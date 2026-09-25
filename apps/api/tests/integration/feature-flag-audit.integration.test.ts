import assert from "node:assert/strict";
import test from "node:test";
import { InMemoryFeatureFlagAuditRepo } from "../../src/flags/feature-flag-audit-repo";
import { FeatureFlagService } from "../../src/flags/feature-flag-service";

test("feature flag updates emit audit entries", () => {
  const repo = new InMemoryFeatureFlagAuditRepo();
  const service = new FeatureFlagService(repo);

  service.setFlag({
    key: "near_live_fast",
    environment: "staging",
    competitionId: "comp-1",
    state: "ON",
    actor: "ops-1",
    reason: "canary",
  });

  const entries = repo.list();
  assert.equal(entries.length, 1);
  assert.equal(entries[0].actor, "ops-1");
  assert.equal(entries[0].competitionId, "comp-1");
});

