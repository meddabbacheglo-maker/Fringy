import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useWardrobeStore from '../store/useWardrobeStore'

const BG = 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80'

export default function Auth() {
  const navigate      = useNavigate()
  const { signIn, signUp } = useWardrobeStore()
  const [mode, setMode]    = useState('login')   // 'login' | 'signup'
  const [form, setForm]    = useState({ email: '', password: '', fullName: '' })
  const [error, setError]  = useState('')
  const [loading, setLoading] = useState(false)

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async () => {
    setError('')
    if (!form.email || !form.password) { setError('Veuillez remplir tous les champs.'); return }
    if (mode === 'signup' && !form.fullName) { setError('Veuillez entrer votre prénom.'); return }
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
      {/* Background image */}
      <img
        src={BG}
        alt=""
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
      />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,8,5,0.55) 0%, rgba(10,8,5,0.35) 35%, rgba(10,8,5,0.90) 100%)' }} />

      {/* Back button */}
      <button
        onClick={() => navigate('/')}
        style={{
          position: 'absolute', top: 52, left: 20, zIndex: 10,
          width: 38, height: 38, borderRadius: 10,
          background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.20)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
          <path d="M19 12H5M12 5l-7 7 7 7"/>
        </svg>
      </button>

      {/* Logo */}
      <div style={{ position: 'absolute', top: 50, left: '50%', transform: 'translateX(-50%)', zIndex: 10, textAlign: 'center' }}>
        <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.04em', color: '#FFFFFF' }}>
          Clo<span style={{ color: '#C9A84C' }}>zy</span>
        </div>
      </div>

      {/* Card */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 10,
        background: 'rgba(15,12,8,0.92)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
        borderRadius: '24px 24px 0 0',
        border: '1px solid rgba(255,255,255,0.08)',
        padding: '28px 24px 44px',
      }}>
        {/* Tab toggle */}
        <div style={{
          display: 'flex', background: 'rgba(255,255,255,0.06)', borderRadius: 12,
          padding: 4, marginBottom: 24, border: '1px solid rgba(255,255,255,0.08)',
        }}>
          {[['login', 'Se connecter'], ['signup', 'Créer un compte']].map(([key, label]) => (
            <button
              key={key}
              onClick={() => { setMode(key); setError('') }}
              style={{
                flex: 1, padding: '10px', borderRadius: 9, border: 'none', cursor: 'pointer',
                fontSize: 14, fontWeight: 600, transition: 'all 0.2s',
                background: mode === key ? '#C9A84C' : 'transparent',
                color:      mode === key ? '#FFFFFF' : 'rgba(255,255,255,0.45)',
              }}
            >
              {label}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Full name (signup only) */}
          {mode === 'signup' && (
            <Field
              label="Prénom"
              type="text"
              placeholder="Votre prénom"
              value={form.fullName}
              onChange={v => set('fullName', v)}
              autoFocus
            />
          )}

          <Field
            label="Email"
            type="email"
            placeholder="vous@exemple.com"
            value={form.email}
            onChange={v => set('email', v)}
            autoFocus={mode === 'login'}
          />

          <Field
            label="Mot de passe"
            type="password"
            placeholder={mode === 'signup' ? 'Minimum 6 caractères' : '••••••••'}
            value={form.password}
            onChange={v => set('password', v)}
            onEnter={handleSubmit}
          />
        </div>

        {/* Error */}
        {error && (
          <div style={{
            marginTop: 14, padding: '10px 14px', borderRadius: 10,
            background: 'rgba(201,40,62,0.15)', border: '1px solid rgba(201,40,62,0.30)',
            fontSize: 13, color: '#FF6B7A', lineHeight: 1.5,
          }}>
            {error}
          </div>
        )}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            width: '100%', marginTop: 20,
            padding: '15px 24px', borderRadius: '999px',
            border: 'none', background: loading ? 'rgba(201,168,76,0.5)' : '#C9A84C',
            color: '#FFFFFF', fontSize: 16, fontWeight: 700, cursor: loading ? 'default' : 'pointer',
            boxShadow: loading ? 'none' : '0 4px 20px rgba(201,168,76,0.40)',
            transition: 'all 0.2s', letterSpacing: '0.01em',
          }}
        >
          {loading
            ? 'Chargement...'
            : mode === 'login' ? 'Se connecter' : 'Créer mon compte'}
        </button>

        {/* Note for signup */}
        {mode === 'signup' && (
          <div style={{ textAlign: 'center', marginTop: 14, fontSize: 11, color: 'rgba(255,255,255,0.30)', lineHeight: 1.6 }}>
            En créant un compte, vous acceptez nos{' '}
            <span style={{ color: 'rgba(255,255,255,0.50)', textDecoration: 'underline', cursor: 'pointer' }}>CGU</span>
          </div>
        )}
      </div>
    </div>
  )
}

function Field({ label, type, placeholder, value, onChange, onEnter, autoFocus }) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.50)', marginBottom: 6, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        autoFocus={autoFocus}
        autoComplete={type === 'password' ? 'current-password' : type === 'email' ? 'email' : 'name'}
        onChange={e => onChange(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && onEnter?.()}
        style={{
          width: '100%', padding: '13px 16px',
          borderRadius: 12, border: '1.5px solid rgba(255,255,255,0.12)',
          background: 'rgba(255,255,255,0.06)',
          color: '#FFFFFF', fontSize: 15, outline: 'none',
          transition: 'border-color 0.2s',
          fontFamily: 'inherit',
        }}
        onFocus={e => e.target.style.borderColor = '#C9A84C'}
        onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.12)'}
      />
    </div>
  )
}
