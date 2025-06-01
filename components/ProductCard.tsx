"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useApp } from "@/contexts/AppContext"
import { ShoppingCart } from "lucide-react"

interface Product {
  id: string
  name: string
  category: string
  imageUrl: string
  description: string
  characteristics: string[]
  price: number
  discount?: number
}

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { dispatch } = useApp()
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)

  const discountedPrice = product.discount ? product.price * (1 - product.discount / 100) : product.price

  const handleAddToCart = async () => {
    setIsAdding(true)
    dispatch({
      type: "ADD_TO_CART",
      payload: { product, quantity },
    })
    setQuantity(1)

    // Анимация на 1 секунду
    setTimeout(() => {
      setIsAdding(false)
    }, 1000)
  }

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-4 flex flex-col h-full">
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative mb-4">
          <Image
            src={product.imageUrl || "/placeholder.svg"}
            alt={product.name}
            width={300}
            height={300}
            className="w-full h-48 object-cover rounded-lg hover:opacity-90 transition-opacity"
          />
          {product.discount && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-medium">
              -{product.discount}%
            </div>
          )}
        </div>

        <h3 className="text-lg font-semibold mb-2 text-gray-900 hover:text-[#D4B896] transition-colors">
          {product.name}
        </h3>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
      </Link>

      <div className="mb-3">
        <h4 className="text-sm font-medium text-gray-700 mb-1">Характеристики:</h4>
        <ul className="text-xs text-gray-600 space-y-1">
          {product.characteristics.slice(0, 3).map((char, index) => (
            <li key={index}>• {char}</li>
          ))}
        </ul>
      </div>

      {/* Добавляем flex-grow для создания пустого пространства */}
      <div className="flex-grow"></div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex flex-col">
          {product.discount ? (
            <>
              <span className="text-lg font-bold text-gray-900">{Math.round(discountedPrice)} ₽</span>
              <span className="text-sm text-gray-500 line-through">{product.price} ₽</span>
            </>
          ) : (
            <span className="text-lg font-bold text-gray-900">{product.price} ₽</span>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
            className="w-16 px-2 py-1 border border-gray-300 rounded-md text-center"
          />
        </div>
      </div>

      <button
        onClick={handleAddToCart}
        disabled={isAdding}
        className={`w-full font-medium py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 ${
          isAdding ? "bg-green-500 text-white transform scale-105" : "bg-[#E8D9B5] hover:bg-[#D4B896] text-gray-900"
        }`}
      >
        {isAdding ? (
          <>
            <span>✓</span>
            <span>Добавлено!</span>
          </>
        ) : (
          <>
            <ShoppingCart className="h-4 w-4" />
            <span>Добавить в корзину</span>
          </>
        )}
      </button>
    </div>
  )
}
