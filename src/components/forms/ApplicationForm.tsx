import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { User, MapPin, Plane, Star, Camera, FileText } from "lucide-react";

const ApplicationForm = () => {
  const [formData, setFormData] = useState({
    personalInfo: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      birthDate: "",
      city: "",
      country: ""
    },
    travelExperience: {
      tripsPerYear: "",
      preferredRegions: [],
      budgetRange: "",
      travelStyle: "",
      languages: []
    },
    expertise: {
      hotelTypes: [],
      specializations: [],
      socialMedia: {
        instagram: "",
        facebook: "",
        telegram: ""
      }
    },
    motivation: "",
    availability: "",
    agreement: false
  });

  const travelRegions = [
    "Россия", "Европа", "Азия", "Америка", "Африка", "Океания"
  ];

  const hotelTypes = [
    "Бизнес-отели", "Курортные отели", "Бутик-отели", 
    "Хостелы", "Апартаменты", "Загородные отели"
  ];

  const specializations = [
    "Семейный отдых", "Деловые поездки", "Романтические поездки",
    "Экстремальный туризм", "Гастрономический туризм", "Wellness & SPA"
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <User className="mr-3 w-6 h-6 text-blue-600" />
            Заявка на участие в программе "Секретный гость"
          </CardTitle>
          <CardDescription>
            Заполните все поля для рассмотрения вашей кандидатуры
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Личная информация */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="mr-2 w-5 h-5" />
            Личная информация
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">Имя *</Label>
              <Input id="firstName" placeholder="Введите ваше имя" />
            </div>
            <div>
              <Label htmlFor="lastName">Фамилия *</Label>
              <Input id="lastName" placeholder="Введите вашу фамилию" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input id="email" type="email" placeholder="your@email.com" />
            </div>
            <div>
              <Label htmlFor="phone">Телефон *</Label>
              <Input id="phone" placeholder="+7 (999) 123-45-67" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="birthDate">Дата рождения *</Label>
              <Input id="birthDate" type="date" />
            </div>
            <div>
              <Label htmlFor="city">Город *</Label>
              <Input id="city" placeholder="Москва" />
            </div>
            <div>
              <Label htmlFor="country">Страна *</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите страну" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ru">Россия</SelectItem>
                  <SelectItem value="by">Беларусь</SelectItem>
                  <SelectItem value="kz">Казахстан</SelectItem>
                  <SelectItem value="other">Другая</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Опыт путешествий */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Plane className="mr-2 w-5 h-5" />
            Опыт путешествий
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label>Количество поездок в год *</Label>
            <RadioGroup className="mt-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="5-10" id="trips1" />
                <Label htmlFor="trips1">5-10 поездок</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="10-20" id="trips2" />
                <Label htmlFor="trips2">10-20 поездок</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="20+" id="trips3" />
                <Label htmlFor="trips3">Более 20 поездок</Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label>Предпочитаемые регионы для путешествий *</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
              {travelRegions.map((region) => (
                <div key={region} className="flex items-center space-x-2">
                  <Checkbox id={region} />
                  <Label htmlFor={region} className="text-sm">{region}</Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="budget">Обычный бюджет на проживание за ночь *</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Выберите диапазон" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="budget">До 3000 ₽</SelectItem>
                <SelectItem value="mid">3000-8000 ₽</SelectItem>
                <SelectItem value="premium">8000-15000 ₽</SelectItem>
                <SelectItem value="luxury">Свыше 15000 ₽</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="languages">Знание языков</Label>
            <Input id="languages" placeholder="Русский (родной), Английский (B2), Французский (A2)" />
          </div>
        </CardContent>
      </Card>

      {/* Экспертиза */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Star className="mr-2 w-5 h-5" />
            Экспертиза и специализация
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label>Типы отелей, в которых вы останавливались *</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
              {hotelTypes.map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox id={type} />
                  <Label htmlFor={type} className="text-sm">{type}</Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label>Ваши специализации в путешествиях</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
              {specializations.map((spec) => (
                <div key={spec} className="flex items-center space-x-2">
                  <Checkbox id={spec} />
                  <Label htmlFor={spec} className="text-sm">{spec}</Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label>Социальные сети (необязательно)</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
              <Input placeholder="Instagram @username" />
              <Input placeholder="Facebook profile" />
              <Input placeholder="Telegram @username" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Мотивация */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="mr-2 w-5 h-5" />
            Дополнительная информация
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="motivation">Почему вы хотите стать секретным гостем? *</Label>
            <Textarea 
              id="motivation" 
              placeholder="Расскажите о своей мотивации, опыте и том, что вы можете привнести в программу..."
              className="min-h-[120px]"
            />
          </div>
          
          <div>
            <Label htmlFor="availability">Ваша доступность для поездок</Label>
            <Textarea 
              id="availability" 
              placeholder="Укажите, как часто вы готовы участвовать в программе, предпочитаемые даты и регионы..."
              className="min-h-[80px]"
            />
          </div>
        </CardContent>
      </Card>

      {/* Согласие */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start space-x-2">
            <Checkbox id="agreement" />
            <Label htmlFor="agreement" className="text-sm leading-relaxed">
              Я согласен(а) с <a href="#" className="text-blue-600 hover:underline">условиями программы</a>, 
              <a href="#" className="text-blue-600 hover:underline ml-1">политикой конфиденциальности</a> и 
              обязуюсь предоставлять честные и объективные отчеты о проживании в отелях.
            </Label>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center space-x-4">
        <Button variant="outline" size="lg" onClick={() => alert('Черновик сохранен')}>
          Сохранить черновик
        </Button>
        <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" onClick={() => alert('Заявка подана! Мы рассмотрим её в течение 3-5 дней.')}>
          Подать заявку
        </Button>
      </div>
    </div>
  );
};

export default ApplicationForm;