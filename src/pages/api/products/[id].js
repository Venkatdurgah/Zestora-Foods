import prisma from '@/lib/prisma'
import { getSession } from 'next-auth/react'
import { requireAdmin } from '@/lib/auth'

export default async function handler(req, res) {
  const { id } = req.query
  if (req.method === 'GET') {
    const p = await prisma.product.findUnique({ where: { id } })
    if (!p) return res.status(404).end()
    // Parse images JSON string to array for frontend convenience
    const formatted = { ...p, images: typeof p.images === 'string' ? JSON.parse(p.images) : p.images }
    return res.status(200).json(formatted)
  }
  if (req.method === 'PUT') {
    const session = await getSession({ req })
    // Dev bypass: allow updates when BYPASS_ADMIN is true (development only)
    if (process.env.BYPASS_ADMIN !== 'true') {
      try { requireAdmin(session?.user) } catch (e) {
        console.warn('requireAdmin failed, session:', session)
        // If dev debug is enabled, return the session for easier debugging in the browser
        if (process.env.ENABLE_DEV_DEBUG === 'true') return res.status(401).json({ error: 'Unauthorized', session: session || null })
        return res.status(401).json({ error: 'Unauthorized' })
      }
    } else {
      console.warn('BYPASS_ADMIN enabled - skipping admin check for PUT /api/products/:id')
    }
    const { title, description, price, images, inStock } = req.body
    // Ensure images are stored as JSON string in the DB (schema stores images as String)
    const imagesData = typeof images === 'string' ? images : JSON.stringify(images)
    const updated = await prisma.product.update({ where: { id }, data: { title, description, price: Number(price), images: imagesData, inStock } })
    return res.status(200).json({ ...updated, images: typeof updated.images === 'string' ? JSON.parse(updated.images) : updated.images })
  }
  if (req.method === 'DELETE') {
    const session = await getSession({ req })
    if (process.env.BYPASS_ADMIN !== 'true') {
      try { requireAdmin(session?.user) } catch (e) { console.warn('requireAdmin failed, session:', session); if (process.env.ENABLE_DEV_DEBUG === 'true') return res.status(401).json({ error: 'Unauthorized', session: session || null }); return res.status(401).json({ error: 'Unauthorized' }) }
    } else {
      console.warn('BYPASS_ADMIN enabled - skipping admin check for DELETE /api/products/:id')
    }
    await prisma.product.delete({ where: { id } })
    return res.status(204).end()
  }
  res.status(405).end()
}
