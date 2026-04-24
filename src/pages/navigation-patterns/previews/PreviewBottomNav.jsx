import { useState } from 'react'
import { ORBIT_DESTINATIONS } from '../patternContent'
import './previewShell.css'

const MOBILE_TABS = ORBIT_DESTINATIONS.slice(0, 5)

export default function PreviewBottomNav() {
  const [active, setActive] = useState('dash')
  return (
    <div className="np-preview__phone np-preview" style={{ paddingBottom: 0 }}>
      <div className="np-preview__phone-notch">Orbit</div>
      <div style={{ padding: '12px 8px 48px', minHeight: 100 }}>
        <span className="np-preview__pill">Home</span>
        <p style={{ margin: '8px 0 0', color: 'var(--text-secondary)' }}>
          {MOBILE_TABS.find((d) => d.id === active)?.label}
        </p>
      </div>
      <nav
        role="tablist"
        aria-label="Primary"
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          borderTop: '1px solid var(--border-color)',
          padding: '6px 0',
          background: 'var(--bg-elevated)',
        }}
      >
        {MOBILE_TABS.map((d) => (
          <button
            key={d.id}
            type="button"
            role="tab"
            aria-selected={active === d.id}
            className={`np-preview__link ${active === d.id ? 'is-active' : ''}`}
            style={{ flex: 1, textAlign: 'center', fontSize: 10 }}
            onClick={() => setActive(d.id)}
          >
            {d.label.split(' ')[0]}
          </button>
        ))}
      </nav>
    </div>
  )
}
