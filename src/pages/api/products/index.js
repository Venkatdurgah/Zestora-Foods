import prisma from '@/lib/prisma'
import { getSession } from 'next-auth/react'
import { requireAdmin } from '@/lib/auth'

// Mock products for development/demo purposes
const mockProducts = [
  {
    id: '1',
    title: 'Nata de Coco - Classic',
    slug: 'nata-de-coco-classic',
    description: 'Delicious nata de coco, premium quality.',
    price: 19900,
    images: ['https://zestorafoods.in/cdn/shop/files/nata_de_coco.png?v=1763611400&width=533'],
    inStock: true,
    category: 'beverages',
    createdAt: new Date()
  },
  {
    id: '2',
    title: 'GUF - Premium Pack',
    slug: 'guf-premium-pack',
    description: 'GUF assortment pack with premium selection.',
    price: 24900,
    images: ['https://zestorafoods.in/cdn/shop/files/GUF.png?v=1763605436&width=533'],
    inStock: true,
    category: 'snacks',
    createdAt: new Date()
  },
  {
    id: '3',
    title: 'JCF - Special',
    slug: 'jcf-special',
    description: 'JCF category special offering.',
    price: 17900,
    images: ['https://zestorafoods.in/cdn/shop/files/JCF.png?v=1763605825&width=533'],
    inStock: true,
    category: 'snacks',
    createdAt: new Date()
  },
]

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const products = await prisma.product.findMany({ orderBy: { createdAt: 'desc' } })
      // Parse images from JSON string
      const formattedProducts = products.map(p => ({
        ...p,
        images: typeof p.images === 'string' ? JSON.parse(p.images) : p.images
      }))
      return res.status(200).json(formattedProducts)
    } catch (error) {
      // If database is not available, return mock products
      console.warn('Database error, returning mock products:', error.message)
      return res.status(200).json(mockProducts)
    }
  }

  if (req.method === 'POST') {
    const session = await getSession({ req })
    // Dev bypass: allow creation when BYPASS_ADMIN is true (development only)
    if (process.env.BYPASS_ADMIN !== 'true') {
      try { requireAdmin(session?.user) } catch (e) { console.warn('requireAdmin failed, session:', session); if (process.env.ENABLE_DEV_DEBUG === 'true') return res.status(401).json({ error: 'Unauthorized', session: session || null }); return res.status(401).json({ error: 'Unauthorized' }) }
    } else {
      console.warn('BYPASS_ADMIN enabled - skipping admin check for POST /api/products')
    }
    const { title, slug, description, price, images, inStock } = req.body
    const imagesData = typeof images === 'string' ? images : JSON.stringify(images)
    const p = await prisma.product.create({ data: { title, slug, description, price: Number(price), images: imagesData, inStock } })
    return res.status(201).json({ ...p, images: JSON.parse(p.images) })
  }

  res.status(405).end()
}
