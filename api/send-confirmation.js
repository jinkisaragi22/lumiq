import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { email, items = [], total, orderId } = req.body

  const itemRows = items.map(item => `
    <tr>
      <td style="padding: 12px 0; border-bottom: 1px solid #1A3047; color: #E8EEF4; font-family: sans-serif; font-size: 14px;">
        ${item.product.name} — ${item.variant}
      </td>
      <td style="padding: 12px 0; border-bottom: 1px solid #1A3047; color: #F5A623; font-family: sans-serif; font-size: 14px; text-align: right;">
        $${(item.product.price * item.quantity).toFixed(2)}
      </td>
    </tr>
  `).join('')

  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Your Lumiq order is confirmed ⚡',
      html: `
        <div style="background: #04080F; padding: 48px 24px;">
          <div style="max-width: 560px; margin: 0 auto;">
            <div style="margin-bottom: 40px;">
              <span style="color: #E8EEF4; font-family: sans-serif; font-size: 20px; font-weight: 600;">⚡ lumiq</span>
            </div>
            <h1 style="color: #E8EEF4; font-family: sans-serif; font-size: 28px; font-weight: 600; margin: 0 0 8px;">Order confirmed.</h1>
            <p style="color: #ffffff60; font-family: sans-serif; font-size: 15px; margin: 0 0 32px;">Thanks for your order. We'll send a shipping update once it's on its way.</p>
            <div style="background: #080F17; border: 1px solid #1A3047; border-radius: 16px; padding: 24px; margin-bottom: 24px;">
              <p style="color: #ffffff40; font-family: sans-serif; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 16px;">Order summary</p>
              <table style="width: 100%; border-collapse: collapse;">
                ${itemRows}
                <tr>
                  <td style="padding-top: 16px; color: #ffffff60; font-family: sans-serif; font-size: 14px;">Total</td>
                  <td style="padding-top: 16px; color: #F5A623; font-family: sans-serif; font-size: 18px; font-weight: 600; text-align: right;">$${total.toFixed(2)}</td>
                </tr>
              </table>
            </div>
            <p style="color: #ffffff30; font-family: sans-serif; font-size: 12px; margin: 32px 0 0;">Order #${orderId}</p>
          </div>
        </div>
      `,
    })
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}