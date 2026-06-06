import { motion } from 'framer-motion'
import { Sliders, Smartphone, Zap, Wifi, Moon, Shield } from 'lucide-react'

const features = [
  {
    icon: Sliders,
    title: 'Smart Dimming',
    desc: 'Precision control from 1% to 100%. Your eyes, your rules.',
    color: 'text-amber-400',
    bg: 'bg-amber-400/5 border-amber-400/10',
  },
  {
    icon: Smartphone,
    title: 'App Control',
    desc: 'Set scenes, schedules, and moods from your phone in seconds.',
    color: 'text-cyan-400',
    bg: 'bg-cyan-400/5 border-cyan-400/10',
  },
  {
    icon: Zap,
    title: 'Energy Efficient',
    desc: 'Up to 80% less energy than traditional lighting solutions.',
    color: 'text-amber-400',
    bg: 'bg-amber-400/5 border-amber-400/10',
  },
  {
    icon: Wifi,
    title: 'Always Connected',
    desc: 'Wi-Fi and Bluetooth dual-mode for rock-solid connectivity.',
    color: 'text-cyan-400',
    bg: 'bg-cyan-400/5 border-cyan-400/10',
  },
  {
    icon: Moon,
    title: 'Sleep Science',
    desc: 'Circadian rhythm presets that help you wind down naturally.',
    color: 'text-amber-400',
    bg: 'bg-amber-400/5 border-amber-400/10',
  },
  {
    icon: Shield,
    title: '3-Year Warranty',
    desc: 'Built to last. Every Lumiq product is covered, no questions asked.',
    color: 'text-cyan-400',
    bg: 'bg-cyan-400/5 border-cyan-400/10',
  },
]

export default function Features() {
  return (
    <section id="features" className="py-24 bg-[#080F17]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-xs font-body tracking-widest uppercase text-amber-400/60 mb-3">
            Why Lumiq
          </p>
          <h2 className="font-display text-4xl font-600 text-white max-w-md leading-tight">
            Everything you need. Nothing you don't.
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className={`rounded-2xl border p-6 ${f.bg} group hover:border-white/10 transition-colors`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${f.bg} border`}>
                <f.icon size={20} className={f.color} />
              </div>
              <h3 className="font-display text-base font-500 text-white mb-2">{f.title}</h3>
              <p className="font-body text-sm text-white/40 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
