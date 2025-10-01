// Мок базы данных для клиентской стороны
// В реальном приложении это были бы API вызовы к серверу

const hotels = [
  {
    id: 1,
    name: "Гранд Отель Европа",
    city: "Санкт-Петербург", 
    address: "ул. Михайловская, 1/7",
    type: "Люкс отель",
    stars: 5,
    rating: 4.7,
    price_per_night: 25000,
    description: "Легендарный отель в самом сердце Санкт-Петербурга с богатой историей и безупречным сервисом.",
    amenities: ["WiFi", "Ресторан", "SPA", "Фитнес-центр", "Консьерж", "Парковка", "Бизнес-центр"],
    photos: ["facade.jpg", "room.jpg", "restaurant.jpg", "spa.jpg"],
    contact_phone: "+7 (812) 329-60-00",
    contact_email: "info@grandhoteleurope.com",
    website: "www.grandhoteleurope.com",
    review_count: 150,
    detailed_reviews: true,
    last_review_date: "2024-09-15",
    last_secret_guest_date: "2024-07-20",
    secret_guest_visit_rate: 0.15,
    rating_history: [
      { date: "2024-09-01", rating: 4.7 },
      { date: "2024-08-01", rating: 4.8 },
      { date: "2024-07-01", rating: 4.6 },
      { date: "2024-06-01", rating: 4.9 },
      { date: "2024-05-01", rating: 4.8 }
    ]
  },
  {
    id: 2,
    name: "Отель Метрополь",
    city: "Москва",
    address: "Театральный проезд, 2",
    type: "Люкс отель", 
    stars: 5,
    rating: 4.6,
    price_per_night: 30000,
    description: "Исторический отель в центре Москвы рядом с Большим театром и Красной площадью.",
    amenities: ["WiFi", "Ресторан", "SPA", "Фитнес-центр", "Консьерж", "Парковка", "Бизнес-центр", "Бассейн"],
    photos: ["facade.jpg", "room.jpg", "restaurant.jpg", "spa.jpg"],
    contact_phone: "+7 (495) 501-78-00", 
    contact_email: "info@metropol-moscow.ru",
    website: "www.metropol-moscow.ru",
    review_count: 89,
    detailed_reviews: false,
    last_review_date: "2024-06-10",
    last_secret_guest_date: "2024-03-15",
    secret_guest_visit_rate: 0.08,
    rating_history: [
      { date: "2024-09-01", rating: 4.6 },
      { date: "2024-08-01", rating: 4.7 },
      { date: "2024-07-01", rating: 4.8 },
      { date: "2024-06-01", rating: 4.9 },
      { date: "2024-05-01", rating: 4.8 }
    ]
  },
  {
    id: 3,
    name: "Курорт Роза Хутор",
    city: "Сочи",
    address: "Эстосадок, ул. Олимпийская, 35",
    type: "Горнолыжный курорт",
    stars: 4,
    rating: 4.5,
    price_per_night: 15000,
    description: "Современный горнолыжный курорт с прекрасными видами на горы и отличными склонами.",
    amenities: ["WiFi", "Ресторан", "SPA", "Фитнес-центр", "Лыжная школа", "Парковка", "Бассейн"],
    photos: ["facade.jpg", "room.jpg", "slopes.jpg", "spa.jpg"],
    contact_phone: "+7 (862) 240-40-40",
    contact_email: "info@rosaski.com", 
    website: "www.rosaski.com"
  },
  {
    id: 4,
    name: "Отель Астория",
    city: "Санкт-Петербург",
    address: "Большая Морская ул., 39",
    type: "Люкс отель",
    stars: 5,
    rating: 4.4,
    price_per_night: 20000,
    description: "Элегантный отель с видом на Исаакиевский собор в историческом центре города.",
    amenities: ["WiFi", "Ресторан", "SPA", "Фитнес-центр", "Консьерж", "Парковка"],
    photos: ["facade.jpg", "room.jpg", "restaurant.jpg", "view.jpg"],
    contact_phone: "+7 (812) 494-57-57",
    contact_email: "info@astoriaspb.ru",
    website: "www.astoriaspb.ru"
  },
  {
    id: 5,
    name: "Гранд Отель Сочи",
    city: "Сочи",
    address: "Курортный проспект, 75",
    type: "Курортный отель",
    stars: 4,
    rating: 4.2,
    price_per_night: 12000,
    description: "Уютный курортный отель на берегу Черного моря с собственным пляжем.",
    amenities: ["WiFi", "Ресторан", "SPA", "Пляж", "Бассейн", "Парковка"],
    photos: ["facade.jpg", "room.jpg", "beach.jpg", "pool.jpg"],
    contact_phone: "+7 (862) 555-01-01",
    contact_email: "info@grandsochi.ru",
    website: "www.grandsochi.ru",
    review_count: 45,
    detailed_reviews: false,
    last_review_date: "2024-08-20",
    last_secret_guest_date: null, // Никогда не проверялся
    secret_guest_visit_rate: 0.0,
    rating_history: [
      { date: "2024-09-01", rating: 4.2 },
      { date: "2024-08-01", rating: 4.3 },
      { date: "2024-07-01", rating: 4.5 },
      { date: "2024-06-01", rating: 4.6 },
      { date: "2024-05-01", rating: 4.7 }
    ]
  },
  {
    id: 6,
    name: "Отель Балчуг Кемпински",
    city: "Москва", 
    address: "ул. Балчуг, 1",
    type: "Люкс отель",
    stars: 5,
    rating: 4.8,
    price_per_night: 35000,
    description: "Роскошный отель с панорамным видом на Кремль и Красную площадь.",
    amenities: ["WiFi", "Ресторан", "SPA", "Фитнес-центр", "Консьерж", "Парковка", "Бизнес-центр", "Бассейн"],
    photos: ["facade.jpg", "room.jpg", "kremlin_view.jpg", "spa.jpg"],
    contact_phone: "+7 (495) 287-20-00",
    contact_email: "info@kempinski-moscow.com",
    website: "www.kempinski.com/moscow"
  },
  {
    id: 7,
    name: "Отель Англетер",
    city: "Санкт-Петербург",
    address: "Малая Морская ул., 24",
    type: "Бутик-отель",
    stars: 4,
    rating: 4.3,
    price_per_night: 18000,
    description: "Исторический бутик-отель в центре Петербурга с уникальным дизайном.",
    amenities: ["WiFi", "Ресторан", "Фитнес-центр", "Консьерж", "Парковка"],
    photos: ["facade.jpg", "room.jpg", "restaurant.jpg", "lobby.jpg"],
    contact_phone: "+7 (812) 494-56-66",
    contact_email: "info@angleterrehotel.com", 
    website: "www.angleterrehotel.com"
  },
  {
    id: 8,
    name: "Отель Рэдиссон Славянская",
    city: "Москва",
    address: "площадь Европы, 2",
    type: "Бизнес-отель",
    stars: 4,
    rating: 4.1,
    price_per_night: 14000,
    description: "Современный бизнес-отель рядом с Киевским вокзалом и деловым центром.",
    amenities: ["WiFi", "Ресторан", "Фитнес-центр", "Бизнес-центр", "Парковка", "Бассейн"],
    photos: ["facade.jpg", "room.jpg", "business_center.jpg", "pool.jpg"],
    contact_phone: "+7 (495) 941-80-20",
    contact_email: "info@radisson-slavyanskaya.com",
    website: "www.radisson.com/moscow"
  },
  {
    id: 9,
    name: "Отель Хилтон Ленинградская",
    city: "Москва",
    address: "Каланчевская ул., 21/40",
    type: "Люкс отель",
    stars: 5,
    rating: 4.5,
    price_per_night: 22000,
    description: "Элегантный отель в историческом здании сталинской эпохи у трех вокзалов.",
    amenities: ["WiFi", "Ресторан", "SPA", "Фитнес-центр", "Консьерж", "Парковка", "Бизнес-центр"],
    photos: ["facade.jpg", "room.jpg", "restaurant.jpg", "spa.jpg"],
    contact_phone: "+7 (495) 627-55-50",
    contact_email: "info@hilton-leningradskaya.com",
    website: "www.hilton.com/moscow"
  },
  {
    id: 10,
    name: "Отель Коринтия",
    city: "Санкт-Петербург",
    address: "Невский проспект, 57",
    type: "Люкс отель", 
    stars: 5,
    rating: 4.6,
    price_per_night: 28000,
    description: "Роскошный отель на главной улице Петербурга с изысканным интерьером.",
    amenities: ["WiFi", "Ресторан", "SPA", "Фитнес-центр", "Консьерж", "Парковка", "Бизнес-центр"],
    photos: ["facade.jpg", "room.jpg", "nevsky.jpg", "spa.jpg"],
    contact_phone: "+7 (812) 380-20-01",
    contact_email: "info@corinthia.com",
    website: "www.corinthia.com/st-petersburg"
  },
  {
    id: 11,
    name: "Отель Марриотт Москва Гранд",
    city: "Москва",
    address: "Тверская ул., 26/1",
    type: "Люкс отель",
    stars: 5,
    rating: 4.4,
    price_per_night: 26000,
    description: "Престижный отель в самом центре Москвы на главной улице столицы.",
    amenities: ["WiFi", "Ресторан", "SPA", "Фитнес-центр", "Консьерж", "Парковка", "Бизнес-центр"],
    photos: ["facade.jpg", "room.jpg", "tverskaya.jpg", "restaurant.jpg"],
    contact_phone: "+7 (495) 937-00-00",
    contact_email: "info@marriott-moscow.com",
    website: "www.marriott.com/moscow"
  },
  {
    id: 12,
    name: "Отель Ибис Москва Центр",
    city: "Москва",
    address: "ул. Бакунинская, 50/14",
    type: "Эконом отель",
    stars: 3,
    rating: 4.0,
    price_per_night: 6000,
    description: "Современный эконом-отель с хорошим расположением и качественным сервисом.",
    amenities: ["WiFi", "Ресторан", "Парковка", "Бизнес-центр"],
    photos: ["facade.jpg", "room.jpg", "restaurant.jpg", "lobby.jpg"],
    contact_phone: "+7 (495) 780-10-00",
    contact_email: "info@ibis-moscow.com",
    website: "www.ibis.com/moscow"
  },
  {
    id: 13,
    name: "Отель Новотель Москва Центр",
    city: "Москва",
    address: "ул. Новослободская, 23",
    type: "Бизнес-отель",
    stars: 4,
    rating: 4.2,
    price_per_night: 16000,
    description: "Комфортабельный отель в центре Москвы с современными удобствами.",
    amenities: ["WiFi", "Ресторан", "Фитнес-центр", "Бизнес-центр", "Парковка", "Бассейн"],
    photos: ["facade.jpg", "room.jpg", "pool.jpg", "restaurant.jpg"],
    contact_phone: "+7 (495) 780-40-00",
    contact_email: "info@novotel-moscow.com",
    website: "www.novotel.com/moscow"
  },
  {
    id: 14,
    name: "Отель Четыре Сезона Москва",
    city: "Москва",
    address: "ул. Охотный Ряд, 2",
    type: "Люкс отель",
    stars: 5,
    rating: 4.9,
    price_per_night: 45000,
    description: "Эксклюзивный отель премиум-класса в самом сердце Москвы рядом с Кремлем.",
    amenities: ["WiFi", "Ресторан", "SPA", "Фитнес-центр", "Консьерж", "Парковка", "Бизнес-центр", "Бассейн"],
    photos: ["facade.jpg", "room.jpg", "kremlin_view.jpg", "spa.jpg"],
    contact_phone: "+7 (495) 230-10-00",
    contact_email: "info@fourseasons-moscow.com",
    website: "www.fourseasons.com/moscow"
  },
  {
    id: 15,
    name: "Отель Петро Палас",
    city: "Санкт-Петербург",
    address: "Малая Морская ул., 14",
    type: "Бутик-отель",
    stars: 4,
    rating: 4.3,
    price_per_night: 17000,
    description: "Уютный бутик-отель в историческом центре с индивидуальным подходом к гостям.",
    amenities: ["WiFi", "Ресторан", "Консьерж", "Парковка"],
    photos: ["facade.jpg", "room.jpg", "restaurant.jpg", "lobby.jpg"],
    contact_phone: "+7 (812) 571-28-80",
    contact_email: "info@petropalace.ru",
    website: "www.petropalace.ru"
  },
  {
    id: 16,
    name: "Отель Сочи Парк",
    city: "Сочи",
    address: "Имеретинская низменность, ул. Медовая, 1",
    type: "Семейный отель",
    stars: 4,
    rating: 4.4,
    price_per_night: 13000,
    description: "Семейный отель рядом с тематическим парком и олимпийскими объектами.",
    amenities: ["WiFi", "Ресторан", "Бассейн", "Детская площадка", "Парковка", "Анимация"],
    photos: ["facade.jpg", "room.jpg", "pool.jpg", "park.jpg"],
    contact_phone: "+7 (862) 240-60-00",
    contact_email: "info@sochipark.ru",
    website: "www.sochipark.ru"
  },
  {
    id: 17,
    name: "Отель Хаятт Ридженси Сочи",
    city: "Сочи",
    address: "ул. Орджоникидзе, 21",
    type: "Курортный отель",
    stars: 5,
    rating: 4.6,
    price_per_night: 20000,
    description: "Роскошный курортный отель на берегу моря с прекрасным видом и сервисом.",
    amenities: ["WiFi", "Ресторан", "SPA", "Фитнес-центр", "Пляж", "Бассейн", "Парковка"],
    photos: ["facade.jpg", "room.jpg", "beach.jpg", "spa.jpg"],
    contact_phone: "+7 (862) 555-12-34",
    contact_email: "info@hyatt-sochi.com",
    website: "www.hyatt.com/sochi"
  },
  {
    id: 18,
    name: "Отель Лотте Москва",
    city: "Москва",
    address: "Новинский бульвар, 8",
    type: "Люкс отель",
    stars: 5,
    rating: 4.7,
    price_per_night: 32000,
    description: "Современный небоскреб-отель с панорамными видами на Москву и роскошными номерами.",
    amenities: ["WiFi", "Ресторан", "SPA", "Фитнес-центр", "Консьерж", "Парковка", "Бизнес-центр", "Бассейн"],
    photos: ["facade.jpg", "room.jpg", "city_view.jpg", "spa.jpg"],
    contact_phone: "+7 (495) 745-10-00",
    contact_email: "info@lotte-moscow.com",
    website: "www.lottehotel.com/moscow"
  },
  {
    id: 19,
    name: "Отель Талион Империал",
    city: "Санкт-Петербург",
    address: "Невский проспект, 15",
    type: "Люкс отель",
    stars: 5,
    rating: 4.5,
    price_per_night: 24000,
    description: "Элитный отель в самом центре Невского проспекта с изысканным дизайном.",
    amenities: ["WiFi", "Ресторан", "SPA", "Фитнес-центр", "Консьерж", "Парковка"],
    photos: ["facade.jpg", "room.jpg", "nevsky.jpg", "restaurant.jpg"],
    contact_phone: "+7 (812) 324-90-00",
    contact_email: "info@talionimperial.com",
    website: "www.talionimperial.com"
  },
  {
    id: 20,
    name: "Отель Холидей Инн Сокольники",
    city: "Москва",
    address: "ул. Русаковская, 24",
    type: "Бизнес-отель",
    stars: 4,
    rating: 4.1,
    price_per_night: 11000,
    description: "Удобный бизнес-отель рядом с парком Сокольники и метро.",
    amenities: ["WiFi", "Ресторан", "Фитнес-центр", "Бизнес-центр", "Парковка"],
    photos: ["facade.jpg", "room.jpg", "restaurant.jpg", "business.jpg"],
    contact_phone: "+7 (495) 783-40-00",
    contact_email: "info@holidayinn-moscow.com",
    website: "www.holidayinn.com/moscow"
  }
];

