import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Upload, Star, Camera, FileText, Send, MapPin, Calendar } from "lucide-react";

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  
  const activeAssignments = [
    {
      id: 1,
      hotel: "Отель Балчуг Кемпински",
      city: "Москва",
      checkIn: "2024-04-10",
      checkOut: "2024-04-12",
      status: "active",
      deadline: "2024-04-15"
    },
    {
      id: 2,
      hotel: "Курорт Роза Хутор",
      city: "Сочи",
      checkIn: "2024-04-20",
      checkOut: "2024-04-22",
      status: "upcoming",
      deadline: "2024-04-25"
    }
  ];

  const ReportForm = ({ assignment }: { assignment: any }) => {
    const [ratings, setRatings] = useState({
      cleanliness: 0,
      service: 0,
      amenities: 0,
      location: 0,
      valueForMoney: 0
    });

    const [overallRating, setOverallRating] = useState(0);

    const StarRating = ({ rating, onRating, label }: { rating: number, onRating: (rating: number) => void, label: string }) => (
      <div className="space-y-2">
        <Label className="text-sm font-medium">{label}</Label>
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => onRating(star)}
              className="focus:outline-none"
            >
              <Star
                className={`w-6 h-6 ${star <= rating ? 'text-yellow-500 fill-current' : 'text-gray-300'} hover:text-yellow-400 transition-colors`}
              />
            </button>
          ))}
        </div>
      </div>
    );

    return (
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            Отчет о пребывании
          </CardTitle>
          <CardDescription>
            {assignment.hotel}, {assignment.city} • {assignment.checkIn} - {assignment.checkOut}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Overall Rating */}
          <div>
            <Label className="text-base font-semibold mb-3 block">Общая оценка отеля</Label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setOverallRating(star)}
                  className="focus:outline-none"
                >
                  <Star
                    className={`w-8 h-8 ${star <= overallRating ? 'text-yellow-500 fill-current' : 'text-gray-300'} hover:text-yellow-400 transition-colors`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Detailed Ratings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <StarRating 
              rating={ratings.cleanliness} 
              onRating={(rating) => setRatings({...ratings, cleanliness: rating})}
              label="Чистота" 
            />
            <StarRating 
              rating={ratings.service} 
              onRating={(rating) => setRatings({...ratings, service: rating})}
              label="Сервис" 
            />
            <StarRating 
              rating={ratings.amenities} 
              onRating={(rating) => setRatings({...ratings, amenities: rating})}
              label="Удобства" 
            />
            <StarRating 
              rating={ratings.location} 
              onRating={(rating) => setRatings({...ratings, location: rating})}
              label="Расположение" 
            />
          </div>

          {/* Detailed Review */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="positive">Положительные стороны</Label>
              <Textarea 
                id="positive"
                placeholder="Опишите, что понравилось больше всего..."
                className="mt-2"
              />
            </div>
            
            <div>
              <Label htmlFor="negative">Недостатки и области для улучшения</Label>
              <Textarea 
                id="negative"
                placeholder="Что можно улучшить в отеле..."
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="recommendations">Рекомендации для отеля</Label>
              <Textarea 
                id="recommendations"
                placeholder="Ваши предложения по улучшению сервиса..."
                className="mt-2"
              />
            </div>
          </div>

          {/* Photo Upload */}
          <div>
            <Label className="text-base font-semibold mb-3 block">Фотографии</Label>
            <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
              <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                Нажмите для загрузки фотографий или перетащите файлы сюда
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                PNG, JPG до 10MB. Максимум 10 файлов.
              </p>
            </div>
          </div>

          {/* Room Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="roomNumber">Номер комнаты</Label>
              <Input id="roomNumber" placeholder="Например: 512" className="mt-2" />
            </div>
            <div>
              <Label htmlFor="roomType">Тип номера</Label>
              <Select>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Выберите тип номера" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Стандартный</SelectItem>
                  <SelectItem value="deluxe">Делюкс</SelectItem>
                  <SelectItem value="suite">Люкс</SelectItem>
                  <SelectItem value="presidential">Президентский</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end space-x-4 pt-6 border-t">
            <Button variant="outline">Сохранить черновик</Button>
            <Button className="bg-gradient-ocean">
              <Send className="w-4 h-4 mr-2" />
              Отправить отчет
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Отчеты о пребывании</h1>
          <p className="text-muted-foreground">Создайте подробный отчет о вашем пребывании в отеле</p>
        </div>

        {/* Active Assignments */}
        <Card className="mb-8 shadow-card">
          <CardHeader>
            <CardTitle>Активные задания</CardTitle>
            <CardDescription>Выберите отель для создания отчета</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeAssignments.map((assignment) => (
                <div
                  key={assignment.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedReport === assignment.id.toString()
                      ? 'border-primary bg-primary/5'
                      : 'hover:bg-muted/50'
                  }`}
                  onClick={() => setSelectedReport(assignment.id.toString())}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{assignment.hotel}</h3>
                      <p className="text-sm text-muted-foreground flex items-center mt-1">
                        <MapPin className="w-3 h-3 mr-1" />
                        {assignment.city}
                      </p>
                      <p className="text-sm text-muted-foreground flex items-center mt-1">
                        <Calendar className="w-3 h-3 mr-1" />
                        {assignment.checkIn} - {assignment.checkOut}
                      </p>
                    </div>
                    <div className="text-right">
                      {assignment.status === 'active' ? (
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                          Активно
                        </Badge>
                      ) : (
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                          Предстоит
                        </Badge>
                      )}
                      <p className="text-xs text-muted-foreground mt-1">
                        До {new Date(assignment.deadline).toLocaleDateString('ru-RU')}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Report Form */}
        {selectedReport && (
          <ReportForm 
            assignment={activeAssignments.find(a => a.id.toString() === selectedReport)} 
          />
        )}

        {!selectedReport && (
          <Card className="shadow-card">
            <CardContent className="text-center py-12">
              <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Выберите задание выше для создания отчета</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Reports;