import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BottomNav from './components/BottomNav'
import Landing from './pages/Landing'
import Home from './pages/Home'
import Wardrobe from './pages/Wardrobe'
import Outfits from './pages/Outfits'
import Stylist from './pages/Stylist'
import Profile from './pages/Profile'
import AddItem from './pages/AddItem'
import ItemDetail from './pages/ItemDetail'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/wardrobe" element={<Wardrobe />} />
        <Route path="/wardrobe/add" element={<AddItem />} />
        <Route path="/wardrobe/:id" element={<ItemDetail />} />
        <Route path="/outfits" element={<Outfits />} />
        <Route path="/stylist" element={<Stylist />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <BottomNav />
    </BrowserRouter>
  )
}
