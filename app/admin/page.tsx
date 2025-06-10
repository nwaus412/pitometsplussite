"use client"

import { useState } from "react"
import { useApp } from "@/contexts/AppContext"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Users, ShoppingBag, Calendar, Package, Eye } from "lucide-react"

const services = [
  {
    id: "consultation",
    name: "Консультация ветеринара",
    description: "Общий осмотр и консультация по здоровью питомца",
    price: 1500,
    duration: "30 мин",
  },
  {
    id: "vaccination",
    name: "Вакцинация",
    description: "Комплексная вакцинация собак и кошек",
    price: 2500,
    duration: "20 мин",
  },
  {
    id: "grooming",
    name: "Груминг",
    description: "Стрижка, мытье и уход за шерстью",
    price: 3000,
    duration: "60 мин",
  },
  {
    id: "surgery",
    name: "Хирургические операции",
    description: "Плановые и экстренные операции",
    price: 15000,
    duration: "120 мин",
  },
  {
    id: "emergency",
    name: "Экстренная помощь",
    description: "Круглосуточная экстренная ветеринарная помощь",
    price: 5000,
    duration: "45 мин",
  },
]

const doctors = [
  {
    id: "ivanov",
    name: "Иванов Сергей Петрович",
    specialization: "Терапевт, хирург",
    experience: "15 лет",
    rating: 4.9,
    reviews: 234,
  },
  {
    id: "petrova",
    name: "Петрова Анна Михайловна",
    specialization: "Дерматолог, офтальмолог",
    experience: "12 лет",
    rating: 4.8,
    reviews: 189,
  },
  {
    id: "sidorov",
    name: "Сидоров Михаил Александрович",
    specialization: "Кардиолог, невролог",
    experience: "8 лет",
    rating: 4.7,
    reviews: 156,
  },
]

export default function AdminPage() {
  const { state, dispatch } = useApp()
  const [activeTab, setActiveTab] = useState("users")
  const [selectedData, setSelectedData] = useState<any>(null)

  const tabs = [
    { id: "users", name: "Пользователи", icon: <Users className="h-5 w-5" />, count: state.users.length },
    { id: "orders", name: "Заказы", icon: <ShoppingBag className="h-5 w-5" />, count: state.orders.length },
    {
      id: "appointments",
      name: "Записи к врачу",
      icon: <Calendar className="h-5 w-5" />,
      count: state.appointments.length,
    },
    { id: "products", name: "Товары", icon: <Package className="h-5 w-5" />, count: state.products.length },
  ]

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ru-RU", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Админ-панель</h1>
          <p className="text-gray-600">Просмотр и управление данными сайта</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-md mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab.icon}
                  <span>{tab.name}</span>
                  <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">{tab.count}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Users Tab */}
            {activeTab === "users" && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Пользователи ({state.users.length})</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Имя</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Телефон</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Дата регистрации
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Заказы</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Действия</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {state.users.map((user) => (
                        <tr key={user.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {user.firstName} {user.lastName}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.phone}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(user.registrationDate)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.orders.length}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => setSelectedData(user)}
                              className="text-blue-600 hover:text-blue-900 mr-3"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === "orders" && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Заказы ({state.orders.length})</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID заказа</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Пользователь
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Сумма</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Статус</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Дата</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Действия</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {state.orders.map((order) => {
                        const user = state.users.find((u) => u.id === order.userId)
                        return (
                          <tr key={order.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              #{order.id.slice(-8)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {user ? `${user.firstName} ${user.lastName}` : "Неизвестен"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {Math.round(order.totalAmount)} ₽
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
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
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {formatDate(order.date)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button
                                onClick={() => setSelectedData(order)}
                                className="text-blue-600 hover:text-blue-900"
                              >
                                <Eye className="h-4 w-4" />
                              </button>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Appointments Tab */}
            {activeTab === "appointments" && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Записи к врачу ({state.appointments.length})</h2>
                {state.appointments.length === 0 ? (
                  <p className="text-gray-500">Записей к врачу пока нет</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Пользователь
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Услуга</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Врач</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Дата и время
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Статус</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Действия</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {state.appointments.map((appointment) => {
                          const user = state.users.find((u) => u.id === appointment.userId)
                          const service = services.find((s) => s.id === appointment.serviceId)
                          const doctor = doctors.find((d) => d.id === appointment.doctorId)
                          return (
                            <tr key={appointment.id}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {user ? `${user.firstName} ${user.lastName}` : "Неизвестен"}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {service?.name || appointment.serviceId}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {doctor?.name || appointment.doctorId}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {new Date(appointment.date).toLocaleDateString("ru-RU")} в {appointment.time}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span
                                  className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                    appointment.status === "scheduled"
                                      ? "bg-blue-100 text-blue-800"
                                      : appointment.status === "completed"
                                        ? "bg-green-100 text-green-800"
                                        : "bg-red-100 text-red-800"
                                  }`}
                                >
                                  {appointment.status === "scheduled"
                                    ? "Запланирована"
                                    : appointment.status === "completed"
                                      ? "Завершена"
                                      : "Отменена"}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <button
                                  onClick={() => setSelectedData(appointment)}
                                  className="text-blue-600 hover:text-blue-900"
                                >
                                  <Eye className="h-4 w-4" />
                                </button>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* Products Tab */}
            {activeTab === "products" && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Товары ({state.products.length})</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {state.products.slice(0, 12).map((product) => (
                    <div key={product.id} className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-medium text-gray-900 mb-2">{product.name}</h3>
                      <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {product.discount ? (
                          <>
                            <span className="line-through text-gray-500 mr-2">{product.price} ₽</span>
                            <span>{Math.round(product.price * (1 - product.discount / 100))} ₽</span>
                          </>
                        ) : (
                          `${product.price} ₽`
                        )}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal for detailed view */}
        {selectedData && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-96 overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Подробная информация</h3>
                <button onClick={() => setSelectedData(null)} className="text-gray-500 hover:text-gray-700">
                  ✕
                </button>
              </div>
              <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                {JSON.stringify(selectedData, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
