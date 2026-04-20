import React from 'react'

const VERSION = '1.0.0'
const GIT_SHA = process.env.GIT_SHA || 'dev'
const BUILD_DATE = process.env.BUILD_DATE || 'local'

// ── Styled span helpers ────────────────────────────────────────────────────────
const G = ({ children }) => <span className="t-green">{children}</span>
const Y = ({ children }) => <span className="t-yellow">{children}</span>
const C = ({ children }) => <span className="t-cyan">{children}</span>
const D = ({ children }) => <span className="t-dim">{children}</span>
const W = ({ children }) => <span className="t-white">{children}</span>
const Bold = ({ children }) => <span className="t-bold">{children}</span>

const Link = ({ href, children }) => (
  <a className="term-link" href={href} target="_blank" rel="noopener noreferrer">
    {children || href}
  </a>
)

// ── Command implementations ────────────────────────────────────────────────────

function helpOutput() {
  return [
    <span><W><Bold>blake</Bold></W> {'<command>'} [flags]</span>,
    '',
    <span><W>Commands:</W></span>,
    <span>{'  '}<C>about</C>         {'  '}who I am</span>,
    <span>{'  '}<C>experience</C>    {'  '}where I've worked</span>,
    <span>{'  '}<C>projects</C>      {'  '}things I've built</span>,
    <span>{'  '}<C>skills</C>        {'  '}what I know</span>,
    <span>{'  '}<C>contact</C>       {'  '}how to reach me</span>,
    <span>{'  '}<C>gui</C>           {'  '}switch to GUI mode</span>,
    <span>{'  '}<C>clear</C>         {'  '}clear the terminal</span>,
    '',
    <span><W>Flags:</W></span>,
    <span>{'  '}<Y>--help</Y>        {'  '}show this help</span>,
    <span>{'  '}<Y>--version</Y>     {'  '}print version</span>,
    '',
    <span><D>Type 'blake {'<command>'}' to get started.</D></span>,
  ]
}

function aboutOutput() {
  return [
    <span><W><Bold>Blake Nelson</Bold></W></span>,
    <span><D>Software Engineer</D></span>,
    '',
    // TODO(content-pass): Replace with real bio
    <span>I build software that solves real problems and is a pleasure to use.</span>,
    <span>Currently interested in systems programming, developer tooling, and the</span>,
    <span>kind of UX that makes technical things feel effortless.</span>,
    '',
    <span><Link href="https://github.com/NelsonBlakeN">github.com/NelsonBlakeN</Link></span>,
  ]
}

function experienceOutput() {
  return [
    <span><W><Bold>Experience</Bold></W></span>,
    '',
    // TODO(content-pass): Replace with real work history
    <span className="section-entry"><W>Senior Software Engineer</W>  <D>2022 – present</D></span>,
    <span className="section-entry"><D>Company Name · Location</D></span>,
    <span className="section-entry">Placeholder — fill in during content pass.</span>,
    '',
    <span className="section-entry"><W>Software Engineer</W>  <D>2019 – 2022</D></span>,
    <span className="section-entry"><D>Company Name · Location</D></span>,
    <span className="section-entry">Placeholder — fill in during content pass.</span>,
  ]
}

function projectsOutput() {
  return [
    <span><W><Bold>Projects</Bold></W></span>,
    '',
    <span className="section-entry">
      <W>blake-portfolio</W>{'  '}<D>2024</D>
    </span>,
    <span className="section-entry">
      CLI-first portfolio site. Rust core compiled to WASM, runs in the browser
    </span>,
    <span className="section-entry">
      and as a native binary. xterm.js shell, GitHub Pages deploy.
    </span>,
    <span className="section-entry">
      <Link href="https://github.com/NelsonBlakeN/portfolio">github.com/NelsonBlakeN/portfolio</Link>
    </span>,
    '',
    // TODO(content-pass): Add more projects
    <span><D>More coming soon. Run 'blake contact' to see my GitHub.</D></span>,
  ]
}

