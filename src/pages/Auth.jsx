import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import useWardrobeStore from '../store/useWardrobeStore'

const BG = 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&q=80'

export default function Auth() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { signIn, signUp } = useWardrobeStore()
  const [showEmailForm, setShowEmailForm] = useState(searchParams.get('mode') === 'login')
  const [mode, setMode] = useState(searchParams.get('mode') === 'login' ? 'login' : 'signup')
  const [form, setForm] = useState({ email: '', password: '', fullName: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async () => {
    setError('')
    if (!form.email || !form.password) { setError('Veuillez remplir tous les champs.'); return }
    if (mode === 'signup' && !form.fullName) { setError('Veuillez entrer votre nom complet.'); return }
    setLoading(true)
    try {
      if (mode === 'login') {
        await signIn(form.email, form.password)
      } else {
        await signUp(form.email, form.password, form.fullName)
      }
      navigate('/home')
    } catch (e) {
      const msg = e?.message || 'Une erreur est survenue.'
      if (msg.includes('Invalid login')) setError('Email ou mot de passe incorrect.')
      else if (msg.includes('already registered')) setError('Cet email est déjà utilisé.')
      else if (msg.includes('Password should be')) setError('Le mot de passe doit contenir au moins 6 caractères.')
      else setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ position: 'relative', height: '100dvh', overflow: 'hidden' }}>
      {/* Background */}
      <img
        src={BG}
        alt=""
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
      />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.35)' }} />

      {/* Logo */}
      <div style={{ position: 'absolute', top: 64, left: 0, right: 0, zIndex: 10, textAlign: 'center' }}>
        <div style={{
          fontSize: 48, fontWeight: 900, letterSpacing: '-0.04em',
          color: '#FFFFFF', lineHeight: 1,
          fontFamily: 'Inter, sans-serif',
        }}>
          Clozy
        </div>
        <div style={{ fontSize: 16, color: 'rgba(255,255,255,0.70)', marginTop: 10, fontWeight: 400 }}>
          Votre garde-robe intelligente
        </div>
      </div>

      {/* OAuth buttons */}
      {!showEmailForm && (
        <div style={{
          position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
          width: '100%', maxWidth: 430, zIndex: 20,
          padding: '24px 24px 48px',
          display: 'flex', flexDirection: 'column', gap: 12,
        }}>
          <OAuthBtn icon={<AppleIcon />} label="Continuer avec Apple" />
          <OAuthBtn icon={<GoogleIcon />} label="Continuer avec Google" />
          <OAuthBtn
            icon={<EmailIcon />}
            label="Continuer avec Email"
            onClick={() => setShowEmailForm(true)}
          />
        </div>
      )}

      {/* Email bottom sheet */}
      {showEmailForm && (
        <>
          <div
            onClick={() => setShowEmailForm(false)}
            style={{
              position: 'fixed', inset: 0, zIndex: 25,
              background: 'rgba(0,0,0,0.40)',
              animation: 'overlayIn 0.25s ease',
            }}
          />
          <div style={{
            position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
            width: '100%', maxWidth: 430, zIndex: 30,
            background: '#FFFFFF',
            borderRadius: '24px 24px 0 0',
            padding: '20px 24px 48px',
            animation: 'slideUp 0.30s ease',
          }}>
            {/* Handle */}
            <div style={{ width: 36, height: 4, borderRadius: 2, background: '#E0E0E0', margin: '0 auto 20px' }} />

            {/* Tab toggle */}
            <div style={{
              display: 'flex', background: '#F5F5F5', borderRadius: 12,
              padding: 4, marginBottom: 20,
            }}>
              {[['login', 'Se connecter'], ['signup', 'Créer un compte']].map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => { setMode(key); setError('') }}
                  style={{
                    flex: 1, padding: '10px', borderRadius: 9, border: 'none', cursor: 'pointer',
                    fontSize: 14, fontWeight: 600, transition: 'all 0.2s',
                    background: mode === key ? '#000000' : 'transparent',
                    color: mode === key ? '#FFFFFF' : '#888888',
                  }}
                >
                  {label}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {mode === 'signup' && (
                <LightField
                  label="Nom complet"
                  type="text"
                  placeholder="Votre nom complet"
                  value={form.fullName}
                  onChange={v => set('fullName', v)}
                />
              )}
              <LightField
                label="Email"
                type="email"
                placeholder="vous@exemple.com"
                value={form.email}
                onChange={v => set('email', v)}
              />
              <LightField
                label="Mot de passe"
                type="password"
                placeholder={mode === 'signup' ? 'Minimum 6 caractères' : '••••••••'}
                value={form.password}
                onChange={v => set('password', v)}
                onEnter={handleSubmit}
              />
            </div>

            {error && (
              <div style={{
                marginTop: 12, padding: '10px 14px', borderRadius: 10,
                background: '#FEF2F2', border: '1px solid #FECACA',
                fontSize: 13, color: '#EF4444', lineHeight: 1.5,
              }}>
                {error}
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{
                width: '100%', marginTop: 16,
                padding: '15px 24px', borderRadius: '999px',
                border: 'none',
                background: loading ? '#CCCCCC' : '#000000',
                color: '#FFFFFF', fontSize: 16, fontWeight: 700,
                cursor: loading ? 'default' : 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {loading ? 'Chargement...' : mode === 'login' ? 'Se connecter' : 'Créer mon compte'}
            </button>

            {mode === 'signup' && (
              <div style={{ textAlign: 'center', marginTop: 12, fontSize: 11, color: '#BBBBBB', lineHeight: 1.6 }}>
                En créant un compte, vous acceptez nos{' '}
                <span style={{ color: '#888', textDecoration: 'underline', cursor: 'pointer' }}>CGU</span>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

function OAuthBtn({ icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: '100%', height: 56, borderRadius: 999,
        background: '#FFFFFF', border: 'none',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
        fontSize: 16, fontWeight: 600, color: '#000000',
        cursor: 'pointer',
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
      }}
    >
      {icon}
      {label}
    </button>
  )
}

function LightField({ label, type, placeholder, value, onChange, onEnter }) {
  return (
    <div>
      <label style={{
        display: 'block', fontSize: 12, fontWeight: 600, color: '#888888',
        marginBottom: 6, letterSpacing: '0.04em', textTransform: 'uppercase',
      }}>
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        autoComplete={type === 'password' ? 'current-password' : type === 'email' ? 'email' : 'name'}
        onChange={e => onChange(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && onEnter?.()}
        style={{
          width: '100%', padding: '13px 16px',
          borderRadius: 12, border: '1.5px solid #EEEEEE',
          background: '#FFFFFF',
          color: '#1A1A1A', fontSize: 15, outline: 'none',
          transition: 'border-color 0.2s',
          fontFamily: 'inherit',
        }}
        onFocus={e => e.target.style.borderColor = '#C9A84C'}
        onBlur={e => e.target.style.borderColor = '#EEEEEE'}
      />
    </div>
  )
}

function AppleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#000000">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
    </svg>
  )
}

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  )
}

function EmailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  )
}
