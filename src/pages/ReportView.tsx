import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, Star, MapPin, Calendar, User, 
  CheckCircle, XCircle, Clock, Camera, 
  FileText, Award, MessageSquare, Download
} from "lucide-react";

const ReportView = () => {
  const { id } = useParams();
  
  const reportData = {
    id: "RPT-2024-001",
    hotel: {
      name: "Гранд Отель Сочи",
      city: "Сочи",
      address: "ул. Курортный проспект, 75"
    },
    guest: {
      name: "Анна Петрова",
      level: "Эксперт",
      rating: 4.8
    },
    dates: {
      checkIn: "2024-03-15",
      checkOut: "2024-03-17",
      submitted: "2024-03-18"
    },
    status: "Принят",
    overallRating: 4.2,
    categories: [
      {
        name: "Размещение",
        items: [
          { name: "Чистота номера", rating: 5, comment: "Номер был идеально чист, уборка на высшем уровне" },
          { name: "Комфорт номера", rating: 4, comment: "Удобная кровать, но кондиционер работал шумно" },
          { name: "Удобства в номере", rating: 4, comment: "Все необходимое есть, но мини-бар не работал" },
          { name: "Соответствие фото", rating: 5, comment: "Номер полностью соответствует фотографиям на сайте" }
        ]
      },
      {
        name: "Сервис",
        items: [
          { name: "Обслуживание при заселении", rating: 5, comment: "Быстрое и дружелюбное обслуживание" },
          { name: "Дружелюбность персонала", rating: 4, comment: "Персонал вежливый, но не всегда доступен" },
          { name: "Скорость реагирования", rating: 3, comment: "На звонки отвечали не сразу" }
        ]
      },
      {
        name: "Питание",
        items: [
          { name: "Качество завтрака", rating: 4, comment: "Хороший выбор блюд, все свежее" },
          { name: "Разнообразие блюд", rating: 3, comment: "Могло бы быть больше вегетарианских опций" }
        ]
      },
      {
        name: "Удобства",
        items: [
          { name: "Качество Wi-Fi", rating: 5, comment: "Отличная скорость интернета" },
          { name: "SPA-услуги", rating: 4, comment: "Хороший массаж, но долгое ожидание записи" }
        ]
      }
    ],
    photos: [
      { category: "Номер", count: 5, description: "Общий вид, ванная, удобства" },
      { category: "Завтрак", count: 3, description: "Блюда, сервировка, зал" },
      { category: "SPA", count: 2, description: "Массажный кабинет, зона отдыха" },
      { category: "Проблемы", count: 1, description: "Неработающий мини-бар" }
    ],
    recommendations: {
      forHotel: "Рекомендую улучшить работу службы поддержки - увеличить количество персонала или улучшить систему связи. Также стоит проверить работу мини-баров в номерах и добавить больше вегетарианских опций в завтрак.",
      forGuests: "Отличный отель для отдыха, особенно если вы цените чистоту и комфорт. Рекомендую бронировать SPA-процедуры заранее. Номера соответствуют фотографиям, вид на море действительно красивый."
    },
    adminNotes: [
      {
        date: "2024-03-19",
        author: "Менеджер программы",
        note: "Отчет детальный и объективный. Рекомендации переданы отелю."
      }
    ],
    reward: {
      type: "Бесплатное проживание + 500 баллов",
      status: "Начислено",
      date: "2024-03-20"
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Принят": return "bg-green-100 text-green-800";
      case "На проверке": return "bg-yellow-100 text-yellow-800";
      case "Отклонен": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const StarRating = ({ rating, size = "w-4 h-4" }) => (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${size} ${
            star <= rating ? "text-yellow-500 fill-current" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/guest-dashboard">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Назад к отчетам
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Отчет #{reportData.id}</h1>
            <p className="text-gray-600">{reportData.hotel.name}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className={getStatusColor(reportData.status)}>
            {reportData.status}
          </Badge>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Скачать PDF
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Overview */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">{reportData.hotel.name}</CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    {reportData.hotel.address}, {reportData.hotel.city}
                  </CardDescription>
                </div>
                <div className="text-right">
                  <div className="flex items-center justify-end mb-1">
                    <StarRating rating={reportData.overallRating} size="w-5 h-5" />
                    <span className="ml-2 text-xl font-bold">{reportData.overallRating}</span>
                  </div>
                  <p className="text-sm text-gray-600">Общая оценка</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Даты пребывания</p>
                  <p className="font-medium">{reportData.dates.checkIn} - {reportData.dates.checkOut}</p>
                </div>
                <div>
                  <p className="text-gray-600">Отчет отправлен</p>
                  <p className="font-medium">{reportData.dates.submitted}</p>
                </div>
                <div>
                  <p className="text-gray-600">Автор отчета</p>
                  <p className="font-medium">{reportData.guest.name}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Ratings */}
          <Tabs defaultValue="ratings" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="ratings">Оценки</TabsTrigger>
              <TabsTrigger value="photos">Фотографии</TabsTrigger>
              <TabsTrigger value="recommendations">Рекомендации</TabsTrigger>
            </TabsList>

            <TabsContent value="ratings">
              <div className="space-y-6">
                {reportData.categories.map((category, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg">{category.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {category.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="border-b pb-4 last:border-b-0">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-medium">{item.name}</h4>
                              <div className="flex items-center">
                                <StarRating rating={item.rating} />
                                <span className="ml-2 font-medium">{item.rating}/5</span>
                              </div>
                            </div>
                            <p className="text-gray-700 text-sm">{item.comment}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="photos">
              <Card>
                <CardHeader>
                  <CardTitle>Фотографии к отчету</CardTitle>
                  <CardDescription>
                    Фотографии, подтверждающие оценки в отчете
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {reportData.photos.map((photoGroup, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium">{photoGroup.category}</h4>
                          <Badge variant="outline">{photoGroup.count} фото</Badge>
                        </div>
                        <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-2">
                          <Camera className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-sm text-gray-600">{photoGroup.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="recommendations">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MessageSquare className="mr-2 w-5 h-5" />
                      Рекомендации для отеля
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">{reportData.recommendations.forHotel}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <User className="mr-2 w-5 h-5" />
                      Рекомендации для гостей
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">{reportData.recommendations.forGuests}</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Guest Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 w-5 h-5" />
                Автор отчета
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <User className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold">{reportData.guest.name}</h3>
                <Badge className="mt-1">{reportData.guest.level}</Badge>
                <div className="flex items-center justify-center mt-2">
                  <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                  <span className="font-medium">{reportData.guest.rating}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reward Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="mr-2 w-5 h-5" />
                Вознаграждение
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Тип вознаграждения</p>
                  <p className="font-medium">{reportData.reward.type}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Статус</p>
                  <Badge className="bg-green-100 text-green-800">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    {reportData.reward.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Дата начисления</p>
                  <p className="font-medium">{reportData.reward.date}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Admin Notes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 w-5 h-5" />
                Заметки администратора
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {reportData.adminNotes.map((note, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-3">
                    <div className="flex items-center text-sm text-gray-600 mb-1">
                      <Clock className="w-3 h-3 mr-1" />
                      {note.date} • {note.author}
                    </div>
                    <p className="text-sm">{note.note}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardContent className="pt-6 space-y-3">
              <Button variant="outline" className="w-full" onClick={() => alert('Связь с автором: ' + reportData.guest.name)}>
                Связаться с автором
              </Button>
              <Button variant="outline" className="w-full" onClick={() => alert('Отчет отправлен в отель: ' + reportData.hotel.name)}>
                Отправить в отель
              </Button>
              <Button variant="outline" className="w-full" onClick={() => alert('Добавление заметки к отчету')}>
                Добавить заметку
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ReportView;