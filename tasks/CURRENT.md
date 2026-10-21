# Site repair

## Goal
Restore the existing terminal-style resume site and upgrade its build tooling without redesigning the site or changing biographical facts.

## Tasks
- [x] Reproduce the deployed site's failure and inspect the pinned theme.
- [x] Upgrade compatible Hugo/theme/build tooling and fix confirmed defects.
- [x] Validate generated pages, terminal commands, and CI configuration locally.
- [x] Review git status/diff and identify deployment steps requiring approval.
- [x] Obtain explicit approval to create a branch, commit, push, and open a repair PR.
- [ ] Publish the repair branch and open a PR targeting `develop`.
- [ ] Run GitHub-hosted CI on the PR; use self-hosted runners only if hosted execution is blocked.
- [ ] Obtain merge approval, deploy, and verify the production terminal.

**Next:** Revalidate locally, commit/push the approved repair branch, and open its PR. Do not merge or deploy.

## Constraints
- Prefer GitHub-hosted runners. No confirmed runner-credit issue.
- No commits, pushes, or merges without explicit approval.

## Git State
- Branch: `bugfix/ad/repair-terminal-site`, based on `develop` at `025e6b2`; approved for commit, push, and PR creation.
- Changed: workflow, config, theme pointer; new: ignore rules, readme, head override, vendor assets, browser tests, npm files, task state.
- Recent commits: `025e6b2`, `6a235d4`, `babb2ab`, `5d6bbc9`, `9970f8c`.

## Decision Log
| Date | Decision | Rationale |
| --- | --- | --- |
| 2026-10-20 | Serve pinned terminal dependencies locally. | Unpinned CDN jQuery upgraded to 4.0.0 and broke production. |
| 2026-10-20 | Test desktop/mobile terminal commands before deployment. | HTTP 200 did not detect the broken interface. |

## Open Questions
- User explicitly approved branch creation, commit, push, and PR creation on 2026-10-21. Merge approval remains outstanding.
- Local Hugo build, both browser tests, actionlint, diff checks, and npm audit passed again on 2026-10-21. Remote runner availability remains untested; repair evidence is in `tasks/archive/site-repair.md`.
