import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import ClothingCard from '../components/ClothingCard'
import useWardrobeStore, { CATEGORIES } from '../store/useWardrobeStore'

export default function Wardrobe() {
  const navigate = useNavigate()
  const { selectedCategory, setSelectedCategory, searchQuery, setSearchQuery, getFilteredItems } = useWardrobeStore()
  const [viewMode, setViewMode] = useState('grid')
  const items = getFilteredItems()

  return (
    <div className="page" style={{ background: 'var(--bg)' }}>
      <Header
        title="Garde-robe"
        subtitle={`${items.length} article${items.length !== 1 ? 's' : ''}`}
        action={
          <button
            onClick={() => navigate('/wardrobe/add')}
            className="btn-gold"
            style={{ padding: '8px 16px', fontSize: 14 }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Ajouter
          </button>
        }
      />

      <div style={{ padding: '16px 20px 0' }}>
        {/* Search */}
        <div style={{ position: 'relative', marginBottom: 14 }}>
          <svg style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            className="input"
            style={{ paddingLeft: 42 }}
            placeholder="Rechercher un article..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Categories */}
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 12, scrollbarWidth: 'none' }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`tag ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* View toggle */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }}>
          {['grid', 'list'].map(mode => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              style={{
                width: 32, height: 32, borderRadius: 8,
                background: viewMode === mode ? 'var(--gold)' : 'var(--surface)',
                border: '1px solid var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', marginLeft: 4,
              }}
            >
              {mode === 'grid' ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={viewMode === 'grid' ? 'white' : 'var(--text-muted)'} strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={viewMode === 'list' ? 'white' : 'var(--text-muted)'} strokeWidth="2">
                  <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Items */}
      <div style={{ padding: '0 20px' }}>
        {items.length === 0 ? (
          <EmptyState onAdd={() => navigate('/wardrobe/add')} />
        ) : viewMode === 'grid' ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
            {items.map(item => <ClothingCard key={item.id} item={item} />)}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {items.map(item => <ListItem key={item.id} item={item} />)}
          </div>
        )}
      </div>
    </div>
  )
}

function ListItem({ item }) {
  const navigate = useNavigate()
  const toggleFavorite = useWardrobeStore(s => s.toggleFavoriteItem)
  return (
    <div
      className="card"
      onClick={() => navigate(`/wardrobe/${item.id}`)}
      style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 14px', cursor: 'pointer', boxShadow: 'var(--shadow-sm)' }}
    >
      <div style={{
        width: 52, height: 52, borderRadius: 10, flexShrink: 0,
        background: `${item.color}22`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        border: '1px solid var(--border)',
        fontSize: 24,
      }}>
        {getCategoryEmoji(item.category)}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</div>
        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{item.category} · {item.brand}</div>
      </div>
      <button onClick={e => { e.stopPropagation(); toggleFavorite(item.id) }} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill={item.favorite ? '#C9A84C' : 'none'} stroke={item.favorite ? '#C9A84C' : '#8A8780'} strokeWidth="2">
          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
        </svg>
      </button>
    </div>
  )
}

function getCategoryEmoji(cat) {
  const map = { 'Hauts': '👕', 'Bas': '👖', 'Robes': '👗', 'Traditionnel': '🥻', 'Chaussures': '👟', 'Accessoires': '👜', 'Manteaux': '🧥' }
  return map[cat] || '👚'
}

function EmptyState({ onAdd }) {
  return (
    <div style={{ textAlign: 'center', padding: '60px 20px' }}>
      <div style={{ fontSize: 56, marginBottom: 16 }}>👗</div>
      <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>Garde-robe vide</div>
      <div style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 24 }}>Ajoutez vos premiers articles pour commencer</div>
      <button className="btn-gold" onClick={onAdd} style={{ width: '100%', maxWidth: 240 }}>Ajouter un article</button>
    </div>
  )
}
