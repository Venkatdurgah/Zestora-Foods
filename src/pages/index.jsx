import Link from 'next/link'
import Image from 'next/image'
import ProductCard from '@/components/ProductCard'
import { useState } from 'react'

export default function Home({ products }) {
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Get unique categories
  const categories = ['all', ...new Set(products.map(p => p.category?.toLowerCase() || 'uncategorized'))]

  // Filter products by category
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => (p.category?.toLowerCase() || 'uncategorized') === selectedCategory)

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-dark-green via-emerald-700 to-emerald-800 text-white overflow-hidden py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 bg-gold rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-64 h-64 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 leading-tight">
                Zestora<span className="text-gold">.</span>
              </h1>
              <p className="text-xl text-gray-100 mb-4 font-light">Premium Foods</p>
              <p className="text-lg text-gray-200 mb-8 leading-relaxed">
                Discover hand-picked gourmet ingredients and premium food products sourced from the finest producers. Delivered fresh to your door.
              </p>
              <div className="flex gap-4 flex-wrap">
                <Link href="#products" className="btn-primary bg-gold text-dark-green hover:bg-yellow-400">
                  Explore Collection
                </Link>
                <Link href="/account/orders" className="btn-secondary border-white text-white hover:bg-white hover:text-dark-green">
                  My Orders
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <HeroImage />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-cream py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-dark-green mb-2">100%</div>
              <p className="text-gray-700">Fresh & Quality</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-dark-green mb-2">✓</div>
              <p className="text-gray-700">Authenticity Guaranteed</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-dark-green mb-2">🚚</div>
              <p className="text-gray-700">Fast Delivery</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-dark-green mb-2">24/7</div>
              <p className="text-gray-700">Customer Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" id="products">
        <div className="mb-12">
          <h2 className="section-title">Featured Collection</h2>
          <p className="section-subtitle">Carefully curated premium selections</p>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="bg-cream rounded-lg p-12 text-center">
            <p className="text-gray-700 text-xl mb-4">No products available yet</p>
            <p className="text-gray-600 mb-6">Check back soon for our premium food collection</p>
            <button 
              onClick={() => window.location.reload()}
              className="btn-primary"
            >
              Refresh Page
            </button>
          </div>
        ) : (
          <>
            {/* Category Filter */}
            {categories.length > 1 && (
              <div className="mb-8 flex flex-wrap gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full font-semibold text-sm transition-all ${
                      selectedCategory === cat
                        ? 'bg-dark-green text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {cat.charAt(0).toUpperCase() + cat.slice(1)} ({filteredProducts.length})
                  </button>
                ))}
              </div>
            )}

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found in this category.</p>
              </div>
            )}
          </>
        )}
      </main>

      {/* Newsletter Section */}
      <section className="bg-dark-green text-white py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-serif font-bold mb-4">Exclusive Offers</h3>
          <p className="text-gray-200 mb-8">Subscribe to our newsletter for exclusive deals and new product launches.</p>
          <div className="flex gap-2 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 px-4 py-3 rounded-sm text-gray-900 focus:outline-none"
            />
            <button className="btn-primary bg-gold text-dark-green hover:bg-yellow-400">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

function HeroImage() {
  const [errored, setErrored] = useState(false)
  // Use public hero if available, otherwise show an inline SVG placeholder.
  const src = '/hero-food.jpg'

  if (errored) {
    return (
      <div className="bg-white/5 rounded-2xl p-8 flex items-center justify-center h-full">
        <svg width="320" height="200" viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <rect width="320" height="200" rx="16" fill="url(#g)" />
          <defs>
            <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#f8f1e6" />
              <stop offset="1" stopColor="#e6f8ef" />
            </linearGradient>
          </defs>
          <g>
            <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#14532d" fontSize="18" fontFamily="Inter, sans-serif">Premium food collection</text>
          </g>
        </svg>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-gold/20 to-emerald-400/20 rounded-2xl p-4 backdrop-blur-sm">
      <div className="relative w-full h-72 rounded-xl overflow-hidden shadow-2xl">
        <Image
          src={src}
          alt="Premium food collection"
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          style={{ objectFit: 'cover' }}
          onError={() => setErrored(true)}
          priority={true}
        />
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_NEXTAUTH_URL || 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/products`)
    
    if (!res.ok) {
      console.error('API error:', res.status, res.statusText)
      return { props: { products: [] } }
    }
    
    const products = await res.json()
    return { props: { products: Array.isArray(products) ? products : [] } }
  } catch (error) {
    console.error('Error fetching products:', error)
    return { props: { products: [] } }
  }
}
