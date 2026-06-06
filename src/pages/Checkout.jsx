import { useState, useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Zap, ShieldCheck } from 'lucide-react'
import useCartStore from '../store/cartStore'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

// Inner form component
function CheckoutForm({ total, items }) {
  const stripe = useStripe()
  const elements = useElements()
  const navigate = useNavigate()
  const { clearCart } = useCartStore()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [email, setEmail] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!stripe || !elements) return

    setLoading(true)
    setError(null)

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: window.location.origin + '/order-success' },
      redirect: 'if_required',
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    // Send confirmation email
    if (email) {
      await fetch('http://localhost:4000/send-confirmation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          items,
          total,
          orderId: Math.random().toString(36).substring(2, 10).toUpperCase(),
        }),
      })
    }

    clearCart()
    navigate('/order-success')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Email field */}
      <div className="bg-[#080F17] rounded-2xl border border-white/5 p-6">
        <h2 className="font-display text-base font-500 text-white mb-5">Contact</h2>
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full bg-[#0D1B2A] border border-white/10 rounded-xl px-4 py-3 text-sm font-body text-white placeholder-white/20 focus:outline-none focus:border-amber-400/40 transition-colors"
        />
      </div>

      {/* Stripe payment element */}
      <div className="bg-[#080F17] rounded-2xl border border-white/5 p-6">
        <h2 className="font-display text-base font-500 text-white mb-5">Payment details</h2>
        <PaymentElement />
      </div>

      {error && <p className="text-sm text-red-400 font-body">{error}</p>}

      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full py-3.5 bg-amber-400 text-[#04080F] font-display font-600 text-sm rounded-xl hover:bg-amber-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        {loading ? 'Processing...' : `Pay $${total.toFixed(2)}`}
      </button>

      <div className="flex items-center justify-center gap-2 text-xs font-body text-white/20">
        <ShieldCheck size={12} />
        Secured by Stripe
      </div>
    </form>
  )
}

// Main Checkout page
export default function Checkout() {
  const navigate = useNavigate()
  const { items, clearCart } = useCartStore()
  const [clientSecret, setClientSecret] = useState(null)

  const subtotal = items.reduce((s, i) => s + i.product.price * i.quantity, 0)
  const shipping = subtotal >= 75 ? 0 : 9.99
  const total = subtotal + shipping

  useEffect(() => {
    if (items.length === 0) return

    fetch('http://localhost:4000/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: total }),
    })
      .then((r) => r.json())
      .then((data) => setClientSecret(data.clientSecret))
  }, [total])

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-white/40 font-body">Your cart is empty.</p>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-[#04080F] pt-24">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-white/30 hover:text-white transition-colors mb-10 font-body"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <h1 className="font-display text-3xl font-600 text-white mb-10">
          Checkout
        </h1>

        <div className="grid md:grid-cols-5 gap-10">
          {/* Stripe Payment Form */}
          <div className="md:col-span-3">
            {clientSecret ? (
              <Elements
                stripe={stripePromise}
                options={{
                  clientSecret,
                  appearance: {
                    theme: 'night',
                    variables: {
                      colorPrimary: '#F5A623',
                      colorBackground: '#0D1B2A',
                      colorText: '#E8EEF4',
                      borderRadius: '12px',
                    },
                  },
                }}
              >
                <CheckoutForm total={total} items={items} />
              </Elements>
            ) : (
              <div className="h-48 flex items-center justify-center text-white/30 font-body text-sm">
                Loading payment form...
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="md:col-span-2">
            <div className="bg-[#080F17] rounded-2xl border border-white/5 p-6 sticky top-24">
              <h2 className="font-display text-base font-500 text-white mb-5">
                Order summary
              </h2>
              <div className="space-y-3 mb-5">
                {items.map((item) => (
                  <div key={item.key} className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-display text-white">{item.product.name}</p>
                      <p className="text-xs text-white/30 font-body">
                        {item.variant} × {item.quantity}
                      </p>
                    </div>
                    <span className="text-sm font-display text-amber-400">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/5 pt-4 space-y-2 mb-5">
                <div className="flex justify-between text-sm font-body">
                  <span className="text-white/40">Subtotal</span>
                  <span className="text-white">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-body">
                  <span className="text-white/40">Shipping</span>
                  <span className={shipping === 0 ? 'text-green-400' : 'text-white'}>
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center font-display border-t border-white/5 pt-4">
                <span className="text-white font-500">Total</span>
                <span className="text-xl text-amber-400 font-600">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}