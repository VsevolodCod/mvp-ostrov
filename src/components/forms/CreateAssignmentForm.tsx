import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Calendar, MapPin, Star, DollarSign, Target } from "lucide-react";
import { createAssignment, fetchHotels } from "@/lib/api";
import { toast } from "@/hooks/use-toast";

interface CreateAssignmentFormProps {
  onAssignmentCreated?: () => void;
}

const CreateAssignmentForm = ({ onAssignmentCreated }: CreateAssignmentFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hotels, setHotels] = useState([]);
  const [formData, setFormData] = useState({
    hotel_id: "",
    title: "",
    description: "",
    priority: "Средний",
    reward_type: "Скидка",
    reward_amount: 70,
    reward_points: 300,
    check_in_date: "",
    check_out_date: "",
    deadline_date: "",
    room_type: "",
    special_requirements: [] as string[]
  });

  const [newRequirement, setNewRequirement] = useState("");

  const priorityOptions = [
    { value: "Низкий", label: "Низкий" },
    { value: "Средний", label: "Средний" },
    { value: "Высокий", label: "Высокий" }
  ];

  const rewardTypeOptions = [
    { value: "Бесплатно", label: "Бесплатно" },
    { value: "Скидка", label: "Скидка" },
    { value: "Баллы", label: "Только баллы" }
  ];

  const roomTypeOptions = [
    "Стандартный номер",
    "Бизнес номер", 
    "Номер с видом на море",
    "Номер с видом на Кремль",
    "Семейный номер",
    "Люкс номер"
  ];

  const loadHotels = async () => {
    try {
      const hotelsData = await fetchHotels();
      setHotels(hotelsData);
    } catch (error) {
      console.error("Ошибка загрузки отелей:", error);
    }
  };

  const handleOpenDialog = () => {
    setIsOpen(true);
    loadHotels();
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addRequirement = () => {
    if (newRequirement.trim()) {
      setFormData(prev => ({
        ...prev,
        special_requirements: [...prev.special_requirements, newRequirement.trim()]
      }));
      setNewRequirement("");
    }
  };

  const removeRequirement = (index: number) => {
    setFormData(prev => ({
      ...prev,
      special_requirements: prev.special_requirements.filter((_, i) => i !== index)
    }));
  };

  const getSelectedHotel = () => {
    return hotels.find(hotel => hotel.id === parseInt(formData.hotel_id));
  };

  const calculateReward = () => {
    const hotel = getSelectedHotel();
    if (!hotel) return "";

    switch (formData.reward_type) {
      case "Бесплатно":
        return `Бесплатное проживание + ${formData.reward_points} баллов`;
      case "Скидка":
        return `${formData.reward_amount}% скидка + ${formData.reward_points} баллов`;
      case "Баллы":
        return `${formData.reward_points} баллов`;
      default:
        return "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const hotel = getSelectedHotel();
      if (!hotel) {
        throw new Error("Выберите отель");
      }

      const assignmentData = {
        hotel_id: parseInt(formData.hotel_id),
        hotel_name: hotel.name,
        city: hotel.city,
        hotel_type: hotel.type,
        hotel_rating: hotel.rating,
        title: formData.title,
        description: formData.description,
        priority: formData.priority,
        reward_type: formData.reward_type,
        reward_amount: formData.reward_amount,
        reward_points: formData.reward_points,
        reward: calculateReward(),
        check_in_date: formData.check_in_date,
        check_out_date: formData.check_out_date,
        deadline_date: formData.deadline_date,
        room_type: formData.room_type,
        amenities: hotel.amenities,
        special_requirements: formData.special_requirements
      };

      await createAssignment(assignmentData);
      
      toast({
        title: "Задание создано",
        description: `Задание для отеля "${hotel.name}" успешно создано`,
      });

      setIsOpen(false);
      setFormData({
        hotel_id: "",
        title: "",
        description: "",
        priority: "Средний",
        reward_type: "Скидка",
        reward_amount: 70,
        reward_points: 300,
        check_in_date: "",
        check_out_date: "",
        deadline_date: "",
        room_type: "",
        special_requirements: []
      });
      
      if (onAssignmentCreated) {
        onAssignmentCreated();
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: error instanceof Error ? error.message : "Не удалось создать задание",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={handleOpenDialog} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 w-4 h-4" />
          Создать задание
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Создание нового задания</DialogTitle>
          <DialogDescription>
            Заполните форму для создания задания для секретного гостя
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Выбор отеля */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="mr-2 w-5 h-5" />
                Выбор отеля
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="hotel">Отель *</Label>
                <Select value={formData.hotel_id} onValueChange={(value) => handleInputChange("hotel_id", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите отель" />
                  </SelectTrigger>
                  <SelectContent>
                    {hotels.map((hotel) => (
                      <SelectItem key={hotel.id} value={hotel.id.toString()}>
                        <div className="flex items-center justify-between w-full">
                          <span>{hotel.name}</span>
                          <div className="flex items-center ml-4 text-sm text-gray-500">
                            <Star className="w-3 h-3 text-yellow-500 fill-current mr-1" />
                            {hotel.rating}
                            <span className="ml-2">{hotel.city}</span>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {getSelectedHotel() && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium">{getSelectedHotel()?.name}</h4>
                  <p className="text-sm text-gray-600">{getSelectedHotel()?.city} • {getSelectedHotel()?.type}</p>
                  <p className="text-sm text-gray-600 mt-1">{getSelectedHotel()?.description}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Основная информация */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="mr-2 w-5 h-5" />
                Основная информация
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Название задания *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="Например: Проверка качества завтрака и SPA-услуг"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Описание задания *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Подробное описание того, что нужно проверить и оценить"
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="priority">Приоритет</Label>
                  <Select value={formData.priority} onValueChange={(value) => handleInputChange("priority", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {priorityOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="room_type">Тип номера</Label>
                  <Select value={formData.room_type} onValueChange={(value) => handleInputChange("room_type", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите тип номера" />
                    </SelectTrigger>
                    <SelectContent>
                      {roomTypeOptions.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Даты */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 w-5 h-5" />
                Даты проведения
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="check_in_date">Дата заезда *</Label>
                  <Input
                    id="check_in_date"
                    type="date"
                    value={formData.check_in_date}
                    onChange={(e) => handleInputChange("check_in_date", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="check_out_date">Дата выезда *</Label>
                  <Input
                    id="check_out_date"
                    type="date"
                    value={formData.check_out_date}
                    onChange={(e) => handleInputChange("check_out_date", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="deadline_date">Срок сдачи отчета *</Label>
                  <Input
                    id="deadline_date"
                    type="date"
                    value={formData.deadline_date}
                    onChange={(e) => handleInputChange("deadline_date", e.target.value)}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Награда */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="mr-2 w-5 h-5" />
                Награда
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="reward_type">Тип награды</Label>
                  <Select value={formData.reward_type} onValueChange={(value) => handleInputChange("reward_type", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {rewardTypeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {formData.reward_type === "Скидка" && (
                  <div>
                    <Label htmlFor="reward_amount">Размер скидки (%)</Label>
                    <Input
                      id="reward_amount"
                      type="number"
                      min="10"
                      max="100"
                      value={formData.reward_amount}
                      onChange={(e) => handleInputChange("reward_amount", parseInt(e.target.value))}
                    />
                  </div>
                )}

                <div>
                  <Label htmlFor="reward_points">Баллы</Label>
                  <Input
                    id="reward_points"
                    type="number"
                    min="100"
                    value={formData.reward_points}
                    onChange={(e) => handleInputChange("reward_points", parseInt(e.target.value))}
                  />
                </div>
              </div>

              {calculateReward() && (
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm font-medium text-green-800">
                    Итоговая награда: {calculateReward()}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Специальные требования */}
          <Card>
            <CardHeader>
              <CardTitle>Специальные требования</CardTitle>
              <CardDescription>
                Добавьте конкретные пункты, которые должен проверить секретный гость
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  value={newRequirement}
                  onChange={(e) => setNewRequirement(e.target.value)}
                  placeholder="Например: Оценить разнообразие блюд на завтраке"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addRequirement())}
                />
                <Button type="button" onClick={addRequirement} variant="outline">
                  Добавить
                </Button>
              </div>

              <div className="space-y-2">
                {formData.special_requirements.map((requirement, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm">{requirement}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeRequirement(index)}
                    >
                      Удалить
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Кнопки */}
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Отмена
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Создание..." : "Создать задание"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAssignmentForm;