function skillsOutput() {
  return [
    <span><W><Bold>Skills</Bold></W></span>,
    '',
    // TODO(content-pass): Replace with real skill list
    <span className="section-entry"><C>Languages  </C>{'  '}Rust, JavaScript, TypeScript, Python, Go</span>,
    <span className="section-entry"><C>Frontend   </C>{'  '}React, webpack, xterm.js, CSS</span>,
    <span className="section-entry"><C>Backend    </C>{'  '}Node.js, REST APIs, SQL</span>,
    <span className="section-entry"><C>Infra      </C>{'  '}GitHub Actions, Docker, AWS</span>,
    <span className="section-entry"><C>Tooling    </C>{'  '}git, vim, wasm-pack, cargo</span>,
  ]
}

function contactOutput() {
  return [
    <span><W><Bold>Contact</Bold></W></span>,
    '',
    <span className="section-entry">
      <C>Email       </C>{'  '}<Link href="mailto:mail@blakenelson.me">mail@blakenelson.me</Link>
    </span>,
    <span className="section-entry">
      <C>GitHub      </C>{'  '}<Link href="https://github.com/NelsonBlakeN">github.com/NelsonBlakeN</Link>
    </span>,
    <span className="section-entry">
      <C>LinkedIn    </C>{'  '}<Link href="https://linkedin.com/in/blakenelson19">linkedin.com/in/blakenelson19</Link>
    </span>,
    <span className="section-entry">
      <C>Pluralsight </C>{'  '}<Link href="https://app.pluralsight.com/profile/blake-nelson-30">pluralsight/blake-nelson-30</Link>
    </span>,
    <span className="section-entry">
      <C>LeetCode    </C>{'  '}<Link href="https://leetcode.com/frostedblakes">leetcode.com/frostedblakes</Link>
    </span>,
  ]
}

function versionOutput() {
  return [
    <span>blake version <G>{VERSION}</G></span>,
    <span><D>commit </D> {GIT_SHA}</span>,
    <span><D>built  </D> {BUILD_DATE}</span>,
    <span><D>wasm   </D> <D>pending (Rust core not yet compiled)</D></span>,
  ]
}

// ── Registry ───────────────────────────────────────────────────────────────────

const registry = {
  help:        { fn: helpOutput },
  about:       { fn: aboutOutput },
  experience:  { fn: experienceOutput },
  projects:    { fn: projectsOutput },
  skills:      { fn: skillsOutput },
  contact:     { fn: contactOutput },
  clear:       { fn: () => ({ type: 'clear' }) },
  gui:         { fn: () => ({ type: 'gui' }) },
  '--help':    { fn: helpOutput },
  '--version': { fn: versionOutput },
}

export const COMMAND_NAMES = [
  'about', 'experience', 'projects', 'skills', 'contact', 'gui', 'clear', 'help',
]

// ── WASM loader ────────────────────────────────────────────────────────────────

import { renderOutput } from './renderers.js'

let wasmRun = null

export async function loadWasm() {
  try {
    const m = await import('../../wasm-pkg/blake_wasm.js')
    wasmRun = m.run
  } catch (e) {
    console.warn('[blake] WASM failed to load, using JS fallback:', e)
  }
}

// ── Dispatcher ─────────────────────────────────────────────────────────────────

export function run(rawInput) {
  const tokens = rawInput.trim().split(/\s+/).filter(Boolean)
  if (!tokens.length) return []

  // WASM path: delegate to Rust core, render JSON output
  if (wasmRun) {
    const output = wasmRun(rawInput)
    // If the user explicitly passed --json, show the raw JSON string
    if (rawInput.includes('--json')) {
      return [<span className="t-dim">{output}</span>]
    }
    return renderOutput(output)
  }

  // JS fallback (used while WASM loads)
  let idx = 0
  if (tokens[idx] === 'blake') idx++
  if (idx >= tokens.length) return helpOutput()

  const cmd = tokens[idx]
  if (cmd === '--help')    return helpOutput()
  if (cmd === '--version') return versionOutput()
  if (registry[cmd]) return registry[cmd].fn(tokens.slice(idx + 1))

  return [<span className="t-red">blake: command not found: {cmd}</span>]
}
