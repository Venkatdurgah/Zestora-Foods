import { useRouter } from 'next/router'
import { useState } from 'react'
import { useSession } from 'next-auth/react'

export default function ProductPage({ product }) {
  const router = useRouter()
  const { data: session } = useSession()
  const [loading, setLoading] = useState(false)
  const [qty, setQty] = useState(1)
  const [selected, setSelected] = useState(0)
  if (!product) return <div>Not found</div>

  async function handleBuy() {
    setLoading(true)
    try {
      const res = await fetch('/api/checkout/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: [{ title: product.title, price: product.price, quantity: qty }],
          successUrl: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL || window.location.origin}/account/orders`,
          cancelUrl: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL || window.location.origin}/product/${product.id}`,
          userId: session?.user?.id || null,
        })
      })
      const data = await res.json()
      if (data.url) window.location = data.url
      else alert('Failed to create checkout session')
    } catch (err) {
      console.error(err)
      alert('Checkout error')
    } finally { setLoading(false) }
  }

  function addToCart() {
    // client-side add-to-cart uses window's CartContext via button on ProductCard; keep Buy Now for immediate checkout
    const ev = new CustomEvent('add-to-cart', { detail: { id: product.id, title: product.title, price: product.price, images: product.images, quantity: qty } })
    window.dispatchEvent(ev)
    alert('Added to cart')
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <button onClick={() => router.back()} className="mb-4">Back</button>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <div className="rounded overflow-hidden">
            <img src={product.images[selected]} alt={product.title} className="w-full h-96 object-cover rounded" />
          </div>
          <div className="flex gap-2 mt-3">
            {product.images.map((u,i)=> (
              <button key={i} onClick={()=>setSelected(i)} className={`w-20 h-20 rounded overflow-hidden border ${i===selected? 'ring-2 ring-emerald-500':''}`}>
                <img src={u} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="mt-4 text-gray-700">{product.description}</p>
          <p className="mt-4 text-2xl font-semibold">₹{(product.price/100).toFixed(2)}</p>
          <div className="mt-4 flex items-center gap-3">
            <label className="text-sm">Qty</label>
            <input type="number" min={1} value={qty} onChange={e=>setQty(Number(e.target.value))} className="w-20 p-1 border rounded" />
          </div>
          <div className="mt-6 flex gap-3">
            <button onClick={addToCart} className="px-4 py-2 border rounded">Add to cart</button>
            <button onClick={handleBuy} disabled={loading} className="px-4 py-2 bg-emerald-700 text-white rounded">{loading ? 'Redirecting...' : 'Buy Now'}</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps(ctx) {
  const { id } = ctx.params
  const res = await fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL || 'http://localhost:3000'}/api/products/${id}`)
  if (res.status !== 200) return { props: { product: null } }
  const product = await res.json()
  return { props: { product } }
}
