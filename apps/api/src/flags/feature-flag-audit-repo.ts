import type { FeatureFlagAuditEntry } from "../models/feature-flag";

export interface FeatureFlagAuditRepo {
  append(entry: FeatureFlagAuditEntry): void;
  list(): FeatureFlagAuditEntry[];
}

export class InMemoryFeatureFlagAuditRepo implements FeatureFlagAuditRepo {
  private readonly entries: FeatureFlagAuditEntry[] = [];

  append(entry: FeatureFlagAuditEntry): void {
    this.entries.push(entry);
  }

  list(): FeatureFlagAuditEntry[] {
    return [...this.entries];
  }
}

