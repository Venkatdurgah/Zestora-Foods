// Simple seed script to create products using images from your live site.
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const products = [
    {
      title: 'Nata de Coco - Classic',
      slug: 'nata-de-coco-classic',
      description: 'Delicious nata de coco, premium quality.',
      price: 19900,
      images: ['https://zestorafoods.in/cdn/shop/files/nata_de_coco.png?v=1763611400&width=533']
    },
    {
      title: 'GUF - Premium Pack',
      slug: 'guf-premium-pack',
      description: 'GUF assortment pack.',
      price: 24900,
      images: ['https://zestorafoods.in/cdn/shop/files/GUF.png?v=1763605436&width=533']
    },
    {
      title: 'JCF - Special',
      slug: 'jcf-special',
      description: 'JCF category special.',
      price: 17900,
      images: ['https://zestorafoods.in/cdn/shop/files/JCF.png?v=1763605825&width=533']
    }
  ]

  for (const p of products) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: p
    })
  }
  console.log('Seed complete')
}

main().catch(e => { console.error(e); process.exit(1) }).finally(() => process.exit())
