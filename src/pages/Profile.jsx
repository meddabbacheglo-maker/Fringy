import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import useWardrobeStore, { OCCASIONS, SEASONS } from '../store/useWardrobeStore'

export default function Profile() {
  const { getStats, items, signOut, user, userProfile } = useWardrobeStore()
  const navigate = useNavigate()
  const stats = getStats()

  const displayName = userProfile?.full_name || user?.user_metadata?.full_name || ''
  const displayEmail = user?.email || ''
  const avatarLetter = (displayName || displayEmail || '?')[0].toUpperCase()

  const categoryBreakdown = items.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1
    return acc
  }, {})
  const topCategory = Object.entries(categoryBreakdown).sort((a, b) => b[1] - a[1])[0]

  const [favOccasions, setFavOccasions] = useState(['Casual', 'Travail'])
  const [favSeasons, setFavSeasons] = useState(['Printemps', 'Été'])

  const toggleOcc = v => setFavOccasions(p => p.includes(v) ? p.filter(x => x !== v) : [...p, v])
  const toggleSea = v => setFavSeasons(p => p.includes(v) ? p.filter(x => x !== v) : [...p, v])

  return (
    <div className="page" style={{ background: 'var(--bg)' }}>
      <Header title="Profil" />

      <div style={{ padding: '12px 20px 0' }}>

        {/* Avatar + info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
          <div style={{
            width: 68, height: 68, borderRadius: '50%', flexShrink: 0,
            background: 'linear-gradient(135deg, #C9A84C, #A8843A)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 26, fontWeight: 700, color: 'white',
            boxShadow: '0 4px 16px rgba(201,168,76,0.30)',
          }}>
            {avatarLetter}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {displayName || 'Mon Profil'}
            </div>
            {displayEmail && (
              <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {displayEmail}
              </div>
            )}
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 24 }}>
          {[
            { label: 'Articles',  value: stats.totalItems },
            { label: 'Tenues',    value: stats.totalOutfits },
            { label: 'Portés',    value: stats.totalWears },
          ].map(s => (
            <div key={s.label} style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 12, padding: '14px 10px', textAlign: 'center',
            }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--gold)', letterSpacing: '-0.02em' }}>
                {s.value}
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 3, fontWeight: 500 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Plan badge */}
        <div style={{
          background: 'linear-gradient(135deg, #1A1A1A, #2D2D2D)',
          borderRadius: 14, padding: '16px 18px', marginBottom: 24,
          display: 'flex', alignItems: 'center', gap: 14,
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10, flexShrink: 0,
            background: 'rgba(201,168,76,0.20)', border: '1px solid rgba(201,168,76,0.30)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round">
              <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z"/>
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'white' }}>Plan Gratuit</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', marginTop: 1 }}>
              Passez à Pro pour plus de fonctionnalités
            </div>
          </div>
          <button style={{
            fontSize: 12, fontWeight: 600, color: '#C9A84C',
            background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.30)',
            borderRadius: 8, padding: '6px 12px', cursor: 'pointer',
          }}>
            Pro
          </button>
        </div>

        {/* Garde-robe breakdown */}
        {Object.entries(categoryBreakdown).length > 0 && (
          <Section title="Ma Garde-robe">
            {Object.entries(categoryBreakdown)
              .sort((a, b) => b[1] - a[1])
              .map(([cat, count]) => (
                <div key={cat} style={{ marginBottom: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 5 }}>
                    <span style={{ fontWeight: 500, color: 'var(--text)' }}>{cat}</span>
                    <span style={{ color: 'var(--text-muted)' }}>{count}</span>
                  </div>
                  <div style={{ height: 5, background: 'var(--border)', borderRadius: 3, overflow: 'hidden' }}>
                    <div style={{
                      height: '100%',
                      width: `${(count / stats.totalItems) * 100}%`,
                      background: 'var(--gold)', borderRadius: 3,
                      transition: 'width 0.5s ease',
                    }} />
                  </div>
                </div>
              ))}
          </Section>
        )}

        {/* Occasions préférées */}
        <Section title="Occasions favorites">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {OCCASIONS.map(occ => (
              <button
                key={occ}
                className={`tag ${favOccasions.includes(occ) ? 'active' : ''}`}
                onClick={() => toggleOcc(occ)}
              >
                {occ}
              </button>
            ))}
          </div>
        </Section>

        {/* Saisons préférées */}
        <Section title="Saisons préférées">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {SEASONS.map(s => (
              <button
                key={s}
                className={`tag ${favSeasons.includes(s) ? 'active' : ''}`}
                onClick={() => toggleSea(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </Section>

        {/* Settings */}
        <Section title="Paramètres">
          {[
            { icon: BellIcon,   label: 'Notifications' },
            { icon: GlobeIcon,  label: 'Langue — Français' },
            { icon: HelpIcon,   label: 'Aide & Support' },
            { icon: ShieldIcon, label: 'Confidentialité' },
          ].map(({ icon: Icon, label }) => (
            <button
              key={label}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 14,
                padding: '13px 0', background: 'none', borderBottom: '1px solid var(--border)',
                cursor: 'pointer',
              }}
            >
              <div style={{ width: 34, height: 34, borderRadius: 10, background: 'var(--surface)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon />
              </div>
              <span style={{ flex: 1, fontSize: 14, fontWeight: 500, color: 'var(--text)', textAlign: 'left' }}>{label}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-light)" strokeWidth="2" strokeLinecap="round">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          ))}
        </Section>

        {/* App info */}
        <div style={{ textAlign: 'center', padding: '8px 0 16px' }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#C9956C', letterSpacing: '0.2em', marginBottom: 3 }}>FRINGY</div>
          <div style={{ fontSize: 12, color: 'var(--text-light)' }}>Version 1.0 · Made in Morocco 🇲🇦</div>
        </div>

        {/* Logout */}
        <button
          onClick={async () => { await signOut(); navigate('/auth', { replace: true }) }}
          style={{
            width: '100%', padding: '14px',
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: 15, fontWeight: 600, color: '#E53935',
            marginBottom: 20,
          }}
        >
          Se déconnecter
        </button>

      </div>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12 }}>
        {title}
      </div>
      {children}
    </div>
  )
}

function BellIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>
}
function GlobeIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
}
function HelpIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
}
function ShieldIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
}
