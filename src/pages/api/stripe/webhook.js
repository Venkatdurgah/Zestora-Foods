import { buffer } from 'micro'
import stripe from '@/lib/stripe'
import prisma from '@/lib/prisma'

export const config = { api: { bodyParser: false } }

export default async function handler(req, res) {
  const sig = req.headers['stripe-signature']
  const buf = await buffer(req)
  let event
  try {
    event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    console.error('Webhook signature verification failed.', err.message)
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    const userId = session.metadata?.userId
    // find the PENDING order for this user and mark as PAID
    const order = await prisma.order.findFirst({ where: { userId, status: 'PENDING' }, orderBy: { createdAt: 'desc' } })
    if (order) {
      await prisma.order.update({ where: { id: order.id }, data: { status: 'PAID', verified: true } })
    }
  }

  res.json({ received: true })
}