const assignments = [
  {
    id: 1,
    hotel_id: 1,
    hotel_name: "Гранд Отель Европа",
    city: "Санкт-Петербург",
    hotel_type: "Люкс отель",
    hotel_rating: 4.7,
    title: "Проверка качества завтрака и SPA-услуг",
    description: "Необходимо оценить разнообразие и качество завтрака, а также профессионализм персонала SPA-центра",
    priority: "Высокий",
    reward_type: "Бесплатно",
    reward_amount: 100,
    reward_points: 500,
    reward: "Бесплатное проживание + 500 баллов",
    check_in_date: "2024-04-15",
    check_out_date: "2024-04-17",
    deadline_date: "2024-04-20",
    room_type: "Стандартный номер",
    amenities: ["WiFi", "Ресторан", "SPA", "Фитнес-центр", "Консьерж", "Парковка", "Бизнес-центр"],
    special_requirements: [
      "Оценить разнообразие блюд на завтраке",
      "Проверить качество SPA-услуг",
      "Оценить работу персонала",
      "Сравнить номер с фотографиями на сайте"
    ]
  },
  {
    id: 2,
    hotel_id: 2,
    hotel_name: "Отель Метрополь",
    city: "Москва",
    hotel_type: "Люкс отель",
    hotel_rating: 4.6,
    title: "Оценка бизнес-услуг и конференц-залов",
    description: "Проверить качество бизнес-центра, скорость интернета и оборудование конференц-залов",
    priority: "Средний",
    reward_type: "Скидка",
    reward_amount: 80,
    reward_points: 400,
    reward: "80% скидка + 400 баллов",
    check_in_date: "2024-04-20",
    check_out_date: "2024-04-22",
    deadline_date: "2024-04-25",
    room_type: "Бизнес номер",
    amenities: ["WiFi", "Ресторан", "SPA", "Фитнес-центр", "Консьерж", "Парковка", "Бизнес-центр", "Бассейн"],
    special_requirements: [
      "Проверить работу бизнес-центра",
      "Оценить скорость интернета",
      "Протестировать оборудование конференц-залов",
      "Оценить качество обслуживания в ресторане"
    ]
  },
  {
    id: 3,
    hotel_id: 5,
    hotel_name: "Гранд Отель Сочи",
    city: "Сочи",
    hotel_type: "Курортный отель",
    hotel_rating: 4.2,
    title: "Проверка пляжных услуг и анимации",
    description: "Оценить качество пляжа, работу аниматоров и состояние пляжного оборудования",
    priority: "Высокий",
    reward_type: "Бесплатно",
    reward_amount: 100,
    reward_points: 450,
    reward: "Бесплатное проживание + 450 баллов",
    check_in_date: "2024-04-25",
    check_out_date: "2024-04-27",
    deadline_date: "2024-04-30",
    room_type: "Номер с видом на море",
    amenities: ["WiFi", "Ресторан", "SPA", "Пляж", "Бассейн", "Парковка"],
    special_requirements: [
      "Оценить чистоту пляжа",
      "Проверить работу аниматоров",
      "Оценить состояние пляжного оборудования",
      "Проверить качество пляжного бара"
    ]
  },
  {
    id: 4,
    hotel_id: 8,
    hotel_name: "Отель Рэдиссон Славянская",
    city: "Москва",
    hotel_type: "Бизнес-отель",
    hotel_rating: 4.1,
    title: "Проверка удобства для бизнес-путешественников",
    description: "Оценить удобство расположения, качество бизнес-услуг и транспортную доступность",
    priority: "Средний",
    reward_type: "Скидка",
    reward_amount: 70,
    reward_points: 300,
    reward: "70% скидка + 300 баллов",
    check_in_date: "2024-05-01",
    check_out_date: "2024-05-03",
    deadline_date: "2024-05-06",
    room_type: "Бизнес номер",
    amenities: ["WiFi", "Ресторан", "Фитнес-центр", "Бизнес-центр", "Парковка", "Бассейн"],
    special_requirements: [
      "Оценить удобство расположения",
      "Проверить качество бизнес-услуг",
      "Оценить транспортную доступность",
      "Проверить работу консьержа"
    ]
  },
  {
    id: 5,
    hotel_id: 12,
    hotel_name: "Отель Ибис Москва Центр",
    city: "Москва",
    hotel_type: "Эконом отель",
    hotel_rating: 4.0,
    title: "Проверка соотношения цена-качество",
    description: "Оценить соответствие качества услуг заявленной ценовой категории",
    priority: "Низкий",
    reward_type: "Скидка",
    reward_amount: 60,
    reward_points: 250,
    reward: "60% скидка + 250 баллов",
    check_in_date: "2024-05-05",
    check_out_date: "2024-05-07",
    deadline_date: "2024-05-10",
    room_type: "Стандартный номер",
    amenities: ["WiFi", "Ресторан", "Парковка", "Бизнес-центр"],
    special_requirements: [
      "Оценить соотношение цена-качество",
      "Проверить чистоту номера",
      "Оценить качество завтрака",
      "Проверить работу персонала"
    ]
  },
  {
    id: 6,
    hotel_id: 16,
    hotel_name: "Отель Сочи Парк",
    city: "Сочи",
    hotel_type: "Семейный отель",
    hotel_rating: 4.4,
    title: "Проверка семейных услуг и анимации",
    description: "Оценить качество детских программ, анимации и семейных удобств",
    priority: "Высокий",
    reward_type: "Бесплатно",
    reward_amount: 100,
    reward_points: 400,
    reward: "Бесплатное проживание + 400 баллов",
    check_in_date: "2024-05-10",
    check_out_date: "2024-05-12",
    deadline_date: "2024-05-15",
    room_type: "Семейный номер",
    amenities: ["WiFi", "Ресторан", "Бассейн", "Детская площадка", "Парковка", "Анимация"],
    special_requirements: [
      "Оценить качество детских программ",
      "Проверить работу аниматоров",
      "Оценить безопасность детских зон",
      "Проверить семейное меню в ресторане"
    ]
  },
  {
    id: 7,
    hotel_id: 6,
    hotel_name: "Отель Балчуг Кемпински",
    city: "Москва",
    hotel_type: "Люкс отель",
    hotel_rating: 4.8,
    title: "Проверка премиум-сервиса и видов",
    description: "Оценить качество люкс-сервиса, виды из номеров и эксклюзивные услуги",
    priority: "Высокий",
    reward_type: "Скидка",
    reward_amount: 90,
    reward_points: 600,
    reward: "90% скидка + 600 баллов",
    check_in_date: "2024-05-15",
    check_out_date: "2024-05-17",
    deadline_date: "2024-05-20",
    room_type: "Номер с видом на Кремль",
    amenities: ["WiFi", "Ресторан", "SPA", "Фитнес-центр", "Консьерж", "Парковка", "Бизнес-центр", "Бассейн"],
    special_requirements: [
      "Оценить качество консьерж-сервиса",
      "Проверить виды из номера",
      "Оценить качество ресторана",
      "Проверить эксклюзивные услуги"
    ]
  },
  {
    id: 6,
    hotel_id: 3,
    hotel_name: "Отель Астория",
    city: "Санкт-Петербург",
    hotel_type: "Исторический отель",
    hotel_rating: 4.5,
    title: "Проверка исторической атмосферы и экскурсионных услуг",
    description: "Оценить сохранение исторической атмосферы и качество экскурсионных программ",
    priority: "Средний",
    reward_type: "Скидка",
    reward_amount: 70,
    reward_points: 350,
    reward: "70% скидка + 350 баллов",
    check_in_date: "2024-05-05",
    check_out_date: "2024-05-07",
    deadline_date: "2024-05-10",
    room_type: "Исторический номер",
    amenities: ["WiFi", "Ресторан", "Консьерж", "Парковка", "Экскурсии"],
    special_requirements: [
      "Оценить историческую атмосферу",
      "Проверить качество экскурсионных программ",
      "Оценить знания персонала об истории отеля",
      "Проверить состояние исторических интерьеров"
    ]
  },
  {
    id: 7,
    hotel_id: 4,
    hotel_name: "Курорт Красная Поляна",
    city: "Сочи",
    hotel_type: "Горнолыжный курорт",
    hotel_rating: 4.3,
    title: "Проверка горнолыжных услуг и оборудования",
    description: "Оценить качество склонов, работу подъемников и прокат оборудования",
    priority: "Высокий",
    reward_type: "Бесплатно",
    reward_amount: 100,
    reward_points: 600,
    reward: "Бесплатное проживание + 600 баллов",
    check_in_date: "2024-12-15",
    check_out_date: "2024-12-18",
    deadline_date: "2024-12-20",
    room_type: "Номер с видом на горы",
    amenities: ["WiFi", "Ресторан", "SPA", "Горнолыжные склоны", "Прокат оборудования", "Подъемники"],
    special_requirements: [
      "Оценить состояние горнолыжных склонов",
      "Проверить работу подъемников",
      "Оценить качество проката оборудования",
      "Проверить безопасность на склонах"
    ]
  },
  {
    id: 8,
    hotel_id: 6,
    hotel_name: "Отель Националь",
    city: "Москва",
    hotel_type: "Люкс отель",
    hotel_rating: 4.8,
    title: "Проверка VIP-услуг и персонального сервиса",
    description: "Оценить качество VIP-обслуживания и персонального сервиса для важных гостей",
    priority: "Высокий",
    reward_type: "Бесплатно",
    reward_amount: 100,
    reward_points: 700,
    reward: "Бесплатное проживание + 700 баллов",
    check_in_date: "2024-05-20",
    check_out_date: "2024-05-22",
    deadline_date: "2024-05-25",
    room_type: "VIP-номер",
    amenities: ["WiFi", "Ресторан", "SPA", "Консьерж", "Лимузин", "Персональный дворецкий"],
    special_requirements: [
      "Оценить качество VIP-обслуживания",
      "Проверить работу персонального дворецкого",
      "Оценить эксклюзивные услуги",
      "Проверить конфиденциальность сервиса"
    ]
  },
  {
    id: 9,
    hotel_id: 7,
    hotel_name: "Отель Балчуг Кемпински",
    city: "Москва",
    hotel_type: "Люкс отель",
    hotel_rating: 4.7,
    title: "Проверка ресторанной концепции и винной карты",
    description: "Оценить качество ресторанов, разнообразие винной карты и профессионализм сомелье",
    priority: "Средний",
    reward_type: "Скидка",
    reward_amount: 60,
    reward_points: 400,
    reward: "60% скидка + 400 баллов",
    check_in_date: "2024-06-01",
    check_out_date: "2024-06-03",
    deadline_date: "2024-06-06",
    room_type: "Номер с видом на Кремль",
    amenities: ["WiFi", "Ресторан", "SPA", "Винный погреб", "Консьерж", "Парковка"],
    special_requirements: [
      "Оценить качество ресторанной кухни",
      "Проверить разнообразие винной карты",
      "Оценить профессионализм сомелье",
      "Проверить атмосферу ресторанов"
    ]
  },
  {
    id: 10,
    hotel_id: 9,
    hotel_name: "Отель Савой",
    city: "Москва",
    hotel_type: "Бутик-отель",
    hotel_rating: 4.4,
    title: "Проверка уникального дизайна и атмосферы",
    description: "Оценить оригинальность дизайна, уютность атмосферы и индивидуальный подход",
    priority: "Низкий",
    reward_type: "Скидка",
    reward_amount: 50,
    reward_points: 250,
    reward: "50% скидка + 250 баллов",
    check_in_date: "2024-06-10",
    check_out_date: "2024-06-12",
    deadline_date: "2024-06-15",
    room_type: "Дизайнерский номер",
    amenities: ["WiFi", "Ресторан", "Арт-галерея", "Консьерж", "Парковка"],
    special_requirements: [
      "Оценить оригинальность дизайна",
      "Проверить уютность атмосферы",
      "Оценить индивидуальный подход к гостям",
      "Проверить качество арт-коллекции"
    ]
  },
  {
    id: 11,
    hotel_id: 10,
    hotel_name: "Холидей Инн Москва",
    city: "Москва",
    hotel_type: "Бизнес-отель",
    hotel_rating: 4.0,
    title: "Проверка соотношения цена-качество",
    description: "Оценить соответствие качества услуг заявленной цене и удобство для бизнес-путешественников",
    priority: "Средний",
    reward_type: "Скидка",
    reward_amount: 40,
    reward_points: 200,
    reward: "40% скидка + 200 баллов",
    check_in_date: "2024-06-20",
    check_out_date: "2024-06-22",
    deadline_date: "2024-06-25",
    room_type: "Стандартный номер",
    amenities: ["WiFi", "Ресторан", "Фитнес-центр", "Бизнес-центр", "Парковка"],
    special_requirements: [
      "Оценить соотношение цена-качество",
      "Проверить удобство для бизнес-путешественников",
      "Оценить скорость регистрации",
      "Проверить качество завтрака"
    ]
  },
  {
    id: 12,
    hotel_id: 1,
    hotel_name: "Гранд Отель Европа",
    city: "Санкт-Петербург",
    hotel_type: "Люкс отель",
    hotel_rating: 4.7,
    title: "Проверка свадебных услуг и банкетных залов",
    description: "Оценить качество организации свадебных мероприятий и состояние банкетных залов",
    priority: "Низкий",
    reward_type: "Скидка",
    reward_amount: 30,
    reward_points: 300,
    reward: "30% скидка + 300 баллов",
    check_in_date: "2024-07-01",
    check_out_date: "2024-07-03",
    deadline_date: "2024-07-06",
    room_type: "Свадебный люкс",
    amenities: ["WiFi", "Банкетные залы", "Свадебный координатор", "Флористика", "Фотограф"],
    special_requirements: [
      "Оценить качество банкетных залов",
      "Проверить работу свадебного координатора",
      "Оценить качество кейтеринга",
      "Проверить дополнительные свадебные услуги"
    ]
  },
  {
    id: 13,
    hotel_id: 5,
    hotel_name: "Гранд Отель Сочи",
    city: "Сочи",
    hotel_type: "Курортный отель",
    hotel_rating: 4.2,
    title: "Проверка детских услуг и семейного отдыха",
    description: "Оценить качество детских программ, безопасность и удобство для семей с детьми",
    priority: "Высокий",
    reward_type: "Бесплатно",
    reward_amount: 100,
    reward_points: 500,
    reward: "Бесплатное проживание + 500 баллов",
    check_in_date: "2024-07-15",
    check_out_date: "2024-07-18",
    deadline_date: "2024-07-21",
    room_type: "Семейный номер",
    amenities: ["WiFi", "Детский клуб", "Детский бассейн", "Игровая площадка", "Няня", "Детское меню"],
    special_requirements: [
      "Оценить качество детских программ",
      "Проверить безопасность детских зон",
      "Оценить квалификацию аниматоров",
      "Проверить разнообразие детского меню"
    ]
  },
  {
    id: 14,
    hotel_id: 2,
    hotel_name: "Отель Метрополь",
    city: "Москва",
    hotel_type: "Люкс отель",
    hotel_rating: 4.6,
    title: "Проверка культурных программ и экскурсий",
    description: "Оценить качество культурных мероприятий и организацию экскурсионных программ",
    priority: "Низкий",
    reward_type: "Скидка",
    reward_amount: 45,
    reward_points: 280,
    reward: "45% скидка + 280 баллов",
    check_in_date: "2024-08-01",
    check_out_date: "2024-08-03",
    deadline_date: "2024-08-06",
    room_type: "Культурный номер",
    amenities: ["WiFi", "Экскурсионное бюро", "Театральные билеты", "Гид", "Культурные мероприятия"],
    special_requirements: [
      "Оценить качество экскурсионных программ",
      "Проверить организацию культурных мероприятий",
      "Оценить знания гидов",
      "Проверить удобство бронирования билетов"
    ]
  },
  {
    id: 15,
    hotel_id: 3,
    hotel_name: "Отель Астория",
    city: "Санкт-Петербург",
    hotel_type: "Исторический отель",
    hotel_rating: 4.5,
    title: "Проверка ночной жизни и развлечений",
    description: "Оценить качество баров, ночных развлечений и музыкальных программ",
    priority: "Средний",
    reward_type: "Скидка",
    reward_amount: 55,
    reward_points: 320,
    reward: "55% скидка + 320 баллов",
    check_in_date: "2024-08-15",
    check_out_date: "2024-08-17",
    deadline_date: "2024-08-20",
    room_type: "Номер с доступом в VIP-бар",
    amenities: ["WiFi", "Бар", "Ночной клуб", "Живая музыка", "Караоке", "Танцпол"],
    special_requirements: [
      "Оценить качество барного сервиса",
      "Проверить разнообразие развлечений",
      "Оценить качество музыкальных программ",
      "Проверить атмосферу ночных заведений"
    ]
  }
];

