import { useState, useEffect, useRef, useCallback } from 'react'

const TESTIMONIALS = [
  {
    initials: 'FK', name: 'Firat Koseoglu',
    role: 'Partner, IP Litigation', firm: 'Hartwell & Reid LLP',
    tag: 'Portfolio Monitoring',
    quote: 'Patent Gap AI closes the enforcement activation gap in the IP market by transforming static patent portfolios into continuously monitored, evidence-backed infringement leads that are scalable, defensible, and commercially actionable.',
  },
  {
    initials: 'JK', name: 'Jarkko Konola',
    role: 'Chief IP Counsel', firm: 'Volaris Technologies',
    tag: 'Licensing Strategy',
    quote: "Patent Gap AI closes the IP market's biggest gap by turning slow, fragmented patent infringement detection and claim-to-evidence mapping into a scalable, traceable, and auditable workflow that patent professionals can trust and act on.",
  },
  {
    initials: 'AS', name: 'Ashwani Sethi',
    role: 'Principal Patent Attorney', firm: 'Okafor IP Group',
    tag: 'Small Firm Access',
    quote: "Patent Gap AI closes the critical gap between product literature availability and the manual, time-consuming process of identifying and providng accurate evidence of use analysis with confidence scoring.",
  },
  {
    initials: 'JK', name: 'W. John Keyes',
    role: 'Director of Patents', firm: 'Meridian Life Sciences',
    tag: 'Enforcement Prep',
    quote: "The structured evidence reports are exactly what we need to move from internal review to external counsel. The documentation quality has shortened our pre-litigation preparation by weeks.",
  },
  {
    initials: 'PH', name: 'Peter Holmes',
    role: 'Senior Patent Counsel', firm: 'TechBridge Global',
    tag: 'Claim Mapping',
    quote: "[Fully- or substantially fully-]automated: (1) patent and patent claims strength assessment and likely Federal District Court claim interpretation/construction; (2) search for and identification of strongest infringement candidate products/services; and (3) mapping of accused product(s) to properly construed claim elements.",
  },
  {
    initials: 'MK', name: 'Matthew Kwak',
    role: 'IP Strategy Partner', firm: 'Wren & Associates',
    tag: 'Legal Workflows',
    quote: "Patent Gap AI would lower the barriers to enforcement facilitating the practical use of a patent that would otherwise merely 'collect dust'.",
  },
  {
    initials: 'BL', name: 'Brent Lindon',
    role: 'VP Intellectual Property', firm: 'Axiom Semiconductor',
    tag: 'Large Portfolios',
    quote: "Patent Gap AI turns dormant patents into enforceable assets by automating the expensive, manual screening process that currently prevents 90%+ of patent portfolios from ever reaching the enforcement or licensing stage.",
  },
  {
    initials: 'SYS', name: 'Shannon Yen Stahl',
    role: 'Partner, Patent Prosecution', firm: 'Castillo & North LLP',
    tag: 'Early Detection',
    quote: "Patent Gap AI closes the 'Technical-to-Legal Execution Gap' by transforming months of manual forensic auditing into an instantaneous, dual-sided litigation engine that generates court-ready infringement complaints for plaintiffs and automates airtight invalidity and inventorship defenses for defendants.",
  },
  {
    initials: 'AL', name: 'Alexandre LIASHENKO',
    role: 'Managing Partner', firm: 'Nakamura Patent Law',
    tag: 'Client Advisory',
    quote: "Patent Gap AI closes the surveillance blind spot between patent grant and infringement discovery — replacing the manual, expensive, and episodic monitoring process with continuous, AI-driven detection that flags potential infringers before clients even know they exist.",
  },
]

