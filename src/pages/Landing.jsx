import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

/* ── Clothing items for wardrobe grid ── */
const CLOTHES_GRID = [
  { emoji: '👕', bg: '#F0F0F0' },
  { emoji: '👔', bg: '#E8F0FE' },
  { emoji: '👡', bg: '#FEE8E8' },
  { emoji: '👖', bg: '#E3F0FF' },
  { emoji: '👟', bg: '#F0F8E8' },
  { emoji: '👜', bg: '#FFF3E0' },
  { emoji: '🩷', bg: '#FFE8F5' },
  { emoji: '🧥', bg: '#F5F0FF' },
  { emoji: '🧣', bg: '#E8FFF0' },
]

const SLIDE_DESCRIPTIONS = [
  'Gérez vos vêtements',
  "Planifiez vos tenues à l'avance",
  'Connectez avec vos amis',
  'Obtenez des suggestions IA',
]

export default function Landing() {
  const navigate = useNavigate()
  const [active, setActive] = useState(0)
  const touchStartX = useRef(null)
  const touchEndX   = useRef(null)

  /* Auto-advance */
  useEffect(() => {
    const id = setInterval(() => setActive(i => (i + 1) % 4), 3500)
    return () => clearInterval(id)
  }, [])

  /* Swipe handlers */
  const onTouchStart = e => { touchStartX.current = e.targetTouches[0].clientX }
  const onTouchMove  = e => { touchEndX.current   = e.targetTouches[0].clientX }
  const onTouchEnd   = () => {
    if (!touchStartX.current || !touchEndX.current) return
    const diff = touchStartX.current - touchEndX.current
    if (Math.abs(diff) > 40) setActive(i => diff > 0 ? (i + 1) % 4 : (i + 3) % 4)
    touchStartX.current = null
    touchEndX.current   = null
  }

  return (
    <div style={{
      minHeight: '100dvh', background: '#FFFFFF',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      padding: '0 24px',
      userSelect: 'none',
    }}>

      {/* ── Logo ── */}
      <div style={{ paddingTop: 52, marginBottom: 20, textAlign: 'center' }}>
        <span style={{
          fontSize: 42, fontWeight: 900, letterSpacing: '-0.04em',
          color: '#000000', fontFamily: 'Inter, sans-serif',
        }}>
          Clozy
        </span>
      </div>

      {/* ── Phone mockup ── */}
      <div
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{ position: 'relative', marginBottom: 20 }}
      >
        <MockupFrame>
          {active === 0 && <SlideWardrobe />}
          {active === 1 && <SlidePlanner />}
          {active === 2 && <SlideSocial />}
          {active === 3 && <SlideAI />}
        </MockupFrame>
      </div>

      {/* ── Description ── */}
      <div style={{
        fontSize: 22, fontWeight: 800, color: '#000000',
        textAlign: 'center', letterSpacing: '-0.02em', lineHeight: 1.25,
        marginBottom: 14, minHeight: 56,
        transition: 'opacity 0.25s',
      }}>
        {SLIDE_DESCRIPTIONS[active]}
      </div>

      {/* ── Dots ── */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {[0,1,2,3].map(i => (
          <button
            key={i}
            onClick={() => setActive(i)}
            style={{
              width: 8, height: 8, borderRadius: '50%', padding: 0, border: 'none',
              background: i === active ? '#000000' : '#D1D1D1',
              cursor: 'pointer', transition: 'background 0.25s',
            }}
          />
        ))}
      </div>

      {/* ── Fixed bottom ── */}
      <div style={{
        position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
        width: '100%', maxWidth: 430,
        background: 'rgba(255,255,255,0.97)',
        backdropFilter: 'blur(12px)',
        padding: '16px 24px 44px',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14,
      }}>
        <button
          onClick={() => navigate('/auth')}
          style={{
            width: '100%', height: 56, borderRadius: 999,
            background: '#000000', border: 'none',
            color: '#FFFFFF', fontSize: 17, fontWeight: 700,
            cursor: 'pointer', letterSpacing: '-0.01em',
            transition: 'transform 0.1s, opacity 0.15s',
          }}
          onTouchStart={e => e.currentTarget.style.opacity = '0.85'}
          onTouchEnd={e => e.currentTarget.style.opacity = '1'}
        >
          Rejoindre gratuitement
        </button>
        <button
          onClick={() => navigate('/auth?mode=login')}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: 15, fontWeight: 500, color: '#888888',
          }}
        >
          Se connecter
        </button>
      </div>

    </div>
  )
}

