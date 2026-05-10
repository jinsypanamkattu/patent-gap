javascript

// ===========================
// FILE: PatentDetailPage.jsx
// Fully responsive — mobile (320px+), tablet (768px+), desktop (1024px+)
// No patentApi imports — all data/actions come from useCaseDetail hook.
// ===========================

import {
  Clock, ArrowLeft, FileText, Calendar,
  User, Tag, Download, Trash2, RefreshCw, Search,
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useStore } from '../../hooks/useStore';
import { useLocation, useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import InfringementModal   from '../../components/dashboard/InfringementModal';
import DocumentModal       from '../../components/dashboard/DocumentModal';
import DashboardSidebar    from '../../components/layout/DashboardSidebar';
import MatchCard           from '../../components/dashboard/MatchCard';
import SearchLimitationEditor from '../../components/dashboard/SearchLimitationEditor';
import NotificationBell    from '../../components/dashboard/NotificationBell';

// ── The ONE hook this page depends on ──
import { useCaseDetail, getSourceName, classifyDocUrl } from '../../hooks/useCaseDetail';

// ─── Pure helpers (display only — no API/state logic) ────────────────────────

const getStatusShorthand = (status) => {
  status = String(status || '');
  if (status.includes('Expired'))   return 'Expired';
  if (status.includes('Patented'))  return 'Patented';
  if (status.includes('Abandoned')) return 'Abandoned';
  if (status.includes('-')) return status.split('-')[0];
  if (status.includes('_')) return status.split('_')[0];
  return status;
};

const formatDate = (dateString) => {
  if (!dateString) return 'Unknown';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
};

const formatTimeAgo = (dateString) => {
  if (!dateString) return 'Unknown';
  const diff = Math.floor((Date.now() - new Date(dateString)) / 1000);
  if (diff < 60)     return 'Just now';
  if (diff < 3600)   return `${Math.floor(diff / 60)} minutes ago`;
  if (diff < 86400)  return `${Math.floor(diff / 3600)} hours ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)} days ago`;
  return `${Math.floor(diff / 604800)} weeks ago`;
};

const selectMainColor = (score) => {
  if (score >= 0.9) return '#B22222';
  if (score >= 0.7) return '#FFA500';
  return '#2E7D32';
};

// ─── Sub-components ──────────────────────────────────────────────────────────

const StatusPill = ({ status }) => {
  const s   = String(status || '').toLowerCase();
  const cls = s === 'expired' ? 'expired' : s === 'abandoned' ? 'abandoned' : 'patented';
  return (
    <span className={`pd-badge ${cls}`}>
      <span className="pd-badge-dot" />
      {status || 'Patented'}
    </span>
  );
};

const InfoRow = ({ icon: Icon, label, value }) => (
  <div className="pd-info-row">
    <div className="pd-info-label-wrap">
      <Icon size={13} color="var(--ink3)" style={{ flexShrink: 0 }} />
      <span className="pd-info-label">{label}</span>
    </div>
    <span className="pd-info-value">{value}</span>
  </div>
);

const controlBtnStyle = (disabled) => ({
  background: 'var(--surf)', border: '1px solid var(--rule2)',
  borderRadius: 4, padding: '4px 5px', cursor: disabled ? 'not-allowed' : 'pointer',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  color: disabled ? 'var(--rule2)' : 'var(--ink3)', transition: 'all 0.15s',
});

// ─── ClaimsEditor ─────────────────────────────────────────────────────────────
// Receives onSave(newClaims) — the hook handles persistence.

const ClaimsEditor = ({ initialClaims, onSave }) => {
  const [editing,   setEditing]   = useState(false);
  const [claims,    setClaims]    = useState(initialClaims || []);
  const [saving,    setSaving]    = useState(false);
  const [saveError, setSaveError] = useState(null);

  useEffect(() => { setClaims(initialClaims || []); }, [initialClaims]);

  const startEdit = () => { setEditing(true); setSaveError(null); };
  const cancel    = () => { setClaims(initialClaims || []); setEditing(false); setSaveError(null); };

  const updateClaim = (i, v) => setClaims(prev => prev.map((c, idx) => idx === i ? v : c));
  const addClaim    = () => {
    setClaims(prev => [...prev, '']);
    setTimeout(() => {
      const tas = document.querySelectorAll('.claim-textarea');
      tas[tas.length - 1]?.focus();
    }, 0);
  };
  const removeClaim = (i)         => setClaims(prev => prev.filter((_, idx) => idx !== i));
  const moveClaim   = (i, dir) => {
    const next = [...claims];
    const swap = i + dir;
    if (swap < 0 || swap >= next.length) return;
    [next[i], next[swap]] = [next[swap], next[i]];
    setClaims(next);
  };

  const save = async () => {
    const trimmed = claims.map(c => c.trim()).filter(Boolean);
    if (!trimmed.length) { setSaveError('At least one claim is required.'); return; }
    const orig = (initialClaims || []).map(c => c.trim()).filter(Boolean);
    if (JSON.stringify(trimmed) === JSON.stringify(orig)) { setEditing(false); return; }
    try {
      setSaving(true);
      setSaveError(null);
      await onSave(trimmed); // hook handles API call
      setEditing(false);
    } catch (err) {
      setSaveError(err?.message || 'Failed to save claims. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (!editing) {
    return (
      <div style={{ position: 'relative' }}>
        <button
          onClick={startEdit}
          title="Edit claims"
          style={{
            position: 'absolute', top: 0, right: 0,
            background: 'none', border: 'none', cursor: 'pointer',
            padding: 4, borderRadius: 5, color: 'var(--ink3)',
            display: 'flex', alignItems: 'center', transition: 'color 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--ink3)'}
        >
          <EditIcon />
        </button>
        <div style={{ display: 'flex', flexDirection: 'column', paddingRight: 28 }}>
          {claims.map((claim, index) => {
            const parts      = claim.split('. ');
            const claimIndex = parseInt(parts[0]);
            const content    = parts.slice(1).join('. ');
            const display    = !isNaN(claimIndex) && content
              ? (claimIndex === 1 ? content : `${claimIndex - 1}. ${content}`)
              : claim;
            return (
              <p key={index} style={{
                fontSize: 13.5, color: 'var(--ink2)', lineHeight: 1.65,
                padding: '8px 0',
                borderBottom: index < claims.length - 1 ? '1px solid var(--rule2)' : 'none',
                margin: 0,
              }}>
                <span style={{
                  fontFamily: "'Inconsolata', monospace", fontSize: 10,
                  color: 'var(--ink3)', marginRight: 8,
                  textTransform: 'uppercase', letterSpacing: '0.08em',
                }}>{index + 1}.</span>
                {display}
              </p>
            );
          })}
          {claims.length === 0 && (
            <p style={{ fontSize: 13.5, color: 'var(--ink3)', margin: 0, fontStyle: 'italic' }}>
              No claims yet. Click edit to add claims.
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 12 }}>
        {claims.map((claim, index) => (
          <div key={index} style={{
            display: 'flex', gap: 8, alignItems: 'flex-start',
            background: 'var(--surf2)', borderRadius: 8,
            padding: '10px 12px', border: '1px solid var(--rule2)',
          }}>
            <span style={{
              fontFamily: "'Inconsolata', monospace", fontSize: 10, fontWeight: 700,
              color: 'var(--accent)', background: 'var(--acc-soft)',
              borderRadius: 4, padding: '2px 6px', flexShrink: 0, marginTop: 2,
              textTransform: 'uppercase', letterSpacing: '0.08em',
            }}>{index + 1}</span>
            <textarea
              className="claim-textarea"
              value={claim}
              onChange={e => updateClaim(index, e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Escape') { cancel(); return; }
                if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') save();
              }}
              rows={3}
              style={{
                flex: 1, boxSizing: 'border-box',
                padding: '6px 8px', fontSize: 13, fontFamily: 'inherit', lineHeight: 1.65,
                color: 'var(--ink)', background: 'var(--bg)',
                border: '1.5px solid var(--rule2)', borderRadius: 5,
                resize: 'vertical', outline: 'none', transition: 'border-color 0.15s',
              }}
              onFocus={e => e.target.style.borderColor = 'var(--accent)'}
              onBlur={e  => e.target.style.borderColor = 'var(--rule2)'}
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flexShrink: 0 }}>
              <button onClick={() => moveClaim(index, -1)} disabled={index === 0}
                title="Move up" style={controlBtnStyle(index === 0)}>
                <ChevronUp />
              </button>
              <button onClick={() => moveClaim(index, 1)} disabled={index === claims.length - 1}
                title="Move down" style={controlBtnStyle(index === claims.length - 1)}>
                <ChevronDown />
              </button>
              <button onClick={() => removeClaim(index)} title="Remove claim"
                style={{ ...controlBtnStyle(false), color: 'var(--red)', marginTop: 2 }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--red-soft)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--surf)'}>
                <CloseIcon />
              </button>
            </div>
          </div>
        ))}
      </div>

      <DashedAddButton onClick={addClaim} label="Add Claim" />

      {saveError && (
        <p style={{ fontSize: 12, color: 'var(--red)', margin: '0 0 10px', fontFamily: "'Inconsolata', monospace" }}>
          ✗ {saveError}
        </p>
      )}
      <SaveCancelRow onSave={save} onCancel={cancel} saving={saving} />
    </div>
  );
};

// ─── ContextEditor ────────────────────────────────────────────────────────────

const ContextEditor = ({ initialValue, onSave }) => {
  const [editing,   setEditing]   = useState(false);
  const [value,     setValue]     = useState(initialValue || '');
  const [saving,    setSaving]    = useState(false);
  const [saveError, setSaveError] = useState(null);
  const taRef = useRef();

  useEffect(() => { setValue(initialValue || ''); }, [initialValue]);

  const startEdit = () => {
    setEditing(true);
    setSaveError(null);
    setTimeout(() => {
      if (taRef.current) {
        taRef.current.focus();
        taRef.current.selectionStart = taRef.current.value.length;
      }
    }, 0);
  };

  const cancel = () => { setValue(initialValue || ''); setEditing(false); setSaveError(null); };

  const save = async () => {
    const trimmed = value.trim();
    if (!trimmed) { setSaveError('Description cannot be empty.'); return; }
    if (trimmed === (initialValue || '').trim()) { setEditing(false); return; }
    try {
      setSaving(true);
      setSaveError(null);
      await onSave(trimmed);
      setEditing(false);
    } catch (err) {
      setSaveError(err?.message || 'Failed to save. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (!editing) {
    return (
      <div style={{ position: 'relative' }}>
        <p style={{ fontSize: 13.5, color: 'var(--ink2)', lineHeight: 1.7, margin: 0, paddingRight: 32 }}>
          {value || 'No description available.'}
        </p>
        <button
          onClick={startEdit}
          title="Edit description"
          style={{
            position: 'absolute', top: 0, right: 0,
            background: 'none', border: 'none', cursor: 'pointer',
            padding: 4, borderRadius: 5, color: 'var(--ink3)',
            display: 'flex', alignItems: 'center', transition: 'color 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--ink3)'}
        >
          <EditIcon />
        </button>
      </div>
    );
  }

  return (
    <div>
      <textarea
        ref={taRef}
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Escape') { cancel(); return; }
          if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') save();
        }}
        rows={6}
        style={{
          width: '100%', boxSizing: 'border-box',
          padding: '10px 12px', fontSize: 13.5, fontFamily: 'inherit', lineHeight: 1.7,
          color: 'var(--ink)', background: 'var(--bg)',
          border: '1.5px solid var(--accent)', borderRadius: 6,
          resize: 'vertical', outline: 'none', marginBottom: 10,
          boxShadow: '0 0 0 3px var(--acc-soft)',
        }}
      />
      {saveError && (
        <p style={{ fontSize: 12, color: 'var(--red)', margin: '0 0 8px', fontFamily: "'Inconsolata', monospace" }}>
          ✗ {saveError}
        </p>
      )}
      <SaveCancelRow onSave={save} onCancel={cancel} saving={saving} />
    </div>
  );
};

// ─── SectionCard ─────────────────────────────────────────────────────────────

const SectionCard = ({ title, eyebrow, icon: Icon, children, actions }) => (
  <div style={{ marginBottom: 20 }}>
    <div className="sec-hd" style={{ marginBottom: 12 }}>
      <div className="sec-hd-left">
        <div className="sec-ico">
          {Icon && <Icon size={16} color="var(--accent)" strokeWidth={1.5} />}
        </div>
        <div>
          {eyebrow && (
            <div className="sec-eye">
              <div className="live-dot" />
              {eyebrow}
            </div>
          )}
          <div className="sec-title">{title}</div>
        </div>
      </div>
      {actions && <div className="sec-hd-right">{actions}</div>}
    </div>
    <div className="pd-card-body">{children}</div>
  </div>
);

// ─── Shared small components ──────────────────────────────────────────────────

const EditIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);

const ChevronUp = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="18 15 12 9 6 15"/>
  </svg>
);

const ChevronDown = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6"  y1="6" x2="18" y2="18"/>
  </svg>
);

