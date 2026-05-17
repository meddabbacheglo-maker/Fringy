import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import useWardrobeStore from '../store/useWardrobeStore'

const CLOTHES_PHOTOS = [
  'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=200&q=80',
  'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=200&q=80',
  'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=200&q=80',
  'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=200&q=80',
  'https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=200&q=80',
  'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=200&q=80',
]

const PLANNER_PHOTO = 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&q=80'

const SLIDES = [
  { description: 'Gérez votre garde-robe', subtitle: 'Digitalisez vos vêtements en quelques secondes' },
  { description: 'Planifiez vos tenues', subtitle: 'Organisez votre semaine style' },
  { description: 'Connectez avec vos amis', subtitle: 'Voyez ce que portent vos proches' },
]

export default function Landing() {
  const navigate = useNavigate()
  const { user } = useWardrobeStore()
  const [active, setActive] = useState(0)
  const touchStartX = useRef(null)
  const touchEndX = useRef(null)

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
      <div style={{ flexShrink: 0, paddingTop: 44, paddingBottom: 10, textAlign: 'center' }}>
        <span style={{
          fontSize: 36, fontWeight: 900, letterSpacing: '-0.02em',
          color: '#000000', fontFamily: 'Inter, sans-serif',
        }}>
          Fringy
        </span>
      </div>

      {/* Mockup */}
      <div
        style={{ flex: 1, minHeight: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 10px' }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <IPhoneMockup>
          {active === 0 && <SlideWardrobe />}
          {active === 1 && <SlidePlanner />}
          {active === 2 && <SlideSocial />}
        </IPhoneMockup>
      </div>

      {/* Description */}
      <div style={{ flexShrink: 0, textAlign: 'center', padding: '12px 28px 8px' }}>
        <div style={{ fontSize: 24, fontWeight: 700, color: '#000', lineHeight: 1.25, marginBottom: 6 }}>
          {SLIDES[active].description}
        </div>
        <div style={{ fontSize: 15, color: '#666666', lineHeight: 1.5 }}>
          {SLIDES[active].subtitle}
        </div>
      </div>

      {/* Dots */}
      <div style={{ flexShrink: 0, display: 'flex', gap: 7, justifyContent: 'center', padding: '8px 0 4px' }}>
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

      {/* Fixed Bottom */}
      <div style={{
        flexShrink: 0,
        padding: '12px 24px 44px',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
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

/* ── Full iPhone Mockup with Dynamic Island ── */
function IPhoneMockup({ children }) {
  return (
    <div style={{ position: 'relative', flexShrink: 0, height: '100%' }}>

      {/* Left side buttons */}
      <div style={{ position: 'absolute', left: -4, top: '18%', display: 'flex', flexDirection: 'column', gap: 6, zIndex: 1 }}>
        <div style={{ width: 3, height: 18, background: '#CCCCCC', borderRadius: '3px 0 0 3px' }} />
        <div style={{ width: 3, height: 30, background: '#CCCCCC', borderRadius: '3px 0 0 3px' }} />
        <div style={{ width: 3, height: 30, background: '#CCCCCC', borderRadius: '3px 0 0 3px' }} />
      </div>

      {/* Right power button */}
      <div style={{ position: 'absolute', right: -4, top: '24%', zIndex: 1 }}>
        <div style={{ width: 3, height: 46, background: '#CCCCCC', borderRadius: '0 3px 3px 0' }} />
      </div>

      {/* Phone body */}
      <div style={{
        height: '100%', maxHeight: 490,
        aspectRatio: '9/19',
        maxWidth: 233,
        borderRadius: 44,
        border: '1px solid #E0E0E0',
        boxShadow: '0 20px 60px rgba(0,0,0,0.14), 0 4px 16px rgba(0,0,0,0.07)',
        background: '#FFFFFF',
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden', position: 'relative',
      }}>

        {/* Status bar with Dynamic Island */}
        <div style={{
          height: 50, flexShrink: 0, background: '#FFF',
          position: 'relative',
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
          padding: '0 16px 7px',
        }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: '#000', zIndex: 2 }}>9:41</span>

          {/* Dynamic Island */}
          <div style={{
            position: 'absolute',
            top: 10, left: '50%', transform: 'translateX(-50%)',
            width: 72, height: 22,
            background: '#000',
            borderRadius: 11,
            zIndex: 2,
          }} />

          {/* Right icons */}
          <div style={{ display: 'flex', gap: 4, alignItems: 'center', zIndex: 2 }}>
            <div style={{ display: 'flex', gap: 1.5, alignItems: 'flex-end' }}>
              {[4, 6, 8, 10].map((h, i) => (
                <div key={i} style={{ width: 2.5, height: h, background: i < 3 ? '#000' : '#D0D0D0', borderRadius: 1 }} />
              ))}
            </div>
            <svg width="12" height="9" viewBox="0 0 24 18" fill="none">
              <path d="M2 7C7 3 17 3 22 7" stroke="#000" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M6 11C9 9 15 9 18 11" stroke="#000" strokeWidth="2.5" strokeLinecap="round"/>
              <circle cx="12" cy="15" r="2" fill="#000"/>
            </svg>
            <div style={{ width: 18, height: 9, border: '1.5px solid #000', borderRadius: 2.5, padding: '1.5px', display: 'flex', alignItems: 'center' }}>
              <div style={{ width: '65%', height: '100%', background: '#000', borderRadius: 1 }} />
            </div>
          </div>
        </div>

        {/* Slide content */}
        <div style={{ flex: 1, minHeight: 0, overflow: 'hidden', position: 'relative' }}>
          {children}
        </div>

        {/* Home indicator */}
        <div style={{
          height: 22, flexShrink: 0, background: '#FFF',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{ width: 80, height: 4, background: '#000', borderRadius: 2 }} />
        </div>
      </div>
    </div>
  )
}

/* ── Slide 1: Wardrobe ── */
function SlideWardrobe() {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#FFF' }}>
      <div style={{ display: 'flex', borderBottom: '0.5px solid #F0F0F0', padding: '5px 6px 0', flexShrink: 0 }}>
        {['Vêtements', 'Tenues', 'Collections'].map((t, i) => (
          <div key={t} style={{
            flex: 1, textAlign: 'center', fontSize: 7.5, fontWeight: i === 0 ? 700 : 400,
            color: i === 0 ? '#000' : '#AAAAAA',
            paddingBottom: 5,
            borderBottom: i === 0 ? '1.5px solid #000' : '1.5px solid transparent',
          }}>{t}</div>
        ))}
      </div>
      <div style={{
        flex: 1, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 2, padding: 4, overflow: 'hidden',
      }}>
        {CLOTHES_PHOTOS.map((url, i) => (
          <div key={i} style={{
            background: '#FFFFFF', aspectRatio: '1',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden',
          }}>
            <img
              src={url}
              alt=""
              style={{ width: '100%', height: '100%', objectFit: 'contain', background: '#FFF' }}
            />
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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5, flexShrink: 0 }}>
        <span style={{ fontSize: 11, fontWeight: 800, color: '#000' }}>Planner</span>
        <div style={{ background: '#000', borderRadius: 99, padding: '2px 8px' }}>
          <span style={{ fontSize: 6.5, fontWeight: 700, color: '#FFF' }}>Aujourd'hui</span>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5, flexShrink: 0 }}>
        {days.map((d, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <span style={{ fontSize: 6, color: '#AAAAAA', fontWeight: 500 }}>{d}</span>
            <div style={{
              width: 17, height: 17, borderRadius: '50%',
              background: i === today ? '#000' : 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontSize: 6.5, fontWeight: 700, color: i === today ? '#FFF' : '#000' }}>{nums[i]}</span>
            </div>
          </div>
        ))}
      </div>
      <div style={{ flex: 1, borderRadius: 10, overflow: 'hidden', position: 'relative', marginBottom: 5 }}>
        <img
          src={PLANNER_PHOTO}
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
        />
        <div style={{
          position: 'absolute', bottom: 6, left: 6, right: 6,
          background: 'rgba(255,255,255,0.90)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          borderRadius: 8, padding: '6px 4px',
          display: 'flex', alignItems: 'center',
        }}>
          {[
            { val: '3', label: 'Tenues', color: '#4CAF50', offset: 20 },
            { val: '12', label: 'Articles', color: '#C9A84C', offset: 32 },
            { val: '785€', label: 'Valeur', color: '#3B82F6', offset: 14 },
          ].map(({ val, label, color, offset }, i, arr) => (
            <div key={label} style={{
              flex: 1, textAlign: 'center',
              borderRight: i < arr.length - 1 ? '0.5px solid #EEE' : 'none',
            }}>
              <div style={{ position: 'relative', width: 26, height: 26, margin: '0 auto 2px' }}>
                <svg width="26" height="26" viewBox="0 0 26 26" style={{ position: 'absolute', top: 0, left: 0 }}>
                  <circle cx="13" cy="13" r="10" fill="none" stroke="#F0F0F0" strokeWidth="2.5"/>
                  <circle cx="13" cy="13" r="10" fill="none" stroke={color} strokeWidth="2.5"
                    strokeDasharray="63" strokeDashoffset={offset}
                    strokeLinecap="round"
                    transform="rotate(-90 13 13)"
                  />
                </svg>
                <div style={{
                  position: 'absolute', inset: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 4.5, fontWeight: 800, color,
                }}>
                  {val}
                </div>
              </div>
              <div style={{ fontSize: 5.5, color: '#888' }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Slide 3: Social ── */
function SlideSocial() {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#FFF', padding: '6px 8px 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 4, flexShrink: 0 }}>
        <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg, #F59E0B, #EF4444)', flexShrink: 0 }} />
        <div>
          <div style={{ fontSize: 9, fontWeight: 800, color: '#000' }}>Melissa 🌸</div>
          <div style={{ fontSize: 6.5, color: '#888', marginTop: 1 }}>113 Abonnés · 76 Abonnements</div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5, flexShrink: 0 }}>
        <span style={{ fontSize: 7, color: '#888' }}>@melissa_e</span>
        <div style={{ background: '#000', borderRadius: 99, padding: '3px 10px' }}>
          <span style={{ fontSize: 7, fontWeight: 700, color: '#FFF' }}>Suivre</span>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 10, borderBottom: '0.5px solid #F0F0F0', marginBottom: 4, flexShrink: 0 }}>
        {['Vêtements', 'Tenues'].map((t, i) => (
          <span key={t} style={{
            fontSize: 7.5, fontWeight: 700, color: i === 0 ? '#000' : '#AAAAAA',
            borderBottom: i === 0 ? '1.5px solid #000' : 'none',
            paddingBottom: 3,
          }}>{t}</span>
        ))}
      </div>
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, overflow: 'hidden' }}>
        {CLOTHES_PHOTOS.map((url, i) => (
          <div key={i} style={{ background: '#F8F8F8', aspectRatio: '1', overflow: 'hidden' }}>
            <img src={url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        ))}
      </div>
      <div style={{
        position: 'absolute', bottom: 36, left: 6, right: 6,
        background: 'rgba(255,255,255,0.96)', borderRadius: 9, padding: '5px 8px',
        boxShadow: '0 2px 16px rgba(0,0,0,0.14)',
        display: 'flex', alignItems: 'center', gap: 6,
      }}>
        <div style={{ width: 16, height: 16, borderRadius: '50%', background: 'linear-gradient(135deg, #A78BFA, #7C3AED)', flexShrink: 0 }} />
        <span style={{ fontSize: 7, color: '#333', lineHeight: 1.4 }}>Alice a commencé à vous suivre</span>
      </div>
    </div>
  )
}
