import { useState, useRef, useEffect } from 'react'
import { ORBIT_DESTINATIONS } from '../patternContent'
import './previewShell.css'

export default function PreviewHamburger({ platform }) {
  const [open, setOpen] = useState(false)
  const closeBtnRef = useRef(null)

  useEffect(() => {
    if (open) closeBtnRef.current?.focus()
  }, [open])

  const drawer = open && (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(0,0,0,0.45)',
        zIndex: 2,
      }}
    >
      <nav
        style={{
          width: 'min(160px, 75%)',
          height: '100%',
          background: 'var(--bg-elevated)',
          padding: 12,
          boxShadow: 'var(--shadow-surface)',
        }}
      >
        <button ref={closeBtnRef} type="button" className="np-preview__link" style={{ marginBottom: 8 }} onClick={() => setOpen(false)}>
          Close ✕
        </button>
        {ORBIT_DESTINATIONS.map((d) => (
          <button key={d.id} type="button" className="np-preview__link" style={{ display: 'block', width: '100%', textAlign: 'left' }} onClick={() => setOpen(false)}>
            {d.label}
          </button>
        ))}
      </nav>
    </div>
  )

  const chrome = (
    <div style={{ position: 'relative', minHeight: 130 }}>
      <header className="np-preview__nav-row" style={{ justifyContent: 'space-between', padding: 6 }}>
        <span className="np-preview__pill">Orbit</span>
        <button type="button" className="np-preview__link" aria-expanded={open} onClick={() => setOpen(true)}>
          ☰ Menu
        </button>
      </header>
      <div className="np-preview__body">
        <p style={{ margin: 0, color: 'var(--text-secondary)' }}>Main canvas — menu {open ? 'open' : 'closed'}.</p>
      </div>
      {drawer}
    </div>
  )

  if (platform === 'mobile') {
    return (
      <div className="np-preview__phone np-preview">
        <div className="np-preview__phone-notch">Orbit</div>
        {chrome}
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
      {chrome}
    </div>
  )
}
