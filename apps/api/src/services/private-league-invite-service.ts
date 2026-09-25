import { randomUUID } from "node:crypto";
import type { InviteLink } from "../models/invite-link";

export interface PrivateLeagueInviteAPI {
  issue(leagueId: string, issuedByUserId: string, expiresAtIso: string): InviteLink;
  rotate(oldToken: string, issuedByUserId: string, expiresAtIso: string): InviteLink;
  revoke(token: string): void;
  join(token: string, nowIso: string): { leagueId: string; accepted: boolean };
}

export class PrivateLeagueInviteService implements PrivateLeagueInviteAPI {
  private readonly links = new Map<string, InviteLink>();

  issue(leagueId: string, issuedByUserId: string, expiresAtIso: string): InviteLink {
    const link: InviteLink = {
      token: this.generateToken(),
      leagueId,
      issuedByUserId,
      issuedAtIso: new Date().toISOString(),
      expiresAtIso,
    };
    this.links.set(link.token, link);
    return link;
  }

  rotate(oldToken: string, issuedByUserId: string, expiresAtIso: string): InviteLink {
    const current = this.requireLink(oldToken);
    this.revoke(oldToken);
    return this.issue(current.leagueId, issuedByUserId, expiresAtIso);
  }

  revoke(token: string): void {
    const link = this.requireLink(token);
    link.revokedAtIso = new Date().toISOString();
  }

  join(token: string, nowIso: string): { leagueId: string; accepted: boolean } {
    const link = this.requireLink(token);
    const now = new Date(nowIso).getTime();
    const expired = now > new Date(link.expiresAtIso).getTime();
    const revoked = Boolean(link.revokedAtIso);
    return {
      leagueId: link.leagueId,
      accepted: !expired && !revoked,
    };
  }

  private requireLink(token: string): InviteLink {
    const link = this.links.get(token);
    if (!link) {
      throw new Error("Invite token not found");
    }
    return link;
  }

  private generateToken(): string {
    return randomUUID().replaceAll("-", "") + randomUUID().replaceAll("-", "");
  }
}

