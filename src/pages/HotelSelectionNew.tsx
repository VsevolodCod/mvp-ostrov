import { useState, useEffect } from "react";
import { Card, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Gift } from "lucide-react";

const HotelSelectionNew = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Доступные задания</h1>
          <p className="text-gray-600">Выберите отель для проверки</p>
        </div>
        <Badge className="bg-green-100 text-green-800">
          1 заданий доступно
        </Badge>
      </div>

      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="h-64 lg:h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <div className="text-white text-center">
                <MapPin className="w-12 h-12 mx-auto mb-2" />
                <p className="text-lg font-semibold">Гранд Отель Сочи</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">Гранд Отель Сочи</h3>
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>Сочи</span>
                  <Badge variant="outline" className="ml-2">Курортный отель</Badge>
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                  <span className="font-medium">4.2</span>
                </div>
              </div>
            </div>

            <p className="text-gray-700 mb-4">Требуется проверка качества завтрака и работы SPA-центра</p>

            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Gift className="w-5 h-5 text-green-600 mr-2" />
                <span className="font-semibold text-green-600">Бесплатное проживание + 500 баллов</span>
              </div>
              
              <div className="flex space-x-2">
                <Button variant="outline">Подробнее</Button>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                  Взять задание
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default HotelSelectionNew;