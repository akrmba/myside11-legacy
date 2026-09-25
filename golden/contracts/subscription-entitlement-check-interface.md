# Subscription Entitlement Check Interface

- Contract ID: `subscription-entitlement-check-interface`
- Public Interface: `EntitlementDecisionAPI`
- Version: `1.0.0`
- Status: Active
- Last Updated: 2026-02-15

## Purpose

Standardize server-side entitlement decisions across web and Android purchase
sources without trusting client-side state.

## Interface

```ts
export interface EntitlementDecisionAPI {
  evaluate(request: EntitlementDecisionRequest): Promise<EntitlementDecisionResponse>;
}

export type EntitlementState = "PRO" | "FREE" | "UNKNOWN";
```

## Request/Response Shape

```ts
export interface EntitlementDecisionRequest {
  userId: string;
  productScope: "global" | "competition";
  competitionId?: string;
  asOfIso: string;
  traceId: string;
}

export interface EntitlementDecisionResponse {
  state: EntitlementState;
  adsAllowed: boolean;
  proFeaturesAllowed: boolean;
  reasonCode: string;
  source: "web-billing" | "android-billing" | "cached";
  nextRecheckAtIso?: string;
}
```

## Fallback Rule

- `UNKNOWN` must degrade safely to Free behavior (`adsAllowed=true`,
  `proFeaturesAllowed=false`) until re-check succeeds.

## Example (Fake Data)

```json
{
  "state": "UNKNOWN",
  "adsAllowed": true,
  "proFeaturesAllowed": false,
  "reasonCode": "BILLING_UNAVAILABLE",
  "source": "cached",
  "nextRecheckAtIso": "2026-02-15T12:18:00Z"
}
```
