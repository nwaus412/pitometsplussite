"use client"

import Link from "next/link"
import { useApp } from "@/contexts/AppContext"
import { ShoppingCart, User, PawPrint } from "lucide-react"

export default function Header() {
  const { state } = useApp()
  const cartItemsCount = state.cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <PawPrint className="h-8 w-8 text-[#E8D9B5] fill-current" />
            <span className="text-2xl font-bold text-gray-900">Питомец+</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-gray-900 transition">
              Главная
            </Link>
            <Link href="/categories" className="text-gray-700 hover:text-gray-900 transition">
              Категории
            </Link>
            <Link href="/veterinary" className="text-gray-700 hover:text-gray-900 transition">
              Ветуслуги
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-gray-900 transition">
              О нас
            </Link>
            <Link href="/contacts" className="text-gray-700 hover:text-gray-900 transition">
              Контакты
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Link href="/cart" className="relative p-2 text-gray-700 hover:text-gray-900 transition">
              <ShoppingCart className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
            <Link
              href={state.user ? "/profile" : "/login"}
              className="p-2 text-gray-700 hover:text-gray-900 transition"
            >
              <User className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
