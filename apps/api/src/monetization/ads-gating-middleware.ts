import type { EntitlementDecision } from "../entitlements/entitlement-decision-service";

export function shouldRequestAds(decision: EntitlementDecision): boolean {
  return decision.adsAllowed;
}

