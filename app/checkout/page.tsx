"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useApp } from "@/contexts/AppContext"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

// Добавим изображения товаров на странице оформления заказа
// Сначала добавим импорт Image
import Image from "next/image"

export default function CheckoutPage() {
  const { state, dispatch } = useApp()
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    deliveryMethod: "Самовывоз",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (!state.user) {
      router.push("/login")
      return
    }

    if (state.cart.length === 0) {
      router.push("/cart")
      return
    }

    // Auto-fill form with user data
    setFormData({
      firstName: state.user.firstName,
      lastName: state.user.lastName,
      email: state.user.email,
      phone: state.user.phone,
      address: "",
      deliveryMethod: "Самовывоз",
    })
  }, [state.user, state.cart, router])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName.trim()) newErrors.firstName = "Введите имя"
    if (!formData.lastName.trim()) newErrors.lastName = "Введите фамилию"
    if (!formData.phone.trim()) newErrors.phone = "Введите телефон"
    if (!formData.address.trim()) newErrors.address = "Введите адрес доставки"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm() || !state.user) return

    const totalAmount = state.cart.reduce((sum, item) => {
      const price = item.product.discount ? item.product.price * (1 - item.product.discount / 100) : item.product.price
      return sum + price * item.quantity
    }, 0)

    const newOrder = {
      id: `order-${Date.now()}`,
      userId: state.user.id,
      items: [...state.cart],
      totalAmount,
      date: new Date().toISOString(),
      status: "Новый" as const,
      deliveryAddress: formData.address,
      deliveryMethod: formData.deliveryMethod,
    }

    dispatch({ type: "ADD_ORDER", payload: newOrder })
    dispatch({ type: "CLEAR_CART" })
    router.push("/profile")
  }

  if (!state.user || state.cart.length === 0) {
    return null
  }

  const totalAmount = state.cart.reduce((sum, item) => {
    const price = item.product.discount ? item.product.price * (1 - item.product.discount / 100) : item.product.price
    return sum + price * item.quantity
  }, 0)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-grow">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Остальной контент остается без изменений */}
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Оформление заказа</h1>

          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Ваш заказ</h2>
            <div className="space-y-2">
              {state.cart.map((item) => {
                const price = item.product.discount
                  ? item.product.price * (1 - item.product.discount / 100)
                  : item.product.price

                return (
                  <div key={item.product.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Image
                        src={item.product.imageUrl || "/placeholder.svg"}
                        alt={item.product.name}
                        width={40}
                        height={40}
                        className="rounded-md mr-3 object-cover"
                      />
                      <span>
                        {item.product.name} × {item.quantity}
                      </span>
                    </div>
                    <span>{Math.round(price * item.quantity)} ₽</span>
                  </div>
                )
              })}
              <div className="border-t pt-2 font-semibold">
                <div className="flex justify-between">
                  <span>Итого:</span>
                  <span>{Math.round(totalAmount)} ₽</span>
                </div>
              </div>
            </div>
          </div>

          {/* Форма остается без изменений */}
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Контактные данные</h2>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  Имя
                </label>
                <input
                  type="text"
                  id="firstName"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F8F4E9]"
                />
                {errors.firstName && <p className="text-red-600 text-xs mt-1">{errors.firstName}</p>}
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Фамилия
                </label>
                <input
                  type="text"
                  id="lastName"
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F8F4E9]"
                />
                {errors.lastName && <p className="text-red-600 text-xs mt-1">{errors.lastName}</p>}
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                disabled
                value={formData.email}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Телефон
              </label>
              <input
                type="tel"
                id="phone"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F8F4E9]"
              />
              {errors.phone && <p className="text-red-600 text-xs mt-1">{errors.phone}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Адрес доставки
              </label>
              <textarea
                id="address"
                required
                rows={3}
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F8F4E9]"
              />
              {errors.address && <p className="text-red-600 text-xs mt-1">{errors.address}</p>}
            </div>

            <div className="mb-6">
              <label htmlFor="deliveryMethod" className="block text-sm font-medium text-gray-700 mb-1">
                Способ доставки
              </label>
              <select
                id="deliveryMethod"
                value={formData.deliveryMethod}
                onChange={(e) => setFormData({ ...formData, deliveryMethod: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F8F4E9]"
              >
                <option value="Самовывоз">Самовывоз</option>
                <option value="Курьер (СДЭК)">Курьер (СДЭК)</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-[#F8F4E9] hover:bg-[#F5F0E4] text-gray-900 font-medium py-3 px-4 rounded-lg transition-colors"
            >
              Подтвердить заказ
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  )
}
