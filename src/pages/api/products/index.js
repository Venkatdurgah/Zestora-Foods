import prisma from '@/lib/prisma'
import { getSession } from 'next-auth/react'
import { requireAdmin } from '@/lib/auth'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const products = await prisma.product.findMany({ orderBy: { createdAt: 'desc' } })
    return res.status(200).json(products)
  }

  if (req.method === 'POST') {
    const session = await getSession({ req })
    try { requireAdmin(session?.user) } catch (e) { return res.status(401).json({ error: 'Unauthorized' }) }
    const { title, slug, description, price, images, inStock } = req.body
    const p = await prisma.product.create({ data: { title, slug, description, price: Number(price), images, inStock } })
    return res.status(201).json(p)
  }

  res.status(405).end()
}
