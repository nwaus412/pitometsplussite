import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react"

export default function ContactsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Контакты</h1>
          <p className="text-xl text-gray-600">Свяжитесь с нами любым удобным способом</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-xl shadow-md p-8 flex flex-col justify-center min-h-[400px]">
            <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">Наши контакты</h2>

            <div className="space-y-8">
              <div className="flex items-center justify-center space-x-4">
                <MapPin className="h-6 w-6 text-[#D4B896]" />
                <div className="text-center">
                  <h3 className="font-semibold text-gray-900">Адрес</h3>
                  <p className="text-gray-600">г. Саранск, Россия</p>
                </div>
              </div>

              <div className="flex items-center justify-center space-x-4">
                <Phone className="h-6 w-6 text-[#D4B896]" />
                <div className="text-center">
                  <h3 className="font-semibold text-gray-900">Телефон</h3>
                  <p className="text-gray-600">+7 (834) 123-45-67</p>
                  <p className="text-sm text-gray-500">Ежедневно с 9:00 до 21:00</p>
                </div>
              </div>

              <div className="flex items-center justify-center space-x-4">
                <Mail className="h-6 w-6 text-[#D4B896]" />
                <div className="text-center">
                  <h3 className="font-semibold text-gray-900">Email</h3>
                  <p className="text-gray-600">info@petplus.local</p>
                  <p className="text-sm text-gray-500">Ответим в течение 24 часов</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Мы в социальных сетях</h2>

            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-[#F0E6D2] rounded-lg cursor-default">
                <div className="h-12 w-12 bg-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">VK</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">ВКонтакте</h3>
                  <p className="text-gray-600 text-sm">Новости, акции и полезные советы</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-[#F0E6D2] rounded-lg cursor-default">
                <div className="h-12 w-12 bg-blue-400 rounded-lg flex items-center justify-center">
                  <MessageCircle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Telegram</h3>
                  <p className="text-gray-600 text-sm">Быстрая связь и консультации</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Время работы</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p>Понедельник - Пятница: 9:00 - 21:00</p>
                <p>Суббота - Воскресенье: 10:00 - 20:00</p>
                <p className="text-gray-900 font-medium">Онлайн-заказы принимаются круглосуточно</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#F0E6D2] to-[#E8D9B5] rounded-xl p-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Есть вопросы о товарах для питомцев?</h2>
          <p className="text-gray-700 mb-6">Наши эксперты помогут выбрать идеальный товар для вашего любимца</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+78341234567"
              className="inline-flex items-center justify-center bg-white text-gray-900 font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <Phone className="h-5 w-5 mr-2" />
              Позвонить
            </a>
            <a
              href="mailto:info@petplus.local"
              className="inline-flex items-center justify-center bg-white text-gray-900 font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <Mail className="h-5 w-5 mr-2" />
              Написать
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
