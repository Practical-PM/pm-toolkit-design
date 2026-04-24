import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './DesignLanding.css'

const entries = [
  {
    id: 'navigation-patterns',
    title: 'Navigation patterns',
    description:
      'Dedicated web vs mobile pattern lists with live previews, strengths and weaknesses, and questions to run with your designer and engineer.',
    path: '/navigation-patterns',
    icon: '🧭',
  },
]

export default function DesignLanding() {
  useEffect(() => {
    const prev = document.title
    document.title = 'PM Design — The PM Toolkit'
    return () => {
      document.title = prev
    }
  }, [])

  return (
    <div className="design-landing animate-fade-in">
      <header className="design-landing__hero ds-surface-card">
        <p className="design-landing__badge ds-type">PM Design</p>
        <h1 className="design-landing__title gradient-text ds-type">UX trade-offs for product trios</h1>
        <p className="design-landing__lead ds-type">
          PM Design is a decision lens on UX patterns — not a pattern library. Each page surfaces multiple options, makes strengths and weaknesses explicit, and
          gives you conversation starters for your next session with design and engineering.
        </p>
      </header>

      <section className="design-landing__grid" aria-label="Design topics">
        {entries.map((e, i) => (
          <article key={e.id} className={`design-landing__card ds-surface-card animate-fade-in stagger-${i + 1}`}>
            <div className="design-landing__card-icon" aria-hidden>
              {e.icon}
            </div>
            <h2 className="design-landing__card-title ds-type">{e.title}</h2>
            <p className="design-landing__card-desc ds-type">{e.description}</p>
            <Link to={e.path} className="btn-primary">
              Open
            </Link>
          </article>
        ))}
      </section>
    </div>
  )
}
