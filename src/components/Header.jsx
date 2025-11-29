import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useCart } from '@/context/CartContext'

export default function Header() {
  const { data: session } = useSession()
  const { cart } = useCart()

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link href="/" className="text-xl font-bold">Zestora</Link>
        <nav className="flex items-center space-x-4">
          <Link href="/">Home</Link>
          <Link href="/cart">Cart ({cart.length})</Link>
          {session ? (
            <>
              <Link href="/account/orders">My Orders</Link>
              <button onClick={() => signOut()} className="px-3 py-1 border rounded">Sign out</button>
            </>
          ) : (
            <button onClick={() => signIn('google')} className="px-3 py-1 border rounded">Sign in</button>
          )}
        </nav>
      </div>
    </header>
  )
}
