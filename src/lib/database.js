import Database from 'better-sqlite3';
import path from 'path';

// Создаем подключение к базе данных
const dbPath = path.join(process.cwd(), 'hotels.db');
const db = new Database(dbPath);

// Создаем таблицы
const createTables = () => {
  // Таблица отелей
  db.exec(`
    CREATE TABLE IF NOT EXISTS hotels (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      city TEXT NOT NULL,
      address TEXT NOT NULL,
      country TEXT DEFAULT 'Россия',
      type TEXT NOT NULL,
      stars INTEGER,
      rating REAL,
      price_per_night INTEGER,
      description TEXT,
      amenities TEXT, -- JSON строка с удобствами
      photos TEXT, -- JSON строка с фотографиями
      contact_phone TEXT,
      contact_email TEXT,
      website TEXT,
      latitude REAL,
      longitude REAL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Таблица заданий для отелей
  db.exec(`
    CREATE TABLE IF NOT EXISTS assignments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      hotel_id INTEGER,
      title TEXT NOT NULL,
      description TEXT,
      priority TEXT DEFAULT 'Средний', -- Высокий, Средний, Низкий
      status TEXT DEFAULT 'Доступно', -- Доступно, Взято, Завершено
      reward_type TEXT, -- Бесплатно, Скидка
      reward_amount INTEGER, -- Процент скидки или 100 для бесплатного
      reward_points INTEGER DEFAULT 0,
      check_in_date DATE,
      check_out_date DATE,
      deadline_date DATE,
      room_type TEXT,
      special_requirements TEXT, -- JSON строка с требованиями
      assigned_guest_id INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (hotel_id) REFERENCES hotels (id)
    )
  `);

  // Таблица секретных гостей
  db.exec(`
    CREATE TABLE IF NOT EXISTS guests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      phone TEXT,
      city TEXT,
      country TEXT DEFAULT 'Россия',
      level TEXT DEFAULT 'Новичок', -- Новичок, Профи, Эксперт
      rating REAL DEFAULT 0,
      total_reports INTEGER DEFAULT 0,
      total_points INTEGER DEFAULT 0,
      status TEXT DEFAULT 'Активен', -- Активен, Заблокирован
      bio TEXT,
      travel_experience TEXT,
      preferred_regions TEXT, -- JSON
      preferred_hotel_types TEXT, -- JSON
      social_media TEXT, -- JSON
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Таблица отчетов
  db.exec(`
    CREATE TABLE IF NOT EXISTS reports (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      assignment_id INTEGER,
      guest_id INTEGER,
      hotel_id INTEGER,
      overall_rating REAL,
      categories_ratings TEXT, -- JSON с оценками по категориям
      recommendations_hotel TEXT,
      recommendations_guests TEXT,
      photos TEXT, -- JSON с фотографиями
      status TEXT DEFAULT 'На проверке', -- На проверке, Принят, Отклонен
      admin_notes TEXT,
      submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      reviewed_at DATETIME,
      FOREIGN KEY (assignment_id) REFERENCES assignments (id),
      FOREIGN KEY (guest_id) REFERENCES guests (id),
      FOREIGN KEY (hotel_id) REFERENCES hotels (id)
    )
  `);

  console.log('Таблицы созданы успешно');
};

// Функция для получения всех отелей
export const getAllHotels = () => {
  const stmt = db.prepare('SELECT * FROM hotels ORDER BY rating DESC');
  return stmt.all();
};

// Функция для получения отеля по ID
export const getHotelById = (id) => {
  const stmt = db.prepare('SELECT * FROM hotels WHERE id = ?');
  return stmt.get(id);
};

// Функция для получения заданий по отелю
export const getAssignmentsByHotel = (hotelId) => {
  const stmt = db.prepare(`
    SELECT a.*, h.name as hotel_name, h.city 
    FROM assignments a 
    JOIN hotels h ON a.hotel_id = h.id 
    WHERE a.hotel_id = ? AND a.status = 'Доступно'
  `);
  return stmt.all(hotelId);
};

