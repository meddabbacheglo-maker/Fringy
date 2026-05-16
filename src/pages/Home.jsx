import { useNavigate } from 'react-router-dom'
import useWardrobeStore from '../store/useWardrobeStore'
import ClothingCard from '../components/ClothingCard'
import OutfitCard from '../components/OutfitCard'

const HERO_IMG = 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80'

const QUICK_ACTIONS = [
  { label: 'Garde-robe',  sub: 'Mes articles',    path: '/wardrobe',     icon: WardrobeIcon },
  { label: 'Tenues',      sub: 'Mes looks',        path: '/outfits',      icon: OutfitIcon   },
  { label: 'Styliste IA', sub: 'Suggestions',      path: '/stylist',      icon: StarIcon     },
  { label: 'Ajouter',     sub: 'Nouvel article',   path: '/wardrobe/add', icon: PlusIcon     },
]

export default function Home() {
  const navigate  = useNavigate()
  const { items, outfits, getStats, user, userProfile } = useWardrobeStore()
  const fullName = userProfile?.full_name || user?.user_metadata?.full_name || ''
  const firstName = fullName.split(' ')[0]
  const stats     = getStats()
  const favs      = items.filter(i => i.favorite).slice(0, 4)
  const recent    = outfits.slice(0, 2)
  const topWorn   = [...items].sort((a, b) => b.wearCount - a.wearCount).slice(0, 4)

  return (
    <div style={{ background: '#FFFFFF', minHeight: '100dvh', paddingBottom: 'calc(var(--nav-height) + 16px)' }}>

      {/* ── HERO (photo, 280px) ── */}
      <div style={{ position: 'relative', height: 280, overflow: 'hidden' }}>
        <img
          src={HERO_IMG}
          alt=""
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center top',
          }}
        />
        {/* overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(10,8,5,0.60) 0%, rgba(10,8,5,0.40) 60%, rgba(10,8,5,0.85) 100%)',
        }} />

        {/* content over image */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '52px 24px 20px',
        }}>
          {/* greeting row */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <div>
              <div style={{
                fontSize: 11, fontWeight: 700, color: '#C9A84C',
                letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8,
              }}>
                CLOZY ✦
              </div>
              <div style={{ fontSize: 26, fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.03em', lineHeight: 1.2 }}>
                {firstName ? `Bonjour, ${firstName} 👋` : 'Bonjour 👋'}
              </div>
            </div>
            <button
              onClick={() => navigate('/wardrobe/add')}
              style={{
                width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                background: '#C9A84C', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 16px rgba(201,168,76,0.45)',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
            </button>
          </div>

          {/* stats at bottom of hero */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
            {[
              { label: 'Articles', value: stats.totalItems },
              { label: 'Tenues',   value: stats.totalOutfits },
              { label: 'Portés',   value: stats.totalWears },
            ].map(s => (
              <div key={s.label} style={{
                background: 'rgba(255,255,255,0.12)',
                backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.18)',
                borderRadius: 12, padding: '10px 8px', textAlign: 'center',
              }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: '#C9A84C' }}>{s.value}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.65)', marginTop: 1 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── WHITE BODY ── */}

      {/* Quick actions grid */}
      <div style={{ padding: '20px 20px 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
          {QUICK_ACTIONS.map(({ label, sub, path, icon: Icon }) => (
            <button
              key={path}
              onClick={() => navigate(path)}
              style={{
                background: '#FFFFFF',
                border: '1.5px solid #E8E4DC',
                borderRadius: 16, padding: '16px',
                textAlign: 'left', cursor: 'pointer',
                display: 'flex', flexDirection: 'column', gap: 10,
                boxShadow: '0 1px 4px rgba(26,25,22,0.05)',
                transition: 'border-color 0.15s, box-shadow 0.15s',
              }}
              onTouchStart={e => { e.currentTarget.style.borderColor = '#C9A84C'; e.currentTarget.style.boxShadow = '0 2px 10px rgba(201,168,76,0.15)' }}
              onTouchEnd={e => { e.currentTarget.style.borderColor = '#E8E4DC'; e.currentTarget.style.boxShadow = '0 1px 4px rgba(26,25,22,0.05)' }}
            >
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: 'rgba(201,168,76,0.10)',
                border: '1px solid rgba(201,168,76,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#1A1916', marginBottom: 2 }}>{label}</div>
                <div style={{ fontSize: 11, color: '#8A8780' }}>{sub}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Stylist IA banner */}
      <div style={{ padding: '20px 20px 0' }}>
        <div
          onClick={() => navigate('/stylist')}
          style={{
            background: 'linear-gradient(135deg, #C9A84C, #A8843A)',
            borderRadius: 16, padding: '16px 20px',
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 14,
            boxShadow: '0 4px 16px rgba(201,168,76,0.30)',
          }}
        >
          <div style={{ fontSize: 30 }}>✨</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#FFFFFF' }}>Stylist IA</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.80)', marginTop: 2 }}>Obtenez des suggestions personnalisées</div>
          </div>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </div>
      </div>

      {/* Favoris */}
      {favs.length > 0 && (
        <Section title="Mes Favoris" onAction={() => navigate('/wardrobe')}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
            {favs.map(item => <ClothingCard key={item.id} item={item} />)}
          </div>
        </Section>
      )}

      {/* Tenues récentes */}
      {recent.length > 0 && (
        <Section title="Tenues Récentes" onAction={() => navigate('/outfits')}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {recent.map(o => <OutfitCard key={o.id} outfit={o} />)}
          </div>
        </Section>
      )}

      {/* Plus portés */}
      <Section title="Plus Portés" onAction={() => navigate('/wardrobe')}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
          {topWorn.map(item => <ClothingCard key={item.id} item={item} />)}
        </div>
      </Section>

      {/* Style tip */}
      <div style={{ padding: '0 20px 8px' }}>
        <div style={{
          background: '#FAFAFA',
          border: '1px solid #E8E4DC',
          borderLeft: '3px solid #C9A84C',
          borderRadius: 14, padding: '14px 16px',
        }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#C9A84C', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
            ✦ Conseil Style
          </div>
          <div style={{ fontSize: 14, color: '#1A1916', lineHeight: 1.65 }}>
            Associez vos pièces modernes avec des accessoires artisanaux marocains pour un look authentique et contemporain.
          </div>
        </div>
      </div>

    </div>
  )
}

/* ── Section wrapper ── */
function Section({ title, onAction, children }) {
  return (
    <div style={{ padding: '20px 20px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <div style={{ fontSize: 17, fontWeight: 700, color: '#1A1916', letterSpacing: '-0.02em' }}>{title}</div>
        <button onClick={onAction} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, color: '#C9A84C', fontWeight: 500 }}>
          Voir tout
        </button>
      </div>
      {children}
    </div>
  )
}

/* ── Icons ── */
function WardrobeIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="18" rx="2"/><line x1="12" y1="3" x2="12" y2="21"/></svg>
}
function OutfitIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.57a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.57a2 2 0 00-1.34-2.23z"/></svg>
}
function StarIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
}
function PlusIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2.2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
}
