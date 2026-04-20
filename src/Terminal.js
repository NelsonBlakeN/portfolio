import React, { useState, useEffect, useRef, useCallback } from 'react'
import { run, COMMAND_NAMES } from './commands/index.js'
import './styles/terminal.css'

// ── Boot sequence definition ───────────────────────────────────────────────────

const BOOT_STEPS = [
  { ms: 0,    content: <span><span className="t-green">$</span>{' npm install @blake/portfolio'}</span> },
  { ms: 120,  content: '' },
  { ms: 200,  content: <span className="boot-warn">npm warn deprecated <span className="t-dim">chalk@4.1.2</span>: Use chalk@5 instead</span> },
  { ms: 260,  content: <span className="boot-warn">npm warn deprecated <span className="t-dim">colors@1.4.0</span>: Consider using chalk</span> },
  { ms: 320,  content: '' },
  { ms: 900,  content: <span>added <span className="t-white">1</span> package, and audited <span className="t-white">2</span> packages in <span className="t-green">782ms</span></span> },
  { ms: 1050, content: '' },
  { ms: 1100, content: <span><span className="t-green">found 0 vulnerabilities</span></span> },
  { ms: 1200, content: '' },
  { ms: 1350, content: <span className="t-dim">{'> @blake/portfolio@1.0.0 postinstall'}</span> },
  { ms: 1450, content: <span className="t-dim">{'> blake --help'}</span> },
  { ms: 1550, content: '' },
]

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

// ── Terminal component ─────────────────────────────────────────────────────────

let lineIdCounter = 0
const nextId = () => ++lineIdCounter

function makeLine(content) {
  return { id: nextId(), content }
}

export default function Terminal({ onGuiMode }) {
  const [lines, setLines] = useState([])
  const [input, setInput] = useState('')
  const [history, setHistory] = useState([])
  const [histIdx, setHistIdx] = useState(-1)
  const [booting, setBooting] = useState(true)

  const inputRef = useRef(null)
  const bottomRef = useRef(null)
  const prefersReducedMotion = useRef(
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  // auto-scroll to bottom whenever lines change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'instant' })
  }, [lines])

  // focus input after booting
  useEffect(() => {
    if (!booting) inputRef.current?.focus()
  }, [booting])

  const addLines = useCallback((contents) => {
    if (!Array.isArray(contents)) contents = [contents]
    setLines((prev) => [
      ...prev,
      ...contents.map((c) => makeLine(c)),
    ])
  }, [])

  // boot sequence on mount
  useEffect(() => {
    let cancelled = false

    const boot = async () => {
      const noMotion = prefersReducedMotion.current

      for (const step of BOOT_STEPS) {
        if (cancelled) return
        if (!noMotion) await sleep(step.ms - (BOOT_STEPS[0]?.ms ?? 0))
        else await sleep(0) // still yield to let React batch
        addLines([step.content])
      }

      if (cancelled) return

      // auto-run blake --help
      const helpResult = run('blake --help')
      if (Array.isArray(helpResult)) addLines(helpResult)

      addLines([''])
      if (!cancelled) setBooting(false)
    }

    // run boot with absolute timing from mount
    const startTime = Date.now()
    let timer
    const scheduleStep = (i) => {
      if (i >= BOOT_STEPS.length) {
        // all steps done, emit help
        const helpResult = run('blake --help')
        if (Array.isArray(helpResult)) {
          setLines((prev) => [
            ...prev,
            ...helpResult.map((c) => makeLine(c)),
          ])
        }
        setLines((prev) => [...prev, makeLine('')])
        setBooting(false)
        return
      }

      const step = BOOT_STEPS[i]
      const elapsed = Date.now() - startTime
      const wait = prefersReducedMotion.current ? 0 : Math.max(0, step.ms - elapsed)

      timer = setTimeout(() => {
        if (cancelled) return
        setLines((prev) => [...prev, makeLine(step.content)])
        scheduleStep(i + 1)
      }, wait)
    }

    scheduleStep(0)
    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const submitCommand = useCallback(
    (raw) => {
      const trimmed = raw.trim()

      // echo the typed command
      setLines((prev) => [
        ...prev,
        makeLine(
          <span className="line-input">
            <span className="line-prompt">$</span>
            <span>{trimmed}</span>
          </span>
        ),
      ])

      if (!trimmed) return

      const result = run(trimmed)

      if (result && result.type === 'clear') {
        setLines([])
        return
      }

      if (result && result.type === 'gui') {
        onGuiMode?.()
        return
      }

      if (Array.isArray(result) && result.length > 0) {
        setLines((prev) => [
          ...prev,
          ...result.map((c) => makeLine(c)),
          makeLine(''),
        ])
      }

      setHistory((prev) => [trimmed, ...prev])
      setHistIdx(-1)
    },
    [onGuiMode]
  )

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        const val = input
        setInput('')
        submitCommand(val)
        return
      }

      if (e.key === 'Tab') {
        e.preventDefault()
        const partial = input.replace(/^blake\s+/, '').trim()
        const prefix = input.startsWith('blake') ? 'blake ' : ''
        const matches = COMMAND_NAMES.filter((c) => c.startsWith(partial))
        if (matches.length === 1) {
          setInput(prefix + matches[0])
        } else if (matches.length > 1 && partial) {
          // show completions
          setLines((prev) => [
            ...prev,
            makeLine(
              <span className="t-dim">{matches.join('  ')}</span>
            ),
          ])
        }
        return
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault()
        const newIdx = Math.min(histIdx + 1, history.length - 1)
        setHistIdx(newIdx)
        setInput(history[newIdx] ?? '')
        return
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault()
        const newIdx = histIdx - 1
        if (newIdx < 0) {
          setHistIdx(-1)
          setInput('')
        } else {
          setHistIdx(newIdx)
          setInput(history[newIdx] ?? '')
        }
        return
      }

      if (e.key === 'l' && e.ctrlKey) {
        e.preventDefault()
        setLines([])
        return
      }
    },
    [input, history, histIdx, submitCommand]
  )

  const focusInput = () => {
    if (!booting) inputRef.current?.focus()
  }

  return (
    <div className="terminal-wrapper" onClick={focusInput}>
      <div className="scrollback">
        {lines.map(({ id, content }) => (
          <div key={id} className="line">
            {content === '' || content == null ? '\u00A0' : content}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {!booting && (
        <div className="input-row">
          <span className="input-prompt">$</span>
          <input
            ref={inputRef}
            className="terminal-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            aria-label="Terminal input"
          />
        </div>
      )}
    </div>
  )
}
