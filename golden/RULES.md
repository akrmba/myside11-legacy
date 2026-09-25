Golden Rules (Repo Law)
This file defines repository-wide, non-negotiable laws for all contributors (humans, agents, and CI). If any rule conflicts with higher source-of-truth documents, STOP and ask for resolution.

0) Source-of-truth order (highest → lowest)
golden/contracts/*

.specify/memory/constitution.md

golden/RULES.md

golden/CHECKLIST.md

.specify/specs/* feature artifacts (plans, tasks, notes)

If two sources conflict, the higher source wins. If the conflict changes behavior, STOP and ask before modifying code or contracts.

1) Contracts are law
All external interfaces and data shapes MUST live in golden/contracts/* (API boundaries, events/messages, storage schemas that cross boundaries, public SDK interfaces, webhooks, job payloads).

Specs and plans may reference contracts but must never redefine or silently diverge from them.

A contract change is a breaking change unless explicitly marked and versioned inside the contract.

2) Repo structure expectations
golden/ holds governance gates and operator procedures.

golden/contracts/ holds authoritative contract documents and schemas.

.specify/specs/ holds feature specs and implementation plans; these must cite contract files by path.

Core/domain logic MUST be isolated from vendor and transport details (see “Integration adapters only”).

3) Integration adapters only
Core/domain logic MUST NOT directly import or depend on vendor SDKs, provider-specific clients, or transport frameworks.

All third-party integrations MUST be implemented behind adapter interfaces at the boundary (e.g., adapters/), so vendors can be swapped without changing core behavior.

Data ingress from external providers MUST be normalized into internal events/state persisted in your database before being consumed by the application.

4) Configuration & secrets
Configuration is via environment variables only (including toggles that decide which integrations/tiers are active at runtime).

Secrets must NEVER be committed (no real keys in git, issues, PRs, logs, examples, or fixtures).

Provide only non-secret examples (e.g., .env.example) containing variable names and safe placeholder values.

Any configuration needed to boot locally must have a documented name and purpose, but never a real secret value.

5) Feature flags & rollout safety
Behavior changes that affect cost, latency, risk, compliance, or user experience MUST be gated behind feature flags.

Flags must support: default-off for risky/costly paths, per-environment overrides, and explicit auditability of who/what enabled a flag.

Any “live/real-time-like” capability must have a safe fallback mode and clear “last updated”/staleness handling in the product surface.

6) Stop-and-ask rule (mandatory)
STOP and ask the operator (no guessing, no silent assumptions) when any of the following is true:

A requirement is ambiguous, contradictory, or missing acceptance criteria.

A change would alter a contract in golden/contracts/* or invalidate existing specs.

A decision affects security/compliance, payments, data handling, or user entitlements.

A new integration is needed but no adapter contract exists yet.

7) Verification-first development (Behavior Lock)
Tests and verification are not optional: every change must be demonstrably correct via automated checks.

If the required tooling, config, or dependencies to run checks are missing, STOP and write an Operator Task (no code changes).

8) Style Lock + Rule Lock + Behavior Lock (the 3 locks)
Style Lock: formatting and repo hygiene are enforced automatically (pre-commit + formatter).

Rule Lock: architecture constraints and contracts are enforced (no contract drift; no vendor SDKs in core; adapters only).

Behavior Lock: automated tests and verification prove correctness (unit/integration as applicable).

9) Definition of Done (machine-verifiable)
A task is DONE only if CI-equivalent gates succeed with zero failures:

Style gate passes for the whole repo.

Lint gate returns exit code 0.

Typecheck gate returns exit code 0 (if the stack supports typechecking).

Test gate returns exit code 0 AND produces machine-readable JSON report(s) showing 0 failing tests.

Build gate returns exit code 0 (if a build step exists).

If any gate is not defined for the current stack, the placeholders in golden/CHECKLIST.md must remain explicit and the task cannot be marked DONE unless the operator approves the exception in writing.

10) Human-run setup lives only in OPERATOR_TASKS
All human-run setup steps (accounts, credentials, DNS, webhooks, payments, vendor dashboards, app store actions) MUST live only in golden/OPERATOR_TASKS.md. No other file may instruct humans to create secrets, click console buttons, or perform account setup.

TASK COMPLETION PROTOCOL (must be enforced by agents and CI)

Pre-run checks — before changing files, verify and list required preconditions (files, packages, env). If any missing, STOP and write an Operator Task (no code changes).

Run sequence — after code changes the agent must execute, in order (where relevant):
a. npm run lint (or FORMAT_CMD/LINT_CMD)
b. npm run typecheck / tsc --noEmit
c. npm run test:unit -- --reporter json > /tmp/agent-test-<id>.json (and integration/tests likewise)
d. npm run build (if a build step exists)

Evidence — the agent must include: exit codes, JSON test report files, tail -n 200 of failing stack traces, changed file diff (git patch), and commit/branch name or PR link. Example:

exit_code: 1

tests_failed: 9

failures: ["TranscriptChunker.test.ts#should create a new chunk..."]

attach: /tmp/agent-test-42.json

Success rule — mark task COMPLETE only if: all commands from (2) return exit code 0 and JSON reports show 0 failing tests. Otherwise: mark FAILED and create a new atomic task (with tests + failing artifacts) for remediation.

Retries — the agent may retry up to 2 times with changes, but each retry must include new commit/branch and fresh JSON reports. After 2 retries escalate: create a human OPERATOR_TASK and STOP.

Idempotency — All code changes must be committed to a feature branch agent/<spec-id>/<task-id>/<timestamp> and the agent must produce the git diff and commit hash.

Stop-and-ask — if any ambiguity affects behavior (e.g., “should I create a new spec folder or reuse?”), STOP and ask the operator. No guessing.