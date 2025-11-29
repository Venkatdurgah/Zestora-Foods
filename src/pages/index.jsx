import Link from 'next/link'
import ProductCard from '@/components/ProductCard'

export default function Home({ products }) {
  return (
    <div>
      <section className="bg-gradient-to-r from-emerald-50 to-emerald-100 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl font-extrabold mb-4">Zestora — Premium Foods</h1>
              <p className="text-lg text-gray-700 mb-6">Hand-picked gourmet ingredients and premium food products delivered to your door.</p>
              <div className="flex gap-3">
                <Link href="#products" className="px-6 py-3 bg-emerald-700 text-white rounded">Shop Now</Link>
                <Link href="/admin" className="px-6 py-3 border rounded">Admin</Link>
              </div>
            </div>
            <div>
              <img src="/hero-food.jpg" alt="hero" className="w-full rounded shadow-lg" />
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto p-6" id="products">
        <h2 className="text-2xl font-semibold mb-4">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </main>
    </div>
  )
}

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL || 'http://localhost:3000'}/api/products`)
  const products = await res.json()
  return { props: { products } }
}
