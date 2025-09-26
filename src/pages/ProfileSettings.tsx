import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, User, Bell, Shield, CreditCard, 
  Mail, Phone, MapPin, Camera, Save, 
  Eye, EyeOff, Trash2
} from "lucide-react";

const ProfileSettings = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: "Анна",
    lastName: "Петрова", 
    email: "anna.petrova@email.com",
    phone: "+7 (999) 123-45-67",
    city: "Москва",
    country: "Россия",
    bio: "Опытный путешественник с более чем 10-летним стажем. Специализируюсь на оценке бизнес-отелей и курортов.",
    socialMedia: {
      instagram: "@anna_travels",
      telegram: "@anna_p"
    }
  });

  const [notifications, setNotifications] = useState({
    newAssignments: true,
    reportUpdates: true,
    rewards: true,
    newsletter: false,
    sms: true,
    push: true
  });

  const [preferences, setPreferences] = useState({
    preferredRegions: ["Россия", "Европа"],
    hotelTypes: ["Бизнес-отели", "Курортные отели"],
    budgetRange: "premium",
    availability: "flexible"
  });

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link to="/guest-dashboard">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Назад к кабинету
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Настройки профиля</h1>
          <p className="text-gray-600">Управление личными данными и предпочтениями</p>
        </div>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Профиль</TabsTrigger>
          <TabsTrigger value="notifications">Уведомления</TabsTrigger>
          <TabsTrigger value="preferences">Предпочтения</TabsTrigger>
          <TabsTrigger value="security">Безопасность</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 w-5 h-5" />
                Личная информация
              </CardTitle>
              <CardDescription>
                Обновите свои личные данные и контактную информацию
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar */}
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="w-10 h-10 text-white" />
                </div>
                <div>
                  <Button variant="outline" size="sm">
                    <Camera className="w-4 h-4 mr-2" />
                    Изменить фото
                  </Button>
                  <p className="text-sm text-gray-600 mt-1">JPG, PNG до 5MB</p>
                </div>
              </div>

              {/* Personal Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">Имя *</Label>
                  <Input 
                    id="firstName" 
                    value={profileData.firstName}
                    onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Фамилия *</Label>
                  <Input 
                    id="lastName" 
                    value={profileData.lastName}
                    onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input 
                      id="email" 
                      type="email"
                      className="pl-10"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="phone">Телефон *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input 
                      id="phone"
                      className="pl-10"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">Город</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input 
                      id="city"
                      className="pl-10"
                      value={profileData.city}
                      onChange={(e) => setProfileData({...profileData, city: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="country">Страна</Label>
                  <Select value={profileData.country}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Россия">Россия</SelectItem>
                      <SelectItem value="Беларусь">Беларусь</SelectItem>
                      <SelectItem value="Казахстан">Казахстан</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="bio">О себе</Label>
                <Textarea 
                  id="bio"
                  placeholder="Расскажите о своем опыте путешествий..."
                  value={profileData.bio}
                  onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                />
              </div>

              {/* Social Media */}
              <div>
                <Label className="text-base font-medium">Социальные сети</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div>
                    <Label htmlFor="instagram">Instagram</Label>
                    <Input 
                      id="instagram"
                      placeholder="@username"
                      value={profileData.socialMedia.instagram}
                      onChange={(e) => setProfileData({
                        ...profileData, 
                        socialMedia: {...profileData.socialMedia, instagram: e.target.value}
                      })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="telegram">Telegram</Label>
                    <Input 
                      id="telegram"
                      placeholder="@username"
                      value={profileData.socialMedia.telegram}
                      onChange={(e) => setProfileData({
                        ...profileData, 
                        socialMedia: {...profileData.socialMedia, telegram: e.target.value}
                      })}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="mr-2 w-5 h-5" />
                Настройки уведомлений
              </CardTitle>
              <CardDescription>
                Выберите, какие уведомления вы хотите получать
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Новые задания</Label>
                    <p className="text-sm text-gray-600">Уведомления о доступных заданиях</p>
                  </div>
                  <Switch 
                    checked={notifications.newAssignments}
                    onCheckedChange={(checked) => setNotifications({...notifications, newAssignments: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Статус отчетов</Label>
                    <p className="text-sm text-gray-600">Обновления по вашим отчетам</p>
                  </div>
                  <Switch 
                    checked={notifications.reportUpdates}
                    onCheckedChange={(checked) => setNotifications({...notifications, reportUpdates: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Вознаграждения</Label>
                    <p className="text-sm text-gray-600">Начисление баллов и наград</p>
                  </div>
                  <Switch 
                    checked={notifications.rewards}
                    onCheckedChange={(checked) => setNotifications({...notifications, rewards: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Новости программы</Label>
                    <p className="text-sm text-gray-600">Обновления и новости</p>
                  </div>
                  <Switch 
                    checked={notifications.newsletter}
                    onCheckedChange={(checked) => setNotifications({...notifications, newsletter: checked})}
                  />
                </div>
              </div>

              <div className="border-t pt-4">
                <Label className="text-base font-medium mb-4 block">Способы доставки</Label>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>SMS уведомления</Label>
                    <Switch 
                      checked={notifications.sms}
                      onCheckedChange={(checked) => setNotifications({...notifications, sms: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Push уведомления</Label>
                    <Switch 
                      checked={notifications.push}
                      onCheckedChange={(checked) => setNotifications({...notifications, push: checked})}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Предпочтения для заданий</CardTitle>
              <CardDescription>
                Настройте параметры для подбора подходящих заданий
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-base font-medium">Предпочитаемые регионы</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                  {["Россия", "Европа", "Азия", "Америка"].map((region) => (
                    <label key={region} className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        checked={preferences.preferredRegions.includes(region)}
                        className="rounded"
                      />
                      <span className="text-sm">{region}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-base font-medium">Типы отелей</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                  {["Бизнес-отели", "Курортные отели", "Бутик-отели", "Хостелы"].map((type) => (
                    <label key={type} className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        checked={preferences.hotelTypes.includes(type)}
                        className="rounded"
                      />
                      <span className="text-sm">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="budget">Бюджетная категория</Label>
                <Select value={preferences.budgetRange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="budget">Эконом (до 3000₽)</SelectItem>
                    <SelectItem value="mid">Средний (3000-8000₽)</SelectItem>
                    <SelectItem value="premium">Премиум (8000-15000₽)</SelectItem>
                    <SelectItem value="luxury">Люкс (свыше 15000₽)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="availability">Доступность</Label>
                <Select value={preferences.availability}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="flexible">Гибкий график</SelectItem>
                    <SelectItem value="weekends">Только выходные</SelectItem>
                    <SelectItem value="weekdays">Только будни</SelectItem>
                    <SelectItem value="limited">Ограниченная доступность</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 w-5 h-5" />
                Безопасность аккаунта
              </CardTitle>
              <CardDescription>
                Управление паролем и настройками безопасности
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="current-password">Текущий пароль</Label>
                <div className="relative">
                  <Input 
                    id="current-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Введите текущий пароль"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              <div>
                <Label htmlFor="new-password">Новый пароль</Label>
                <Input 
                  id="new-password"
                  type="password"
                  placeholder="Введите новый пароль"
                />
              </div>

              <div>
                <Label htmlFor="confirm-password">Подтвердите пароль</Label>
                <Input 
                  id="confirm-password"
                  type="password"
                  placeholder="Повторите новый пароль"
                />
              </div>

              <div className="border-t pt-4">
                <Label className="text-base font-medium text-red-600 mb-4 block">Опасная зона</Label>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Удалить аккаунт
                  </Button>
                  <p className="text-sm text-gray-600">
                    Удаление аккаунта приведет к потере всех данных и не может быть отменено.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Button */}
      <div className="flex justify-end space-x-4">
        <Button variant="outline">
          Отменить
        </Button>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
          <Save className="mr-2 w-4 h-4" />
          Сохранить изменения
        </Button>
      </div>
    </div>
  );
};

export default ProfileSettings;