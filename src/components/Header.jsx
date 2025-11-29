import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useCart } from '@/context/CartContext'

export default function Header() {
  const { data: session } = useSession()
  const { cart } = useCart()

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <div className="text-2xl font-serif font-bold text-dark-green">
              Zestora<span className="text-gold">.</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-dark-green font-medium transition">Home</Link>
            <Link href="#products" className="text-gray-700 hover:text-dark-green font-medium transition">Shop</Link>
            <Link href="/account/orders" className="text-gray-700 hover:text-dark-green font-medium transition">Orders</Link>
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Cart Icon */}
            <Link href="/cart" className="relative group">
              <div className="text-gray-700 hover:text-dark-green transition text-lg">
                🛒
              </div>
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold text-dark-green text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Link>

            {/* Auth */}
            {session ? (
              <div className="flex items-center space-x-2">
                {session.user?.role === 'ADMIN' && (
                  <Link href="/admin" className="px-4 py-2 bg-gold text-dark-green rounded-sm font-semibold text-sm hover:bg-yellow-500 transition">
                    Admin
                  </Link>
                )}
                <button 
                  onClick={() => signOut()} 
                  className="btn-outline"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <Link href="/auth/signin" className="btn-primary">
                Sign in
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
