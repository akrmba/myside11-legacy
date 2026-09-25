# Event Store Access Patterns

- Contract ID: `event-store-access-patterns`
- Public Interface: `EventStoreAccessAPI`
- Version: `1.0.0`
- Status: Active
- Last Updated: 2026-02-15

## Purpose

Define append, replay, and read rules for score events backing deterministic
points recomputation and leaderboard materialization.

## Interface

```ts
export interface EventStoreAccessAPI {
  append(events: ScoreEventWrite[]): Promise<AppendResult>;
  replay(request: ReplayRequest): AsyncIterable<ScoreEventRecord>;
  readByMatch(matchId: string, cursor?: string): Promise<ReadPage<ScoreEventRecord>>;
}
```

## Append Rules

1. Appends are idempotent on `idempotencyKey`.
2. Duplicate appends must return success with `deduplicated=true`.
3. Persisted records are immutable and append-only.

## Replay Rules

1. Replay order is deterministic: `matchId`, `sequenceNumber`, `ingestedAt`.
2. Replay cursor must support resume-after-failure.
3. Replay consumers must be able to rebuild a consistent leaderboard read model.

## Consistency Expectations

- Write durability target: at-least-once ingestion with idempotent append.
- Read model convergence target: eventual consistency within configured SLA.

## Example (Fake Data)

```json
{
  "eventId": "evt-3341",
  "matchId": "match-33",
  "sequenceNumber": 524,
  "idempotencyKey": "provider-a:match-33:evt-9001",
  "pointsDelta": {
    "player-7": 2
  },
  "ingestedAt": "2026-02-15T12:10:23Z"
}
```
