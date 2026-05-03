import useWardrobeStore from '../store/useWardrobeStore'
import { CategoryEmoji } from './ClothingCard'

export default function OutfitCard({ outfit }) {
  const { toggleFavoriteOutfit, removeOutfit, getItemById } = useWardrobeStore()
  const items = outfit.items.map(id => getItemById(id)).filter(Boolean)

  return (
    <div className="card animate-in" style={{ boxShadow: 'var(--shadow-sm)', overflow: 'visible' }}>
      {/* Items preview */}
      <div style={{
        padding: '16px 16px 12px',
        display: 'flex', gap: 8, flexWrap: 'wrap',
      }}>
        {items.map(item => (
          <div key={item.id} style={{
            width: 64, height: 64,
            background: `${item.color}22`,
            borderRadius: 10,
            border: '1px solid var(--border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <CategoryEmoji category={item.category} size={28} />
          </div>
        ))}
        {items.length === 0 && (
          <div style={{ color: 'var(--text-muted)', fontSize: 13 }}>Aucun article</div>
        )}
      </div>
      {/* Divider */}
      <div className="divider" />
      {/* Info row */}
      <div style={{ padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>{outfit.name}</div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{items.length} pièce{items.length !== 1 ? 's' : ''} · {outfit.occasion}</div>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button
            onClick={() => toggleFavoriteOutfit(outfit.id)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill={outfit.favorite ? '#C9A84C' : 'none'} stroke={outfit.favorite ? '#C9A84C' : '#8A8780'} strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
            </svg>
          </button>
          <button
            onClick={() => removeOutfit(outfit.id)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round">
              <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
