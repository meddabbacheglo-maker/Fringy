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
  { icon: '✨', title: 'Occasion : Fête Marocaine', body: 'Pour une fête, privilégiez les broderies dorées et les tissus satiné ou velours.' },
]

const STYLE_PROFILES = [
  { id: 'modern', label: 'Moderne', icon: '🏙️' },
  { id: 'traditional', label: 'Traditionnel', icon: '🕌' },
  { id: 'fusion', label: 'Fusion', icon: '✨' },
  { id: 'casual', label: 'Casual', icon: '😎' },
]

export default function Stylist() {
  const { items } = useWardrobeStore()
  const [occasion, setOccasion] = useState('')
  const [profile, setProfile] = useState('')
  const [suggestions, setSuggestions] = useState(null)
  const [loading, setLoading] = useState(false)
  const [activeTip, setActiveTip] = useState(0)

  const generateSuggestions = () => {
    if (!occasion && !profile) return
    setLoading(true)
    setSuggestions(null)
    setTimeout(() => {
      const filtered = items.filter(item => !occasion || item.occasion.includes(occasion))
      const shuffled = [...filtered].sort(() => Math.random() - 0.5)
      const outfits = []
      const tops = shuffled.filter(i => ['Hauts', 'Traditionnel', 'Robes'].includes(i.category))
      const bottoms = shuffled.filter(i => ['Bas'].includes(i.category))
      const shoes = shuffled.filter(i => i.category === 'Chaussures')
      if (tops.length > 0) {
        outfits.push({
          name: `Tenue ${occasion || 'Suggérée'} 1`,
          items: [tops[0], bottoms[0], shoes[0]].filter(Boolean),
          tip: 'Association harmonieuse basée sur vos couleurs dominantes.',
        })
      }
      if (tops.length > 1) {
        outfits.push({
          name: `Tenue ${occasion || 'Suggérée'} 2`,
          items: [tops[1], bottoms[1] || bottoms[0], shoes[1] || shoes[0]].filter(Boolean),
          tip: 'Style adapté à votre profil et au contexte sélectionné.',
        })
      }
      setSuggestions(outfits.length > 0 ? outfits : null)
      setLoading(false)
    }, 1800)
  }

  return (
    <div className="page" style={{ background: 'var(--bg)' }}>
      <Header title="Styliste IA" subtitle="Suggestions personnalisées" />

      <div style={{ padding: '16px 20px 0' }}>
        {/* AI Badge */}
        <div style={{
          background: 'linear-gradient(135deg, #1A1916, #2D2A25)',
          borderRadius: 'var(--radius-card)',
          padding: '20px',
          marginBottom: 24,
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, background: 'radial-gradient(circle, rgba(201,168,76,0.3), transparent 70%)', borderRadius: '50%' }} />
          <div style={{ fontSize: 28, marginBottom: 10 }}>✨</div>
          <div style={{ fontSize: 17, fontWeight: 700, color: 'white', marginBottom: 6 }}>Votre Styliste Personnel</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 1.6 }}>
            Sélectionnez une occasion et votre profil pour recevoir des suggestions adaptées à votre garde-robe.
          </div>
        </div>

        {/* Style Profile */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 10 }}>Mon Style</div>
          <div style={{ display: 'flex', gap: 10 }}>
            {STYLE_PROFILES.map(p => (
              <button
                key={p.id}
                onClick={() => setProfile(p.id)}
                style={{
                  flex: 1, padding: '10px 8px',
                  borderRadius: 12,
                  background: profile === p.id ? 'var(--gold)' : 'var(--surface)',
                  border: profile === p.id ? '1.5px solid var(--gold)' : '1.5px solid var(--border)',
                  cursor: 'pointer', transition: 'all 0.15s',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                }}
              >
                <span style={{ fontSize: 20 }}>{p.icon}</span>
                <span style={{ fontSize: 11, fontWeight: 600, color: profile === p.id ? 'white' : 'var(--text-muted)' }}>{p.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Occasion */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 10 }}>Occasion</div>
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4, scrollbarWidth: 'none' }}>
            {OCCASIONS.map(occ => (
              <button key={occ} className={`tag ${occasion === occ ? 'active' : ''}`} onClick={() => setOccasion(occasion === occ ? '' : occ)}>{occ}</button>
            ))}
          </div>
        </div>

        {/* Generate button */}
        <button
          className="btn-gold"
          style={{ width: '100%', marginBottom: 24, opacity: (occasion || profile) ? 1 : 0.5 }}
          disabled={!occasion && !profile}
          onClick={generateSuggestions}
        >
          {loading ? 'Analyse en cours...' : '✨ Générer des suggestions'}
        </button>

        {/* Loading */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '30px 0' }}>
            <div style={{ fontSize: 40, marginBottom: 12, animation: 'spin 1s linear infinite' }}>⚙️</div>
            <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)', marginBottom: 6 }}>Analyse de votre garde-robe...</div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>Création de combinaisons harmonieuses</div>
          </div>
        )}

        {/* Suggestions */}
        {suggestions && !loading && (
          <div style={{ marginBottom: 24 }}>
            <div className="section-title" style={{ marginBottom: 14 }}>Vos Suggestions</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {suggestions.map((outfit, i) => (
                <div key={i} className="card" style={{ padding: 16, boxShadow: 'var(--shadow-md)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: 'white' }}>{i + 1}</span>
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 700 }}>{outfit.name}</div>
                  </div>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
                    {outfit.items.map(item => (
                      <div key={item.id} style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                        background: `${item.color}22`, borderRadius: 10,
                        padding: '8px 12px', border: '1px solid var(--border)',
                      }}>
                        <CategoryEmoji category={item.category} size={28} />
                        <div style={{ fontSize: 10, color: 'var(--text-muted)', maxWidth: 60, textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</div>
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

        {suggestions === null && !loading && occasion !== '' && (
          <div style={{ textAlign: 'center', padding: '24px 0', color: 'var(--text-muted)', fontSize: 14 }}>
            Ajoutez plus d'articles pour des suggestions variées.
          </div>
        )}

        {/* Tips carousel */}
        <div style={{ marginBottom: 24 }}>
          <div className="section-title" style={{ marginBottom: 14 }}>Conseils Style</div>
          <div style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 'var(--radius-card)', padding: 20,
            borderLeft: '3px solid var(--gold)',
          }}>
            <div style={{ fontSize: 28, marginBottom: 10 }}>{TIPS[activeTip].icon}</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>{TIPS[activeTip].title}</div>
            <div style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7 }}>{TIPS[activeTip].body}</div>
          </div>
          <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginTop: 12 }}>
            {TIPS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTip(i)}
                style={{
                  width: i === activeTip ? 20 : 8, height: 8, borderRadius: 4,
                  background: i === activeTip ? 'var(--gold)' : 'var(--border)',
                  border: 'none', cursor: 'pointer', transition: 'all 0.2s',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
