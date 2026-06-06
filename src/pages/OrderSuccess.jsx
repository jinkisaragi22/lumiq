import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Zap } from 'lucide-react'

export default function OrderSuccess() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-[#04080F] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-sm"
      >
        <div className="w-20 h-20 rounded-full bg-amber-400/10 border border-amber-400/20 flex items-center justify-center mx-auto mb-6">
          <Zap size={36} className="text-amber-400" fill="currentColor" />
        </div>
        <h1 className="font-display text-3xl font-600 text-white mb-3">Order placed!</h1>
        <p className="font-body text-white/40 text-sm mb-8">
          Thank you for your order. You'll receive a confirmation shortly.
        </p>
        <button
          onClick={() => navigate('/')}
          className="w-full py-3.5 bg-amber-400 text-[#04080F] font-display font-600 text-sm rounded-xl hover:bg-amber-300 transition-all"
        >
          Back to Home
        </button>
      </motion.div>
    </div>
  )
}