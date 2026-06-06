import Hero from '../components/Hero'
import Features from '../components/Features'
import ProductCard from '../components/ProductCard'
import Testimonials from '../components/Testimonials'
import Footer from '../components/Footer'
import { products } from '../data/products'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />

      {/* Products Section */}
      <section id="products" className="py-24 bg-[#04080F]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <p className="text-xs font-body tracking-widest uppercase text-amber-400/60 mb-3">
              The Collection
            </p>
            <h2 className="font-display text-4xl font-600 text-white">
              Find your light.
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-[#080F17]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-xs font-body tracking-widest uppercase text-amber-400/60 mb-3">
              Setup
            </p>
            <h2 className="font-display text-4xl font-600 text-white">
              Up and running in minutes.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connector line (desktop) */}
            <div className="hidden md:block absolute top-8 left-1/4 right-1/4 h-px bg-white/5" />

            {[
              { step: '01', title: 'Plug it in', desc: 'Connect your Lumiq device to any standard outlet or USB port.' },
              { step: '02', title: 'Download the app', desc: 'Available on iOS and Android. Pair in under 30 seconds.' },
              { step: '03', title: 'Set your scene', desc: 'Choose from presets or build your own lighting schedules.' },
            ].map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#0D1B2A] border border-white/5 flex items-center justify-center mx-auto mb-6">
                  <span className="font-display font-600 text-amber-400 text-lg">{s.step}</span>
                </div>
                <h3 className="font-display font-500 text-white text-lg mb-2">{s.title}</h3>
                <p className="font-body text-sm text-white/40 leading-relaxed max-w-xs mx-auto">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
      <Footer />
    </main>
  )
}
