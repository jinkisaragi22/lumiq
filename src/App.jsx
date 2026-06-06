import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Product from './pages/Product'
import Checkout from './pages/Checkout'
import Navbar from './components/Navbar'
import CartDrawer from './components/CartDrawer'
import OrderSuccess from './pages/OrderSuccess'

export default function App() {
  return (
    <div className="min-h-screen bg-[#04080F]">
      <Navbar />
      <CartDrawer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />
      </Routes>
    </div>
  )
}
