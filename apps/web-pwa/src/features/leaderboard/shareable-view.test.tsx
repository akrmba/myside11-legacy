import assert from "node:assert/strict";
import test from "node:test";
import { renderShareableLeaderboard } from "./shareable-view";

test("shareable leaderboard rendering uses aliases", () => {
  const html = renderShareableLeaderboard([{ alias: "Player-abc123", rank: 1, points: 100 }]);
  assert.match(html, /Player-abc123/);
});

