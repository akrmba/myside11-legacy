import type { ProviderIngestEvent } from "../../models/provider-ingest-event";

export interface CricketPollingIngestAPI {
  normalize(rawItems: Array<Record<string, unknown>>): ProviderIngestEvent[];
}

export class CricketPollingAdapter implements CricketPollingIngestAPI {
  normalize(rawItems: Array<Record<string, unknown>>): ProviderIngestEvent[] {
    return rawItems.map((item, index) => ({
      idempotencyKey: `cricket:${String(item.matchId ?? "unknown")}:${String(item.eventId ?? index)}`,
      competitionId: String(item.competitionId ?? "unknown-competition"),
      matchId: String(item.matchId ?? "unknown-match"),
      sequenceNumber: Number(item.sequenceNumber ?? index + 1),
      occurredAtIso: String(item.occurredAtIso ?? new Date().toISOString()),
      payload: item,
    }));
  }
}

