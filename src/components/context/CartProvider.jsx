'use client'

import { createContext, useEffect, useMemo, useState } from 'react'

export const CartContext = createContext({})

export default function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])
  const localStorage =
    typeof window !== 'undefined' ? window.localStorage : null

  useEffect(() => {
    if (localStorage && localStorage.getItem('cart')) {
      setCartItems(JSON.parse(localStorage.getItem('cart')))
    }
  }, [])

  function updateLocalStorage(items) {
    if (localStorage) {
      localStorage.setItem('cart', JSON.stringify(items))
    }
  }

  function AddCartItem(item, size = null, extras = []) {
    setCartItems((prevCartItems) => {
      const newCartItem = { ...item, size, extras }
      const newCartItems = [...prevCartItems, newCartItem]
      updateLocalStorage(newCartItems)
      return newCartItems
    })
  }

  function removeCartItem(itemIndex) {
    setCartItems((prevCartItems) => {
      const newCartItems = prevCartItems.filter(
        (v, index) => index !== itemIndex,
      )
      updateLocalStorage(newCartItems)
      return newCartItems
    })
  }

  function clearCart() {
    setCartItems([])
    updateLocalStorage([])
  }

  const value = useMemo(
    () => ({ cartItems, setCartItems, AddCartItem, removeCartItem, clearCart }),
    [],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
