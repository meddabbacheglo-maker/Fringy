import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useWardrobeStore, { CATEGORIES, OCCASIONS, SEASONS, COLORS } from '../store/useWardrobeStore'
import Header from '../components/Header'

const CATEGORY_OPTIONS = CATEGORIES.filter(c => c !== 'Tous')

export default function AddItem() {
  const navigate = useNavigate()
  const { saveItem, addItem, user } = useWardrobeStore()
  const [form, setForm] = useState({
    name: '', category: '', brand: '', color: '#C9A84C', colorName: 'Or',
    season: [], occasion: [], tags: '', image: null,
  })
  const [step, setStep] = useState(1)
  const [saving, setSaving] = useState(false)

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }))
  const toggle = (key, val) => setForm(f => ({
    ...f,
    [key]: f[key].includes(val) ? f[key].filter(v => v !== val) : [...f[key], val],
  }))

  const canNext = () => {
    if (step === 1) return form.name.trim() && form.category
    if (step === 2) return form.season.length > 0 && form.occasion.length > 0
    return true
  }

  const handleSubmit = async () => {
    setSaving(true)
    const tags = form.tags.split(',').map(t => t.trim()).filter(Boolean)
    const item = { ...form, tags }
    try {
      if (user) {
        await saveItem(item)
      } else {
        addItem(item)
      }
      navigate('/wardrobe')
    } catch {
      addItem(item)
      navigate('/wardrobe')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100dvh' }}>
      <Header title="Nouvel Article" showBack />

      <div style={{ padding: '70px 20px 0' }}>
        {/* Progress bar */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 28 }}>
          {[1, 2, 3].map(s => (
            <div key={s} style={{
              flex: 1, height: 4, borderRadius: 2,
              background: s <= step ? 'var(--gold)' : 'var(--border)',
              transition: 'background 0.3s',
            }} />
          ))}
        </div>

        {step === 1 && <Step1 form={form} set={set} />}
        {step === 2 && <Step2 form={form} toggle={toggle} />}
        {step === 3 && <Step3 form={form} set={set} />}
      </div>

      {/* Footer actions */}
      <div style={{
        padding: '16px 20px', display: 'flex', gap: 12,
        position: 'sticky', bottom: 0,
        background: 'rgba(255,255,255,0.96)', backdropFilter: 'blur(12px)',
        borderTop: '1px solid var(--border)',
      }}>
        {step > 1 && (
          <button className="btn-outline" onClick={() => setStep(s => s - 1)} style={{ flex: 1 }}>
            Retour
          </button>
        )}
        <button
          className="btn-gold"
          style={{ flex: 2, opacity: canNext() ? 1 : 0.4 }}
          disabled={!canNext() || saving}
          onClick={() => step < 3 ? setStep(s => s + 1) : handleSubmit()}
        >
          {saving ? 'Enregistrement...' : step < 3 ? 'Suivant' : 'Ajouter à la garde-robe'}
        </button>
      </div>
    </div>
  )
}

function Step1({ form, set }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      <StepLabel step={1} title="Informations de base" />

      <Field label="Nom de l'article *">
        <input
          className="input"
          placeholder="ex: Chemise lin blanc"
          value={form.name}
          onChange={e => set('name', e.target.value)}
          autoFocus
        />
      </Field>

      <Field label="Catégorie *">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {CATEGORY_OPTIONS.map(cat => (
            <button
              key={cat}
              className={`tag ${form.category === cat ? 'active' : ''}`}
              onClick={() => set('category', cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </Field>

      <Field label="Marque">
        <input
          className="input"
          placeholder="ex: Zara, Mango, Artisanat..."
          value={form.brand}
          onChange={e => set('brand', e.target.value)}
        />
      </Field>

      <Field label="Couleur">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {COLORS.map(c => (
            <button
              key={c.hex}
              onClick={() => { set('color', c.hex); set('colorName', c.name) }}
              title={c.name}
              style={{
                width: 36, height: 36, borderRadius: '50%',
                background: c.hex,
                border: form.color === c.hex ? '3px solid var(--gold)' : '2px solid var(--border)',
                cursor: 'pointer', transition: 'transform 0.1s',
                transform: form.color === c.hex ? 'scale(1.18)' : 'scale(1)',
                boxShadow: form.color === c.hex ? '0 2px 8px rgba(201,168,76,0.40)' : 'var(--shadow-sm)',
              }}
            />
          ))}
        </div>
        {form.colorName && (
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 8 }}>
            Sélectionné : <strong style={{ color: 'var(--text)' }}>{form.colorName}</strong>
          </div>
        )}
      </Field>
    </div>
  )
}

function Step2({ form, toggle }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      <StepLabel step={2} title="Saisons & Occasions" />

      <Field label="Saisons *">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {SEASONS.map(s => (
            <button
              key={s}
              className={`tag ${form.season.includes(s) ? 'active' : ''}`}
              onClick={() => toggle('season', s)}
            >
              {s}
            </button>
          ))}
        </div>
      </Field>

      <Field label="Occasions *">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {OCCASIONS.map(occ => (
            <button
              key={occ}
              className={`tag ${form.occasion.includes(occ) ? 'active' : ''}`}
              onClick={() => toggle('occasion', occ)}
            >
              {occ}
            </button>
          ))}
        </div>
      </Field>
    </div>
  )
}

function Step3({ form, set }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      <StepLabel step={3} title="Finitions" />

      {/* Photo */}
      <Field label="Photo">
        <div style={{
          height: 150, borderRadius: 12,
          border: '2px dashed var(--border)',
          background: 'var(--surface)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: 8, color: 'var(--text-muted)',
        }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--border)" strokeWidth="1.5">
            <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/>
            <circle cx="12" cy="13" r="4"/>
          </svg>
          <div style={{ fontSize: 13, fontWeight: 500 }}>Ajouter une photo</div>
          <div style={{ fontSize: 11 }}>Bientôt disponible</div>
        </div>
      </Field>

      <Field label="Tags (séparés par virgule)">
        <input
          className="input"
          placeholder="ex: casual, été, léger"
          value={form.tags}
          onChange={e => set('tags', e.target.value)}
        />
      </Field>

      {/* Summary card */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 16 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 14 }}>
          Récapitulatif
        </div>
        {[
          { label: 'Nom',       value: form.name || '—' },
          { label: 'Catégorie', value: form.category || '—' },
          { label: 'Marque',    value: form.brand || '—' },
          { label: 'Couleur',   value: form.colorName },
          { label: 'Saisons',   value: form.season.join(', ') || '—' },
          { label: 'Occasions', value: form.occasion.join(', ') || '—' },
        ].map(row => (
          <div key={row.label} style={{
            display: 'flex', justifyContent: 'space-between',
            fontSize: 13, paddingBottom: 10, marginBottom: 10,
            borderBottom: '1px solid var(--border)',
          }}>
            <span style={{ color: 'var(--text-muted)' }}>{row.label}</span>
            <span style={{ fontWeight: 500, color: 'var(--text)', maxWidth: '55%', textAlign: 'right' }}>{row.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function StepLabel({ step, title }) {
  return (
    <div>
      <div style={{ fontSize: 11, color: 'var(--gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
        Étape {step}/3
      </div>
      <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)' }}>{title}</div>
    </div>
  )
}

function Field({ label, children }) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 10 }}>
        {label}
      </label>
      {children}
    </div>
  )
}
