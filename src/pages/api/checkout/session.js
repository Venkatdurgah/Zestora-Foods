import stripe from '@/lib/stripe'
import prisma from '@/lib/prisma'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const { items, successUrl, cancelUrl, userId } = req.body
  const line_items = items.map(i => ({ price_data: { currency: 'inr', product_data: { name: i.title }, unit_amount: i.price }, quantity: i.quantity }))
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items,
    mode: 'payment',
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: { userId }
  })
  // create order in DB as PENDING
  await prisma.order.create({ data: { userId, items: JSON.stringify(items), amount: items.reduce((s,i)=>s+i.price*i.quantity,0) } })
  res.json({ id: session.id, url: session.url })
}
