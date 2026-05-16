import { useState } from 'react'
import Header from '../components/Header'
import useWardrobeStore, { OCCASIONS } from '../store/useWardrobeStore'
import { CategoryEmoji } from '../components/ClothingCard'

const TIPS = [
  { icon: '🌟', title: 'Mix Traditionnel-Moderne', body: 'Associez un jean slim avec une veste brodée marocaine pour un look fusion tendance.' },
  { icon: '🎨', title: 'La Règle des 3 Couleurs', body: 'Limitez-vous à 3 couleurs maximum par tenue pour un résultat harmonieux et élégant.' },
  { icon: '👗', title: 'Le Kaftan au Quotidien', body: 'Un kaftan léger en coton peut se porter au bureau avec des accessoires minimalistes.' },
  { icon: '👟', title: 'Babouches & Sneakers', body: 'Les babouches s\'accordent parfaitement avec des tenues casual modernes.' },
  { icon: '🌿', title: 'Couleurs de la Médina', body: 'Le vert, le bleu cobalt et le terracotta sont des teintes qui vous mettront en valeur.' },
  { icon: '✨', title: 'Fête Marocaine', body: 'Pour une fête, privilégiez les broderies dorées et les tissus satiné ou velours.' },
]

const IA_FEATURES = [
  { id: 'chat',      label: 'Chat style',    Icon: ChatIcon },
  { id: 'tenue',     label: 'Tenue du jour', Icon: HangerIcon },
  { id: 'market',    label: 'Marketplace',   Icon: BagIcon },
  { id: 'antiachat', label: 'Anti-achat',    Icon: ShieldIcon },
  { id: 'selfie',    label: 'Selfie miroir', Icon: CameraIcon },
  { id: 'style',     label: 'Mon style',     Icon: SparklesIcon },
]

