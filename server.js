import express from 'express'
import Stripe from 'stripe'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const stripe = new Stripe(process.env.VITE_STRIPE_SECRET_KEY)

app.use(cors())
app.use(express.json())

app.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // convert to cents
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
    })

    res.json({ clientSecret: paymentIntent.client_secret })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

app.listen(4000, () => console.log('Server running on port 4000'))