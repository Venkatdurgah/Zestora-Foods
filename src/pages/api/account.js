import prisma from '@/lib/prisma'
import { getSession } from 'next-auth/react'

export default async function handler(req, res) {
  const session = await getSession({ req })
  if (!session) return res.status(401).json({ error: 'Unauthorized' })

  const userId = session.user.id
  if (req.method === 'PUT') {
    const { name, image } = req.body
    const updated = await prisma.user.update({ where: { id: userId }, data: { name, image } })
    return res.status(200).json(updated)
  }

  if (req.method === 'GET') {
    const user = await prisma.user.findUnique({ where: { id: userId }, select: { id: true, name: true, email: true, image: true, role: true } })
    return res.status(200).json(user)
  }

  res.status(405).end()
}
