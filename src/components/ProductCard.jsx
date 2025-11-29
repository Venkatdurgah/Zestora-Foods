import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { useState } from 'react'

export default function ProductCard({ product }) {
  const { add } = useCart()
  const [isAdded, setIsAdded] = useState(false)

  const handleAddToCart = () => {
    add({ 
      id: product.id, 
      title: product.title, 
      price: product.price, 
      images: product.images, 
      quantity: 1 
    })
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  return (
    <div className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100">
      {/* Image Container */}
      <div className="relative overflow-hidden bg-cream h-56">
        <img 
          src={product.images[0]} 
          alt={product.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Stock Badge */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-semibold">Out of Stock</span>
          </div>
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-dark-green group-hover:text-emerald-700 transition line-clamp-2">
          {product.title}
        </h3>
        
        {/* Price */}
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-2xl font-bold text-dark-green">
            ₹{(product.price / 100).toFixed(2)}
          </span>
        </div>

        {/* Actions */}
        <div className="mt-4 flex gap-2">
          <Link 
            href={`/product/${product.id}`} 
            className="flex-1 text-center py-2 border-2 border-dark-green text-dark-green rounded-sm font-semibold text-sm hover:bg-dark-green hover:text-white transition-all duration-300"
          >
            View Details
          </Link>
          <button 
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`flex-1 py-2 rounded-sm font-semibold text-sm transition-all duration-300 ${
              isAdded 
                ? 'bg-emerald-600 text-white' 
                : 'bg-dark-green text-white hover:bg-emerald-700'
            } ${!product.inStock ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isAdded ? '✓ Added' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  )
}
