import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";

export default function ProductCard({ product, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        to={`/product/${product.id}`}
        className="block group relative bg-[#0D1B2A] rounded-2xl border border-white/5 overflow-hidden hover:border-white/10 transition-all"
      >
        {/* Badge */}
        {product.badge && (
          <div className="absolute top-4 left-4 z-10">
            <span className="text-[10px] font-display font-600 uppercase tracking-wider bg-amber-400/10 text-amber-400 border border-amber-400/20 rounded-full px-2.5 py-1">
              {product.badge}
            </span>
          </div>
        )}

        {/* Product image area */}
        <div className="h-52 flex items-center justify-center bg-[#080F17] border-b border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 rounded-full border border-white/5" />
            <div className="absolute w-20 h-20 rounded-full bg-amber-400/5 blur-2xl" />
          </div>
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <Zap size={52} className="text-amber-400/60" strokeWidth={1} />
          )}
        </div>

        {/* Info */}
        <div className="p-5">
          <p className="text-xs font-body text-white/30 mb-1">
            {product.tagline}
          </p>
          <h3 className="font-display text-base font-500 text-white mb-3">
            {product.name}
          </h3>

          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="font-display font-600 text-lg text-amber-400">
                ${product.price}
              </span>
              <span className="text-xs text-white/20 line-through">
                ${product.originalPrice}
              </span>
            </div>
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-amber-400/10 group-hover:text-amber-400 transition-all text-white/40">
              <ArrowRight size={14} />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
