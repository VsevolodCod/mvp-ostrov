// API для работы с данными отелей и заданий
// Использует мок базу данных для демонстрации

import HotelPrioritySystem from './hotelPrioritySystem.js';
import { 
  fetchHotels as baseFetchHotels,
  fetchHotelById as baseFetchHotelById,
  fetchAvailableAssignments as baseFetchAvailableAssignments,
  fetchAssignmentsByHotel,
  filterHotels as baseFilterHotels,
  searchHotels,
  fetchAdminStats,
  createAssignment,
  updateAssignment,
  deleteAssignment,
  getAllAssignments,
  getAssignmentById,
  getAllUsers,
  getUserById,
  updateUserStatus,
  getAllApplications,
  approveApplication,
  rejectApplication,
  getAllReports,
  approveReport,
  rejectReport,
  createHotel,
  updateHotel,
  deleteHotel,
  getRealTimeStats
} from './mockDatabase.js';

// Обертка для добавления приоритетов к отелям
export const fetchHotels = async () => {
  const hotels = await baseFetchHotels();
  return HotelPrioritySystem.updateAllHotelPriorities(hotels);
};

export const fetchHotelById = async (id) => {
  const hotel = await baseFetchHotelById(id);
  if (!hotel) return null;
  
  const [updatedHotel] = HotelPrioritySystem.updateAllHotelPriorities([hotel]);
  return updatedHotel;
};

// Обновляем задания с учетом приоритетов
export const fetchAvailableAssignments = async () => {
  const assignments = await baseFetchAvailableAssignments();
  const hotels = await fetchHotels();
  
  return assignments.map(assignment => {
    const hotel = hotels.find(h => h.id === assignment.hotel_id);
    if (hotel) {
      return {
        ...assignment,
        priority: hotel.priority,
        priority_score: hotel.priority_score,
        priority_reasons: hotel.priority_reasons,
        recommended_reward: hotel.recommended_reward
      };
    }
    return assignment;
  }).sort((a, b) => (b.priority_score || 0) - (a.priority_score || 0)); // Сортируем по приоритету
};

export const filterHotels = async (filters) => {
  const hotels = await baseFilterHotels(filters);
  return HotelPrioritySystem.updateAllHotelPriorities(hotels);
};

// Получить рекомендации для менеджеров
export const getManagerRecommendations = async () => {
  const hotels = await baseFetchHotels();
  return HotelPrioritySystem.getManagerRecommendations(hotels);
};

// Получить отели с высоким приоритетом
export const getUrgentHotels = async () => {
  const hotels = await baseFetchHotels();
  return HotelPrioritySystem.getUrgentHotels(hotels);
};

export { 
  fetchAssignmentsByHotel, 
  searchHotels, 
  fetchAdminStats,
  createAssignment,
  updateAssignment,
  deleteAssignment,
  getAllAssignments,
  getAssignmentById,
  getAllUsers,
  getUserById,
  updateUserStatus,
  getAllApplications,
  approveApplication,
  rejectApplication,
  getAllReports,
  approveReport,
  rejectReport,
  createHotel,
  updateHotel,
  deleteHotel,
  getRealTimeStats
};
