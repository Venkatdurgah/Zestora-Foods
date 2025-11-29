import '../styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import { CartProvider } from '@/context/CartContext'
import Header from '@/components/Header'

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <CartProvider>
        <Header />
        <Component {...pageProps} />
      </CartProvider>
    </SessionProvider>
  )
}