// API функции для мок базы данных
export const fetchHotels = async () => {
  // Симуляция задержки сети
  await new Promise(resolve => setTimeout(resolve, 500));
  return hotels;
};

export const fetchHotelById = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return hotels.find(hotel => hotel.id === parseInt(id));
};

export const fetchAvailableAssignments = async () => {
  await new Promise(resolve => setTimeout(resolve, 600));
  return assignments;
};

export const fetchAssignmentsByHotel = async (hotelId) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return assignments.filter(assignment => assignment.hotel_id === parseInt(hotelId));
};

export const filterHotels = async (filters) => {
  await new Promise(resolve => setTimeout(resolve, 400));
  let filtered = hotels;
  
  if (filters.city) {
    filtered = filtered.filter(hotel => 
      hotel.city.toLowerCase().includes(filters.city.toLowerCase())
    );
  }
  
  if (filters.type) {
    filtered = filtered.filter(hotel => 
      hotel.type.toLowerCase().includes(filters.type.toLowerCase())
    );
  }
  
  return filtered;
};

export const searchHotels = async (query) => {
  await new Promise(resolve => setTimeout(resolve, 400));
  const searchQuery = query.toLowerCase();
  
  return hotels.filter(hotel => 
    hotel.name.toLowerCase().includes(searchQuery) ||
    hotel.city.toLowerCase().includes(searchQuery) ||
    hotel.description.toLowerCase().includes(searchQuery)
  );
};

