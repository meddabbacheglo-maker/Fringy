import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import ClothingCard, { SkeletonCard } from '../components/ClothingCard'
import useWardrobeStore, { CATEGORIES } from '../store/useWardrobeStore'

const SORT_OPTIONS = [
  { id: 'recent', label: 'Récent' },
  { id: 'name',   label: 'Nom' },
  { id: 'worn',   label: 'Portés' },
]

export default function Wardrobe() {
  const navigate = useNavigate()
  const {
    selectedCategory, setSelectedCategory,
    searchQuery, setSearchQuery,
    getFilteredItems, itemsLoading,
  } = useWardrobeStore()
  const [sort, setSort] = useState('recent')
  const [showSort, setShowSort] = useState(false)

  const allItems = getFilteredItems()
  const items = [...allItems].sort((a, b) => {
    if (sort === 'name') return a.name.localeCompare(b.name)
    if (sort === 'worn') return b.wearCount - a.wearCount
    return new Date(b.addedAt) - new Date(a.addedAt)
  })

  const activeSort = SORT_OPTIONS.find(o => o.id === sort)

  return (
    <div className="page" style={{ background: 'var(--bg)' }}>
      <Header
        title="Garde-robe"
        subtitle={itemsLoading ? 'Chargement...' : `${items.length} article${items.length !== 1 ? 's' : ''}`}
      />

      <div style={{ padding: '12px 20px 0' }}>

        {/* Search */}
        <div style={{ position: 'relative', marginBottom: 14 }}>
          <svg style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
            width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            className="input"
            style={{ paddingLeft: 40, borderRadius: 12, background: 'var(--surface)', border: '1.5px solid var(--border)' }}
            placeholder="Rechercher..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          )}
        </div>

        {/* Category filter */}
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

        {/* Sort row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginBottom: 14, position: 'relative' }}>
          <button
            onClick={() => setShowSort(s => !s)}
            style={{
              display: 'flex', alignItems: 'center', gap: 5,
              fontSize: 13, color: 'var(--text-muted)', fontWeight: 500,
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 8, padding: '6px 12px',
            }}
          >
            {activeSort.label}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </button>
          {showSort && (
            <div style={{
              position: 'absolute', top: '110%', right: 0, zIndex: 50,
              background: 'var(--bg)', border: '1px solid var(--border)',
              borderRadius: 12, padding: 6,
              boxShadow: 'var(--shadow-md)',
              minWidth: 120,
            }}>
              {SORT_OPTIONS.map(o => (
                <button
                  key={o.id}
                  onClick={() => { setSort(o.id); setShowSort(false) }}
                  style={{
                    width: '100%', padding: '9px 12px', textAlign: 'left',
                    fontSize: 13, fontWeight: sort === o.id ? 600 : 400,
                    color: sort === o.id ? 'var(--gold)' : 'var(--text)',
                    borderRadius: 8, background: 'none',
                  }}
                >
                  {o.label}
                </button>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Grid */}
      <div style={{ padding: '0 20px' }} onClick={() => showSort && setShowSort(false)}>
        {itemsLoading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : items.length === 0 ? (
          <EmptyWardrobe query={searchQuery} onAdd={() => navigate('/wardrobe/add')} />
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
            {items.map(item => <ClothingCard key={item.id} item={item} />)}
          </div>
        )}
      </div>
    </div>
  )
}

function EmptyWardrobe({ query, onAdd }) {
  return (
    <div style={{ textAlign: 'center', padding: '60px 20px' }}>
      <div style={{ fontSize: 56, marginBottom: 16 }}>
        {query ? '🔍' : '👗'}
      </div>
      <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>
        {query ? 'Aucun résultat' : 'Garde-robe vide'}
      </div>
      <div style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 28, lineHeight: 1.6 }}>
        {query
          ? `Aucun article ne correspond à "${query}"`
          : 'Ajoutez vos premiers articles pour commencer'}
      </div>
      {!query && (
        <button className="btn-gold" onClick={onAdd} style={{ padding: '12px 28px' }}>
          Ajouter un article
        </button>
      )}
    </div>
  )
}
