import useWardrobeStore from '../store/useWardrobeStore'
import { CategoryEmoji } from './ClothingCard'

export default function OutfitCard({ outfit }) {
  const { toggleFavoriteOutfit, removeOutfit, getItemById } = useWardrobeStore()
  const items = outfit.items.map(id => getItemById(id)).filter(Boolean)

  return (
    <div style={{
      background: 'var(--bg)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-card)',
      overflow: 'hidden',
      boxShadow: 'var(--shadow-sm)',
    }}>
      {/* Canvas preview */}
      <div style={{
        background: 'var(--surface)',
        padding: '16px',
        display: 'flex', gap: 8, flexWrap: 'wrap', minHeight: 80,
      }}>
        {items.length === 0 ? (
          <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-light)', fontSize: 13 }}>
            Aucun article
          </div>
        ) : items.map((item, i) => (
          <div key={item.id} style={{
            width: 56, height: 56, borderRadius: 10, flexShrink: 0,
            background: item.color ? `${item.color}20` : 'var(--surface-2)',
            border: '1px solid var(--border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: i === 0 ? 'none' : undefined,
          }}>
            <CategoryEmoji category={item.category} size={26} />
          </div>
        ))}
      </div>

      {/* Info row */}
      <div style={{ padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border)' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {outfit.name}
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>
            {items.length} pièce{items.length !== 1 ? 's' : ''} · {outfit.occasion}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 4, alignItems: 'center', flexShrink: 0 }}>
          <button
            onClick={() => toggleFavoriteOutfit(outfit.id)}
            style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8 }}
          >
            <svg width="17" height="17" viewBox="0 0 24 24"
              fill={outfit.favorite ? '#C9A84C' : 'none'}
              stroke={outfit.favorite ? '#C9A84C' : 'var(--text-muted)'}
              strokeWidth="2"
            >
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
            </svg>
          </button>
          <button
            onClick={() => removeOutfit(outfit.id)}
            style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8 }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6l-1 14H6L5 6"/>
              <path d="M10 11v6M14 11v6"/>
              <path d="M9 6V4h6v2"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
