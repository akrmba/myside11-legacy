import assert from "node:assert/strict";
import test from "node:test";
import { PollingIngestWorker } from "../../src/ingestion/polling-ingest-worker";

test("polling ingest worker deduplicates idempotency keys", () => {
  const worker = new PollingIngestWorker();
  const output = worker.run([
    { competitionId: "comp-1", matchId: "m-1", eventId: "1" },
    { competitionId: "comp-1", matchId: "m-1", eventId: "1" },
  ]);

  assert.equal(output.length, 1);
});