// Функция для получения всех доступных заданий
export const getAvailableAssignments = () => {
  const stmt = db.prepare(`
    SELECT a.*, h.name as hotel_name, h.city, h.type as hotel_type, h.rating as hotel_rating,
           h.amenities, h.photos
    FROM assignments a 
    JOIN hotels h ON a.hotel_id = h.id 
    WHERE a.status = 'Доступно'
    ORDER BY 
      CASE a.priority 
        WHEN 'Высокий' THEN 1 
        WHEN 'Средний' THEN 2 
        WHEN 'Низкий' THEN 3 
      END,
      a.created_at DESC
  `);
  return stmt.all();
};

// Функция для добавления отеля
export const addHotel = (hotel) => {
  const stmt = db.prepare(`
    INSERT INTO hotels (name, city, address, country, type, stars, rating, price_per_night, 
                       description, amenities, photos, contact_phone, contact_email, website,
                       latitude, longitude)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  return stmt.run(
    hotel.name, hotel.city, hotel.address, hotel.country, hotel.type, hotel.stars,
    hotel.rating, hotel.price_per_night, hotel.description,
    JSON.stringify(hotel.amenities), JSON.stringify(hotel.photos),
    hotel.contact_phone, hotel.contact_email, hotel.website,
    hotel.latitude, hotel.longitude
  );
};

// Функция для добавления задания
export const addAssignment = (assignment) => {
  const stmt = db.prepare(`
    INSERT INTO assignments (hotel_id, title, description, priority, reward_type, reward_amount,
                           reward_points, check_in_date, check_out_date, deadline_date, room_type,
                           special_requirements)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  return stmt.run(
    assignment.hotel_id, assignment.title, assignment.description, assignment.priority,
    assignment.reward_type, assignment.reward_amount, assignment.reward_points,
    assignment.check_in_date, assignment.check_out_date, assignment.deadline_date,
    assignment.room_type, JSON.stringify(assignment.special_requirements)
  );
};

// Инициализация базы данных
export const initDatabase = () => {
  createTables();

  // Проверяем, есть ли уже данные
  const count = db.prepare('SELECT COUNT(*) as count FROM hotels').get();

  if (count.count === 0) {
    console.log('Заполняем базу данных начальными данными...');
    seedDatabase();
  }
};

// Заполнение базы данных тестовыми данными
const seedDatabase = () => {
  // Популярные отели из Островка
  const hotels = [
    {
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
      latitude: 59.9342,
      longitude: 30.3350
    },
    {
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
      latitude: 55.7587,
      longitude: 37.6176
    },
    {
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
      website: "www.rosaski.com",
      latitude: 43.6656,
      longitude: 40.3064
    },
    {
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
      website: "www.astoriaspb.ru",
      latitude: 59.9386,
      longitude: 30.3141
    },
    {
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
      latitude: 43.6028,
      longitude: 39.7342
    },
    {
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
      website: "www.kempinski.com/moscow",
      latitude: 55.7520,
      longitude: 37.6175
    },
    {
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
      website: "www.angleterrehotel.com",
      latitude: 59.9398,
      longitude: 30.3146
    },
    {
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
      website: "www.radisson.com/moscow",
      latitude: 55.7423,
      longitude: 37.5669
    },
    {
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
      website: "www.hilton.com/moscow",
      latitude: 55.7762,
      longitude: 37.6564
    },
    {
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
      website: "www.corinthia.com/st-petersburg",
      latitude: 59.9342,
      longitude: 30.3267
    },
    {
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
      website: "www.marriott.com/moscow",
      latitude: 55.7558,
      longitude: 37.6176
    },
    {
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
      website: "www.ibis.com/moscow",
      latitude: 55.7663,
      longitude: 37.6656
    },
    {
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
      website: "www.novotel.com/moscow",
      latitude: 55.7804,
      longitude: 37.6063
    },
    {
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
      website: "www.fourseasons.com/moscow",
      latitude: 55.7558,
      longitude: 37.6176
    },
    {
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
      website: "www.petropalace.ru",
      latitude: 59.9386,
      longitude: 30.3141
    },
    {
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
      website: "www.sochipark.ru",
      latitude: 43.4057,
      longitude: 39.9563
    },
    {
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
      website: "www.hyatt.com/sochi",
      latitude: 43.6028,
      longitude: 39.7342
    },
    {
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
      website: "www.lottehotel.com/moscow",
      latitude: 55.7558,
      longitude: 37.5893
    },
    {
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
      website: "www.talionimperial.com",
      latitude: 59.9342,
      longitude: 30.3267
    },
    {
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
      website: "www.holidayinn.com/moscow",
      latitude: 55.7804,
      longitude: 37.6656
    }
  ];

  // Добавляем отели в базу данных
  hotels.forEach(hotel => {
    addHotel(hotel);
  });

  // Создаем задания для некоторых отелей
  const assignments = [
    {
      hotel_id: 1, // Гранд Отель Европа
      title: "Проверка качества завтрака и SPA-услуг",
      description: "Необходимо оценить разнообразие и качество завтрака, а также профессионализм персонала SPA-центра",
      priority: "Высокий",
      reward_type: "Бесплатно",
      reward_amount: 100,
      reward_points: 500,
      check_in_date: "2024-04-15",
      check_out_date: "2024-04-17",
      deadline_date: "2024-04-20",
      room_type: "Стандартный номер",
      special_requirements: [
        "Оценить разнообразие блюд на завтраке",
        "Проверить качество SPA-услуг",
        "Оценить работу персонала",
        "Сравнить номер с фотографиями на сайте"
      ]
    },
    {
      hotel_id: 2, // Отель Метрополь
      title: "Оценка бизнес-услуг и конференц-залов",
      description: "Проверить качество бизнес-центра, скорость интернета и оборудование конференц-залов",
      priority: "Средний",
      reward_type: "Скидка",
      reward_amount: 80,
      reward_points: 400,
      check_in_date: "2024-04-20",
      check_out_date: "2024-04-22",
      deadline_date: "2024-04-25",
      room_type: "Бизнес номер",
      special_requirements: [
        "Проверить работу бизнес-центра",
        "Оценить скорость интернета",
        "Протестировать оборудование конференц-залов",
        "Оценить качество обслуживания в ресторане"
      ]
    },
    {
      hotel_id: 5, // Гранд Отель Сочи
      title: "Проверка пляжных услуг и анимации",
      description: "Оценить качество пляжа, работу аниматоров и состояние пляжного оборудования",
      priority: "Высокий",
      reward_type: "Бесплатно",
      reward_amount: 100,
      reward_points: 450,
      check_in_date: "2024-04-25",
      check_out_date: "2024-04-27",
      deadline_date: "2024-04-30",
      room_type: "Номер с видом на море",
      special_requirements: [
        "Оценить чистоту пляжа",
        "Проверить работу аниматоров",
        "Оценить состояние пляжного оборудования",
        "Проверить качество пляжного бара"
      ]
    },
    {
      hotel_id: 8, // Отель Рэдиссон Славянская
      title: "Проверка удобства для бизнес-путешественников",
      description: "Оценить удобство расположения, качество бизнес-услуг и транспортную доступность",
      priority: "Средний",
      reward_type: "Скидка",
      reward_amount: 70,
      reward_points: 300,
      check_in_date: "2024-05-01",
      check_out_date: "2024-05-03",
      deadline_date: "2024-05-06",
      room_type: "Бизнес номер",
      special_requirements: [
        "Оценить удобство расположения",
        "Проверить качество бизнес-услуг",
        "Оценить транспортную доступность",
        "Проверить работу консьержа"
      ]
    },
    {
      hotel_id: 12, // Отель Ибис Москва Центр
      title: "Проверка соотношения цена-качество",
      description: "Оценить соответствие качества услуг заявленной ценовой категории",
      priority: "Низкий",
      reward_type: "Скидка",
      reward_amount: 60,
      reward_points: 250,
      check_in_date: "2024-05-05",
      check_out_date: "2024-05-07",
      deadline_date: "2024-05-10",
      room_type: "Стандартный номер",
      special_requirements: [
        "Оценить соотношение цена-качество",
        "Проверить чистоту номера",
        "Оценить качество завтрака",
        "Проверить работу персонала"
      ]
    }
  ];

  // Добавляем задания в базу данных
  assignments.forEach(assignment => {
    addAssignment(assignment);
  });

  console.log('База данных заполнена тестовыми данными');
};

// Инициализируем базу данных при импорте
initDatabase();

export default db;