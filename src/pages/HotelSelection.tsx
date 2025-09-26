import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { 
  MapPin, Star, Calendar, Users, Wifi, Car, 
  Utensils, Dumbbell, Waves, Gift, Clock, 
  Filter, Search, Heart, AlertCircle
} from "lucide-react";

const HotelSelection = () => {
  const [filters, setFilters] = useState({
    city: "",
    checkIn: "",
    checkOut: "",
    hotelType: "",
    priceRange: "",
    amenities: []
  });

  const availableHotels = [
    {
      id: 1,
      name: "Гранд Отель Сочи",
      city: "Сочи",
      type: "Курортный отель",
      rating: 4.2,
      priority: "Высокий",
      deadline: "2024-04-20",
      reward: "Бесплатное проживание + 500 баллов",
      description: "Требуется проверка качества завтрака и работы SPA-центра",
      amenities: ["Wifi", "Парковка", "Ресторан", "SPA", "Бассейн"],
      image: "/api/placeholder/300/200",
      urgency: "urgent",
      checkInDate: "2024-04-15",
      checkOutDate: "2024-04-17",
      roomType: "Стандартный номер",
      specialRequirements: [
        "Оценить качество завтрака",
        "Проверить работу SPA-центра", 
        "Оценить уборку номера",
        "Проверить работу персонала на ресепшене"
      ]
    },
    {
      id: 2,
      name: "Бутик-отель Арбат",
      city: "Москва",
      type: "Бутик-отель",
      rating: 4.6,
      priority: "Средний",
      deadline: "2024-04-30",
      reward: "80% скидка + 300 баллов",
      description: "Проверка соответствия номеров фотографиям на сайте",
      amenities: ["Wifi", "Ресторан", "Бар"],
      image: "/api/placeholder/300/200",
      urgency: "normal",
      checkInDate: "2024-04-25",
      checkOutDate: "2024-04-27",
      roomType: "Делюкс номер",
      specialRequirements: [
        "Сравнить номер с фото на сайте",
        "Оценить работу консьержа",
        "Проверить качество ресторана"
      ]
    },
    {
      id: 3,
      name: "Отель Европа",
      city: "Санкт-Петербург",
      type: "Бизнес-отель",
      rating: 4.4,
      priority: "Низкий",
      deadline: "2024-05-15",
      reward: "60% скидка + 250 баллов",
      description: "Оценка качества бизнес-услуг и конференц-залов",
      amenities: ["Wifi", "Парковка", "Конференц-зал", "Фитнес"],
      image: "/api/placeholder/300/200",
      urgency: "normal",
      checkInDate: "2024-05-10",
      checkOutDate: "2024-05-12",
      roomType: "Бизнес номер",
      specialRequirements: [
        "Проверить работу бизнес-центра",
        "Оценить качество конференц-залов",
        "Проверить скорость интернета"
      ]
    }
  ];

  const amenityIcons = {
    "Wifi": Wifi,
    "Парковка": Car,
    "Ресторан": Utensils,
    "SPA": Waves,
    "Бассейн": Waves,
    "Фитнес": Dumbbell,
    "Бар": Utensils,
    "Конференц-зал": Users
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case "urgent": return "bg-red-100 text-red-800 border-red-200";
      case "normal": return "bg-blue-100 text-blue-800 border-blue-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Высокий": return "text-red-600";
      case "Средний": return "text-yellow-600";
      case "Низкий": return "text-green-600";
      default: return "text-gray-600";
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Доступные задания</h1>
          <p className="text-gray-600">Выберите отель для проверки из списка доступных заданий</p>
        </div>
        <Badge className="bg-green-100 text-green-800">
          {availableHotels.length} заданий доступно
        </Badge>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="mr-2 w-5 h-5" />
            Фильтры поиска
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="city">Город</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите город" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="moscow">Москва</SelectItem>
                  <SelectItem value="spb">Санкт-Петербург</SelectItem>
                  <SelectItem value="sochi">Сочи</SelectItem>
                  <SelectItem value="kazan">Казань</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="type">Тип отеля</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Тип отеля" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="resort">Курортный</SelectItem>
                  <SelectItem value="business">Бизнес</SelectItem>
                  <SelectItem value="boutique">Бутик</SelectItem>
                  <SelectItem value="budget">Эконом</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="priority">Приоритет</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Приоритет" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">Высокий</SelectItem>
                  <SelectItem value="medium">Средний</SelectItem>
                  <SelectItem value="low">Низкий</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="reward">Вознаграждение</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Тип награды" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="free">Бесплатно</SelectItem>
                  <SelectItem value="discount">Со скидкой</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hotel Cards */}
      <div className="space-y-6">
        {availableHotels.map((hotel) => (
          <Card key={hotel.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Hotel Image */}
              <div className="lg:col-span-1">
                <div className="h-64 lg:h-full bg-gray-200 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <div className="text-white text-center">
                      <MapPin className="w-12 h-12 mx-auto mb-2" />
                      <p className="text-lg font-semibold">{hotel.name}</p>
                    </div>
                  </div>
                  {hotel.urgency === "urgent" && (
                    <Badge className="absolute top-3 left-3 bg-red-500 text-white">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      Срочно
                    </Badge>
                  )}
                </div>
              </div>

              {/* Hotel Info */}
              <div className="lg:col-span-2 p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">{hotel.name}</h3>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{hotel.city}</span>
                      <Badge variant="outline" className="ml-2">{hotel.type}</Badge>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                      <span className="font-medium">{hotel.rating}</span>
                      <span className={`ml-3 font-medium ${getPriorityColor(hotel.priority)}`}>
                        Приоритет: {hotel.priority}
                      </span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>

                <p className="text-gray-700 mb-4">{hotel.description}</p>

                {/* Assignment Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Детали задания:</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        {hotel.checkInDate} - {hotel.checkOutDate}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        Дедлайн: {hotel.deadline}
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-2" />
                        {hotel.roomType}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Особые требования:</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      {hotel.specialRequirements.slice(0, 3).map((req, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-1 h-1 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Amenities */}
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Удобства:</h4>
                  <div className="flex flex-wrap gap-2">
                    {hotel.amenities.map((amenity) => {
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

                {/* Reward and Actions */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0">
                  <div className="flex items-center">
                    <Gift className="w-5 h-5 text-green-600 mr-2" />
                    <span className="font-semibold text-green-600">{hotel.reward}</span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Link to={`/hotel/${hotel.id}`}>
                      <Button variant="outline">
                        Подробнее
                      </Button>
                    </Link>
                    <Link to="/create-report">
                      <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                        Взять задание
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline" size="lg">
          Загрузить еще задания
        </Button>
      </div>
    </div>
  );
};

export default HotelSelection;