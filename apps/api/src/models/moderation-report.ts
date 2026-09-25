export interface ModerationReport {
  reportId: string;
  targetType: "invite" | "share_link";
  targetId: string;
  reason: string;
  reportedByUserId: string;
  createdAtIso: string;
}

