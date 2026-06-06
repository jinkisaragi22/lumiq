import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useCartStore from "../store/cartStore";

export default function CartDrawer() {
  const { isOpen, closeCart, items, removeItem, updateQuantity } =
    useCartStore();
  const subtotal = items.reduce((s, i) => s + i.product.price * i.quantity, 0);
  const navigate = useNavigate();

  const handleCheckout = () => {
    closeCart();
    navigate("/checkout");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-[#080F17] border-l border-white/5 z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
              <h2 className="font-display text-lg font-500 text-white">
                Your Cart
              </h2>
              <button
                onClick={closeCart}
                className="p-2 text-white/40 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-white/30">
                  <ShoppingBag size={48} strokeWidth={1} />
                  <p className="font-body text-sm">Your cart is empty</p>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={item.key}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex gap-4 bg-[#0D1B2A] rounded-xl p-4 border border-white/5"
                  >
                    {/* Icon placeholder */}
                    <div className="w-16 h-16 rounded-lg bg-[#122236] flex items-center justify-center flex-shrink-0">
                      {item.product.image ? (
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Zap
                          size={52}
                          className="text-amber-400/60"
                          strokeWidth={1}
                        />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="font-display text-sm font-500 text-white truncate">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-white/40 font-body mt-0.5">
                        {item.variant}
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        {/* Qty controls */}
                        <div className="flex items-center gap-2 bg-[#080F17] rounded-lg border border-white/10 px-2 py-1">
                          <button
                            onClick={() =>
                              updateQuantity(item.key, item.quantity - 1)
                            }
                            className="w-5 h-5 flex items-center justify-center text-white/40 hover:text-white transition-colors text-lg leading-none"
                          >
                            −
                          </button>
                          <span className="w-6 text-center text-sm font-display text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.key, item.quantity + 1)
                            }
                            className="w-5 h-5 flex items-center justify-center text-white/40 hover:text-white transition-colors text-lg leading-none"
                          >
                            +
                          </button>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="font-display text-sm font-500 text-amber-400">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </span>
                          <button
                            onClick={() => removeItem(item.key)}
                            className="text-white/20 hover:text-red-400 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-5 border-t border-white/5 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-white/40 font-body">
                    Subtotal
                  </span>
                  <span className="font-display font-500 text-white text-lg">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full py-3.5 bg-amber-400 text-[#04080F] font-display font-600 text-sm rounded-xl hover:bg-amber-300 active:scale-[0.98] transition-all"
                >
                  Proceed to Checkout
                </button>
                <button
                  onClick={closeCart}
                  className="w-full py-3 text-sm text-white/40 hover:text-white font-body transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
