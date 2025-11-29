import { createContext, useContext, useEffect, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem('cart')
      if (raw) setCart(JSON.parse(raw))
    } catch (e) { /* ignore */ }
  }, [])

  useEffect(() => {
    try { localStorage.setItem('cart', JSON.stringify(cart)) } catch (e) {}
  }, [cart])

  function add(item) {
    setCart(prev => {
      const idx = prev.findIndex(p => p.id === item.id)
      if (idx >= 0) {
        const copy = [...prev]
        copy[idx].quantity += item.quantity || 1
        return copy
      }
      return [...prev, { ...item, quantity: item.quantity || 1 }]
    })
  }

  function remove(id) {
    setCart(prev => prev.filter(p => p.id !== id))
  }

  function updateQty(id, qty) {
    setCart(prev => prev.map(p => p.id === id ? { ...p, quantity: qty } : p))
  }

  function clear() { setCart([]) }

  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0)

  return (
    <CartContext.Provider value={{ cart, add, remove, updateQty, clear, total }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() { return useContext(CartContext) }
