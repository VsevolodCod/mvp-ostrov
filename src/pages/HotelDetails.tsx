import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchHotelById, fetchAssignmentsByHotel } from "@/lib/api.js";
import { useAssignments } from "@/hooks/useAssignments.js";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MapPin, Star, Calendar, Users, Wifi, Car, 
  Utensils, Dumbbell, Waves, Gift, Clock, 
  ArrowLeft, CheckCircle, AlertCircle, Camera,
  Phone, Mail, Globe, Navigation, Target
} from "lucide-react";

const HotelDetails = () => {
  const { id } = useParams();
  const { takeAssignment, isAssignmentTaken } = useAssignments();
  const [hotelData, setHotelData] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHotelData = async () => {
      try {
        setLoading(true);
        const hotel = await fetchHotelById(id);
        const hotelAssignments = await fetchAssignmentsByHotel(id);
        
        console.log('Загруженный отель:', hotel); // Для отладки
        console.log('Задания отеля:', hotelAssignments); // Для отладки
        
        if (hotel) {
          setHotelData(hotel);
          setAssignments(hotelAssignments);
        }
      } catch (error) {
        console.error('Ошибка загрузки данных отеля:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadHotelData();
    }
  }, [id]);

  const handleTakeAssignment = (assignment) => {
    const success = takeAssignment(assignment);
    if (success) {
      alert('Задание успешно взято! Теперь оно отображается в вашем личном кабинете.');
    } else {
      alert('Это задание уже взято или произошла ошибка.');
    }
  };

  // Fallback данные для демонстрации
  const fallbackHotelData = {
    id: 1,
    name: "Гранд Отель Сочи",
    city: "Сочи",
    address: "ул. Курортный проспект, 75",
    type: "Курортный отель",
    rating: 4.2,
    stars: 4,
    priority: "Высокий",
    deadline: "2024-04-20",
    reward: "Бесплатное проживание + 500 баллов",
    description: "Роскошный курортный отель на берегу Черного моря с собственным пляжем и SPA-центром. Требуется детальная проверка качества завтрака и работы SPA-услуг.",
    amenities: ["Wifi", "Парковка", "Ресторан", "SPA", "Бассейн", "Фитнес", "Пляж"],
    checkInDate: "2024-04-15",
    checkOutDate: "2024-04-17",
    roomType: "Стандартный номер с видом на море",
    contact_phone: "+7 (862) 123-45-67",
    contact_email: "info@grandsochi.ru",
    website: "www.grandsochi.ru",
    specialRequirements: [
      {
        category: "Завтрак",
        items: [
          "Оценить разнообразие блюд",
          "Проверить качество продуктов",
          "Оценить сервировку и подачу",
          "Время работы ресторана"
        ]
      },
      {
        category: "SPA-центр", 
        items: [
          "Качество массажных услуг",
          "Чистота помещений",
          "Профессионализм персонала",
          "Соответствие цен и качества"
        ]
      },
      {
        category: "Номер",
        items: [
          "Соответствие фотографиям",
          "Чистота и уборка",
          "Работа техники и удобств",
          "Вид из окна"
        ]
      },
      {
        category: "Сервис",
        items: [
          "Скорость заселения/выселения",
          "Дружелюбность персонала",
          "Решение возникающих вопросов",
          "Дополнительные услуги"
        ]
      }
    ],
    photos: [
      { category: "Фасад", url: "/api/placeholder/400/300" },
      { category: "Номер", url: "/api/placeholder/400/300" },
      { category: "Ресторан", url: "/api/placeholder/400/300" },
      { category: "SPA", url: "/api/placeholder/400/300" }
    ],
    recentReports: [
      {
        date: "2024-03-10",
        guest: "Анна П.",
        rating: 4.1,
        summary: "Отличный сервис, но завтрак мог бы быть разнообразнее"
      },
      {
        date: "2024-02-28", 
        guest: "Михаил К.",
        rating: 4.3,
        summary: "Прекрасный SPA-центр, номер соответствует описанию"
      }
    ]
  };

  const amenityIcons = {
    "WiFi": Wifi,
    "Wifi": Wifi,
    "Парковка": Car,
    "Ресторан": Utensils,
    "SPA": Waves,
    "Бассейн": Waves,
    "Фитнес": Dumbbell,
    "Фитнес-центр": Dumbbell,
    "Пляж": Waves,
    "Консьерж": Users,
    "Бизнес-центр": Users
  };

  // Используем данные из базы или fallback
  const displayData = hotelData || fallbackHotelData;

  const getUrgencyColor = (priority) => {
    switch (priority) {
      case "Высокий": return "bg-red-100 text-red-800 border-red-200";
      case "Средний": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Низкий": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex justify-center items-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Загрузка информации об отеле...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!displayData) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">Отель не найден</p>
          <Link to="/hotel-selection">
            <Button className="mt-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Назад к заданиям
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-6">
        <Link to="/hotel-selection">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Назад к заданиям
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{displayData.name}</h1>
          <p className="text-gray-600 flex items-center">
            <MapPin className="w-4 h-4 mr-1" />
            {displayData.address}, {displayData.city}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Hotel Overview */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">{displayData.name}</CardTitle>
                  <CardDescription className="flex items-center mt-2">
                    <Badge variant="outline" className="mr-2">{displayData.type}</Badge>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                      <span>{displayData.rating}</span>
                    </div>
                    {displayData?.stars && (
                      <div className="flex items-center ml-3">
                        {[...Array(displayData.stars)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    )}
                  </CardDescription>
                </div>
                {assignments.length > 0 && (
                  <Badge className="bg-green-100 text-green-800">
                    {assignments.length} заданий доступно
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">{displayData.description}</p>
              
              {/* Amenities */}
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Удобства:</h4>
                <div className="flex flex-wrap gap-2">
                  {(displayData.amenities || []).map((amenity) => {
                    const IconComponent = amenityIcons[amenity] || Wifi;
                    return (
                      <Badge key={amenity} variant="outline" className="flex items-center">
                        <IconComponent className="w-3 h-3 mr-1" />
                        {amenity}
                      </Badge>
                    );
                  })}
                </div>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 text-gray-500 mr-2" />
                  <span className="text-sm">{displayData.contact_phone || 'Не указан'}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 text-gray-500 mr-2" />
                  <span className="text-sm">{displayData.contact_email || 'Не указан'}</span>
                </div>
                <div className="flex items-center">
                  <Globe className="w-4 h-4 text-gray-500 mr-2" />
                  <span className="text-sm">{displayData.website || 'Не указан'}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Assignment Details */}
          <Tabs defaultValue="requirements" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="requirements">Требования</TabsTrigger>
              <TabsTrigger value="photos">Фотографии</TabsTrigger>
              <TabsTrigger value="reports">Предыдущие отчеты</TabsTrigger>
            </TabsList>

            <TabsContent value="requirements">
              <Card>
                <CardHeader>
                  <CardTitle>Детальные требования к проверке</CardTitle>
                  <CardDescription>
                    Что необходимо проверить и оценить во время пребывания
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {(hotelData?.specialRequirements || displayData?.specialRequirements || []).map((category, index) => (
                      <div key={index}>
                        <h4 className="font-semibold text-lg mb-3 text-blue-900">
                          {category.category}
                        </h4>
                        <ul className="space-y-2">
                          {(category.items || []).map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-start">
                              <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="photos">
              <Card>
                <CardHeader>
                  <CardTitle>Фотографии отеля</CardTitle>
                  <CardDescription>
                    Текущие фотографии для сравнения с реальностью
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {(hotelData?.photos || displayData?.photos || []).map((photo, index) => (
                      <div key={index} className="space-y-2">
                        <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                          <Camera className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-sm text-center text-gray-600">{photo.category}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reports">
              <Card>
                <CardHeader>
                  <CardTitle>Предыдущие отчеты</CardTitle>
                  <CardDescription>
                    Отчеты других секретных гостей об этом отеле
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {(hotelData?.recentReports || displayData?.recentReports || []).map((report, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-medium">Гость: {report.guest}</p>
                            <p className="text-sm text-gray-600">{report.date}</p>
                          </div>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                            <span className="font-medium">{report.rating}</span>
                          </div>
                        </div>
                        <p className="text-gray-700">{report.summary}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Assignment Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 w-5 h-5" />
                Информация о задании
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-600">Даты пребывания</Label>
                <p className="font-medium">{hotelData.checkInDate} - {hotelData.checkOutDate}</p>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-600">Тип номера</Label>
                <p className="font-medium">{hotelData.roomType}</p>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-600">Дедлайн отчета</Label>
                <p className="font-medium flex items-center">
                  <Clock className="w-4 h-4 mr-1 text-orange-500" />
                  {hotelData.deadline}
                </p>
              </div>
              
              <div className="p-3 bg-green-50 rounded-lg">
                <Label className="text-sm font-medium text-green-800">Вознаграждение</Label>
                <p className="font-medium text-green-700 flex items-center">
                  <Gift className="w-4 h-4 mr-1" />
                  {hotelData.reward}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardContent className="pt-6 space-y-3">
              {assignments.length > 0 ? (
                assignments.map((assignment) => (
                  <div key={assignment.id} className="space-y-2">
                    {isAssignmentTaken(assignment.id) ? (
                      <Button disabled className="w-full bg-green-100 text-green-800 border-green-200">
                        <CheckCircle className="mr-2 w-4 h-4" />
                        Задание взято
                      </Button>
                    ) : (
                      <Button 
                        onClick={() => handleTakeAssignment(assignment)}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      >
                        <Target className="mr-2 w-4 h-4" />
                        Взять задание
                      </Button>
                    )}
                  </div>
                ))
              ) : (
                <Button disabled className="w-full bg-gray-100 text-gray-500">
                  <AlertCircle className="mr-2 w-4 h-4" />
                  Нет доступных заданий
                </Button>
              )}
              
              <Button variant="outline" className="w-full" onClick={() => alert('Открытие карты с местоположением отеля')}>
                <Navigation className="mr-2 w-4 h-4" />
                Показать на карте
              </Button>
              
              <Button variant="outline" className="w-full" onClick={() => alert('Контакты отеля: ' + (displayData?.contact_phone || 'Не указан'))}>
                Связаться с отелем
              </Button>
            </CardContent>
          </Card>

          {/* Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Советы для проверки</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <AlertCircle className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                  Ведите себя как обычный гость
                </li>
                <li className="flex items-start">
                  <AlertCircle className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                  Делайте фото незаметно
                </li>
                <li className="flex items-start">
                  <AlertCircle className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                  Записывайте детали сразу
                </li>
                <li className="flex items-start">
                  <AlertCircle className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                  Будьте объективны в оценках
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const Label = ({ className, children, ...props }) => (
  <label className={`text-sm font-medium ${className}`} {...props}>
    {children}
  </label>
);

export default HotelDetails;