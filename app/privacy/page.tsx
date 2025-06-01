import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Политика конфиденциальности</h1>
          <p className="text-xl text-gray-600">
            Информация о том, как мы собираем, используем и защищаем ваши персональные данные
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="bg-[#F0E6D2] rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Общие положения</h2>
            <p className="text-gray-700 leading-relaxed">
              Настоящая Политика конфиденциальности определяет порядок обработки персональных данных пользователей
              интернет-магазина «Питомец+». Мы серьезно относимся к защите ваших персональных данных и обеспечиваем их
              безопасность в соответствии с требованиями действующего законодательства Российской Федерации.
            </p>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Какие данные мы собираем</h2>
              <div className="bg-white rounded-xl shadow-md p-6">
                <p className="text-gray-600 mb-4">Мы можем собирать следующие категории персональных данных:</p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Имя и фамилия</li>
                  <li>Адрес электронной почты</li>
                  <li>Номер телефона</li>
                  <li>Адрес доставки</li>
                  <li>Информация о заказах и покупках</li>
                  <li>Данные об использовании сайта (cookies, IP-адрес)</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Цели обработки данных</h2>
              <div className="bg-white rounded-xl shadow-md p-6">
                <p className="text-gray-600 mb-4">Мы используем ваши персональные данные для:</p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Обработки и выполнения заказов</li>
                  <li>Связи с вами по вопросам заказов</li>
                  <li>Предоставления клиентской поддержки</li>
                  <li>Улучшения качества наших услуг</li>
                  <li>Отправки информации о новых товарах и акциях (с вашего согласия)</li>
                  <li>Соблюдения правовых обязательств</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Защита данных</h2>
              <div className="bg-white rounded-xl shadow-md p-6">
                <p className="text-gray-600 mb-4">
                  Мы применяем технические и организационные меры для защиты ваших персональных данных:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Шифрование данных при передаче</li>
                  <li>Ограниченный доступ к персональным данным</li>
                  <li>Регулярное обновление систем безопасности</li>
                  <li>Обучение сотрудников правилам обработки данных</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Передача данных третьим лицам</h2>
              <div className="bg-white rounded-xl shadow-md p-6">
                <p className="text-gray-600 mb-4">
                  Мы можем передавать ваши данные третьим лицам только в следующих случаях:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Службам доставки для выполнения заказов</li>
                  <li>Платежным системам для обработки платежей</li>
                  <li>При наличии вашего явного согласия</li>
                  <li>По требованию государственных органов в рамках закона</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Ваши права</h2>
              <div className="bg-white rounded-xl shadow-md p-6">
                <p className="text-gray-600 mb-4">Вы имеете право:</p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Получать информацию об обработке ваших данных</li>
                  <li>Требовать исправления неточных данных</li>
                  <li>Требовать удаления ваших данных</li>
                  <li>Отозвать согласие на обработку данных</li>
                  <li>Обратиться с жалобой в надзорный орган</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Cookies</h2>
              <div className="bg-white rounded-xl shadow-md p-6">
                <p className="text-gray-600">
                  Наш сайт использует файлы cookies для улучшения пользовательского опыта, анализа трафика и
                  персонализации контента. Вы можете управлять настройками cookies в своем браузере.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Контактная информация</h2>
              <div className="bg-white rounded-xl shadow-md p-6">
                <p className="text-gray-600 mb-4">
                  По вопросам обработки персональных данных вы можете обратиться к нам:
                </p>
                <div className="text-gray-600 space-y-2">
                  <p>
                    <strong>Email:</strong> privacy@petplus.local
                  </p>
                  <p>
                    <strong>Телефон:</strong> +7 (834) 123-45-67
                  </p>
                  <p>
                    <strong>Адрес:</strong> г. Саранск, Россия
                  </p>
                </div>
              </div>
            </section>
          </div>

          <div className="mt-12 p-6 bg-gray-50 rounded-xl">
            <p className="text-sm text-gray-600 text-center">
              Настоящая Политика конфиденциальности вступает в силу с момента размещения на сайте и действует до ее
              отмены или изменения. Мы оставляем за собой право вносить изменения в данную Политику. Актуальная версия
              всегда доступна на нашем сайте.
            </p>
            <p className="text-sm text-gray-500 text-center mt-4">Последнее обновление: 1 января 2025 года</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