export const fetchAdminStats = async () => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return {
    totalHotels: hotels.length,
    activeAssignments: assignments.length,
    averageRating: (hotels.reduce((sum, hotel) => sum + hotel.rating, 0) / hotels.length).toFixed(1),
    topCities: [...new Set(hotels.map(h => h.city))].slice(0, 5)
  };
};

// Функции для управления заданиями
export const createAssignment = async (assignmentData) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const newAssignment = {
    id: assignments.length + 1,
    ...assignmentData,
    created_at: new Date().toISOString(),
    status: 'active'
  };
  
  assignments.push(newAssignment);
  return newAssignment;
};

export const updateAssignment = async (id, updateData) => {
  await new Promise(resolve => setTimeout(resolve, 400));
  
  const index = assignments.findIndex(assignment => assignment.id === parseInt(id));
  if (index !== -1) {
    assignments[index] = { ...assignments[index], ...updateData };
    return assignments[index];
  }
  throw new Error('Assignment not found');
};

export const deleteAssignment = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const index = assignments.findIndex(assignment => assignment.id === parseInt(id));
  if (index !== -1) {
    assignments.splice(index, 1);
    return true;
  }
  throw new Error('Assignment not found');
};

export const getAllAssignments = async () => {
  await new Promise(resolve => setTimeout(resolve, 400));
  return assignments;
};

