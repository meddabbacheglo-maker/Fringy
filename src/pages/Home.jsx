import { useNavigate } from 'react-router-dom'
import useWardrobeStore from '../store/useWardrobeStore'
import ClothingCard from '../components/ClothingCard'

const DAYS_FR = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']
const MONTHS_FR = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre']

function formatDate() {
  const d = new Date()
  return `${DAYS_FR[d.getDay()]} ${d.getDate()} ${MONTHS_FR[d.getMonth()]}`
}

function getWeatherIcon(month) {
  if ([11, 0, 1].includes(month)) return '🌧'
  if ([2, 3, 4].includes(month)) return '🌤'
  if ([5, 6, 7].includes(month)) return '☀️'
  return '⛅'
}

export default function Home() {
  const navigate = useNavigate()
  const { items, outfits, getStats, user, userProfile } = useWardrobeStore()

  const fullName = userProfile?.full_name || user?.user_metadata?.full_name || ''
  const firstName = fullName.split(' ')[0]

  const stats = getStats()
  const recent = [...items].slice(0, 6)
  const todayOutfit = outfits[0] ?? null

  const now = new Date()
  const weatherIcon = getWeatherIcon(now.getMonth())

  return (
    <div className="page-no-header" style={{ background: 'var(--bg)' }}>

      {/* ── Inline Header ── */}
      <div style={{ padding: '56px 20px 16px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.03em', lineHeight: 1.2 }}>
            {firstName ? `Bonjour, ${firstName} 👋` : 'Bonjour 👋'}
          </div>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 3 }}>
            {formatDate()}
          </div>
        </div>
        <div
          onClick={() => navigate('/profile')}
          style={{
            width: 40, height: 40, borderRadius: '50%', flexShrink: 0,
            background: 'linear-gradient(135deg, #C9A84C, #A8843A)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16, fontWeight: 700, color: 'white', cursor: 'pointer',
          }}
        >
          {firstName ? firstName[0].toUpperCase() : '?'}
        </div>
      </div>

      {/* ── Weather Strip ── */}
      <div style={{ padding: '0 20px 20px' }}>
        <div style={{
          background: 'var(--surface)', borderRadius: 12,
          border: '1px solid var(--border)',
          padding: '12px 16px',
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <span style={{ fontSize: 24 }}>{weatherIcon}</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>
              Casablanca · 22°C
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 1 }}>
              Bonne journée pour un look casual
            </div>
          </div>
          <div style={{
            fontSize: 11, fontWeight: 600, color: 'var(--gold)',
            background: 'var(--gold-bg)', borderRadius: 6, padding: '3px 8px',
          }}>
            Aujourd'hui
          </div>
        </div>
      </div>

      {/* ── Stats ── */}
      <div style={{ padding: '0 20px 20px' }}>
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

      {/* ── Tenue du jour ── */}
      <div style={{ padding: '0 20px 20px' }}>
        <SectionHeader title="Tenue du jour" action="Tenues" onAction={() => navigate('/outfits')} />
        {todayOutfit ? (
          <TodayOutfitCard outfit={todayOutfit} />
        ) : (
          <EmptyOutfitCard onGenerate={() => navigate('/stylist')} />
        )}
      </div>

      {/* ── Ajouts récents ── */}
      {recent.length > 0 && (
        <div style={{ marginBottom: 20 }}>
          <div style={{ padding: '0 20px', marginBottom: 12 }}>
            <SectionHeader title="Ajouts récents" action="Tout voir" onAction={() => navigate('/wardrobe')} />
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
        <div style={{ padding: '0 20px 20px', textAlign: 'center' }}>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: '32px 20px' }}>
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

      {/* ── Générer un outfit ── */}
      <div style={{ padding: '0 20px 8px' }}>
        <button
          className="btn-gold"
          style={{ width: '100%', fontSize: 15 }}
          onClick={() => navigate('/stylist')}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
            <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z"/>
          </svg>
          Générer un outfit
        </button>
      </div>

    </div>
  )
}

function SectionHeader({ title, action, onAction }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
      <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.02em' }}>{title}</div>
      {action && (
        <button onClick={onAction} style={{ fontSize: 13, color: 'var(--gold)', fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer' }}>
          {action}
        </button>
      )}
    </div>
  )
}

function TodayOutfitCard({ outfit }) {
  const { getItemById } = useWardrobeStore()
  const navigate = useNavigate()
  const items = outfit.items.map(id => getItemById(id)).filter(Boolean)

  return (
    <div
      onClick={() => navigate('/outfits')}
      style={{
        background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16,
        padding: '16px', cursor: 'pointer',
        display: 'flex', alignItems: 'center', gap: 14,
      }}
    >
      <div style={{ display: 'flex', gap: 6 }}>
        {items.slice(0, 3).map(item => (
          <div key={item.id} style={{
            width: 52, height: 52, borderRadius: 10,
            background: item.color ? `${item.color}20` : 'white',
            border: '1px solid var(--border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 24,
          }}>
            {getItemEmoji(item.category)}
          </div>
        ))}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {outfit.name}
        </div>
        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
          {items.length} pièce{items.length !== 1 ? 's' : ''} · {outfit.occasion}
        </div>
      </div>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round">
        <path d="M9 18l6-6-6-6"/>
      </svg>
    </div>
  )
}

function EmptyOutfitCard({ onGenerate }) {
  return (
    <div
      onClick={onGenerate}
      style={{
        background: 'linear-gradient(135deg, rgba(201,168,76,0.08), rgba(201,168,76,0.04))',
        border: '1.5px dashed rgba(201,168,76,0.40)',
        borderRadius: 16, padding: '20px',
        textAlign: 'center', cursor: 'pointer',
      }}
    >
      <div style={{ fontSize: 32, marginBottom: 8 }}>✨</div>
      <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>
        Pas de tenue planifiée
      </div>
      <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
        Appuyez pour générer une suggestion
      </div>
    </div>
  )
}

function getItemEmoji(cat) {
  const m = { 'Hauts': '👕', 'Bas': '👖', 'Robes': '👗', 'Traditionnel': '🥻', 'Chaussures': '👟', 'Accessoires': '👜', 'Manteaux': '🧥' }
  return m[cat] || '👚'
}
