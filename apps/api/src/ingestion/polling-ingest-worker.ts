import { CricketPollingAdapter } from "../adapters/providers/cricket-polling-adapter";
import type { ProviderIngestEvent } from "../models/provider-ingest-event";

export class PollingIngestWorker {
  private readonly adapter = new CricketPollingAdapter();

  run(rawItems: Array<Record<string, unknown>>): ProviderIngestEvent[] {
    const normalized = this.adapter.normalize(rawItems);
    const seen = new Set<string>();
    const deduplicated: ProviderIngestEvent[] = [];

    for (const event of normalized) {
      if (seen.has(event.idempotencyKey)) {
        continue;
      }
      seen.add(event.idempotencyKey);
      deduplicated.push(event);
    }

    return deduplicated;
  }
}