export const getAssignmentById = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return assignments.find(assignment => assignment.id === parseInt(id));
};

// Данные пользователей (секретных гостей)
const users = [
  {
    id: 1,
    name: "Анна Петрова",
    email: "anna.petrova@email.com",
    phone: "+7 (495) 123-45-67",
    city: "Москва",
    level: "Эксперт",
    rating: 4.8,
    totalReports: 23,
    activeAssignments: 2,
    joinDate: "2023-01-15",
    status: "Активен",
    experience: "15+ поездок в год",
    specialties: ["Люкс отели", "SPA-услуги", "Рестораны"],
    lastActivity: "2024-03-20",
    totalEarnings: 45000,
    completedAssignments: 21,
    pendingReports: 1
  },
  {
    id: 2,
    name: "Михаил Козлов",
    email: "mikhail.kozlov@email.com",
    phone: "+7 (812) 234-56-78",
    city: "Санкт-Петербург",
    level: "Профи",
    rating: 4.6,
    totalReports: 15,
    activeAssignments: 1,
    joinDate: "2023-03-10",
    status: "Активен",
    experience: "20+ поездок в год",
    specialties: ["Бизнес отели", "Конференц-залы", "Транспорт"],
    lastActivity: "2024-03-18",
    totalEarnings: 32000,
    completedAssignments: 14,
    pendingReports: 0
  },
  {
    id: 3,
    name: "Елена Смирнова",
    email: "elena.smirnova@email.com",
    phone: "+7 (495) 345-67-89",
    city: "Москва",
    level: "Новичок",
    rating: 4.2,
    totalReports: 5,
    activeAssignments: 0,
    joinDate: "2024-01-20",
    status: "Активен",
    experience: "8+ поездок в год",
    specialties: ["Эконом отели", "Завтраки"],
    lastActivity: "2024-03-15",
    totalEarnings: 8500,
    completedAssignments: 5,
    pendingReports: 0
  },
  {
    id: 4,
    name: "Дмитрий Волков",
    email: "dmitry.volkov@email.com",
    phone: "+7 (862) 456-78-90",
    city: "Сочи",
    level: "Профи",
    rating: 4.7,
    totalReports: 18,
    activeAssignments: 1,
    joinDate: "2023-06-05",
    status: "Активен",
    experience: "25+ поездок в год",
    specialties: ["Курортные отели", "Пляжи", "Анимация"],
    lastActivity: "2024-03-19",
    totalEarnings: 38000,
    completedAssignments: 17,
    pendingReports: 1
  },
  {
    id: 5,
    name: "Ольга Морозова",
    email: "olga.morozova@email.com",
    phone: "+7 (495) 567-89-01",
    city: "Москва",
    level: "Эксперт",
    rating: 4.9,
    totalReports: 31,
    activeAssignments: 3,
    joinDate: "2022-11-12",
    status: "Активен",
    experience: "30+ поездок в год",
    specialties: ["Люкс отели", "VIP-сервис", "Консьерж"],
    lastActivity: "2024-03-21",
    totalEarnings: 67000,
    completedAssignments: 28,
    pendingReports: 2
  }
];

