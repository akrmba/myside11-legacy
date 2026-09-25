export interface ProviderIngestEvent {
  idempotencyKey: string;
  competitionId: string;
  matchId: string;
  sequenceNumber: number;
  occurredAtIso: string;
  payload: Record<string, unknown>;
}

