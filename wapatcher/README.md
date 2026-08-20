# wa-patcher Web (WASM)

Browser build of the patcher. Drop a `.lua`, get a patched copy back. All
patching happens locally in your browser via WebAssembly — no uploads, works
fully offline once the page is loaded.

## What's here

```
web/
├── index.html        # the page
├── app.js            # drag-and-drop + download logic
├── styles.css
├── build.sh          # rebuild wasm (re-bakes mappings) + stages pkg/
├── pkg/              # wasm-pack output (gitignored, generated)
└── README.md
```

`web/pkg/` is generated. Never edit it by hand.

## Prerequisites

- Rust (`rustup`, `cargo`)
- wasm32 target: `rustup target add wasm32-unknown-unknown`
- `wasm-pack` (`cargo install wasm-pack`)

## Build

```bash
./web/build.sh
```

That runs `wasm-pack build --target web --release` with mappings baked into
the binary, then copies the result into `web/pkg/`.

## Run locally

Browsers block `.wasm` over `file://`, so serve the folder:

```bash
cd web
python3 -m http.server 8000
# → http://localhost:8000
```

## Deploy / share

Upload the **entire `web/` directory** (index.html, app.js, styles.css,
pkg/, …) to any static host. No server-side code, no backend, no cookies.

Suggested hosts:

| Host | Notes |
|---|---|
| GitHub Pages | Free. Push `web/` to a repo, enable Pages. Public by default. |
| Cloudflare Pages | Free. Fast global CDN, custom domain. |
| Netlify | Free tier. Drag-and-drop upload of the folder, or git-connected. |
| Vercel | Free tier. Git-connected, automatic deploys. |
| Your own box | Any static file server (nginx, `caddy`, `python -m http.server`, S3, R2…). |

For friends who don't want to install anything: host it once, share the URL.
They can also download the folder and run it locally if they prefer.

## After a WoW patch (keeping mappings fresh)

The mappings are **baked into the WASM binary** — this is intentional: one
deploy artifact, no runtime fetch, works offline. To update:

1. Rebuild mappings from the new game CSVs:
   ```bash
   python3 build_mappings.py   # or update_mappings.py — whatever generates mappings/*.csv
   ```
2. Rebuild the web build:
   ```bash
   ./web/build.sh
   ```
3. Re-deploy the `web/` folder to your host.

Friends see the new mappings on next page load (hard-refresh if their browser
cached the old `.wasm`).

## Trade-off: baked-in vs runtime mappings

Baked-in means: bigger `.wasm` (~3.3 MB), recompile needed per game patch, but
zero runtime dependencies and works fully offline.

If you'd rather not rebuild per patch, you could fetch the CSVs at runtime and
feed them to the patcher — that's a larger change to `wasm_api.rs`/`app.js`.
Baked-in is the recommended default.

## API (wasm exports)

From `wa-patcher/src/wasm_api.rs`:

- `version()` → patcher version string
- `data_version()` → game data version the baked mappings came from
- `mapping_counts()` → `{ spell, item, zone, encounter, dataVersion, patcherVersion }`
- `patch(input: Uint8Array)` → `{ output: number[], stats: {…} }`

The `output` is a plain JS array of bytes; wrap in `new Uint8Array(...)` for a
Blob.
