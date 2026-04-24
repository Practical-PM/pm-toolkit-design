import { lazy, Suspense, useEffect, useState, useCallback, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Button } from '@toolkit-pm/design-system/components'
import { getNavPatterns, firstPatternIdForPlatform, patternIdsForPlatform } from './patternContent'
import { navigationPatternsJsonLd } from './navigationJsonLd'
import './NavigationPatterns.css'

const LazyTopNav = lazy(() => import('./previews/PreviewTopNav.jsx'))
const LazySideNav = lazy(() => import('./previews/PreviewSideNav.jsx'))
const LazyTabs = lazy(() => import('./previews/PreviewTabs.jsx'))
const LazyBottomNav = lazy(() => import('./previews/PreviewBottomNav.jsx'))
const LazyHamburger = lazy(() => import('./previews/PreviewHamburger.jsx'))
const LazyBreadcrumbs = lazy(() => import('./previews/PreviewBreadcrumbs.jsx'))
const LazyCommandPalette = lazy(() => import('./previews/PreviewCommandPalette.jsx'))
const LazyMegaMenu = lazy(() => import('./previews/PreviewMegaMenu.jsx'))

const PREVIEW_BY_ID = {
  'top-nav': LazyTopNav,
  'side-nav': LazySideNav,
  tabs: LazyTabs,
  'bottom-nav': LazyBottomNav,
  hamburger: LazyHamburger,
  breadcrumbs: LazyBreadcrumbs,
  'command-palette': LazyCommandPalette,
  'mega-menu': LazyMegaMenu,
}

async function copyTextToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    try {
      const ta = document.createElement('textarea')
      ta.value = text
      ta.setAttribute('readonly', '')
      ta.style.position = 'fixed'
      ta.style.left = '-9999px'
      document.body.appendChild(ta)
      ta.select()
      const ok = document.execCommand('copy')
      document.body.removeChild(ta)
      return ok
    } catch {
      return false
    }
  }
}

function trioBlockText(pattern) {
  const d = pattern.askDesigner.map((q, i) => `${i + 1}. ${q}`).join('\n')
  const e = pattern.askEngineer.map((q, i) => `${i + 1}. ${q}`).join('\n')
  return `Designer questions — ${pattern.label}:\n${d}\n\nEngineering questions — ${pattern.label}:\n${e}`
}

function PreviewBody({ pattern, platform }) {
  const C = PREVIEW_BY_ID[pattern.id]
  if (!C) return null
  return (
    <Suspense fallback={<div className="np-skeleton" aria-hidden />}>
      <C platform={platform} />
    </Suspense>
  )
}

