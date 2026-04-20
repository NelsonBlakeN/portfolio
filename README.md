# blake-portfolio

CLI-first personal portfolio site. The page loads and runs a fake `npm install @blake/portfolio`, then drops into an interactive terminal where visitors can type commands to learn about Blake. A `[GUI]` toggle in the top-right switches to a scannable card layout — same content, monospace aesthetic throughout.

The terminal is backed by a Rust core (`blake-core`) compiled to WASM so the same binary that runs in the browser can be installed locally as a native CLI. The JS shell is the React frontend; the commands are Rust.

## Running locally

**React dev server:**

```bash
npm install
npm start
```

Opens at `http://localhost:3000`. Hot reload is on — changes to `src/` are reflected immediately.

**Native CLI (requires Rust):**

```bash
cargo run -p blake -- --help
cargo run -p blake -- contact
cargo run -p blake            # drops into interactive REPL
```

Or install globally:

```bash
cargo install --path blake-cli
blake contact
```

## Building

**React frontend:**

```bash
npm run build       # outputs to dist/
```

**WASM package** (required before the React frontend can use Rust commands):

```bash
wasm-pack build blake-wasm --target web --out-dir ../wasm-pkg
```

Output goes to `wasm-pkg/`. This directory is gitignored and must be rebuilt when `blake-core` changes. The gzipped WASM size is currently ~132 KB (budget: 250 KB).

**Full production build** (both WASM + React):

```bash
wasm-pack build blake-wasm --target web --out-dir ../wasm-pkg && npm run build
```

## Deploying

The site deploys to GitHub Pages via the `gh-pages` package:

```bash
npm run deploy
```

This runs `npm run build` first (via `predeploy`), then pushes `dist/` to the `gh-pages` branch. GitHub Pages serves from that branch automatically.

To verify the deploy succeeded: check the `gh-pages` branch and the GitHub Pages URL in repo settings.

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
| `blake --version` | Print version (commit SHA + build date) |
| `blake --json` | Any command + `--json` returns structured JSON |

Tab completes command names. Up/Down arrow cycles through history.

## Architecture

```
blake-core/           # Rust library — all command logic + content
  src/
    lib.rs            # run(input: &str) -> RunResult
    parser.rs         # input tokenizer
    content.rs        # TOML structs + embed via include_str!
    commands/         # one module per command
  content/            # *.toml files (edit these for content pass)
  build.rs            # rebuild trigger when content/*.toml changes

blake-cli/            # Thin Rust binary — clap subcommands + rustyline REPL
  src/main.rs

blake-wasm/           # cdylib — wasm-bindgen wrapper around blake-core
  src/lib.rs          # run() + command_names() exported to JS

src/                  # React frontend
  App.js              # Mode state (terminal / gui), toggle button
  Terminal.js         # Scrollback buffer, input loop, boot sequence
  commands/index.js   # JS command handlers (will be replaced by WASM)
  styles/terminal.css # All terminal styling
```

**Current state:** The Rust core and WASM package are built. The React frontend still uses the JS command handlers in `src/commands/index.js`. The next step is wiring `wasm-pkg/` into webpack and replacing the JS `run()` calls with `blake_core.run()`.

## Content

Edit the TOML files in `blake-core/content/` and rebuild:

```
blake-core/content/about.toml       # name, title, bio
blake-core/content/experience.toml  # work history
blake-core/content/projects.toml    # personal projects
blake-core/content/skills.toml      # technical skills
blake-core/content/contact.toml     # links
```

`cargo build` will automatically re-run when any content file changes (via `build.rs`). For native CLI, changes are live on next `cargo run`. For WASM, rebuild with `wasm-pack build`.

The JS frontend (`src/commands/index.js`) has parallel placeholder content with `// TODO(content-pass)` markers — fill both or just the TOML once the WASM integration is complete.

See `TODOS.md` for the full planned roadmap.
