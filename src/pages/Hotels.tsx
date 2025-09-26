import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Star, Calendar, Clock, Search, Filter } from "lucide-react";

const Hotels = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const availableHotels = [
    {
      id: 1,
      name: "Отель Балчуг Кемпински",
      city: "Москва",
      address: "ул. Балчуг, 1",
      rating: 4.5,
      urgency: "высокая",
      reward: "₽12,000",
      deadline: "2024-04-15",
      category: "Люкс",
      description: "Требуется проверка качества сервиса в ресторане и spa-зоне",
      image: "/placeholder-hotel1.jpg"
    },
    {
      id: 2,
      name: "Гранд Отель Европа",
      city: "Санкт-Петербург",
      address: "ул. Михайловская, 1/7",
      rating: 4.7,
      urgency: "средняя",
      reward: "₽15,000",
      deadline: "2024-04-25",
      category: "Люкс",
      description: "Оценка соответствия описания номеров на сайте реальности",
      image: "/placeholder-hotel2.jpg"
    },
    {
      id: 3,
      name: "Курорт Роза Хутор",
      city: "Сочи",
      address: "Красная Поляна",
      rating: 4.3,
      urgency: "низкая",
      reward: "₽18,000",
      deadline: "2024-05-10",
      category: "Курорт",
      description: "Проверка качества услуг в горнолыжный сезон",
      image: "/placeholder-hotel3.jpg"
    },
    {
      id: 4,
      name: "Отель Метрополь",
      city: "Москва",
      address: "Театральный проезд, 2",
      rating: 4.4,
      urgency: "высокая",
      reward: "₽10,000",
      deadline: "2024-04-12",
      category: "Бизнес",
      description: "Оценка бизнес-центра и конференц-залов",
      image: "/placeholder-hotel4.jpg"
    }
  ];

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case "высокая":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Срочно</Badge>;
      case "средняя":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Средне</Badge>;
      case "низкая":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Обычно</Badge>;
      default:
        return <Badge variant="secondary">{urgency}</Badge>;
    }
  };

  const filteredHotels = availableHotels.filter(hotel => {
    const matchesSearch = hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hotel.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = !selectedCity || hotel.city === selectedCity;
    
    return matchesSearch && matchesCity;
  });

  const cities = [...new Set(availableHotels.map(hotel => hotel.city))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Доступные отели для проверки</h1>
          <p className="text-muted-foreground">Выберите отель для выполнения миссии секретного гостя</p>
        </div>

        {/* Filters */}
        <Card className="mb-8 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              Фильтры поиска
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Поиск по названию или городу..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="w-full md:w-48">
                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите город" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Все города</SelectItem>
                    {cities.map(city => (
                      <SelectItem key={city} value={city}>{city}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Hotels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHotels.map((hotel) => (
            <Card key={hotel.id} className="shadow-card hover:shadow-travel transition-shadow duration-300">
              <div className="aspect-video bg-gradient-ocean rounded-t-lg"></div>
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-lg">{hotel.name}</CardTitle>
                  {getUrgencyBadge(hotel.urgency)}
                </div>
                <CardDescription className="space-y-1">
                  <div className="flex items-center text-sm">
                    <MapPin className="w-4 h-4 mr-1" />
                    {hotel.city}, {hotel.address}
                  </div>
                  <div className="flex items-center text-sm">
                    <Star className="w-4 h-4 mr-1 text-yellow-500 fill-current" />
                    {hotel.rating} • {hotel.category}
                  </div>
                  <div className="flex items-center text-sm">
                    <Calendar className="w-4 h-4 mr-1" />
                    До {new Date(hotel.deadline).toLocaleDateString('ru-RU')}
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{hotel.description}</p>
                <div className="flex justify-between items-center">
                  <div className="text-lg font-semibold text-accent">{hotel.reward}</div>
                  <Button size="sm" className="bg-gradient-ocean">
                    Подать заявку
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredHotels.length === 0 && (
          <Card className="shadow-card">
            <CardContent className="text-center py-12">
              <div className="text-muted-foreground">
                <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Отели не найдены</p>
                <p className="text-sm">Попробуйте изменить критерии поиска</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Hotels;