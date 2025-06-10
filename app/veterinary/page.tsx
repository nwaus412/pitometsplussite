"use client"

import { useState } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { useApp } from "@/contexts/AppContext"
import {
  Calendar,
  Clock,
  MapPin,
  Phone,
  Star,
  Heart,
  Stethoscope,
  Scissors,
  Shield,
  Activity,
  User,
  ChevronRight,
} from "lucide-react"

export default function VeterinaryPage() {
  const { state, dispatch } = useApp()
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [showBookingForm, setShowBookingForm] = useState(false)

  const services = [
    {
      id: "consultation",
      name: "Консультация ветеринара",
      description: "Общий осмотр и консультация по здоровью питомца",
      price: 1500,
      duration: "30 мин",
      icon: <Stethoscope className="h-8 w-8" />,
      popular: true,
    },
    {
      id: "vaccination",
      name: "Вакцинация",
      description: "Комплексная вакцинация собак и кошек",
      price: 2500,
      duration: "20 мин",
      icon: <Shield className="h-8 w-8" />,
    },
    {
      id: "grooming",
      name: "Груминг",
      description: "Стрижка, мытье и уход за шерстью",
      price: 3000,
      duration: "60 мин",
      icon: <Scissors className="h-8 w-8" />,
    },
    {
      id: "surgery",
      name: "Хирургические операции",
      description: "Плановые и экстренные операции",
      price: 15000,
      duration: "120 мин",
      icon: <Activity className="h-8 w-8" />,
    },
    {
      id: "emergency",
      name: "Экстренная помощь",
      description: "Круглосуточная экстренная ветеринарная помощь",
      price: 5000,
      duration: "45 мин",
      icon: <Heart className="h-8 w-8" />,
      urgent: true,
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
      photo: "/placeholder.svg?height=120&width=120",
      schedule: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
    },
    {
      id: "petrova",
      name: "Петрова Анна Михайловна",
      specialization: "Дерматолог, офтальмолог",
      experience: "12 лет",
      rating: 4.8,
      reviews: 189,
      photo: "/placeholder.svg?height=120&width=120",
      schedule: ["10:00", "11:00", "12:00", "15:00", "16:00", "17:00"],
    },
    {
      id: "sidorov",
      name: "Сидоров Михаил Александрович",
      specialization: "Кардиолог, невролог",
      experience: "8 лет",
      rating: 4.7,
      reviews: 156,
      photo: "/placeholder.svg?height=120&width=120",
      schedule: ["09:00", "10:00", "13:00", "14:00", "15:00"],
    },
  ]

  const timeSlots = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"]

  const handleBooking = () => {
    if (!state.user) {
      alert("Для записи на прием необходимо войти в аккаунт")
      return
    }

    if (!selectedService || !selectedDoctor || !selectedDate || !selectedTime) {
      alert("Пожалуйста, заполните все поля")
      return
    }

    // Создаем новую запись к врачу
    const newAppointment = {
      id: `appointment-${Date.now()}`,
      userId: state.user.id,
      serviceId: selectedService,
      doctorId: selectedDoctor,
      date: selectedDate,
      time: selectedTime,
      status: "scheduled" as const,
      notes: `Запись на ${services.find((s) => s.id === selectedService)?.name} к врачу ${doctors.find((d) => d.id === selectedDoctor)?.name}`,
    }

    // Добавляем запись в контекст
    dispatch({ type: "ADD_APPOINTMENT", payload: newAppointment })

    alert("Запись успешно создана! Мы свяжемся с вами для подтверждения.")
    setShowBookingForm(false)
    setSelectedService(null)
    setSelectedDoctor(null)
    setSelectedDate("")
    setSelectedTime("")
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-[#F0E6D2] to-[#E8D9B5] rounded-xl p-8 mb-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Ветеринарные услуги</h1>
            <p className="text-xl text-gray-700 mb-6">Профессиональная медицинская помощь для ваших питомцев</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="flex items-center space-x-2 text-gray-700">
                <Clock className="h-5 w-5" />
                <span>Работаем 24/7</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-700">
                <MapPin className="h-5 w-5" />
                <span>г. Саранск</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-700">
                <Phone className="h-5 w-5" />
                <span>+7 (834) 123-45-67</span>
              </div>
            </div>
          </div>
        </div>

        {/* Services */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Наши услуги</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.id}
                className={`bg-white rounded-xl shadow-md p-6 cursor-pointer transition-all hover:shadow-lg ${
                  selectedService === service.id ? "ring-2 ring-[#E8D9B5]" : ""
                }`}
                onClick={() => setSelectedService(service.id)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-[#D4B896]">{service.icon}</div>
                  <div className="flex space-x-2">
                    {service.popular && (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Популярно</span>
                    )}
                    {service.urgent && (
                      <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">Срочно</span>
                    )}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.name}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-2xl font-bold text-gray-900">{service.price} ₽</span>
                    <span className="text-sm text-gray-500 ml-2">{service.duration}</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Doctors */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Наши врачи</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.map((doctor) => (
              <div
                key={doctor.id}
                className={`bg-white rounded-xl shadow-md p-6 cursor-pointer transition-all hover:shadow-lg ${
                  selectedDoctor === doctor.id ? "ring-2 ring-[#E8D9B5]" : ""
                }`}
                onClick={() => setSelectedDoctor(doctor.id)}
              >
                <div className="text-center mb-4">
                  <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <User className="h-12 w-12 text-gray-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{doctor.name}</h3>
                  <p className="text-gray-600">{doctor.specialization}</p>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Опыт:</span>
                    <span className="font-medium">{doctor.experience}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Рейтинг:</span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="font-medium">{doctor.rating}</span>
                      <span className="text-gray-500">({doctor.reviews})</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Booking Form */}
        {(selectedService || selectedDoctor) && (
          <section className="mb-12">
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Запись на прием</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Date Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Выберите дату</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F8F4E9]"
                  />
                </div>

                {/* Time Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Выберите время</label>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`px-3 py-2 text-sm rounded-md transition-colors ${
                          selectedTime === time
                            ? "bg-[#E8D9B5] text-gray-900"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Selected Service & Doctor Summary */}
              {(selectedService || selectedDoctor) && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Детали записи:</h3>
                  {selectedService && (
                    <p className="text-gray-600">Услуга: {services.find((s) => s.id === selectedService)?.name}</p>
                  )}
                  {selectedDoctor && (
                    <p className="text-gray-600">Врач: {doctors.find((d) => d.id === selectedDoctor)?.name}</p>
                  )}
                  {selectedDate && (
                    <p className="text-gray-600">Дата: {new Date(selectedDate).toLocaleDateString("ru-RU")}</p>
                  )}
                  {selectedTime && <p className="text-gray-600">Время: {selectedTime}</p>}
                </div>
              )}

              <div className="mt-6 flex space-x-4">
                <button
                  onClick={handleBooking}
                  className="flex-1 bg-[#E8D9B5] hover:bg-[#D4B896] text-gray-900 font-medium py-3 px-6 rounded-lg transition-colors"
                >
                  Записаться на прием
                </button>
                <button
                  onClick={() => {
                    setSelectedService(null)
                    setSelectedDoctor(null)
                    setSelectedDate("")
                    setSelectedTime("")
                  }}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Отмена
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Emergency Contact */}
        <section className="bg-red-50 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-red-800 mb-4">Экстренная помощь 24/7</h2>
          <p className="text-red-700 mb-6">
            Если вашему питомцу требуется срочная медицинская помощь, звоните немедленно!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+78341234567"
              className="inline-flex items-center justify-center bg-red-600 text-white font-medium py-3 px-6 rounded-lg hover:bg-red-700 transition-colors"
            >
              <Phone className="h-5 w-5 mr-2" />
              Экстренный вызов
            </a>
            <button
              onClick={() => {
                setSelectedService("emergency")
                setShowBookingForm(true)
              }}
              className="inline-flex items-center justify-center bg-white text-red-600 border border-red-600 font-medium py-3 px-6 rounded-lg hover:bg-red-50 transition-colors"
            >
              <Calendar className="h-5 w-5 mr-2" />
              Записаться на экстренный прием
            </button>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}
