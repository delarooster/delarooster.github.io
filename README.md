# Austin DeLaRosa's terminal CV

Hugo site published to https://www.austindelarosa.com/ with terminalCV v3.8.0.
Edit resume content in `config.yml` under each section's `details` key.

## Build and test

Use Hugo 0.168.0, Node.js 24, and Python 3.

```sh
git submodule update --init --recursive
npm ci
npx playwright install chromium
hugo --gc --minify
npm test
```

For interactive development, run `hugo server`.

The head partial in `layouts/partials/head.html` replaces the theme's CDN imports
with versioned local assets in `static/vendor`. Do not switch back to unpinned
jQuery: jQuery 4 breaks the terminal library.

## Deployment

Pull requests targeting `develop` build and run desktop/mobile Chromium tests on
GitHub-hosted Ubuntu runners. Pushes to `develop` deploy only after those tests
pass. Manual dispatch on `develop` uses the same checks before deploying.

The custom domain is configured in GitHub Pages. `config.yml` uses its canonical
`www` URL; the apex domain redirects there.
