// API для работы с данными отелей и заданий
// Использует мок базу данных для демонстрации

export { 
  fetchHotels,
  fetchHotelById,
  fetchAvailableAssignments,
  fetchAssignmentsByHotel,
  filterHotels,
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