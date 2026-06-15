# Security Policy

## Reporting a vulnerability

Please **do not** open a public issue for security vulnerabilities.

Open a [GitHub private security advisory](https://github.com/mankal-27/Fork-My-Brain/security/advisories/new) instead. You can expect a response within 48 hours.

## Security measures

- All dynamic HTML rendered via `safeText()` — no raw innerHTML
- No `eval()`, no `document.write()`, no inline `onclick` handlers
- All event handling via `addEventListener` (CSP-safe)
- All external links use `rel="noopener noreferrer"`
- All external URLs use HTTPS only
- No third-party JS loaded from CDNs
- Static-only site — no server, no database, no backend
- `.gitignore` blocks secrets, `.env` files, build artifacts
