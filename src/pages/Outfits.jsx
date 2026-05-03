import { useState } from 'react'
import Header from '../components/Header'
import OutfitCard from '../components/OutfitCard'
import useWardrobeStore, { OCCASIONS } from '../store/useWardrobeStore'
import { CategoryEmoji } from '../components/ClothingCard'

export default function Outfits() {
  const { outfits, items, addOutfit } = useWardrobeStore()
  const [filter, setFilter] = useState('Tous')
  const [showCreate, setShowCreate] = useState(false)

  const filtered = filter === 'Tous' ? outfits : outfits.filter(o => o.occasion === filter)

  return (
    <div className="page" style={{ background: 'var(--bg)' }}>
      <Header
        title="Mes Tenues"
        subtitle={`${outfits.length} tenue${outfits.length !== 1 ? 's' : ''}`}
        action={
          <button className="btn-gold" style={{ padding: '8px 16px', fontSize: 14 }} onClick={() => setShowCreate(true)}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Créer
          </button>
        }
      />

      <div style={{ padding: '16px 20px 0' }}>
        {/* Filter */}
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 14, scrollbarWidth: 'none' }}>
          {['Tous', ...OCCASIONS].map(occ => (
            <button key={occ} className={`tag ${filter === occ ? 'active' : ''}`} onClick={() => setFilter(occ)}>{occ}</button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>👗</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>Aucune tenue</div>
            <div style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 24 }}>Créez votre première combinaison</div>
            <button className="btn-gold" onClick={() => setShowCreate(true)} style={{ width: '100%', maxWidth: 240 }}>Créer une tenue</button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {filtered.map(o => <OutfitCard key={o.id} outfit={o} />)}
          </div>
        )}
      </div>

      {showCreate && <CreateOutfitModal items={items} onClose={() => setShowCreate(false)} onSave={outfit => { addOutfit(outfit); setShowCreate(false) }} />}
    </div>
  )
}

function CreateOutfitModal({ items, onClose, onSave }) {
  const [name, setName] = useState('')
  const [occasion, setOccasion] = useState('')
  const [selected, setSelected] = useState([])

  const toggle = (id) => setSelected(s => s.includes(id) ? s.filter(i => i !== id) : [...s, id])

  const handleSave = () => {
    if (!name || selected.length === 0) return
    onSave({ name, occasion: occasion || 'Casual', items: selected, season: 'Toutes saisons' })
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(26,25,22,0.6)',
      zIndex: 200, display: 'flex', alignItems: 'flex-end',
      backdropFilter: 'blur(4px)',
    }} onClick={onClose}>
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: 'var(--bg)', borderRadius: '24px 24px 0 0',
          width: '100%', maxWidth: 430, margin: '0 auto',
          maxHeight: '90dvh', overflow: 'auto',
          padding: '24px 20px 40px',
        }}
      >
        <div style={{ width: 40, height: 4, borderRadius: 2, background: 'var(--border)', margin: '0 auto 20px' }} />
        <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 20 }}>Nouvelle Tenue</div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>Nom de la tenue *</label>
          <input className="input" placeholder="ex: Look bureau moderne" value={name} onChange={e => setName(e.target.value)} />
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>Occasion</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {OCCASIONS.map(occ => (
              <button key={occ} className={`tag ${occasion === occ ? 'active' : ''}`} onClick={() => setOccasion(occ)}>{occ}</button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>Sélectionner des articles *</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
            {items.map(item => (
              <button
                key={item.id}
                onClick={() => toggle(item.id)}
                style={{
                  background: selected.includes(item.id) ? `${item.color}33` : 'var(--surface)',
                  border: selected.includes(item.id) ? `2px solid var(--gold)` : '1.5px solid var(--border)',
                  borderRadius: 12, padding: '10px 8px',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                  cursor: 'pointer', transition: 'all 0.15s',
                }}
              >
                <CategoryEmoji category={item.category} size={28} />
                <div style={{ fontSize: 10, fontWeight: 500, color: 'var(--text)', textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: '100%' }}>{item.name}</div>
              </button>
            ))}
          </div>
        </div>

        <button
          className="btn-gold"
          style={{ width: '100%', opacity: name && selected.length > 0 ? 1 : 0.5 }}
          disabled={!name || selected.length === 0}
          onClick={handleSave}
        >
          Sauvegarder la tenue
        </button>
      </div>
    </div>
  )
}