/* ── Mockup frame ── */
function MockupFrame({ children }) {
  return (
    <div style={{
      width: 210, height: 420,
      borderRadius: 32,
      border: '1.5px solid #E5E5E5',
      boxShadow: '0 12px 48px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)',
      overflow: 'hidden', background: '#FFFFFF',
      display: 'flex', flexDirection: 'column',
      position: 'relative',
    }}>
      {/* Status bar */}
      <div style={{
        height: 20, flexShrink: 0, background: '#FFFFFF',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 14px', fontSize: 9, fontWeight: 700, color: '#000',
      }}>
        <span>9:41</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <div style={{ display: 'flex', gap: 1.5 }}>
            {[1,2,3].map(b => <div key={b} style={{ width: 3, height: 3+b, background: '#000', borderRadius: 1 }}/>)}
          </div>
          <div style={{ width: 14, height: 6, border: '1px solid #000', borderRadius: 1.5, padding: '1px', display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '70%', height: '100%', background: '#000', borderRadius: 0.5 }}/>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
        {children}
      </div>

      {/* Mini nav bar */}
      <div style={{
        height: 38, flexShrink: 0, background: '#FFFFFF',
        borderTop: '0.5px solid #F0F0F0',
        display: 'flex', alignItems: 'center', justifyContent: 'space-around',
        padding: '0 20px',
      }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#000" stroke="none"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>
        <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
        </div>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
      </div>
    </div>
  )
}

/* ── Slide 1: Wardrobe Grid ── */
function SlideWardrobe() {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#FFF' }}>
      {/* App header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px 4px' }}>
        <div style={{ width: 16 }} />
        <span style={{ fontSize: 11, fontWeight: 700, color: '#000' }}>Vous</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round">
          <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
        </svg>
      </div>
      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '0.5px solid #F0F0F0', padding: '0 8px' }}>
        {['Vêtements', 'Tenues', 'Collections'].map((t, i) => (
          <div key={t} style={{
            flex: 1, textAlign: 'center', fontSize: 8, fontWeight: i === 0 ? 700 : 500,
            color: i === 0 ? '#000' : '#AAA', paddingBottom: 5,
            borderBottom: i === 0 ? '1.5px solid #000' : '1.5px solid transparent',
            cursor: 'default',
          }}>{t}</div>
        ))}
      </div>
      {/* Grid */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, padding: 4 }}>
        {CLOTHES_GRID.map((item, i) => (
          <div key={i} style={{
            background: item.bg, borderRadius: 6,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18, aspectRatio: '1',
          }}>
            {item.emoji}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Slide 2: Planner ── */
function SlidePlanner() {
  const days = ['L','M','M','J','V','S','D']
  const nums = [3,4,5,6,7,8,9]
  const today = 2 // index of "today" (Wednesday = index 2)

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#FFF', padding: '6px 10px 0' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ fontSize: 11, fontWeight: 800, color: '#000' }}>Planner</span>
        <div style={{ background: '#000', borderRadius: 99, padding: '2px 8px' }}>
          <span style={{ fontSize: 7, fontWeight: 700, color: '#FFF' }}>Aujourd'hui</span>
        </div>
      </div>
      {/* Day/Month tabs */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 6 }}>
        {['Jour', 'Mois'].map((t, i) => (
          <span key={t} style={{
            fontSize: 8, fontWeight: 700, color: i === 0 ? '#000' : '#AAA',
            borderBottom: i === 0 ? '1.5px solid #000' : 'none',
            paddingBottom: 2,
          }}>{t}</span>
        ))}
      </div>
      {/* Week strip */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        {days.map((d, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <span style={{ fontSize: 7, color: '#AAA', fontWeight: 500 }}>{d}</span>
            <div style={{
              width: 16, height: 16, borderRadius: '50%',
              background: i === today ? '#000' : 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontSize: 7, fontWeight: 700, color: i === today ? '#FFF' : '#000' }}>{nums[i]}</span>
            </div>
          </div>
        ))}
      </div>
      {/* Date label */}
      <div style={{ fontSize: 8, fontWeight: 700, color: '#000', marginBottom: 6 }}>Mercredi, 6 Août</div>
      {/* Outfit photo */}
      <div style={{
        flex: 1, borderRadius: 8, overflow: 'hidden', position: 'relative', marginBottom: 6,
        background: 'linear-gradient(135deg, #1A1A2E, #16213E, #0F3460)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <span style={{ fontSize: 28 }}>👗</span>
        {/* Stats float card */}
        <div style={{
          position: 'absolute', bottom: 6, left: 6, right: 6,
          background: 'rgba(255,255,255,0.92)', borderRadius: 6, padding: '5px 8px',
          display: 'flex', gap: 8, alignItems: 'center',
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 8, fontWeight: 800, color: '#4CAF50' }}>3</div>
            <div style={{ fontSize: 6, color: '#888' }}>Tenues</div>
          </div>
          <div style={{ width: 0.5, height: 20, background: '#EEE' }}/>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 8, fontWeight: 800, color: '#C9A84C' }}>12</div>
            <div style={{ fontSize: 6, color: '#888' }}>Articles</div>
          </div>
          <div style={{ width: 0.5, height: 20, background: '#EEE' }}/>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 8, fontWeight: 800, color: '#3B82F6' }}>785€</div>
            <div style={{ fontSize: 6, color: '#888' }}>Valeur</div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Slide 3: Social ── */
function SlideSocial() {
  const items = ['👚','🎀','📷','👖','👖','👟','👟','❤️','👗']
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#FFF', padding: '6px 10px 0' }}>
      {/* Profile */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
        <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg, #F59E0B, #EF4444)', flexShrink: 0 }} />
        <div>
          <div style={{ fontSize: 9, fontWeight: 800, color: '#000' }}>Melissa 🌸</div>
          <div style={{ fontSize: 7, color: '#888' }}>113 Abonnés · 76 Abonnements</div>
        </div>
      </div>
      {/* Handle + follow */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ fontSize: 7.5, color: '#888' }}>@melissa_e</span>
        <div style={{ background: '#000', borderRadius: 99, padding: '3px 10px' }}>
          <span style={{ fontSize: 7, fontWeight: 700, color: '#FFF' }}>Suivre</span>
        </div>
      </div>
      {/* Tabs */}
      <div style={{ display: 'flex', gap: 10, borderBottom: '0.5px solid #F0F0F0', marginBottom: 4 }}>
        {['Vêtements', 'Tenues'].map((t, i) => (
          <span key={t} style={{
            fontSize: 7.5, fontWeight: 700, color: i === 0 ? '#000' : '#AAA',
            borderBottom: i === 0 ? '1.5px solid #000' : 'none',
            paddingBottom: 3,
          }}>{t}</span>
        ))}
      </div>
      {/* Grid */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
        {items.map((emoji, i) => (
          <div key={i} style={{
            background: '#F8F8F8', borderRadius: 4,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16, aspectRatio: '1',
          }}>
            {emoji}
          </div>
        ))}
      </div>
      {/* Toast notification */}
      <div style={{
        position: 'absolute', bottom: 42, left: 8, right: 8,
        background: 'rgba(255,255,255,0.95)', borderRadius: 8, padding: '5px 8px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
        display: 'flex', alignItems: 'center', gap: 6,
      }}>
        <div style={{ width: 16, height: 16, borderRadius: '50%', background: 'linear-gradient(135deg, #A78BFA, #7C3AED)', flexShrink: 0 }} />
        <span style={{ fontSize: 6.5, color: '#333', lineHeight: 1.3 }}>Alice a commencé à vous suivre</span>
      </div>
    </div>
  )
}

/* ── Slide 4: AI Stylist ── */
function SlideAI() {
  return (
    <div style={{ height: '100%', padding: '8px 8px 0', display: 'flex', flexDirection: 'column', gap: 6, background: '#FFF' }}>
      <div style={{ fontSize: 9, fontWeight: 800, color: '#000', marginBottom: 2, textAlign: 'center' }}>Styliste IA</div>
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
        {[
          { bg: 'linear-gradient(160deg,#0F172A,#1E293B)', label: 'Créer un outfit', emoji: '✨' },
          { bg: 'linear-gradient(160deg,#3B0764,#7C3AED)', label: 'Évaluer mon outfit', emoji: '⭐' },
        ].map((card, i) => (
          <div key={i} style={{
            background: card.bg,
            borderRadius: 12, overflow: 'hidden',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            position: 'relative', padding: 8,
          }}>
            <div style={{ fontSize: 24, marginBottom: 6 }}>{card.emoji}</div>
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              background: 'rgba(0,0,0,0.55)', padding: '6px 6px',
            }}>
              <div style={{ fontSize: 7, fontWeight: 700, color: '#FFF', lineHeight: 1.3 }}>{card.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
