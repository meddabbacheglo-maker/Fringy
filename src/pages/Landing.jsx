import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import useWardrobeStore from '../store/useWardrobeStore'

const WARDROBE_PHOTOS = [
  'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=300&q=80',
  'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=300&q=80',
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&q=80',
  'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=300&q=80',
  'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=300&q=80',
  'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=300&q=80',
]

const PLANNER_PHOTO = 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80'

const SOCIAL_PHOTOS = [
  'https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=200&q=80',
  'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=200&q=80',
  'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=200&q=80',
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
    <>
      {/* ── Main page ── */}
      <div style={{
        height: '100dvh', background: '#FFFFFF',
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden', userSelect: 'none',
      }}>

        {/* Compact Fringy brand logo */}
        <div style={{
          flexShrink: 0,
          paddingTop: 40, paddingBottom: 8,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
        }}>
          <svg width="80" height="16" viewBox="0 0 72 14" fill="none">
            <path
              d="M 0,12 C 15,12 20,2 35,6 C 50,10 55,2 70,6"
              stroke="#C9956C" strokeWidth="1.5" strokeLinecap="round" fill="none"
            />
          </svg>
          <div style={{ fontSize: 20, fontWeight: 900, color: '#000000', letterSpacing: '0.2em', fontFamily: 'Inter, sans-serif' }}>
            FRINGY
          </div>
          <div style={{ width: 24, height: 1, background: '#C9956C' }} />
          <div style={{ fontSize: 9, fontWeight: 400, color: '#888888', letterSpacing: '0.3em', fontFamily: 'Inter, sans-serif' }}>
            DRESS IT EASY
          </div>
        </div>

        {/* iPhone mockup area */}
        <div
          style={{ flex: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <IPhoneMockup active={active} />
        </div>

      </div>

      {/* ── Fixed bottom bar ── */}
      <div style={{
        position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
        width: '100%', maxWidth: 430,
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        padding: '14px 24px 44px',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
        zIndex: 50,
      }}>
        {/* Dots */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 2 }}>
          {[0, 1, 2].map(i => (
            <div
              key={i}
              onClick={() => setActive(i)}
              style={{
                width: i === active ? 8 : 6,
                height: i === active ? 8 : 6,
                borderRadius: '50%',
                background: i === active ? '#000000' : '#D1D1D1',
                cursor: 'pointer',
                transition: 'all 0.25s',
              }}
            />
          ))}
        </div>

        {/* CTA button */}
        <button
          onClick={() => navigate(user ? '/home' : '/auth')}
          style={{
            width: '100%', height: 56, borderRadius: 999,
            background: '#000000', border: 'none',
            color: '#FFFFFF', fontSize: 16, fontWeight: 700,
            cursor: 'pointer', letterSpacing: '-0.01em',
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
    </>
  )
}

/* ────────────────────────────────────────
   Large iPhone mockup (85vh, 9:19.5)
─────────────────────────────────────── */
function IPhoneMockup({ active }) {
  return (
    <div style={{ position: 'relative', flexShrink: 0, height: '85vh', aspectRatio: '9 / 19.5', maxWidth: '380px' }}>

      {/* Left buttons: silent, vol+, vol- */}
      <div style={{ position: 'absolute', left: -5, top: '17%', display: 'flex', flexDirection: 'column', gap: 8, zIndex: 2 }}>
        <div style={{ width: 3, height: 24, background: '#D0D0D0', borderRadius: '3px 0 0 3px' }} />
        <div style={{ width: 3, height: 42, background: '#D0D0D0', borderRadius: '3px 0 0 3px' }} />
        <div style={{ width: 3, height: 42, background: '#D0D0D0', borderRadius: '3px 0 0 3px' }} />
      </div>

      {/* Right power button */}
      <div style={{ position: 'absolute', right: -5, top: '22%', zIndex: 2 }}>
        <div style={{ width: 3, height: 60, background: '#D0D0D0', borderRadius: '0 3px 3px 0' }} />
      </div>

      {/* Phone body */}
      <div style={{
        position: 'absolute', inset: 0,
        borderRadius: 52,
        border: '1.5px solid #E0E0E0',
        background: '#F8F8F8',
        boxShadow: '0 24px 80px rgba(0,0,0,0.18)',
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden',
      }}>

        {/* Dynamic Island */}
        <div style={{
          position: 'absolute', top: 14, left: '50%', transform: 'translateX(-50%)',
          width: 126, height: 34, background: '#000', borderRadius: 17, zIndex: 10,
        }} />

        {/* Inner screen */}
        <div style={{
          flex: 1,
          margin: '5px 4px',
          borderRadius: 47,
          overflow: 'hidden',
          background: '#FFFFFF',
          display: 'flex', flexDirection: 'column',
        }}>

          {/* Status bar */}
          <div style={{
            height: 56, flexShrink: 0,
            background: '#FFFFFF',
            position: 'relative',
            display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
            padding: '0 20px 9px',
          }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#000', zIndex: 2 }}>9:41</span>
            <div style={{ display: 'flex', gap: 5, alignItems: 'center', zIndex: 2 }}>
              <div style={{ display: 'flex', gap: 2, alignItems: 'flex-end' }}>
                {[5, 7, 10, 13].map((h, i) => (
                  <div key={i} style={{ width: 3, height: h, background: i < 3 ? '#000' : '#D0D0D0', borderRadius: 1 }} />
                ))}
              </div>
              <svg width="15" height="11" viewBox="0 0 24 18" fill="none">
                <path d="M2 7C7 3 17 3 22 7" stroke="#000" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M6 11C9 9 15 9 18 11" stroke="#000" strokeWidth="2.5" strokeLinecap="round"/>
                <circle cx="12" cy="15" r="2" fill="#000"/>
              </svg>
              <div style={{ width: 24, height: 12, border: '1.5px solid #000', borderRadius: 3, padding: '2px', display: 'flex', alignItems: 'center' }}>
                <div style={{ width: '65%', height: '100%', background: '#000', borderRadius: 1 }} />
              </div>
            </div>
          </div>

          {/* Slide content */}
          <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
            {active === 0 && <SlideWardrobe />}
            {active === 1 && <SlidePlanner />}
            {active === 2 && <SlideSocial />}
          </div>

          {/* Inner bottom nav */}
          <InnerBottomNav />

          {/* Home indicator */}
          <div style={{ height: 24, flexShrink: 0, background: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 130, height: 4, background: '#000', borderRadius: 2 }} />
          </div>

        </div>
      </div>
    </div>
  )
}

/* ── Inner bottom nav: Home | FAB | Profile ── */
function InnerBottomNav() {
  return (
    <div style={{
      height: 58, flexShrink: 0,
      background: '#FFFFFF',
      borderTop: '0.5px solid #F0F0F0',
      display: 'flex', alignItems: 'center', justifyContent: 'space-around',
      padding: '0 36px',
    }}>
      {/* Home — active */}
      <svg width="24" height="24" viewBox="0 0 24 24" fill="#000" stroke="none">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
      </svg>

      {/* FAB */}
      <div style={{
        width: 48, height: 48, borderRadius: '50%',
        background: '#000',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 4px 18px rgba(0,0,0,0.28)',
        transform: 'translateY(-6px)',
      }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
          <line x1="12" y1="5" x2="12" y2="19"/>
          <line x1="5"  y1="12" x2="19" y2="12"/>
        </svg>
      </div>

      {/* Profile */}
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#AAAAAA" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4"/>
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
      </svg>
    </div>
  )
}

/* ── Slide 1: Wardrobe ── */
function SlideWardrobe() {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#FFF' }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 18px 8px', flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.57a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.57a2 2 0 00-1.34-2.23z"/>
          </svg>
          <span style={{ fontSize: 14, fontWeight: 800, letterSpacing: '0.1em', color: '#000' }}>FRINGY</span>
        </div>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round">
          <line x1="3" y1="6" x2="21" y2="6"/>
          <line x1="3" y1="12" x2="21" y2="12"/>
          <line x1="3" y1="18" x2="21" y2="18"/>
        </svg>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '0.5px solid #F0F0F0', padding: '0 14px', flexShrink: 0 }}>
        {['Vêtements', 'Tenues', 'Collections'].map((t, i) => (
          <div key={t} style={{
            flex: 1, textAlign: 'center',
            fontSize: 12, fontWeight: i === 0 ? 700 : 400,
            color: i === 0 ? '#000' : '#AAAAAA',
            paddingBottom: 8,
            borderBottom: i === 0 ? '2px solid #000' : '2px solid transparent',
          }}>{t}</div>
        ))}
      </div>

      {/* 3×2 photo grid */}
      <div style={{
        flex: 1, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 2, padding: 6, overflow: 'hidden',
      }}>
        {WARDROBE_PHOTOS.map((url, i) => (
          <div key={i} style={{ background: '#FFFFFF', aspectRatio: '1', overflow: 'hidden' }}>
            <img src={url} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain', background: '#FFF' }} />
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Slide 2: Planner ── */
function SlidePlanner() {
  const days = ['L', 'M', 'M', 'J', 'V', 'S', 'D']
  const nums = [12, 13, 14, 15, 16, 17, 18]
  const today = 2

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#FFF' }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 18px 8px', flexShrink: 0,
      }}>
        <span style={{ fontSize: 17, fontWeight: 800, color: '#000' }}>Planner</span>
        <div style={{ background: '#000', borderRadius: 99, padding: '5px 14px' }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#FFF' }}>Aujourd'hui</span>
        </div>
      </div>

      {/* Week strip */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 18px', marginBottom: 10, flexShrink: 0 }}>
        {days.map((d, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <span style={{ fontSize: 10, color: '#AAAAAA', fontWeight: 500 }}>{d}</span>
            <div style={{
              width: 26, height: 26, borderRadius: '50%',
              background: i === today ? '#000' : 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: i === today ? '#FFF' : '#000' }}>{nums[i]}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Large photo + glass card */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden', margin: '0 10px 10px' }}>
        <img
          src={PLANNER_PHOTO}
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', borderRadius: 14, display: 'block' }}
        />
        {/* Glass stats card */}
        <div style={{
          position: 'absolute', bottom: 12, left: 10, right: 10,
          background: 'rgba(255,255,255,0.88)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderRadius: 14, padding: '10px 6px',
          display: 'flex', alignItems: 'center',
        }}>
          {[
            { val: '3',    label: 'Tenues',  color: '#4CAF50', offset: 30 },
            { val: '12',   label: 'Articles', color: '#C9956C', offset: 44 },
            { val: '785€', label: 'Valeur',  color: '#3B82F6', offset: 18 },
          ].map(({ val, label, color, offset }, i, arr) => (
            <div key={label} style={{
              flex: 1, textAlign: 'center',
              borderRight: i < arr.length - 1 ? '0.5px solid #E0E0E0' : 'none',
            }}>
              <div style={{ position: 'relative', width: 36, height: 36, margin: '0 auto 4px' }}>
                <svg width="36" height="36" viewBox="0 0 36 36" style={{ position: 'absolute', inset: 0 }}>
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#F0F0F0" strokeWidth="3"/>
                  <circle cx="18" cy="18" r="14" fill="none" stroke={color} strokeWidth="3"
                    strokeDasharray="88" strokeDashoffset={offset}
                    strokeLinecap="round" transform="rotate(-90 18 18)"
                  />
                </svg>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: 7, fontWeight: 800, color }}>{val}</span>
                </div>
              </div>
              <div style={{ fontSize: 9, color: '#888' }}>{label}</div>
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
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#FFF', position: 'relative', overflow: 'hidden' }}>
      {/* Profile header */}
      <div style={{ padding: '10px 18px 8px', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, #EC4899, #8B5CF6)', flexShrink: 0 }} />
          <div>
            <div style={{ fontSize: 14, fontWeight: 800, color: '#000' }}>Yasmine ✨</div>
            <div style={{ fontSize: 11, color: '#888', marginTop: 2 }}>234 Abonnés · 89 Abonnements</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 12, color: '#888' }}>@yasmine_style</span>
          <div style={{ background: '#000', borderRadius: 99, padding: '6px 16px' }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#FFF' }}>Suivre</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 16, borderBottom: '0.5px solid #F0F0F0', padding: '0 18px', flexShrink: 0 }}>
        {['Vêtements', 'Tenues'].map((t, i) => (
          <span key={t} style={{
            fontSize: 12, fontWeight: 700, color: i === 0 ? '#000' : '#AAAAAA',
            borderBottom: i === 0 ? '2px solid #000' : 'none',
            paddingBottom: 7,
          }}>{t}</span>
        ))}
      </div>

      {/* 3-column photo grid — repeat to fill rows */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, overflow: 'hidden' }}>
        {[...SOCIAL_PHOTOS, ...SOCIAL_PHOTOS].map((url, i) => (
          <div key={i} style={{ background: '#F8F8F8', aspectRatio: '1', overflow: 'hidden' }}>
            <img src={url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        ))}
      </div>

      {/* Toast notification */}
      <div style={{
        position: 'absolute', bottom: 14, left: 14, right: 14,
        background: 'rgba(255,255,255,0.96)',
        borderRadius: 14, padding: '10px 14px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.14)',
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'linear-gradient(135deg, #A78BFA, #7C3AED)', flexShrink: 0 }} />
        <span style={{ fontSize: 12, color: '#333', lineHeight: 1.4 }}>Sara a commencé à vous suivre</span>
      </div>
    </div>
  )
}
