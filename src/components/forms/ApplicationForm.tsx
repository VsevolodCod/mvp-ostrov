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
import { User, MapPin, Plane, Star, Camera, FileText, CheckCircle, AlertCircle } from "lucide-react";
import { api } from "@/lib/api";
import { useNavigate } from "react-router-dom";

const ApplicationForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    birthDate: "",
    city: "",
    country: "",
    tripsPerYear: "",
    preferredRegions: [],
    budgetRange: "",
    travelStyle: "",
    languages: "",
    hotelTypes: [],
    specializations: [],
    socialMedia: {
      instagram: "",
      facebook: "",
      telegram: ""
    },
    motivation: "",
    availability: "",
    agreement: false
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCheckboxChange = (field, value, checked) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked 
        ? [...prev[field], value]
        : prev[field].filter(item => item !== value)
    }));
  };

  const handleSocialMediaChange = (platform, value) => {
    setFormData(prev => ({
      ...prev,
      socialMedia: {
        ...prev.socialMedia,
        [platform]: value
      }
    }));
  };

  const validateForm = () => {
    const required = ['firstName', 'lastName', 'email', 'phone', 'city', 'country', 'tripsPerYear', 'budgetRange', 'motivation'];
    
    for (const field of required) {
      if (!formData[field] || formData[field].trim() === '') {
        return false;
      }
    }
    
    if (formData.preferredRegions.length === 0) return false;
    if (formData.hotelTypes.length === 0) return false;
    if (!formData.agreement) return false;
    
    return true;
  };

  const handleSubmit = async () => {
    console.log('Отправка заявки, данные формы:', formData);
    console.log('Валидация формы:', validateForm());
    
    if (!validateForm()) {
      const missingFields = [];
      const required = ['firstName', 'lastName', 'email', 'phone', 'city', 'country', 'tripsPerYear', 'budgetRange', 'motivation'];
      
      for (const field of required) {
        if (!formData[field] || formData[field].trim() === '') {
          missingFields.push(field);
        }
      }
      
      if (formData.preferredRegions.length === 0) missingFields.push('preferredRegions');
      if (formData.hotelTypes.length === 0) missingFields.push('hotelTypes');
      if (!formData.agreement) missingFields.push('agreement');
      
      console.log('Отсутствующие поля:', missingFields);
      setSubmitStatus({ type: 'error', message: `Пожалуйста, заполните все обязательные поля: ${missingFields.join(', ')}` });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      console.log('Отправляем заявку через API...');
      await api.submitApplication(formData);
      console.log('Заявка успешно отправлена');
      setSubmitStatus({ 
        type: 'success', 
        message: 'Заявка успешно подана! Мы рассмотрим её в течение 3-5 рабочих дней.' 
      });
      
      // Перенаправляем через 3 секунды
      setTimeout(() => {
        navigate('/');
      }, 3000);
      
    } catch (error) {
      console.error('Ошибка при отправке заявки:', error);
      setSubmitStatus({ 
        type: 'error', 
        message: 'Произошла ошибка при подаче заявки. Попробуйте еще раз.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveDraft = () => {
    localStorage.setItem('applicationDraft', JSON.stringify(formData));
    setSubmitStatus({ 
      type: 'success', 
      message: 'Черновик сохранен!' 
    });
  };

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
              <Input 
                id="firstName" 
                placeholder="Введите ваше имя"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="lastName">Фамилия *</Label>
              <Input 
                id="lastName" 
                placeholder="Введите вашу фамилию"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="phone">Телефон *</Label>
              <Input 
                id="phone" 
                placeholder="+7 (999) 123-45-67"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="birthDate">Дата рождения *</Label>
              <Input 
                id="birthDate" 
                type="date"
                value={formData.birthDate}
                onChange={(e) => handleInputChange('birthDate', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="city">Город *</Label>
              <Input 
                id="city" 
                placeholder="Москва"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="country">Страна *</Label>
              <Select value={formData.country} onValueChange={(value) => handleInputChange('country', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите страну" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Россия">Россия</SelectItem>
                  <SelectItem value="Беларусь">Беларусь</SelectItem>
                  <SelectItem value="Казахстан">Казахстан</SelectItem>
                  <SelectItem value="Другая">Другая</SelectItem>
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
            <RadioGroup 
              className="mt-2" 
              value={formData.tripsPerYear}
              onValueChange={(value) => handleInputChange('tripsPerYear', value)}
            >
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
                  <Checkbox 
                    id={region}
                    checked={formData.preferredRegions.includes(region)}
                    onCheckedChange={(checked) => handleCheckboxChange('preferredRegions', region, checked)}
                  />
                  <Label htmlFor={region} className="text-sm">{region}</Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="budget">Обычный бюджет на проживание за ночь *</Label>
            <Select value={formData.budgetRange} onValueChange={(value) => handleInputChange('budgetRange', value)}>
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
            <Input 
              id="languages" 
              placeholder="Русский (родной), Английский (B2), Французский (A2)"
              value={formData.languages}
              onChange={(e) => handleInputChange('languages', e.target.value)}
            />
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
                  <Checkbox 
                    id={type}
                    checked={formData.hotelTypes.includes(type)}
                    onCheckedChange={(checked) => handleCheckboxChange('hotelTypes', type, checked)}
                  />
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
                  <Checkbox 
                    id={spec}
                    checked={formData.specializations.includes(spec)}
                    onCheckedChange={(checked) => handleCheckboxChange('specializations', spec, checked)}
                  />
                  <Label htmlFor={spec} className="text-sm">{spec}</Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label>Социальные сети (необязательно)</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
              <Input 
                placeholder="Instagram @username"
                value={formData.socialMedia.instagram}
                onChange={(e) => handleSocialMediaChange('instagram', e.target.value)}
              />
              <Input 
                placeholder="Facebook profile"
                value={formData.socialMedia.facebook}
                onChange={(e) => handleSocialMediaChange('facebook', e.target.value)}
              />
              <Input 
                placeholder="Telegram @username"
                value={formData.socialMedia.telegram}
                onChange={(e) => handleSocialMediaChange('telegram', e.target.value)}
              />
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
              value={formData.motivation}
              onChange={(e) => handleInputChange('motivation', e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="availability">Ваша доступность для поездок</Label>
            <Textarea 
              id="availability" 
              placeholder="Укажите, как часто вы готовы участвовать в программе, предпочитаемые даты и регионы..."
              className="min-h-[80px]"
              value={formData.availability}
              onChange={(e) => handleInputChange('availability', e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Согласие */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start space-x-2">
            <Checkbox 
              id="agreement"
              checked={formData.agreement}
              onCheckedChange={(checked) => handleInputChange('agreement', checked)}
            />
            <Label htmlFor="agreement" className="text-sm leading-relaxed">
              Я согласен(а) с <a href="#" className="text-blue-600 hover:underline">условиями программы</a>, 
              <a href="#" className="text-blue-600 hover:underline ml-1">политикой конфиденциальности</a> и 
              обязуюсь предоставлять честные и объективные отчеты о проживании в отелях.
            </Label>
          </div>
        </CardContent>
      </Card>

      {/* Статус отправки */}
      {submitStatus && (
        <Card className={`${submitStatus.type === 'success' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              {submitStatus.type === 'success' ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600" />
              )}
              <p className={`${submitStatus.type === 'success' ? 'text-green-800' : 'text-red-800'}`}>
                {submitStatus.message}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-center space-x-4">
        <Button 
          variant="outline" 
          size="lg" 
          onClick={handleSaveDraft}
          disabled={isSubmitting}
        >
          Сохранить черновик
        </Button>
        <Button 
          size="lg" 
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" 
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Отправка...' : 'Подать заявку'}
        </Button>
      </div>
    </div>
  );
};

export default ApplicationForm;