import { PrivateLeagueInviteService } from "../services/private-league-invite-service";

export class PrivateLeagueInviteController {
  private readonly service = new PrivateLeagueInviteService();

  issue(leagueId: string, issuedByUserId: string, expiresAtIso: string) {
    return this.service.issue(leagueId, issuedByUserId, expiresAtIso);
  }

  rotate(token: string, issuedByUserId: string, expiresAtIso: string) {
    return this.service.rotate(token, issuedByUserId, expiresAtIso);
  }

  revoke(token: string) {
    this.service.revoke(token);
    return { ok: true };
  }

  join(token: string, nowIso: string) {
    return this.service.join(token, nowIso);
  }
}

