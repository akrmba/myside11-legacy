import assert from "node:assert/strict";
import test from "node:test";
import { LeaderboardProjector } from "../../src/read-models/leaderboard-projector";

test("leaderboard projector ranks by descending points", () => {
  const projector = new LeaderboardProjector();
  const rows = projector.project(
    { "user-1": ["p-1"], "user-2": ["p-2"] },
    [
      { matchId: "m-1", sequenceNumber: 1, playerId: "p-1", delta: 3, occurredAtIso: "t" },
      { matchId: "m-1", sequenceNumber: 2, playerId: "p-2", delta: 1, occurredAtIso: "t" },
    ],
  );

  assert.equal(rows[0].rank, 1);
  assert.equal(rows[1].rank, 2);
});

