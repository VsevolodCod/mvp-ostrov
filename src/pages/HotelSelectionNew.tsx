import { useState, useEffect } from "react";
import { Card, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { 
  MapPin, Star, Gift, Filter, Calendar, Clock, Heart, AlertCircle, Users, Wifi,
  Car, Utensils, Dumbbell, Waves, Target
} from "lucide-react";
import { fetchAvailableAssignments } from "@/lib/api.js";
import { useAssignments } from "@/hooks/useAssignments.js";
import { Link, useNavigate } from "react-router-dom";

const HotelSelectionNew = () => {
  const { takeAssignment, isAssignmentTaken } = useAssignments();
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredAssignments, setFilteredAssignments] = useState([]);

  const [filters, setFilters] = useState({
    city: "all",
    hotelType: "all",
    priority: "all"
  });

  useEffect(() => {
    const loadAssignments = async () => {
      try {
        setLoading(true);
        const data = await fetchAvailableAssignments();
        console.log('Загруженные задания:', data);
        setAssignments(data);
        setFilteredAssignments(data);
      } catch (error) {
        console.error('Ошибка загрузки заданий:', error);
        setAssignments([]);
        setFilteredAssignments([]);
      } finally {
        setLoading(false);
      }
    };
    loadAssignments();
  }, []);

  useEffect(() => {
    let filtered = assignments;

    if (filters.city && filters.city !== "all") {
      filtered = filtered.filter(assignment => 
        assignment.city.toLowerCase().includes(filters.city.toLowerCase())
      );
    }

    if (filters.hotelType && filters.hotelType !== "all") {
      filtered = filtered.filter(assignment => 
        assignment.hotel_type.toLowerCase().includes(filters.hotelType.toLowerCase())
      );
    }

    if (filters.priority && filters.priority !== "all") {
      filtered = filtered.filter(assignment => 
        assignment.priority === filters.priority
      );
    }

    setFilteredAssignments(filtered);
  }, [filters, assignments]);

  const getPriorityBadgeColor = (priority) => {
    switch (priority) {
      case "Высокий": return "bg-red-100 text-red-800";
      case "Средний": return "bg-yellow-100 text-yellow-800";
      case "Низкий": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
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
    "Бар": Utensils,
    "Конференц-зал": Users,
    "Консьерж": Users,
    "Бизнес-центр": Users,
    "Пляж": Waves,
    "Детская площадка": Users,
    "Анимация": Users,
    "Горнолыжные склоны": Target,
    "Подъемники": Target,
    "Прокат оборудования": Target
  };

  const handleTakeAssignment = (assignment) => {
    const success = takeAssignment(assignment);
    if (success) {
      const shouldCreateGameReport = window.confirm(
        `Задание "${assignment.hotel_name}" успешно взято!\n\nХотите создать интерактивный игровой отчет? Это позволит получать очки за каждый этап пребывания в отеле.`
      );
      
      if (shouldCreateGameReport) {
        navigate(`/game-report/${assignment.id}`);
      } else {
        alert('Задание добавлено в ваш личный кабинет. Вы можете создать отчет позже.');
      }
      
      // Обновляем состояние для немедленного отображения изменений
      setFilteredAssignments(prev => [...prev]);
    } else {
      alert('Это задание уже взято или произошла ошибка.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Доступные задания</h1>
          <p className="text-gray-600">Выберите отель для проверки</p>
        </div>
        <Badge className="bg-green-100 text-green-800">
          {filteredAssignments.length} заданий доступно
        </Badge>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center">
            <Filter className="mr-2 w-5 h-5" />
            Фильтры поиска
          </div>
        </CardHeader>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Город</Label>
              <Select onValueChange={(value) => setFilters({ ...filters, city: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите город" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все города</SelectItem>
                  <SelectItem value="Москва">Москва</SelectItem>
                  <SelectItem value="Санкт-Петербург">Санкт-Петербург</SelectItem>
                  <SelectItem value="Сочи">Сочи</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label>Тип отеля</Label>
              <Select onValueChange={(value) => setFilters({ ...filters, hotelType: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Тип отеля" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все типы</SelectItem>
                  <SelectItem value="Люкс">Люкс отель</SelectItem>
                  <SelectItem value="Курортный">Курортный отель</SelectItem>
                  <SelectItem value="Бизнес">Бизнес-отель</SelectItem>
                  <SelectItem value="Бутик">Бутик-отель</SelectItem>
                  <SelectItem value="Исторический">Исторический отель</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Приоритет</Label>
              <Select onValueChange={(value) => setFilters({ ...filters, priority: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Приоритет" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все</SelectItem>
                  <SelectItem value="Высокий">Высокий</SelectItem>
                  <SelectItem value="Средний">Средний</SelectItem>
                  <SelectItem value="Низкий">Низкий</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </Card>

      {loading && (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      )}

      {!loading && (
        <div className="space-y-6">
          {filteredAssignments.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">Заданий по выбранным фильтрам не найдено</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => setFilters({
                  city: "all",
                  hotelType: "all",
                  priority: "all"
                })}
              >
                Сбросить фильтры
              </Button>
            </div>
          ) : (
            filteredAssignments.map((assignment) => (
              <Card key={assignment.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-1">
                    <div className="h-64 lg:h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center relative">
                      <div className="text-white text-center">
                        <MapPin className="w-12 h-12 mx-auto mb-2" />
                        <p className="text-lg font-semibold">{assignment.hotel_name}</p>
                      </div>
                      {assignment.priority === "Высокий" && (
                        <Badge className="absolute top-3 left-3 bg-red-500 text-white">
                          Срочно
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="lg:col-span-2 p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-1">{assignment.hotel_name}</h3>
                        <div className="flex items-center text-gray-600 mb-2">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span>{assignment.city}</span>
                          <Badge variant="outline" className="ml-2">{assignment.hotel_type}</Badge>
                        </div>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                          <span className="font-medium">{assignment.hotel_rating}</span>
                          <Badge className={`ml-3 ${getPriorityBadgeColor(assignment.priority)}`}>
                            {assignment.priority} приоритет
                          </Badge>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>

                    <p className="text-gray-700 mb-4">{assignment.description}</p>

                    {/* Assignment Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Детали задания:</h4>
                        <div className="space-y-1 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            {assignment.check_in_date} - {assignment.check_out_date}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2" />
                            Дедлайн: {assignment.deadline_date}
                          </div>
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-2" />
                            {assignment.room_type}
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Особые требования:</h4>
                        <ul className="space-y-1 text-sm text-gray-600">
                          {assignment.special_requirements?.slice(0, 3).map((req, index) => (
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
                        {assignment.amenities?.map((amenity) => {
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

                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Gift className="w-5 h-5 text-green-600 mr-2" />
                        <span className="font-semibold text-green-600">{assignment.reward}</span>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Link to={`/hotel/${assignment.hotel_id}`}>
                          <Button variant="outline">Подробнее</Button>
                        </Link>
                        {isAssignmentTaken(assignment.id) ? (
                          <Button disabled className="bg-gray-400 text-white cursor-not-allowed">
                            Задание взято
                          </Button>
                        ) : (
                          <Button
                            onClick={() => handleTakeAssignment(assignment)}
                            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                          >
                            Взять задание
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      )}

      {/* Load More */}
      {!loading && filteredAssignments.length > 0 && (
        <div className="text-center">
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => alert('Функция "Загрузить еще" будет реализована в следующих версиях')}
          >
            Загрузить еще задания
          </Button>
        </div>
      )}
    </div>
  );
};

export default HotelSelectionNew;