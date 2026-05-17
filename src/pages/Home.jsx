import { useNavigate } from 'react-router-dom'
import useWardrobeStore from '../store/useWardrobeStore'
import ClothingCard from '../components/ClothingCard'

const IA_PHOTO_1 = 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&q=80'
const IA_PHOTO_2 = 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&q=80'

const STORIES = [
  { name: 'Communauté', type: 'community' },
  { name: 'Votre OOTD', type: 'ootd' },
  { name: 'Leila',      type: 'user', initials: 'L', ring: '#7C3AED' },
  { name: 'Yasmine',    type: 'user', initials: 'Y', ring: '#EC4899' },
  { name: 'Sofia',      type: 'user', initials: 'S', ring: '#3B82F6' },
]

export default function Home() {
  const navigate = useNavigate()
  const { items, outfits, getStats, user, userProfile } = useWardrobeStore()

  const fullName     = userProfile?.full_name || user?.user_metadata?.full_name || ''
  const firstName    = fullName.split(' ')[0]
  const avatarLetter = (firstName || user?.email?.[0] || 'C')[0].toUpperCase()

  const stats  = getStats()
  const recent = [...items].slice(0, 6)

  return (
    <div className="page-no-header" style={{ background: 'var(--bg)' }}>

      {/* ── Top Bar ── */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '52px 20px 12px',
      }}>
        {/* Fringy logo: copper wave + FRINGY text */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 1 }}>
          <svg width="48" height="11" viewBox="0 0 48 11" fill="none">
            <path
              d="M2 8 C 8 2, 15 10, 24 6 C 33 2, 40 9, 46 5"
              stroke="#C9956C"
              strokeWidth="1.4"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
          <span style={{ fontSize: 15, fontWeight: 700, color: '#000', letterSpacing: '0.18em', fontFamily: 'Inter, sans-serif' }}>
            FRINGY
          </span>
        </div>

        {/* Upgrade pill */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 5,
          background: '#000', borderRadius: 99,
          padding: '6px 14px', cursor: 'pointer',
        }}>
          <span style={{ fontSize: 12 }}>⭐</span>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#FFF' }}>Upgrade</span>
        </div>

        {/* Right icons */}
        <div style={{ display: 'flex', gap: 10 }}>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 0 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/>
            </svg>
          </button>
          <button
            onClick={() => navigate('/wardrobe')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 0 }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <path d="M21 21l-4.35-4.35"/>
            </svg>
          </button>
        </div>
      </div>

      {/* ── Greeting ── */}
      <div style={{ padding: '0 20px 16px' }}>
        <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.03em', lineHeight: 1.2 }}>
          {firstName ? `Bonjour, ${firstName} 👋` : 'Bonjour 👋'}
        </div>
        <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 3 }}>
          Que portez-vous aujourd'hui ?
        </div>
      </div>

      {/* ── Stories ── */}
      <div style={{ marginBottom: 22 }}>
        <div style={{ display: 'flex', gap: 14, overflowX: 'auto', padding: '0 20px', scrollbarWidth: 'none' }}>

          {/* Communauté */}
          <StoryCircle
            label="Communauté"
            ring="#7C3AED"
            bg="linear-gradient(135deg, #7C3AED, #A855F7)"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
            </svg>
          </StoryCircle>

          {/* Votre OOTD */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, flexShrink: 0, cursor: 'pointer' }}>
            <div style={{ position: 'relative' }}>
              <div style={{
                width: 64, height: 64, borderRadius: '50%',
                background: 'linear-gradient(135deg, #16A34A, #22C55E)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <path d="M3 9h18M9 21V9"/>
                </svg>
              </div>
              <div style={{
                position: 'absolute', bottom: 0, right: 0,
                width: 20, height: 20, borderRadius: '50%',
                background: '#000', border: '2px solid #FFF',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="12" y1="5" x2="12" y2="19"/>
                  <line x1="5"  y1="12" x2="19" y2="12"/>
                </svg>
              </div>
            </div>
            <span style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-muted)' }}>Votre OOTD</span>
          </div>

          {/* User placeholder circles */}
          {[
            { name: 'Leila',   bg: 'linear-gradient(135deg, #F59E0B, #EF4444)',  ring: '#F59E0B' },
            { name: 'Yasmine', bg: 'linear-gradient(135deg, #EC4899, #8B5CF6)', ring: '#EC4899' },
            { name: 'Sofia',   bg: 'linear-gradient(135deg, #3B82F6, #06B6D4)', ring: '#3B82F6' },
          ].map(s => (
            <StoryCircle key={s.name} label={s.name} ring={s.ring} bg={s.bg}>
              <span style={{ fontSize: 20, fontWeight: 800, color: 'white' }}>
                {s.name[0]}
              </span>
            </StoryCircle>
          ))}

        </div>
      </div>

      {/* ── IA Stylist ── */}
      <div style={{ padding: '0 20px', marginBottom: 22 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <span style={{ fontSize: 20, fontWeight: 800, color: '#000', letterSpacing: '-0.02em' }}>IA Stylist</span>
          <span
            onClick={() => navigate('/stylist')}
            style={{ fontSize: 20, fontWeight: 800, color: '#000', cursor: 'pointer' }}
          >›</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <IACard
            photo={IA_PHOTO_1}
            title="Créer un outfit"
            subtitle="Suggestions IA"
            onClick={() => navigate('/stylist')}
          />
          <IACard
            photo={IA_PHOTO_2}
            title="Évaluer mon outfit"
            subtitle="Analyse de style"
            thumbsDown
            onClick={() => navigate('/stylist')}
          />
        </div>
      </div>

      {/* ── Shortcuts ── */}
      <div style={{ padding: '0 20px', marginBottom: 22 }}>
        <span style={{ fontSize: 20, fontWeight: 800, color: '#000', letterSpacing: '-0.02em', display: 'block', marginBottom: 12 }}>
          Raccourcis
        </span>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
          <ShortcutCard label="Planner"       icon={<CalendarIcon />}  onClick={() => navigate('/outfits')} />
          <ShortcutCard label="Dressing Room" icon={<HangerIcon />}    onClick={() => navigate('/wardrobe')} />
          <ShortcutCard label="IA Try On"     icon={<SparklesIcon />}  onClick={() => navigate('/stylist')} />
          <ShortcutCard label="Selfie"        icon={<CameraIcon />}    onClick={() => navigate('/profile')} />
        </div>
      </div>

      {/* ── Stats ── */}
      <div style={{ padding: '0 20px', marginBottom: 22 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          {[
            { label: 'Articles', value: stats.totalItems },
            { label: 'Tenues',   value: stats.totalOutfits },
            { label: 'Portés',   value: stats.totalWears },
          ].map(s => (
            <div key={s.label} style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 14, padding: '14px 10px', textAlign: 'center',
            }}>
              <div style={{ fontSize: 24, fontWeight: 800, color: '#000', letterSpacing: '-0.02em' }}>
                {s.value}
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 3, fontWeight: 500 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Tenues récentes ── */}
      {outfits.length > 0 && (
        <div style={{ marginBottom: 22 }}>
          <div style={{ padding: '0 20px', marginBottom: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 20, fontWeight: 800, color: '#000', letterSpacing: '-0.02em' }}>Tenues récentes</span>
            <span onClick={() => navigate('/outfits')} style={{ fontSize: 20, fontWeight: 800, color: '#000', cursor: 'pointer' }}>›</span>
          </div>
          <div style={{ display: 'flex', gap: 12, overflowX: 'auto', padding: '0 20px', paddingBottom: 4, scrollbarWidth: 'none' }}>
            {outfits.slice(0, 5).map(outfit => (
              <OutfitPill key={outfit.id} outfit={outfit} onClick={() => navigate('/outfits')} />
            ))}
          </div>
        </div>
      )}

      {/* ── Ajouts récents ── */}
      {recent.length > 0 && (
        <div style={{ marginBottom: 22 }}>
          <div style={{ padding: '0 20px', marginBottom: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 20, fontWeight: 800, color: '#000', letterSpacing: '-0.02em' }}>Ajouts récents</span>
            <button onClick={() => navigate('/wardrobe')} style={{ fontSize: 13, color: '#000', fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer' }}>
              Tout voir
            </button>
          </div>
          <div style={{ display: 'flex', gap: 12, overflowX: 'auto', padding: '0 20px', paddingBottom: 4, scrollbarWidth: 'none' }}>
            {recent.map(item => (
              <div key={item.id} style={{ width: 130, flexShrink: 0 }}>
                <ClothingCard item={item} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Empty state ── */}
      {items.length === 0 && (
        <div style={{ padding: '0 20px 20px' }}>
          <div style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 16, padding: '32px 20px', textAlign: 'center',
          }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>👗</div>
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>Garde-robe vide</div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 20 }}>
              Commencez par ajouter vos premiers articles
            </div>
            <button className="btn-gold" style={{ width: '100%' }} onClick={() => navigate('/wardrobe/add')}>
              Ajouter un article
            </button>
          </div>
        </div>
      )}

    </div>
  )
}

/* ── Sub-components ── */

function StoryCircle({ label, ring, bg, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, flexShrink: 0, cursor: 'pointer' }}>
      <div style={{
        width: 64, height: 64, borderRadius: '50%',
        background: bg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: `0 0 0 2.5px #FFF, 0 0 0 4.5px ${ring}`,
      }}>
        {children}
      </div>
      <span style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
        {label}
      </span>
    </div>
  )
}

function IACard({ photo, title, subtitle, thumbsDown, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        height: 180, borderRadius: 16, overflow: 'hidden',
        position: 'relative', cursor: 'pointer',
        backgroundImage: `url(${photo})`,
        backgroundSize: 'cover', backgroundPosition: 'center',
      }}
    >
      {/* Gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0) 30%, rgba(0,0,0,0.78) 100%)',
      }} />
      {/* Top icon */}
      {thumbsDown && (
        <div style={{ position: 'absolute', top: 10, right: 10 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 15v4a3 3 0 003 3l4-9V2H5.72a2 2 0 00-2 1.7l-1.38 9a2 2 0 002 2.3H10z"/>
            <path d="M17 2h2.67A2.31 2.31 0 0122 4v7a2.31 2.31 0 01-2.33 2H17"/>
          </svg>
        </div>
      )}
      {/* Text */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '10px 12px' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#FFF', lineHeight: 1.3 }}>{title}</div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.65)', marginTop: 2 }}>{subtitle}</div>
      </div>
    </div>
  )
}

function ShortcutCard({ label, icon, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7,
        background: '#FFF', border: '1px solid var(--border)',
        borderRadius: 16, padding: '14px 6px', cursor: 'pointer',
      }}
    >
      <div style={{
        width: 44, height: 44, borderRadius: 12,
        background: 'var(--surface)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {icon}
      </div>
      <span style={{ fontSize: 10, fontWeight: 600, color: '#333', textAlign: 'center', lineHeight: 1.3 }}>
        {label}
      </span>
    </button>
  )
}

function OutfitPill({ outfit, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        flexShrink: 0, width: 140,
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: 14, padding: '12px', cursor: 'pointer',
      }}
    >
      <div style={{ fontSize: 24, marginBottom: 6 }}>✨</div>
      <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {outfit.name}
      </div>
      <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>
        {outfit.occasion || 'Casual'}
      </div>
    </div>
  )
}

/* ── Shortcut icons (28px, black) ── */
function CalendarIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8"  y1="2" x2="8"  y2="6"/>
      <line x1="3"  y1="10" x2="21" y2="10"/>
    </svg>
  )
}

function HangerIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.57a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.57a2 2 0 00-1.34-2.23z"/>
    </svg>
  )
}

function SparklesIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z"/>
    </svg>
  )
}

function CameraIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/>
      <circle cx="12" cy="13" r="4"/>
    </svg>
  )
}
