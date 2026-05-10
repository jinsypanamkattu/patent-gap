const TOOLTIP_DATA = {
  blue: {
    title: 'Active scans breakdown',
    type: 'bars',
    rows: [
      { label: 'In progress', pct: 50, color: '#378ADD' },
      { label: 'Queued',      pct: 33, color: '#85B7EB' },
      { label: 'Paused',      pct: 17, color: '#B5D4F4' },
    ],
  },
  purple: {
    title: 'Patent status mix',
    type: 'donut',
    segments: [
      { label: 'Patented',  value: 25, color: '#7F77DD' },
      { label: 'Expired',   value: 12, color: '#AFA9EC' },
      { label: 'Abandoned', value: 11, color: '#CECBF6' },
    ],
  },
  yellow: {
    title: 'Risk distribution',
    type: 'bars',
    rows: [
      { label: 'High risk',   pct: 60, color: '#EF9F27' },
      { label: 'Medium risk', pct: 25, color: '#FAC775' },
      { label: 'Low risk',    pct: 15, color: '#FAD9A0' },
    ],
  },
  green: {
    title: 'Clearance summary',
    type: 'bars',
    rows: [
      { label: 'Cleared',   pct: 72, color: '#639922' },
      { label: 'Expired',   pct: 18, color: '#97C459' },
      { label: 'Abandoned', pct: 10, color: '#C0DD97' },
    ],
  },
}

function StatTooltip({ color, x, y }) {
  const canvasRef = useRef(null)
  const chartRef  = useRef(null)
  const cfg = TOOLTIP_DATA[color]
  if (!cfg) return null

  useEffect(() => {
    if (cfg.type !== 'donut' || !canvasRef.current) return
    import('chart.js/auto').then(({ default: Chart }) => {
      if (chartRef.current) chartRef.current.destroy()
      chartRef.current = new Chart(canvasRef.current, {
        type: 'doughnut',
        data: {
          datasets: [{
            data: cfg.segments.map(s => s.value),
            backgroundColor: cfg.segments.map(s => s.color),
            borderWidth: 0,
          }],
        },
        options: {
          responsive: false,
          cutout: '65%',
          plugins: { legend: { display: false }, tooltip: { enabled: false } },
          animation: { duration: 400 },
        },
      })
    })
    return () => chartRef.current?.destroy()
  }, [color])

  const tipW = 200
  const left = x + tipW + 14 > window.innerWidth ? x - tipW - 14 : x + 14
  const top  = Math.max(8, y - 60)

  return (
    <div style={{
      position: 'fixed', left, top, width: tipW, zIndex: 9999,
      background: 'var(--bg, #fff)',
      border: '0.5px solid rgba(0,0,0,0.12)',
      borderRadius: 12, padding: 14,
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      pointerEvents: 'none',
    }}>
      <div style={{ fontSize: 11, fontWeight: 500, color: 'var(--ink2)', marginBottom: 10 }}>
        {cfg.title}
      </div>

      {cfg.type === 'donut' ? (
        <>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
            <canvas ref={canvasRef} width={90} height={90} />
          </div>
          {cfg.segments.map((s, i) => {
            const total = cfg.segments.reduce((a, b) => a + b.value, 0)
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, marginTop: 4 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: s.color, flexShrink: 0 }} />
                <span style={{ color: 'var(--ink1)' }}>{s.label}</span>
                <span style={{ marginLeft: 'auto', fontWeight: 500, color: 'var(--ink3)' }}>
                  {Math.round(s.value / total * 100)}%
                </span>
              </div>
            )
          })}
        </>
      ) : (
        cfg.rows.map((r, i) => (
          <div key={i} style={{ marginBottom: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: r.color, flexShrink: 0 }} />
              <span style={{ color: 'var(--ink1)' }}>{r.label}</span>
              <span style={{ marginLeft: 'auto', fontWeight: 500, color: 'var(--ink3)' }}>{r.pct}%</span>
            </div>
            <div style={{ height: 4, background: 'rgba(0,0,0,0.06)', borderRadius: 2, marginTop: 4, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${r.pct}%`, background: r.color, borderRadius: 2, transition: 'width 0.4s ease' }} />
            </div>
          </div>
        ))
      )}
    </div>
  )
}