export interface InviteLink {
  token: string;
  leagueId: string;
  issuedByUserId: string;
  issuedAtIso: string;
  expiresAtIso: string;
  revokedAtIso?: string;
}

