import { useState, useEffect } from 'react';
import { FileText } from 'lucide-react';

const ClaimsMatrix = ({ displayClaims, potentialMatches }) => {
  const [expanded, setExpanded] = useState(false);
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'cards'

  useEffect(() => {
    const checkWidth = () => {
      setViewMode(window.innerWidth < 640 ? 'cards' : 'table');
    };
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  if (!displayClaims?.length || !potentialMatches?.length) return null;

  // Build a set of matched claims per match id
  const refClaimSets = potentialMatches.reduce((acc, match) => {
    const refClaims = (match.similarClaims || [])
      .map(sc => sc.ref_claim)
      .filter(Boolean);
    acc[match.id] = new Set(refClaims);
    return acc;
  }, {});

  const truncate = (text, max = 80) =>
    text?.length > max ? text.slice(0, max) + '…' : text;

  const truncateId = (id = '', max = 14) =>
    String(id).length > max ? String(id).slice(0, max) + '…' : String(id);

  const totalMatches = displayClaims.reduce((count, claim) => {
    return count + potentialMatches.filter(m => refClaimSets[m.id]?.has(claim)).length;
  }, 0);

  // Score: % of claims matched per match
  const getMatchScore = (match) => {
    const matched = displayClaims.filter(c => refClaimSets[match.id]?.has(c)).length;
    return displayClaims.length > 0 ? Math.round((matched / displayClaims.length) * 100) : 0;
  };

  const CheckIcon = () => (
    <span style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      width: 20, height: 20, borderRadius: '50%',
      background: 'rgba(46,125,50,0.12)', flexShrink: 0,
    }}>
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
        stroke="#2E7D32" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
    </span>
  );

  const EmptyDot = () => (
    <span style={{
      display: 'inline-block', width: 6, height: 6, borderRadius: '50%',
      background: 'var(--rule2)', flexShrink: 0,
    }} />
  );

  return (
    <div style={{ marginBottom: 20 }}>
      {/* ── Header ── */}
      <div className="sec-hd" style={{ marginBottom: expanded ? 12 : 0 }}>
        <div className="sec-hd-left">
          <div className="sec-ico">
            <FileText size={16} color="var(--accent)" strokeWidth={1.5} />
          </div>
          <div>
            <div className="sec-eye"><div className="live-dot" />Coverage</div>
            <div className="sec-title">Claims Coverage Matrix</div>
          </div>
        </div>

        <div className="sec-hd-right" style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <span className="pcard-num" style={{
            margin: 0,
            color: totalMatches > 0 ? 'var(--amber)' : 'var(--ink3)',
            background: totalMatches > 0 ? 'var(--amber-soft)' : 'var(--surf2)',
          }}>
            {totalMatches} match{totalMatches !== 1 ? 'es' : ''}
          </span>

          {/* View toggle — only on tablet */}
          {expanded && (
            <div style={{
              display: 'flex', borderRadius: 6, overflow: 'hidden',
              border: '1px solid var(--rule2)',
            }}>
              {['table', 'cards'].map(mode => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  style={{
                    padding: '4px 10px', fontSize: 11, border: 'none', cursor: 'pointer',
                    fontFamily: "'Inconsolata', monospace", fontWeight: 600,
                    textTransform: 'uppercase', letterSpacing: '0.06em',
                    background: viewMode === mode ? 'var(--accent)' : 'var(--surf)',
                    color: viewMode === mode ? '#fff' : 'var(--ink3)',
                    transition: 'all 0.15s',
                  }}
                >
                  {mode === 'table' ? '⊞' : '⊟'} {mode}
                </button>
              ))}
            </div>
          )}

          <button
            onClick={() => setExpanded(prev => !prev)}
            className="btn-export"
            style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 12px', fontSize: 11 }}
          >
            <svg
              width="12" height="12" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round"
              style={{
                transition: 'transform 0.2s ease',
                transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
            >
              <polyline points="6 9 12 15 18 9"/>
            </svg>
            {expanded ? 'Collapse' : 'View Matrix'}
          </button>
        </div>
      </div>

      {expanded && (
        <>
          {/* ── TABLE view (tablet+desktop) ── */}
          {viewMode === 'table' && (
            <div className="pd-card-body cm-table-wrap" style={{ padding: 0 }}>
              <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                <table style={{
                  width: '100%', borderCollapse: 'collapse',
                  fontSize: 12, fontFamily: 'inherit',
                  tableLayout: 'fixed',
                  minWidth: `${280 + potentialMatches.length * 90}px`,
                }}>
                  <colgroup>
                    <col style={{ width: 280 }} />
                    {potentialMatches.map((_, i) => (
                      <col key={i} style={{ width: Math.max(80, Math.min(120, Math.floor((100 - 30) / potentialMatches.length) + '%')) }} />
                    ))}
                  </colgroup>

                  <thead>
                    <tr style={{ background: 'var(--surf2)' }}>
                      {/* Claim header */}
                      <th style={{
                        padding: '10px 16px', textAlign: 'left',
                        fontFamily: "'Inconsolata', monospace", fontSize: 10, fontWeight: 600,
                        textTransform: 'uppercase', letterSpacing: '0.10em', color: 'var(--ink3)',
                        borderBottom: '1px solid var(--rule2)', borderRight: '1px solid var(--rule2)',
                        position: 'sticky', left: 0, background: 'var(--surf2)', zIndex: 2,
                      }}>
                        Claim
                      </th>

                      {/* Match column headers */}
                      {potentialMatches.map((match) => {
                        const score = getMatchScore(match);
                        return (
                          <th key={match.id} style={{
                            padding: '8px 6px', textAlign: 'center',
                            fontFamily: "'Inconsolata', monospace",
                            fontSize: 9, fontWeight: 600,
                            textTransform: 'uppercase', letterSpacing: '0.06em',
                            color: 'var(--accent)',
                            borderBottom: '1px solid var(--rule2)',
                            borderRight: '1px solid var(--rule2)',
                            verticalAlign: 'bottom',
                          }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                              {/* Score badge */}
                              <span style={{
                                fontSize: 9, fontWeight: 700,
                                color: score >= 70 ? 'var(--amber)' : score >= 40 ? 'var(--accent)' : 'var(--ink3)',
                                background: score >= 70 ? 'var(--amber-soft)' : score >= 40 ? 'var(--acc-soft)' : 'var(--surf2)',
                                borderRadius: 4, padding: '1px 5px',
                              }}>
                                {score}%
                              </span>
                              {/* ID, truncated tightly */}
                              <span title={match.id} style={{
                                display: 'block', overflow: 'hidden',
                                textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                                maxWidth: 80,
                              }}>
                                {truncateId(match.id, 10)}
                              </span>
                            </div>
                          </th>
                        );
                      })}
                    </tr>
                  </thead>

                  <tbody>
                    {displayClaims.map((claim, rowIdx) => {
                      const isEven = rowIdx % 2 === 0;
                      const rowMatchCount = potentialMatches.filter(m => refClaimSets[m.id]?.has(claim)).length;
                      return (
                        <tr key={rowIdx} style={{ background: isEven ? 'var(--surf)' : 'var(--surf2)' }}>
                          <td style={{
                            padding: '8px 12px', color: 'var(--ink2)',
                            fontSize: 12, lineHeight: 1.5,
                            borderBottom: '1px solid var(--rule2)',
                            borderRight: '1px solid var(--rule2)',
                            position: 'sticky', left: 0, zIndex: 1,
                            background: isEven ? 'var(--surf)' : 'var(--surf2)',
                          }}>
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6 }}>
                              <span style={{
                                fontFamily: "'Inconsolata', monospace", fontSize: 9,
                                color: 'var(--accent)', background: 'var(--acc-soft)',
                                borderRadius: 3, padding: '1px 4px', fontWeight: 700, flexShrink: 0, marginTop: 1,
                              }}>
                                {rowIdx + 1}
                              </span>
                              <span title={claim}>{truncate(claim, 70)}</span>
                              {rowMatchCount > 0 && (
                                <span style={{
                                  marginLeft: 'auto', flexShrink: 0,
                                  fontSize: 9, fontWeight: 700,
                                  color: 'var(--amber)', background: 'var(--amber-soft)',
                                  borderRadius: 3, padding: '1px 4px',
                                  fontFamily: "'Inconsolata', monospace",
                                }}>
                                  {rowMatchCount}✓
                                </span>
                              )}
                            </div>
                          </td>

                          {potentialMatches.map((match) => {
                            const isMatched = refClaimSets[match.id]?.has(claim);
                            return (
                              <td key={match.id} style={{
                                padding: '8px 6px', textAlign: 'center',
                                borderBottom: '1px solid var(--rule2)',
                                borderRight: '1px solid var(--rule2)',
                              }}>
                                {isMatched ? <CheckIcon /> : <EmptyDot />}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                {/* Scroll hint on smaller screens */}
                <div className="cm-scroll-hint" style={{
                  textAlign: 'center', padding: '6px 0',
                  fontFamily: "'Inconsolata', monospace", fontSize: 10,
                  color: 'var(--ink3)', letterSpacing: '0.06em', textTransform: 'uppercase',
                  borderTop: '1px solid var(--rule2)',
                }}>
                  ← scroll to see all matches →
                </div>
              </div>
            </div>
          )}

          {/* ── CARDS view (mobile or toggled) ── */}
          {viewMode === 'cards' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {potentialMatches.map((match) => {
                const matchedClaims = displayClaims.filter(c => refClaimSets[match.id]?.has(c));
                const unmatchedClaims = displayClaims.filter(c => !refClaimSets[match.id]?.has(c));
                const score = getMatchScore(match);

                return (
                  <div key={match.id} className="pd-card-body" style={{ padding: '14px 16px' }}>
                    {/* Card header */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10, gap: 8, flexWrap: 'wrap' }}>
                      <div style={{ minWidth: 0 }}>
                        <div style={{
                          fontFamily: "'Inconsolata', monospace", fontSize: 9,
                          color: 'var(--ink3)', textTransform: 'uppercase',
                          letterSpacing: '0.10em', marginBottom: 2,
                        }}>
                          Match
                        </div>
                        <div style={{
                          fontFamily: "'Inconsolata', monospace", fontSize: 11,
                          fontWeight: 700, color: 'var(--accent)',
                          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                          maxWidth: 220,
                        }} title={match.id}>
                          {truncateId(match.id, 28)}
                        </div>
                      </div>
                      {/* Score */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
                        <div style={{
                          width: 36, height: 36, borderRadius: '50%',
                          border: `2.5px solid ${score >= 70 ? 'var(--amber)' : score >= 40 ? 'var(--accent)' : 'var(--rule2)'}`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontFamily: "'Inconsolata', monospace", fontSize: 10, fontWeight: 700,
                          color: score >= 70 ? 'var(--amber)' : score >= 40 ? 'var(--accent)' : 'var(--ink3)',
                        }}>
                          {score}%
                        </div>
                        <div style={{ fontSize: 11, color: 'var(--ink3)' }}>
                          {matchedClaims.length}/{displayClaims.length} claims
                        </div>
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div style={{
                      height: 4, borderRadius: 2, background: 'var(--rule2)',
                      marginBottom: 12, overflow: 'hidden',
                    }}>
                      <div style={{
                        height: '100%', borderRadius: 2,
                        width: `${score}%`,
                        background: score >= 70 ? 'var(--amber)' : score >= 40 ? 'var(--accent)' : 'var(--rule2)',
                        transition: 'width 0.3s ease',
                      }} />
                    </div>

                    {/* Matched claims */}
                    {matchedClaims.length > 0 && (
                      <div style={{ marginBottom: unmatchedClaims.length > 0 ? 10 : 0 }}>
                        <div style={{
                          fontFamily: "'Inconsolata', monospace", fontSize: 9,
                          fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.10em',
                          color: '#2E7D32', marginBottom: 6,
                        }}>
                          ✓ Matched claims
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                          {matchedClaims.map((claim, i) => {
                            const claimIdx = displayClaims.indexOf(claim);
                            return (
                              <div key={i} style={{
                                display: 'flex', gap: 8, alignItems: 'flex-start',
                                padding: '5px 8px', borderRadius: 5,
                                background: 'rgba(46,125,50,0.06)',
                                border: '1px solid rgba(46,125,50,0.15)',
                              }}>
                                <span style={{
                                  fontFamily: "'Inconsolata', monospace", fontSize: 9,
                                  color: '#2E7D32', background: 'rgba(46,125,50,0.12)',
                                  borderRadius: 3, padding: '1px 4px', fontWeight: 700, flexShrink: 0,
                                }}>
                                  {claimIdx + 1}
                                </span>
                                <span style={{ fontSize: 12, color: 'var(--ink2)', lineHeight: 1.5 }}>
                                  {truncate(claim, 100)}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Unmatched claims (collapsed by default) */}
                    {unmatchedClaims.length > 0 && (
                      <details style={{ marginTop: matchedClaims.length > 0 ? 8 : 0 }}>
                        <summary style={{
                          fontFamily: "'Inconsolata', monospace", fontSize: 9,
                          fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.10em',
                          color: 'var(--ink3)', cursor: 'pointer', userSelect: 'none',
                          padding: '4px 0', listStyle: 'none',
                        }}>
                          ○ {unmatchedClaims.length} unmatched claim{unmatchedClaims.length !== 1 ? 's' : ''} ▾
                        </summary>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 6 }}>
                          {unmatchedClaims.map((claim, i) => {
                            const claimIdx = displayClaims.indexOf(claim);
                            return (
                              <div key={i} style={{
                                display: 'flex', gap: 8, alignItems: 'flex-start',
                                padding: '5px 8px', borderRadius: 5,
                                background: 'var(--surf2)',
                                border: '1px solid var(--rule2)',
                              }}>
                                <span style={{
                                  fontFamily: "'Inconsolata', monospace", fontSize: 9,
                                  color: 'var(--ink3)', background: 'var(--surf2)',
                                  borderRadius: 3, padding: '1px 4px', fontWeight: 700, flexShrink: 0,
                                  border: '1px solid var(--rule2)',
                                }}>
                                  {claimIdx + 1}
                                </span>
                                <span style={{ fontSize: 12, color: 'var(--ink3)', lineHeight: 1.5 }}>
                                  {truncate(claim, 100)}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </details>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      <style>{`
        /* Hide scroll hint when not needed */
        .cm-scroll-hint { display: none; }
        @media (max-width: 900px) { .cm-scroll-hint { display: block; } }

        /* Auto-switch to cards on mobile, hide toggle */
        @media (max-width: 639px) {
          .cm-table-wrap { display: none !important; }
        }

        /* Sticky column needs explicit bg on both variants */
        .pd-card-body table td:first-child,
        .pd-card-body table th:first-child { z-index: 1; }
      `}</style>
    </div>
  );
};

export default ClaimsMatrix;