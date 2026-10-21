# Austin DeLaRosa's terminal CV

Cloud platforms, AI agents, and a healthy suspicion of clicking the same button twice.

My terminal-style portfolio at [www.austindelarosa.com](https://www.austindelarosa.com/),
built with Hugo and terminalCV v3.8.0. I'm a Technical Principal at Mesh Systems;
the site covers cloud architecture, platform engineering, and agent-assisted
software delivery. Deployments should be boring.

## Explore the terminal

| Command | What you get |
| --- | --- |
| `whois` | Background and what I build |
| `ai` | Story loops, independent review, reusable skills, and guardrails |
| `projects` | Selected engineering work, with the interesting bits left in |
| `work`, `education`, `certifications` | The resume parts of the resume |
| `skills`, `softskills`, `languages` | Tools, people, and a little Latin |
| `social` | GitHub and LinkedIn |
| `all` | Everything, for the scroll enthusiasts |
| `help` | Available commands |

Tab completes commands; Enter runs them. `source` links to the theme,
and `exit` opens a blank page. Even a terminal CV needs an escape hatch.

## Editing content

Most content lives in [`config.yml`](config.yml), not in templates:

- `params.description`: page description metadata.
- `params.greeting`: the first thing visitors see.
- `params.whois.details`: headline, bio, and contact details.
- `params.<section>.details`: resume sections, social links, and projects.
- `params.misc`: the custom `ai` command, including its title and content.

Keep the copy conversational and a little cheeky. Be specific about the engineering:
what was built, what made it tricky, and how it works. Keep project entries short,
lead with technical substance, and leave room for a small joke. Skip the brochure language.

Only claim work I actually did. Keep employer titles and dates factual; distinguish
experiments and contributions from projects I owned. Describe private work by
industry or product category, without client names, internal identifiers, or private
repository links. Public project links are welcome; unsupported metrics are not.

The [GitHub profile](https://github.com/delarooster) is a starting point for content,
not a substitute for checking attribution. Update the browser assertions in
[`tests/terminal.spec.js`](tests/terminal.spec.js) when changing commands or featured
content. Keep anonymization checks in place.

## Build and test

Use Hugo 0.168.0, Node.js 24, and Python 3.

```sh
git submodule update --init --recursive
npm ci
npx playwright install chromium
hugo --gc --minify
npm test
```

For interactive development, run `hugo server` and open http://localhost:1313/.
Rebuild with `hugo --gc --minify` after editing content and before running `npm test`:
the tests serve `public/`, not the live Hugo development server.

Playwright checks desktop and mobile Chromium with external requests blocked.
It exercises terminal commands, the profile and project content, the `ai` section,
keyboard completion/submission, canonical URL, and exit navigation, and fails on
JavaScript or network errors. An HTTP 200 is not proof the terminal works.

For workflow changes, also run `actionlint .github/workflows/hugo.yaml`.

## Layout and dependencies

| Path | Purpose |
| --- | --- |
| `themes/terminalcv/` | Pinned upstream theme submodule |
| `layouts/partials/head.html` | Local override for metadata and dependency loading |
| `static/vendor/` | Pinned browser assets, provenance, and licenses |
| `tests/`, `playwright.config.js` | Desktop/mobile browser checks and local test server |
| `.github/workflows/hugo.yaml` | Build, browser tests, and Pages deployment |
| `tasks/CURRENT.md` | Current work and next action |

The head partial in `layouts/partials/head.html` replaces the theme's CDN imports
with versioned local assets in `static/vendor`. Do not switch back to unpinned
jQuery: jQuery 4 breaks the terminal library.
See [`static/vendor/README.md`](static/vendor/README.md) before updating assets;
keep terminal JavaScript, CSS, and plugins on matching versions and retain licenses.
Generated output and test reports stay out of git.

## Deployment

Pull requests targeting `develop` build and run desktop/mobile Chromium tests on
GitHub-hosted Ubuntu runners. Pushes to `develop` deploy only after those tests
pass. Manual dispatch on `develop` uses the same checks before deploying.

The custom domain is configured in GitHub Pages. `config.yml` uses its canonical
`www` URL; the apex domain redirects there.
