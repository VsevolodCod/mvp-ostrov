import { useState, useEffect } from "react";
import { AdminStats, User, Application, Report, Hotel as HotelType, Assignment } from "@/types/admin";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/BadgeWrapper";
import { Button } from "@/components/ui/ButtonWrapper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Users, Hotel, FileText, TrendingUp, Star, 
  CheckCircle, AlertCircle, Clock, Eye, 
  Filter, Download, Search, MoreHorizontal,
  UserCheck, Building, MapPin, Calendar,
  Plus, Edit, Trash2, Target
} from "lucide-react";
import { Link } from "react-router-dom";
import CreateAssignmentForm from "@/components/forms/CreateAssignmentForm";
import CreateHotelForm from "@/components/forms/CreateHotelForm";
import { 
  getAllAssignments, 
  deleteAssignment, 
  getAllUsers, 
  getAllApplications, 
  getAllReports,
  approveApplication,
  rejectApplication,
  approveReport,
  rejectReport,
  createHotel,
  updateHotel,
  deleteHotel,
  getRealTimeStats,
  fetchHotels
} from "@/lib/api";
import { toast } from "@/hooks/use-toast";
import { LogOut } from "lucide-react";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [hotels, setHotels] = useState<HotelType[]>([]);
  const [stats, setStats] = useState<AdminStats>({} as AdminStats);
  const [isLoadingAssignments, setIsLoadingAssignments] = useState(false);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [isLoadingApplications, setIsLoadingApplications] = useState(false);
  const [isLoadingReports, setIsLoadingReports] = useState(false);
  const [isLoadingHotels, setIsLoadingHotels] = useState(false);

  // Загрузка заданий
  const loadAssignments = async () => {
    setIsLoadingAssignments(true);
    try {
      const assignmentsData = await getAllAssignments();
      setAssignments(assignmentsData);
    } catch (error) {
      console.error("Ошибка загрузки заданий:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить задания",
        variant: "destructive"
      });
    } finally {
      setIsLoadingAssignments(false);
    }
  };

  // Удаление задания
  const handleDeleteAssignment = async (id: number) => {
    if (window.confirm("Вы уверены, что хотите удалить это задание?")) {
      try {
        await deleteAssignment(id);
        setAssignments(prev => prev.filter(assignment => assignment.id !== id));
        toast({
          title: "Задание удалено",
          description: "Задание успешно удалено",
        });
      } catch (error) {
        toast({
          title: "Ошибка",
          description: "Не удалось удалить задание",
          variant: "destructive"
        });
      }
    }
  };

  // Функция выхода
  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('adminEmail');
    toast({
      title: "Выход выполнен",
      description: "Вы вышли из админ-панели",
    });
    window.location.href = '/';
  };

  // Загрузка пользователей
  const loadUsers = async () => {
    setIsLoadingUsers(true);
    try {
      const usersData = await getAllUsers();
      setUsers(usersData);
    } catch (error) {
      console.error("Ошибка загрузки пользователей:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить пользователей",
        variant: "destructive"
      });
    } finally {
      setIsLoadingUsers(false);
    }
  };

  // Загрузка заявок
  const loadApplications = async () => {
    setIsLoadingApplications(true);
    try {
      const applicationsData = await getAllApplications();
      setApplications(applicationsData);
    } catch (error) {
      console.error("Ошибка загрузки заявок:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить заявки",
        variant: "destructive"
      });
    } finally {
      setIsLoadingApplications(false);
    }
  };

  // Загрузка отчетов
  const loadReports = async () => {
    setIsLoadingReports(true);
    try {
      const reportsData = await getAllReports();
      setReports(reportsData);
    } catch (error) {
      console.error("Ошибка загрузки отчетов:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить отчеты",
        variant: "destructive"
      });
    } finally {
      setIsLoadingReports(false);
    }
  };

  // Загрузка отелей
  const loadHotels = async () => {
    setIsLoadingHotels(true);
    try {
      const hotelsData = await fetchHotels();
      setHotels(hotelsData);
    } catch (error) {
      console.error("Ошибка загрузки отелей:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить отели",
        variant: "destructive"
      });
    } finally {
      setIsLoadingHotels(false);
    }
  };

  // Загрузка статистики
  const loadStats = async () => {
    try {
      const statsData = await getRealTimeStats();
      setStats(statsData);
    } catch (error) {
      console.error("Ошибка загрузки статистики:", error);
    }
  };

  // Загрузка всех данных при монтировании компонента
  useEffect(() => {
    const loadAllData = async () => {
      await Promise.all([
        loadAssignments(),
        loadUsers(),
        loadApplications(),
        loadReports(),
        loadHotels(),
        loadStats()
      ]);
    };
    loadAllData();
  }, []);


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
      case "Высокий": return "bg-red-100 text-red-800";
      case "Средний": return "bg-yellow-100 text-yellow-800";
      case "Низкий": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
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
          <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
            <Download className="mr-2 w-4 h-4" />
            Экспорт данных
          </button>
          <CreateAssignmentForm onAssignmentCreated={loadAssignments} />
          <CreateHotelForm onHotelCreated={loadHotels} />
          <button onClick={handleLogout} className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 text-red-600 hover:text-red-700">
            <LogOut className="mr-2 w-4 h-4" />
            Выйти
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Всего гостей</p>
                <p className="text-2xl font-bold">{stats.totalGuests || 0}</p>
                <p className="text-xs text-green-600">+{stats.newUsersThisMonth || 0} за месяц</p>
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
                <p className="text-2xl font-bold">{stats.totalHotels || 0}</p>
                <p className="text-xs text-green-600">+{stats.newUsersThisMonth || 0} за месяц</p>
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
                <p className="text-2xl font-bold">{stats.activeAssignments || 0}</p>
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
                  <span className="text-2xl font-bold">{stats.averageRating || 0}</span>
                </div>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Обзор</TabsTrigger>
          <TabsTrigger value="applications">Заявки</TabsTrigger>
          <TabsTrigger value="guests">Гости</TabsTrigger>
          <TabsTrigger value="assignments">Задания</TabsTrigger>
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
                    <Badge className="bg-yellow-100 text-yellow-800">{stats.pendingApplications || 0}</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center">
                      <FileText className="w-5 h-5 text-blue-600 mr-2" />
                      <span className="text-sm">Отчеты на проверке</span>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">{stats.pendingReports || 0}</Badge>
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
                {isLoadingApplications ? (
                  <div className="flex justify-center py-8">
                    <div className="text-gray-500">Загрузка заявок...</div>
                  </div>
                ) : (
                  applications.filter(app => app.status === "На рассмотрении").map((application) => (
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
                          <div className="mt-2">
                            <p className="text-sm text-gray-700">{application.motivation}</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {application.specialties?.map((specialty, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {specialty}
                                </Badge>
                              ))}
                            </div>
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
                          <Button 
                            size="sm" 
                            className="bg-green-600 hover:bg-green-700" 
                            onClick={async () => {
                              try {
                                await approveApplication(application.id);
                                await loadApplications();
                                await loadUsers();
                                await loadStats();
                                toast({
                                  title: "Заявка одобрена",
                                  description: `${application.name} стал секретным гостем`,
                                });
                              } catch (error) {
                                toast({
                                  title: "Ошибка",
                                  description: "Не удалось одобрить заявку",
                                  variant: "destructive"
                                });
                              }
                            }}
                          >
                          <UserCheck className="w-4 h-4 mr-1" />
                          Одобрить
                        </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="text-red-600 hover:text-red-700"
                            onClick={async () => {
                              try {
                                await rejectApplication(application.id);
                                await loadApplications();
                                await loadStats();
                                toast({
                                  title: "Заявка отклонена",
                                  description: `Заявка от ${application.name} отклонена`,
                                });
                              } catch (error) {
                                toast({
                                  title: "Ошибка",
                                  description: "Не удалось отклонить заявку",
                                  variant: "destructive"
                                });
                              }
                            }}
                          >
                            Отклонить
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
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
                {isLoadingUsers ? (
                  <div className="flex justify-center py-8">
                    <div className="text-gray-500">Загрузка гостей...</div>
                  </div>
                ) : (
                  users.map((guest) => (
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
                          <div className="mt-2 text-sm text-gray-600">
                            <p>Город: {guest.city} • Опыт: {guest.experience}</p>
                            <p>Заработано: {guest.totalEarnings.toLocaleString()} ₽ • Последняя активность: {guest.lastActivity}</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {guest.specialties?.map((specialty, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {specialty}
                                </Badge>
                              ))}
                            </div>
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
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Assignments */}
        <TabsContent value="assignments" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Управление заданиями</CardTitle>
                  <CardDescription>Создание и управление заданиями для секретных гостей</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <CreateAssignmentForm onAssignmentCreated={loadAssignments} />
                  <Button variant="outline" onClick={loadAssignments} disabled={isLoadingAssignments}>
                    <Search className="w-4 h-4 mr-2" />
                    Обновить
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {isLoadingAssignments ? (
                <div className="flex justify-center py-8">
                  <div className="text-gray-500">Загрузка заданий...</div>
                </div>
              ) : (
                <div className="space-y-4">
                  {assignments.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <Target className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p>Задания не найдены</p>
                      <p className="text-sm">Создайте первое задание для секретного гостя</p>
                    </div>
                  ) : (
                    assignments.map((assignment) => (
                      <div key={assignment.id} className="border rounded-lg p-4 hover:bg-gray-50">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="font-semibold text-lg">{assignment.title}</h3>
                              <Badge className={getPriorityColor(assignment.priority)}>
                                {assignment.priority} приоритет
                              </Badge>
                              <Badge variant="outline">{assignment.hotel_type}</Badge>
                            </div>
                            <p className="text-gray-600 mb-2">{assignment.description}</p>
                            <div className="flex items-center space-x-6 text-sm text-gray-600 mb-2">
                              <span className="flex items-center">
                                <MapPin className="w-4 h-4 mr-1" />
                                {assignment.hotel_name}, {assignment.city}
                              </span>
                              <span className="flex items-center">
                                <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                                {assignment.hotel_rating}
                              </span>
                              <span className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                {assignment.check_in_date} - {assignment.check_out_date}
                              </span>
                            </div>
                            <div className="flex items-center space-x-4 text-sm">
                              <span className="text-green-600 font-medium">{assignment.reward}</span>
                              <span>Срок сдачи: {assignment.deadline_date}</span>
                              {assignment.room_type && <span>Тип номера: {assignment.room_type}</span>}
                            </div>
                            {assignment.special_requirements && assignment.special_requirements.length > 0 && (
                              <div className="mt-2">
                                <p className="text-sm font-medium text-gray-700 mb-1">Специальные требования:</p>
                                <ul className="text-sm text-gray-600 list-disc list-inside">
                                  {assignment.special_requirements.slice(0, 3).map((req, index) => (
                                    <li key={index}>{req}</li>
                                  ))}
                                  {assignment.special_requirements.length > 3 && (
                                    <li>...и еще {assignment.special_requirements.length - 3}</li>
                                  )}
                                </ul>
                              </div>
                            )}
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm" onClick={() => alert('Просмотр задания: ' + assignment.title)}>
                              <Eye className="w-4 h-4 mr-1" />
                              Просмотр
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => alert('Редактирование задания: ' + assignment.title)}>
                              <Edit className="w-4 h-4 mr-1" />
                              Редактировать
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleDeleteAssignment(assignment.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4 mr-1" />
                              Удалить
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
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
                {isLoadingReports ? (
                  <div className="flex justify-center py-8">
                    <div className="text-gray-500">Загрузка отчетов...</div>
                  </div>
                ) : (
                  reports.filter(report => report.status === "На проверке").map((report) => (
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
                          <div className="mt-2 text-sm text-gray-700">
                            <p><strong>Комментарий:</strong> {report.comments}</p>
                            {report.recommendations && (
                              <p><strong>Рекомендации:</strong> {report.recommendations}</p>
                            )}
                            {report.issues && report.issues.length > 0 && (
                              <p><strong>Проблемы:</strong> {report.issues.join(", ")}</p>
                            )}
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
                          <Button 
                            size="sm" 
                            className="bg-green-600 hover:bg-green-700" 
                            onClick={async () => {
                              try {
                                await approveReport(report.id);
                                await loadReports();
                                await loadStats();
                                toast({
                                  title: "Отчет одобрен",
                                  description: `Отчет по отелю "${report.hotelName}" одобрен`,
                                });
                              } catch (error) {
                                toast({
                                  title: "Ошибка",
                                  description: "Не удалось одобрить отчет",
                                  variant: "destructive"
                                });
                              }
                            }}
                          >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Одобрить
                        </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="text-red-600 hover:text-red-700"
                            onClick={async () => {
                              const reason = prompt("Причина отклонения:");
                              if (reason) {
                                try {
                                  await rejectReport(report.id, reason);
                                  await loadReports();
                                  await loadStats();
                                  toast({
                                    title: "Отчет отклонен",
                                    description: `Отчет по отелю "${report.hotelName}" отклонен`,
                                  });
                                } catch (error) {
                                  toast({
                                    title: "Ошибка",
                                    description: "Не удалось отклонить отчет",
                                    variant: "destructive"
                                  });
                                }
                              }
                            }}
                          >
                            Отклонить
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
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
                {isLoadingHotels ? (
                  <div className="flex justify-center py-8">
                    <div className="text-gray-500">Загрузка отелей...</div>
                  </div>
                ) : (
                  hotels.map((hotel) => (
                  <div key={hotel.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <h3 className="font-semibold text-lg">{hotel.name}</h3>
                          <Badge variant="outline">{hotel.type}</Badge>
                            <Badge className="bg-yellow-100 text-yellow-800">
                              {hotel.stars} звезд
                          </Badge>
                        </div>
                        <div className="flex items-center mt-2 space-x-6 text-sm text-gray-600">
                          <span className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {hotel.city}
                          </span>
                          <span className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                              {hotel.rating || "Новый"}
                          </span>
                            <span>Отчетов: {hotel.totalReports || 0}</span>
                            <span>Цена: {hotel.price_per_night?.toLocaleString()} ₽/ночь</span>
                          </div>
                          <div className="mt-2 text-sm text-gray-700">
                            <p>{hotel.description}</p>
                            <p className="mt-1"><strong>Адрес:</strong> {hotel.address}</p>
                            {hotel.contact_phone && <p><strong>Телефон:</strong> {hotel.contact_phone}</p>}
                            {hotel.contact_email && <p><strong>Email:</strong> {hotel.contact_email}</p>}
                            <div className="flex flex-wrap gap-1 mt-2">
                              {hotel.amenities?.slice(0, 5).map((amenity, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {amenity}
                                </Badge>
                              ))}
                              {hotel.amenities?.length > 5 && (
                                <Badge variant="outline" className="text-xs">
                                  +{hotel.amenities.length - 5} еще
                                </Badge>
                              )}
                            </div>
                          </div>
                      </div>
                      <div className="flex space-x-2">
                        <Link to={`/hotel/${hotel.id}`}>
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-1" />
                            Детали
                          </Button>
                        </Link>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => alert('Редактирование отеля: ' + hotel.name)}
                          >
                            <Edit className="w-4 h-4 mr-1" />
                            Редактировать
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={async () => {
                              if (window.confirm(`Удалить отель "${hotel.name}"?`)) {
                                try {
                                  await deleteHotel(hotel.id);
                                  await loadHotels();
                                  await loadStats();
                                  toast({
                                    title: "Отель удален",
                                    description: `Отель "${hotel.name}" удален из программы`,
                                  });
                                } catch (error) {
                                  toast({
                                    title: "Ошибка",
                                    description: "Не удалось удалить отель",
                                    variant: "destructive"
                                  });
                                }
                              }
                            }}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Удалить
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;