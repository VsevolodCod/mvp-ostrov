import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy, Medal, Award, Crown, Star, Users, Calendar } from "lucide-react";

interface LeaderboardUser {
  id: number;
  name: string;
  points: number;
  level: {
    name: string;
    color: string;
    icon: string;
  };
  completedAssignments: number;
  joinDate: string;
  avatar?: string;
}

interface LeaderboardProps {
  currentUser?: LeaderboardUser;
}

const Leaderboard = ({ currentUser }: LeaderboardProps) => {
  // Mock данные для топ-20 пользователей
  const leaderboardData: LeaderboardUser[] = [
    {
      id: 1,
      name: "Александр Волков",
      points: 15420,
      level: { name: "Божественный", color: "gold", icon: "🌟" },
      completedAssignments: 89,
      joinDate: "2022-03-15"
    },
    {
      id: 2,
      name: "Мария Соколова",
      points: 12850,
      level: { name: "Мифический", color: "indigo", icon: "✨" },
      completedAssignments: 76,
      joinDate: "2022-05-20"
    },
    {
      id: 3,
      name: "Дмитрий Орлов",
      points: 11200,
      level: { name: "Мифический", color: "indigo", icon: "✨" },
      completedAssignments: 68,
      joinDate: "2022-07-10"
    },
    {
      id: 4,
      name: "Елена Морозова",
      points: 9850,
      level: { name: "Легенда", color: "red", icon: "🔥" },
      completedAssignments: 59,
      joinDate: "2022-09-05"
    },
    {
      id: 5,
      name: "Игорь Лебедев",
      points: 9200,
      level: { name: "Легенда", color: "red", icon: "🔥" },
      completedAssignments: 55,
      joinDate: "2022-11-12"
    },
    {
      id: 6,
      name: "Ольга Козлова",
      points: 8750,
      level: { name: "Легенда", color: "red", icon: "🔥" },
      completedAssignments: 52,
      joinDate: "2023-01-08"
    },
    {
      id: 7,
      name: "Сергей Новиков",
      points: 8200,
      level: { name: "Мастер", color: "orange", icon: "👑" },
      completedAssignments: 49,
      joinDate: "2023-02-14"
    },
    {
      id: 8,
      name: "Татьяна Петрова",
      points: 7800,
      level: { name: "Мастер", color: "orange", icon: "👑" },
      completedAssignments: 47,
      joinDate: "2023-03-22"
    },
    {
      id: 9,
      name: "Андрей Смирнов",
      points: 7350,
      level: { name: "Мастер", color: "orange", icon: "👑" },
      completedAssignments: 44,
      joinDate: "2023-04-30"
    },
    {
      id: 10,
      name: "Наталья Кузнецова",
      points: 6900,
      level: { name: "Мастер", color: "orange", icon: "👑" },
      completedAssignments: 41,
      joinDate: "2023-06-15"
    },
    {
      id: 11,
      name: "Владимир Попов",
      points: 6450,
      level: { name: "Эксперт", color: "purple", icon: "🏆" },
      completedAssignments: 38,
      joinDate: "2023-07-20"
    },
    {
      id: 12,
      name: "Ирина Васильева",
      points: 6000,
      level: { name: "Эксперт", color: "purple", icon: "🏆" },
      completedAssignments: 36,
      joinDate: "2023-08-25"
    },
    {
      id: 13,
      name: "Михаил Соколов",
      points: 5550,
      level: { name: "Эксперт", color: "purple", icon: "🏆" },
      completedAssignments: 33,
      joinDate: "2023-09-10"
    },
    {
      id: 14,
      name: "Светлана Михайлова",
      points: 5100,
      level: { name: "Эксперт", color: "purple", icon: "🏆" },
      completedAssignments: 30,
      joinDate: "2023-10-05"
    },
    {
      id: 15,
      name: "Алексей Федоров",
      points: 4650,
      level: { name: "Критик", color: "green", icon: "⭐" },
      completedAssignments: 28,
      joinDate: "2023-11-12"
    },
    {
      id: 16,
      name: "Юлия Морозова",
      points: 4200,
      level: { name: "Критик", color: "green", icon: "⭐" },
      completedAssignments: 25,
      joinDate: "2023-12-01"
    },
    {
      id: 17,
      name: "Роман Волков",
      points: 3750,
      level: { name: "Критик", color: "green", icon: "⭐" },
      completedAssignments: 22,
      joinDate: "2023-12-15"
    },
    {
      id: 18,
      name: "Екатерина Лебедева",
      points: 3300,
      level: { name: "Критик", color: "green", icon: "⭐" },
      completedAssignments: 20,
      joinDate: "2024-01-10"
    },
    {
      id: 19,
      name: "Павел Козлов",
      points: 2850,
      level: { name: "Исследователь", color: "blue", icon: "🔍" },
      completedAssignments: 17,
      joinDate: "2024-01-25"
    },
    {
      id: 20,
      name: "Анна Петрова",
      points: currentUser?.points || 0,
      level: currentUser?.level || { name: "Новичок", color: "gray", icon: "🌱" },
      completedAssignments: currentUser?.completedAssignments || 0,
      joinDate: currentUser?.joinDate || "2024-02-01"
    }
  ];

  // Сортируем по очкам
  const sortedData = [...leaderboardData].sort((a, b) => b.points - a.points);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="text-lg font-bold text-gray-600">#{rank}</span>;
    }
  };

  const getLevelColor = (color: string) => {
    const colors = {
      gold: "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white",
      indigo: "bg-gradient-to-r from-indigo-500 to-indigo-700 text-white",
      red: "bg-gradient-to-r from-red-500 to-red-700 text-white",
      orange: "bg-gradient-to-r from-orange-500 to-orange-700 text-white",
      purple: "bg-gradient-to-r from-purple-500 to-purple-700 text-white",
      green: "bg-gradient-to-r from-green-500 to-green-700 text-white",
      blue: "bg-gradient-to-r from-blue-500 to-blue-700 text-white",
      gray: "bg-gradient-to-r from-gray-400 to-gray-600 text-white"
    };
    return colors[color as keyof typeof colors] || colors.gray;
  };

  const getTopThreeStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200 shadow-lg";
      case 2:
        return "bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200 shadow-md";
      case 3:
        return "bg-gradient-to-r from-amber-50 to-amber-100 border-amber-200 shadow-md";
      default:
        return "hover:bg-gray-50";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Trophy className="w-6 h-6 mr-2 text-yellow-500" />
          Таблица лидеров
        </CardTitle>
        <CardDescription>
          Топ-20 секретных гостей по количеству очков
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {sortedData.map((user, index) => {
            const rank = index + 1;
            const isCurrentUser = user.name === currentUser?.name;
            
            return (
              <div
                key={user.id}
                className={`flex items-center justify-between p-4 rounded-lg border transition-all ${
                  getTopThreeStyle(rank)
                } ${isCurrentUser ? 'ring-2 ring-blue-500 bg-blue-50' : ''}`}
              >
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-8">
                    {getRankIcon(rank)}
                  </div>
                  
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-semibold">{user.name}</h4>
                      {isCurrentUser && (
                        <Badge variant="outline" className="text-blue-600 border-blue-600">
                          Вы
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Badge className={getLevelColor(user.level.color)}>
                        <span className="mr-1">{user.level.icon}</span>
                        {user.level.name}
                      </Badge>
                      <span>•</span>
                      <span>{user.completedAssignments} заданий</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-xl font-bold text-gray-900">
                    {user.points.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">очков</div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Статистика */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              <span>Всего участников: {sortedData.length}</span>
            </div>
            <div className="flex items-center">
              <Star className="w-4 h-4 mr-1" />
              <span>Средний уровень: {Math.round(sortedData.reduce((sum, user) => {
                const levelNames = ["Новичок", "Исследователь", "Критик", "Эксперт", "Мастер", "Легенда", "Мифический", "Божественный"];
                return sum + levelNames.indexOf(user.level.name);
              }, 0) / sortedData.length)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Leaderboard;
