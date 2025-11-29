import Link from 'next/link'
import { useCart } from '@/context/CartContext'

export default function ProductCard({ product }) {
  const { add } = useCart()
  return (
    <div className="border rounded-lg p-4 shadow-lg hover:shadow-2xl transition-shadow duration-200 bg-white">
      <div className="overflow-hidden rounded">
        <img src={product.images[0]} alt={product.title} className="w-full h-44 object-cover" />
      </div>
      <h3 className="mt-3 font-semibold text-lg">{product.title}</h3>
      <p className="mt-1 text-emerald-700 font-semibold">₹{(product.price/100).toFixed(2)}</p>
      <div className="mt-3 flex gap-2 items-center">
        <Link href={`/product/${product.id}`} className="text-sm text-emerald-600">View</Link>
        <button onClick={() => add({ id: product.id, title: product.title, price: product.price, images: product.images, quantity: 1 })} className="px-2 py-1 border rounded text-sm">Add to cart</button>
        {!product.inStock && <span className="ml-auto text-sm text-red-600">Out of stock</span>}
      </div>
    </div>
  )
}