// Заявки на участие
const applications = [
  {
    id: 1,
    name: "Мария Иванова",
    email: "maria.ivanova@email.com",
    phone: "+7 (495) 123-45-67",
    city: "Москва",
    experience: "15+ поездок в год",
    appliedDate: "2024-03-20",
    status: "На рассмотрении",
    motivation: "Хочу помочь улучшить качество отельного сервиса в России",
    specialties: ["Люкс отели", "SPA"],
    documents: ["passport.pdf", "cv.pdf"],
    priority: "Высокий"
  },
  {
    id: 2,
    name: "Алексей Петров",
    email: "alexey.petrov@email.com",
    phone: "+7 (812) 234-56-78",
    city: "Санкт-Петербург",
    experience: "20+ поездок в год",
    appliedDate: "2024-03-19",
    status: "На рассмотрении",
    motivation: "Опыт работы в туризме, знаю индустрию изнутри",
    specialties: ["Бизнес отели", "Конференции"],
    documents: ["passport.pdf", "certificate.pdf"],
    priority: "Средний"
  },
  {
    id: 3,
    name: "Татьяна Сидорова",
    email: "tatyana.sidorova@email.com",
    phone: "+7 (495) 345-67-89",
    city: "Москва",
    experience: "12+ поездок в год",
    appliedDate: "2024-03-18",
    status: "Одобрена",
    motivation: "Люблю путешествовать и хочу делиться опытом",
    specialties: ["Семейные отели", "Детские услуги"],
    documents: ["passport.pdf", "references.pdf"],
    priority: "Низкий"
  }
];

