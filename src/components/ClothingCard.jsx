import useWardrobeStore from '../store/useWardrobeStore'
import { useNavigate } from 'react-router-dom'

export default function ClothingCard({ item, size = 'md' }) {
  const toggleFavorite = useWardrobeStore(s => s.toggleFavoriteItem)
  const navigate = useNavigate()
  const isSmall = size === 'sm'

  return (
    <div
      className="card animate-in"
      onClick={() => navigate(`/wardrobe/${item.id}`)}
      style={{
        cursor: 'pointer',
        transition: 'transform 0.15s, box-shadow 0.15s',
        boxShadow: 'var(--shadow-sm)',
      }}
      onTouchStart={e => e.currentTarget.style.transform = 'scale(0.98)'}
      onTouchEnd={e => e.currentTarget.style.transform = 'scale(1)'}
    >
      {/* Image area */}
      <div style={{
        height: isSmall ? 120 : 160,
        background: `${item.color}22`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative',
        borderBottom: '1px solid var(--border)',
      }}>
        {item.image ? (
          <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <CategoryEmoji category={item.category} size={isSmall ? 36 : 48} />
        )}
        <button
          onClick={e => { e.stopPropagation(); toggleFavorite(item.id) }}
          style={{
            position: 'absolute', top: 8, right: 8,
            width: 30, height: 30, borderRadius: '50%',
            background: 'rgba(255,255,255,0.9)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: 'none', cursor: 'pointer',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill={item.favorite ? '#C9A84C' : 'none'} stroke={item.favorite ? '#C9A84C' : '#8A8780'} strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
          </svg>
        </button>
        <div style={{
          position: 'absolute', bottom: 8, left: 8,
          background: item.color, width: 16, height: 16,
          borderRadius: '50%', border: '2px solid white',
          boxShadow: 'var(--shadow-sm)',
        }} />
      </div>
      {/* Info */}
      <div style={{ padding: isSmall ? '8px 10px' : '10px 12px' }}>
        <div style={{ fontSize: isSmall ? 12 : 13, fontWeight: 600, color: 'var(--text)', marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</div>
        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{item.category}</div>
        {!isSmall && (
          <div style={{ marginTop: 6, display: 'flex', gap: 4 }}>
            {item.occasion.slice(0, 2).map(occ => (
              <span key={occ} className="tag" style={{ fontSize: 10, padding: '2px 8px' }}>{occ}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export function CategoryEmoji({ category, size = 40 }) {
  const map = {
    'Hauts': '👕',
    'Bas': '👖',
    'Robes': '👗',
    'Traditionnel': '🥻',
    'Chaussures': '👟',
    'Accessoires': '👜',
    'Manteaux': '🧥',
  }
  return <span style={{ fontSize: size }}>{map[category] || '👚'}</span>
}
