import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Company from './pages/Company'
import Solutions from './pages/Solutions'
import SolutionDetail from './pages/SolutionDetail'
import Products from './pages/Products'
import Sustainability from './pages/Sustainability'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="company" element={<Company />} />
        <Route path="solutions" element={<Solutions />} />
        <Route path="solutions/:slug" element={<SolutionDetail />} />
        <Route path="products" element={<Products />} />
        <Route path="sustainability" element={<Sustainability />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
