export type EntitlementState = "PRO" | "FREE" | "UNKNOWN";

export interface EntitlementDecision {
  state: EntitlementState;
  adsAllowed: boolean;
  proFeaturesAllowed: boolean;
  reason: string;
}

export interface EntitlementDecisionServiceAPI {
  decide(state: EntitlementState): EntitlementDecision;
}

export class EntitlementDecisionService implements EntitlementDecisionServiceAPI {
  decide(state: EntitlementState): EntitlementDecision {
    if (state === "PRO") {
      return {
        state,
        adsAllowed: false,
        proFeaturesAllowed: true,
        reason: "PRO_ACTIVE",
      };
    }

    if (state === "FREE") {
      return {
        state,
        adsAllowed: true,
        proFeaturesAllowed: false,
        reason: "FREE_TIER",
      };
    }

    return {
      state,
      adsAllowed: true,
      proFeaturesAllowed: false,
      reason: "ENTITLEMENT_UNKNOWN",
    };
  }
}

