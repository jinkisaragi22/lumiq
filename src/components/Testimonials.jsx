import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const reviews = [
  {
    name: 'Sarah K.',
    role: 'Product Designer',
    text: 'The Desk Pro completely changed how I work at night. The color temperature control is incredibly smooth — no more eye strain after long sessions.',
    rating: 5,
  },
  {
    name: 'Marcus T.',
    role: 'Software Engineer',
    text: "I bought two Ambient packs for my home office setup. The app is intuitive and the scenes are genuinely beautiful. Worth every cent.",
    rating: 5,
  },
  {
    name: 'Anika R.',
    role: 'Content Creator',
    text: 'The Arc is a showpiece. Every guest asks about it. The adaptive sensing is uncanny — it just knows when to dim.',
    rating: 5,
  },
]

export default function Testimonials() {
  return (
    <section className="py-24 bg-[#04080F]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="text-xs font-body tracking-widest uppercase text-amber-400/60 mb-3">
            Reviews
          </p>
          <h2 className="font-display text-4xl font-600 text-white">
            Loved by light enthusiasts.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#080F17] rounded-2xl border border-white/5 p-6"
            >
              <div className="flex gap-0.5 mb-4">
                {Array(r.rating).fill(0).map((_, j) => (
                  <Star key={j} size={13} className="text-amber-400" fill="currentColor" />
                ))}
              </div>
              <p className="font-body text-sm text-white/60 leading-relaxed mb-6">
                "{r.text}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-400/10 border border-amber-400/20 flex items-center justify-center">
                  <span className="text-xs font-display text-amber-400">
                    {r.name[0]}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-display font-500 text-white">{r.name}</p>
                  <p className="text-xs text-white/30 font-body">{r.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
