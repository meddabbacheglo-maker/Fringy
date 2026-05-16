import { useState } from 'react'
import Header from '../components/Header'
import OutfitCard from '../components/OutfitCard'
import useWardrobeStore, { OCCASIONS } from '../store/useWardrobeStore'
import { CategoryEmoji } from '../components/ClothingCard'

const DAYS_SHORT = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']
const OUTFIT_OCCASIONS = ['Tous', 'Casual', 'Travail', 'Soirée', 'Mariage', 'Ramadan', 'Aïd']

function getWeekDays() {
  const today = new Date()
  const dow = today.getDay()
  const mondayOffset = (dow + 6) % 7
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today)
    d.setDate(today.getDate() - mondayOffset + i)
    return {
      label: DAYS_SHORT[i],
      date: d.getDate(),
      isToday: d.toDateString() === today.toDateString(),
    }
  })
}

export default function Outfits() {
  const { outfits, items, addOutfit } = useWardrobeStore()
  const [filter, setFilter] = useState('Tous')
  const [showCreate, setShowCreate] = useState(false)
  const [activeDay, setActiveDay] = useState(getWeekDays().findIndex(d => d.isToday))

  const week = getWeekDays()
  const filtered = filter === 'Tous' ? outfits : outfits.filter(o => o.occasion === filter)

  return (
    <div className="page" style={{ background: 'var(--bg)' }}>
      <Header
        title="Mes Tenues"
        subtitle={`${outfits.length} tenue${outfits.length !== 1 ? 's' : ''}`}
        action={
          <button
            onClick={() => setShowCreate(true)}
            style={{
              width: 32, height: 32, borderRadius: 10,
              background: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
          </button>
        }
      />

      <div style={{ padding: '12px 20px 0' }}>

        {/* Week calendar strip */}
        <div style={{
          background: 'var(--surface)', borderRadius: 14, padding: '14px 8px',
          border: '1px solid var(--border)', marginBottom: 16,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {week.map((d, i) => (
              <button
                key={i}
                onClick={() => setActiveDay(i)}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                  padding: '8px 6px', borderRadius: 10, minWidth: 40,
                  background: i === activeDay ? 'var(--gold)' : d.isToday ? 'rgba(201,168,76,0.10)' : 'transparent',
                  border: 'none', cursor: 'pointer', transition: 'background 0.15s',
                }}
              >
                <span style={{
                  fontSize: 10, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase',
                  color: i === activeDay ? 'rgba(255,255,255,0.75)' : 'var(--text-muted)',
                }}>
                  {d.label}
                </span>
                <span style={{
                  fontSize: 15, fontWeight: 700,
                  color: i === activeDay ? 'white' : d.isToday ? 'var(--gold)' : 'var(--text)',
                }}>
                  {d.date}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Occasion filter */}
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 14, scrollbarWidth: 'none' }}>
          {OUTFIT_OCCASIONS.map(occ => (
            <button
              key={occ}
              className={`tag ${filter === occ ? 'active' : ''}`}
              onClick={() => setFilter(occ)}
            >
              {occ}
            </button>
          ))}
        </div>

        {/* Outfits list */}
        {filtered.length === 0 ? (
          <EmptyOutfits onAdd={() => setShowCreate(true)} filter={filter} />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {filtered.map(o => <OutfitCard key={o.id} outfit={o} />)}
          </div>
        )}
      </div>

      {showCreate && (
        <CreateOutfitModal
          items={items}
          onClose={() => setShowCreate(false)}
          onSave={outfit => { addOutfit(outfit); setShowCreate(false) }}
        />
      )}
    </div>
  )
}

function EmptyOutfits({ onAdd, filter }) {
  return (
    <div style={{ textAlign: 'center', padding: '50px 20px' }}>
      <div style={{ fontSize: 52, marginBottom: 14 }}>👗</div>
      <div style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>
        {filter === 'Tous' ? 'Aucune tenue' : `Aucune tenue "${filter}"`}
      </div>
      <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 24 }}>
        Créez votre première combinaison
      </div>
      {filter === 'Tous' && (
        <button className="btn-gold" onClick={onAdd} style={{ padding: '12px 28px' }}>
          Créer une tenue
        </button>
      )}
    </div>
  )
}

function CreateOutfitModal({ items, onClose, onSave }) {
  const [name, setName] = useState('')
  const [occasion, setOccasion] = useState('')
  const [selected, setSelected] = useState([])

  const toggle = (id) => setSelected(s => s.includes(id) ? s.filter(i => i !== id) : [...s, id])
  const canSave = name.trim() && selected.length > 0

  const handleSave = () => {
    if (!canSave) return
    onSave({ name: name.trim(), occasion: occasion || 'Casual', items: selected, season: 'Toutes saisons' })
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 200,
      background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'flex-end',
    }} onClick={onClose}>
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: 'var(--bg)', borderRadius: '20px 20px 0 0',
          width: '100%', maxWidth: 430, margin: '0 auto',
          maxHeight: '88dvh', overflow: 'auto',
          padding: '0 0 40px',
          animation: 'pageIn 0.22s ease',
        }}
      >
        {/* Handle */}
        <div style={{ padding: '12px 20px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: 'var(--border)', margin: '0 auto' }} />
        </div>
        <div style={{ padding: '16px 20px 0' }}>
          <div style={{ fontSize: 19, fontWeight: 700, marginBottom: 20 }}>Nouvelle Tenue</div>

          {/* Name */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Nom *
            </label>
            <input className="input" placeholder="ex: Look bureau moderne" value={name} onChange={e => setName(e.target.value)} />
          </div>

          {/* Occasion */}
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Occasion
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {OCCASIONS.map(occ => (
                <button key={occ} className={`tag ${occasion === occ ? 'active' : ''}`} onClick={() => setOccasion(occ)}>
                  {occ}
                </button>
              ))}
            </div>
          </div>

          {/* Item selection */}
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Articles * ({selected.length} sélectionné{selected.length !== 1 ? 's' : ''})
            </label>
            {items.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-muted)', fontSize: 13 }}>
                Ajoutez d'abord des articles à votre garde-robe
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                {items.map(item => (
                  <button
                    key={item.id}
                    onClick={() => toggle(item.id)}
                    style={{
                      background: selected.includes(item.id) ? 'rgba(201,168,76,0.10)' : 'var(--surface)',
                      border: selected.includes(item.id) ? '2px solid var(--gold)' : '1.5px solid var(--border)',
                      borderRadius: 12, padding: '10px 6px',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                      cursor: 'pointer', transition: 'all 0.15s',
                    }}
                  >
                    <CategoryEmoji category={item.category} size={26} />
                    <div style={{
                      fontSize: 10, fontWeight: 500, color: 'var(--text)',
                      textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap', width: '100%',
                    }}>
                      {item.name}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            className="btn-gold"
            style={{ width: '100%', opacity: canSave ? 1 : 0.4 }}
            disabled={!canSave}
            onClick={handleSave}
          >
            Sauvegarder la tenue
          </button>
        </div>
      </div>
    </div>
  )
}
