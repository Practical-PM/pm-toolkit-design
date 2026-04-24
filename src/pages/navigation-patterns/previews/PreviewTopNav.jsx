import { useState } from 'react'
import { ORBIT_DESTINATIONS } from '../patternContent'
import './previewShell.css'

/** @param {{ platform: 'web' | 'mobile' }} props */
export default function PreviewTopNav({ platform }) {
  const [active, setActive] = useState('dash')
  const inner = (
    <>
      <nav className="np-preview__nav-row" aria-label="Orbit top navigation demo">
        {ORBIT_DESTINATIONS.map((d) => (
          <button
            key={d.id}
            type="button"
            className={`np-preview__link ${active === d.id ? 'is-active' : ''}`}
            onClick={() => setActive(d.id)}
          >
            {d.label}
          </button>
        ))}
      </nav>
      <div className="np-preview__body">
        <span className="np-preview__pill">Orbit</span>
        <p style={{ margin: '8px 0 0', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
          {ORBIT_DESTINATIONS.find((d) => d.id === active)?.label} — sample content area.
        </p>
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
        <span className="np-preview__url">orbit.example</span>
      </div>
      <div style={{ padding: 8 }}>{inner}</div>
    </div>
  )
}
