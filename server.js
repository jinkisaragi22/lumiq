import express from "express";
import Stripe from "stripe";
import cors from "cors";
import dotenv from "dotenv";
import { Resend } from "resend";

dotenv.config();

const app = express();
const stripe = new Stripe(process.env.VITE_STRIPE_SECRET_KEY);
const resend = new Resend(process.env.VITE_RESEND_API_KEY);

app.use(cors());
app.use(express.json());

app.post("/create-payment-intent", async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // convert to cents
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post("/send-confirmation", async (req, res) => {
  const { email, items, total, orderId } = req.body;

  console.log('Received:', { email, items, total, orderId })

  const itemRows = items
    .map(
      (item) => `
    <tr>
      <td style="padding: 12px 0; border-bottom: 1px solid #1A3047; color: #E8EEF4; font-family: sans-serif; font-size: 14px;">
        ${item.product.name} — ${item.variant}
      </td>
      <td style="padding: 12px 0; border-bottom: 1px solid #1A3047; color: #F5A623; font-family: sans-serif; font-size: 14px; text-align: right;">
        $${(item.product.price * item.quantity).toFixed(2)}
      </td>
    </tr>
  `,
    )
    .join("");

  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: `Your Lumiq order is confirmed ⚡`,
      html: `
        <div style="background: #04080F; padding: 48px 24px; min-height: 100vh;">
          <div style="max-width: 560px; margin: 0 auto;">

            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 40px;">
              <div style="width: 32px; height: 32px; background: #F5A623; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
                <span style="color: #04080F; font-size: 16px;">⚡</span>
              </div>
              <span style="color: #E8EEF4; font-family: sans-serif; font-size: 20px; font-weight: 600; letter-spacing: -0.5px;">lumiq</span>
            </div>

            <h1 style="color: #E8EEF4; font-family: sans-serif; font-size: 28px; font-weight: 600; margin: 0 0 8px;">
              Order confirmed.
            </h1>
            <p style="color: #ffffff60; font-family: sans-serif; font-size: 15px; margin: 0 0 32px; line-height: 1.6;">
              Thanks for your order. We'll send a shipping update once it's on its way.
            </p>

            <div style="background: #080F17; border: 1px solid #1A3047; border-radius: 16px; padding: 24px; margin-bottom: 24px;">
              <p style="color: #ffffff40; font-family: sans-serif; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 16px;">
                Order summary
              </p>
              <table style="width: 100%; border-collapse: collapse;">
                ${itemRows}
                <tr>
                  <td style="padding-top: 16px; color: #ffffff60; font-family: sans-serif; font-size: 14px;">
                    Total
                  </td>
                  <td style="padding-top: 16px; color: #F5A623; font-family: sans-serif; font-size: 18px; font-weight: 600; text-align: right;">
                    $${total.toFixed(2)}
                  </td>
                </tr>
              </table>
            </div>

            <p style="color: #ffffff30; font-family: sans-serif; font-size: 12px; margin: 32px 0 0; line-height: 1.6;">
              Order #${orderId} · If you have any questions, reply to this email.
            </p>

          </div>
        </div>
      `,
    });

    res.json({ success: true });
  } catch (err) {
    console.error("Resend error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(4000, () => console.log("Server running on port 4000"));
