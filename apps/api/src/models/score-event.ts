export interface ScoreEvent {
  matchId: string;
  sequenceNumber: number;
  playerId: string;
  delta: number;
  occurredAtIso: string;
}

