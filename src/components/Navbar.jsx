import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, Menu, X, Zap } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import useCartStore from '../store/cartStore'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { toggleCart, items } = useCartStore()
  const totalItems = items.reduce((s, i) => s + i.quantity, 0)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#04080F]/90 backdrop-blur-md border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-7 h-7 rounded-md bg-amber-400 flex items-center justify-center">
            <Zap size={15} className="text-[#04080F]" fill="currentColor" />
          </div>
          <span className="font-display font-600 text-lg text-white tracking-tight">
            lumiq
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {['Products', 'Features', 'About'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm text-white/60 hover:text-white transition-colors font-body"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleCart}
            className="relative p-2 text-white/60 hover:text-white transition-colors"
            aria-label="Open cart"
          >
            <ShoppingCart size={20} />
            <AnimatePresence>
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-amber-400 text-[#04080F] text-[10px] font-display font-600 rounded-full flex items-center justify-center"
                >
                  {totalItems}
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          <button
            className="md:hidden p-2 text-white/60 hover:text-white transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#080F17] border-t border-white/5 px-6 pb-4"
          >
            {['Products', 'Features', 'About'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block py-3 text-sm text-white/60 hover:text-white border-b border-white/5 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
