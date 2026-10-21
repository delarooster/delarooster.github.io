# Site repair evidence

## Confirmed defect
- Production HTML responded HTTP 200, last modified March 2025.
- Chromium reported `jQuery.isFunction is not a function`; greeting and commands failed to initialize correctly.
- `https://cdn.jsdelivr.net/npm/jquery` returned jQuery 4.0.0; the old terminal library expected APIs removed in that version.

## Repair
- Theme pointer: `2d250d58d7cfa2066c4a3a15d246518175d9aedf` to release v3.8.0, `b764a9f1a2d7467edfe0ab7c66e9ccd5addbc24a`.
- Migrated configuration to the theme's nested prompt and section `details` schema.
- Verified all nine resume sections match their prior values, except trimming whitespace from the GitHub URL.
- Local head override uses bundled jQuery 3.7.1, jquery.terminal 2.45.2, and matching CSS/plugins, with upstream MIT licenses.
- Canonical base URL matches GitHub Pages configuration: `https://www.austindelarosa.com/`.
- Removed the example `startx` redirect to an unrelated Twitter account.
- Workflow uses Hugo 0.168.0 with checksum verification, current GitHub Actions, hosted Ubuntu runners, and Node 24.
- Pull requests build/test without publishing; develop pushes deploy only after passing browser tests.
- Deployment jobs are serialized; Pages write and OIDC permissions are limited to deployment.

## Verification
- Official Hugo 0.168.0 macOS binary downloaded, checksum verified, and extracted without system installation.
- `hugo --gc --minify` with that binary: passed.
- Non-blocking upstream RSS template deprecation warning: `.Site.LanguageCode`; replacement is `.Site.Language.Locale`.
- `npm test`: 2 passed, desktop and mobile Chromium, external requests blocked.
- Tests cover greeting, prompt, all resume commands, help, source, all, unknown command, keyboard completion, Enter submission, canonical URL, exit navigation, and no JavaScript/network errors.
- `actionlint .github/workflows/hugo.yaml`: passed.
- `git diff --check`: passed.
- `npm audit --audit-level=moderate`: zero vulnerabilities.

## Publication boundary
- User approved initializing and upgrading the theme submodule.
- No branch creation, commits, pushes, PR creation, merges, or deployments performed.
- No retained remote Actions runs were available. Hosted credits and hosted execution remain unverified.
