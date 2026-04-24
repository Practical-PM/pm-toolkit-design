import { useState } from 'react'
import './previewShell.css'

const TABS = [
  { id: 'list', label: 'List' },
  { id: 'board', label: 'Board' },
  { id: 'cal', label: 'Calendar' },
]

export default function PreviewTabs({ platform }) {
  const [tab, setTab] = useState('list')
  const body = (
    <>
      <div role="tablist" aria-label="View tabs" className="np-preview__nav-row" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: 6 }}>
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            className={`np-preview__link ${tab === t.id ? 'is-active' : ''}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="np-preview__body" role="tabpanel">
        <span className="np-preview__pill">Projects</span>
        <p style={{ margin: '8px 0 0', color: 'var(--text-secondary)' }}>
          {tab === 'list' && 'Rows and filters for your backlog.'}
          {tab === 'board' && 'Cards by status — drag in the real app.'}
          {tab === 'cal' && 'Deadlines plotted on a timeline.'}
        </p>
      </div>
    </>
  )

  if (platform === 'mobile') {
    return (
      <div className="np-preview__phone np-preview">
        <div className="np-preview__phone-notch">Orbit</div>
        <div style={{ padding: 8 }}>{body}</div>
      </div>
    )
  }

  return (
    <div className="np-preview">
      <div className="np-preview__browser-top">
        <span className="np-preview__dot" />
        <span className="np-preview__dot" />
        <span className="np-preview__dot" />
        <span className="np-preview__url">orbit.example/projects</span>
      </div>
      <div style={{ padding: 8 }}>{body}</div>
    </div>
  )
}
