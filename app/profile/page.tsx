"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useApp } from "@/contexts/AppContext"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
// Импортируем иконку Coins вместо DollarSign
import { User, Calendar, ShoppingBag, Coins, LogOut, Phone } from "lucide-react"

export default function ProfilePage() {
  const { state, dispatch } = useApp()
  const router = useRouter()

  useEffect(() => {
    if (!state.user) {
      router.push("/login")
    }
  }, [state.user, router])

  if (!state.user) {
    return null
  }

  const totalOrders = state.user.orders.length
  const totalAmount = state.user.orders.reduce((sum, order) => sum + order.totalAmount, 0)
  const averageOrder = totalOrders > 0 ? totalAmount / totalOrders : 0

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("ru-RU", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const handleLogout = () => {
    dispatch({ type: "SET_USER", payload: null })
    router.push("/")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Личный кабинет</h1>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition"
            >
              <LogOut className="h-5 w-5" />
              <span>Выйти</span>
            </button>
          </div>

          {/* Остальной контент остается без изменений */}
          {/* User Info */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <div className="flex items-center space-x-4 mb-6">
              <div className="h-16 w-16 bg-[#F8F4E9] rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-gray-700" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  {state.user.firstName} {state.user.lastName}
                </h2>
                <p className="text-gray-600">{state.user.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Дата регистрации</p>
                  <p className="font-medium">{formatDate(state.user.registrationDate)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Телефон</p>
                  <p className="font-medium">{state.user.phone}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <ShoppingBag className="h-8 w-8 text-[#D4B896] mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{totalOrders}</p>
              <p className="text-gray-600">Заказов</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <Coins className="h-8 w-8 text-[#D4B896] mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{Math.round(totalAmount)} ₽</p>
              <p className="text-gray-600">Общая сумма</p>
            </div>
          </div>

          {/* Order History */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">История заказов</h3>

            {state.user.orders.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">У вас пока нет заказов</p>
              </div>
            ) : (
              <div className="space-y-4">
                {state.user.orders
                  .slice(-10)
                  .reverse()
                  .map((order) => (
                    <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium text-gray-900">Заказ #{order.id.slice(-8)}</p>
                          <p className="text-sm text-gray-600">{formatDate(order.date)}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{Math.round(order.totalAmount)} ₽</p>
                          <span
                            className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                              order.status === "Новый"
                                ? "bg-blue-100 text-blue-800"
                                : order.status === "В обработке"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : order.status === "Отправлен"
                                    ? "bg-purple-100 text-purple-800"
                                    : "bg-green-100 text-green-800"
                            }`}
                          >
                            {order.status}
                          </span>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600">
                        <p>Товаров: {order.items.reduce((sum, item) => sum + item.quantity, 0)}</p>
                        <p>Адрес: {order.deliveryAddress}</p>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
