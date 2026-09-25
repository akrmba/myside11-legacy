# Provider Adapter Interface Contract

- Contract ID: `provider-adapter-interface`
- Public Interface: `ProviderDataAdapter`
- Version: `1.0.0`
- Status: Active
- Last Updated: 2026-02-15

## Purpose

Define a vendor-agnostic pull interface for polling external match/score data and
normalizing it before internal persistence.

## Interface

```ts
export interface ProviderDataAdapter {
  pullCompetitions(request: PullRequest): Promise<PullResponse<CompetitionEnvelope>>;
  pullMatches(request: PullRequest): Promise<PullResponse<MatchEnvelope>>;
  pullScoreEvents(request: PullRequest): Promise<PullResponse<ScoreEventEnvelope>>;
}

export interface PullRequest {
  provider: string;
  sport: "cricket" | string;
  cursor?: string;
  fromIso?: string;
  toIso?: string;
  traceId: string;
}
```

## Contract Rules

1. Adapter output must be normalized and vendor-neutral.
2. All envelopes must include deterministic idempotency keys.
3. Adapter failures must return retry-safe error metadata (`retryable`, `reason`).
4. Timestamps must be ISO-8601 UTC strings.

## Envelope Minimum Fields

- `providerEventId`
- `idempotencyKey`
- `occurredAt`
- `receivedAt`
- `payloadVersion`
- `sourceProvider`

## Versioning Notes

- Minor versions may add optional fields.
- Major versions are required for removals/behavioral contract changes.

## Example (Fake Data)

```json
{
  "providerEventId": "demo-score-1024",
  "idempotencyKey": "cricket:match-33:over-17:ball-4",
  "occurredAt": "2026-02-15T12:10:00Z",
  "receivedAt": "2026-02-15T12:10:23Z",
  "payloadVersion": "1.0.0",
  "sourceProvider": "provider-a"
}
```
