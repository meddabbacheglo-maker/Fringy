import { useLocation, useNavigate } from 'react-router-dom'

const HIDE_PATHS = ['/', '/auth', '/wardrobe/add']

export default function BottomNav() {
  const location = useLocation()
  const navigate = useNavigate()

  const isHidden =
    HIDE_PATHS.includes(location.pathname) ||
    (location.pathname.startsWith('/wardrobe/') && location.pathname !== '/wardrobe')

  if (isHidden) return null

  const at = (path) =>
    path === '/home'
      ? location.pathname === path
      : location.pathname === path || location.pathname.startsWith(path + '/')

  return (
    <nav style={{
      position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
      width: '100%', maxWidth: 430,
      background: 'rgba(255,255,255,0.97)',
      backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
      borderTop: '1px solid var(--border)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-around',
      height: 'var(--nav-height)',
      padding: '0 4px 8px',
      zIndex: 100,
    }}>

      <TabBtn label="Accueil" active={at('/home')} onClick={() => navigate('/home')}>
        <HomeIcon active={at('/home')} />
      </TabBtn>

      <TabBtn label="Garde-robe" active={at('/wardrobe')} onClick={() => navigate('/wardrobe')}>
        <HangerIcon active={at('/wardrobe')} />
      </TabBtn>

      {/* Center FAB */}
      <button
        onClick={() => navigate('/wardrobe/add')}
        style={{
          width: 54, height: 54, borderRadius: '50%', flexShrink: 0,
          background: 'linear-gradient(135deg, #D4B05A, #C9A84C, #A8843A)',
          border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(201,168,76,0.45)',
          transform: 'translateY(-8px)',
          transition: 'transform 0.15s, box-shadow 0.15s',
        }}
        onTouchStart={e => { e.currentTarget.style.transform = 'translateY(-8px) scale(0.93)' }}
        onTouchEnd={e => { e.currentTarget.style.transform = 'translateY(-8px) scale(1)' }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
          <line x1="12" y1="5" x2="12" y2="19"/>
          <line x1="5"  y1="12" x2="19" y2="12"/>
        </svg>
      </button>

      <TabBtn label="Tenues" active={at('/outfits')} onClick={() => navigate('/outfits')}>
        <OutfitsIcon active={at('/outfits')} />
      </TabBtn>

      <TabBtn label="Profil" active={at('/profile')} onClick={() => navigate('/profile')}>
        <ProfileIcon active={at('/profile')} />
      </TabBtn>

    </nav>
  )
}

function TabBtn({ label, active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
        padding: '6px 10px 2px', minWidth: 52,
        background: 'none', border: 'none', cursor: 'pointer',
        color: active ? 'var(--gold)' : 'var(--text-light)',
        transition: 'color 0.15s',
        position: 'relative',
      }}
    >
      {children}
      <span style={{ fontSize: 10, fontWeight: active ? 600 : 400, letterSpacing: '0.01em' }}>
        {label}
      </span>
      {active && (
        <span style={{
          position: 'absolute', bottom: -2, left: '50%', transform: 'translateX(-50%)',
          width: 4, height: 4, borderRadius: '50%', background: 'var(--gold)',
        }} />
      )}
    </button>
  )
}

function HomeIcon({ active }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? 'var(--gold)' : 'none'} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  )
}

function HangerIcon({ active }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.57a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.57a2 2 0 00-1.34-2.23z"
        fill={active ? 'rgba(201,168,76,0.15)' : 'none'}
      />
    </svg>
  )
}

function OutfitsIcon({ active }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" fill={active ? 'rgba(201,168,76,0.15)' : 'none'}/>
      <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
    </svg>
  )
}

function ProfileIcon({ active }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" fill={active ? 'rgba(201,168,76,0.15)' : 'none'}/>
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
    </svg>
  )
}
