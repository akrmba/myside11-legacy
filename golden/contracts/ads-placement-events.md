# Ads Placement Events Contract

- Contract ID: `ads-placement-events`
- Public Interface: `AdsPlacementEventAPI`
- Version: `1.0.0`
- Status: Active
- Last Updated: 2026-02-15

## Purpose

Define ad event payloads for free-tier monetization and Pro ad suppression
verification.

## Event Types

- `ad_request`
- `ad_impression`
- `ad_suppressed`

## Common Envelope

```ts
export interface AdsPlacementEvent {
  eventType: "ad_request" | "ad_impression" | "ad_suppressed";
  eventId: string;
  userId: string;
  placement: string;
  competitionId?: string;
  entitlementState: "FREE" | "PRO" | "UNKNOWN";
  occurredAtIso: string;
  traceId: string;
  metadata?: Record<string, string>;
}
```

## Rules

1. Pro users must emit `ad_suppressed` instead of `ad_request`.
2. Unknown entitlement must default to Free handling.
3. No PII (email, phone, exact address) in event metadata.

## Example (Fake Data)

```json
{
  "eventType": "ad_suppressed",
  "eventId": "ad-evt-22",
  "userId": "user-44",
  "placement": "leaderboard_header",
  "competitionId": "comp-ipl-2026",
  "entitlementState": "PRO",
  "occurredAtIso": "2026-02-15T12:14:30Z",
  "traceId": "trace-ads-22",
  "metadata": {
    "reason": "PRO_ENTITLED"
  }
}
```
