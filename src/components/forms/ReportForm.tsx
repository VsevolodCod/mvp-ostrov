import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Star, Camera, Upload, MapPin, Calendar, 
  Users, Utensils, Bed, Wifi, Car, Waves,
  CheckCircle, AlertCircle, FileText, Clock
} from "lucide-react";

const ReportForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [ratings, setRatings] = useState({});
  const [photos, setPhotos] = useState([]);

  const hotelInfo = {
    name: "Гранд Отель Сочи",
    city: "Сочи",
    checkIn: "2024-04-15",
    checkOut: "2024-04-17",
    roomType: "Стандартный номер",
    assignmentId: "SGH-2024-001"
  };

  const evaluationCriteria = [
    {
      category: "Размещение",
      icon: Bed,
      items: [
        { id: "room_cleanliness", name: "Чистота номера", required: true },
        { id: "room_comfort", name: "Комфорт номера", required: true },
        { id: "room_amenities", name: "Удобства в номере", required: true },
        { id: "room_photos_match", name: "Соответствие фото", required: true }
      ]
    },
    {
      category: "Сервис",
      icon: Users,
      items: [
        { id: "checkin_service", name: "Обслуживание при заселении", required: true },
        { id: "staff_friendliness", name: "Дружелюбность персонала", required: true },
        { id: "response_time", name: "Скорость реагирования", required: true },
        { id: "problem_solving", name: "Решение проблем", required: false }
      ]
    },
    {
      category: "Питание",
      icon: Utensils,
      items: [
        { id: "breakfast_quality", name: "Качество завтрака", required: true },
        { id: "food_variety", name: "Разнообразие блюд", required: true },
        { id: "restaurant_service", name: "Обслуживание в ресторане", required: false }
      ]
    },
    {
      category: "Удобства",
      icon: Wifi,
      items: [
        { id: "wifi_quality", name: "Качество Wi-Fi", required: true },
        { id: "parking", name: "Парковка", required: false },
        { id: "spa_facilities", name: "SPA-услуги", required: true },
        { id: "pool_area", name: "Бассейн", required: false }
      ]
    }
  ];

  const steps = [
    { id: 1, name: "Основная информация", icon: FileText },
    { id: 2, name: "Оценка критериев", icon: Star },
    { id: 3, name: "Фотографии", icon: Camera },
    { id: 4, name: "Итоговый отчет", icon: CheckCircle }
  ];

  const StarRating = ({ value, onChange, size = "w-6 h-6" }) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${size} cursor-pointer transition-colors ${
              star <= value 
                ? "text-yellow-500 fill-current" 
                : "text-gray-300 hover:text-yellow-400"
            }`}
            onClick={() => onChange(star)}
          />
        ))}
      </div>
    );
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Информация о пребывании</CardTitle>
          <CardDescription>Подтвердите детали вашего пребывания в отеле</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Отель</Label>
              <Input value={hotelInfo.name} disabled />
            </div>
            <div>
              <Label>Город</Label>
              <Input value={hotelInfo.city} disabled />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Дата заезда</Label>
              <Input type="date" defaultValue={hotelInfo.checkIn} />
            </div>
            <div>
              <Label>Дата выезда</Label>
              <Input type="date" defaultValue={hotelInfo.checkOut} />
            </div>
            <div>
              <Label>Тип номера</Label>
              <Input value={hotelInfo.roomType} readOnly />
            </div>
          </div>

          <div>
            <Label>Номер комнаты</Label>
            <Input placeholder="Например: 205" />
          </div>

          <div>
            <Label>Общее впечатление от пребывания</Label>
            <Textarea 
              placeholder="Опишите ваше общее впечатление от отеля..."
              className="min-h-[100px]"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      {evaluationCriteria.map((category) => (
        <Card key={category.category}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <category.icon className="mr-2 w-5 h-5" />
              {category.category}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {category.items.map((item) => (
              <div key={item.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <Label className="text-base font-medium">{item.name}</Label>
                    {item.required && (
                      <Badge variant="outline" className="ml-2 text-xs">Обязательно</Badge>
                    )}
                  </div>
                  <StarRating 
                    value={ratings[item.id] || 0}
                    onChange={(value) => setRatings({...ratings, [item.id]: value})}
                  />
                </div>
                <Textarea 
                  placeholder={`Комментарий по ${item.name.toLowerCase()}...`}
                  className="min-h-[60px]"
                />
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Camera className="mr-2 w-5 h-5" />
            Фотографии
          </CardTitle>
          <CardDescription>
            Загрузите фотографии, подтверждающие ваши оценки
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Photo Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <h3 className="font-medium mb-1">Номер</h3>
              <p className="text-sm text-gray-600 mb-3">Общий вид, ванная, удобства</p>
              <Button variant="outline" size="sm">
                Загрузить фото
              </Button>
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <h3 className="font-medium mb-1">Завтрак</h3>
              <p className="text-sm text-gray-600 mb-3">Блюда, сервировка, зал</p>
              <Button variant="outline" size="sm">
                Загрузить фото
              </Button>
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <h3 className="font-medium mb-1">Общественные зоны</h3>
              <p className="text-sm text-gray-600 mb-3">Лобби, коридоры, лифты</p>
              <Button variant="outline" size="sm">
                Загрузить фото
              </Button>
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <h3 className="font-medium mb-1">Проблемы</h3>
              <p className="text-sm text-gray-600 mb-3">Недостатки, если есть</p>
              <Button variant="outline" size="sm">
                Загрузить фото
              </Button>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Рекомендации по фотографиям:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Делайте фото в хорошем освещении</li>
              <li>• Показывайте детали, которые упоминаете в отчете</li>
              <li>• Не фотографируйте других гостей</li>
              <li>• Минимум 3-5 фото на каждую категорию</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CheckCircle className="mr-2 w-5 h-5" />
            Итоговый отчет
          </CardTitle>
          <CardDescription>
            Проверьте информацию перед отправкой
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label>Общая оценка отеля</Label>
            <div className="flex items-center space-x-4 mt-2">
              <StarRating 
                value={ratings.overall || 0}
                onChange={(value) => setRatings({...ratings, overall: value})}
                size="w-8 h-8"
              />
              <span className="text-lg font-medium">
                {ratings.overall ? `${ratings.overall}/5` : "Не оценено"}
              </span>
            </div>
          </div>

          <div>
            <Label>Рекомендации для отеля</Label>
            <Textarea 
              placeholder="Что отель может улучшить? Ваши рекомендации..."
              className="min-h-[100px]"
            />
          </div>

          <div>
            <Label>Рекомендации для гостей</Label>
            <Textarea 
              placeholder="Что стоит знать будущим гостям этого отеля?"
              className="min-h-[100px]"
            />
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox id="accuracy" />
            <Label htmlFor="accuracy" className="text-sm leading-relaxed">
              Подтверждаю, что вся информация в отчете является достоверной и основана 
              на моем личном опыте пребывания в отеле
            </Label>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-medium text-green-900 mb-2">Ваше вознаграждение:</h4>
            <p className="text-green-800">Бесплатное проживание + 500 баллов</p>
            <p className="text-sm text-green-700 mt-1">
              Баллы будут начислены после проверки отчета (3-5 рабочих дней)
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderStep3();
      case 4: return renderStep4();
      default: return renderStep1();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Отчет о пребывании</h1>
        <p className="text-gray-600">Задание: {hotelInfo.assignmentId}</p>
      </div>

      {/* Progress */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium">Прогресс заполнения</span>
            <span className="text-sm text-gray-600">{currentStep}/4</span>
          </div>
          <Progress value={(currentStep / 4) * 100} className="mb-4" />
          
          <div className="flex justify-between">
            {steps.map((step) => (
              <div 
                key={step.id} 
                className={`flex flex-col items-center ${
                  step.id <= currentStep ? 'text-blue-600' : 'text-gray-400'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                  step.id <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200'
                }`}>
                  <step.icon className="w-4 h-4" />
                </div>
                <span className="text-xs text-center">{step.name}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Current Step Content */}
      {renderCurrentStep()}

      {/* Navigation */}
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1}
        >
          Назад
        </Button>
        
        <div className="space-x-2">
          <Button variant="outline" onClick={() => alert('Черновик отчета сохранен')}>
            Сохранить черновик
          </Button>
          
          {currentStep < 4 ? (
            <Button 
              onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Далее
            </Button>
          ) : (
            <Button className="bg-green-600 hover:bg-green-700" onClick={() => alert('Отчет отправлен! Спасибо за вашу работу. Вознаграждение будет начислено в течение 3-5 дней.')}>
              <CheckCircle className="mr-2 w-4 h-4" />
              Отправить отчет
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportForm;