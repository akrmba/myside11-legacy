# Notifications Interface (FCM)

- Contract ID: `notifications-interface-fcm`
- Public Interface: `PushNotificationAPI`
- Version: `1.0.0`
- Status: Active
- Last Updated: 2026-02-15

## Purpose

Define the backend-to-FCM dispatch boundary for Pro alert workflows.

## Interface

```ts
export interface PushNotificationAPI {
  send(request: PushDispatchRequest): Promise<PushDispatchResult>;
}
```

## Request Fields

- `userId`
- `platform` (`android`)
- `deviceToken`
- `templateId`
- `title`
- `body`
- `data` (string map)
- `traceId`

## Result Fields

- `status` (`accepted` | `failed` | `retry_scheduled`)
- `providerMessageId?`
- `retryable`
- `errorCode?`
- `attemptedAt`

## Retry/Error Semantics

1. Retryable failures must be flagged with `retryable=true`.
2. Invalid/expired token failures must be non-retryable and trigger token cleanup.
3. Dispatch status must be logged without sensitive payload leakage.

## Example (Fake Data)

```json
{
  "status": "accepted",
  "providerMessageId": "fcm-demo-8821",
  "retryable": false,
  "attemptedAt": "2026-02-15T12:11:01Z"
}
```
