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

  return (
    <nav style={{
      position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
      width: '100%', maxWidth: 430,
      background: '#FFFFFF',
      borderTop: '1px solid #EEEEEE',
      display: 'flex', alignItems: 'center', justifyContent: 'space-around',
      height: 'var(--nav-height)',
      padding: '0 4px 8px',
      zIndex: 100,
    }}>

      <NavItem
        label="Accueil"
        active={at('/home')}
        onClick={() => navigate('/home')}
        icon={<HouseIcon active={at('/home')} />}
      />

      <NavItem
        label="Mon Placard"
        active={at('/wardrobe')}
        onClick={() => navigate('/wardrobe')}
        icon={<HangerIcon active={at('/wardrobe')} />}
      />

      {/* Center FAB */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom: 2 }}>
        <button
          onClick={() => navigate('/wardrobe/add')}
          style={{
            width: 58, height: 58, borderRadius: '50%',
            background: '#000', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 20px rgba(0,0,0,0.30), 0 2px 8px rgba(0,0,0,0.14)',
            transform: 'translateY(-10px)',
            transition: 'transform 0.15s, box-shadow 0.15s',
            flexShrink: 0,
          }}
          onTouchStart={e => { e.currentTarget.style.transform = 'translateY(-10px) scale(0.92)' }}
          onTouchEnd={e => { e.currentTarget.style.transform = 'translateY(-10px) scale(1)' }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5"  y1="12" x2="19" y2="12"/>
          </svg>
        </button>
      </div>

      <NavItem
        label="Marketplace"
        active={at('/marketplace')}
        onClick={() => navigate('/outfits')}
        icon={<BagIcon active={at('/marketplace')} />}
      />

      <NavItem
        label="Pressing"
        active={at('/pressing')}
        onClick={() => navigate('/profile')}
        icon={<IronIcon active={at('/pressing')} />}
      />

      <NavItem
        label="My Assistant"
        active={at('/stylist')}
        onClick={() => navigate('/stylist')}
        icon={<AssistantIcon active={at('/stylist')} />}
      />

    </nav>
  )
}

function NavItem({ label, active, onClick, icon }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
        background: 'none', border: 'none', cursor: 'pointer',
        color: active ? '#000000' : '#AAAAAA',
        minWidth: 44, padding: '4px 2px 0',
      }}
    >
      {icon}
      <span style={{
        fontSize: 10, fontWeight: active ? 600 : 400,
        letterSpacing: '-0.01em', lineHeight: 1,
        whiteSpace: 'nowrap',
      }}>
        {label}
      </span>
    </button>
  )
}

function HouseIcon({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24"
      fill={active ? '#000' : 'none'}
      stroke={active ? '#000' : '#AAAAAA'}
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  )
}

function HangerIcon({ active }) {
  const c = active ? '#000' : '#AAAAAA'
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.57a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.57a2 2 0 00-1.34-2.23z"/>
    </svg>
  )
}

function BagIcon({ active }) {
  const c = active ? '#000' : '#AAAAAA'
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
      <line x1="3" y1="6" x2="21" y2="6"/>
      <path d="M16 10a4 4 0 01-8 0"/>
    </svg>
  )
}

function IronIcon({ active }) {
  const c = active ? '#000' : '#AAAAAA'
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 17h18l-2-5H5L3 17z"/>
      <path d="M5 12V8a4 4 0 014-4h7"/>
      <line x1="9" y1="3" x2="9" y2="4"/>
      <line x1="13" y1="2" x2="13" y2="4"/>
      <line x1="17" y1="3" x2="17" y2="4"/>
    </svg>
  )
}

function AssistantIcon({ active }) {
  const c = active ? '#000' : '#AAAAAA'
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
      <path d="M12 8l.6 1.8L14.4 10l-1.8.6L12 12.4l-.6-1.8L9.6 10l1.8-.6z" strokeWidth="1.2" fill={c} stroke="none"/>
    </svg>
  )
}
