import prisma from '@/lib/prisma'
import { getSession } from 'next-auth/react'

export default async function handler(req, res) {
  const session = await getSession({ req })
  if (!session) return res.status(401).json({ error: 'Unauthorized' })

  const userId = session.user.id
  if (req.method === 'GET') {
    const orders = await prisma.order.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } })
    return res.status(200).json(orders)
  }

  res.status(405).end()
}
