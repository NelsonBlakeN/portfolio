# TODOs

Deferred work captured during planning. Each item includes motivation, tradeoffs, and enough context to pick up later.

## v1 (promoted from CEO review)

### Public repo + real README

**What:** Open-source the `blake` repo with a first-class README: architecture diagram (native CLI + WASM sharing `blake-core`), bundle-size badge, CI badge, "how it works" section pointing at the crate boundaries, install instructions.

**Why:** The portfolio site is a vibe demo. Without a readable code sample one click away, hiring managers who liked the terminal have nowhere to go. The repo turns the site into a code artifact they can evaluate.

**Context:** README lives at repo root. Architecture diagram can be Mermaid or an SVG. Badges from shields.io. The `about` or `contact` command should surface the repo URL prominently.

---

### Technical writeup / blog post

**What:** A post titled something like "Shipping a Rust CLI to both your terminal and the browser." Covers: why Rust+WASM, the `fn run(&str) -> RunResult` boundary, content embedding via `include_str!`, bundle budget discipline, tradeoffs considered (C+Emscripten, Zig+WASI, JS-fake).

**Why:** Highest-leverage single artifact for an interview loop. Interviewers read it, it becomes the conversation. Also signals the ability to write, which is disproportionately rare.

**Context:** Link from `blake about` or a dedicated `blake blog` command. Host on the portfolio site or a separate blog surface. Should reference the public repo.

---

## v1.5

### Benchmarks + build metadata in `blake --version`

**What:** `blake --version` prints version, commit SHA, build date, WASM bundle size (gzipped), and cold-start latency measured in CI.

**Why:** Senior engineers notice. Signals measurement discipline — you care about what you ship, not just that it works.

**Context:** Values baked in at build time via `build.rs` + env vars. CI job measures cold-start and writes a constant the build consumes. Keep it to a few lines of output.

---

### Accessibility pass

**What:** Keyboard navigation through GUI mode (tab order, focus rings), screen-reader labels on interactive elements, `prefers-reduced-motion` respected by the boot typewriter (instant render instead of staggered timers), sufficient color contrast in the terminal palette.

**Why:** Rare on developer portfolios. Signals that you think about users who aren't you — a taste marker that stands out in a pile of identical terminal-themed sites.

**Context:** xterm.js has some a11y hooks but the surrounding React shell needs the real work. `prefers-reduced-motion` is a one-line media query check in `<BootSequence>`.

---

## Post-v1

### Vim-mode alternate shell

**What:** Second shell mode that loads as a vim session in progress (`vim ~/blake/resume.md`) with a status bar, cursor blinking, `j`/`k` scroll, `/` search, `:e projects.md` to swap files, `:gui` to flip modes. Toggle at top-right lets the user pick between `npm` mode and `vim` mode.

**Why:** The prior design's Approach C. Strongest possible dev-taste signal — "I use vim daily." Becomes a genuine conversation starter for engineering interviewers. Paired with the existing `npm install` mode, the site offers a "pick your shell" experience that's fully unique.

**Pros:** Memorable, authentically dev-pilled, doubles the surface area of the portfolio as a project.

**Cons:** Additional input parser (vim keybindings), additional rendering mode in React shell. Gates content behind vim muscle memory for non-vim users — mitigation is the mode toggle must remain prominent.

**Context:** The content path (`blake-core` + `--json`) already supports it. What's missing is a new React view that consumes the same JSON but renders it as a "file" with vim-style navigation. No changes needed on the Rust side.

**Depends on:** v1 ships (core + npm mode + GUI toggle).

---

### Easter eggs

**What:** `sudo hire-me` (prints a tongue-in-cheek message), `whoami` (returns a one-liner bio), `cat resume.pdf` (triggers a download of the real resume PDF), `ls ~/projects`, maybe a couple more.

**Why:** Delight factor for the developer audience. Rewards curiosity, doesn't waste anyone's time.

**Pros:** Cheap to add, memorable.

**Cons:** Adds content surface area that has to be maintained. If humor doesn't land, they subtract rather than add.

**Context:** Each is a command handler in `blake-core`. `cat resume.pdf` needs special handling in the WASM shim (trigger browser download) vs native (copy file to stdout or just print a path). Keep the native and browser behaviors sensibly different.

**Depends on:** v1 ships.

---

## v2

### Publish `blake` on crates.io

**What:** Release `blake-portfolio` (or similar name) to crates.io so users can `cargo install blake-portfolio` and get the CLI.

**Why:** Demonstrates release discipline and gives the project a real open-source footprint. Small but unambiguous signal that you know how Rust's distribution story works end-to-end.

**Context:** Requires a stable crate name, a `Cargo.toml` with metadata (description, license, repo, keywords), and `cargo publish`. Automate via GitHub Actions on release tag. Pairs naturally with the Homebrew tap work — both are "make install trivial" channels.

**Depends on:** v1 shipped, public repo live, GitHub Releases producing tagged assets.

---

### Windows binary target

**What:** Add `x86_64-pc-windows-msvc` to the GitHub Actions matrix, produce a `.exe`, add a matching `install.ps1` for PowerShell.

**Why:** Hits the ~40% of devs on Windows. The install.sh story doesn't work there; PowerShell script does.

**Pros:** Meaningful audience expansion.

**Cons:** Windows CI is its own headache (path separators, line endings, signing optional). rustyline works on Windows but needs a feature flag.

**Context:** Cargo cross-compilation to Windows from macOS needs `cargo-xwin` or the `x86_64-pc-windows-gnu` target with mingw. GitHub Actions `windows-latest` runner is easier.

**Depends on:** v1 shipped. No tight coupling to anything else.

---

### Homebrew tap

**What:** Create `NelsonBlakeN/homebrew-blake` repo with a `Formula/blake.rb` that pulls the release binary from GitHub Releases. Users install with `brew install NelsonBlakeN/blake/blake`.

**Why:** First-class install UX for Mac devs. `brew install blake` is one step simpler than `curl | sh`.

**Pros:** Recognized, low-friction install channel.

**Cons:** Requires a separate repo and formula maintenance. Formula needs updating per release (easy to automate with `brew bump-formula-pr`).

**Context:** The formula is ~20 lines of Ruby pointing at the GitHub Release URL and SHA256. Automation: a GitHub Action on release tag can open a PR against the tap repo with the updated formula.

**Depends on:** v1 shipped, GitHub Releases producing tagged assets.

---

### Per-command flags: `--verbose`, `--featured`

**What:** `blake experience --verbose` shows extended entries (longer descriptions, more detail). `blake projects --featured` shows only featured ones.

**Why:** Gives devs a reason to keep typing. Layered information.

**Pros:** Rewards exploration without cluttering default output.

**Cons:** Adds flag handling per command, and content schema needs to mark which items are "featured" and which blurbs have a "verbose" field.

**Context:** `clap` derive makes per-subcommand flags trivial. TOML schema gets `featured: bool` on project entries and optional `verbose_description: String`.

**Depends on:** v1 shipped.

---

### Tab completion for flags

**What:** In the browser, typing `blake projects --<Tab>` completes to `--featured`.

**Why:** Nice-to-have polish. Signals that the terminal is really real.

**Pros:** Small, satisfying touch.

**Cons:** Requires expanding the JS-side completion logic beyond command names. Flag list needs to be exported from `blake-core` somehow (maybe a `blake complete` command that emits JSON of available completions).

**Context:** Consider a `blake --complete-hint` or `blake completions json` command that emits the full command + flag surface as JSON, parsed once on boot.

**Depends on:** `--verbose` / `--featured` flags exist to make completion worthwhile.