// Отчеты
const reports = [
  {
    id: 1,
    guestId: 1,
    guestName: "Анна Петрова",
    hotelId: 1,
    hotelName: "Гранд Отель Европа",
    city: "Санкт-Петербург",
    submittedDate: "2024-03-18",
    rating: 4.2,
    status: "На проверке",
    priority: "Высокий",
    assignmentId: 1,
    checkInDate: "2024-03-15",
    checkOutDate: "2024-03-17",
    roomType: "Стандартный номер",
    photos: ["room1.jpg", "breakfast.jpg", "spa.jpg"],
    comments: "Отличный сервис, но завтрак мог бы быть разнообразнее",
    detailedRating: {
      cleanliness: 5,
      service: 4,
      location: 5,
      amenities: 4,
      value: 3
    },
    recommendations: "Добавить больше фруктов на завтрак",
    issues: []
  },
  {
    id: 2,
    guestId: 2,
    guestName: "Михаил Козлов",
    hotelId: 2,
    hotelName: "Отель Метрополь",
    city: "Москва",
    submittedDate: "2024-03-17",
    rating: 4.5,
    status: "Одобрен",
    priority: "Средний",
    assignmentId: 2,
    checkInDate: "2024-03-14",
    checkOutDate: "2024-03-16",
    roomType: "Бизнес номер",
    photos: ["room2.jpg", "business_center.jpg"],
    comments: "Отличный бизнес-центр, быстрый интернет",
    detailedRating: {
      cleanliness: 5,
      service: 4,
      location: 5,
      amenities: 5,
      value: 4
    },
    recommendations: "Все отлично",
    issues: []
  },
  {
    id: 3,
    guestId: 4,
    guestName: "Дмитрий Волков",
    hotelId: 5,
    hotelName: "Гранд Отель Сочи",
    city: "Сочи",
    submittedDate: "2024-03-16",
    rating: 3.8,
    status: "На проверке",
    priority: "Высокий",
    assignmentId: 3,
    checkInDate: "2024-03-12",
    checkOutDate: "2024-03-14",
    roomType: "Номер с видом на море",
    photos: ["room3.jpg", "beach.jpg", "pool.jpg"],
    comments: "Пляж хороший, но анимация слабая",
    detailedRating: {
      cleanliness: 4,
      service: 3,
      location: 5,
      amenities: 4,
      value: 3
    },
    recommendations: "Улучшить анимационную программу",
    issues: ["Медленный Wi-Fi на пляже"]
  }
];

