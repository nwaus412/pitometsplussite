"use client"

import { useApp } from "@/contexts/AppContext"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import ProductCard from "@/components/ProductCard"
import Link from "next/link"
import {
  ArrowRight,
  Gift,
  Truck,
  Shield,
  IceCreamBowlIcon as Bowl,
  Gamepad2,
  Bed,
  BoxIcon as Bottle,
  LinkIcon,
  Pill,
  Stethoscope,
  Calendar,
  Heart,
} from "lucide-react"

export default function HomePage() {
  const { state } = useApp()

  // Get special offers (products with discounts)
  const specialOffers = state.products.filter((product) => product.discount).slice(0, 4)

  // Get categories
  const categories = Array.from(new Set(state.products.map((p) => p.category)))

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Корма":
        return <Bowl className="h-8 w-8 text-gray-700" />
      case "Игрушки":
        return <Gamepad2 className="h-8 w-8 text-gray-700" />
      case "Лежаки":
        return <Bed className="h-8 w-8 text-gray-700" />
      case "Гигиена":
        return <Bottle className="h-8 w-8 text-gray-700" />
      case "Аксессуары":
        return <LinkIcon className="h-8 w-8 text-gray-700" />
      case "Ветпрепараты":
        return <Pill className="h-8 w-8 text-gray-700" />
      default:
        return <span className="text-2xl">🐾</span>
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-[#F0E6D2] to-[#E8D9B5] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">Добро пожаловать в «Питомец+»</h1>
          <p className="text-xl text-gray-700 mb-8">Всё для ваших любимцев в одном месте</p>
          <Link
            href="/categories"
            className="inline-flex items-center space-x-2 bg-white text-gray-900 font-semibold py-3 px-8 rounded-xl shadow-md hover:shadow-lg transition-shadow"
          >
            <span>Перейти в каталог</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Veterinary Services Banner */}
      <section className="py-12 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <Stethoscope className="h-10 w-10 text-blue-600" />
                  <h2 className="text-3xl font-bold text-gray-900">Ветеринарные услуги</h2>
                </div>
                <p className="text-gray-600 mb-6 text-lg">
                  Профессиональная медицинская помощь для ваших питомцев. Опытные врачи, современное оборудование,
                  круглосуточная поддержка.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/veterinary"
                    className="inline-flex items-center justify-center bg-blue-600 text-white font-medium py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Calendar className="h-5 w-5 mr-2" />
                    Записаться на прием
                  </Link>
                  <a
                    href="tel:+78341234567"
                    className="inline-flex items-center justify-center border border-blue-600 text-blue-600 font-medium py-3 px-6 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    <Heart className="h-5 w-5 mr-2" />
                    Экстренный вызов
                  </a>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">24/7</div>
                  <div className="text-sm text-gray-600">Круглосуточно</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">15+</div>
                  <div className="text-sm text-gray-600">Лет опыта</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">500+</div>
                  <div className="text-sm text-gray-600">Довольных клиентов</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">4.9</div>
                  <div className="text-sm text-gray-600">Рейтинг</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Special Offers */}
      {specialOffers.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Специальные предложения к лету</h2>
              <p className="text-gray-600">Лучшие товары со скидками для ваших питомцев</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {specialOffers.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Promo Blocks */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <Gift className="h-12 w-12 text-[#E8D9B5] mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Корма со скидкой</h3>
              <p className="text-gray-600 mb-4">Премиальные корма для всех видов питомцев</p>
              <Link href="/categories" className="text-[#E8D9B5] font-medium hover:underline">
                Смотреть все →
              </Link>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <Truck className="h-12 w-12 text-[#E8D9B5] mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Быстрая доставка</h3>
              <p className="text-gray-600 mb-4">Доставим заказ в течение 1-2 дней</p>
              <Link href="/contacts" className="text-[#E8D9B5] font-medium hover:underline">
                Подробнее →
              </Link>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <Shield className="h-12 w-12 text-[#E8D9B5] mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Гарантия качества</h3>
              <p className="text-gray-600 mb-4">Только проверенные товары от лучших производителей</p>
              <Link href="/about" className="text-[#E8D9B5] font-medium hover:underline">
                О качестве →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Категории товаров</h2>
            <p className="text-gray-600">Выберите нужную категорию для вашего питомца</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link
                key={category}
                href={`/categories?category=${encodeURIComponent(category)}`}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 text-center"
              >
                <div className="h-16 w-16 bg-[#F0E6D2] rounded-full flex items-center justify-center mx-auto mb-4">
                  {getCategoryIcon(category)}
                </div>
                <h3 className="font-semibold text-gray-900">{category}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
