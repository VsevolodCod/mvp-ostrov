// API для работы с данными отелей и заданий
// Использует мок базу данных для демонстрации

export { 
  fetchHotels,
  fetchHotelById,
  fetchAvailableAssignments,
  fetchAssignmentsByHotel,
  filterHotels,
  searchHotels,
  fetchAdminStats
} from './mockDatabase.js';