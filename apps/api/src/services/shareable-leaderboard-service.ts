export interface ShareableLeaderboardRow {
  alias: string;
  rank: number;
  points: number;
}

export class ShareableLeaderboardService {
  toShareable(rows: Array<{ userId: string; rank: number; points: number }>): ShareableLeaderboardRow[] {
    return rows.map((row) => ({
      alias: `Player-${row.userId.slice(0, 6)}`,
      rank: row.rank,
      points: row.points,
    }));
  }
}

