import type { ScoreEvent } from "../models/score-event";
import { LeaderboardProjector, type LeaderboardRow } from "../read-models/leaderboard-projector";

export interface PointsReplayAPI {
  replay(entries: Record<string, string[]>, events: ScoreEvent[]): LeaderboardRow[];
}

export class PointsReplayRunner implements PointsReplayAPI {
  private readonly projector = new LeaderboardProjector();

  replay(entries: Record<string, string[]>, events: ScoreEvent[]): LeaderboardRow[] {
    const ordered = [...events].sort((a, b) => a.sequenceNumber - b.sequenceNumber);
    return this.projector.project(entries, ordered);
  }
}

