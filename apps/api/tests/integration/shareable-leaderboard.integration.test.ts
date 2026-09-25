import assert from "node:assert/strict";
import test from "node:test";
import { ShareableLeaderboardController } from "../../src/api/shareable-leaderboard-controller";

test("shareable leaderboard strips direct user ids", () => {
  const controller = new ShareableLeaderboardController();
  const rows = controller.getShareableView([{ userId: "user-secret-1", rank: 1, points: 222 }]);
  assert.match(rows[0].alias, /^Player-/);
});

