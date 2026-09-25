import {
  EntitlementDecisionService,
  type EntitlementState,
} from "../entitlements/entitlement-decision-service";
import { shouldRequestAds } from "../monetization/ads-gating-middleware";

export class EntitlementsController {
  private readonly service = new EntitlementDecisionService();

  evaluate(state: EntitlementState) {
    const decision = this.service.decide(state);
    return {
      ...decision,
      shouldRequestAds: shouldRequestAds(decision),
    };
  }
}

