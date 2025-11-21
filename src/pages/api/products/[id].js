import prisma from '@/lib/prisma'
import { getSession } from 'next-auth/react'
import { requireAdmin } from '@/lib/auth'

export default async function handler(req, res) {
  const { id } = req.query
  if (req.method === 'GET') {
    const p = await prisma.product.findUnique({ where: { id } })
    if (!p) return res.status(404).end()
    return res.status(200).json(p)
  }
  if (req.method === 'PUT') {
    const session = await getSession({ req })
    try { requireAdmin(session?.user) } catch (e) { return res.status(401).json({ error: 'Unauthorized' }) }
    const { title, description, price, images, inStock } = req.body
    const updated = await prisma.product.update({ where: { id }, data: { title, description, price: Number(price), images, inStock } })
    return res.status(200).json(updated)
  }
  if (req.method === 'DELETE') {
    const session = await getSession({ req })
    try { requireAdmin(session?.user) } catch (e) { return res.status(401).json({ error: 'Unauthorized' }) }
    await prisma.product.delete({ where: { id } })
    return res.status(204).end()
  }
  res.status(405).end()
}
