export type FeatureFlagState = "ON" | "OFF";

export interface FeatureFlag {
  key: string;
  environment: string;
  competitionId?: string;
  state: FeatureFlagState;
}

export interface FeatureFlagAuditEntry {
  key: string;
  environment: string;
  competitionId?: string;
  actor: string;
  reason: string;
  changedAtIso: string;
  newState: FeatureFlagState;
}

