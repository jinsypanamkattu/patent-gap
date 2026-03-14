const StatCard = ({ title, value, subtitle, icon, color = 'green', onClick, isActive = false }) => {
  const isAmber = color === 'yellow' || color === 'amber';

  return (
    <div
      className={`stat-card${isActive ? ' stat-card--active' : ''}${onClick ? ' stat-card--clickable' : ''}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
    >
      <div className="stat-info">
        <div className="stat-lbl">{title}</div>
        <div className="stat-num">{value}</div>
        <div className="stat-foot">
          <div className={`stat-bar${isAmber ? ' amber' : ''}`} />
          <span className="stat-note">{subtitle}</span>
        </div>
      </div>
      <div className={`stat-ico${isAmber ? ' amber' : ''}`}>
        {icon}
      </div>

      {/* Active indicator dot */}
      {isActive && <div className="stat-active-dot" />}

      <style>{`
        .stat-card--clickable {
          cursor: pointer;
          transition: transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease;
        }
        .stat-card--clickable:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(0,0,0,0.10);
        }
        .stat-card--clickable:active {
          transform: translateY(0px);
        }
        .stat-card--active {
          border-color: var(--accent) !important;
          box-shadow: 0 0 0 2px color-mix(in srgb, var(--accent) 20%, transparent) !important;
        }
        .stat-active-dot {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--accent);
        }
        .stat-card {
          position: relative;
        }
      `}</style>
    </div>
  );
};

export default StatCard;
