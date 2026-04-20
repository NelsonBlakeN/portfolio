# blake-portfolio

CLI-first personal portfolio site. The page loads and runs a fake `npm install @blake/portfolio`, then drops into an interactive terminal where visitors can type commands to learn about Blake. A `[GUI]` toggle in the top-right switches to a scannable card layout — same content, monospace aesthetic throughout.

The terminal is backed by a Rust core (`blake-core`) compiled to WASM so the same binary that runs in the browser can be installed locally as a native CLI. The JS shell is the React frontend; the commands are Rust.

## Running locally

```bash
npm install
npm start
```

Opens at `http://localhost:3000`. Hot reload is on — changes to `src/` are reflected immediately.

## Building for production

```bash
npm run build
```

Output goes to `dist/`. The build is a static bundle (no server required).

## Deploying

The site deploys to GitHub Pages via the `gh-pages` package:

```bash
npm run deploy
```

This runs `npm run build` first (via `predeploy`), then pushes `dist/` to the `gh-pages` branch of this repo. GitHub Pages serves from that branch automatically.

To verify the deploy succeeded, check the `gh-pages` branch and the GitHub Pages URL in repo settings.

## Commands

Once the terminal loads, these commands are available:

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
| `blake --version` | Print version |

Tab completes command names. Up/Down arrow cycles through history.

## Architecture

```
src/
  App.js              # Mode state (terminal / gui), toggle button
  Terminal.js         # Scrollback buffer, input loop, boot sequence
  commands/
    index.js          # Command registry + run() dispatcher
  styles/
    terminal.css      # All terminal styling
```

**Current state:** Pure JS implementation. The command outputs are React JSX returned from `src/commands/index.js`.

**Planned:** A `blake-core` Rust crate compiled to WASM (`wasm-pack build`) will replace the JS command handlers. The same crate compiles to a native binary for `curl | sh` install. The React shell stays the same — it calls `blake_core.run(input)` instead of the JS `run()` function.

See `TODOS.md` for the full planned roadmap.

## Content

Commands with `// TODO(content-pass)` comments in `src/commands/index.js` are placeholders. The content pass (step 5 in the build plan) is where real work history, projects, and skills get filled in.
