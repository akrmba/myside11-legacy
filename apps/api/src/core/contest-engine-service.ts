import type { ContestDefinition, ContestEntry } from "../models/contest-entry";
import { RosterValidator } from "./roster-validator";
import { ScoringOrchestrator, type ScoreDelta } from "./scoring-orchestrator";

export interface ContestEngineAPI {
  submitLineup(input: SubmitLineupInput): ContestEntry;
  scoreEntry(entry: ContestEntry, deltas: ScoreDelta[]): number;
}

export interface SubmitLineupInput {
  contest: ContestDefinition;
  userId: string;
  lineupPlayerIds: string[];
  submittedAtIso: string;
}

export class ContestEngineService implements ContestEngineAPI {
  private readonly rosterValidator = new RosterValidator();
  private readonly scoring = new ScoringOrchestrator();

  submitLineup(input: SubmitLineupInput): ContestEntry {
    if (new Date(input.submittedAtIso) >= new Date(input.contest.lockAtIso)) {
      throw new Error("Contest is locked");
    }

    this.rosterValidator.validate({
      lineupPlayerIds: input.lineupPlayerIds,
      minRosterSize: input.contest.minRosterSize,
      maxRosterSize: input.contest.maxRosterSize,
    });

    return {
      contestId: input.contest.contestId,
      userId: input.userId,
      lineupPlayerIds: [...input.lineupPlayerIds],
      submittedAtIso: input.submittedAtIso,
    };
  }

  scoreEntry(entry: ContestEntry, deltas: ScoreDelta[]): number {
    return this.scoring.scoreLineup(entry.lineupPlayerIds, deltas);
  }
}

