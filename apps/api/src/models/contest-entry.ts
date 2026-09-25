export interface ContestEntry {
  contestId: string;
  userId: string;
  lineupPlayerIds: string[];
  submittedAtIso: string;
}

export interface ContestDefinition {
  contestId: string;
  lockAtIso: string;
  minRosterSize: number;
  maxRosterSize: number;
}

