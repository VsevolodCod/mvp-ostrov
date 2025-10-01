import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User, Star, MapPin, Calendar, Award, TrendingUp,
  Clock, CheckCircle, AlertCircle, Camera, FileText,
  Trophy, Target, Gift, Users, Crown, Medal, Sparkles
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAssignments } from "@/hooks/useAssignments.js";
import { pointsSystem } from "@/lib/pointsSystem.js";

const GuestDashboard = () => {
  const { takenAssignments, getUserAssignments, getUserStats, completeAssignment, cancelAssignment } = useAssignments();
  const assignments = getUserAssignments();
  const navigate = useNavigate();
  const stats = getUserStats();
  const userLevel = pointsSystem.getUserLevel();
  const leaderboard = pointsSystem.getLeaderboard();
  const userPosition = pointsSystem.getUserPosition();
  const achievements = pointsSystem.getUserAchievements();
  const pointsHistory = pointsSystem.getPointsHistory();

  const createGameReport = () => {
    const reportId = `report_${Date.now()}`;
    navigate(`/game-report/${reportId}`);
  };

  const guestProfile = {
    name: pointsSystem.getUserName(),
    level: userLevel.name,
    rating: 4.8,
    totalReports: stats.completed,
    completedAssignments: stats.completed,
    activeAssignments: stats.active,
    points: stats.points,
    nextLevelPoints: userLevel.nextLevel,
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
    }
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
        </div>
      </div>

      {/* Profile Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Trophy className="h-8 w-8 text-yellow-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Уровень</p>
                <p className="text-2xl font-bold text-gray-900">{guestProfile.level}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Star className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Очки</p>
                <p className="text-2xl font-bold text-gray-900">{guestProfile.points}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Завершено</p>
                <p className="text-2xl font-bold text-gray-900">{guestProfile.completedAssignments}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-orange-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Активных</p>
                <p className="text-2xl font-bold text-gray-900">{guestProfile.activeAssignments}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Level Progress */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Прогресс до следующего уровня</span>
              <span>{guestProfile.points}/{guestProfile.nextLevelPoints || 'MAX'}</span>
            </div>
            <Progress 
              value={guestProfile.nextLevelPoints ? (guestProfile.points / guestProfile.nextLevelPoints) * 100 : 100} 
              className="h-3" 
            />
          </div>
        </CardContent>
      </Card>    
  {/* Main Tabs */}
      <Tabs defaultValue="assignments" className="space-y-4">
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
                    <div key={assignment.id} className="border rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{assignment.hotel_name}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {assignment.city}
                            </div>
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {assignment.check_in_date} - {assignment.check_out_date}
                            </div>
                            <Badge variant={assignment.status === 'Активное' ? 'default' : 'secondary'}>
                              {assignment.status}
                            </Badge>
                          </div>
                          <p className="text-gray-700 mt-2">{assignment.description}</p>
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
                            <Link to={`/game-report/${assignment.id}`}>
                              <Button size="sm" className="bg-gradient-to-r from-purple-600 to-blue-600">
                                <Trophy className="mr-2 w-4 h-4" />
                                Игровой отчет
                              </Button>
                            </Link>
                            <Link to={`/interactive-report/${assignment.id}`}>
                              <Button size="sm" variant="outline">
                                <FileText className="mr-2 w-4 h-4" />
                                Обычный отчет
                              </Button>
                            </Link>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                const result = completeAssignment(assignment.id);
                                if (result && result.success) {
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
              <CardDescription>Ваши завершенные отчеты и их оценки</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentReports.map((report) => (
                  <div key={report.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{report.hotel}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {report.city}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {report.date}
                          </div>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 mr-1 text-yellow-500" />
                            {report.rating}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="default">{report.status}</Badge>
                        <div className="text-sm text-green-600 mt-1">+{report.points} очков</div>
                      </div>
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
                <div className="bg-gradient-to-r from-orange-100 via-yellow-100 to-amber-100 p-6 rounded-xl border-2 border-orange-200 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center">
                        <Trophy className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-orange-900">Текущие очки</h3>
                        <p className="text-orange-700">Общий баланс • Уровень: {guestProfile.level}</p>
                        <div className="flex items-center mt-1">
                          <Star className="w-4 h-4 text-yellow-500 mr-1" />
                          <span className="text-sm text-orange-600">
                            {guestProfile.nextLevelPoints ? 
                              `До следующего уровня: ${guestProfile.nextLevelPoints - guestProfile.points} очков` :
                              "Максимальный уровень достигнут!"
                            }
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-5xl font-bold text-orange-600 mb-2">{guestProfile.points.toLocaleString()}</div>
                      <div className="text-lg text-orange-600 font-medium">очков</div>
                      <div className="text-sm text-orange-500">
                        🔥 {Math.floor(guestProfile.points / 100)} уровней пройдено
                      </div>
                    </div>
                  </div>
                </div>

                {/* Points History */}
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">История начисления очков:</h4>
                  {pointsHistory.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <Gift className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                      <p>Пока нет истории очков</p>
                      <p className="text-sm">Выполните задания, чтобы заработать очки!</p>
                    </div>
                  ) : (
                    pointsHistory.slice(0, 10).map((entry, index) => (
                      <div key={entry.id} className="border rounded-xl p-4 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all duration-300 hover:shadow-md">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                              <Gift className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <h5 className="font-semibold text-gray-900">{entry.reason}</h5>
                              <p className="text-sm text-gray-600 flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                {new Date(entry.date).toLocaleDateString('ru-RU', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold text-green-600 flex items-center">
                              +{entry.points}
                              {entry.points >= 200 && <Sparkles className="w-4 h-4 ml-1 text-yellow-500" />}
                            </div>
                            <div className="text-xs text-gray-500">Всего: {entry.total.toLocaleString()}</div>
                            {index === 0 && (
                              <Badge className="bg-green-100 text-green-800 text-xs mt-1">Последнее</Badge>
                            )}
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
                      <span>Взятие задания:</span>
                      <span className="font-medium">+50 очков</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Заполнение чекпоинта:</span>
                      <span className="font-medium">+50-100 очков</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Детализация блока отчета:</span>
                      <span className="font-medium">+25-75 очков</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Завершение отчета:</span>
                      <span className="font-medium">+200 очков</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Бонус за высокую оценку (4+ звезды):</span>
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
              <CardTitle className="flex items-center">
                <Trophy className="mr-2 w-5 h-5 text-yellow-500" />
                Таблица лидеров
              </CardTitle>
              <CardDescription>Рейтинг лучших секретных гостей по очкам</CardDescription>
            </CardHeader>
            <CardContent>
              {/* User Position */}
              {userPosition && (
                <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 p-6 rounded-xl border-2 border-blue-200 mb-6 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <User className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-blue-900">Ваша позиция в рейтинге</h3>
                        <p className="text-blue-700 text-lg">{guestProfile.name}</p>
                        <p className="text-blue-600 text-sm">{guestProfile.level}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-4xl font-bold text-blue-600 mb-1">#{userPosition}</div>
                      <div className="text-lg font-semibold text-blue-600">{guestProfile.points} очков</div>
                      <div className="text-sm text-blue-500">
                        {userPosition <= 3 ? "🏆 Топ-3!" : userPosition <= 10 ? "🌟 Топ-10!" : "💪 Продолжайте!"}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Leaderboard List */}
              <div className="space-y-2">
                {leaderboard.slice(0, 10).map((entry, index) => (
                  <div 
                    key={entry.name} 
                    className={`flex items-center justify-between p-3 rounded-lg border ${
                      entry.name === guestProfile.name ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm relative ${
                        index === 0 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white shadow-lg' :
                        index === 1 ? 'bg-gradient-to-r from-gray-300 to-gray-500 text-white shadow-md' :
                        index === 2 ? 'bg-gradient-to-r from-orange-400 to-orange-600 text-white shadow-md' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {index === 0 ? (
                          <Crown className="w-5 h-5" />
                        ) : index === 1 ? (
                          <Medal className="w-5 h-5" />
                        ) : index === 2 ? (
                          <Award className="w-5 h-5" />
                        ) : (
                          <span>{index + 1}</span>
                        )}
                        {index < 3 && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                            <span className="text-xs font-bold text-gray-800">{index + 1}</span>
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="font-medium">{entry.name}</div>
                        <div className="text-sm text-gray-600">{entry.level}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{entry.points}</div>
                      <div className="text-xs text-gray-500">очков</div>
                    </div>
                  </div>
                ))}
              </div>

              {leaderboard.length > 10 && (
                <div className="text-center mt-4">
                  <Button variant="outline" size="sm">
                    Показать больше
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent> 
       {/* Achievements */}
        <TabsContent value="achievements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="mr-2 w-5 h-5 text-purple-500" />
                Достижения
              </CardTitle>
              <CardDescription>Ваши награды и прогресс в программе</CardDescription>
            </CardHeader>
            <CardContent>
              {achievements.length === 0 ? (
                <div className="text-center py-8">
                  <Award className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600">Пока нет достижений</p>
                  <p className="text-sm text-gray-500">Выполняйте задания и зарабатывайте очки, чтобы получить первые награды!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className="border rounded-lg p-4 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                          <Trophy className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-purple-900">{achievement.name}</h3>
                          <p className="text-sm text-purple-700">{achievement.description}</p>
                          <p className="text-xs text-purple-600 mt-1">
                            Получено: {new Date(achievement.unlockedAt).toLocaleDateString('ru-RU')}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Progress to next achievements */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-3">Прогресс к следующим достижениям:</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Достичь уровня {userLevel.nextLevel ? 'следующего' : 'максимального'}</span>
                    <span className="text-sm font-medium">
                      {guestProfile.points}/{userLevel.nextLevel || 'MAX'}
                    </span>
                  </div>
                  {userLevel.nextLevel && (
                    <Progress 
                      value={(guestProfile.points / userLevel.nextLevel) * 100} 
                      className="h-2"
                    />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>       
 {/* Profile */}
        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Профиль пользователя</CardTitle>
              <CardDescription>Ваша информация и статистика</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Profile Info */}
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{guestProfile.name}</h2>
                    <p className="text-gray-600">{guestProfile.level}</p>
                    <div className="flex items-center mt-1">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="text-sm text-gray-600">Рейтинг: {guestProfile.rating}</span>
                    </div>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">{guestProfile.totalReports}</div>
                    <div className="text-sm text-gray-600">Всего отчетов</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">{guestProfile.completedAssignments}</div>
                    <div className="text-sm text-gray-600">Завершено заданий</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">{guestProfile.activeAssignments}</div>
                    <div className="text-sm text-gray-600">Активных заданий</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">{guestProfile.points}</div>
                    <div className="text-sm text-gray-600">Заработано очков</div>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Дополнительная информация</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Дата регистрации:</span>
                      <span className="font-medium">{guestProfile.joinDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Средний рейтинг:</span>
                      <span className="font-medium">{guestProfile.rating}</span>
                    </div>
                    {userPosition && (
                      <div className="flex justify-between">
                        <span>Позиция в рейтинге:</span>
                        <span className="font-medium">#{userPosition}</span>
                      </div>
                    )}
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