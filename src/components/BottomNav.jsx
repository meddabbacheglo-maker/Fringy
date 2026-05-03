import { useLocation, useNavigate } from 'react-router-dom'

const tabs = [
  { path: '/home', label: 'Accueil', icon: HomeIcon },
  { path: '/wardrobe', label: 'Garde-robe', icon: WardrobeIcon },
  { path: '/outfits', label: 'Tenues', icon: OutfitIcon },
  { path: '/stylist', label: 'Styliste', icon: StylistIcon },
  { path: '/profile', label: 'Profil', icon: ProfileIcon },
]

export default function BottomNav() {
  const location = useLocation()
  const navigate = useNavigate()
  const isHidden = location.pathname === '/' || ['/wardrobe/add', '/wardrobe/'].some(p => location.pathname.startsWith(p) && location.pathname !== '/wardrobe')

  if (isHidden) return null

  return (
    <nav style={{
      position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
      width: '100%', maxWidth: 430,
      background: 'rgba(255,255,255,0.95)',
      backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
      borderTop: '1px solid var(--border)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-around',
      height: 'var(--nav-height)',
      padding: '0 8px',
      zIndex: 100,
    }}>
      {tabs.map(({ path, label, icon: Icon }) => {
        const active = location.pathname === path || (path !== '/home' && location.pathname.startsWith(path))
        return (
          <button
            key={path}
            onClick={() => navigate(path)}
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
              padding: '8px 12px', borderRadius: 12,
              background: 'none', border: 'none', cursor: 'pointer',
              color: active ? 'var(--gold)' : 'var(--text-muted)',
              transition: 'color 0.2s',
              minWidth: 56,
            }}
          >
            <Icon active={active} />
            <span style={{ fontSize: 10, fontWeight: active ? 600 : 400, letterSpacing: '0.01em' }}>{label}</span>
          </button>
        )
      })}
    </nav>
  )
}

function HomeIcon({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  )
}

function WardrobeIcon({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.8} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="18" rx="2"/>
      <line x1="12" y1="3" x2="12" y2="21"/>
      <path d="M7 8h2M15 8h2M7 12h2M15 12h2"/>
    </svg>
  )
}

function OutfitIcon({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.57a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.57a2 2 0 00-1.34-2.23z"/>
    </svg>
  )
}

function StylistIcon({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  )
}

function ProfileIcon({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  )
}
