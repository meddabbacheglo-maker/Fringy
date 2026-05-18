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
  const navigate = useNavigate()
  const location = useLocation()
  const [splashDone, setSplashDone] = useState(false)
  const [splashFading, setSplashFading] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setSplashFading(true), 1700)
    const t2 = setTimeout(() => setSplashDone(true), 2000)
    return () => { clearTimeout(t1); clearTimeout(t2) }
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
    if (authLoading || !splashDone) return
    const isPublic = PUBLIC_PATHS.includes(location.pathname)
    if (!user && !isPublic) navigate('/', { replace: true })
    if (user && location.pathname === '/auth') navigate('/home', { replace: true })
  }, [user, authLoading, location.pathname, splashDone])

  if (authLoading || !splashDone) return <Splash fading={splashFading} />
  return children
}

function Splash({ fading }) {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#000000',
      zIndex: 9999,
      opacity: fading ? 0 : 1,
      transition: fading ? 'opacity 0.3s ease' : 'none',
      pointerEvents: fading ? 'none' : 'auto',
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
        <svg width="120" height="22" viewBox="0 0 72 14" fill="none">
          <path
            d="M 0,12 C 15,12 20,2 35,6 C 50,10 55,2 70,6"
            stroke="#C9956C"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
        <div style={{
          fontSize: 32, fontWeight: 900, color: '#FFFFFF',
          letterSpacing: '0.2em', fontFamily: 'Inter, sans-serif',
        }}>
          FRINGY
        </div>
        <div style={{ width: 24, height: 1, background: '#C9956C' }} />
        <div style={{
          fontSize: 11, fontWeight: 400, color: 'rgba(255,255,255,0.60)',
          letterSpacing: '0.3em', fontFamily: 'Inter, sans-serif',
        }}>
          DRESS IT EASY
        </div>
      </div>
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
