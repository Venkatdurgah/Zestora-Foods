import prisma from '@/lib/prisma'
import { getSession } from 'next-auth/react'
import { requireAdmin } from '@/lib/auth'

export default async function handler(req, res) {
  const session = await getSession({ req })
  try { requireAdmin(session?.user) } catch (e) { return res.status(401).json({ error: 'Unauthorized' }) }

  if (req.method === 'GET') {
    const orders = await prisma.order.findMany({ orderBy: { createdAt: 'desc' } })
    return res.status(200).json(orders)
  }

  res.status(405).end()
}
