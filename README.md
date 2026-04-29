# blake-portfolio

CLI-first personal portfolio site. The page loads and runs a fake `npm install @blake/portfolio`, then drops into an interactive terminal where visitors type commands to learn about Blake. A `[GUI]` toggle in the top-right switches to a scannable card layout.

The terminal is backed by a Rust core (`blake-core`) compiled to WASM, so the same binary logic that runs in the browser can be installed and used as a native CLI. The commands are Rust; the shell is React.

## Architecture

```
blake-core/           # Rust library — all command logic + content
  src/
    lib.rs            # pub fn run(input: &str) -> RunResult
    parser.rs         # single-pass tokenizer (flags anywhere)
    content.rs        # TOML structs, embedded via include_str!
    commands/         # one module per command
  content/            # *.toml files (edit these for the content pass)
  build.rs            # bakes GIT_SHA + BUILD_DATE into the binary; reruns on content/*.toml changes

blake-cli/            # Thin native binary — clap subcommands + rustyline REPL
  src/main.rs

blake-wasm/           # cdylib — wasm-bindgen wrapper around blake-core
  src/lib.rs          # exports run() and command_names() to JS; bridges console.log for Rust logging

src/                  # React frontend
  App.js              # mode state (terminal / gui), toggle button
  Terminal.js         # scrollback buffer, input loop, boot sequence
  commands/
    index.js          # WASM loader + dispatcher; JS fallback for the pre-load window
    renderers.js      # JSON → styled JSX (one renderer per command type)
  styles/terminal.css # all terminal styling
```

The boundary is a single function: `fn run(input: &str) -> RunResult`. Both the browser (via WASM) and the native binary call it. Content lives in `blake-core/content/*.toml` and is embedded at compile time via `include_str!`.

## Running locally

**React dev server (browser terminal):**

```bash
npm install
npm start
```

Opens at `http://localhost:3000`.

> Before starting, make sure the WASM package is built (see below). If `wasm-pkg/` is missing, commands will fall back to the JS handlers during the ~100ms WASM load window, and then switch to Rust automatically.

**Native CLI:**

```bash
# run without installing
cargo run -p blake -- --help
cargo run -p blake -- about
cargo run -p blake            # interactive REPL (rustyline, history, tab completion)

# or install globally
cargo install --path blake-cli
blake --help
blake contact
```

## Building

**WASM package** (required for the React frontend to use Rust commands):

```bash
wasm-pack build blake-wasm --target bundler --out-dir ../wasm-pkg
```

Output goes to `wasm-pkg/`. This directory is gitignored and must be rebuilt whenever `blake-core` changes. Current gzipped size: ~132 KB (budget: 250 KB).

**React frontend:**

```bash
npm run build       # outputs to dist/
```

**Full production build (WASM + React together):**

```bash
wasm-pack build blake-wasm --target bundler --out-dir ../wasm-pkg && npm run build
```

## Deploying

The site deploys to GitHub Pages via the `gh-pages` package.

```bash
npm run deploy
```

This automatically runs `npm run build` first (via the `predeploy` hook), then pushes the `dist/` directory to the `gh-pages` branch of this repo. GitHub Pages is configured to serve from that branch.

**WASM must be built before deploying.** Run the full production build command above instead of `npm run deploy` alone if `blake-core` has changed since the last WASM build.

To verify: check the `gh-pages` branch is updated and visit the GitHub Pages URL in repo Settings → Pages.

## Commands

| Command | Description |
|---|---|
| `blake about` | Who I am |
| `blake experience` | Work history |
| `blake projects` | Things I've built |
| `blake skills` | Technical skills |
| `blake contact` | Email, GitHub, LinkedIn, etc. |
| `blake gui` | Switch to GUI mode |
| `blake clear` | Clear the terminal |
| `blake --help` | List all commands |
| `blake --version` | Version, commit SHA, and build date |
| `<cmd> --json` | Any command with `--json` returns raw structured JSON |

Tab completes command names. Up/Down arrow cycles through history. Ctrl+L clears the terminal.

## Content

All content lives in `blake-core/content/`:

```
blake-core/content/about.toml       # name, title, bio
blake-core/content/experience.toml  # work history entries
blake-core/content/projects.toml    # personal projects
blake-core/content/skills.toml      # skill categories
blake-core/content/contact.toml     # links (email, GitHub, LinkedIn, etc.)
```

Edit the TOML files and rebuild. `cargo build` reruns automatically when any content file changes (via `build.rs`). For the browser, rebuild with `wasm-pack build`.

## Installing the CLI standalone

If you just want the `blake` CLI without the website:

```bash
cargo install --git https://github.com/NelsonBlakeN/portfolio blake-cli
blake --help
```

Or clone and install from source:

```bash
git clone https://github.com/NelsonBlakeN/portfolio
cd portfolio
cargo install --path blake-cli
```

Requires Rust 1.70+. No other dependencies. Works on macOS, Linux, and Windows.
