import { useState, useEffect, useRef, useCallback } from 'react'

const TESTIMONIALS = [
  {
    initials: 'FK', name: 'Firat Koseoglu',
    role: 'Patent Engineer', firm: 'Patent Engineer',
    tag: 'Patent Engineer',
    quote: "Patent Gap AI transforms static patent portfolios into continuously monitored sources of evidence-backed infringement leads.",
  },
  {
    initials: 'RL', name: 'Rachel Lim',
    role: 'Chief IP Counsel', firm: 'Nexora Technologies',
    tag: 'Licensing Strategy',
    quote: "Patent Gap AI has completely transformed how we approach licensing negotiations. What used to take our team weeks of manual claim mapping now happens in hours, giving us the leverage and confidence to negotiate from a position of strength.",
  },
  {
    initials: 'DM', name: 'David Mercer',
    role: 'Principal Patent Attorney', firm: 'Holloway IP Group',
    tag: 'Small Firm Access',
    quote: "As a boutique firm, we never had the resources to compete with large litigation shops on portfolio screening. Patent Gap AI levels the playing field — we can now deliver enterprise-grade infringement analysis at a fraction of the cost.",
  },
  {
    initials: 'CT', name: 'Caroline Torres',
    role: 'Director of Patents', firm: 'Apex Life Sciences',
    tag: 'Enforcement Prep',
    quote: "The structured evidence reports gave our external counsel everything they needed on day one. We cut our pre-litigation preparation time by nearly three weeks and walked into every meeting with complete confidence in our documentation.",
  },
  {
    initials: 'NP', name: 'Nikhil Patel',
    role: 'Senior Patent Counsel', firm: 'CoreBridge Global',
    tag: 'Claim Mapping',
    quote: "The automated claim-to-product mapping is remarkably precise. It correctly interprets claim scope the way a Federal District Court would and surfaces the strongest infringement candidates without any of the guesswork we used to rely on.",
  },
  {
    initials: 'JW', name: 'James Whitfield',
    role: 'IP Strategy Partner', firm: 'Harmon & Associates',
    tag: 'Legal Workflows',
    quote: "Patent Gap AI slots seamlessly into our existing legal workflows. It doesn't replace attorney judgment — it amplifies it, handling the tedious groundwork so our team can focus on strategy and client advisory.",
  },
  {
    initials: 'YO', name: 'Yuki Ohmura',
    role: 'VP Intellectual Property', firm: 'Stratos Semiconductor',
    tag: 'Large Portfolios',
    quote: "We were sitting on a portfolio of over 400 patents with no practical way to screen them for enforcement potential. Patent Gap AI processed the entire portfolio in days and surfaced a dozen high-value opportunities we had no idea existed.",
  },
  {
    initials: 'FM', name: 'Fatima Al-Mansouri',
    role: 'Partner, Patent Prosecution', firm: 'Vega & North LLP',
    tag: 'Early Detection',
    quote: "The dual-sided litigation support is a game changer. Whether we're building a plaintiff's infringement case or preparing an invalidity defense, Patent Gap AI delivers analysis in hours that would previously have consumed months of associate time.",
  },
  {
    initials: 'GR', name: 'Gregory Rousseau',
    role: 'Managing Partner', firm: 'Tanaka Patent Law',
    tag: 'Client Advisory',
    quote: "Our clients used to come to us months after infringement had already spread. Patent Gap AI's continuous monitoring now lets us proactively alert clients the moment a potential infringer enters the market — turning reactive enforcement into a strategic advantage.",
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
