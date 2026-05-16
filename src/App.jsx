import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom'
import { supabase } from './lib/supabase'
import useWardrobeStore from './store/useWardrobeStore'
import BottomNav from './components/BottomNav'
import Landing from './pages/Landing'
import Auth from './pages/Auth'
import Home from './pages/Home'
import Wardrobe from './pages/Wardrobe'
import Outfits from './pages/Outfits'
import Stylist from './pages/Stylist'
import Profile from './pages/Profile'
import AddItem from './pages/AddItem'
import ItemDetail from './pages/ItemDetail'

const PUBLIC_PATHS = ['/', '/auth']

function AuthGuard({ children }) {
  const { user, authLoading, setUser, fetchItems, fetchProfile } = useWardrobeStore()
  const navigate  = useNavigate()
  const location  = useLocation()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      const u = session?.user ?? null
      setUser(u)
      if (u) { fetchItems(); fetchProfile() }
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      const u = session?.user ?? null
      setUser(u)
      if (event === 'SIGNED_IN') { fetchItems(); fetchProfile() }
    })

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (authLoading) return
    const isPublic = PUBLIC_PATHS.includes(location.pathname)
    if (!user && !isPublic) navigate('/auth', { replace: true })
    if (user && isPublic) navigate('/home', { replace: true })
  }, [user, authLoading, location.pathname])

  if (authLoading) return <Splash />
  return children
}

function Splash() {
  return (
    <div style={{
      height: '100dvh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      background: '#0D0D0A',
    }}>
      <div style={{ fontSize: 36, fontWeight: 800, letterSpacing: '-0.04em', color: '#FFFFFF' }}>
        Clo<span style={{ color: '#C9A84C' }}>zy</span>
      </div>
      <div style={{ marginTop: 24, width: 32, height: 32 }}>
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16" cy="16" r="13" stroke="rgba(201,168,76,0.2)" strokeWidth="3"/>
          <path d="M16 3 A13 13 0 0 1 29 16" stroke="#C9A84C" strokeWidth="3" strokeLinecap="round">
            <animateTransform attributeName="transform" type="rotate" from="0 16 16" to="360 16 16" dur="0.9s" repeatCount="indefinite"/>
          </path>
        </svg>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthGuard>
        <Routes>
          <Route path="/"               element={<Landing />} />
          <Route path="/auth"           element={<Auth />} />
          <Route path="/home"           element={<Home />} />
          <Route path="/wardrobe"       element={<Wardrobe />} />
          <Route path="/wardrobe/add"   element={<AddItem />} />
          <Route path="/wardrobe/:id"   element={<ItemDetail />} />
          <Route path="/outfits"        element={<Outfits />} />
          <Route path="/stylist"        element={<Stylist />} />
          <Route path="/profile"        element={<Profile />} />
          <Route path="*"              element={<Navigate to="/" replace />} />
        </Routes>
        <BottomNav />
      </AuthGuard>
    </BrowserRouter>
  )
}