const DashedAddButton = ({ onClick, label }) => (
  <button
    onClick={onClick}
    style={{
      display: 'flex', alignItems: 'center', gap: 6,
      background: 'none', border: '1.5px dashed var(--rule2)',
      borderRadius: 8, padding: '8px 14px', width: '100%',
      justifyContent: 'center', cursor: 'pointer',
      fontFamily: "'Inconsolata', monospace", fontSize: 11,
      fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em',
      color: 'var(--ink3)', marginBottom: 12, transition: 'all 0.15s',
    }}
    onMouseEnter={e => {
      e.currentTarget.style.borderColor = 'var(--accent)';
      e.currentTarget.style.color = 'var(--accent)';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.borderColor = 'var(--rule2)';
      e.currentTarget.style.color = 'var(--ink3)';
    }}
  >
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19"/>
      <line x1="5"  y1="12" x2="19" y2="12"/>
    </svg>
    {label}
  </button>
);

const SaveCancelRow = ({ onSave, onCancel, saving }) => (
  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
    <button
      onClick={onSave}
      disabled={saving}
      className="btn-new"
      style={{ opacity: saving ? 0.7 : 1, display: 'flex', alignItems: 'center', gap: 6 }}
    >
      {saving ? (
        <>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
            style={{ animation: 'spin 1s linear infinite' }}>
            <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
          </svg>
          Saving…
        </>
      ) : (
        <>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          Save
        </>
      )}
    </button>
    <button onClick={onCancel} disabled={saving} className="btn-export"
      style={{ opacity: saving ? 0.5 : 1 }}>
      Cancel
    </button>
    <span style={{
      fontFamily: "'Inconsolata', monospace", fontSize: 10,
      color: 'var(--ink3)', textTransform: 'uppercase',
      letterSpacing: '0.08em', marginLeft: 'auto',
    }}>
      ⌘↵ save · esc cancel
    </span>
  </div>
);