function usePerPage() {
  const [per, setPer] = useState(3)
  useEffect(() => {
    function update() {
      if (window.innerWidth < 640)       setPer(1)
      else if (window.innerWidth < 1024) setPer(2)
      else                               setPer(3)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])
  return per
}

export default function TestimonialsCarousel() {
  const perPage  = usePerPage()
  const total    = TESTIMONIALS.length
  const maxIndex = total - perPage

  const [active, setActive]   = useState(0)
  const [animDir, setAnimDir] = useState(null)
  const [paused, setPaused]   = useState(false)
  const timerRef              = useRef(null)
  const dragStart             = useRef(null)

  const go = useCallback((next, dir) => {
    const clamped = Math.max(0, Math.min(next, maxIndex))
    if (clamped === active) return
    setAnimDir(dir)
    setActive(clamped)
  }, [active, maxIndex])

  const prev = () => go(active - 1, 'right')
  const next = () => go(active + 1, 'left')

  useEffect(() => {
    if (paused) return
    timerRef.current = setTimeout(() => {
      const nextIdx = active >= maxIndex ? 0 : active + 1
      go(nextIdx, 'left')
    }, 5000)
    return () => clearTimeout(timerRef.current)
  }, [active, paused, maxIndex, go])

  useEffect(() => {
    setActive(prev => Math.min(prev, total - perPage))
  }, [perPage, total])

  const onTouchStart = e => { dragStart.current = e.touches[0].clientX }
  const onTouchEnd   = e => {
    if (dragStart.current === null) return
    const delta = dragStart.current - e.changedTouches[0].clientX
    if (Math.abs(delta) > 50) delta > 0 ? next() : prev()
    dragStart.current = null
  }

  const groups    = Math.ceil(total / perPage)
  const activeDot = Math.round(active / perPage)

  return (
    <section
      className="testimonials"
      id="testimonials"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Practitioner testimonials"
    >
      <div className="section-wrap">

        {/* ── HEADER ── */}
        <div className="tc-header reveal">
          <div>
            <div className="eyebrow">What Practitioners Say</div>
            <h2 className="serif">Trusted by <em>IP Professionals</em></h2>
            <p className="tc-subhead">
              Insights from patent attorneys, IP counsel, and enforcement professionals
              who rely on Patent Gap AI in active practice.
            </p>
          </div>

          <div className="tc-arrows">
            <button
              className={`tc-arrow${active === 0 ? ' disabled' : ''}`}
              onClick={prev}
              aria-label="Previous testimonials"
              disabled={active === 0}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
            </button>
            <div className="tc-count">
              <span className="tc-count-cur">{String(active + 1).padStart(2, '0')}</span>
              <span className="tc-count-sep">/</span>
              <span className="tc-count-tot">{String(maxIndex + 1).padStart(2, '0')}</span>
            </div>
            <button
              className={`tc-arrow${active >= maxIndex ? ' disabled' : ''}`}
              onClick={next}
              aria-label="Next testimonials"
              disabled={active >= maxIndex}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
          </div>
        </div>

        {/* ── TRACK ── */}
        <div
          className="tc-viewport"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="tc-track"
            style={{
              transform: `translateX(calc(-${active} * (100% / ${perPage}) - ${active} * (16px / ${perPage})))`,
            }}
          >
            {TESTIMONIALS.map((t, i) => {
              const isVisible = i >= active && i < active + perPage
              return (
                <div
                  key={i}
                  className={`tc-card${isVisible ? ' visible' : ''}`}
                  style={{ flex: `0 0 calc((100% - ${(perPage - 1) * 16}px) / ${perPage})` }}
                  aria-hidden={!isVisible}
                >
                  {/* Quote — opening mark is absolute, closing mark flows inline */}
                  <blockquote className="tc-quote">
                    <span className="tc-quotemark">&ldquo;</span>
                    {t.quote}
                    <span className="tc-quotemark tc-quotemark--close">&rdquo;</span>
                  </blockquote>

                  <div className="tc-rule" />

                  <div className="tc-person">
                    <div className="tc-avatar" aria-hidden="true">{t.initials}</div>
                    <div className="tc-meta">
                      <span className="tc-name">{t.name}</span>
                      {/*<span className="tc-role">{t.role}</span>
                      <span className="tc-firm">{t.firm}</span>*/}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* ── FOOTER ── */}
        <div className="tc-footer">

          <div className="tc-progress-wrap">
            <div
              className="tc-progress-fill"
              style={{ width: `${((active + perPage) / total) * 100}%` }}
            />
          </div>

          <div className="tc-dots" role="tablist" aria-label="Testimonial pages">
            {Array.from({ length: groups }).map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === activeDot}
                className={`tc-dot${i === activeDot ? ' active' : ''}`}
                onClick={() => go(Math.min(i * perPage, maxIndex), i > activeDot ? 'left' : 'right')}
                aria-label={`Go to page ${i + 1}`}
              />
            ))}
          </div>

          <div className="tc-thumbs" role="list">
            {TESTIMONIALS.map((t, i) => {
              const isActive = i >= active && i < active + perPage
              return (
                <button
                  key={i}
                  role="listitem"
                  className={`tc-thumb${isActive ? ' active' : ''}`}
                  onClick={() => go(Math.min(i, maxIndex), i > active ? 'left' : 'right')}
                  aria-label={`View ${t.name}'s testimonial`}
                  title={`${t.name} — ${t.firm}`}
                >
                  <span className="tc-thumb-initials">{t.initials}</span>
                  
                </button>
              )
            })}
          </div>

        </div>
      </div>
    </section>
  )
}

