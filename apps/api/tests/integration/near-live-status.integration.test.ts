import assert from "node:assert/strict";
import test from "node:test";
import { NearLiveController } from "../../src/api/near-live-controller";

test("near-live status reports delayed state with message", () => {
  const controller = new NearLiveController();
  const snapshot = controller.getNearLiveStatus(
    "2026-02-15T12:05:01Z",
    "2026-02-15T12:00:00Z",
  );

  assert.equal(snapshot.state, "Delayed");
  assert.match(snapshot.message, /delayed/i);
});

