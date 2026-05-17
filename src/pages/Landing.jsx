import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import useWardrobeStore from '../store/useWardrobeStore'

const CLOTHES = [
  { emoji: '👕', bg: '#F5F5F5' },
  { emoji: '👔', bg: '#EBF0FE' },
  { emoji: '👡', bg: '#FEE9E9' },
  { emoji: '👖', bg: '#E3EEFF' },
  { emoji: '👟', bg: '#EDFAEB' },
  { emoji: '👜', bg: '#FFF5E0' },
  { emoji: '🩷', bg: '#FDE8F5' },
  { emoji: '🧥', bg: '#F3EFFF' },
  { emoji: '🧣', bg: '#E8FFF0' },
]

const SLIDES = [
  {
    description: 'Gérez vos vêtements',
    subtitle: 'Digitalisez votre garde-robe en quelques secondes',
  },
  {
    description: 'Planifiez vos tenues',
    subtitle: 'Organisez votre semaine et suivez vos looks',
  },
  {
    description: 'Connectez avec vos amis',
    subtitle: 'Voyez ce que portent vos proches',
  },
]

export default function Landing() {
  const navigate = useNavigate()
  const { user } = useWardrobeStore()
  const [active, setActive] = useState(0)
  const touchStartX = useRef(null)
  const touchEndX   = useRef(null)

  useEffect(() => {
    const id = setInterval(() => setActive(i => (i + 1) % 3), 3500)
    return () => clearInterval(id)
  }, [])

  const onTouchStart = e => { touchStartX.current = e.targetTouches[0].clientX }
  const onTouchMove  = e => { touchEndX.current   = e.targetTouches[0].clientX }
  const onTouchEnd   = () => {
    if (!touchStartX.current || !touchEndX.current) return
    const diff = touchStartX.current - touchEndX.current
    if (Math.abs(diff) > 40) setActive(i => diff > 0 ? (i + 1) % 3 : (i + 2) % 3)
    touchStartX.current = null
    touchEndX.current   = null
  }

  return (
    <div style={{
      height: '100dvh', background: '#FFFFFF',
      display: 'flex', flexDirection: 'column',
      overflow: 'hidden', userSelect: 'none',
    }}>

      {/* Logo */}
      <div style={{ flexShrink: 0, paddingTop: 48, paddingBottom: 12, textAlign: 'center' }}>
        <span style={{
          fontSize: 32, fontWeight: 900, letterSpacing: '-0.04em',
          color: '#000000', fontFamily: 'Inter, sans-serif',
        }}>
          Clozy
        </span>
      </div>

      {/* Mockup — flex:1 */}
      <div
        style={{ flex: 1, minHeight: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <MockupFrame>
          {active === 0 && <SlideWardrobe />}
          {active === 1 && <SlidePlanner />}
          {active === 2 && <SlideSocial />}
        </MockupFrame>
      </div>

      {/* Description */}
      <div style={{ flexShrink: 0, textAlign: 'center', padding: '14px 28px 10px' }}>
        <div style={{ fontSize: 22, fontWeight: 800, color: '#000', letterSpacing: '-0.02em', lineHeight: 1.25, marginBottom: 8 }}>
          {SLIDES[active].description}
        </div>
        <div style={{ fontSize: 15, color: '#666666', lineHeight: 1.55 }}>
          {SLIDES[active].subtitle}
        </div>
      </div>

      {/* Dots */}
      <div style={{ flexShrink: 0, display: 'flex', gap: 7, justifyContent: 'center', padding: '10px 0 0' }}>
        {[0, 1, 2].map(i => (
          <button
            key={i}
            onClick={() => setActive(i)}
            style={{
              width: i === active ? 22 : 8, height: 8, borderRadius: 4,
              padding: 0, border: 'none', cursor: 'pointer',
              background: i === active ? '#000000' : '#D1D1D1',
              transition: 'all 0.25s',
            }}
          />
        ))}
      </div>

      {/* Bottom bar */}
      <div style={{
        flexShrink: 0,
        padding: '18px 24px 44px',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14,
      }}>
        <button
          onClick={() => navigate(user ? '/home' : '/auth')}
          style={{
            width: '100%', height: 56, borderRadius: 999,
            background: '#000000', border: 'none',
            color: '#FFFFFF', fontSize: 16, fontWeight: 700,
            cursor: 'pointer', letterSpacing: '-0.01em',
            transition: 'opacity 0.15s',
          }}
          onTouchStart={e => { e.currentTarget.style.opacity = '0.82' }}
          onTouchEnd={e => { e.currentTarget.style.opacity = '1' }}
        >
          {user ? 'Continuer' : 'Rejoindre gratuitement'}
        </button>
        {!user && (
          <button
            onClick={() => navigate('/auth?mode=login')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 15, fontWeight: 500, color: '#888888' }}
          >
            Se connecter
          </button>
        )}
      </div>

    </div>
  )
}

/* ── Phone mockup shell ── */
function MockupFrame({ children }) {
  return (
    <div style={{
      /* responsive: fills vertical space up to 460px */
      height: '100%', maxHeight: 460,
      aspectRatio: '9/19',
      minWidth: 0, maxWidth: 220,
      borderRadius: 34,
      border: '1.5px solid #E0E0E0',
      boxShadow: '0 16px 56px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)',
      background: '#FFFFFF',
      display: 'flex', flexDirection: 'column',
      overflow: 'hidden', position: 'relative',
      flexShrink: 0,
    }}>
      {/* Status bar */}
      <div style={{
        height: 20, flexShrink: 0, background: '#FFF',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 14px', fontSize: 9, fontWeight: 700, color: '#000',
      }}>
        <span>9:41</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <div style={{ display: 'flex', gap: 1.5, alignItems: 'flex-end' }}>
            {[4, 6, 8, 10].map((h, i) => (
              <div key={i} style={{ width: 3, height: h, background: i < 3 ? '#000' : '#D0D0D0', borderRadius: 1 }} />
            ))}
          </div>
          <div style={{ width: 14, height: 7, border: '1.5px solid #000', borderRadius: 2, padding: '1px 1px', display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '65%', height: '100%', background: '#000', borderRadius: 1 }} />
          </div>
        </div>
      </div>

      {/* Slide content */}
      <div style={{ flex: 1, minHeight: 0, overflow: 'hidden', position: 'relative' }}>
        {children}
      </div>

      {/* App nav inside mockup */}
      <div style={{
        height: 36, flexShrink: 0, background: '#FFF',
        borderTop: '0.5px solid #F0F0F0',
        display: 'flex', alignItems: 'center', justifyContent: 'space-around',
        padding: '0 24px',
      }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#000" stroke="none">
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
        </svg>
        <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5"  y1="12" x2="19" y2="12"/>
          </svg>
        </div>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#AAAAAA" strokeWidth="2" strokeLinecap="round">
          <circle cx="12" cy="8" r="4"/>
          <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
        </svg>
      </div>
    </div>
  )
}

/* ── Slide 1: Wardrobe ── */
function SlideWardrobe() {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#FFF' }}>
      {/* App top bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '7px 10px 4px' }}>
        <div style={{ fontSize: 10, fontWeight: 800, color: '#000' }}>Clozy</div>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round">
          <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
        </svg>
      </div>
      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '0.5px solid #F0F0F0', padding: '0 6px' }}>
        {['Vêtements', 'Tenues', 'Collections'].map((t, i) => (
          <div key={t} style={{
            flex: 1, textAlign: 'center', fontSize: 7.5, fontWeight: i === 0 ? 700 : 400,
            color: i === 0 ? '#000' : '#AAAAAA',
            paddingBottom: 4,
            borderBottom: i === 0 ? '1.5px solid #000' : '1.5px solid transparent',
          }}>{t}</div>
        ))}
      </div>
      {/* Grid */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 3, padding: 5 }}>
        {CLOTHES.map((item, i) => (
          <div key={i} style={{
            background: item.bg, borderRadius: 7,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 17, aspectRatio: '1',
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
  const days = ['L', 'M', 'M', 'J', 'V', 'S', 'D']
  const nums = [3, 4, 5, 6, 7, 8, 9]
  const today = 2

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#FFF', padding: '6px 8px 0' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5 }}>
        <span style={{ fontSize: 10, fontWeight: 800, color: '#000' }}>Planner</span>
        <div style={{ background: '#000', borderRadius: 99, padding: '2px 7px' }}>
          <span style={{ fontSize: 6.5, fontWeight: 700, color: '#FFF' }}>Aujourd'hui</span>
        </div>
      </div>
      {/* Week strip */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
        {days.map((d, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <span style={{ fontSize: 6, color: '#AAAAAA', fontWeight: 500 }}>{d}</span>
            <div style={{
              width: 15, height: 15, borderRadius: '50%',
              background: i === today ? '#000' : 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontSize: 6.5, fontWeight: 700, color: i === today ? '#FFF' : '#000' }}>{nums[i]}</span>
            </div>
          </div>
        ))}
      </div>
      {/* Date label */}
      <div style={{ fontSize: 8, fontWeight: 700, color: '#000', marginBottom: 5 }}>Mercredi, 5 Mars</div>
      {/* Outfit photo card */}
      <div style={{
        flex: 1, borderRadius: 9, overflow: 'hidden', position: 'relative',
        background: 'linear-gradient(160deg, #0F172A 0%, #1E3A5F 50%, #0F3460 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 5,
      }}>
        <span style={{ fontSize: 30 }}>👗</span>
        {/* Stats float card */}
        <div style={{
          position: 'absolute', bottom: 5, left: 5, right: 5,
          background: 'rgba(255,255,255,0.94)', borderRadius: 7, padding: '5px 7px',
          display: 'flex', gap: 0, alignItems: 'center',
        }}>
          {[['3', 'Tenues', '#4CAF50'], ['12', 'Articles', '#C9A84C'], ['785€', 'Valeur', '#3B82F6']].map(([val, label, color], i, arr) => (
            <div key={label} style={{ flex: 1, textAlign: 'center', borderRight: i < arr.length - 1 ? '0.5px solid #EEE' : 'none' }}>
              <div style={{ fontSize: 8, fontWeight: 800, color }}>{val}</div>
              <div style={{ fontSize: 5.5, color: '#888', marginTop: 1 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Slide 3: Social ── */
function SlideSocial() {
  const grid = ['👚', '🎀', '📷', '👖', '👟', '👜', '❤️', '👗', '🧣']
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#FFF', padding: '6px 8px 0', position: 'relative' }}>
      {/* Profile */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 4 }}>
        <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'linear-gradient(135deg, #F59E0B, #EF4444)', flexShrink: 0 }} />
        <div>
          <div style={{ fontSize: 8.5, fontWeight: 800, color: '#000' }}>Melissa 🌸</div>
          <div style={{ fontSize: 6.5, color: '#888', marginTop: 1 }}>113 Abonnés · 76 Abonnements</div>
        </div>
      </div>
      {/* Handle + follow */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ fontSize: 7, color: '#888' }}>@melissa_e</span>
        <div style={{ background: '#000', borderRadius: 99, padding: '3px 9px' }}>
          <span style={{ fontSize: 6.5, fontWeight: 700, color: '#FFF' }}>Suivre</span>
        </div>
      </div>
      {/* Tabs */}
      <div style={{ display: 'flex', gap: 10, borderBottom: '0.5px solid #F0F0F0', marginBottom: 4 }}>
        {['Vêtements', 'Tenues'].map((t, i) => (
          <span key={t} style={{
            fontSize: 7, fontWeight: 700, color: i === 0 ? '#000' : '#AAAAAA',
            borderBottom: i === 0 ? '1.5px solid #000' : 'none',
            paddingBottom: 3,
          }}>{t}</span>
        ))}
      </div>
      {/* Grid */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
        {grid.map((emoji, i) => (
          <div key={i} style={{
            background: '#F8F8F8', borderRadius: 5,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 15, aspectRatio: '1',
          }}>
            {emoji}
          </div>
        ))}
      </div>
      {/* Toast */}
      <div style={{
        position: 'absolute', bottom: 40, left: 6, right: 6,
        background: 'rgba(255,255,255,0.96)', borderRadius: 8, padding: '5px 8px',
        boxShadow: '0 2px 14px rgba(0,0,0,0.14)',
        display: 'flex', alignItems: 'center', gap: 6,
      }}>
        <div style={{ width: 15, height: 15, borderRadius: '50%', background: 'linear-gradient(135deg, #A78BFA, #7C3AED)', flexShrink: 0 }} />
        <span style={{ fontSize: 6.5, color: '#333', lineHeight: 1.4 }}>Alice a commencé à vous suivre</span>
      </div>
    </div>
  )
}
