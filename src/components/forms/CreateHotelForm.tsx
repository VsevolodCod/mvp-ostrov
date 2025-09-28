import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Building, MapPin, Star, Phone, Mail, Globe } from "lucide-react";
import { createHotel } from "@/lib/api";
import { toast } from "@/hooks/use-toast";

interface CreateHotelFormProps {
  onHotelCreated?: () => void;
}

const CreateHotelForm = ({ onHotelCreated }: CreateHotelFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    address: "",
    type: "",
    stars: 3,
    price_per_night: 0,
    description: "",
    amenities: [] as string[],
    contact_phone: "",
    contact_email: "",
    website: ""
  });

  const [newAmenity, setNewAmenity] = useState("");

  const hotelTypes = [
    "Люкс отель",
    "Бизнес-отель", 
    "Курортный отель",
    "Эконом отель",
    "Бутик-отель",
    "Семейный отель",
    "Горнолыжный курорт"
  ];

  const commonAmenities = [
    "WiFi",
    "Ресторан",
    "SPA",
    "Фитнес-центр",
    "Консьерж",
    "Парковка",
    "Бизнес-центр",
    "Бассейн",
    "Пляж",
    "Детская площадка",
    "Анимация",
    "Лыжная школа"
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addAmenity = () => {
    if (newAmenity.trim()) {
      setFormData(prev => ({
        ...prev,
        amenities: [...prev.amenities, newAmenity.trim()]
      }));
      setNewAmenity("");
    }
  };

  const removeAmenity = (index: number) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.filter((_, i) => i !== index)
    }));
  };

  const addCommonAmenity = (amenity: string) => {
    if (!formData.amenities.includes(amenity)) {
      setFormData(prev => ({
        ...prev,
        amenities: [...prev.amenities, amenity]
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const hotelData = {
        ...formData,
        rating: 0, // Новый отель без рейтинга
        photos: ["placeholder.jpg"] // Заглушка для фото
      };

      await createHotel(hotelData);
      
      toast({
        title: "Отель добавлен",
        description: `Отель "${formData.name}" успешно добавлен в программу`,
      });

      setIsOpen(false);
      setFormData({
        name: "",
        city: "",
        address: "",
        type: "",
        stars: 3,
        price_per_night: 0,
        description: "",
        amenities: [],
        contact_phone: "",
        contact_email: "",
        website: ""
      });
      
      if (onHotelCreated) {
        onHotelCreated();
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: error instanceof Error ? error.message : "Не удалось добавить отель",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="mr-2 w-4 h-4" />
          Добавить отель
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Добавление нового отеля</DialogTitle>
          <DialogDescription>
            Заполните информацию об отеле для добавления в программу "Секретный гость"
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Основная информация */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building className="mr-2 w-5 h-5" />
                Основная информация
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Название отеля *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Например: Гранд Отель Москва"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="city">Город *</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    placeholder="Москва"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="address">Адрес *</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="ул. Примерная, 123"
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="type">Тип отеля *</Label>
                  <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите тип" />
                    </SelectTrigger>
                    <SelectContent>
                      {hotelTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="stars">Количество звезд</Label>
                  <Select value={formData.stars.toString()} onValueChange={(value) => handleInputChange("stars", parseInt(value))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 звезда</SelectItem>
                      <SelectItem value="2">2 звезды</SelectItem>
                      <SelectItem value="3">3 звезды</SelectItem>
                      <SelectItem value="4">4 звезды</SelectItem>
                      <SelectItem value="5">5 звезд</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="price_per_night">Цена за ночь (₽)</Label>
                  <Input
                    id="price_per_night"
                    type="number"
                    min="0"
                    value={formData.price_per_night}
                    onChange={(e) => handleInputChange("price_per_night", parseInt(e.target.value))}
                    placeholder="10000"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Описание отеля *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Подробное описание отеля, его особенностей и преимуществ"
                  rows={4}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Удобства */}
          <Card>
            <CardHeader>
              <CardTitle>Удобства и услуги</CardTitle>
              <CardDescription>
                Выберите удобства, доступные в отеле
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Популярные удобства</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {commonAmenities.map((amenity) => (
                    <Button
                      key={amenity}
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addCommonAmenity(amenity)}
                      disabled={formData.amenities.includes(amenity)}
                    >
                      {amenity}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex space-x-2">
                <Input
                  value={newAmenity}
                  onChange={(e) => setNewAmenity(e.target.value)}
                  placeholder="Добавить свое удобство"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAmenity())}
                />
                <Button type="button" onClick={addAmenity} variant="outline">
                  Добавить
                </Button>
              </div>

              <div className="space-y-2">
                <Label>Выбранные удобства:</Label>
                <div className="flex flex-wrap gap-2">
                  {formData.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center bg-gray-100 rounded px-2 py-1">
                      <span className="text-sm">{amenity}</span>
                      <button
                        type="button"
                        className="ml-2 text-red-600 hover:text-red-800"
                        onClick={() => removeAmenity(index)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Контактная информация */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Phone className="mr-2 w-5 h-5" />
                Контактная информация
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contact_phone">Телефон</Label>
                  <Input
                    id="contact_phone"
                    value={formData.contact_phone}
                    onChange={(e) => handleInputChange("contact_phone", e.target.value)}
                    placeholder="+7 (495) 123-45-67"
                  />
                </div>
                <div>
                  <Label htmlFor="contact_email">Email</Label>
                  <Input
                    id="contact_email"
                    type="email"
                    value={formData.contact_email}
                    onChange={(e) => handleInputChange("contact_email", e.target.value)}
                    placeholder="info@hotel.com"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="website">Веб-сайт</Label>
                <Input
                  id="website"
                  value={formData.website}
                  onChange={(e) => handleInputChange("website", e.target.value)}
                  placeholder="www.hotel.com"
                />
              </div>
            </CardContent>
          </Card>

          {/* Кнопки */}
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Отмена
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Добавление..." : "Добавить отель"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateHotelForm;
