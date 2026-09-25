import { ShareableLeaderboardService } from "../services/shareable-leaderboard-service";

export class ShareableLeaderboardController {
  private readonly service = new ShareableLeaderboardService();

  getShareableView(rows: Array<{ userId: string; rank: number; points: number }>) {
    return this.service.toShareable(rows);
  }
}

