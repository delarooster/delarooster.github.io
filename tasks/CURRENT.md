# Site repair

## Goal
Restore the existing terminal-style resume site and upgrade its build tooling without redesigning the site or changing biographical facts.

## Tasks
- [x] Reproduce the deployed site's failure and inspect the pinned theme.
- [x] Upgrade compatible Hugo/theme/build tooling and fix confirmed defects.
- [x] Validate generated pages, terminal commands, and CI configuration locally.
- [x] Review git status/diff and identify deployment steps requiring approval.
- [x] Obtain explicit approval to create a branch, commit, push, and open a repair PR.
- [x] Publish the repair branch and open a PR targeting `develop`.
- [x] Run GitHub-hosted CI on the PR; use self-hosted runners only if hosted execution is blocked.
- [ ] Obtain merge approval, deploy, and verify the production terminal.

**Next:** Obtain approval to merge PR #2, then verify the resulting production deployment. Do not merge or deploy without approval.

## Constraints
- Prefer GitHub-hosted runners. No confirmed runner-credit issue.
- No commits, pushes, or merges without explicit approval.

## Git State
- Branch: `bugfix/ad/repair-terminal-site`, based on `develop` at `025e6b2`; repair committed as `401257a` and pushed to origin.
- PR: https://github.com/delarooster/delarooster.github.io/pull/2 targeting `develop`.
- GitHub-hosted build passed in 44 seconds for repair commit `401257a`; GitGuardian passed. Deployment correctly skipped for the PR.
- Recent commits: `025e6b2`, `6a235d4`, `babb2ab`, `5d6bbc9`, `9970f8c`.

## Decision Log
| Date | Decision | Rationale |
| --- | --- | --- |
| 2026-10-20 | Serve pinned terminal dependencies locally. | Unpinned CDN jQuery upgraded to 4.0.0 and broke production. |
| 2026-10-20 | Test desktop/mobile terminal commands before deployment. | HTTP 200 did not detect the broken interface. |

## Open Questions
- User explicitly approved branch creation, commit, push, and PR creation on 2026-10-21. Merge approval remains outstanding.
- Local Hugo build, both browser tests, actionlint, diff checks, and npm audit passed again on 2026-10-21. GitHub-hosted CI also passed: https://github.com/delarooster/delarooster.github.io/actions/runs/39600226045. Repair evidence is in `tasks/archive/site-repair.md`.
