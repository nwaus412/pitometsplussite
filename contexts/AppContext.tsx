"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect } from "react"

// Types
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

interface CartItem {
  product: Product
  quantity: number
}

interface VeterinaryAppointment {
  id: string
  userId: string
  serviceId: string
  doctorId: string
  date: string
  time: string
  status: "scheduled" | "completed" | "cancelled"
  notes?: string
}

interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
  registrationDate: string
  orders: Order[]
  appointments: VeterinaryAppointment[]
}

interface Order {
  id: string
  userId: string
  items: CartItem[]
  totalAmount: number
  date: string
  status: "Новый" | "В обработке" | "Отправлен" | "Доставлен"
  deliveryAddress: string
  deliveryMethod: string
}

interface AppState {
  user: User | null
  cart: CartItem[]
  products: Product[]
  users: User[]
  orders: Order[]
  appointments: VeterinaryAppointment[]
}

type AppAction =
  | { type: "SET_USER"; payload: User | null }
  | { type: "ADD_TO_CART"; payload: { product: Product; quantity: number } }
  | { type: "UPDATE_CART_ITEM"; payload: { productId: string; quantity: number } }
  | { type: "REMOVE_FROM_CART"; payload: string }
  | { type: "CLEAR_CART" }
  | { type: "SET_PRODUCTS"; payload: Product[] }
  | { type: "ADD_USER"; payload: User }
  | { type: "ADD_ORDER"; payload: Order }
  | { type: "ADD_APPOINTMENT"; payload: VeterinaryAppointment }
  | { type: "LOAD_DATA"; payload: Partial<AppState> }

const initialState: AppState = {
  user: null,
  cart: [],
  products: [],
  users: [],
  orders: [],
  appointments: [],
}

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload }
    case "ADD_TO_CART":
      const existingItem = state.cart.find((item) => item.product.id === action.payload.product.id)
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.product.id === action.payload.product.id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item,
          ),
        }
      }
      return {
        ...state,
        cart: [...state.cart, { product: action.payload.product, quantity: action.payload.quantity }],
      }
    case "UPDATE_CART_ITEM":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.product.id === action.payload.productId ? { ...item, quantity: action.payload.quantity } : item,
        ),
      }
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.product.id !== action.payload),
      }
    case "CLEAR_CART":
      return { ...state, cart: [] }
    case "SET_PRODUCTS":
      return { ...state, products: action.payload }
    case "ADD_USER":
      return { ...state, users: [...state.users, action.payload] }
    case "ADD_ORDER":
      const updatedUsers = state.users.map((user) =>
        user.id === action.payload.userId ? { ...user, orders: [...user.orders, action.payload] } : user,
      )
      return {
        ...state,
        orders: [...state.orders, action.payload],
        users: updatedUsers,
        user:
          state.user?.id === action.payload.userId
            ? { ...state.user, orders: [...state.user.orders, action.payload] }
            : state.user,
      }
    case "ADD_APPOINTMENT":
      const updatedUsersWithAppointment = state.users.map((user) =>
        user.id === action.payload.userId
          ? { ...user, appointments: [...(user.appointments || []), action.payload] }
          : user,
      )
      return {
        ...state,
        appointments: [...state.appointments, action.payload],
        users: updatedUsersWithAppointment,
        user:
          state.user?.id === action.payload.userId
            ? { ...state.user, appointments: [...(state.user.appointments || []), action.payload] }
            : state.user,
      }
    case "LOAD_DATA":
      return { ...state, ...action.payload }
    default:
      return state
  }
}

