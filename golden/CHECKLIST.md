Definition of Done Checklist (Golden Gates)
Use this checklist for every spec, PR, and release candidate. If any item cannot be satisfied due to missing tooling/contracts, STOP and create an Operator Task.

0) Preflight (before design/code)
Confirm whether this work is net-new or an extension to an existing spec (link the spec folder if it exists).

Check for overlap with existing .specify/specs/*; if overlap exists, reuse/extend instead of duplicating.

Check golden/contracts/* for an existing contract to reuse; if missing or unclear, STOP and request/author the contract first.

Confirm that no step requires human console actions; if it does, move it to golden/OPERATOR_TASKS.md.

1) Rule Lock (architecture & contracts)
No contract drift: any external interface change is reflected only by updating golden/contracts/* (and versioning if breaking).

Core/domain logic does not import vendor SDKs or provider-specific clients.

Integrations implemented as adapters; swapping vendors does not require rewriting core behavior.

External data/events are normalized and persisted into the system-of-record before being consumed by the app.

2) Style Lock (formatting & hygiene)
Default style gate (run on entire repo):

pre-commit run --all-files

Repo requirements:

.pre-commit-config.yaml must live at the repository root.

If .pre-commit-config.yaml is missing, STOP and add an Operator Task to create it (no ad-hoc formatter scripts).

3) Behavior Lock (tests & verification)
Gate command placeholders (fill these in per stack; keep explicit if UNKNOWN):

text
FORMAT_CMD=
LINT_CMD=
TYPECHECK_CMD=
TEST_CMD=
Gates (must pass with exit code 0):

Run ${FORMAT_CMD} (or default style gate above if format command is not separate).

Run ${LINT_CMD}.

Run ${TYPECHECK_CMD} (if applicable).

Run ${TEST_CMD} and ensure machine-readable JSON report(s) show 0 failing tests.

Evidence required in PR/agent output:

Exit codes for each gate.

Paths to JSON test report files (or explicit statement “not available” with operator-approved exception).

tail -n 200 for any failing stack traces.

Git patch (git diff) plus branch name and commit hash.

4) Security & compliance checks (generic)
No secrets in repo: scan diffs for keys/tokens/private URLs/credentials.

Configuration uses environment variables only; examples contain names only or safe placeholders.

Any regulated capability (payments, prizes, age-gated content, high-risk data, etc.) is disabled by default and cannot be enabled without explicit operator/legal approval recorded in the spec.

5) Release readiness (if releasing)
All gates pass on a clean checkout.

Contracts are consistent with deployed interfaces.

Migration/rollback plan exists if storage schemas changed.

Observability hooks exist for critical flows (errors, latency, key business events), with no PII leakage.