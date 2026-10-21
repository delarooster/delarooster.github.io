# Terminal dependencies

These upstream files are served locally so a CDN outage or an unpinned release
cannot disable the site's terminal. Keep the terminal JavaScript, CSS, and plugins
on the same version. Retain the adjacent MIT license files when updating.

| Files | Upstream |
| --- | --- |
| `jquery-3.7.1.min.js` | https://code.jquery.com/jquery-3.7.1.min.js |
| `jquery.terminal-2.45.2.min.js`, `jquery.terminal-2.45.2.min.css` | https://www.npmjs.com/package/jquery.terminal/v/2.45.2 |
| `less-2.45.2.min.js`, `autocomplete_menu-2.45.2.js` | https://www.npmjs.com/package/jquery.terminal/v/2.45.2 |

jQuery 3.7.1 is intentional: the terminal library uses APIs removed in jQuery 4.
