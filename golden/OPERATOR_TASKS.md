Operator Tasks (Human-run Only)
This file is the ONLY place for human-run setup: accounts, credentials, DNS, webhooks, payments, app stores, and vendor dashboards. Do not put secrets in this file—only steps and environment variable names.

0) One-time repository bootstrap
Create repository and default branches; configure branch protection (require CI, require reviews, disallow direct pushes to protected branches).

Add .pre-commit-config.yaml at repo root (required); ensure contributors can run pre-commit locally.

Set up CI runner permissions and secret storage (CI secret manager only; no secrets in git).

1) Contracts: the single human step (mandatory when missing)
If any required contract in golden/contracts/* is missing or ambiguous:

Create/modify the contract file(s) in golden/contracts/ (schema + versioning notes + examples with fake data) and open a PR.

Do not approve implementation work that “works around” missing contracts.

2) Accounts & services (placeholders)
Create/configure accounts as needed (names are placeholders; choose providers later):

Source control org/project settings (SSO/2FA, audit logs).

Hosting / compute provider account.

Managed database (optional) or VPS provider account.

Object storage / CDN (optional).

Email/SMS/push notification provider account.

Analytics/telemetry provider account.

Ad network account (if applicable).

Payment processor account (if applicable).

App store / marketplace accounts (if shipping native apps).

3) Environment variables (names only)
Define these in the deployment environment (CI, staging, prod). Do not store values in git.

Core runtime:

APP_ENV

APP_BASE_URL

API_BASE_URL

DATABASE_URL

Security & auth:

AUTH_JWT_SECRET

SESSION_SECRET

ENCRYPTION_KEY

Feature flags / rollout:

FEATURE_FLAGS_PROVIDER

FEATURE_FLAGS_SEED

FEATURE_FLAGS_ADMIN_TOKEN

External integrations (adapters):

PROVIDER_A_BASE_URL

PROVIDER_A_API_KEY

PROVIDER_B_BASE_URL

PROVIDER_B_API_KEY

Caching/queues (optional):

REDIS_URL

QUEUE_BACKEND_URL

Notifications (optional):

PUSH_PROVIDER_CREDENTIALS

EMAIL_SMTP_HOST

EMAIL_SMTP_PORT

EMAIL_SMTP_USER

EMAIL_SMTP_PASSWORD

Payments (if applicable):

PAYMENTS_PROVIDER

PAYMENTS_API_KEY

PAYMENTS_WEBHOOK_SECRET

Ads/monetization (if applicable):

ADS_PROVIDER

ADS_PUBLISHER_ID

Analytics/telemetry:

ANALYTICS_PROVIDER

ANALYTICS_API_KEY

4) DNS / TLS / webhooks checklist
DNS: set A/AAAA records for app + API hosts (if separate).

TLS: provision certificates (managed or ACME); enforce HTTPS.

Webhooks: configure endpoint URLs and signing secrets in provider dashboards (store secrets in CI/secret manager only).

Callback URLs: register allowed origins/redirect URIs where applicable.

5) Payments checklist (only if applicable)
Decide product catalog (Free/Pro/Annual) in payment provider(s).

Configure webhooks + signature verification; rotate secrets.

Configure tax/VAT handling if required; confirm refund/cancellation flows.

Verify entitlements are enforced by backend (not by client UI).

6) Post-deploy verification (smoke tests)
Run after every deployment:

Health check endpoints return success.

Database connectivity and migrations status are valid.

Core user journey works end-to-end (signup/login, create object, update, list, permissions).

Feature-flagged paths: confirm default-off risky/costly features remain disabled.

Observability: errors and key metrics appear; no sensitive data in logs.

7) Myside11 Fantasy Core (MVP v1) feature-specific operator checklist
Apply these steps for feature `0001-myside11-fantasy-core-20260214`.

Provider ingest setup (adapter side only):

- Select provider account(s) for cricket data ingestion.
- Register provider API access and webhook/polling allowlist where required.
- Configure `PROVIDER_A_BASE_URL`, `PROVIDER_A_API_KEY`, `PROVIDER_B_BASE_URL`,
  and `PROVIDER_B_API_KEY` in CI/secret manager.
- Confirm provider rate limits and retry policy align with Expected/Delayed/Outage
  near-live states.

Web billing and Android billing:

- Create Free/Pro product mapping in the web billing provider dashboard.
- Create matching Free/Pro entitlement products in Google Play Console.
- Configure backend webhook verification secret(s) for web billing callbacks.
- Configure Android server-side purchase verification credentials.
- Record any required callback URLs in provider dashboards.

Ads monetization:

- Create/enable ad placements for leaderboard and contest surfaces.
- Configure placement IDs in deployment environment only (no secrets in git).
- Validate Pro entitlement ad suppression behavior in staging.

Push notifications (FCM):

- Create Firebase project/app for Android push.
- Provision service credentials in CI secret storage and map to
  `PUSH_PROVIDER_CREDENTIALS`.
- Configure and validate token registration + invalid token cleanup behavior.

Rollout and safety:

- Keep faster/live-like flags default OFF until staged validation passes.
- Verify feature-flag audit entries capture actor, timestamp, and reason.
- Confirm delayed/outage user messaging appears correctly before production rollout.
