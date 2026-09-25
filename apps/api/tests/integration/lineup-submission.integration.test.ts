import assert from "node:assert/strict";
import test from "node:test";
import { ContestEngineService } from "../../src/core/contest-engine-service";

test("lineup submission fails after lock", () => {
  const service = new ContestEngineService();

  assert.throws(() =>
    service.submitLineup({
      contest: {
        contestId: "contest-1",
        lockAtIso: "2026-02-15T10:00:00Z",
        minRosterSize: 2,
        maxRosterSize: 5,
      },
      userId: "user-2",
      lineupPlayerIds: ["player-a", "player-b"],
      submittedAtIso: "2026-02-15T10:00:00Z",
    }),
  );
});

