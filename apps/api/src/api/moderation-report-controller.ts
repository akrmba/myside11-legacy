import { ModerationReportService } from "../services/moderation-report-service";

export class ModerationReportController {
  private readonly service = new ModerationReportService();

  submit(
    targetType: "invite" | "share_link",
    targetId: string,
    reason: string,
    reportedByUserId: string,
  ) {
    return this.service.submit({ targetType, targetId, reason, reportedByUserId });
  }
}

