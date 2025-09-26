import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Users, Hotel, FileText, TrendingUp, Star, 
  CheckCircle, AlertCircle, Clock, Eye, 
  Filter, Download, Search, MoreHorizontal,
  UserCheck, Building, MapPin, Calendar
} from "lucide-react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const stats = {
    totalGuests: 1247,
    activeGuests: 89,
    pendingApplications: 23,
    totalHotels: 456,
    activeAssignments: 67,
    completedReports: 1834,
    pendingReports: 12,
    averageRating: 4.3
  };

  const pendingApplications = [
    {
      id: 1,
      name: "Мария Иванова",
      email: "maria@email.com",
      city: "Москва",
      experience: "15+ поездок в год",
      appliedDate: "2024-03-20",
      status: "На рассмотрении"
    },
    {
      id: 2,
      name: "Алексей Петров", 
      email: "alex@email.com",
      city: "СПб",
      experience: "20+ поездок в год",
      appliedDate: "2024-03-19",
      status: "На рассмотрении"
    }
  ];

  const activeGuests = [
    {
      id: 1,
      name: "Анна Петрова",
      level: "Эксперт",
      rating: 4.8,
      totalReports: 23,
      activeAssignments: 2,
      joinDate: "2023-01-15",
      status: "Активен"
    },
    {
      id: 2,
      name: "Михаил Козлов",
      level: "Профи",
      rating: 4.6,
      totalReports: 15,
      activeAssignments: 1,
      joinDate: "2023-03-10",
      status: "Активен"
    }
  ];

  const pendingReports = [
    {
      id: 1,
      guestName: "Анна Петрова",
      hotelName: "Гранд Отель Сочи",
      city: "Сочи",
      submittedDate: "2024-03-18",
      rating: 4.2,
      status: "На проверке",
      priority: "Высокий"
    },
    {
      id: 2,
      guestName: "Михаил Козлов",
      hotelName: "Отель Европа",
      city: "СПб",
      submittedDate: "2024-03-17",
      rating: 4.5,
      status: "На проверке",
      priority: "Средний"
    }
  ];

  const hotels = [
    {
      id: 1,
      name: "Гранд Отель Сочи",
      city: "Сочи",
      type: "Курортный",
      rating: 4.2,
      totalReports: 8,
      lastCheck: "2024-03-15",
      status: "Активен",
      needsCheck: false
    },
    {
      id: 2,
      name: "Отель Метрополь",
      city: "Москва",
      type: "Бизнес",
      rating: 4.1,
      totalReports: 12,
      lastCheck: "2024-02-28",
      status: "Требует проверки",
      needsCheck: true
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Активен": return "bg-green-100 text-green-800";
      case "На рассмотрении": return "bg-yellow-100 text-yellow-800";
      case "На проверке": return "bg-blue-100 text-blue-800";
      case "Требует проверки": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Админ-панель</h1>
          <p className="text-gray-600">Управление программой "Секретный гость"</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="mr-2 w-4 h-4" />
            Экспорт данных
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Users className="mr-2 w-4 h-4" />
            Добавить отель
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Всего гостей</p>
                <p className="text-2xl font-bold">{stats.totalGuests}</p>
                <p className="text-xs text-green-600">+12 за месяц</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Отелей в программе</p>
                <p className="text-2xl font-bold">{stats.totalHotels}</p>
                <p className="text-xs text-green-600">+8 за месяц</p>
              </div>
              <Building className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Активных заданий</p>
                <p className="text-2xl font-bold">{stats.activeAssignments}</p>
                <p className="text-xs text-blue-600">В процессе</p>
              </div>
              <FileText className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Средний рейтинг</p>
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-500 fill-current mr-1" />
                  <span className="text-2xl font-bold">{stats.averageRating}</span>
                </div>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Обзор</TabsTrigger>
          <TabsTrigger value="applications">Заявки</TabsTrigger>
          <TabsTrigger value="guests">Гости</TabsTrigger>
          <TabsTrigger value="reports">Отчеты</TabsTrigger>
          <TabsTrigger value="hotels">Отели</TabsTrigger>
        </TabsList>

        {/* Overview */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Требуют внимания</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <div className="flex items-center">
                      <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                      <span className="text-sm">Просроченные отчеты</span>
                    </div>
                    <Badge className="bg-red-100 text-red-800">3</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 text-yellow-600 mr-2" />
                      <span className="text-sm">Заявки на рассмотрении</span>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800">{stats.pendingApplications}</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center">
                      <FileText className="w-5 h-5 text-blue-600 mr-2" />
                      <span className="text-sm">Отчеты на проверке</span>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">{stats.pendingReports}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Активность за неделю</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Новые заявки</span>
                    <span className="font-medium">15</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Завершенные задания</span>
                    <span className="font-medium">28</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Новые отели</span>
                    <span className="font-medium">3</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Средний рейтинг отчетов</span>
                    <span className="font-medium">4.4</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Applications */}
        <TabsContent value="applications" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Заявки на участие</CardTitle>
                  <CardDescription>Новые заявки от кандидатов в секретные гости</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Input placeholder="Поиск по имени..." className="w-64" />
                  <Button variant="outline">
                    <Filter className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingApplications.map((application) => (
                  <div key={application.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{application.name}</h3>
                        <p className="text-gray-600 text-sm">{application.email}</p>
                        <div className="flex items-center mt-2 space-x-4 text-sm text-gray-600">
                          <span className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {application.city}
                          </span>
                          <span>{application.experience}</span>
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {application.appliedDate}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(application.status)}>
                          {application.status}
                        </Badge>
                        <Button variant="outline" size="sm" onClick={() => alert('Просмотр заявки: ' + application.name)}>
                          <Eye className="w-4 h-4 mr-1" />
                          Просмотр
                        </Button>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => alert('Заявка одобрена: ' + application.name)}>
                          <UserCheck className="w-4 h-4 mr-1" />
                          Одобрить
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Guests */}
        <TabsContent value="guests" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Секретные гости</CardTitle>
                  <CardDescription>Управление участниками программы</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Select>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Уровень" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все уровни</SelectItem>
                      <SelectItem value="expert">Эксперт</SelectItem>
                      <SelectItem value="pro">Профи</SelectItem>
                      <SelectItem value="beginner">Новичок</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input placeholder="Поиск гостей..." className="w-64" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeGuests.map((guest) => (
                  <div key={guest.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <h3 className="font-semibold text-lg">{guest.name}</h3>
                          <Badge variant="outline">{guest.level}</Badge>
                          <Badge className={getStatusColor(guest.status)}>
                            {guest.status}
                          </Badge>
                        </div>
                        <div className="flex items-center mt-2 space-x-6 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                            <span>{guest.rating}</span>
                          </div>
                          <span>Отчетов: {guest.totalReports}</span>
                          <span>Активных заданий: {guest.activeAssignments}</span>
                          <span>Участник с {guest.joinDate}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => alert('Профиль гостя: ' + guest.name)}>
                          <Eye className="w-4 h-4 mr-1" />
                          Профиль
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => alert('Дополнительные действия для: ' + guest.name)}>
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reports */}
        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Отчеты на проверке</CardTitle>
                  <CardDescription>Отчеты, требующие модерации</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Select>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Приоритет" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все</SelectItem>
                      <SelectItem value="high">Высокий</SelectItem>
                      <SelectItem value="medium">Средний</SelectItem>
                      <SelectItem value="low">Низкий</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Filter className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingReports.map((report) => (
                  <div key={report.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{report.hotelName}</h3>
                        <p className="text-gray-600">Автор: {report.guestName}</p>
                        <div className="flex items-center mt-2 space-x-4 text-sm text-gray-600">
                          <span className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {report.city}
                          </span>
                          <span className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                            {report.rating}
                          </span>
                          <span>Отправлен: {report.submittedDate}</span>
                          <span className={`font-medium ${getPriorityColor(report.priority)}`}>
                            {report.priority} приоритет
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(report.status)}>
                          {report.status}
                        </Badge>
                        <Link to={`/report/${report.id}`}>
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-1" />
                            Просмотр
                          </Button>
                        </Link>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => alert('Отчет одобрен: ' + report.hotelName)}>
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Одобрить
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Hotels */}
        <TabsContent value="hotels" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Отели в программе</CardTitle>
                  <CardDescription>Управление отелями-партнерами</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Select>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Статус" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все</SelectItem>
                      <SelectItem value="active">Активные</SelectItem>
                      <SelectItem value="needs-check">Требуют проверки</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input placeholder="Поиск отелей..." className="w-64" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {hotels.map((hotel) => (
                  <div key={hotel.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <h3 className="font-semibold text-lg">{hotel.name}</h3>
                          <Badge variant="outline">{hotel.type}</Badge>
                          <Badge className={getStatusColor(hotel.status)}>
                            {hotel.status}
                          </Badge>
                        </div>
                        <div className="flex items-center mt-2 space-x-6 text-sm text-gray-600">
                          <span className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {hotel.city}
                          </span>
                          <span className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                            {hotel.rating}
                          </span>
                          <span>Отчетов: {hotel.totalReports}</span>
                          <span>Последняя проверка: {hotel.lastCheck}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Link to={`/hotel/${hotel.id}`}>
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-1" />
                            Детали
                          </Button>
                        </Link>
                        {hotel.needsCheck && (
                          <Button size="sm" className="bg-orange-600 hover:bg-orange-700" onClick={() => alert('Назначена проверка для: ' + hotel.name)}>
                            Назначить проверку
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;