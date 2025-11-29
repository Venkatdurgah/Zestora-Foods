import prisma from '@/lib/prisma'
import { getSession } from 'next-auth/react'
import { requireAdmin } from '@/lib/auth'

export default async function handler(req, res) {
  const session = await getSession({ req })
  try { requireAdmin(session?.user) } catch (e) { return res.status(401).json({ error: 'Unauthorized' }) }

  const { id } = req.query
  if (req.method === 'PUT') {
    const { status, trackingNo, verified } = req.body
    const updated = await prisma.order.update({ where: { id }, data: { status, trackingNo, verified } })
    return res.status(200).json(updated)
  }

  res.status(405).end()
}
