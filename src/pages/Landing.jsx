import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const SLIDES = [
  'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80',
  'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&q=80',
  'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80',
  'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80',
]

const STATS = [
  { value: '7M+', label: 'Utilisateurs' },
  { value: '150+', label: 'Pays' },
  { value: 'IA', label: 'Stylist 24h' },
]

export default function Landing() {
  const navigate = useNavigate()
  const [active, setActive] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setActive(i => (i + 1) % SLIDES.length)
    }, 3000)
    return () => clearInterval(id)
  }, [])

  return (
    <div style={{
      position: 'relative',
      height: '100dvh',
      width: '100%',
      overflow: 'hidden',
      background: '#0D0D0D',
    }}>

      {/* ── Slideshow images ── */}
      {SLIDES.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            opacity: i === active ? 1 : 0,
            transition: 'opacity 1.2s ease-in-out',
            willChange: 'opacity',
          }}
        />
      ))}

      {/* ── Gradient overlay: dark top + dark bottom, light middle ── */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `
          linear-gradient(
            to bottom,
            rgba(0,0,0,0.72) 0%,
            rgba(0,0,0,0.15) 30%,
            rgba(0,0,0,0.08) 50%,
            rgba(0,0,0,0.20) 65%,
            rgba(0,0,0,0.82) 100%
          )
        `,
        zIndex: 1,
      }} />

      {/* ── All UI on top ── */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '0 0 0 0',
      }}>

        {/* ── TOP: Logo + tagline + dots ── */}
        <div style={{ padding: '52px 24px 0' }}>
          {/* Logo */}
          <div style={{
            fontSize: 32,
            fontWeight: 800,
            letterSpacing: '-0.04em',
            lineHeight: 1,
            marginBottom: 8,
            textShadow: '0 2px 12px rgba(0,0,0,0.4)',
          }}>
            <span style={{ color: '#FFFFFF' }}>Clo</span>
            <span style={{ color: '#C9A84C' }}>zy</span>
          </div>

          {/* Tagline */}
          <div style={{
            fontSize: 14,
            color: 'rgba(255,255,255,0.60)',
            fontWeight: 400,
            letterSpacing: '0.02em',
            marginBottom: 20,
          }}>
            Votre dressing, réinventé par l'IA
          </div>

          {/* Slide indicator dots */}
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                style={{
                  height: 6,
                  width: i === active ? 22 : 6,
                  borderRadius: 3,
                  background: i === active ? '#C9A84C' : 'rgba(255,255,255,0.35)',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'all 0.35s ease',
                }}
              />
            ))}
          </div>
        </div>

        {/* ── MIDDLE: Stats badges ── */}
        <div style={{
          display: 'flex',
          gap: 10,
          padding: '0 24px',
          justifyContent: 'center',
        }}>
          {STATS.map(s => (
            <div
              key={s.label}
              style={{
                flex: 1,
                background: 'rgba(255,255,255,0.10)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.18)',
                borderRadius: 14,
                padding: '12px 8px',
                textAlign: 'center',
              }}
            >
              <div style={{
                fontSize: 20,
                fontWeight: 800,
                color: '#C9A84C',
                letterSpacing: '-0.02em',
                lineHeight: 1,
                marginBottom: 4,
              }}>
                {s.value}
              </div>
              <div style={{
                fontSize: 11,
                color: 'rgba(255,255,255,0.70)',
                fontWeight: 500,
                letterSpacing: '0.01em',
              }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* ── BOTTOM: CTA section ── */}
        <div style={{ padding: '0 24px 40px' }}>
          {/* Title */}
          <div style={{
            fontSize: 26,
            fontWeight: 800,
            color: '#FFFFFF',
            letterSpacing: '-0.035em',
            lineHeight: 1.2,
            marginBottom: 8,
          }}>
            Commencez maintenant
          </div>

          {/* Subtitle */}
          <div style={{
            fontSize: 14,
            color: 'rgba(255,255,255,0.55)',
            lineHeight: 1.6,
            marginBottom: 24,
          }}>
            Organisez, stylisez et découvrez votre style avec l'intelligence artificielle
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 18 }}>
            <button
              onClick={() => navigate('/home')}
              style={{
                width: '100%',
                padding: '16px 24px',
                borderRadius: '999px',
                border: 'none',
                background: '#C9A84C',
                color: '#FFFFFF',
                fontSize: 16,
                fontWeight: 700,
                cursor: 'pointer',
                letterSpacing: '0.01em',
                boxShadow: '0 4px 20px rgba(201,168,76,0.45)',
                transition: 'transform 0.1s, box-shadow 0.1s',
              }}
              onTouchStart={e => {
                e.currentTarget.style.transform = 'scale(0.98)'
                e.currentTarget.style.boxShadow = '0 2px 10px rgba(201,168,76,0.3)'
              }}
              onTouchEnd={e => {
                e.currentTarget.style.transform = 'scale(1)'
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(201,168,76,0.45)'
              }}
            >
              Créer un compte gratuit
            </button>

            <button
              onClick={() => navigate('/home')}
              style={{
                width: '100%',
                padding: '15px 24px',
                borderRadius: '999px',
                border: '1.5px solid rgba(255,255,255,0.55)',
                background: 'transparent',
                color: '#FFFFFF',
                fontSize: 16,
                fontWeight: 600,
                cursor: 'pointer',
                letterSpacing: '0.01em',
                transition: 'border-color 0.15s, background 0.15s',
              }}
              onTouchStart={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.10)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.80)'
              }}
              onTouchEnd={e => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.55)'
              }}
            >
              Se connecter
            </button>
          </div>

          {/* Terms */}
          <div style={{
            textAlign: 'center',
            fontSize: 11,
            color: 'rgba(255,255,255,0.35)',
            lineHeight: 1.6,
          }}>
            En continuant, vous acceptez nos{' '}
            <span style={{
              color: 'rgba(255,255,255,0.55)',
              textDecoration: 'underline',
              cursor: 'pointer',
            }}>
              Conditions d'utilisation
            </span>
            {' '}et notre{' '}
            <span style={{
              color: 'rgba(255,255,255,0.55)',
              textDecoration: 'underline',
              cursor: 'pointer',
            }}>
              Politique de confidentialité
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
