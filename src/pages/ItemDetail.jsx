import { useParams, useNavigate } from 'react-router-dom'
import useWardrobeStore from '../store/useWardrobeStore'
import Header from '../components/Header'
import { CategoryEmoji } from '../components/ClothingCard'

export default function ItemDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getItemById, toggleFavoriteItem, removeItem, incrementWear } = useWardrobeStore()
  const item = getItemById(id)

  if (!item) {
    return (
      <div style={{ padding: '80px 24px', textAlign: 'center', minHeight: '100dvh', background: 'var(--bg)' }}>
        <div style={{ fontSize: 52, marginBottom: 14 }}>🔍</div>
        <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>Article introuvable</div>
        <div style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 24 }}>Cet article n'existe pas ou a été supprimé</div>
        <button className="btn-gold" onClick={() => navigate('/wardrobe')} style={{ padding: '12px 28px' }}>
          Retour à la garde-robe
        </button>
      </div>
    )
  }

  const handleDelete = () => {
    if (window.confirm(`Supprimer "${item.name}" ?`)) {
      removeItem(id)
      navigate('/wardrobe')
    }
  }

  const handleWear = () => {
    incrementWear(id)
  }

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100dvh', paddingBottom: 100 }}>
      <Header
        title={item.name}
        showBack
        action={
          <button
            onClick={() => toggleFavoriteItem(id)}
            style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 10, background: 'var(--surface)', border: '1px solid var(--border)' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24"
              fill={item.favorite ? '#C9A84C' : 'none'}
              stroke={item.favorite ? '#C9A84C' : 'var(--text-muted)'}
              strokeWidth="2"
            >
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
            </svg>
          </button>
        }
      />

      <div style={{ paddingTop: 'var(--header-height)' }}>

        {/* Hero */}
        <div style={{
          height: 280, position: 'relative',
          background: item.color ? `${item.color}18` : 'var(--surface)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          borderBottom: '1px solid var(--border)',
        }}>
          {item.image ? (
            <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <CategoryEmoji category={item.category} size={100} />
          )}
          {/* Color badge */}
          <div style={{
            position: 'absolute', bottom: 14, right: 14,
            background: 'rgba(255,255,255,0.92)',
            backdropFilter: 'blur(8px)',
            borderRadius: 20, padding: '5px 12px 5px 8px',
            display: 'flex', alignItems: 'center', gap: 6,
            border: '1px solid var(--border)',
          }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: item.color, border: '1.5px solid rgba(0,0,0,0.08)' }} />
            <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--text)' }}>{item.colorName}</span>
          </div>
          {/* Wear count badge */}
          <div style={{
            position: 'absolute', top: 14, left: 14,
            background: 'rgba(255,255,255,0.92)',
            backdropFilter: 'blur(8px)',
            borderRadius: 20, padding: '5px 12px',
            border: '1px solid var(--border)',
          }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--gold)' }}>
              {item.wearCount}× porté
            </span>
          </div>
        </div>

        <div style={{ padding: '20px 20px 0' }}>

          {/* Name & category */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.03em', marginBottom: 4 }}>
              {item.name}
            </div>
            <div style={{ fontSize: 14, color: 'var(--text-muted)' }}>
              {item.category}{item.brand ? ` · ${item.brand}` : ''}
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 20 }}>
            {[
              { label: 'Portés',   value: item.wearCount },
              { label: 'Saisons',  value: item.season.length },
              { label: 'Occasions',value: item.occasion.length },
            ].map(s => (
              <div key={s.label} style={{
                background: 'var(--surface)', border: '1px solid var(--border)',
                borderRadius: 12, padding: '12px 8px', textAlign: 'center',
              }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--gold)' }}>{s.value}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Details */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden', marginBottom: 20 }}>
            {[
              { label: 'Saisons',   value: item.season.join(', ') || '—' },
              { label: 'Occasions', value: item.occasion.join(', ') || '—' },
              { label: 'Tags',      value: item.tags.join(', ') || '—' },
              { label: 'Ajouté le', value: new Date(item.addedAt).toLocaleDateString('fr-FR') },
            ].map((row, i, arr) => (
              <div key={row.label} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
                padding: '12px 14px',
                borderBottom: i < arr.length - 1 ? '1px solid var(--border)' : 'none',
                fontSize: 14,
              }}>
                <span style={{ color: 'var(--text-muted)', flexShrink: 0, marginRight: 12 }}>{row.label}</span>
                <span style={{ fontWeight: 500, color: 'var(--text)', textAlign: 'right', wordBreak: 'break-word' }}>{row.value}</span>
              </div>
            ))}
          </div>

          {/* Actions */}
          <button
            className="btn-gold"
            style={{ width: '100%', marginBottom: 12 }}
            onClick={handleWear}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
              <path d="M9 12l2 2 4-4"/>
              <path d="M21 12c0 4.97-4.03 9-9 9S3 16.97 3 12 7.03 3 12 3s9 4.03 9 9z"/>
            </svg>
            Marquer comme porté
          </button>
          <button
            onClick={handleDelete}
            style={{
              width: '100%', padding: '13px',
              background: 'none', border: 'none',
              fontSize: 14, fontWeight: 500, color: '#E53935',
              cursor: 'pointer',
            }}
          >
            Supprimer l'article
          </button>
        </div>
      </div>
    </div>
  )
}