const AppContext = createContext<{
  state: AppState
  dispatch: React.Dispatch<AppAction>
} | null>(null)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  useEffect(() => {
    // Load data from localStorage
    const savedData = localStorage.getItem("petplus-data")
    if (savedData) {
      const parsedData = JSON.parse(savedData)
      dispatch({ type: "LOAD_DATA", payload: parsedData })
    } else {
      // Initialize with demo data
      initializeData()
    }
  }, [])

  useEffect(() => {
    // Save data to localStorage whenever state changes
    localStorage.setItem("petplus-data", JSON.stringify(state))
  }, [state])

  const initializeData = () => {
    // Demo user
    const demoUser: User = {
      id: "demo-user-id",
      firstName: "Демо",
      lastName: "Пользователь",
      email: "demo@petplus.local",
      phone: "+70000000000",
      password: "Demo1234",
      registrationDate: "2025-01-01",
      orders: [],
      appointments: [],
    }

    // Demo products с реальными товарами и изображениями
    const products: Product[] = [
      // Корма (6 товаров)
      {
        id: "korma-1",
        name: "Royal Canin Adult для собак",
        category: "Корма",
        imageUrl: "/images/royal-canin-adult.png",
        description: "Полнорационный сухой корм для взрослых собак средних пород от 1 до 7 лет.",
        characteristics: ["Вес: 15 кг", "Возраст: 1-7 лет", "Порода: средние"],
        price: 4500,
        discount: 15,
      },
      {
        id: "korma-2",
        name: "Hill's Science Plan для кошек",
        category: "Корма",
        imageUrl: "/images/hills-science-plan.png",
        description: "Сухой корм для взрослых кошек с курицей, поддерживает здоровье мочевыводящих путей.",
        characteristics: ["Вес: 10 кг", "Возраст: 1-6 лет", "Вкус: курица"],
        price: 3200,
        discount: 20,
      },
      {
        id: "korma-3",
        name: "Purina Pro Plan для щенков",
        category: "Корма",
        imageUrl: "/images/purina-pro-plan.png",
        description: "Сухой корм для щенков мелких пород с курицей и рисом.",
        characteristics: ["Вес: 12 кг", "Возраст: 2-15 месяцев", "Порода: мелкие"],
        price: 3800,
      },
      {
        id: "korma-4",
        name: "Acana Grasslands для собак",
        category: "Корма",
        imageUrl: "/images/acana-grasslands.jpg",
        description: "Беззерновой корм с ягненком, уткой и яйцами для всех пород собак.",
        characteristics: ["Вес: 11.4 кг", "Беззерновой", "Все породы"],
        price: 6200,
      },
      {
        id: "korma-5",
        name: "Whiskas для кошек с рыбой",
        category: "Корма",
        imageUrl: "/images/whiskas-ryba.png",
        description: "Сухой корм для взрослых кошек с рыбой и овощами.",
        characteristics: ["Вес: 5 кг", "Вкус: рыба", "Возраст: 1+ лет"],
        price: 1800,
      },
      {
        id: "korma-6",
        name: "Orijen Original для собак",
        category: "Корма",
        imageUrl: "/images/orijen-original.jpg",
        description: "Биологически соответствующий корм с курицей, индейкой и рыбой.",
        characteristics: ["Вес: 11.4 кг", "85% мяса", "Все породы"],
        price: 7500,
        discount: 10,
      },

      // Игрушки (8 товаров - добавлено 2)
      {
        id: "igrushki-1",
        name: "Мячик Kong Classic",
        category: "Игрушки",
        imageUrl: "/images/myachik-kong-classic.jpg",
        description: "Прочная резиновая игрушка для собак, можно наполнять лакомствами.",
        characteristics: ["Материал: натуральная резина", "Размер: M", "Для средних собак"],
        price: 850,
        discount: 25,
      },
      {
        id: "igrushki-2",
        name: "Удочка-дразнилка для кошек",
        category: "Игрушки",
        imageUrl: "/images/udochka-draznilka.webp",
        description: "Интерактивная игрушка с перьями и колокольчиком для активных игр.",
        characteristics: ["Длина: 40 см", "Материал: пластик, перья", "Звуковые эффекты"],
        price: 320,
        discount: 15,
      },
      {
        id: "igrushki-3",
        name: "Канат для собак",
        category: "Игрушки",
        imageUrl: "/images/kanat-sobak.png",
        description: "Плетеный канат из хлопка для игр и чистки зубов.",
        characteristics: ["Длина: 30 см", "Материал: 100% хлопок", "Чистка зубов"],
        price: 450,
      },
      {
        id: "igrushki-4",
        name: "Мышка с кошачьей мятой",
        category: "Игрушки",
        imageUrl: "/images/myshka-koshachya-myata.jpg",
        description: "Мягкая игрушка-мышка с натуральной кошачьей мятой внутри.",
        characteristics: ["Размер: 8 см", "Наполнитель: кошачья мята", "Мягкий материал"],
        price: 180,
      },
      {
        id: "igrushki-5",
        name: "Фрисби для собак",
        category: "Игрушки",
        imageUrl: "/images/frisbi-sobak.jpg",
        description: "Летающий диск из мягкой резины для активных игр на улице.",
        characteristics: ["Диаметр: 22 см", "Материал: мягкая резина", "Для улицы"],
        price: 680,
      },
      {
        id: "igrushki-6",
        name: "Интерактивный лабиринт",
        category: "Игрушки",
        imageUrl: "/images/interaktivnyy-labirint.webp",
        description: "Развивающая игрушка-головоломка для кошек с лакомствами.",
        characteristics: ["Размер: 25x25 см", "Материал: пластик", "Развивающая"],
        price: 1200,
      },
      {
        id: "igrushki-7",
        name: "Пищалка-косточка",
        category: "Игрушки",
        imageUrl: "/images/pishchalka-kostochka.webp",
        description: "Резиновая игрушка в форме косточки с пищалкой для маленьких собак.",
        characteristics: ["Размер: S", "Материал: резина", "Звуковые эффекты"],
        price: 290,
        discount: 20,
      },
      {
        id: "igrushki-8",
        name: "Туннель для кошек",
        category: "Игрушки",
        imageUrl: "/images/tunnel-koshki.webp",
        description: "Складной игровой туннель из шуршащего материала для кошек.",
        characteristics: ["Длина: 120 см", "Диаметр: 25 см", "Складной"],
        price: 980,
      },

      // Лежаки (7 товаров - добавлен 1)
      {
        id: "lezhaki-1",
        name: "Лежак ортопедический",
        category: "Лежаки",
        imageUrl: "/images/lezhak-ortopedicheskiy.jpg",
        description: "Ортопедический лежак с памятью формы для собак крупных пород.",
        characteristics: ["Размер: 100x70 см", "Материал: memory foam", "Съемный чехол"],
        price: 4500,
        discount: 15,
      },
      {
        id: "lezhaki-2",
        name: "Домик-лежак для кошек",
        category: "Лежаки",
        imageUrl: "/images/domik-lezhak-koshki.webp",
        description: "Уютный домик-лежак из мягкого плюша с подушкой внутри.",
        characteristics: ["Размер: 40x40x35 см", "Материал: плюш", "Машинная стирка"],
        price: 2200,
        discount: 20,
      },
      {
        id: "lezhaki-3",
        name: "Подстилка водонепроницаемая",
        category: "Лежаки",
        imageUrl: "/images/podstilka-vodonepronicaemaya.webp",
        description: "Водонепроницаемая подстилка для собак с антискользящим дном.",
        characteristics: ["Размер: 80x60 см", "Водонепроницаемая", "Антискольжение"],
        price: 1800,
      },
      {
        id: "lezhaki-4",
        name: "Лежак с бортиками",
        category: "Лежаки",
        imageUrl: "/images/lezhak-bortiki.jpg",
        description: "Мягкий лежак с высокими бортиками для комфортного сна.",
        characteristics: ["Размер: 60x50 см", "Высокие бортики", "Мягкий наполнитель"],
        price: 2800,
      },
      {
        id: "lezhaki-5",
        name: "Гамак для кошек",
        category: "Лежаки",
        imageUrl: "/images/gamak-koshki.webp",
        description: "Подвесной гамак для кошек, крепится к радиатору отопления.",
        characteristics: ["Размер: 50x35 см", "Крепление к радиатору", "Выдерживает до 15 кг"],
        price: 1200,
      },
      {
        id: "lezhaki-6",
        name: "Лежак с подогревом",
        category: "Лежаки",
        imageUrl: "/images/lezhak-podogrev.jpeg",
        description: "Электрический лежак с подогревом для пожилых животных.",
        characteristics: ["Размер: 70x50 см", "Подогрев", "Терморегулятор"],
        price: 3500,
      },
      {
        id: "lezhaki-7",
        name: "Матрас для переноски",
        category: "Лежаки",
        imageUrl: "/images/matras-perenoska.webp",
        description: "Компактный складной матрас для путешествий с питомцем.",
        characteristics: ["Размер: 60x40 см", "Складной", "Легкий вес"],
        price: 1600,
        discount: 10,
      },

      // Гигиена (6 товаров)
      {
        id: "gigiena-1",
        name: "Шампунь для собак гипоаллергенный",
        category: "Гигиена",
        imageUrl: "/images/shampun-gipoallergennyy.webp",
        description: "Мягкий гипоаллергенный шампунь для чувствительной кожи собак.",
        characteristics: ["Объем: 500 мл", "Гипоаллергенный", "pH-сбалансированный"],
        price: 680,
        discount: 15,
      },
      {
        id: "gigiena-2",
        name: "Влажные салфетки для лап",
        category: "Гигиена",
        imageUrl: "/images/salfetki-lapy.jpg",
        description: "Антибактериальные салфетки для очистки лап после прогулки.",
        characteristics: ["Количество: 100 шт", "Антибактериальные", "Алоэ вера"],
        price: 320,
        discount: 25,
      },
      {
        id: "gigiena-3",
        name: "Зубная паста для кошек",
        category: "Гигиена",
        imageUrl: "/images/zubnaya-pasta-koshki.jpg",
        description: "Специальная зубная паста со вкусом курицы для кошек.",
        characteristics: ["Объем: 75 мл", "Вкус: курица", "Безопасно при проглатывании"],
        price: 450,
      },
      {
        id: "gigiena-4",
        name: "Щетка-пуходерка",
        category: "Гигиена",
        imageUrl: "/images/shchetka-puhoderka.jpg",
        description: "Профессиональная щетка для удаления подшерстка у длинношерстных пород.",
        characteristics: ["Материал: нержавеющая сталь", "Эргономичная ручка", "Для длинной шерсти"],
        price: 890,
      },
      {
        id: "gigiena-5",
        name: "Спрей от запаха изо рта",
        category: "Гигиена",
        imageUrl: "/images/sprey-zapah-rta.jpg",
        description: "Освежающий спрей для полости рта собак и кошек.",
        characteristics: ["Объем: 120 мл", "Мятный вкус", "Антибактериальный"],
        price: 380,
      },
      {
        id: "gigiena-6",
        name: "Когтерез профессиональный",
        category: "Гигиена",
        imageUrl: "/images/kogterez-professionalnyy.jpg",
        description: "Профессиональный когтерез с защитой от перерезания.",
        characteristics: ["Материал: нержавеющая сталь", "Защита от перерезания", "Эргономичные ручки"],
        price: 750,
      },

      // Аксессуары (6 товаров)
      {
        id: "aksessuary-1",
        name: "Ошейник кожаный с заклепками",
        category: "Аксессуары",
        imageUrl: "/images/osheynik-kozha-zaklepki.jpg",
        description: "Стильный кожаный ошейник с металлическими заклепками для собак.",
        characteristics: ["Материал: натуральная кожа", "Размер: M (35-45 см)", "Регулируемый"],
        price: 1200,
        discount: 20,
      },
      {
        id: "aksessuary-2",
        name: "Поводок-рулетка 5 метров",
        category: "Аксессуары",
        imageUrl: "/images/povodok-ruletka.webp",
        description: "Автоматический поводок-рулетка с тормозом и фиксатором длины.",
        characteristics: ["Длина: 5 м", "Вес собаки: до 25 кг", "Автоматическая намотка"],
        price: 980,
        discount: 15,
      },
      {
        id: "aksessuary-3",
        name: "Миска из нержавеющей стали",
        category: "Аксессуары",
        imageUrl: "/images/miska-nerzhaveyka.webp",
        description: "Двойная миска из нержавеющей стали на подставке с резиновыми ножками.",
        characteristics: ["Объем: 2x400 мл", "Материал: нержавеющая сталь", "Антискользящие ножки"],
        price: 850,
      },
      {
        id: "aksessuary-4",
        name: "Переноска для кошек",
        category: "Аксессуары",
        imageUrl: "/images/perenoska-koshki.jpg",
        description: "Пластиковая переноска с металлической дверцей для кошек и мелких собак.",
        characteristics: ["Размер: 48x32x28 см", "Вес: до 8 кг", "Вентиляционные отверстия"],
        price: 2200,
      },
      {
        id: "aksessuary-5",
        name: "Шлейка светоотражающая",
        category: "Аксессуары",
        imageUrl: "/images/shleyka-svetootrazhayushchaya.png",
        description: "Мягкая шлейка с светоотражающими элементами для безопасных прогулок.",
        characteristics: ["Размер: L", "Светоотражающие элементы", "Мягкая подкладка"],
        price: 1100,
      },
      {
        id: "aksessuary-6",
        name: "Автопоилка с фильтром",
        category: "Аксессуары",
        imageUrl: "/images/autopoilka-filtr.jpg",
        description: "Автоматическая поилка с угольным фильтром и циркуляцией воды.",
        characteristics: ["Объем: 2.5 л", "Угольный фильтр", "Бесшумный насос"],
        price: 3200,
      },

      // Ветпрепараты (6 товаров)
      {
        id: "vetpreparaty-1",
        name: "Витамины для шерсти",
        category: "Ветпрепараты",
        imageUrl: "/images/vitaminy-dlya-shersti.jpg",
        description: "Комплекс витаминов для здоровья кожи и блеска шерсти собак и кошек.",
        characteristics: ["Количество: 60 таблеток", "Биотин + Омега-3", "Курс: 2 месяца"],
        price: 890,
        discount: 10,
      },
      {
        id: "vetpreparaty-2",
        name: "Капли от блох и клещей",
        category: "Ветпрепараты",
        imageUrl: "/images/kapli-blokhi-kleshchi.jpg",
        description: "Эффективные капли на холку от блох, клещей и комаров для собак.",
        characteristics: ["Объем: 1 мл", "Защита: 4 недели", "Вес собаки: 10-25 кг"],
        price: 450,
        discount: 15,
      },
      {
        id: "vetpreparaty-3",
        name: "Пробиотики для пищеварения",
        category: "Ветпрепараты",
        imageUrl: "/images/probiotiki-pishchevarenie.webp",
        description: "Пробиотический комплекс для нормализации пищеварения у кошек.",
        characteristics: ["Количество: 30 капсул", "Живые бактерии", "Для кошек всех возрастов"],
        price: 680,
      },
      {
        id: "vetpreparaty-4",
        name: "Успокоительное средство",
        category: "Ветпрепараты",
        imageUrl: "/images/uspokoitelnoe-sredstvo.jpg",
        description: "Натуральное успокоительное на основе трав для стрессовых ситуаций.",
        characteristics: ["Объем: 50 мл", "Натуральный состав", "Без привыкания"],
        price: 520,
      },
      {
        id: "vetpreparaty-5",
        name: "Глазные капли",
        category: "Ветпрепараты",
        imageUrl: "/images/glaznye-kapli.jpg",
        description: "Лечебные глазные капли для собак и кошек при воспалениях.",
        characteristics: ["Объем: 10 мл", "Антибактериальные", "Рецептурный препарат"],
        price: 380,
      },
      {
        id: "vetpreparaty-6",
        name: "Паста для выведения шерсти",
        category: "Ветпрепараты",
        imageUrl: "/images/pasta-vyvedenie-shersti.jpeg",
        description: "Мальт-паста для выведения шерсти из желудка кошек со вкусом тунца.",
        characteristics: ["Объем: 100 г", "Вкус: тунец", "Профилактика комков шерсти"],
        price: 420,
      },
    ]

    dispatch({ type: "ADD_USER", payload: demoUser })
    dispatch({ type: "SET_PRODUCTS", payload: products })
  }

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useApp must be used within AppProvider")
  }
  return context
}
