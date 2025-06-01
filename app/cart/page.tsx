"use client"

import { useApp } from "@/contexts/AppContext"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Link from "next/link"
import Image from "next/image"
import { Trash2, ShoppingBag } from "lucide-react"

export default function CartPage() {
  const { state, dispatch } = useApp()

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      dispatch({ type: "REMOVE_FROM_CART", payload: productId })
    } else {
      dispatch({ type: "UPDATE_CART_ITEM", payload: { productId, quantity } })
    }
  }

  const removeItem = (productId: string) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: productId })
  }

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" })
  }

  const totalAmount = state.cart.reduce((sum, item) => {
    const price = item.product.discount ? item.product.price * (1 - item.product.discount / 100) : item.product.price
    return sum + price * item.quantity
  }, 0)

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <div className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Корзина</h1>

          {state.cart.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Корзина пуста</h2>
              <p className="text-gray-600 mb-8">Добавьте товары из каталога</p>
              <Link
                href="/categories"
                className="inline-flex items-center bg-[#F8F4E9] hover:bg-[#F5F0E4] text-gray-900 font-medium py-3 px-6 rounded-lg transition-colors"
              >
                Перейти в каталог
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Cart Items */}
              <div className="space-y-4">
                {state.cart.map((item) => {
                  const discountedPrice = item.product.discount
                    ? item.product.price * (1 - item.product.discount / 100)
                    : item.product.price

                  return (
                    <div key={item.product.id} className="bg-white rounded-xl shadow-md p-6">
                      <div className="flex items-center space-x-4">
                        <Image
                          src={item.product.imageUrl || "/placeholder.svg"}
                          alt={item.product.name}
                          width={80}
                          height={80}
                          className="rounded-lg object-cover"
                        />

                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900">{item.product.name}</h3>
                          <p className="text-gray-600">{Math.round(discountedPrice)} ₽ за шт.</p>
                        </div>

                        <div className="flex items-center space-x-3">
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.product.id, Number.parseInt(e.target.value) || 1)}
                            className="w-20 px-3 py-2 border border-gray-300 rounded-md text-center"
                          />

                          <div className="text-lg font-semibold text-gray-900 min-w-[80px]">
                            {Math.round(discountedPrice * item.quantity)} ₽
                          </div>

                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="p-2 text-red-500 hover:text-red-700 transition-colors"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Cart Summary */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xl font-semibold text-gray-900">Итого:</span>
                  <span className="text-2xl font-bold text-gray-900">{Math.round(totalAmount)} ₽</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={clearCart}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors"
                  >
                    Очистить корзину
                  </button>

                  {state.user ? (
                    <Link
                      href="/checkout"
                      className="flex-1 bg-[#E8D9B5] hover:bg-[#D4B896] text-gray-900 font-medium py-3 px-6 rounded-lg transition-colors text-center"
                    >
                      Оформить заказ
                    </Link>
                  ) : (
                    <Link
                      href="/login"
                      className="flex-1 bg-[#F8F4E9] hover:bg-[#F5F0E4] text-gray-900 font-medium py-3 px-6 rounded-lg transition-colors text-center"
                    >
                      Войти для оформления
                    </Link>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
