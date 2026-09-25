export const analyticsEventMap = {
  nearLiveExpected: "near_live.expected",
  nearLiveDelayed: "near_live.delayed",
  nearLiveOutage: "near_live.outage",
  inviteIssued: "league.invite.issued",
  inviteJoined: "league.invite.joined",
  adsSuppressed: "ads.suppressed",
  entitlementUnknown: "entitlement.unknown",
} as const;

export type AnalyticsEventName = (typeof analyticsEventMap)[keyof typeof analyticsEventMap];

