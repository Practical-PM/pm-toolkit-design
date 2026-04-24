import { useState } from 'react'
import { ORBIT_DESTINATIONS } from '../patternContent'
import './previewShell.css'

export default function PreviewSideNav({ platform }) {
  const [active, setActive] = useState('proj')
  const sidebar = (
    <aside
      style={{
        width: platform === 'mobile' ? 72 : 88,
        borderRight: '1px solid var(--border-color)',
        padding: 6,
        flexShrink: 0,
      }}
      aria-label="Side navigation"
    >
      {ORBIT_DESTINATIONS.map((d) => (
        <button
          key={d.id}
          type="button"
          className={`np-preview__link ${active === d.id ? 'is-active' : ''}`}
          style={{ display: 'block', width: '100%', textAlign: 'left', marginBottom: 4 }}
          onClick={() => setActive(d.id)}
        >
          {d.label}
        </button>
      ))}
    </aside>
  )
  const main = (
    <main style={{ padding: 8, flex: 1, minWidth: 0 }}>
      <span className="np-preview__pill">Orbit</span>
      <p style={{ margin: '8px 0 0', color: 'var(--text-secondary)' }}>
        {ORBIT_DESTINATIONS.find((d) => d.id === active)?.label}
      </p>
    </main>
  )
  const row = (
    <div style={{ display: 'flex', minHeight: 120 }}>
      {sidebar}
      {main}
    </div>
  )

  if (platform === 'mobile') {
    return (
      <div className="np-preview__phone np-preview">
        <div className="np-preview__phone-notch">Orbit</div>
        {row}
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
      {row}
    </div>
  )
}
