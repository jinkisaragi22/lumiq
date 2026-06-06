import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowLeft, Zap, ShieldCheck } from "lucide-react";
import { getProductById } from "../data/products";
import useCartStore from "../store/cartStore";
import Footer from "../components/Footer";

export default function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = getProductById(id);
  const { addItem } = useCartStore();

  const [selectedVariant, setSelectedVariant] = useState(
    product?.defaultVariant || "",
  );
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-white/40">Product not found.</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product, selectedVariant, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <main className="min-h-screen bg-[#04080F] pt-24">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-white/30 hover:text-white transition-colors mb-10 font-body"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Product Visual */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="sticky top-24 bg-[#080F17] rounded-3xl border border-white/5 h-96 flex items-center justify-center relative overflow-hidden"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 rounded-full border border-amber-400/5" />
              <div className="absolute w-40 h-40 rounded-full bg-amber-400/5 blur-3xl" />
            </div>
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <Zap size={80} className="text-amber-400/60" strokeWidth={1} />
            )}
            {product.badge && (
              <div className="absolute top-5 left-5">
                <span className="text-[10px] font-display font-600 uppercase tracking-wider bg-amber-400/10 text-amber-400 border border-amber-400/20 rounded-full px-3 py-1">
                  {product.badge}
                </span>
              </div>
            )}
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-body text-white/30 mb-2">
              {product.tagline}
            </p>
            <h1 className="font-display text-4xl font-600 text-white mb-4">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-display text-3xl font-600 text-amber-400">
                ${product.price}
              </span>
              <span className="text-lg text-white/20 line-through">
                ${product.originalPrice}
              </span>
              <span className="text-xs font-display bg-green-500/10 text-green-400 border border-green-500/20 rounded-full px-2.5 py-1">
                Save ${product.originalPrice - product.price}
              </span>
            </div>

            <p className="font-body text-white/50 text-sm leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Variants */}
            <div className="mb-6">
              <p className="text-xs font-display font-500 text-white/40 uppercase tracking-wider mb-3">
                {product.id === 3 ? "Color" : "Color Temperature"}
              </p>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v) => (
                  <button
                    key={v}
                    onClick={() => setSelectedVariant(v)}
                    className={`px-4 py-2 rounded-xl text-sm font-body border transition-all ${
                      selectedVariant === v
                        ? "border-amber-400 text-amber-400 bg-amber-400/5"
                        : "border-white/10 text-white/40 hover:border-white/20 hover:text-white/70"
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <p className="text-xs font-display font-500 text-white/40 uppercase tracking-wider mb-3">
                Quantity
              </p>
              <div className="inline-flex items-center gap-3 bg-[#0D1B2A] border border-white/10 rounded-xl px-4 py-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-white/40 hover:text-white transition-colors text-xl leading-none w-6 text-center"
                >
                  −
                </button>
                <span className="font-display font-500 text-white w-6 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-white/40 hover:text-white transition-colors text-xl leading-none w-6 text-center"
                >
                  +
                </button>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={handleAddToCart}
              className={`w-full py-4 rounded-2xl font-display font-600 text-sm transition-all active:scale-[0.98] flex items-center justify-center gap-2 ${
                added
                  ? "bg-green-500 text-white"
                  : "bg-amber-400 text-[#04080F] hover:bg-amber-300"
              }`}
            >
              <AnimatePresence mode="wait">
                {added ? (
                  <motion.span
                    key="added"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="flex items-center gap-2"
                  >
                    <Check size={16} /> Added to Cart
                  </motion.span>
                ) : (
                  <motion.span
                    key="add"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                  >
                    Add to Cart — ${(product.price * quantity).toFixed(2)}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Trust badge */}
            <div className="flex items-center gap-2 mt-4 justify-center text-xs font-body text-white/20">
              <ShieldCheck size={14} />
              Free shipping over $75 · 30-day returns · 3-year warranty
            </div>

            {/* Features list */}
            <div className="mt-10 pt-8 border-t border-white/5">
              <p className="text-xs font-display font-500 text-white/40 uppercase tracking-wider mb-4">
                What's included
              </p>
              <ul className="space-y-3">
                {product.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-3 text-sm font-body text-white/50"
                  >
                    <Zap
                      size={14}
                      className="text-amber-400 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                    />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
