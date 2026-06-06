import { create } from 'zustand'

const useCartStore = create((set, get) => ({
  items: [],
  isOpen: false,

  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

  addItem: (product, variant, quantity = 1) => {
    const { items } = get()
    const key = `${product.id}-${variant}`
    const existing = items.find((i) => i.key === key)

    if (existing) {
      set({
        items: items.map((i) =>
          i.key === key ? { ...i, quantity: i.quantity + quantity } : i
        ),
      })
    } else {
      set({
        items: [
          ...items,
          {
            key,
            product,
            variant,
            quantity,
          },
        ],
      })
    }
    set({ isOpen: true })
  },

  removeItem: (key) =>
    set((state) => ({
      items: state.items.filter((i) => i.key !== key),
    })),

  updateQuantity: (key, quantity) => {
    if (quantity <= 0) {
      get().removeItem(key)
      return
    }
    set((state) => ({
      items: state.items.map((i) =>
        i.key === key ? { ...i, quantity } : i
      ),
    }))
  },

  clearCart: () => set({ items: [] }),

  get totalItems() {
    return get().items.reduce((sum, i) => sum + i.quantity, 0)
  },

  get subtotal() {
    return get().items.reduce(
      (sum, i) => sum + i.product.price * i.quantity,
      0
    )
  },
}))

export default useCartStore
