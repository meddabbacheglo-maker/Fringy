import { create } from 'zustand'

const sampleItems = [
  { id: '1', name: 'Kaftan Brodé', category: 'Traditionnel', color: '#C9A84C', colorName: 'Or', brand: 'Artisanat Fès', season: ['Été', 'Printemps'], occasion: ['Fête', 'Mariage'], image: null, tags: ['kaftan', 'brodé', 'cérémonie'], favorite: true, wearCount: 3, addedAt: new Date('2024-01-10') },
  { id: '2', name: 'Djellaba Classique', category: 'Traditionnel', color: '#F4F0E8', colorName: 'Crème', brand: 'Made in Morocco', season: ['Hiver', 'Automne'], occasion: ['Quotidien', 'Prière'], image: null, tags: ['djellaba', 'hiver'], favorite: false, wearCount: 12, addedAt: new Date('2024-01-15') },
  { id: '3', name: 'Chemise Lin Blanc', category: 'Hauts', color: '#FFFFFF', colorName: 'Blanc', brand: 'H&M', season: ['Été', 'Printemps'], occasion: ['Casual', 'Travail'], image: null, tags: ['lin', 'casual'], favorite: true, wearCount: 8, addedAt: new Date('2024-02-01') },
  { id: '4', name: 'Jean Slim Bleu', category: 'Bas', color: '#1A3A5C', colorName: 'Bleu', brand: 'Zara', season: ['Toutes saisons'], occasion: ['Casual', 'Travail'], image: null, tags: ['denim', 'slim'], favorite: false, wearCount: 20, addedAt: new Date('2024-01-05') },
  { id: '5', name: 'Babouches Dorées', category: 'Chaussures', color: '#C9A84C', colorName: 'Or', brand: 'Artisanat Marrakech', season: ['Toutes saisons'], occasion: ['Fête', 'Casual'], image: null, tags: ['babouches', 'artisanat'], favorite: true, wearCount: 6, addedAt: new Date('2024-02-10') },
  { id: '6', name: 'Blazer Camel', category: 'Hauts', color: '#C4A882', colorName: 'Camel', brand: 'Mango', season: ['Automne', 'Hiver'], occasion: ['Travail', 'Soirée'], image: null, tags: ['blazer', 'smart'], favorite: false, wearCount: 5, addedAt: new Date('2024-02-15') },
  { id: '7', name: 'Robe Florales', category: 'Robes', color: '#E8C4C4', colorName: 'Rose', brand: 'Zara', season: ['Été', 'Printemps'], occasion: ['Casual', 'Sortie'], image: null, tags: ['robe', 'floral'], favorite: true, wearCount: 4, addedAt: new Date('2024-03-01') },
  { id: '8', name: 'Jabador Bleu Roi', category: 'Traditionnel', color: '#1A3A8C', colorName: 'Bleu Roi', brand: 'Artisanat', season: ['Toutes saisons'], occasion: ['Fête', 'Mariage', 'Prière'], image: null, tags: ['jabador', 'cérémonie'], favorite: false, wearCount: 2, addedAt: new Date('2024-03-05') },
]

const sampleOutfits = [
  { id: 'o1', name: 'Look Bureau Moderne', items: ['3', '4', '6'], occasion: 'Travail', season: 'Toutes saisons', favorite: true, createdAt: new Date('2024-03-10') },
  { id: 'o2', name: 'Cérémonie Traditionnelle', items: ['1', '5'], occasion: 'Mariage', season: 'Été', favorite: true, createdAt: new Date('2024-03-12') },
  { id: 'o3', name: 'Weekend Décontracté', items: ['3', '4', '5'], occasion: 'Casual', season: 'Printemps', favorite: false, createdAt: new Date('2024-03-15') },
]

export const CATEGORIES = ['Tous', 'Hauts', 'Bas', 'Robes', 'Traditionnel', 'Chaussures', 'Accessoires', 'Manteaux']
export const OCCASIONS = ['Casual', 'Travail', 'Fête', 'Mariage', 'Soirée', 'Sport', 'Prière', 'Sortie', 'Quotidien']
export const SEASONS = ['Toutes saisons', 'Printemps', 'Été', 'Automne', 'Hiver']
export const COLORS = [
  { name: 'Blanc', hex: '#FFFFFF' },
  { name: 'Noir', hex: '#1A1916' },
  { name: 'Or', hex: '#C9A84C' },
  { name: 'Camel', hex: '#C4A882' },
  { name: 'Bleu', hex: '#1A3A5C' },
  { name: 'Rouge', hex: '#C9283E' },
  { name: 'Vert', hex: '#2D6A4F' },
  { name: 'Rose', hex: '#E8C4C4' },
  { name: 'Crème', hex: '#F4F0E8' },
  { name: 'Gris', hex: '#8A8780' },
]

const useWardrobeStore = create((set, get) => ({
  items: sampleItems,
  outfits: sampleOutfits,
  selectedCategory: 'Tous',
  searchQuery: '',
  activeOccasion: null,

  addItem: (item) => set((s) => ({
    items: [...s.items, { ...item, id: Date.now().toString(), wearCount: 0, addedAt: new Date(), favorite: false }]
  })),

  updateItem: (id, updates) => set((s) => ({
    items: s.items.map(i => i.id === id ? { ...i, ...updates } : i)
  })),

  removeItem: (id) => set((s) => ({
    items: s.items.filter(i => i.id !== id),
    outfits: s.outfits.map(o => ({ ...o, items: o.items.filter(iid => iid !== id) }))
  })),

  toggleFavoriteItem: (id) => set((s) => ({
    items: s.items.map(i => i.id === id ? { ...i, favorite: !i.favorite } : i)
  })),

  incrementWear: (id) => set((s) => ({
    items: s.items.map(i => i.id === id ? { ...i, wearCount: i.wearCount + 1 } : i)
  })),

  addOutfit: (outfit) => set((s) => ({
    outfits: [...s.outfits, { ...outfit, id: Date.now().toString(), createdAt: new Date(), favorite: false }]
  })),

  toggleFavoriteOutfit: (id) => set((s) => ({
    outfits: s.outfits.map(o => o.id === id ? { ...o, favorite: !o.favorite } : o)
  })),

  removeOutfit: (id) => set((s) => ({
    outfits: s.outfits.filter(o => o.id !== id)
  })),

  setSelectedCategory: (cat) => set({ selectedCategory: cat }),
  setSearchQuery: (q) => set({ searchQuery: q }),
  setActiveOccasion: (occ) => set({ activeOccasion: occ }),

  getFilteredItems: () => {
    const { items, selectedCategory, searchQuery, activeOccasion } = get()
    return items.filter(item => {
      const matchCat = selectedCategory === 'Tous' || item.category === selectedCategory
      const matchSearch = !searchQuery || item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.tags.some(t => t.includes(searchQuery.toLowerCase()))
      const matchOcc = !activeOccasion || item.occasion.includes(activeOccasion)
      return matchCat && matchSearch && matchOcc
    })
  },

  getItemById: (id) => get().items.find(i => i.id === id),

  getStats: () => {
    const { items, outfits } = get()
    const totalWears = items.reduce((sum, i) => sum + i.wearCount, 0)
    const categories = [...new Set(items.map(i => i.category))].length
    return { totalItems: items.length, totalOutfits: outfits.length, totalWears, categories }
  },
}))

export default useWardrobeStore
