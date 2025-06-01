"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { useApp } from "@/contexts/AppContext"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import ProductCard from "@/components/ProductCard"

export default function CategoriesPage() {
  const { state } = useApp()
  const searchParams = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState<string>("")

  const categories = Array.from(new Set(state.products.map((p) => p.category)))

  useEffect(() => {
    const categoryParam = searchParams.get("category")
    if (categoryParam) {
      setSelectedCategory(categoryParam)
    }
  }, [searchParams])

  const filteredProducts = selectedCategory
    ? state.products.filter((product) => product.category === selectedCategory)
    : state.products

  const groupedProducts = categories.reduce(
    (acc, category) => {
      acc[category] = state.products.filter((product) => product.category === category)
      return acc
    },
    {} as Record<string, typeof state.products>,
  )

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Каталог товаров</h1>

        {/* Category Navigation */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory("")}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                selectedCategory === "" ? "bg-[#F8F4E9] text-gray-900" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Все категории
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  selectedCategory === category
                    ? "bg-[#F8F4E9] text-gray-900"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Products */}
        {selectedCategory ? (
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">{selectedCategory}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-12">
            {categories.map((category) => (
              <div key={category}>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">{category}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {groupedProducts[category].map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
