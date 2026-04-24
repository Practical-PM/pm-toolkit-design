import { useState, useEffect, useCallback, useRef } from 'react'
import { ORBIT_DESTINATIONS } from '../patternContent'
import './previewShell.css'

export default function PreviewCommandPalette({ platform }) {
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')
  const inputRef = useRef(null)

  const onKey = useCallback(
    (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen((o) => !o)
      }
    },
    [],
  )

  useEffect(() => {
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onKey])

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 0)
    }
  }, [open])

  const palette = open && (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: 24,
        zIndex: 3,
      }}
      onClick={() => setOpen(false)}
    >
      <div
        style={{
          width: 'min(280px, 92%)',
          background: 'var(--bg-elevated)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-color)',
          padding: 8,
          boxShadow: 'var(--shadow-xl)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <input
          ref={inputRef}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Jump to…"
          style={{
            width: '100%',
            boxSizing: 'border-box',
            padding: 8,
            borderRadius: 'var(--radius-control)',
            border: '1px solid var(--border-color)',
            background: 'var(--bg-card)',
            color: 'var(--text-primary)',
            marginBottom: 8,
          }}
        />
        <ul style={{ listStyle: 'none', margin: 0, padding: 0, maxHeight: 120, overflow: 'auto' }}>
          {ORBIT_DESTINATIONS.filter((d) => d.label.toLowerCase().includes(q.toLowerCase())).map((d) => (
            <li key={d.id}>
              <button type="button" className="np-preview__link" style={{ width: '100%', textAlign: 'left' }} onClick={() => setOpen(false)}>
                Go to {d.label}
              </button>
            </li>
          ))}
        </ul>
        <p style={{ margin: '6px 0 0', fontSize: 9, color: 'var(--text-tertiary)' }}>⌘K / Ctrl+K to toggle</p>
      </div>
    </div>
  )

  const inner = (
    <div style={{ position: 'relative', minHeight: 130 }}>
      <div className="np-preview__nav-row" style={{ justifyContent: 'space-between', padding: 6 }}>
        <span className="np-preview__pill">Orbit</span>
        <button type="button" className="np-preview__link" onClick={() => setOpen(true)}>
          Open palette
        </button>
      </div>
      <div className="np-preview__body">
        <p style={{ margin: 0, color: 'var(--text-secondary)' }}>Try the button or keyboard shortcut.</p>
      </div>
      {palette}
    </div>
  )

  if (platform === 'mobile') {
    return (
      <div className="np-preview__phone np-preview">
        <div className="np-preview__phone-notch">Orbit</div>
        {inner}
      </div>
    )
  }

  return (
    <div className="np-preview">
      <div className="np-preview__browser-top">
        <span className="np-preview__dot" />
        <span className="np-preview__dot" />
        <span className="np-preview__dot" />
        <span className="np-preview__url">orbit.example</span>
      </div>
      {inner}
    </div>
  )
}
