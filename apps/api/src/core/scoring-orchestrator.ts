export interface ScoreDelta {
  playerId: string;
  delta: number;
}

export class ScoringOrchestrator {
  scoreLineup(lineupPlayerIds: string[], deltas: ScoreDelta[]): number {
    const byPlayer = new Map<string, number>();
    for (const delta of deltas) {
      byPlayer.set(delta.playerId, (byPlayer.get(delta.playerId) ?? 0) + delta.delta);
    }

    return lineupPlayerIds.reduce((sum, playerId) => sum + (byPlayer.get(playerId) ?? 0), 0);
  }
}

