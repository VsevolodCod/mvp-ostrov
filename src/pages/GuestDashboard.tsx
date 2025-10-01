import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User, Star, MapPin, Calendar, Award, TrendingUp,
  Clock, CheckCircle, AlertCircle, Camera, FileText,
  Trophy, Target, Gift, Users
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAssignments } from "@/hooks/useAssignments.js";

const GuestDashboard = () => {
  const { takenAssignments, getUserAssignments } = useAssignments();
  const assignments = getUserAssignments();
  const navigate = useNavigate();
  const points = 1250; // Временное значение

  const createGameReport = () => {
    const reportId = `report_${Date.now()}`;
    navigate(`/game-report/${reportId}`);
  };
  const guestProfile = {
    name: "Анна Петрова",
    level: "Эксперт",
    rating: 4.8,
    totalReports: 12,
    completedAssignments: assignments.length,
    activeAssignments: assignments.length,
    points: points,
    nextLevelPoints: 3000,
    joinDate: "Январь 2023"
  };

  const recentReports = [
    {
      id: 1,
      hotel: "Отель Метрополь",
      city: "Москва",
      date: "2024-03-15",
      rating: 4.2,
      status: "Принят",
      points: 400
    },
    {
      id: 2,
      hotel: "Курорт Красная Поляна",
      city: "Сочи",
      date: "2024-03-08",
      rating: 4.6,
      status: "Принят",
      points: 500
    },
    {
      id: 3,
      hotel: "Отель Европа",
      city: "СПб",
      date: "2024-02-28",
      rating: 4.1,
      status: "На проверке",
      points: 0
    }
  ];

  const achievements = [
    { name: "Первый отчет", icon: FileText, earned: true },
    { name: "10 отчетов", icon: Trophy, earned: true },
    { name: "Эксперт года", icon: Award, earned: true },
    { name: "Критик", icon: Star, earned: false },
    { name: "Путешественник", icon: MapPin, earned: true },
    { name: "Фотограф", icon: Camera, earned: false }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Личный кабинет</h1>
          <p className="text-gray-600">Добро пожаловать, {guestProfile.name}!</p>
        </div>
        <div className="flex space-x-3">
          <Button onClick={createGameReport} className="bg-gradient-to-r from-purple-600 to-blue-600">
            <Trophy className="mr-2 w-4 h-4" />
            Игровой отчет
          </Button>
          <Link to="/create-report">
            <Button variant="outline">
              <FileText className="mr-2 w-4 h-4" />
              Обычный отчет
            </Button>
          </Link>
          <Link to="/hotel-selection">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
              <Target className="mr-2 w-4 h-4" />
              Найти задания
            </Button>
          </Link>
        </div>
      </div>

      {/* Profile Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Уровень</p>
                <div className="flex items-center space-x-2">
                  <p className="text-2xl font-bold text-blue-600">{guestProfile.level}</p>
                </div>
                <p className="text-xs text-gray-500 mt-1">Опытный секретный гость</p>
              </div>
              <Award className="w-8 h-8 text-blue-600" />
            </div>
            {guestProfile.nextLevelPoints && (
              <div className="mt-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>До следующего уровня</span>
                  <span>160 очков</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Рейтинг</p>
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-500 fill-current mr-1" />
                  <span className="text-2xl font-bold">{guestProfile.rating}</span>
                </div>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Отчеты</p>
                <p className="text-2xl font-bold">{guestProfile.totalReports}</p>
              </div>
              <FileText className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Баллы</p>
                <p className="text-2xl font-bold text-orange-600">{guestProfile.points}</p>
              </div>
              <Gift className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="assignments" className="space-y-6">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="assignments">Текущие задания</TabsTrigger>
          <TabsTrigger value="game-reports">Игровые отчеты</TabsTrigger>
          <TabsTrigger value="reports">История отчетов</TabsTrigger>
          <TabsTrigger value="points">История очков</TabsTrigger>
          <TabsTrigger value="leaderboard">Таблица лидеров</TabsTrigger>
          <TabsTrigger value="achievements">Достижения</TabsTrigger>
          <TabsTrigger value="profile">Профиль</TabsTrigger>
        </TabsList>

        {/* Current Assignments */}
        <TabsContent value="assignments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Активные задания</CardTitle>
              <CardDescription>Ваши текущие и предстоящие проверки отелей</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {assignments.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Target className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Нет активных заданий</h3>
                    <p className="text-gray-600 mb-4">Выберите задание из раздела "ЗАДАНИЯ" чтобы начать работу</p>
                    <Link to="/hotel-selection">
                      <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                        <Target className="mr-2 w-4 h-4" />
                        Найти задания
                      </Button>
                    </Link>
                  </div>
                ) : (
                  assignments.map((assignment) => (
                    <div key={assignment.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-lg">{assignment.hotel_name || assignment.title}</h3>
                          <p className="text-gray-600 flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {assignment.city}
                          </p>
                        </div>
                        <Badge variant={assignment.status === "Активное" ? "default" : "secondary"}>
                          {assignment.status}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Заезд - Выезд</p>
                          <p className="font-medium">{assignment.check_in_date} - {assignment.check_out_date}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Дедлайн отчета</p>
                          <p className="font-medium flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {assignment.deadline_date}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">Вознаграждение</p>
                          <p className="font-medium text-green-600">{assignment.reward}</p>
                        </div>
                      </div>

                      <div className="flex justify-end mt-4 space-x-2">
                        <Link to={`/hotel/${assignment.hotel_id || assignment.id}`}>
                          <Button variant="outline" size="sm">
                            Подробнее
                          </Button>
                        </Link>
                        {assignment.status === "Активное" && (
                          <>
                            <Link to={`/interactive-report/${assignment.id}`}>
                              <Button size="sm" className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                                <FileText className="mr-2 w-4 h-4" />
                                Интерактивный отчет
                              </Button>
                            </Link>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                const result = completeAssignment(assignment.id, {
                                  overallRating: 4.2, // Пример рейтинга
                                  completedAt: new Date().toISOString()
                                });
                                if (result.success) {
                                  alert(`Задание завершено! Получено ${result.pointsEarned} очков!`);
                                }
                              }}
                            >
                              Завершить задание
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Game Reports */}
        <TabsContent value="game-reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Trophy className="mr-2 w-5 h-5 text-purple-600" />
                Игровые отчеты
              </CardTitle>
              <CardDescription>Интерактивные отчеты с чекпоинтами и системой очков</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Trophy className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Создайте свой первый игровой отчет</h3>
                  <p className="text-gray-600 mb-4">
                    Игровые отчеты позволяют заполнять информацию поэтапно с получением очков за каждый чекпоинт
                  </p>
                  <Button 
                    onClick={createGameReport}
                    className="bg-gradient-to-r from-purple-600 to-blue-600"
                  >
                    <Trophy className="mr-2 w-4 h-4" />
                    Создать игровой отчет
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reports History */}
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>История отчетов</CardTitle>
              <CardDescription>Все ваши отчеты и их статусы</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentReports.map((report) => (
                  <div key={report.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold">{report.hotel}</h3>
                        <p className="text-gray-600 text-sm">{report.city} • {report.date}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                          <span>{report.rating}</span>
                        </div>
                        <Badge variant={report.status === "Принят" ? "default" : "secondary"}>
                          {report.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Баллы: <span className="font-medium text-orange-600">+{report.points}</span>
                      </span>
                      <Link to={`/report/${report.id}`}>
                        <Button variant="outline" size="sm">
                          Посмотреть отчет
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Points History */}
        <TabsContent value="points" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>История очков</CardTitle>
              <CardDescription>Ваши заработанные очки и достижения</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Current Points Summary */}
                <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-4 rounded-lg border">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-orange-900">Текущие очки</h3>
                      <p className="text-orange-700">Общий баланс</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-orange-600">{guestProfile.points}</div>
                      <div className="text-sm text-orange-600">очков</div>
                    </div>
                  </div>
                </div>

                {/* Points from completed assignments */}
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Очки за выполненные задания:</h4>
                  {assignments.filter(a => a.status === 'Завершено' && a.pointsEarned).length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <Gift className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                      <p>Пока нет выполненных заданий</p>
                      <p className="text-sm">Выполните задания, чтобы заработать очки!</p>
                    </div>
                  ) : (
                    assignments
                      .filter(a => a.status === 'Завершено' && a.pointsEarned)
                      .map((assignment) => (
                        <div key={assignment.id} className="border rounded-lg p-4 hover:bg-gray-50">
                          <div className="flex justify-between items-start">
                            <div>
                              <h5 className="font-medium">{assignment.hotel_name || assignment.title}</h5>
                              <p className="text-sm text-gray-600">
                                Завершено: {new Date(assignment.completedAt).toLocaleDateString('ru-RU')}
                              </p>
                              {assignment.reportData && (
                                <p className="text-sm text-gray-500">
                                  Рейтинг отчета: {assignment.reportData.overallRating}/5
                                </p>
                              )}
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-semibold text-green-600">
                                +{assignment.pointsEarned}
                              </div>
                              <div className="text-sm text-gray-500">очков</div>
                            </div>
                          </div>
                        </div>
                      ))
                  )}
                </div>

                {/* Points breakdown */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Как зарабатывать очки:</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Базовые очки за выполнение задания:</span>
                      <span className="font-medium">100 очков</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Бонус за высокий приоритет:</span>
                      <span className="font-medium">+50 очков</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Бонус за средний приоритет:</span>
                      <span className="font-medium">+25 очков</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Бонус за бесплатное проживание:</span>
                      <span className="font-medium">+30 очков</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Бонус за отличный отчет (4.5+):</span>
                      <span className="font-medium">+50 очков</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Бонус за хороший отчет (4.0+):</span>
                      <span className="font-medium">+25 очков</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Leaderboard */}
        <TabsContent value="leaderboard" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Таблица лидеров</CardTitle>
              <CardDescription>Рейтинг лучших секретных гостей</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Trophy className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Таблица лидеров будет доступна в следующих версиях</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Achievements */}
        <TabsContent value="achievements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Достижения</CardTitle>
              <CardDescription>Ваши награды и прогресс в программе</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className={`border rounded-lg p-4 text-center ${achievement.earned ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'
                      }`}
                  >
                    <achievement.icon
                      className={`w-8 h-8 mx-auto mb-2 ${achievement.earned ? 'text-blue-600' : 'text-gray-400'
                        }`}
                    />
                    <p className={`font-medium ${achievement.earned ? 'text-blue-900' : 'text-gray-500'
                      }`}>
                      {achievement.name}
                    </p>
                    {achievement.earned && (
                      <CheckCircle className="w-4 h-4 text-green-500 mx-auto mt-1" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Profile */}
        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Информация профиля</CardTitle>
              <CardDescription>Ваши данные и настройки</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{guestProfile.name}</h3>
                    <p className="text-gray-600">Участник с {guestProfile.joinDate}</p>
                    <Badge className="mt-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                      {guestProfile.level}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Статистика</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Всего отчетов:</span>
                        <span className="font-medium">{guestProfile.totalReports}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Выполнено заданий:</span>
                        <span className="font-medium">{guestProfile.completedAssignments}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Активных заданий:</span>
                        <span className="font-medium">{guestProfile.activeAssignments}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Заработано очков:</span>
                        <span className="font-medium text-orange-600">{points}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Средний рейтинг:</span>
                        <span className="font-medium">{guestProfile.rating}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Настройки</h4>
                    <div className="space-y-2">
                      <Link to="/profile-settings">
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          Редактировать профиль
                        </Button>
                      </Link>
                      <Link to="/profile-settings">
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          Настройки уведомлений
                        </Button>
                      </Link>
                      <Link to="/profile-settings">
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          Предпочтения заданий
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => {
                          addPoints(100);
                          alert('Добавлено 100 тестовых очков!');
                        }}
                      >
                        +100 тестовых очков
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GuestDashboard;