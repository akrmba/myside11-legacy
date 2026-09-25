# Share Link Payload Rules

- Contract ID: `share-link-payload-rules`
- Public Interface: `ShareLinkPayloadAPI`
- Version: `1.0.0`
- Status: Active
- Last Updated: 2026-02-15

## Purpose

Define invite/share payload structure, token safety rules, and non-PII output
requirements for shareable views.

## Token Rules

1. Tokens must be unguessable (`>=128` bits of entropy).
2. Tokens must be revocable and rotatable by league admin.
3. Expired/revoked tokens must not grant membership.

## Invite Payload

```ts
export interface LeagueInvitePayload {
  token: string;
  leagueId: string;
  issuedByUserId: string;
  expiresAtIso: string;
  permissions: Array<"join_league" | "view_leaderboard">;
}
```

## View-Only Share Payload

```ts
export interface ShareableLeaderboardPayload {
  shareToken: string;
  leagueId: string;
  contestId: string;
  participants: Array<{
    alias: string;
    rank: number;
    points: number;
  }>;
}
```

## Privacy Rules

- View payloads must never include direct PII.
- User-facing names in shared views must be aliases only.

## Example (Fake Data)

```json
{
  "shareToken": "tok_3f95b8b2f6f4439b92afc4d4cc19f0aa",
  "leagueId": "league-778",
  "contestId": "contest-811",
  "participants": [
    { "alias": "CaptainSparrow", "rank": 1, "points": 845 },
    { "alias": "SpinWizard", "rank": 2, "points": 831 }
  ]
}
```
