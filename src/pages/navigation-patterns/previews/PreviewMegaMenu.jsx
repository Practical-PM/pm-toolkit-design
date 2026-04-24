import { useState } from 'react'
import './previewShell.css'

const COLS = [
  { title: 'Discover', links: ['Overview', 'Templates', 'What’s new'] },
  { title: 'Build', links: ['Projects', 'Roadmap', 'Specs'] },
  { title: 'Measure', links: ['Reports', 'Goals', 'Exports'] },
]

export default function PreviewMegaMenu() {
  const [open, setOpen] = useState(false)
  return (
    <div className="np-preview">
      <div className="np-preview__browser-top">
        <span className="np-preview__dot" />
        <span className="np-preview__dot" />
        <span className="np-preview__dot" />
        <span className="np-preview__url">orbit.example</span>
      </div>
      <div style={{ position: 'relative', padding: 8 }}>
        <nav className="np-preview__nav-row" aria-label="Primary">
          <span className="np-preview__pill">Orbit</span>
          <button type="button" className="np-preview__link is-active" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
            Product ▾
          </button>
          <button type="button" className="np-preview__link">
            Pricing
          </button>
        </nav>
        {open && (
          <div
            style={{
              position: 'absolute',
              left: 8,
              right: 8,
              top: '100%',
              marginTop: 4,
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 8,
              padding: 12,
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--shadow-surface)',
              zIndex: 2,
            }}
          >
            {COLS.map((c) => (
              <div key={c.title}>
                <div style={{ fontWeight: 700, marginBottom: 6, color: 'var(--primary-orange)', fontSize: 10 }}>{c.title}</div>
                {c.links.map((l) => (
                  <button key={l} type="button" className="np-preview__link" style={{ display: 'block', width: '100%', textAlign: 'left' }}>
                    {l}
                  </button>
                ))}
              </div>
            ))}
          </div>
        )}
        <div className="np-preview__body">
          <p style={{ margin: 0, color: 'var(--text-secondary)' }}>Marketing-style multi-column panel — click Product.</p>
        </div>
      </div>
    </div>
  )
}
