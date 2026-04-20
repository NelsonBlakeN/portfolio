import React from 'react'

const Link = ({ href, children }) => (
  <a className="term-link" href={href} target="_blank" rel="noopener noreferrer">
    {children}
  </a>
)

function renderHelp({ commands, flags }) {
  return [
    <span><span className="t-white t-bold">blake</span>{' <command> [flags]'}</span>,
    '',
    <span className="t-white">Commands:</span>,
    ...commands.map(({ name, desc }) => (
      <span key={name}>{'  '}<span className="t-cyan">{name.padEnd(14)}</span>{desc}</span>
    )),
    '',
    <span className="t-white">Flags:</span>,
    ...flags.map(({ name, desc }) => (
      <span key={name}>{'  '}<span className="t-yellow">{name.padEnd(14)}</span>{desc}</span>
    )),
    '',
    <span className="t-dim">{"Type 'blake <command>' to get started."}</span>,
  ]
}

function renderAbout({ name, title, bio, github }) {
  return [
    <span className="t-white t-bold">{name}</span>,
    <span className="t-dim">{title}</span>,
    '',
    ...bio.map((line, i) => <span key={i}>{line}</span>),
    '',
    <Link href={github}>{github.replace('https://', '')}</Link>,
  ]
}

function renderExperience({ entries }) {
  const lines = [<span className="t-white t-bold">Experience</span>]
  for (const e of entries) {
    lines.push('')
    lines.push(
      <span>
        {'  '}<span className="t-white t-bold">{e.title}</span>
        {'  '}<span className="t-dim">{e.period}</span>
      </span>
    )
    lines.push(<span>{'  '}<span className="t-dim">{e.company}</span></span>)
    for (const b of e.bullets) {
      lines.push(<span>{'  '}{b}</span>)
    }
  }
  return lines
}

function renderProjects({ projects }) {
  const lines = [<span className="t-white t-bold">Projects</span>]
  for (const p of projects) {
    lines.push('')
    lines.push(
      <span>
        {'  '}<span className="t-white t-bold">{p.name}</span>
        {'  '}<span className="t-dim">{p.year}</span>
      </span>
    )
    lines.push(<span>{'  '}{p.description}</span>)
    if (p.url) {
      lines.push(
        <span>{'  '}<Link href={p.url}>{p.url.replace('https://', '')}</Link></span>
      )
    }
  }
  return lines
}

function renderSkills({ categories }) {
  return [
    <span className="t-white t-bold">Skills</span>,
    '',
    ...categories.map(({ name, skills }) => (
      <span key={name}>
        {'  '}<span className="t-cyan">{name.padEnd(12)}</span>
        {'  '}{skills.join(', ')}
      </span>
    )),
  ]
}

function renderContact({ links }) {
  return [
    <span className="t-white t-bold">Contact</span>,
    '',
    ...links.map(({ label, url, display }) => (
      <span key={label}>
        {'  '}<span className="t-cyan">{label.padEnd(12)}</span>
        {'  '}<Link href={url}>{display}</Link>
      </span>
    )),
  ]
}

function renderVersion({ version, sha, built }) {
  return [
    <span>blake version <span className="t-green">{version}</span></span>,
    sha   ? <span><span className="t-dim">{'commit  '}</span>{sha}</span>   : null,
    built ? <span><span className="t-dim">{'built   '}</span>{built}</span> : null,
  ].filter(Boolean)
}

// ── Public API ─────────────────────────────────────────────────────────────────

export function renderOutput(output) {
  if (output === '__CLEAR__') return { type: 'clear' }
  if (output === '__GUI__')   return { type: 'gui' }

  let data
  try {
    data = JSON.parse(output)
  } catch {
    // plain text: error messages from the Rust core
    return [<span className="t-red">{output}</span>]
  }

  switch (data.type) {
    case 'help':       return renderHelp(data)
    case 'about':      return renderAbout(data)
    case 'experience': return renderExperience(data)
    case 'projects':   return renderProjects(data)
    case 'skills':     return renderSkills(data)
    case 'contact':    return renderContact(data)
    case 'version':    return renderVersion(data)
    default:           return [`Unknown output type: ${data.type}`]
  }
}
