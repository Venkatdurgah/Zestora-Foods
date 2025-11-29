import { useCart } from '@/context/CartContext'
import axios from 'axios'
import { useSession } from 'next-auth/react'

export default function CartPage(){
  const { cart, remove, updateQty, clear, total } = useCart()
  const { data: session } = useSession()

  async function handleCheckout() {
    try {
      const items = cart.map(i => ({ title: i.title, price: i.price, quantity: i.quantity }))
      const res = await axios.post('/api/checkout/session', { items, successUrl: `${window.location.origin}/account/orders`, cancelUrl: window.location.href, userId: session?.user?.id || null })
      if (res.data?.url) window.location = res.data.url
      else alert('Checkout failed')
    } catch (e) { console.error(e); alert('Checkout error') }
  }

  if (!cart.length) return <div className="max-w-4xl mx-auto p-6">Your cart is empty</div>

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Cart</h1>
      <div className="space-y-4">
        {cart.map(item => (
          <div key={item.id} className="flex items-center justify-between border p-3 rounded">
            <div className="flex items-center gap-4">
              <img src={item.images?.[0]} className="w-20 h-20 object-cover rounded" />
              <div>
                <div className="font-semibold">{item.title}</div>
                <div>₹{(item.price/100).toFixed(2)}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input type="number" min={1} value={item.quantity} onChange={(e)=>updateQty(item.id, Number(e.target.value))} className="w-16 p-1 border rounded" />
              <button onClick={()=>remove(item.id)} className="px-3 py-1 border rounded">Remove</button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-between items-center">
        <div className="text-lg font-semibold">Total: ₹{(total/100).toFixed(2)}</div>
        <div className="flex gap-3">
          <button onClick={()=>clear()} className="px-4 py-2 border rounded">Clear</button>
          <button onClick={handleCheckout} className="px-4 py-2 bg-black text-white rounded">Checkout</button>
        </div>
      </div>
    </div>
  )
}
