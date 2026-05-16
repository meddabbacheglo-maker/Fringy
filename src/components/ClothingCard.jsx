import { useNavigate } from 'react-router-dom'
import useWardrobeStore from '../store/useWardrobeStore'

export default function ClothingCard({ item }) {
  const toggleFavorite = useWardrobeStore(s => s.toggleFavoriteItem)
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/wardrobe/${item.id}`)}
      style={{
        background: 'var(--bg)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-card)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-sm)',
        cursor: 'pointer',
        transition: 'transform 0.12s, box-shadow 0.12s',
      }}
      onTouchStart={e => { e.currentTarget.style.transform = 'scale(0.97)'; e.currentTarget.style.boxShadow = 'none' }}
      onTouchEnd={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)' }}
    >
      {/* Photo area — 3:4 ratio */}
      <div style={{ position: 'relative', paddingTop: '133.33%' }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: item.color ? `${item.color}18` : 'var(--surface)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {item.image ? (
            <img
              src={item.image}
              alt={item.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <CategoryIcon category={item.category} />
          )}
        </div>
        {/* Favourite */}
        <button
          onClick={e => { e.stopPropagation(); toggleFavorite(item.id) }}
          style={{
            position: 'absolute', top: 8, right: 8,
            width: 28, height: 28, borderRadius: '50%',
            background: 'rgba(255,255,255,0.90)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 1px 4px rgba(0,0,0,0.12)',
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24"
            fill={item.favorite ? '#C9A84C' : 'none'}
            stroke={item.favorite ? '#C9A84C' : '#AAAAAA'}
            strokeWidth="2"
          >
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
          </svg>
        </button>
        {/* Color dot */}
        {item.color && (
          <div style={{
            position: 'absolute', bottom: 8, left: 8,
            width: 12, height: 12, borderRadius: '50%',
            background: item.color, border: '1.5px solid rgba(255,255,255,0.8)',
            boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
          }} />
        )}
      </div>

      {/* Info */}
      <div style={{ padding: '10px 10px 10px' }}>
        <div style={{
          fontSize: 13, fontWeight: 600, color: 'var(--text)',
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          marginBottom: 2,
        }}>
          {item.name}
        </div>
        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
          {item.category}{item.brand ? ` · ${item.brand}` : ''}
        </div>
      </div>
    </div>
  )
}

function CategoryIcon({ category }) {
  const icons = {
    'Hauts':        { emoji: '👕', bg: '#E3F2FD' },
    'Bas':          { emoji: '👖', bg: '#F3E5F5' },
    'Robes':        { emoji: '👗', bg: '#FCE4EC' },
    'Traditionnel': { emoji: '🥻', bg: '#FFF8E1' },
    'Chaussures':   { emoji: '👟', bg: '#E8F5E9' },
    'Accessoires':  { emoji: '👜', bg: '#FBE9E7' },
    'Manteaux':     { emoji: '🧥', bg: '#ECEFF1' },
    'Vestes':       { emoji: '🧣', bg: '#ECEFF1' },
  }
  const { emoji } = icons[category] || { emoji: '👚' }
  return <span style={{ fontSize: 44, lineHeight: 1 }}>{emoji}</span>
}

export function CategoryEmoji({ category, size = 40 }) {
  const map = {
    'Hauts': '👕', 'Bas': '👖', 'Robes': '👗', 'Traditionnel': '🥻',
    'Chaussures': '👟', 'Accessoires': '👜', 'Manteaux': '🧥', 'Vestes': '🧣',
  }
  return <span style={{ fontSize: size, lineHeight: 1 }}>{map[category] || '👚'}</span>
}

export function SkeletonCard() {
  return (
    <div style={{ borderRadius: 'var(--radius-card)', overflow: 'hidden', background: 'var(--bg)', border: '1px solid var(--border)' }}>
      <div style={{ paddingTop: '133.33%', background: 'var(--surface)', position: 'relative' }}>
        <div className="skeleton" style={{ position: 'absolute', inset: 0 }} />
      </div>
      <div style={{ padding: '10px 10px' }}>
        <div className="skeleton" style={{ height: 13, width: '70%', marginBottom: 6 }} />
        <div className="skeleton" style={{ height: 11, width: '45%' }} />
      </div>
    </div>
  )
}