const Spinner = ({ size = 36, inline = false }) => (
  <div style={{
    width: size, height: size,
    border: `${size > 20 ? 3 : 2}px solid var(--rule2)`,
    borderTop: `${size > 20 ? 3 : 2}px solid var(--accent)`,
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    ...(inline ? {} : { margin: '0 auto 12px' }),
  }} />
);

// ─── PAGE ─────────────────────────────────────────────────────────────────────

const PatentDetailPage = () => {
  const location       = useLocation();
  const navigate       = useNavigate();
  const { logout }     = useAuth();
  const [searchParams] = useSearchParams();
  const { patents }    = useStore();

  const projectData = location.state || {};
  const caseId      = searchParams.get('id') || projectData.id;

  // ── ALL data + actions from the hook — no patentApi here ──
  const {
    caseData,
    loading,
    error,
    analysisLoading,
    analysisStatus,
    uploadingDoc,
    updateCase,
    deleteCase,
    runAnalysis,
    uploadDocument,
    excludeMatch,
    setCaseData,
    potentialMatches,
    shouldShowMatches,
    shouldShowEmpty,
    infringementAnalysisStatus,
    iaIsInFlight,
  } = useCaseDetail(caseId);

  // ── Local UI state (no data concerns) ──
  const [sidebarOpen,   setSidebarOpen]   = useState(false);
  const [activeItem,    setActiveItem]    = useState('projects');
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [docModalIndex, setDocModalIndex] = useState(null);
  const fileInputRef = useRef();

  // ── Notification bell data — derived from Redux store ──
  const mappedPatentsForBell = patents.patents.map(p => {
    const lastViewed  = p.last_viewed  ? new Date(p.last_viewed)  : null;
    const lastUpdated = p.last_updated || p.updated_date || p.lastUpdated;
    const hasUpdates  = lastUpdated && lastViewed ? new Date(lastUpdated) > lastViewed : false;
    return {
      id:             p._id,
      title:          p.title || p.name || 'Untitled Project',
      patentNumber:   p.patentId || String(p._id || '').split('_')[1] || 'N/A',
      status:         p.status,
      updatedAt:      p.lastUpdated || p.updated_date || p.created_date,
      inventors:      p.inventors,
      filedDate:      p.filedDate || p.filed_date,
      keywords:       p.keywords,
      description:    p.description,
      matchesCount:   p.matchCount || p.match_count || 0,
      documentsCount: p.documentsCount,
      progress:       0,
      hasUpdates,
    };
  });

  // ── Derived display values ──
  const title        = caseData?.title    || projectData.title        || 'Untitled Case';
  const patentNumber = caseData?.patentId || projectData.patentNumber || caseData?._id?.split('_')[1] || 'N/A';
  const status       = getStatusShorthand(caseData?.status || projectData.status || 'draft');
  const updatedAt    = caseData
    ? formatTimeAgo(caseData.updated_date || caseData.created_date)
    : (projectData.updatedAt || '—');
  const inventors    = Array.isArray(caseData?.inventors)
    ? caseData.inventors.join(', ')
    : caseData?.inventors || projectData.inventors || 'Not specified';
  const filedDate    = formatDate(caseData?.filingDate || caseData?.filedAt) || projectData.filedDate || '—';
  const keywords     = Array.isArray(caseData?.keywords)
    ? caseData.keywords.map(k => k.charAt(0).toUpperCase() + k.slice(1)).join(', ')
    : caseData?.keywords || projectData.keywords || 'No keywords available';
  const matchesCount   = caseData?.infringements?.length ?? projectData.matchesCount ?? 0;
  const documentsCount = caseData?.documents?.length || projectData.documentsCount || 1;
  const claimsChart    = caseData?.claimsChart || {};
  const displayClaims  = caseData?.claims || [];
  const isProcessing   = (caseData?.status || '').toLowerCase().includes('processing');

  // ── Handlers ──

  const handleRunAnalysis = async () => {
    try {
      await runAnalysis();
    } catch (err) {
      const msg         = err?.message || 'Unknown error';
      const isRateLimit = msg.toLowerCase().includes('rate') || msg.includes('429');
      if (isRateLimit) alert('Rate limit hit, please wait a moment and try again.');
      else             alert(`Analysis failed: ${msg}`);
    }
  };

  const handleDeleteCase = async () => {
    if (!window.confirm('Are you sure you want to delete this case? This action cannot be undone.')) return;
    try {
      await deleteCase();
      navigate('/dashboard');
    } catch (err) {
      alert(`Delete failed: ${err?.message}`);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      await uploadDocument(file);
    } catch (err) {
      alert(`Upload failed: ${err?.message || 'Unknown error'}`);
    } finally {
      e.target.value = '';
    }
  };

  const openDocument = (index) => {
    const doc  = caseData?.documents?.[index];
    const url  = doc?.url || '';
    const kind = classifyDocUrl(url);
    if (kind === 'uspto' || kind === 'local') {
      setDocModalIndex(index);
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const exportCase = () => alert(`Exporting case for ${title}`);

  // ── Loading screen ──
  if (loading) {
    return (
      <div className="dash-shell">
        <DashboardSidebar activeItem={activeItem} onItemClick={setActiveItem} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="dash-main">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <div style={{ textAlign: 'center' }}>
              <Spinner />
              <p style={{ fontSize: 14, color: 'var(--ink3)' }}>Loading case details...</p>
            </div>
          </div>
        </main>
        <PageStyles />
      </div>
    );
  }

  // ── Error screen ──
  if (error && !projectData.title) {
    return (
      <div className="dash-shell">
        <DashboardSidebar activeItem={activeItem} onItemClick={setActiveItem} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="dash-main">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', flexDirection: 'column', gap: 16, padding: '0 20px', textAlign: 'center' }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)' }}>No Patent Data Found</h2>
            <p style={{ color: 'var(--ink3)', fontSize: 14 }}>Please select a patent from the dashboard.</p>
            <button className="btn-new" onClick={() => navigate('/dashboard')}>Go to Dashboard</button>
          </div>
        </main>
      </div>
    );
  }

  const sLower = String(status).toLowerCase();

  return (
    <div className="dash-shell">
      <DashboardSidebar
        activeItem={activeItem}
        onItemClick={setActiveItem}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="dash-main">

        {/* ── Top Nav ── */}
        <header className="topnav">
          <div className="tn-left">
            <button className="tn-hamburger" onClick={() => setSidebarOpen(true)} aria-label="Open menu">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="6"  x2="21" y2="6"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>
            <span className="tn-title">Patent Gap AI</span>
            <div className="tn-sep pd-tn-sep" />
            <span className="tn-sub pd-tn-sub">Patent Detail</span>
          </div>
          <div className="tn-right">
            <NotificationBell
              patents={mappedPatentsForBell}
              onPatentClick={(patent) => navigate(`/patent-detail?id=${patent.id}`)}
            />
            <div className="tn-vsep" />
            <Link to="/dashboard" className="tn-btn">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
              <span className="pd-tn-label">Dashboard</span>
            </Link>
            <button className="tn-btn" onClick={logout}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              <span className="pd-tn-label">Log out</span>
            </button>
          </div>
        </header>

        {/* ── Content ── */}
        <div className="dash-content">

          {/* ── Page Header ── */}
          <div className="page-hd pd-page-hd">
            <div style={{ minWidth: 0, flex: 1 }}>
              <div className="page-eyebrow">Patent Detail</div>
              <h1 className="page-title pd-page-title"><em>{title}</em></h1>
            </div>
            <div className="hd-actions pd-hd-actions">
              <button className="tn-btn" onClick={() => navigate(-1)}>
                <ArrowLeft size={13} />
                <span>Back</span>
              </button>
              <button className="btn-export" onClick={exportCase}>
                <Download size={14} />
                <span className="pd-btn-label">Export</span>
              </button>
              {!iaIsInFlight && (
                <button
                  className="btn-new"
                  onClick={handleRunAnalysis}
                  disabled={analysisLoading}
                  style={{ opacity: analysisLoading ? 0.7 : 1 }}
                >
                  {analysisLoading ? (
                    <>
                      <RefreshCw size={14} style={{ animation: 'spin 1s linear infinite' }} />
                      <span className="pd-btn-label">
                        {analysisStatus === 'claims' ? 'Isolating…' : 'Matching…'}
                      </span>
                    </>
                  ) : (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                      </svg>
                      <span className="pd-btn-label">Run Analysis</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* ── Hero patent card ── */}
          <div
            className={`pcard ${sLower === 'expired' ? 'expired' : sLower === 'abandoned' ? 'abandoned' : 'patented'}`}
            style={{ marginBottom: 20, cursor: 'default' }}
          >
            <div className="pcard-top">
              <StatusPill status={status} />
              <span style={{ fontFamily: "'Inconsolata', monospace", fontSize: 11, color: 'var(--ink3)' }}>
                {getSourceName(caseData?._id || '')}
              </span>
            </div>
            <div className="pcard-title" style={{ fontSize: 13, textTransform: 'none', letterSpacing: 0 }}>{title}</div>
            <div className="pd-chips">
              <div className="pcard-num">
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/></svg>
                {patentNumber}
              </div>
              <div className="pcard-num">
                <Clock size={9} />
                {updatedAt}
              </div>
              {matchesCount > 0 && (
                <div className="pcard-num" style={{ color: 'var(--amber)', background: 'var(--amber-soft)' }}>
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                  </svg>
                  {matchesCount} match{matchesCount !== 1 ? 'es' : ''}
                </div>
              )}
            </div>
          </div>

          {/* ── Processing progress bar ── */}
          {isProcessing && caseData?.progress !== undefined && (
            <div className="pd-card-body" style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontFamily: "'Inconsolata', monospace", fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ink3)' }}>Analysis Progress</span>
                <span style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 18, fontWeight: 700, color: 'var(--ink)' }}>{caseData.progress}%</span>
              </div>
              <div className="prog-track" style={{ height: 6 }}>
                <div className="prog-fill green" style={{ width: `${caseData.progress}%`, transition: 'width 0.4s ease' }} />
              </div>
            </div>
          )}

          {/* ── Two-column info grid ── */}
          <div className="pd-two-col">
            <SectionCard title="Case Information" eyebrow="Patent Data" icon={FileText}>
              <InfoRow icon={Calendar} label="Created"      value={formatDate(caseData?.created_date || caseData?.createdAt) || updatedAt} />
              <InfoRow icon={FileText} label="Filed"        value={filedDate} />
              <InfoRow icon={Clock}    label="Last Updated" value={updatedAt} />
              <InfoRow icon={User}     label="Inventors"    value={inventors} />
              <InfoRow icon={Tag}      label="Keywords"     value={keywords} />
              <InfoRow icon={Tag}      label="Source"       value={getSourceName(caseData?._id || '')} />
            </SectionCard>

            {/* Context — onSave calls updateCase through hook */}
            <SectionCard title="Context & Description" eyebrow="Overview" icon={FileText}>
              <ContextEditor
                initialValue={caseData?.context || caseData?.description || projectData.description || ''}
                onSave={(newDesc) => updateCase({ context: newDesc })}
              />
              {(caseData?.companies?.length > 0 || caseData?.countries?.length > 0 || caseData?.terms?.length > 0) && (
                <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--rule2)' }}>
                  <div style={{ fontFamily: "'Inconsolata', monospace", fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ink3)', marginBottom: 10 }}>Search Strategy</div>
                  {caseData.companies?.length > 0 && (
                    <div style={{ marginBottom: 8 }}>
                      <div style={{ fontSize: 11, color: 'var(--ink3)', marginBottom: 5 }}>Target Companies</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                        {caseData.companies.map((c, i) => <span key={i} className="pcard-num" style={{ margin: 0 }}>{c}</span>)}
                      </div>
                    </div>
                  )}
                  {caseData.terms?.length > 0 && (
                    <div>
                      <div style={{ fontSize: 11, color: 'var(--ink3)', marginBottom: 5 }}>Search Terms</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                        {caseData.terms.map((t, i) => <span key={i} className="pcard-num" style={{ margin: 0 }}>{t}</span>)}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </SectionCard>
          </div>

          {/* ── Search Limitations + Related IDs ── */}
          <div className="pd-sl-ri-row">
            <SectionCard title="Search Limitations" eyebrow="User Defined" icon={Search}>
              <SearchLimitationEditor
                caseId={caseId}
                initialData={caseData?.searchLimitations}
                onSave={(data) => updateCase({ searchLimitations: data })}
              />
            </SectionCard>

            <SectionCard title="Related IDs" eyebrow="Patent Family" icon={FileText}>
              {caseData?.other_ids?.filter(item =>
                Array.isArray(item.value) ? item.value.length > 0 : Boolean(item.value)
              ).length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {caseData.other_ids
                    .filter(item => Array.isArray(item.value) ? item.value.length > 0 : Boolean(item.value))
                    .map((item, i, arr) => {
                      const values = Array.isArray(item.value) ? item.value : item.value ? [item.value] : [];
                      return (
                        <div key={i} style={{
                          display: 'flex', alignItems: 'flex-start', gap: 12,
                          padding: '9px 0',
                          borderBottom: i < arr.length - 1 ? '1px solid var(--rule2)' : 'none',
                        }}>
                          <span style={{
                            fontFamily: "'Inconsolata', monospace", fontSize: 10,
                            textTransform: 'uppercase', letterSpacing: '0.10em',
                            color: 'var(--ink3)', flexShrink: 0, width: 160, paddingTop: 4,
                          }}>
                            {item.title || '—'}
                          </span>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                            {values.map((v, vi) => (
                              <span key={vi} style={{
                                fontFamily: "'Inconsolata', monospace", fontSize: 11, fontWeight: 600,
                                color: 'var(--accent)', background: 'var(--acc-soft)',
                                border: '1px solid color-mix(in srgb, var(--accent) 20%, transparent)',
                                borderRadius: 5, padding: '2px 9px',
                                letterSpacing: '0.04em', wordBreak: 'break-all',
                              }}>
                                {v}
                              </span>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                </div>
              ) : (
                <p style={{ fontSize: 13.5, color: 'var(--ink3)', margin: 0, fontStyle: 'italic' }}>
                  No related IDs available.
                </p>
              )}
            </SectionCard>
          </div>

          {/* ── Documents ── */}
          <SectionCard
            title="Documents"
            eyebrow="Files"
            icon={FileText}
            actions={
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span className="pcard-num" style={{ margin: 0, color: 'var(--accent)' }}>
                  {documentsCount} doc{documentsCount !== 1 ? 's' : ''}
                </span>
                <input
                  ref={fileInputRef}
                  type="file"
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
                <button
                  className="btn-new"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadingDoc}
                  style={{ opacity: uploadingDoc ? 0.7 : 1, display: 'flex', alignItems: 'center', gap: 6, padding: '5px 11px', fontSize: 11 }}
                >
                  {uploadingDoc ? (
                    <><RefreshCw size={12} style={{ animation: 'spin 1s linear infinite' }} /> Uploading…</>
                  ) : (
                    <>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19"/>
                        <line x1="5"  y1="12" x2="19" y2="12"/>
                      </svg>
                      Add Document
                    </>
                  )}
                </button>
              </div>
            }
          >
            <div className="pd-docs-grid">
              {caseData?.documents?.length > 0
                ? caseData.documents.map((doc, i) => {
                    const url    = doc.url || '';
                    const src    = doc.source || '';
                    const rawExt = url.split('/').pop().split('.').pop();
                    const ext    = rawExt && rawExt.length <= 5 && !/[?&\s]/.test(rawExt) ? rawExt : 'pdf';
                    const srcL   = src.toLowerCase();
                    const bgImg  =
                      srcL.includes('uspto')          ? 'uspto.jpg'            :
                      srcL.includes('espacenet')      ? 'espacenet.png'        :
                      srcL.includes('google patents') ? 'googlepatents.png'    :
                      srcL.includes('global dossier') ? 'espacenet.png'        :
                      srcL.includes('local')          ? 'local.png'            :
                      srcL.includes('freepatents')    ? 'freepatentsonline.png':
                      'default.png';

                    return (
                      <div key={i} onClick={() => openDocument(i)} className="pd-doc-thumb">
                        <div
                          className="pd-doc-inner"
                          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; }}
                          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
                          style={{ cursor: 'pointer' }}
                        >
                          <img src={`/images/${bgImg}`} alt={src}
                            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.45 }} />
                          <div className="pd-doc-blur" />
                          <div className="pd-doc-label" style={{ flexDirection: 'column', gap: 6, padding: '0 6px', textAlign: 'center' }}>
                            <span style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--ink)', lineHeight: 1, letterSpacing: '-0.02em' }}>
                              {i + 1}
                            </span>
                            <span style={{ fontSize: 10, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.10em', color: 'var(--ink)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '92%', lineHeight: 1.2 }}>
                              {src || `doc ${i + 1}`}
                            </span>
                            <span style={{ fontSize: 10, fontWeight: 900, color: 'var(--ink2)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                              .{ext}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })
                : Array.from({ length: documentsCount }, (_, i) => (
                    <div key={i} className="pd-doc-thumb">
                      <div className="pd-doc-inner pd-doc-placeholder">
                        <FileText size={28} color="var(--accent)" strokeWidth={1.5} />
                        <span style={{ fontFamily: "'Inconsolata', monospace", fontSize: 13, fontWeight: 600, color: 'var(--ink2)' }}>{i + 1}.xml</span>
                      </div>
                    </div>
                  ))
              }
            </div>
          </SectionCard>

          {/* ── Claims — only when real claims exist ── */}
          {displayClaims.length > 0 && (
            <SectionCard title="Claims for Analysis" eyebrow="Patent Claims" icon={FileText}>
              <ClaimsEditor
                initialClaims={displayClaims}
                onSave={(newClaims) => updateCase({ claims: newClaims })}
              />
            </SectionCard>
          )}

          {/* ── Claims Chart ── */}
          {Object.keys(claimsChart).length > 0 && (
            <SectionCard title="Claims Chart" eyebrow="Analysis" icon={FileText}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {Object.entries(claimsChart).map(([key, items]) => (
                  <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: "'Inconsolata', monospace", fontSize: 11, fontWeight: 600, color: 'var(--ink2)', minWidth: 64 }}>Claim {key}</span>
                    {(items || []).map((item, idx) => (
                      <div key={idx} style={{
                        border: `1.5px solid ${selectMainColor(item.similarity_score)}`,
                        borderRadius: 5, padding: '2px 8px',
                        color: selectMainColor(item.similarity_score),
                        fontFamily: "'Inconsolata', monospace", fontSize: 11, fontWeight: 600,
                      }}>
                        {item.entry_id}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </SectionCard>
          )}

          {/* ── Potential Matches ── */}
          <div style={{ marginBottom: 20 }}>
            <div className="sec-hd" style={{ marginBottom: 12 }}>
              <div className="sec-hd-left">
                <div className="sec-ico">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                    <line x1="12" y1="9" x2="12" y2="13"/>
                    <line x1="12" y1="17" x2="12.01" y2="17"/>
                  </svg>
                </div>
                <div>
                  <div className="sec-eye"><div className="live-dot" />Infringement Analysis</div>
                  <div className="sec-title">Potential Matches</div>
                </div>
              </div>
              <div className="sec-hd-right">
                {!iaIsInFlight && (
                  <button className="btn-refresh" onClick={handleRunAnalysis} title="Re-run analysis">
                    <RefreshCw size={13} style={{ animation: analysisLoading ? 'spin 1s linear infinite' : 'none' }} />
                  </button>
                )}
                <span className="pcard-num" style={{
                  margin: 0,
                  color:      matchesCount > 0 ? 'var(--amber)' : 'var(--accent)',
                  background: matchesCount > 0 ? 'var(--amber-soft)' : 'var(--acc-soft)',
                }}>
                  {matchesCount} match{matchesCount !== 1 ? 'es' : ''}
                </span>
              </div>
            </div>

            {/* Case 1: user triggered analysis loading */}
            {analysisLoading && (
              <div className="pd-card-body" style={{ textAlign: 'center', padding: '40px 24px', marginBottom: 16 }}>
                <Spinner />
                <p style={{ fontSize: 13, color: 'var(--ink3)', margin: '0 0 4px' }}>
                  {analysisStatus === 'claims' ? 'Isolating Claims…' : 'Finding Infringements…'}
                </p>
              </div>
            )}

            {/* Case 2: backend analysis in-flight */}
            {!analysisLoading && iaIsInFlight && (
              <div className="pd-card-body" style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '24px', marginBottom: 16 }}>
                <Spinner size={32} inline />
                <div>
                  <p style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--ink)', margin: '0 0 3px' }}>
                    Analysis in progress
                  </p>
                  <p style={{ fontFamily: "'Inconsolata', monospace", fontSize: 11, color: 'var(--ink3)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Status: {infringementAnalysisStatus}<br />
                    We are working hard to find insights to protect your inventions.<br />
                    This may take a while — we will notify you when results are ready.
                  </p>
                </div>
                <span style={{
                  marginLeft: 'auto', flexShrink: 0,
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  fontFamily: "'Inconsolata', monospace", fontSize: 10, fontWeight: 600,
                  textTransform: 'uppercase', letterSpacing: '0.10em',
                  padding: '4px 10px', borderRadius: 5,
                  background: 'var(--amber-soft, rgba(251,191,36,0.12))',
                  color: 'var(--amber, #b45309)',
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--amber, #b45309)', animation: 'ia-pulse 1.4s ease-in-out infinite' }} />
                  Processing
                </span>
              </div>
            )}

            {/* Case 3: empty state */}
            {shouldShowEmpty && !iaIsInFlight && (
              <div className="pd-card-body pd-no-matches">
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 20 }}>✅</span>
                  <p style={{ fontSize: 13.5, color: 'var(--ink2)', margin: 0 }}>No potential infringement matches found.</p>
                </div>
                <button className="btn-new" onClick={handleRunAnalysis}>Start Analysis</button>
              </div>
            )}

            {/* Case 4: matches grid */}
            {shouldShowMatches && (
              <div className="cards-grid">
                {potentialMatches.map((match, index) => (
                  <MatchCard
                    key={index}
                    match={match}
                    updatedAt={updatedAt}
                    caseId={caseId}
                    onSelect={setSelectedMatch}
                    onExclude={excludeMatch}
                  />
                ))}
              </div>
            )}

            <div className="pd-action-btns">
              <button className="btn-export" onClick={exportCase}>
                <Download size={14} /> Export Case
              </button>
              <button
                className="btn-export"
                onClick={handleDeleteCase}
                style={{ color: 'var(--red)', borderColor: 'rgba(185,28,28,0.22)' }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--red-soft)'}
                onMouseLeave={e => e.currentTarget.style.background = '#fff'}
              >
                <Trash2 size={14} /> Delete Case
              </button>
            </div>
          </div>

        </div>
      </main>

      <PageStyles />

      {/* ── Infringement modal ── */}
      {selectedMatch && (
        <InfringementModal
          match={selectedMatch}
          patentTitle={title}
          patentNumber={patentNumber}
          caseId={caseId}
          infringementId={selectedMatch._entryId || null}
          onClose={() => setSelectedMatch(null)}
        />
      )}

      {/* ── Document modal ── */}
      {docModalIndex !== null && caseData?.documents?.[docModalIndex] !== undefined && (
        <DocumentModal
          doc={caseData.documents[docModalIndex]}
          index={docModalIndex}
          total={caseData.documents.length}
          onClose={() => setDocModalIndex(null)}
          onNext={() => setDocModalIndex(i => Math.min(i + 1, caseData.documents.length - 1))}
          onPrev={() => setDocModalIndex(i => Math.max(i - 1, 0))}
          fetchBlob={async (doc) => {
            const url  = doc?.url || '';
            const kind = classifyDocUrl(url);
            if (kind === 'uspto') {
              try {
                return await patentApi.proxyDocument(url);   // ← only API call left — via the hook's fetchBlob pattern
              } catch (err) {
                throw new Error(
                  err?.message?.includes('HTML page')
                    ? 'This document link points to a USPTO search page, not a direct file. Open it in a new tab instead.'
                    : `Could not load USPTO document: ${err?.message || 'Unknown error'}`
                );
              }
            }
            if (kind === 'local') {
              return await patentApi.getDocumentStream(`/${url}`);
            }
            throw new Error(`Unsupported document source for URL: ${url}`);
          }}
        />
      )}
    </div>
  );
};

// ─── Styles in their own component so JSX stays readable ─────────────────────

const PageStyles = () => (
  <style>{`
    @keyframes spin    { from { transform: rotate(0deg)   } to { transform: rotate(360deg) } }
    @keyframes ia-pulse { 0%, 100% { opacity: 1; transform: scale(1) } 50% { opacity: 0.4; transform: scale(0.75) } }

    .pd-badge { display: inline-flex; align-items: center; gap: 5px; font-family: 'Inconsolata', monospace; font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.10em; padding: 4px 9px; border-radius: 5px; }
    .pd-badge-dot { width: 5px; height: 5px; border-radius: 50%; background: currentColor; flex-shrink: 0; }
    .pd-badge.patented  { background: rgba(46,125,50,0.10); color: #1b5e20; }
    .pd-badge.abandoned { background: var(--acc-soft);  color: var(--accent); }
    .pd-badge.expired   { background: var(--red-soft);  color: var(--red); }

    .pd-card-body { background: var(--surf); border-radius: var(--radius); border: 1px solid rgba(255,255,255,0.55); box-shadow: var(--shadow-sm); padding: 20px 24px; }

    .pd-info-row { display: flex; align-items: flex-start; gap: 12px; padding: 10px 0; border-bottom: 1px solid var(--rule2); }
    .pd-info-label-wrap { display: flex; align-items: center; gap: 7px; width: 130px; flex-shrink: 0; }
    .pd-info-label { font-family: 'Inconsolata', monospace; font-size: 10px; text-transform: uppercase; letter-spacing: 0.10em; color: var(--ink3); }
    .pd-info-value { font-size: 13.5px; color: var(--ink); line-height: 1.55; word-break: break-word; }

    .pd-chips { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 12px; }

    .pd-page-hd  { align-items: flex-start !important; flex-wrap: wrap; gap: 12px; }
    .pd-page-title { word-break: break-word; }
    .pd-hd-actions { flex-shrink: 0; }

    .pd-two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px; }

    .pd-docs-grid { display: flex; flex-wrap: wrap; gap: 14px; }
    .pd-doc-thumb { cursor: pointer; }
    .pd-doc-inner { position: relative; width: 8rem; height: 10.5rem; border: 2px solid var(--surf2); border-radius: 10px; overflow: hidden; box-shadow: var(--shadow-sm); transition: transform 0.2s; }
    .pd-doc-blur  { position: absolute; inset: 0; backdrop-filter: blur(3px); background: rgba(250,250,247,0.3); z-index: 1; }
    .pd-doc-label { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-family: 'Inconsolata', monospace; font-weight: 600; font-size: 1.1rem; color: var(--ink); z-index: 2; }
    .pd-doc-placeholder { background: linear-gradient(135deg, var(--acc-soft), var(--surf2)); border-color: var(--acc-border); display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 8px; }
    .pd-doc-placeholder .pd-doc-label { position: static; font-size: 13px; }

    .pd-no-matches { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; }

    .pd-sl-ri-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

    .pd-action-btns { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 20px; }

    .cards-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; align-items: start; }

    @media (max-width: 900px) {
      .pd-two-col { grid-template-columns: 1fr; }
      .pd-sl-ri-row { grid-template-columns: 1fr; }
      .pd-tn-sep, .pd-tn-sub { display: none; }
    }
    @media (max-width: 640px) {
      .dash-content { padding: 14px 14px 32px !important; }
      .pd-page-hd { flex-direction: column !important; align-items: stretch !important; }
      .pd-hd-actions { display: flex; flex-wrap: wrap; gap: 8px; width: 100%; }
      .pd-hd-actions > * { flex: 1; justify-content: center; min-width: 80px; }
      .pd-card-body { padding: 14px 16px; }
      .pd-info-row { flex-direction: column; gap: 4px; }
      .pd-info-label-wrap { width: auto; }
      .pd-doc-inner { width: 6.5rem; height: 8.5rem; }
      .cards-grid { grid-template-columns: 1fr !important; }
      .pd-action-btns { flex-direction: column; }
      .pd-action-btns .btn-export { width: 100%; justify-content: center; }
      .pd-tn-label { display: none; }
      .tn-title { font-size: 13px; }
    }
    @media (max-width: 380px) {
      .dash-content { padding: 10px 10px 24px !important; }
      .pd-doc-inner { width: 5.5rem; height: 7rem; }
      .page-title { font-size: clamp(15px, 5vw, 24px) !important; }
    }
  `}</style>
);

export default PatentDetailPage;