import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

test("PushNotificationAPI contract is defined", () => {
  const content = readFileSync(
    join(process.cwd(), "golden/contracts/notifications-interface-fcm.md"),
    "utf8",
  );
  assert.match(content, /PushNotificationAPI/);
  assert.match(content, /retryable/);
});
