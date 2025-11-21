import Link from 'next/link'
export default function ProductCard({ product }) {
  return (
    <div className="border rounded-lg p-4 shadow-sm">
      <img src={product.images[0]} alt={product.title} className="w-full h-48 object-cover rounded" />
      <h3 className="mt-2 font-semibold">{product.title}</h3>
      <p className="mt-1">₹{(product.price/100).toFixed(2)}</p>
      <Link href={`/product/${product.id}`} className="mt-3 inline-block text-sm text-blue-600">View</Link>
    </div>
  )
}
