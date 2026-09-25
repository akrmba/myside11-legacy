import { randomUUID } from "node:crypto";
import type { ModerationReport } from "../models/moderation-report";

export class ModerationReportService {
  private readonly reports: ModerationReport[] = [];

  submit(input: Omit<ModerationReport, "reportId" | "createdAtIso">): ModerationReport {
    const report: ModerationReport = {
      reportId: randomUUID(),
      createdAtIso: new Date().toISOString(),
      ...input,
    };
    this.reports.push(report);
    return report;
  }

  list(): ModerationReport[] {
    return [...this.reports];
  }
}

