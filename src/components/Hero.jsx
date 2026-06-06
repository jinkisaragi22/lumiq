import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: "easeOut" },
});

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#04080F]">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-amber-400/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full bg-cyan-400/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 pt-24 pb-16 w-full grid md:grid-cols-2 gap-12 items-center">
        {/* Left: Text */}
        <div>
          <motion.div
            {...fadeUp(0.1)}
            className="inline-flex items-center gap-2 border border-amber-400/20 rounded-full px-4 py-1.5 mb-8"
          >
            <Zap size={12} className="text-amber-400" fill="currentColor" />
            <span className="text-xs font-body text-amber-400/80 tracking-wider uppercase">
              Smart Lighting, Reimagined
            </span>
          </motion.div>

          <motion.h1
            {...fadeUp(0.2)}
            className="font-display text-5xl md:text-6xl font-700 text-white leading-[1.05] tracking-tight mb-6"
          >
            Light,
            <br />
            <span className="text-amber-400">perfected.</span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.3)}
            className="font-body text-lg text-white/50 leading-relaxed mb-10 max-w-md"
          >
            Lumiq brings intelligent lighting to every corner of your space.
            Designed for creators. Built for life.
          </motion.p>

          <motion.div {...fadeUp(0.4)} className="flex flex-wrap gap-4">
            <Link
              to="/product/1"
              className="inline-flex items-center gap-2 bg-amber-400 text-[#04080F] font-display font-600 text-sm px-6 py-3.5 rounded-xl hover:bg-amber-300 active:scale-[0.98] transition-all"
            >
              Shop Now
              <ArrowRight size={16} />
            </Link>
            <a
              href="#features"
              className="inline-flex items-center gap-2 border border-white/10 text-white/70 font-display text-sm px-6 py-3.5 rounded-xl hover:border-white/30 hover:text-white transition-all"
            >
              Learn More
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            {...fadeUp(0.5)}
            className="flex gap-8 mt-12 pt-8 border-t border-white/5"
          >
            {[
              { value: "50K+", label: "Happy Customers" },
              { value: "4.9★", label: "Average Rating" },
              { value: "3yr", label: "Warranty" },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="font-display font-600 text-xl text-white">
                  {value}
                </p>
                <p className="text-xs text-white/30 font-body mt-0.5">
                  {label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: Product visual placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
          className="relative flex items-center justify-center"
        >
          <div className="relative w-72 h-72 md:w-96 md:h-96">
            {/* Outer ring */}
            <div className="absolute inset-0 rounded-full border border-amber-400/10 animate-pulse" />
            <div className="absolute inset-6 rounded-full border border-amber-400/10" />
            {/* Center */}
            <div className="absolute inset-12 rounded-full bg-[#0D1B2A] border border-amber-400/20 flex items-center justify-center glow-amber">
              <img
                src="/public/images/desk-lamp-pro.jpg"
                alt="Lumiq Desk Pro"
                className="w-full h-full object-cover rounded-full shadow-lg"
              />
            </div>
            {/* Floating label */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-[#0D1B2A] border border-white/10 rounded-full px-4 py-2 whitespace-nowrap">
              <span className="text-xs font-display text-white/60">
                Lumiq Desk Pro — <span className="text-amber-400">$89</span>
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
