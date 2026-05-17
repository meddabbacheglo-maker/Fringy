import { useEffect, useState } from 'react'
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
  const [splashDone, setSplashDone] = useState(false)

  /* Ensure splash shows for at least 1.5 s */
  useEffect(() => {
    const t = setTimeout(() => setSplashDone(true), 1500)
    return () => clearTimeout(t)
  }, [])

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
    /* Redirect unauthenticated users away from protected routes */
    if (!user && !isPublic) navigate('/', { replace: true })
    /* Redirect authenticated users away from /auth only */
    if (user && location.pathname === '/auth') navigate('/home', { replace: true })
  }, [user, authLoading, location.pathname])

  /* Show white splash until both auth resolved and min 1.5 s elapsed */
  if (authLoading || !splashDone) return <Splash />
  return children
}

function Splash() {
  return (
    <div style={{
      height: '100dvh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#FFFFFF',
    }}>
      <span style={{
        fontSize: 48, fontWeight: 900, letterSpacing: '-0.04em',
        color: '#000000', fontFamily: 'Inter, sans-serif',
      }}>
        Clozy
      </span>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthGuard>
        <Routes>
          <Route path="/"             element={<Landing />} />
          <Route path="/auth"         element={<Auth />} />
          <Route path="/home"         element={<Home />} />
          <Route path="/wardrobe"     element={<Wardrobe />} />
          <Route path="/wardrobe/add" element={<AddItem />} />
          <Route path="/wardrobe/:id" element={<ItemDetail />} />
          <Route path="/outfits"      element={<Outfits />} />
          <Route path="/stylist"      element={<Stylist />} />
          <Route path="/profile"      element={<Profile />} />
          <Route path="*"             element={<Navigate to="/" replace />} />
        </Routes>
        <BottomNav />
      </AuthGuard>
    </BrowserRouter>
  )
}