export default function NavigationPatterns() {
  const [searchParams, setSearchParams] = useSearchParams()
  const platform = searchParams.get('platform') === 'mobile' ? 'mobile' : 'web'
  const patterns = useMemo(() => getNavPatterns(platform), [platform])
  const [expandedId, setExpandedId] = useState('top-nav')
  const [pinnedIds, setPinnedIds] = useState(() => new Set())
  const [copyInfo, setCopyInfo] = useState(null)

  const setPlatform = useCallback(
    (next) => {
      setSearchParams({ platform: next }, { replace: true })
    },
    [setSearchParams],
  )

  useEffect(() => {
    const allowed = new Set(patternIdsForPlatform(platform))
    setExpandedId((cur) => (allowed.has(cur) ? cur : firstPatternIdForPlatform(platform)))
    setPinnedIds((prev) => {
      const next = new Set()
      prev.forEach((id) => {
        if (allowed.has(id)) next.add(id)
      })
      return next
    })
  }, [platform])

  useEffect(() => {
    const previousTitle = document.title
    document.title = 'Navigation Patterns: Compare UX Options for Your Product | PM Toolkit'
    let meta = document.querySelector('meta[name="description"]')
    const prevDesc = meta?.getAttribute('content') ?? ''
    const desc =
      'Separate pattern lists for web and mobile — live previews, strengths and weaknesses, and trio questions for designers and engineers.'
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', 'description')
      document.head.appendChild(meta)
    }
    meta.setAttribute('content', desc)

    const canonical = document.createElement('link')
    canonical.rel = 'canonical'
    canonical.href = 'https://practicalpm.tools/design/navigation-patterns'
    canonical.setAttribute('data-np-meta', '1')
    document.head.appendChild(canonical)

    const ogTitle = document.createElement('meta')
    ogTitle.setAttribute('property', 'og:title')
    ogTitle.content = 'Navigation Patterns — PM Toolkit'
    ogTitle.setAttribute('data-np-meta', '1')
    document.head.appendChild(ogTitle)

    const ogDesc = document.createElement('meta')
    ogDesc.setAttribute('property', 'og:description')
    ogDesc.content = desc
    ogDesc.setAttribute('data-np-meta', '1')
    document.head.appendChild(ogDesc)

    return () => {
      document.title = previousTitle
      if (meta) meta.setAttribute('content', prevDesc)
      document.head.querySelectorAll('[data-np-meta]').forEach((n) => n.remove())
    }
  }, [])

  useEffect(() => {
    const data = JSON.stringify(navigationPatternsJsonLd())
    const s = document.createElement('script')
    s.type = 'application/ld+json'
    s.setAttribute('data-from', 'navigation-patterns')
    s.textContent = data
    document.head.appendChild(s)
    return () => {
      document.head.querySelector('script[data-from="navigation-patterns"]')?.remove()
    }
  }, [])

  const toggleExpand = (id) => {
    setExpandedId((e) => (e === id ? null : id))
  }

  const togglePin = (id) => {
    setPinnedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else if (next.size < 3) next.add(id)
      return next
    })
  }

  const onCopyTrio = async (pattern) => {
    const ok = await copyTextToClipboard(trioBlockText(pattern))
    setCopyInfo({ id: pattern.id, kind: ok ? 'ok' : 'err' })
    setTimeout(() => setCopyInfo(null), 2500)
  }

  const pinnedPatterns = patterns.filter((p) => pinnedIds.has(p.id))

  return (
    <article className="np-page">
      <nav className="ds-type" style={{ marginBottom: 'var(--spacing-lg)', fontSize: '0.9rem' }}>
        <Link to="/" style={{ color: 'var(--text-secondary)' }}>
          PM Design
        </Link>
        <span style={{ color: 'var(--text-tertiary)', margin: '0 0.5rem' }}>/</span>
        <span style={{ color: 'var(--text-primary)' }}>Navigation patterns</span>
      </nav>

      <header className="np-page__intro">
        <h1 className="np-page__h1">Navigation patterns</h1>
        <p className="np-page__deck ds-type">
          Your product&apos;s navigation is one of the earliest and highest-leverage UX decisions you&apos;ll make with your design and engineering partners.
          Pick <strong>Web</strong> or <strong>Mobile</strong> to see a dedicated set of patterns for that platform — each with live previews, honest strengths and
          weaknesses, and the questions to ask your trio before you commit.
        </p>
      </header>

      <div className="np-platform">
        <span className="np-platform__label">Platform</span>
        <div className="np-platform__toggle" role="group" aria-label="Preview platform">
          <button type="button" className={`np-platform__opt ${platform === 'web' ? 'is-on' : ''}`} onClick={() => setPlatform('web')}>
            Web
          </button>
          <button type="button" className={`np-platform__opt ${platform === 'mobile' ? 'is-on' : ''}`} onClick={() => setPlatform('mobile')}>
            Mobile
          </button>
        </div>
      </div>

      <section
        aria-label={platform === 'web' ? 'Web navigation patterns' : 'Mobile navigation patterns'}
        className="np-cards"
      >
        {patterns.map((pattern) => {
          const expanded = expandedId === pattern.id
          return (
            <div key={pattern.id} className="np-card">
              <button type="button" className="np-card__head" onClick={() => toggleExpand(pattern.id)} aria-expanded={expanded}>
                <div className="np-card__title-row">
                  <h2 className="np-card__title">{pattern.label}</h2>
                </div>
                <span className="np-card__chev" aria-hidden>
                  {expanded ? '▾' : '▸'}
                </span>
              </button>
              {expanded && (
                <div className="np-card__body">
                  <div className="np-preview-wrap">
                    <PreviewBody pattern={pattern} platform={platform} />
                  </div>
                  <div className="np-meta-grid">
                    <div className="np-meta">
                      <h3>Strong at</h3>
                      <ul>
                        {pattern.strongAt.map((t) => (
                          <li key={t}>{t}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="np-meta">
                      <h3>Weak at</h3>
                      <ul>
                        {pattern.weakAt.map((t) => (
                          <li key={t}>{t}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="np-meta">
                      <h3>Use when</h3>
                      <ul>
                        {pattern.useWhen.map((t) => (
                          <li key={t}>{t}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="np-meta">
                      <h3>Avoid when</h3>
                      <ul>
                        {pattern.avoidWhen.map((t) => (
                          <li key={t}>{t}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="np-meta np-meta--design">
                      <h3>Questions for your designer</h3>
                      <ul>
                        {pattern.askDesigner.map((t) => (
                          <li key={t}>{t}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="np-meta np-meta--eng">
                      <h3>Questions for your engineer</h3>
                      <ul>
                        {pattern.askEngineer.map((t) => (
                          <li key={t}>{t}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <p className="np-example ds-type">
                    <strong>Example:</strong>{' '}
                    <a href={pattern.exampleUrl} target="_blank" rel="noopener noreferrer">
                      {pattern.exampleName}
                    </a>
                  </p>
                  <div className="np-actions">
                    <Button type="button" variant="secondary" onClick={() => togglePin(pattern.id)} disabled={!pinnedIds.has(pattern.id) && pinnedIds.size >= 3}>
                      {pinnedIds.has(pattern.id) ? 'Unpin from tray' : 'Pin to comparison tray'}
                    </Button>
                    <Button type="button" variant="primary" onClick={() => onCopyTrio(pattern)}>
                      Copy the trio questions
                    </Button>
                    {copyInfo?.id === pattern.id && copyInfo.kind === 'ok' && (
                      <span className="ds-type" style={{ color: 'var(--success)', fontSize: '0.9rem', alignSelf: 'center' }}>
                        Copied
                      </span>
                    )}
                    {copyInfo?.id === pattern.id && copyInfo.kind === 'err' && (
                      <span className="ds-type" style={{ color: 'var(--error)', fontSize: '0.9rem', alignSelf: 'center' }}>
                        Copy failed — select and copy manually
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </section>

      {pinnedPatterns.length > 0 && (
        <div className="np-tray" role="region" aria-label="Pinned pattern comparison">
          <div className="np-tray__inner">
            <h3 className="np-tray__title">Comparison tray (max 3)</h3>
            <div className="np-tray__cols">
              {pinnedPatterns.map((p) => (
                <div key={p.id} className="np-tray__col">
                  <h4>{p.label}</h4>
                  <div style={{ marginBottom: 6 }}>
                    <strong style={{ fontSize: '0.75rem', color: 'var(--success)' }}>Strong</strong>
                    <ul>
                      {p.strongAt.slice(0, 3).map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <strong style={{ fontSize: '0.75rem', color: 'var(--error)' }}>Weak</strong>
                    <ul>
                      {p.weakAt.slice(0, 3).map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="np-prose ds-type">
        <h2>How to use it</h2>
        <ol>
          <li>Pick your platform at the top (Web or Mobile).</li>
          <li>Skim the pattern list for that platform. Expand any that feel like a candidate.</li>
          <li>Try the live preview. Click through it the way a user would.</li>
          <li>Read &quot;Strong at&quot; and &quot;Weak at&quot; honestly against your product&apos;s use case.</li>
          <li>Pin your top 2–3 candidates to the comparison tray.</li>
          <li>Copy the trio questions and take them into your next design and engineering conversation.</li>
        </ol>

        <h2>Real-world examples</h2>
        <ul>
          <li>
            <strong>Linear</strong> — command palette as the spine of navigation, with a minimal sidebar. Strong for keyboard-first power users; weak for first-time
            users who don&apos;t know what to type.
          </li>
          <li>
            <strong>Notion</strong> — persistent sidebar with nested hierarchy and breadcrumbs inside documents. Strong for deep content hierarchies; weak on small
            screens without collapse.
          </li>
          <li>
            <strong>Instagram</strong> — bottom tab bar with five destinations. Strong for habitual return-to-hub use; weak when secondary destinations multiply.
          </li>
        </ul>

        <h2>Common mistakes</h2>
        <ol>
          <li>
            <strong>Picking the pattern before the information architecture.</strong> Navigation is an expression of IA — if the IA is wrong, no pattern will save
            it.
          </li>
          <li>
            <strong>Copying the pattern your favourite product uses without checking fit.</strong> Linear&apos;s command palette works because its users are
            technical and repetitive-task-heavy. Yours may not be.
          </li>
          <li>
            <strong>Treating hamburger menus as a default for &quot;too many links&quot;.</strong> They hide discovery and kill engagement with non-primary
            destinations; the real problem is usually too many top-level items.
          </li>
          <li>
            <strong>Designing web and mobile navigation in isolation.</strong> The mental model should feel continuous across platforms even if the pattern differs.
          </li>
        </ol>

        <h2>When to use / when not to</h2>
        <p>Navigation patterns aren&apos;t interchangeable. Broadly:</p>
        <ul>
          <li>
            <strong>Frequent, habitual return to a small number of destinations</strong> → bottom tabs (mobile) / top nav (web)
          </li>
          <li>
            <strong>Deep hierarchies, many destinations</strong> → side nav with nesting, breadcrumbs for wayfinding
          </li>
          <li>
            <strong>Power users, repetitive tasks, keyboard-first</strong> → command palette as primary or supplementary
          </li>
          <li>
            <strong>Content-heavy marketing sites with many categories</strong> → mega menu
          </li>
          <li>
            <strong>Task-oriented linear flows</strong> → consider whether navigation should be suppressed entirely (stepper or workflow instead)
          </li>
        </ul>

        <h2>Origins and attribution</h2>
        <p>
          Navigation patterns are a body of practice rather than one framework. Useful references include Jakob Nielsen and Don Norman&apos;s usability work and{' '}
          <a href="https://www.nngroup.com/articles/navigation-you-are-here/">NN/g on navigation</a>,{' '}
          <a href="https://m3.material.io/foundations/layout/understanding-layout/navigation">Material Design navigation</a>, Apple Human Interface Guidelines for
          tab bars and sidebars, and long-running catalogues of mobile patterns (for example Smashing Magazine).
        </p>

        <h2>Related tools</h2>
        <ul>
          <li>
            <a href="/heuristics/two-way-doors">Two-way doors</a> — sort reversible vs irreversible bets while you reshape navigation.
          </li>
          <li>
            <a href="/tools/build-vs-buy">Build vs buy</a> — when navigation work implies platform or vendor choices.
          </li>
          <li>
            <a href="/tools/cognitive-load">Cognitive load</a> — check how much each pattern asks of your users.
          </li>
        </ul>
      </div>
    </article>
  )
}
