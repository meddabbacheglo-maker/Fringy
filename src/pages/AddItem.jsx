import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useWardrobeStore, { CATEGORIES, OCCASIONS, SEASONS, COLORS } from '../store/useWardrobeStore'
import Header from '../components/Header'

const CATEGORY_OPTIONS = CATEGORIES.filter(c => c !== 'Tous')

export default function AddItem() {
  const navigate = useNavigate()
  const addItem = useWardrobeStore(s => s.addItem)
  const [form, setForm] = useState({
    name: '', category: '', brand: '', color: '#C9A84C', colorName: 'Or',
    season: [], occasion: [], tags: '', image: null,
  })
  const [step, setStep] = useState(1)

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }))
  const toggle = (key, val) => setForm(f => ({
    ...f,
    [key]: f[key].includes(val) ? f[key].filter(v => v !== val) : [...f[key], val]
  }))

  const canNext = () => {
    if (step === 1) return form.name.trim() && form.category
    if (step === 2) return form.season.length > 0 && form.occasion.length > 0
    return true
  }

  const handleSubmit = () => {
    const tags = form.tags.split(',').map(t => t.trim()).filter(Boolean)
    addItem({ ...form, tags })
    navigate('/wardrobe')
  }

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100dvh' }}>
      <Header title="Nouvel Article" showBack />

      {/* Progress */}
      <div style={{ padding: '70px 20px 0' }}>
        <div style={{ display: 'flex', gap: 6, marginBottom: 24 }}>
          {[1, 2, 3].map(s => (
            <div key={s} style={{
              flex: 1, height: 4, borderRadius: 2,
              background: s <= step ? 'var(--gold)' : 'var(--border)',
              transition: 'background 0.3s',
            }} />
          ))}
        </div>

        {step === 1 && <Step1 form={form} set={set} toggle={toggle} />}
        {step === 2 && <Step2 form={form} toggle={toggle} />}
        {step === 3 && <Step3 form={form} set={set} />}
      </div>

      {/* Actions */}
      <div style={{ padding: '24px 20px', display: 'flex', gap: 12, position: 'sticky', bottom: 0, background: 'var(--bg)', borderTop: '1px solid var(--border)' }}>
        {step > 1 && (
          <button className="btn-outline" onClick={() => setStep(s => s - 1)} style={{ flex: 1 }}>
            Retour
          </button>
        )}
        <button
          className="btn-gold"
          style={{ flex: 2, opacity: canNext() ? 1 : 0.5 }}
          disabled={!canNext()}
          onClick={() => step < 3 ? setStep(s => s + 1) : handleSubmit()}
        >
          {step < 3 ? 'Suivant' : 'Ajouter à la garde-robe'}
        </button>
      </div>
    </div>
  )
}

function Step1({ form, set }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <SectionLabel step={1} title="Informations de base" />
      <Field label="Nom de l'article *">
        <input className="input" placeholder="ex: Chemise lin blanc" value={form.name} onChange={e => set('name', e.target.value)} />
      </Field>
      <Field label="Catégorie *">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {CATEGORY_OPTIONS.map(cat => (
            <button key={cat} className={`tag ${form.category === cat ? 'active' : ''}`} onClick={() => set('category', cat)}>{cat}</button>
          ))}
        </div>
      </Field>
      <Field label="Marque">
        <input className="input" placeholder="ex: Zara, H&M, Artisanat..." value={form.brand} onChange={e => set('brand', e.target.value)} />
      </Field>
      <Field label="Couleur">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {COLORS.map(c => (
            <button
              key={c.hex}
              onClick={() => { set('color', c.hex); set('colorName', c.name) }}
              style={{
                width: 36, height: 36, borderRadius: '50%',
                background: c.hex, border: form.color === c.hex ? '3px solid var(--gold)' : '2px solid var(--border)',
                cursor: 'pointer', boxShadow: 'var(--shadow-sm)',
                transition: 'transform 0.1s',
                transform: form.color === c.hex ? 'scale(1.15)' : 'scale(1)',
              }}
              title={c.name}
            />
          ))}
        </div>
      </Field>
    </div>
  )
}

function Step2({ form, toggle }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <SectionLabel step={2} title="Saisons & Occasions" />
      <Field label="Saisons *">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {SEASONS.map(s => (
            <button key={s} className={`tag ${form.season.includes(s) ? 'active' : ''}`} onClick={() => toggle('season', s)}>{s}</button>
          ))}
        </div>
      </Field>
      <Field label="Occasions *">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {OCCASIONS.map(occ => (
            <button key={occ} className={`tag ${form.occasion.includes(occ) ? 'active' : ''}`} onClick={() => toggle('occasion', occ)}>{occ}</button>
          ))}
        </div>
      </Field>
    </div>
  )
}

function Step3({ form, set }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <SectionLabel step={3} title="Finitions" />
      {/* Photo placeholder */}
      <div style={{
        height: 160, borderRadius: 'var(--radius-card)',
        border: '2px dashed var(--border)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        gap: 10, cursor: 'pointer', color: 'var(--text-muted)',
        background: 'var(--surface)',
      }}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--border)" strokeWidth="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
        </svg>
        <div style={{ fontSize: 14, fontWeight: 500 }}>Ajouter une photo</div>
        <div style={{ fontSize: 12 }}>Bientôt disponible</div>
      </div>
      <Field label="Tags (séparés par virgule)">
        <input className="input" placeholder="ex: casual, été, léger" value={form.tags} onChange={e => set('tags', e.target.value)} />
      </Field>
      {/* Summary */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-card)', padding: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Récapitulatif</div>
        {[
          { label: 'Nom', value: form.name || '—' },
          { label: 'Catégorie', value: form.category || '—' },
          { label: 'Marque', value: form.brand || '—' },
          { label: 'Couleur', value: form.colorName },
          { label: 'Saisons', value: form.season.join(', ') || '—' },
          { label: 'Occasions', value: form.occasion.join(', ') || '—' },
        ].map(row => (
          <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', paddingVertical: 4, fontSize: 13, marginBottom: 8 }}>
            <span style={{ color: 'var(--text-muted)' }}>{row.label}</span>
            <span style={{ fontWeight: 500, color: 'var(--text)', maxWidth: '55%', textAlign: 'right' }}>{row.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function SectionLabel({ step, title }) {
  return (
    <div style={{ marginBottom: 4 }}>
      <div style={{ fontSize: 12, color: 'var(--gold)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Étape {step}/3</div>
      <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)', marginTop: 4 }}>{title}</div>
    </div>
  )
}

function Field({ label, children }) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 8 }}>{label}</label>
      {children}
    </div>
  )
}
