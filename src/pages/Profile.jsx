import { useState } from 'react'
import Header from '../components/Header'
import useWardrobeStore, { OCCASIONS, SEASONS } from '../store/useWardrobeStore'

const CITIES = ['Casablanca', 'Rabat', 'Marrakech', 'Fès', 'Tanger', 'Agadir', 'Oujda', 'Autre']
const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

export default function Profile() {
  const { getStats, items } = useWardrobeStore()
  const stats = getStats()
  const [profile, setProfile] = useState({
    name: 'Youssef El Amrani',
    city: 'Casablanca',
    size: 'M',
    favOccasions: ['Casual', 'Travail'],
    favSeasons: ['Printemps', 'Été'],
  })
  const [editing, setEditing] = useState(false)

  const toggle = (key, val) => setProfile(p => ({
    ...p,
    [key]: p[key].includes(val) ? p[key].filter(v => v !== val) : [...p[key], val]
  }))

  const categoryBreakdown = items.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1
    return acc
  }, {})

  const topCategory = Object.entries(categoryBreakdown).sort((a, b) => b[1] - a[1])[0]

  return (
    <div className="page" style={{ background: 'var(--bg)' }}>
      <Header title="Profil" subtitle="Vos préférences" />

      <div style={{ padding: '16px 20px 0' }}>
        {/* Avatar & Name */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
          <div style={{
            width: 72, height: 72, borderRadius: '50%',
            background: 'linear-gradient(135deg, #C9A84C, #A8843A)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 28, fontWeight: 700, color: 'white',
            boxShadow: '0 4px 16px rgba(201,168,76,0.3)',
          }}>
            {profile.name.charAt(0)}
          </div>
          <div style={{ flex: 1 }}>
            {editing ? (
              <input
                className="input"
                value={profile.name}
                onChange={e => setProfile(p => ({ ...p, name: e.target.value }))}
                style={{ marginBottom: 0, fontSize: 18, fontWeight: 700 }}
              />
            ) : (
              <>
                <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--text)' }}>{profile.name}</div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>📍 {profile.city}</div>
              </>
            )}
          </div>
          <button
            onClick={() => setEditing(!editing)}
            style={{
              width: 36, height: 36, borderRadius: 10,
              background: editing ? 'var(--gold)' : 'var(--surface)',
              border: '1px solid var(--border)', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={editing ? 'white' : 'var(--text-muted)'} strokeWidth="2" strokeLinecap="round">
              {editing
                ? <><polyline points="20 6 9 17 4 12"/></>
                : <><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></>
              }
            </svg>
          </button>
        </div>

        {/* Stats */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 24,
        }}>
          {[
            { label: 'Articles', value: stats.totalItems, icon: '👗' },
            { label: 'Tenues créées', value: stats.totalOutfits, icon: '✨' },
            { label: 'Total portés', value: stats.totalWears, icon: '📅' },
            { label: 'Catégorie favorite', value: topCategory ? topCategory[0] : '—', icon: '🏆' },
          ].map(s => (
            <div key={s.label} style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-card)', padding: '14px 16px',
            }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>{s.icon}</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--text)' }}>{s.value}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* City */}
        <Section title="Ville">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {CITIES.map(city => (
              <button
                key={city}
                className={`tag ${profile.city === city ? 'active' : ''}`}
                onClick={() => editing && setProfile(p => ({ ...p, city }))}
                style={{ opacity: editing ? 1 : profile.city === city ? 1 : 0.6 }}
              >
                {city}
              </button>
            ))}
          </div>
        </Section>

        {/* Size */}
        <Section title="Taille">
          <div style={{ display: 'flex', gap: 8 }}>
            {SIZES.map(s => (
              <button
                key={s}
                className={`tag ${profile.size === s ? 'active' : ''}`}
                onClick={() => editing && setProfile(p => ({ ...p, size: s }))}
              >
                {s}
              </button>
            ))}
          </div>
        </Section>

        {/* Fav Occasions */}
        <Section title="Occasions favorites">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {OCCASIONS.map(occ => (
              <button
                key={occ}
                className={`tag ${profile.favOccasions.includes(occ) ? 'active' : ''}`}
                onClick={() => editing && toggle('favOccasions', occ)}
              >
                {occ}
              </button>
            ))}
          </div>
        </Section>

        {/* Fav Seasons */}
        <Section title="Saisons préférées">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {SEASONS.map(s => (
              <button
                key={s}
                className={`tag ${profile.favSeasons.includes(s) ? 'active' : ''}`}
                onClick={() => editing && toggle('favSeasons', s)}
              >
                {s}
              </button>
            ))}
          </div>
        </Section>

        {/* Wardrobe breakdown */}
        <Section title="Ma Garde-robe">
          {Object.entries(categoryBreakdown).map(([cat, count]) => (
            <div key={cat} style={{ marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 4 }}>
                <span style={{ fontWeight: 500 }}>{cat}</span>
                <span style={{ color: 'var(--text-muted)' }}>{count} article{count > 1 ? 's' : ''}</span>
              </div>
              <div style={{ height: 6, background: 'var(--border)', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: `${(count / stats.totalItems) * 100}%`,
                  background: 'linear-gradient(90deg, var(--gold-light), var(--gold))',
                  borderRadius: 3,
                  transition: 'width 0.5s ease',
                }} />
              </div>
            </div>
          ))}
        </Section>

        {/* App info */}
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-card)', padding: 20, marginBottom: 20,
          textAlign: 'center',
        }}>
          <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--gold)', letterSpacing: '-0.03em', marginBottom: 4 }}>Fringy</div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Version 1.0 · Made in Morocco 🇲🇦</div>
        </div>
      </div>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 12 }}>{title}</div>
      {children}
    </div>
  )
}
