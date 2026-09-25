import type { ScoreEvent } from "../models/score-event";

export interface LeaderboardRow {
  userId: string;
  points: number;
  rank: number;
}

export class LeaderboardProjector {
  project(entries: Record<string, string[]>, events: ScoreEvent[]): LeaderboardRow[] {
    const playerPoints = new Map<string, number>();
    for (const event of events) {
      playerPoints.set(event.playerId, (playerPoints.get(event.playerId) ?? 0) + event.delta);
    }

    const rows: LeaderboardRow[] = Object.entries(entries).map(([userId, lineup]) => {
      const points = lineup.reduce((sum, playerId) => sum + (playerPoints.get(playerId) ?? 0), 0);
      return { userId, points, rank: 0 };
    });

    rows.sort((a, b) => b.points - a.points);
    rows.forEach((row, index) => {
      row.rank = index + 1;
    });
    return rows;
  }
}

