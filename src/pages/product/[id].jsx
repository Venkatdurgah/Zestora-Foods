import { useRouter } from 'next/router'

export default function ProductPage({ product }) {
  const router = useRouter()
  if (!product) return <div>Not found</div>
  return (
    <div className="max-w-4xl mx-auto p-6">
      <button onClick={() => router.back()} className="mb-4">Back</button>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <img src={product.images[0]} alt={product.title} className="w-full rounded" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="mt-4">{product.description}</p>
          <p className="mt-4 font-semibold">Price: ₹{(product.price/100).toFixed(2)}</p>
          <a href={`/api/checkout/session?productId=${product.id}`} className="inline-block mt-4 px-4 py-2 bg-black text-white rounded">Buy Now</a>
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps(ctx) {
  const { id } = ctx.params
  const res = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/products/${id}`)
  if (res.status !== 200) return { props: { product: null } }
  const product = await res.json()
  return { props: { product } }
}
