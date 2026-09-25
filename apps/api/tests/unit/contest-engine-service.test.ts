import assert from "node:assert/strict";
import test from "node:test";
import { ContestEngineService } from "../../src/core/contest-engine-service";

test("lineup submission before lock is accepted", () => {
  const service = new ContestEngineService();
  const entry = service.submitLineup({
    contest: {
      contestId: "contest-1",
      lockAtIso: "2026-02-15T14:00:00Z",
      minRosterSize: 2,
      maxRosterSize: 5,
    },
    userId: "user-1",
    lineupPlayerIds: ["player-a", "player-b"],
    submittedAtIso: "2026-02-15T13:00:00Z",
  });

  assert.equal(entry.contestId, "contest-1");
  assert.equal(entry.lineupPlayerIds.length, 2);
});