export default function Stylist() {
  const { items } = useWardrobeStore()
  const [occasion, setOccasion] = useState('')
  const [suggestions, setSuggestions] = useState(null)
  const [loading, setLoading] = useState(false)
  const [activeTip, setActiveTip] = useState(0)

  const generateSuggestions = () => {
    if (!occasion) return
    setLoading(true)
    setSuggestions(null)
    setTimeout(() => {
      const filtered = items.filter(item => item.occasion.includes(occasion))
      const shuffled = [...filtered].sort(() => Math.random() - 0.5)
      const outfits = []
      const tops    = shuffled.filter(i => ['Hauts', 'Traditionnel', 'Robes'].includes(i.category))
      const bottoms = shuffled.filter(i => i.category === 'Bas')
      const shoes   = shuffled.filter(i => i.category === 'Chaussures')
      if (tops.length > 0) {
        outfits.push({
          name: `Tenue ${occasion} 1`,
          items: [tops[0], bottoms[0], shoes[0]].filter(Boolean),
          tip: 'Association harmonieuse basée sur vos couleurs dominantes.',
        })
      }
      if (tops.length > 1) {
        outfits.push({
          name: `Tenue ${occasion} 2`,
          items: [tops[1], bottoms[1] || bottoms[0], shoes[1] || shoes[0]].filter(Boolean),
          tip: 'Style adapté à votre profil et au contexte sélectionné.',
        })
      }
      setSuggestions(outfits.length > 0 ? outfits : null)
      setLoading(false)
    }, 1600)
  }

  return (
    <div className="page" style={{ background: 'var(--bg)' }}>
      <Header title="Styliste IA" subtitle="Suggestions personnalisées" />

      <div style={{ padding: '12px 20px 0' }}>

        {/* Hero card */}
        <div style={{
          background: 'linear-gradient(135deg, #1A1A1A, #2D2D2D)',
          borderRadius: 16, padding: '20px',
          marginBottom: 24, position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, background: 'radial-gradient(circle, rgba(201,168,76,0.25), transparent 70%)', borderRadius: '50%' }} />
          <div style={{ fontSize: 28, marginBottom: 8 }}>✨</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: 'white', marginBottom: 4 }}>Votre Styliste Personnel</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.60)', lineHeight: 1.6 }}>
            Sélectionnez une occasion pour recevoir des suggestions adaptées à votre garde-robe.
          </div>
        </div>

        {/* IA Features Grid */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12 }}>
            Fonctionnalités IA
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
            {IA_FEATURES.map(({ id, label, Icon }) => (
              <div key={id} style={{
                background: 'var(--surface)', border: '1px solid var(--border)',
                borderRadius: 14, padding: '16px 8px',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
              }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 12,
                  background: 'var(--gold-bg)', border: '1px solid rgba(201,168,76,0.20)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon />
                </div>
                <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text)', textAlign: 'center', lineHeight: 1.3 }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Occasion picker */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>
            Occasion
          </div>
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4, scrollbarWidth: 'none' }}>
            {OCCASIONS.map(occ => (
              <button
                key={occ}
                className={`tag ${occasion === occ ? 'active' : ''}`}
                onClick={() => setOccasion(occasion === occ ? '' : occ)}
              >
                {occ}
              </button>
            ))}
          </div>
        </div>

        {/* Generate button */}
        <button
          className="btn-gold"
          style={{ width: '100%', marginBottom: 24, opacity: occasion ? 1 : 0.4 }}
          disabled={!occasion}
          onClick={generateSuggestions}
        >
          {loading ? 'Analyse en cours...' : '✨ Générer des suggestions'}
        </button>

        {/* Loading */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '28px 0' }}>
            <div style={{ fontSize: 36, marginBottom: 10, display: 'inline-block', animation: 'spin 1s linear infinite' }}>⚙️</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 5 }}>Analyse de votre garde-robe...</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Création de combinaisons harmonieuses</div>
          </div>
        )}

        {/* Suggestions */}
        {suggestions && !loading && (
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 14 }}>
              Vos Suggestions
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {suggestions.map((outfit, i) => (
                <div key={i} style={{
                  background: 'var(--bg)', border: '1px solid var(--border)',
                  borderRadius: 14, padding: 16, boxShadow: 'var(--shadow-sm)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                    <div style={{
                      width: 26, height: 26, borderRadius: '50%',
                      background: 'var(--gold)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: 'white' }}>{i + 1}</span>
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 700 }}>{outfit.name}</div>
                  </div>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
                    {outfit.items.map(item => (
                      <div key={item.id} style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                        background: item.color ? `${item.color}18` : 'var(--surface)',
                        borderRadius: 10, padding: '8px 10px',
                        border: '1px solid var(--border)',
                      }}>
                        <CategoryEmoji category={item.category} size={26} />
                        <div style={{ fontSize: 10, color: 'var(--text-muted)', maxWidth: 60, textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {item.name}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', borderTop: '1px solid var(--border)', paddingTop: 10, fontStyle: 'italic' }}>
                    💡 {outfit.tip}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {suggestions === null && !loading && occasion && (
          <div style={{ textAlign: 'center', padding: '20px 0', color: 'var(--text-muted)', fontSize: 13 }}>
            Ajoutez plus d'articles pour des suggestions variées.
          </div>
        )}

        {/* Tips carousel */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12 }}>
            Conseils Style
          </div>
          <div style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 14, padding: '18px 16px',
            borderLeft: '3px solid var(--gold)',
          }}>
            <div style={{ fontSize: 26, marginBottom: 8 }}>{TIPS[activeTip].icon}</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>{TIPS[activeTip].title}</div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.7 }}>{TIPS[activeTip].body}</div>
          </div>
          <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginTop: 12 }}>
            {TIPS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTip(i)}
                style={{
                  width: i === activeTip ? 20 : 7, height: 7, borderRadius: 4,
                  background: i === activeTip ? 'var(--gold)' : 'var(--border)',
                  border: 'none', cursor: 'pointer', transition: 'all 0.2s',
                  padding: 0,
                }}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

/* ── IA Feature Icons ── */
function ChatIcon() {
  return <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
  </svg>
}

function HangerIcon() {
  return <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.57a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.57a2 2 0 00-1.34-2.23z"/>
  </svg>
}

function BagIcon() {
  return <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <path d="M16 10a4 4 0 01-8 0"/>
  </svg>
}

function ShieldIcon() {
  return <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <line x1="9" y1="9" x2="15" y2="15"/>
    <line x1="15" y1="9" x2="9" y2="15"/>
  </svg>
}

function CameraIcon() {
  return <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/>
    <circle cx="12" cy="13" r="4"/>
  </svg>
}

function SparklesIcon() {
  return <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z"/>
  </svg>
}