// Функции для работы с пользователями
export const getAllUsers = async () => {
  await new Promise(resolve => setTimeout(resolve, 400));
  return users;
};

export const getUserById = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return users.find(user => user.id === parseInt(id));
};

export const updateUserStatus = async (id, status) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  const user = users.find(u => u.id === parseInt(id));
  if (user) {
    user.status = status;
    return user;
  }
  throw new Error('User not found');
};

// Функции для работы с заявками
export const getAllApplications = async () => {
  await new Promise(resolve => setTimeout(resolve, 400));
  return applications;
};

export const approveApplication = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const application = applications.find(app => app.id === parseInt(id));
  if (application) {
    application.status = "Одобрена";
    
    // Создаем нового пользователя
    const newUser = {
      id: users.length + 1,
      name: application.name,
      email: application.email,
      phone: application.phone,
      city: application.city,
      level: "Новичок",
      rating: 0,
      totalReports: 0,
      activeAssignments: 0,
      joinDate: new Date().toISOString().split('T')[0],
      status: "Активен",
      experience: application.experience,
      specialties: application.specialties,
      lastActivity: new Date().toISOString().split('T')[0],
      totalEarnings: 0,
      completedAssignments: 0,
      pendingReports: 0
    };
    
    users.push(newUser);
    return { application, newUser };
  }
  throw new Error('Application not found');
};

export const rejectApplication = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  const application = applications.find(app => app.id === parseInt(id));
  if (application) {
    application.status = "Отклонена";
    return application;
  }
  throw new Error('Application not found');
};

// Функции для работы с отчетами
export const getAllReports = async () => {
  await new Promise(resolve => setTimeout(resolve, 400));
  return reports;
};

export const approveReport = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  const report = reports.find(r => r.id === parseInt(id));
  if (report) {
    report.status = "Одобрен";
    return report;
  }
  throw new Error('Report not found');
};

export const rejectReport = async (id, reason) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  const report = reports.find(r => r.id === parseInt(id));
  if (report) {
    report.status = "Отклонен";
    report.rejectionReason = reason;
    return report;
  }
  throw new Error('Report not found');
};

// Функции для работы с отелями
export const createHotel = async (hotelData) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const newHotel = {
    id: hotels.length + 1,
    ...hotelData,
    created_at: new Date().toISOString(),
    status: 'active',
    totalReports: 0,
    lastCheck: null,
    needsCheck: false
  };
  
  hotels.push(newHotel);
  return newHotel;
};

export const updateHotel = async (id, updateData) => {
  await new Promise(resolve => setTimeout(resolve, 400));
  
  const index = hotels.findIndex(hotel => hotel.id === parseInt(id));
  if (index !== -1) {
    hotels[index] = { ...hotels[index], ...updateData };
    return hotels[index];
  }
  throw new Error('Hotel not found');
};

export const deleteHotel = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const index = hotels.findIndex(hotel => hotel.id === parseInt(id));
  if (index !== -1) {
    hotels.splice(index, 1);
    return true;
  }
  throw new Error('Hotel not found');
};

// Обновленная статистика
export const getRealTimeStats = async () => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const activeUsers = users.filter(user => user.status === 'Активен');
  const pendingApplications = applications.filter(app => app.status === 'На рассмотрении');
  const pendingReports = reports.filter(report => report.status === 'На проверке');
  const activeAssignments = assignments.length;
  
  const averageRating = reports.length > 0 
    ? (reports.reduce((sum, report) => sum + report.rating, 0) / reports.length).toFixed(1)
    : 0;
  
  return {
    totalGuests: users.length,
    activeGuests: activeUsers.length,
    pendingApplications: pendingApplications.length,
    totalHotels: hotels.length,
    activeAssignments: activeAssignments,
    completedReports: reports.filter(r => r.status === 'Одобрен').length,
    pendingReports: pendingReports.length,
    averageRating: parseFloat(averageRating),
    totalEarnings: users.reduce((sum, user) => sum + user.totalEarnings, 0),
    newUsersThisMonth: users.filter(user => {
      const joinDate = new Date(user.joinDate);
      const now = new Date();
      return joinDate.getMonth() === now.getMonth() && joinDate.getFullYear() === now.getFullYear();
    }).length
  };
};