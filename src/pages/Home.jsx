import { useNavigate } from 'react-router-dom'
import useWardrobeStore from '../store/useWardrobeStore'
import ClothingCard from '../components/ClothingCard'

const STORIES = [
  { name: 'Vous',    color1: '#C9A84C', color2: '#A8843A', isUser: true },
  { name: 'Leila',   color1: '#F59E0B', color2: '#EF4444', emoji: '🌸' },
  { name: 'Yasmine', color1: '#8B5CF6', color2: '#EC4899', emoji: '✨' },
  { name: 'Sofia',   color1: '#06B6D4', color2: '#3B82F6', emoji: '💎' },
  { name: 'Nadia',   color1: '#10B981', color2: '#059669', emoji: '🌿' },
]

const SHORTCUTS = [
  { label: 'Ajouter',     emoji: '➕', path: '/wardrobe/add', bg: '#F0F0F0' },
  { label: 'Garde-robe',  emoji: '👗', path: '/wardrobe',     bg: '#E8F0FE' },
  { label: 'Tenues',      emoji: '✨', path: '/outfits',      bg: '#FFF3E0' },
  { label: 'Styliste',    emoji: '🤖', path: '/stylist',      bg: '#F3E8FF' },
]

export default function Home() {
  const navigate = useNavigate()
  const { items, outfits, getStats, user, userProfile } = useWardrobeStore()

  const fullName  = userProfile?.full_name || user?.user_metadata?.full_name || ''
  const firstName = fullName.split(' ')[0]
  const avatarLetter = (firstName || 'C')[0].toUpperCase()

  const stats  = getStats()
  const recent = [...items].slice(0, 6)

  return (
    <div className="page-no-header" style={{ background: 'var(--bg)' }}>

      {/* ── Top Bar ── */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '56px 20px 14px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 9,
            background: 'linear-gradient(135deg, #C9A84C, #A8843A)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.57a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.57a2 2 0 00-1.34-2.23z"/>
            </svg>
          </div>
          <span style={{ fontSize: 20, fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.03em' }}>Clozy</span>
        </div>

        <div style={{
          display: 'flex', alignItems: 'center', gap: 5,
          background: 'var(--gold-bg)', border: '1px solid rgba(201,168,76,0.25)',
          borderRadius: 99, padding: '5px 12px', cursor: 'pointer',
        }}>
          <span style={{ fontSize: 12 }}>⭐</span>
          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--gold)' }}>Upgrade</span>
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <button style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'var(--surface)', border: '1px solid var(--border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/>
            </svg>
          </button>
          <button
            onClick={() => navigate('/wardrobe')}
            style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'var(--surface)', border: '1px solid var(--border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
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
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 14, overflowX: 'auto', padding: '0 20px', scrollbarWidth: 'none' }}>
          {STORIES.map((s, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, flexShrink: 0, cursor: 'pointer' }}>
              <div style={{
                width: 58, height: 58, borderRadius: '50%', padding: 2.5,
                background: `linear-gradient(135deg, ${s.color1}, ${s.color2})`,
              }}>
                <div style={{
                  width: '100%', height: '100%', borderRadius: '50%',
                  border: '2px solid white',
                  background: s.isUser ? `linear-gradient(135deg, ${s.color1}, ${s.color2})` : 'var(--surface)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: s.isUser ? 17 : 20,
                  fontWeight: 800, color: 'white',
                }}>
                  {s.isUser ? avatarLetter : s.emoji}
                </div>
              </div>
              <span style={{ fontSize: 10, fontWeight: 500, color: 'var(--text-muted)' }}>
                {s.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── IA Stylist ── */}
      <div style={{ padding: '0 20px', marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.02em' }}>Styliste IA</span>
          <button onClick={() => navigate('/stylist')} style={{ fontSize: 13, color: 'var(--gold)', fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer' }}>
            Voir tout
          </button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <AICard
            bg="linear-gradient(160deg, #0F172A, #1E293B)"
            title="Créer un outfit"
            subtitle="Suggestions IA"
            emoji="✨"
            onClick={() => navigate('/stylist')}
          />
          <AICard
            bg="linear-gradient(160deg, #3B0764, #7C3AED)"
            title="Tenue du jour"
            subtitle="Planifier"
            emoji="👗"
            onClick={() => navigate('/outfits')}
          />
        </div>
      </div>

      {/* ── Shortcuts ── */}
      <div style={{ padding: '0 20px', marginBottom: 20 }}>
        <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.02em', display: 'block', marginBottom: 12 }}>
          Raccourcis
        </span>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
          {SHORTCUTS.map(s => (
            <button
              key={s.path}
              onClick={() => navigate(s.path)}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                background: 'var(--surface)', border: '1px solid var(--border)',
                borderRadius: 14, padding: '14px 8px', cursor: 'pointer',
              }}
            >
              <div style={{
                width: 40, height: 40, borderRadius: 10, background: s.bg,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
              }}>
                {s.emoji}
              </div>
              <span style={{ fontSize: 10, fontWeight: 600, color: 'var(--text)', textAlign: 'center' }}>
                {s.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Stats ── */}
      <div style={{ padding: '0 20px', marginBottom: 20 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          {[
            { label: 'Articles', value: stats.totalItems },
            { label: 'Tenues',   value: stats.totalOutfits },
            { label: 'Portés',   value: stats.totalWears },
          ].map(s => (
            <div key={s.label} style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 12, padding: '14px 10px', textAlign: 'center',
            }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--gold)', letterSpacing: '-0.02em' }}>
                {s.value}
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 3, fontWeight: 500 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Recent outfits ── */}
      {outfits.length > 0 && (
        <div style={{ marginBottom: 20 }}>
          <div style={{ padding: '0 20px', marginBottom: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.02em' }}>Mes tenues</span>
            <button onClick={() => navigate('/outfits')} style={{ fontSize: 13, color: 'var(--gold)', fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer' }}>
              Tout voir
            </button>
          </div>
          <div style={{ display: 'flex', gap: 12, overflowX: 'auto', padding: '0 20px', paddingBottom: 4, scrollbarWidth: 'none' }}>
            {outfits.slice(0, 5).map(outfit => (
              <OutfitPill key={outfit.id} outfit={outfit} onClick={() => navigate('/outfits')} />
            ))}
          </div>
        </div>
      )}

      {/* ── Recent items ── */}
      {recent.length > 0 && (
        <div style={{ marginBottom: 20 }}>
          <div style={{ padding: '0 20px', marginBottom: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.02em' }}>Ajouts récents</span>
            <button onClick={() => navigate('/wardrobe')} style={{ fontSize: 13, color: 'var(--gold)', fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer' }}>
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
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: '32px 20px', textAlign: 'center' }}>
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

function AICard({ bg, title, subtitle, emoji, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        borderRadius: 16, overflow: 'hidden',
        background: bg, padding: '16px 14px',
        cursor: 'pointer', minHeight: 120,
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      }}
    >
      <div style={{ fontSize: 28 }}>{emoji}</div>
      <div>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#FFF', lineHeight: 1.3 }}>{title}</div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.60)', marginTop: 2 }}>{subtitle}</div>
      </div>
    </div>
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
