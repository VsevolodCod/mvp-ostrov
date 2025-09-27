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
    website: "www.grandhoteleurope.com"
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
    website: "www.metropol-moscow.ru"
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
    website: "www.grandsochi.ru"
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