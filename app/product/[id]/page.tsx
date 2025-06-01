"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { useApp } from "@/contexts/AppContext"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { ShoppingCart, ArrowLeft, Star } from "lucide-react"

export default function ProductPage() {
  const { id } = useParams()
  const router = useRouter()
  const { state, dispatch } = useApp()
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)

  const product = state.products.find((p) => p.id === id)

  useEffect(() => {
    if (!product) {
      router.push("/categories")
    }
  }, [product, router])

  if (!product) {
    return null
  }

  const discountedPrice = product.discount ? product.price * (1 - product.discount / 100) : product.price

  // Генерируем количество отзывов на основе ID товара для консистентности
  const getReviewCount = (productId: string) => {
    const hash = productId.split("").reduce((a, b) => {
      a = (a << 5) - a + b.charCodeAt(0)
      return a & a
    }, 0)
    return Math.abs(hash % 200) + 15 // От 15 до 214 отзывов
  }

  const reviewCount = getReviewCount(product.id)

  const handleAddToCart = async () => {
    setIsAdding(true)
    dispatch({
      type: "ADD_TO_CART",
      payload: { product, quantity },
    })

    // Анимация на 1 секунду
    setTimeout(() => {
      setIsAdding(false)
    }, 1000)
  }

  const relatedProducts = state.products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <button onClick={() => router.back()} className="flex items-center space-x-1 hover:text-gray-900">
            <ArrowLeft className="h-4 w-4" />
            <span>Назад</span>
          </button>
          <span>/</span>
          <span>{product.category}</span>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
              <Image
                src={product.imageUrl || "/placeholder.svg"}
                alt={product.name}
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">{product.category}</span>
                {product.discount && (
                  <span className="text-sm text-white bg-red-500 px-2 py-1 rounded">-{product.discount}%</span>
                )}
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="text-sm text-gray-600">(4.8) • {reviewCount} отзывов</span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-4 mb-6">
                {product.discount ? (
                  <>
                    <span className="text-3xl font-bold text-gray-900">{Math.round(discountedPrice)} ₽</span>
                    <span className="text-xl text-gray-500 line-through">{product.price} ₽</span>
                    <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded">
                      Экономия {Math.round(product.price - discountedPrice)} ₽
                    </span>
                  </>
                ) : (
                  <span className="text-3xl font-bold text-gray-900">{product.price} ₽</span>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Описание</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Characteristics */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Характеристики</h3>
              <ul className="space-y-2">
                {product.characteristics.map((char, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-[#D4B896] mt-1">•</span>
                    <span className="text-gray-600">{char}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Add to Cart */}
            <div className="border-t pt-6">
              <div className="flex items-center space-x-4 mb-4">
                <label htmlFor="quantity" className="text-sm font-medium text-gray-700">
                  Количество:
                </label>
                <input
                  type="number"
                  id="quantity"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
                  className="w-20 px-3 py-2 border border-gray-300 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-[#F8F4E9]"
                />
              </div>

              <button
                onClick={handleAddToCart}
                disabled={isAdding}
                className={`w-full font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 ${
                  isAdding
                    ? "bg-green-500 text-white transform scale-105"
                    : "bg-[#E8D9B5] hover:bg-[#D4B896] text-gray-900"
                }`}
              >
                {isAdding ? (
                  <>
                    <span>✓</span>
                    <span>Добавлено в корзину!</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-5 w-5" />
                    <span>Добавить в корзину</span>
                  </>
                )}
              </button>

              <div className="mt-4 text-sm text-gray-600 space-y-1">
                <p>✓ Быстрая доставка по России</p>
                <p>✓ Гарантия качества</p>
                <p>✓ Возврат в течение 14 дней</p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Похожие товары</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct.id} className="bg-white rounded-xl shadow-md p-4">
                  <Image
                    src={relatedProduct.imageUrl || "/placeholder.svg"}
                    alt={relatedProduct.name}
                    width={200}
                    height={200}
                    className="w-full h-40 object-cover rounded-lg mb-3"
                  />
                  <h3 className="font-semibold text-gray-900 mb-2">{relatedProduct.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">
                      {relatedProduct.discount
                        ? Math.round(relatedProduct.price * (1 - relatedProduct.discount / 100))
                        : relatedProduct.price}{" "}
                      ₽
                    </span>
                    <button
                      onClick={() => router.push(`/product/${relatedProduct.id}`)}
                      className="text-[#D4B896] hover:text-[#B8A082] text-sm font-medium"
                    >
                      Подробнее →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
