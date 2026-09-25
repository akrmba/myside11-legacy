# Vendor Ingest Schema Boundary

- Contract ID: `vendor-ingest-schema-boundary`
- Public Interface: `VendorIngestEventSchema`
- Version: `1.0.0`
- Status: Active
- Last Updated: 2026-02-15

## Purpose

Define the normalized ingest event shape written by polling workers before
downstream scoring/replay consumption.

## Schema (Logical)

```ts
export interface VendorIngestEventSchema {
  ingestEventId: string;
  idempotencyKey: string;
  competitionId: string;
  matchId: string;
  eventType: string;
  sequenceNumber: number;
  occurredAt: string;
  receivedAt: string;
  payload: Record<string, unknown>;
  sourceProvider: string;
  payloadVersion: "1.0.0";
}
```

## Invariants

1. `idempotencyKey` must be globally unique per logical event.
2. `sequenceNumber` is monotonic within `matchId`.
3. `occurredAt <= receivedAt`.
4. Ingest records are immutable after write.

## Versioning Notes

- Additive optional fields: minor version.
- Field removal/rename/invariant change: major version.

## Example (Fake Data)

```json
{
  "ingestEventId": "ing-9001",
  "idempotencyKey": "provider-a:match-33:evt-9001",
  "competitionId": "comp-ipl-2026",
  "matchId": "match-33",
  "eventType": "BALL_RESULT",
  "sequenceNumber": 524,
  "occurredAt": "2026-02-15T12:10:00Z",
  "receivedAt": "2026-02-15T12:10:23Z",
  "payload": {
    "runs": 2,
    "wicket": false
  },
  "sourceProvider": "provider-a",
  "payloadVersion": "1.0.0"
}
```
