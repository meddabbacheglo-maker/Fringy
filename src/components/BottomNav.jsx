import { useLocation, useNavigate } from 'react-router-dom'

const HIDE_PATHS = ['/', '/auth', '/wardrobe/add']

export default function BottomNav() {
  const location = useLocation()
  const navigate  = useNavigate()

  const isHidden =
    HIDE_PATHS.includes(location.pathname) ||
    (location.pathname.startsWith('/wardrobe/') && location.pathname !== '/wardrobe')

  if (isHidden) return null

  const at = (path) =>
    path === '/home'
      ? location.pathname === path
      : location.pathname === path || location.pathname.startsWith(path + '/')

  const homeActive    = at('/home')
  const profileActive = at('/profile')

  return (
    <nav style={{
      position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
      width: '100%', maxWidth: 430,
      background: 'rgba(255,255,255,0.97)',
      backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
      borderTop: '1px solid var(--border)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-around',
      height: 'var(--nav-height)',
      padding: '0 40px 8px',
      zIndex: 100,
    }}>

      {/* Home */}
      <button
        onClick={() => navigate('/home')}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: 44, height: 44, background: 'none', border: 'none', cursor: 'pointer',
          color: homeActive ? '#000' : '#BBBBBB',
        }}
      >
        <svg width="26" height="26" viewBox="0 0 24 24"
          fill={homeActive ? '#000' : 'none'}
          stroke="currentColor" strokeWidth="1.8"
          strokeLinecap="round" strokeLinejoin="round"
        >
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      </button>

      {/* Center FAB — black */}
      <button
        onClick={() => navigate('/wardrobe/add')}
        style={{
          width: 56, height: 56, borderRadius: '50%', flexShrink: 0,
          background: '#000',
          border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(0,0,0,0.28)',
          transform: 'translateY(-8px)',
          transition: 'transform 0.15s, box-shadow 0.15s',
        }}
        onTouchStart={e => { e.currentTarget.style.transform = 'translateY(-8px) scale(0.92)' }}
        onTouchEnd={e => { e.currentTarget.style.transform = 'translateY(-8px) scale(1)' }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
          <line x1="12" y1="5" x2="12" y2="19"/>
          <line x1="5"  y1="12" x2="19" y2="12"/>
        </svg>
      </button>

      {/* Profile */}
      <button
        onClick={() => navigate('/profile')}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: 44, height: 44, background: 'none', border: 'none', cursor: 'pointer',
          color: profileActive ? '#000' : '#BBBBBB',
        }}
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="4" fill={profileActive ? 'rgba(0,0,0,0.12)' : 'none'}/>
          <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
        </svg>
      </button>

    </nav>
  )
}
