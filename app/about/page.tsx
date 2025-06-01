import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Award, Truck, Shield, PawPrint, Heart } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">О нас</h1>
          <p className="text-xl text-gray-600">«Питомец+» — ваш надёжный партнёр в заботе о любимых питомцах</p>
        </div>

        <div className="prose prose-lg max-w-none mb-12">
          <div className="bg-[#F0E6D2] rounded-xl p-8 mb-8">
            <div className="flex items-center justify-center mb-6">
              <PawPrint className="h-16 w-16 text-gray-700" />
            </div>
            <p className="text-gray-700 text-center text-lg leading-relaxed">
              Мы создали «Питомец+» с одной простой целью — сделать жизнь ваших питомцев счастливее и здоровее. Наша
              команда состоит из настоящих любителей животных, которые понимают, насколько важно обеспечить своих
              четвероногих друзей качественными товарами и заботой.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Наша миссия</h2>
              <p className="text-gray-600 leading-relaxed">
                Мы стремимся предоставить владельцам домашних животных доступ к лучшим товарам для их питомцев. От
                качественных кормов до игрушек и аксессуаров — мы тщательно отбираем каждый товар в нашем каталоге.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Наша история</h2>
              <p className="text-gray-600 leading-relaxed">
                Основанный в 2025 году в Саранске, «Питомец+» начинался как небольшой семейный бизнес. Сегодня мы
                гордимся тем, что помогаем тысячам семей заботиться о своих любимцах по всей России.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="text-center">
            <div className="bg-white rounded-xl shadow-md p-6">
              <Award className="h-12 w-12 text-[#E8D9B5] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Качество</h3>
              <p className="text-gray-600 text-sm">Только проверенные товары от надёжных производителей</p>
            </div>
          </div>

          <div className="text-center">
            <div className="bg-white rounded-xl shadow-md p-6">
              <Truck className="h-12 w-12 text-[#E8D9B5] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Доставка</h3>
              <p className="text-gray-600 text-sm">Быстрая и надёжная доставка по всей России</p>
            </div>
          </div>

          <div className="text-center">
            <div className="bg-white rounded-xl shadow-md p-6">
              <Shield className="h-12 w-12 text-[#E8D9B5] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Гарантия</h3>
              <p className="text-gray-600 text-sm">Гарантия качества на все товары в нашем магазине</p>
            </div>
          </div>

          <div className="text-center">
            <div className="bg-white rounded-xl shadow-md p-6">
              <Heart className="h-12 w-12 text-[#E8D9B5] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Забота</h3>
              <p className="text-gray-600 text-sm">Индивидуальный подход к каждому клиенту</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Почему выбирают «Питомец+»?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Широкий ассортимент</h3>
              <p className="text-gray-600 text-sm">
                Более 1000 товаров для собак, кошек, птиц и других домашних животных
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Выгодные цены</h3>
              <p className="text-gray-600 text-sm">
                Конкурентные цены и регулярные акции для наших постоянных клиентов
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Экспертность</h3>
              <p className="text-gray-600 text-sm">
                Наши консультанты помогут выбрать идеальный товар для вашего питомца
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
