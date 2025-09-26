import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, MapPin, Star, Trophy, CheckCircle, Clock, Plus } from "lucide-react";

const Dashboard = () => {
  const user = {
    name: "Анна Петрова",
    email: "anna.petrova@example.com",
    status: "Активный секретный гость",
    rating: 4.8,
    completedMissions: 12,
    totalRewards: "₽47,500"
  };

  const recentMissions = [
    {
      id: 1,
      hotel: "Отель Метрополь",
      city: "Москва",
      date: "15-17 марта 2024",
      status: "completed",
      reward: "₽8,500",
      rating: 4.2
    },
    {
      id: 2,
      hotel: "Гранд Отель Европа",
      city: "Санкт-Петербург", 
      date: "22-24 февраля 2024",
      status: "completed",
      reward: "₽12,000",
      rating: 4.7
    },
    {
      id: 3,
      hotel: "Курорт Роза Хутор",
      city: "Сочи",
      date: "10-12 апреля 2024",
      status: "upcoming",
      reward: "₽15,000",
      rating: null
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100"><CheckCircle className="w-3 h-3 mr-1" />Выполнено</Badge>;
      case "upcoming":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100"><Clock className="w-3 h-3 mr-1" />Предстоит</Badge>;
      default:
        return <Badge variant="secondary">Неизвестно</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src="/placeholder-avatar.jpg" />
                <AvatarFallback className="text-lg bg-gradient-ocean text-white">АП</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold text-foreground">{user.name}</h1>
                <p className="text-muted-foreground">{user.email}</p>
                <Badge variant="secondary" className="mt-1">
                  <Trophy className="w-3 h-3 mr-1" />
                  {user.status}
                </Badge>
              </div>
            </div>
            <Button className="bg-gradient-ocean">
              <Plus className="w-4 h-4 mr-2" />
              Новая миссия
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Рейтинг</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-500 fill-current" />
                <span className="text-2xl font-bold">{user.rating}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Выполнено миссий</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{user.completedMissions}</div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Общая награда</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">{user.totalRewards}</div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Уровень</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Trophy className="w-5 h-5 text-primary" />
                <span className="text-2xl font-bold">Gold</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Missions */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Последние миссии</CardTitle>
            <CardDescription>История ваших проверок отелей</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentMissions.map((mission) => (
                <div key={mission.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-ocean rounded-lg flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{mission.hotel}</h3>
                      <p className="text-sm text-muted-foreground flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {mission.city}
                      </p>
                      <p className="text-sm text-muted-foreground flex items-center mt-1">
                        <Calendar className="w-3 h-3 mr-1" />
                        {mission.date}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    {mission.rating && (
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{mission.rating}</span>
                      </div>
                    )}
                    <div className="text-right">
                      <div className="font-semibold text-accent">{mission.reward}</div>
                      {getStatusBadge(mission.status)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;