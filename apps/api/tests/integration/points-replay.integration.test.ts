import assert from "node:assert/strict";
import test from "node:test";
import { PointsReplayRunner } from "../../src/events/points-replay-runner";

test("points replay computes deterministic totals", () => {
  const runner = new PointsReplayRunner();
  const rows = runner.replay(
    { "user-1": ["p-1"], "user-2": ["p-2"] },
    [
      { matchId: "m-1", sequenceNumber: 2, playerId: "p-2", delta: 1, occurredAtIso: "t" },
      { matchId: "m-1", sequenceNumber: 1, playerId: "p-1", delta: 4, occurredAtIso: "t" },
    ],
  );

  assert.equal(rows[0].userId, "user-1");
  assert.equal(rows[0].points, 4);
});

