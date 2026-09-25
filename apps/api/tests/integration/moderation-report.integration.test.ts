import assert from "node:assert/strict";
import test from "node:test";
import { ModerationReportController } from "../../src/api/moderation-report-controller";

test("moderation report submissions are accepted", () => {
  const controller = new ModerationReportController();
  const report = controller.submit("share_link", "link-1", "abusive content", "user-1");
  assert.equal(report.targetType, "share_link");
});

