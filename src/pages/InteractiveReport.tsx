import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  ArrowLeft, Star, Camera, Upload, CheckCircle, 
  Clock, MapPin, Plane, Hotel, Utensils, Waves, 
  Dumbbell, Award, Trophy, Plus, Save
} from "lucide-react";

const InteractiveReport = () => {
  const { id } = useParams();
  
  const [reportData, setReportData] = useState({
    hotelName: "Гранд Отель Сочи",
    guestName: "Анна Петрова",
    dates: {
      checkIn: "10.10.2025",
      checkOut: "21.10.2025"
    },
    currentDay: 3,
    totalDays: 11,
    points: 67,
    completedAnswers: 14,
    uploadedPhotos: 9,
    checkpoints: {
      transfer: { completed: true, points: 10 },
      checkin: { completed: true, points: 15 },
      stay: { completed: false, points: 0 },
      checkout: { completed: false, points: 0 }
    },
    blocks: {
      room: {
        title: "Номер",
        icon: Hotel,
        completed: 8,
        total: 12,
        points: 25,
        entries: []
      },
      food: {
        title: "Еда и рестораны",
        icon: Utensils,
        completed: 4,
        total: 8,
        points: 20,
        entries: []
      },
      beach: {
        title: "Пляж/активности",
        icon: Waves,
        completed: 2,
        total: 6,
        points: 12,
        entries: []
      },
      activities: {
        title: "Доп. активности",
        icon: Dumbbell,
        completed: 0,
        total: 4,
        points: 0,
        entries: []
      }
    }
  });

  const [activeTab, setActiveTab] = useState("overview");
  const [selectedBlock, setSelectedBlock] = useState(null);

  const checkpoints = [
    {
      id: "transfer",
      title: "Заезд и трансфер",
      icon: Plane,
      description: "Как добрались до отеля",
      completed: reportData.checkpoints.transfer.completed
    },
    {
      id: "checkin", 
      title: "Регистрация и заселение",
      icon: Hotel,
      description: "Работа стойки регистрации, готовность номера",
      completed: reportData.checkpoints.checkin.completed
    },
    {
      id: "stay",
      title: "Пребывание в отеле", 
      icon: Star,
      description: "Ежедневные впечатления и оценки",
      completed: reportData.checkpoints.stay.completed
    },
    {
      id: "checkout",
      title: "Выселение и выезд",
      icon: ArrowLeft,
      description: "Процесс выселения и отъезда",
      completed: reportData.checkpoints.checkout.completed
    }
  ];

  const StarRating = ({ rating, onRating, size = "w-6 h-6" }) => (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${size} cursor-pointer transition-colors ${
            star <= rating 
              ? "text-yellow-500 fill-current" 
              : "text-gray-300 hover:text-yellow-400"
          }`}
          onClick={() => onRating && onRating(star)}
        />
      ))}
    </div>
  );

  const BlockCard = ({ blockKey, block }) => (
    <Card 
      className="cursor-pointer hover:shadow-lg transition-all duration-300 border-2 hover:border-blue-300"
      onClick={() => setSelectedBlock(blockKey)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <block.icon className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg">{block.title}</CardTitle>
              <CardDescription>
                {block.completed}/{block.total} заполнено
              </CardDescription>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-orange-600">+{block.points}</div>
            <div className="text-xs text-gray-500">баллов</div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <Progress value={(block.completed / block.total) * 100} className="mb-3" />
        <div className="flex justify-between text-sm text-gray-600">
          <span>Прогресс: {Math.round((block.completed / block.total) * 100)}%</span>
          <span>{block.total - block.completed} осталось</span>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/guest-dashboard">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              К отчетам
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Отчет по отелю</h1>
            <p className="text-gray-600">Добро пожаловать, {reportData.guestName}!</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Badge className="bg-blue-100 text-blue-800 text-lg px-4 py-2">
            <Clock className="w-4 h-4 mr-2" />
            Это ваш {reportData.currentDay}-й отчет за месяц!
          </Badge>
          <Button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
            Завершить отчет
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {reportData.dates.checkIn} по {reportData.dates.checkOut}
            </div>
            <div className="text-sm text-gray-600">Дата проживания:</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">{reportData.completedAnswers}</div>
            <div className="text-sm text-gray-600">Ответов на обязательные вопросы:</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">{reportData.uploadedPhotos}</div>
            <div className="text-sm text-gray-600">Сделано фото:</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-orange-600 mb-1">{reportData.points}</div>
            <div className="text-sm text-gray-600">Количество баллов за текущий отчет:</div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <div className="flex justify-between items-center">
          <TabsList className="grid w-fit grid-cols-2">
            <TabsTrigger value="overview">Вопросы</TabsTrigger>
            <TabsTrigger value="photos">Фотоотчет</TabsTrigger>
          </TabsList>
          <Button variant="outline" className="bg-gray-50">
            Заполненные ответы
          </Button>
        </div>

        {/* Questions Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Checkpoints Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Чекпоинты путешествия</CardTitle>
              <CardDescription>Отмечайте ключевые моменты вашего пребывания</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {checkpoints.map((checkpoint, index) => (
                  <div key={checkpoint.id} className="relative">
                    {index < checkpoints.length - 1 && (
                      <div className="hidden md:block absolute top-6 left-full w-full h-0.5 bg-gray-200 z-0">
                        <div 
                          className="h-full bg-green-500 transition-all duration-500"
                          style={{ width: checkpoint.completed ? '100%' : '0%' }}
                        />
                      </div>
                    )}
                    <div className={`relative z-10 p-4 rounded-lg border-2 transition-all ${
                      checkpoint.completed 
                        ? 'border-green-500 bg-green-50' 
                        : 'border-gray-200 bg-white hover:border-blue-300'
                    }`}>
                      <div className="flex items-center space-x-3 mb-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          checkpoint.completed ? 'bg-green-500' : 'bg-gray-300'
                        }`}>
                          {checkpoint.completed ? (
                            <CheckCircle className="w-5 h-5 text-white" />
                          ) : (
                            <checkpoint.icon className="w-4 h-4 text-white" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium text-sm">{checkpoint.title}</h3>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600">{checkpoint.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Report Blocks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(reportData.blocks).map(([key, block]) => (
              <BlockCard key={key} blockKey={key} block={block} />
            ))}
          </div>
        </TabsContent>

        {/* Photos Tab */}
        <TabsContent value="photos" className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Тут вопросы/загрузка фото</h2>
            <p className="text-gray-600 mb-8">Загружайте фотографии по категориям для более детального отчета</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.entries(reportData.blocks).map(([key, block]) => (
                <Card key={key} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <block.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold mb-2">{block.title}</h3>
                    <div className="text-2xl font-bold text-blue-600 mb-1">
                      {Math.floor(Math.random() * 5) + 1}
                    </div>
                    <p className="text-sm text-gray-600">фотографий</p>
                    <Button size="sm" className="mt-3 w-full">
                      <Camera className="w-4 h-4 mr-2" />
                      Добавить фото
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Block Detail Modal */}
      {selectedBlock && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {(() => {
                    const IconComponent = reportData.blocks[selectedBlock].icon;
                    return <IconComponent className="w-6 h-6 text-blue-600" />;
                  })()}
                  <CardTitle>{reportData.blocks[selectedBlock].title}</CardTitle>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setSelectedBlock(null)}
                >
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Прогресс заполнения</span>
                  <span className="text-sm text-gray-600">
                    {reportData.blocks[selectedBlock].completed}/{reportData.blocks[selectedBlock].total}
                  </span>
                </div>
                <Progress value={(reportData.blocks[selectedBlock].completed / reportData.blocks[selectedBlock].total) * 100} />
              </div>

              {/* Sample Questions */}
              <div className="space-y-4">
                <div>
                  <Label className="text-base font-medium">Общая оценка</Label>
                  <div className="mt-2">
                    <StarRating rating={4} onRating={() => {}} />
                  </div>
                </div>

                <div>
                  <Label htmlFor="comment">Подробный комментарий</Label>
                  <Textarea 
                    id="comment"
                    placeholder="Опишите ваши впечатления..."
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label>Загрузить фотографии</Label>
                  <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Нажмите для загрузки фото</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <Button variant="outline" onClick={() => setSelectedBlock(null)}>
                  Отмена
                </Button>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                  <Save className="w-4 h-4 mr-2" />
                  Сохранить
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default InteractiveReport;