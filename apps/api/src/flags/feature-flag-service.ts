import type { FeatureFlag, FeatureFlagState } from "../models/feature-flag";
import type { FeatureFlagAuditRepo } from "./feature-flag-audit-repo";

export interface FeatureFlagServiceAPI {
  isEnabled(key: string, environment: string, competitionId?: string): boolean;
  setFlag(input: SetFeatureFlagInput): FeatureFlag;
}

export interface SetFeatureFlagInput {
  key: string;
  environment: string;
  competitionId?: string;
  state: FeatureFlagState;
  actor: string;
  reason: string;
}

export class FeatureFlagService implements FeatureFlagServiceAPI {
  private readonly flags = new Map<string, FeatureFlag>();
  private readonly auditRepo: FeatureFlagAuditRepo;

  constructor(auditRepo: FeatureFlagAuditRepo) {
    this.auditRepo = auditRepo;
  }

  isEnabled(key: string, environment: string, competitionId?: string): boolean {
    const scoped = this.flags.get(this.makeKey(key, environment, competitionId));
    if (scoped) {
      return scoped.state === "ON";
    }

    const global = this.flags.get(this.makeKey(key, environment));
    if (global) {
      return global.state === "ON";
    }

    return false;
  }

  setFlag(input: SetFeatureFlagInput): FeatureFlag {
    const flag: FeatureFlag = {
      key: input.key,
      environment: input.environment,
      competitionId: input.competitionId,
      state: input.state,
    };

    this.flags.set(this.makeKey(input.key, input.environment, input.competitionId), flag);
    this.auditRepo.append({
      key: input.key,
      environment: input.environment,
      competitionId: input.competitionId,
      actor: input.actor,
      reason: input.reason,
      changedAtIso: new Date().toISOString(),
      newState: input.state,
    });

    return flag;
  }

  private makeKey(key: string, environment: string, competitionId?: string): string {
    return `${environment}:${key}:${competitionId ?? "GLOBAL"}`;
  }
}

