import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600">© 2025 Питомец+. Все права защищены.</p>
          </div>
          <div className="flex space-x-6">
            <Link href="/about" className="text-gray-600 hover:text-gray-900 transition">
              О нас
            </Link>
            <Link href="/contacts" className="text-gray-600 hover:text-gray-900 transition">
              Контакты
            </Link>
            <Link href="/privacy" className="text-gray-600 hover:text-gray-900 transition">
              Политика конфиденциальности
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
