import assert from "node:assert/strict";
import test from "node:test";
import { renderFollowAlongView } from "./follow-along-view";

test("follow along view renders delayed messaging", () => {
  const html = renderFollowAlongView({
    state: "Delayed",
    lastUpdatedIso: "2026-02-15T12:00:00Z",
    pointsText: "Points: 74",
    rankText: "Rank: 12",
  });

  assert.match(html, /Data is delayed/);
});

