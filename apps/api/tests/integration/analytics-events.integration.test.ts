import assert from "node:assert/strict";
import test from "node:test";
import { AnalyticsEventPublisher } from "../../src/analytics/analytics-event-publisher";
import { analyticsEventMap } from "../../src/analytics/analytics-event-map";

test("analytics publisher records near-live and entitlement events", () => {
  const publisher = new AnalyticsEventPublisher();
  publisher.publish(analyticsEventMap.nearLiveDelayed, { competitionId: "comp-1" });
  publisher.publish(analyticsEventMap.entitlementUnknown, { userId: "user-9" });

  const events = publisher.history();
  assert.equal(events.length, 2);
});

