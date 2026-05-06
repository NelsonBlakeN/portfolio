import React, { useState } from 'react'
import Terminal from './Terminal.js'
import './styles/terminal.css'

export default function App() {
  const [mode, setMode] = useState('terminal')

  return (
    <>
      <button
        className="mode-toggle"
        onClick={() => setMode((m) => (m === 'terminal' ? 'gui' : 'terminal'))}
        aria-label={mode === 'terminal' ? 'Switch to GUI mode' : 'Switch to CLI mode'}
      >
        {mode === 'terminal' ? '[GUI]' : '[CLI]'}
      </button>

      {mode === 'terminal' ? (
        <Terminal onGuiMode={() => setMode('gui')} />
      ) : (
        <GuiMode onCliMode={() => setMode('terminal')} />
      )}
    </>
  )
}

// Placeholder GUI mode — full card layout coming in next pass
function GuiMode({ onCliMode }) {
  return (
    <div
      style={{
        fontFamily: "'Fira Code', 'Cascadia Code', 'JetBrains Mono', 'Courier New', monospace",
        background: '#0c0c0c',
        color: '#cccccc',
        height: '100vh',
        padding: '40px 24px',
        fontSize: '14px',
        lineHeight: '1.6',
      }}
    >
      <p style={{ color: '#4af626', marginBottom: '16px' }}>
        {'// GUI mode — coming soon'}
      </p>
      <p style={{ color: '#555' }}>
        The clickable card interface is being built. Click{' '}
        <button
          onClick={onCliMode}
          style={{
            background: 'none',
            border: 'none',
            color: '#56b6c2',
            fontFamily: 'inherit',
            fontSize: 'inherit',
            cursor: 'pointer',
            padding: 0,
          }}
        >
          [CLI]
        </button>{' '}
        to go back to the terminal.
      </p>
    </div>
  )
}
