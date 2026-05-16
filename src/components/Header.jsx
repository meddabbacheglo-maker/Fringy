import { useNavigate } from 'react-router-dom'

export default function Header({ title, subtitle, showBack = false, action, transparent = false }) {
  const navigate = useNavigate()
  return (
    <header style={{
      position: 'fixed', top: 0, left: '50%', transform: 'translateX(-50%)',
      width: '100%', maxWidth: 430,
      height: 'var(--header-height)',
      background: transparent ? 'transparent' : 'rgba(255,255,255,0.96)',
      backdropFilter: transparent ? 'none' : 'blur(16px)',
      WebkitBackdropFilter: transparent ? 'none' : 'blur(16px)',
      borderBottom: transparent ? 'none' : '1px solid var(--border)',
      display: 'flex', alignItems: 'center',
      padding: '0 20px',
      zIndex: 90,
      gap: 12,
    }}>
      {showBack && (
        <button
          onClick={() => navigate(-1)}
          style={{
            width: 34, height: 34, borderRadius: 10, flexShrink: 0,
            background: 'var(--surface)', border: '1px solid var(--border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text)" strokeWidth="2.2" strokeLinecap="round">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
        </button>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: 17, fontWeight: 700, letterSpacing: '-0.025em',
          color: transparent ? 'white' : 'var(--text)',
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>
          {title}
        </div>
        {subtitle && (
          <div style={{
            fontSize: 12, color: transparent ? 'rgba(255,255,255,0.65)' : 'var(--text-muted)',
            marginTop: 1,
          }}>
            {subtitle}
          </div>
        )}
      </div>
      {action}
    </header>
  )
}
