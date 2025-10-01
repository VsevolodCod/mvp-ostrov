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

// Новые API функции для заявок и чекпоинтов
export const api = {
  // Подать заявку
  submitApplication: async (applicationData) => {
    try {
      const newApplication = {
        id: Date.now(),
        ...applicationData,
        status: 'На рассмотрении',
        submittedAt: new Date().toISOString()
      };
      
      // Сохраняем в localStorage для демонстрации
      const applications = JSON.parse(localStorage.getItem('applications') || '[]');
      applications.push(newApplication);
      localStorage.setItem('applications', JSON.stringify(applications));
      
      return newApplication;
    } catch (error) {
      console.error('Ошибка при подаче заявки:', error);
      throw error;
    }
  },

  // Получить все заявки (для админа)
  getApplications: async () => {
    try {
      return JSON.parse(localStorage.getItem('applications') || '[]');
    } catch (error) {
      console.error('Ошибка при получении заявок:', error);
      return [];
    }
  },

  // Обновить статус заявки
  updateApplicationStatus: async (id, status, adminNotes) => {
    try {
      const applications = JSON.parse(localStorage.getItem('applications') || '[]');
      const index = applications.findIndex(app => app.id === id);
      
      if (index !== -1) {
        applications[index] = {
          ...applications[index],
          status,
          adminNotes,
          reviewedAt: new Date().toISOString()
        };
        localStorage.setItem('applications', JSON.stringify(applications));
        return applications[index];
      }
      return null;
    } catch (error) {
      console.error('Ошибка при обновлении заявки:', error);
      throw error;
    }
  },

  // Сохранить чекпоинт
  saveCheckpoint: async (reportId, checkpointData) => {
    try {
      const checkpoints = JSON.parse(localStorage.getItem(`checkpoints_${reportId}`) || '[]');
      
      const existingIndex = checkpoints.findIndex(cp => cp.id === checkpointData.id);
      
      if (existingIndex !== -1) {
        checkpoints[existingIndex] = {
          ...checkpoints[existingIndex],
          ...checkpointData,
          updatedAt: new Date().toISOString()
        };
      } else {
        checkpoints.push({
          ...checkpointData,
          createdAt: new Date().toISOString()
        });
      }
      
      localStorage.setItem(`checkpoints_${reportId}`, JSON.stringify(checkpoints));
      return checkpointData;
    } catch (error) {
      console.error('Ошибка при сохранении чекпоинта:', error);
      throw error;
    }
  },

  // Получить чекпоинты отчета
  getCheckpoints: async (reportId) => {
    try {
      return JSON.parse(localStorage.getItem(`checkpoints_${reportId}`) || '[]');
    } catch (error) {
      console.error('Ошибка при получении чекпоинтов:', error);
      return [];
    }
  },

  // Завершить отчет
  completeReport: async (reportId, reportData) => {
    try {
      const reports = JSON.parse(localStorage.getItem('completedReports') || '[]');
      
      const completedReport = {
        id: reportId,
        ...reportData,
        status: 'На проверке',
        submittedAt: new Date().toISOString()
      };
      
      reports.push(completedReport);
      localStorage.setItem('completedReports', JSON.stringify(reports));
      
      return completedReport;
    } catch (error) {
      console.error('Ошибка при завершении отчета:', error);
      throw error;
    }
  }
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
