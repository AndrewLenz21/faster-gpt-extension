# Security Policy

FasterGPT runs in the browser and interacts with ChatGPT pages. Security and
privacy issues, especially those involving extension permissions, page-content
access, stored settings, or dependency vulnerabilities, should be reported
privately.

## Supported Versions

| Version | Supported |
| --- | --- |
| Latest stable release | Yes |
| Previous stable release | Critical fixes only |
| Development builds | No |

## Reporting a Vulnerability

Do not open a public issue for a suspected vulnerability. Instead, use a
[private GitHub security advisory](https://github.com/AndrewLenz21/faster-gpt-extension/security/advisories)
with:

- A clear description of the issue
- Steps to reproduce it
- Its security or privacy impact
- Any suggested mitigation, if available

Reports will be acknowledged within 72 hours and evaluated as soon as possible.

## Scope

Examples of in-scope reports include:

- Cross-site scripting or page-content injection
- Unintended access to ChatGPT content or browser data
- Unsafe extension permissions or message passing
- Exposure of persisted settings or diagnostics
- Vulnerable runtime dependencies

Please avoid accessing data that is not yours and do not publicly disclose an
issue until a fix is available.
