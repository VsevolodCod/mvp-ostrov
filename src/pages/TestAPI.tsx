import { useState, useEffect } from "react";
import { fetchAvailableAssignments, fetchHotels } from "@/lib/api.js";

const TestAPI = () => {
  const [assignments, setAssignments] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const testAPI = async () => {
      try {
        console.log('Тестируем API...');
        
        const assignmentsData = await fetchAvailableAssignments();
        console.log('Задания:', assignmentsData);
        setAssignments(assignmentsData);
        
        const hotelsData = await fetchHotels();
        console.log('Отели:', hotelsData);
        setHotels(hotelsData);
        
      } catch (error) {
        console.error('Ошибка API:', error);
      } finally {
        setLoading(false);
      }
    };

    testAPI();
  }, []);

  if (loading) {
    return <div className="p-6">Загрузка...</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Тест API</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Задания ({assignments.length})</h2>
        <div className="space-y-2">
          {assignments.map((assignment) => (
            <div key={assignment.id} className="border p-4 rounded">
              <h3 className="font-medium">{assignment.hotel_name}</h3>
              <p className="text-sm text-gray-600">{assignment.city} - {assignment.priority}</p>
              <p className="text-sm">{assignment.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Отели ({hotels.length})</h2>
        <div className="space-y-2">
          {hotels.map((hotel) => (
            <div key={hotel.id} className="border p-4 rounded">
              <h3 className="font-medium">{hotel.name}</h3>
              <p className="text-sm text-gray-600">{hotel.city} - {hotel.type}</p>
              <p className="text-sm">Рейтинг: {hotel.rating} ⭐</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestAPI;