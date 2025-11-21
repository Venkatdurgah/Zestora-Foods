import Link from 'next/link'
import ProductCard from '@/components/ProductCard'

export default function Home({ products }) {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Zestora — Premium Foods</h1>
        <div className="space-x-4">
          <Link href="/admin">Admin</Link>
          <Link href="/cart">Cart</Link>
        </div>
      </header>

      <section>
        <h2 className="text-xl font-semibold mb-4">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  )
}

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/products`)
  const products = await res.json()
  return { props: { products } }
}
