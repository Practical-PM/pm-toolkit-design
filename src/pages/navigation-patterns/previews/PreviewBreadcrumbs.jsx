import { useState } from 'react'
import './previewShell.css'

const CRUMBS = ['Orbit', 'Projects', 'Acme rollout', 'Tasks']

export default function PreviewBreadcrumbs({ platform }) {
  const [depth, setDepth] = useState(3)
  const crumbs = CRUMBS.slice(0, depth + 1)
  const inner = (
    <>
      <nav aria-label="Breadcrumb" className="np-preview__nav-row" style={{ fontSize: 10, flexWrap: 'wrap' }}>
        {crumbs.map((c, i) => (
          <span key={c} style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            {i > 0 && <span style={{ color: 'var(--text-tertiary)' }}>/</span>}
            <button
              type="button"
              className={`np-preview__link ${i === crumbs.length - 1 ? 'is-active' : ''}`}
              style={{ padding: '2px 4px' }}
              onClick={() => setDepth(i)}
            >
              {c}
            </button>
          </span>
        ))}
      </nav>
      <div className="np-preview__body">
        <p style={{ margin: 0, color: 'var(--text-secondary)' }}>You are in: {crumbs[crumbs.length - 1]}</p>
      </div>
    </>
  )

  if (platform === 'mobile') {
    return (
      <div className="np-preview__phone np-preview">
        <div className="np-preview__phone-notch">Orbit</div>
        <div style={{ padding: 8 }}>{inner}</div>
      </div>
    )
  }

  return (
    <div className="np-preview">
      <div className="np-preview__browser-top">
        <span className="np-preview__dot" />
        <span className="np-preview__dot" />
        <span className="np-preview__dot" />
        <span className="np-preview__url">orbit.example/…/tasks</span>
      </div>
      <div style={{ padding: 8 }}>{inner}</div>
    </div>
  )
}
