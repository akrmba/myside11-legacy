import assert from "node:assert/strict";
import test from "node:test";
import { PrivateLeagueInviteController } from "../../src/api/private-league-invite-controller";

test("invite token can be issued and joined", () => {
  const controller = new PrivateLeagueInviteController();
  const invite = controller.issue("league-1", "admin-1", "2026-02-15T15:00:00Z");
  const join = controller.join(invite.token, "2026-02-15T14:00:00Z");
  assert.equal(join.accepted, true);
});

