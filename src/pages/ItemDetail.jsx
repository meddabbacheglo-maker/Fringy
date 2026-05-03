import { useParams, useNavigate } from 'react-router-dom'
import useWardrobeStore from '../store/useWardrobeStore'
import Header from '../components/Header'
import { CategoryEmoji } from '../components/ClothingCard'

export default function ItemDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getItemById, toggleFavoriteItem, removeItem, incrementWear } = useWardrobeStore()
  const item = getItemById(id)

  if (!item) return (
    <div style={{ padding: '80px 24px', textAlign: 'center' }}>
      <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
      <div style={{ fontSize: 18, fontWeight: 700 }}>Article introuvable</div>
      <button className="btn-gold" style={{ marginTop: 20 }} onClick={() => navigate('/wardrobe')}>Retour</button>
    </div>
  )

  const handleDelete = () => {
    if (window.confirm(`Supprimer "${item.name}" ?`)) {
      removeItem(id)
      navigate('/wardrobe')
    }
  }

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100dvh', paddingBottom: 100 }}>
      <Header
        title={item.name}
        showBack
        action={
          <button onClick={() => toggleFavoriteItem(id)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill={item.favorite ? '#C9A84C' : 'none'} stroke={item.favorite ? '#C9A84C' : 'var(--text-muted)'} strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
            </svg>
          </button>
        }
      />

      <div style={{ paddingTop: 'var(--header-height)' }}>
        {/* Hero image */}
        <div style={{
          height: 260,
          background: `linear-gradient(135deg, ${item.color}33, ${item.color}11)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative',
        }}>
          <CategoryEmoji category={item.category} size={96} />
          <div style={{
            position: 'absolute', bottom: 16, right: 16,
            background: 'white', borderRadius: 'var(--radius-pill)',
            padding: '6px 14px', fontSize: 13, fontWeight: 600,
            border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)',
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: item.color, border: '1.5px solid var(--border)' }} />
            {item.colorName}
          </div>
        </div>

        <div style={{ padding: '20px 20px 0' }}>
          {/* Name & category */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.03em' }}>{item.name}</div>
            <div style={{ fontSize: 15, color: 'var(--text-muted)', marginTop: 4 }}>{item.category} {item.brand && `· ${item.brand}`}</div>
          </div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 24 }}>
            {[
              { label: 'Portés', value: item.wearCount },
              { label: 'Saisons', value: item.season.length },
              { label: 'Occasions', value: item.occasion.length },
            ].map(s => (
              <div key={s.label} style={{
                background: 'var(--surface)', border: '1px solid var(--border)',
                borderRadius: 12, padding: '12px 8px', textAlign: 'center',
              }}>
                <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--gold)' }}>{s.value}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Details */}
          <div className="card" style={{ padding: 16, marginBottom: 16 }}>
            {[
              { label: 'Saisons', value: item.season.join(', ') },
              { label: 'Occasions', value: item.occasion.join(', ') },
              { label: 'Tags', value: item.tags.join(', ') || '—' },
              { label: 'Ajouté le', value: new Date(item.addedAt).toLocaleDateString('fr-MA') },
            ].map(row => (
              <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 10, marginBottom: 10, borderBottom: '1px solid var(--border)', fontSize: 14 }}>
                <span style={{ color: 'var(--text-muted)' }}>{row.label}</span>
                <span style={{ fontWeight: 500, maxWidth: '55%', textAlign: 'right' }}>{row.value}</span>
              </div>
            ))}
          </div>

          {/* Actions */}
          <button
            className="btn-gold"
            style={{ width: '100%', marginBottom: 12 }}
            onClick={() => { incrementWear(id); alert("Porter enregistré !") }}
          >
            Marquer comme porté aujourd'hui
          </button>
          <button
            onClick={handleDelete}
            style={{
              width: '100%', padding: '13px', borderRadius: 'var(--radius-pill)',
              border: '1.5px solid #FFCDD2', background: 'transparent',
              color: '#C62828', fontSize: 15, fontWeight: 500, cursor: 'pointer',
            }}
          >
            Supprimer l'article
          </button>
        </div>
      </div>
    </div>
  )
}
