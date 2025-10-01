// Система управления интерактивными отчетами с чекпоинтами

class ReportStore {
  constructor() {
    this.activeReports = [];
    this.completedReports = [];
    this.listeners = [];
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(listener => listener({
      active: this.activeReports,
      completed: this.completedReports
    }));
  }

  // Создать новый интерактивный отчет при взятии задания
  createReport(assignment) {
    const report = {
      id: `report_${assignment.id}_${Date.now()}`,
      assignmentId: assignment.id,
      hotelName: assignment.hotel_name,
      city: assignment.city,
      checkInDate: assignment.check_in_date,
      checkOutDate: assignment.check_out_date,
      status: 'active',
      createdAt: new Date().toISOString(),
      
      // Игровые элементы
      points: 0,
      level: 1,
      completedAnswers: 0,
      uploadedPhotos: 0,
      
      // Чекпоинты
      checkpoints: {
        transfer: { 
          completed: false, 
          points: 0,
          data: null,
          completedAt: null
        },
        checkin: { 
          completed: false, 
          points: 0,
          data: null,
          completedAt: null
        },
        stay: { 
          completed: false, 
          points: 0,
          data: null,
          completedAt: null
        },
        checkout: { 
          completed: false, 
          points: 0,
          data: null,
          completedAt: null
        }
      },
      
      // Блоки отчета
      blocks: {
        room: {
          title: "Номер",
          completed: 0,
          total: 12,
          points: 0,
          entries: [],
          questions: [
            { id: 'room_cleanliness', text: 'Чистота номера', type: 'rating', required: true },
            { id: 'room_comfort', text: 'Комфорт номера', type: 'rating', required: true },
            { id: 'room_amenities', text: 'Удобства в номере', type: 'rating', required: true },
            { id: 'room_photos_match', text: 'Соответствие фото на сайте', type: 'rating', required: true },
            { id: 'room_size', text: 'Размер номера', type: 'rating', required: false },
            { id: 'room_view', text: 'Вид из окна', type: 'rating', required: false },
            { id: 'room_noise', text: 'Уровень шума', type: 'rating', required: false },
            { id: 'room_temperature', text: 'Температурный режим', type: 'rating', required: false },
            { id: 'room_lighting', text: 'Освещение', type: 'rating', required: false },
            { id: 'room_bathroom', text: 'Состояние ванной комнаты', type: 'rating', required: true },
            { id: 'room_wifi', text: 'Качество Wi-Fi в номере', type: 'rating', required: false },
            { id: 'room_comment', text: 'Общий комментарий о номере', type: 'text', required: true }
          ]
        },
        food: {
          title: "Еда и рестораны",
          completed: 0,
          total: 8,
          points: 0,
          entries: [],
          questions: [
            { id: 'breakfast_quality', text: 'Качество завтрака', type: 'rating', required: true },
            { id: 'food_variety', text: 'Разнообразие блюд', type: 'rating', required: true },
            { id: 'restaurant_service', text: 'Обслуживание в ресторане', type: 'rating', required: true },
            { id: 'food_freshness', text: 'Свежесть продуктов', type: 'rating', required: true },
            { id: 'menu_prices', text: 'Соотношение цена-качество', type: 'rating', required: false },
            { id: 'dietary_options', text: 'Опции для особых диет', type: 'rating', required: false },
            { id: 'bar_quality', text: 'Качество бара', type: 'rating', required: false },
            { id: 'food_comment', text: 'Общий комментарий о питании', type: 'text', required: true }
          ]
        },
        beach: {
          title: "Пляж/активности",
          completed: 0,
          total: 6,
          points: 0,
          entries: [],
          questions: [
            { id: 'beach_cleanliness', text: 'Чистота пляжа', type: 'rating', required: true },
            { id: 'beach_equipment', text: 'Пляжное оборудование', type: 'rating', required: true },
            { id: 'beach_service', text: 'Пляжный сервис', type: 'rating', required: false },
            { id: 'water_quality', text: 'Качество воды', type: 'rating', required: true },
            { id: 'beach_safety', text: 'Безопасность на пляже', type: 'rating', required: false },
            { id: 'beach_comment', text: 'Общий комментарий о пляже', type: 'text', required: true }
          ]
        },
        activities: {
          title: "Доп. активности",
          completed: 0,
          total: 4,
          points: 0,
          entries: [],
          questions: [
            { id: 'gym_quality', text: 'Качество спортзала', type: 'rating', required: false },
            { id: 'spa_quality', text: 'Качество SPA', type: 'rating', required: false },
            { id: 'kids_area', text: 'Детская зона', type: 'rating', required: false },
            { id: 'activities_comment', text: 'Комментарий об активностях', type: 'text', required: false }
          ]
        }
      }
    };

    this.activeReports.push(report);
    this.notify();
    return report;
  }

  // Получить активный отчет по ID задания
  getActiveReport(assignmentId) {
    return this.activeReports.find(r => r.assignmentId === assignmentId);
  }

  // Обновить чекпоинт
  updateCheckpoint(reportId, checkpointId, data) {
    const report = this.activeReports.find(r => r.id === reportId);
    if (!report) return false;

    const checkpoint = report.checkpoints[checkpointId];
    if (!checkpoint) return false;

    checkpoint.completed = true;
    checkpoint.data = data;
    checkpoint.completedAt = new Date().toISOString();
    
    // Начисляем баллы за чекпоинт
    const pointsMap = {
      transfer: 10,
      checkin: 15,
      stay: 20,
      checkout: 15
    };
    
    checkpoint.points = pointsMap[checkpointId] || 5;
    report.points += checkpoint.points;

    this.notify();
    return true;
  }

  // Обновить ответ в блоке
  updateBlockAnswer(reportId, blockId, questionId, answer) {
    const report = this.activeReports.find(r => r.id === reportId);
    if (!report) return false;

    const block = report.blocks[blockId];
    if (!block) return false;

    // Найти или создать запись для этого вопроса
    let entry = block.entries.find(e => e.questionId === questionId);
    if (!entry) {
      entry = {
        questionId,
        answer: null,
        photos: [],
        completedAt: null
      };
      block.entries.push(entry);
    }

    entry.answer = answer;
    entry.completedAt = new Date().toISOString();

    // Пересчитать прогресс блока
    const answeredQuestions = block.entries.filter(e => e.answer !== null).length;
    block.completed = answeredQuestions;

    // Начислить баллы (5 баллов за обязательный вопрос, 2 за необязательный)
    const question = block.questions.find(q => q.id === questionId);
    const pointsForAnswer = question?.required ? 5 : 2;
    
    if (!entry.pointsAwarded) {
      block.points += pointsForAnswer;
      report.points += pointsForAnswer;
      report.completedAnswers++;
      entry.pointsAwarded = true;
    }

    this.notify();
    return true;
  }

  // Добавить фото к ответу
  addPhotoToAnswer(reportId, blockId, questionId, photo) {
    const report = this.activeReports.find(r => r.id === reportId);
    if (!report) return false;

    const block = report.blocks[blockId];
    if (!block) return false;

    let entry = block.entries.find(e => e.questionId === questionId);
    if (!entry) {
      entry = {
        questionId,
        answer: null,
        photos: [],
        completedAt: null
      };
      block.entries.push(entry);
    }

    entry.photos.push({
      id: Date.now(),
      url: photo.url,
      caption: photo.caption || '',
      uploadedAt: new Date().toISOString()
    });

    // Начислить баллы за фото (3 балла за фото)
    block.points += 3;
    report.points += 3;
    report.uploadedPhotos++;

    this.notify();
    return true;
  }

  // Завершить отчет
  completeReport(reportId) {
    const reportIndex = this.activeReports.findIndex(r => r.id === reportId);
    if (reportIndex === -1) return false;

    const report = this.activeReports[reportIndex];
    report.status = 'completed';
    report.completedAt = new Date().toISOString();

    // Бонусные баллы за завершение отчета
    report.points += 50;

    // Переместить в завершенные
    this.activeReports.splice(reportIndex, 1);
    this.completedReports.push(report);

    this.notify();
    return true;
  }

  // Получить статистику пользователя
  getUserReportStats() {
    const totalPoints = [...this.activeReports, ...this.completedReports]
      .reduce((sum, report) => sum + report.points, 0);
    
    return {
      activeReports: this.activeReports.length,
      completedReports: this.completedReports.length,
      totalPoints,
      averageRating: this.calculateAverageRating()
    };
  }

  calculateAverageRating() {
    // Простая логика расчета среднего рейтинга
    const allRatings = [];
    
    [...this.activeReports, ...this.completedReports].forEach(report => {
      Object.values(report.blocks).forEach(block => {
        block.entries.forEach(entry => {
          if (typeof entry.answer === 'number' && entry.answer >= 1 && entry.answer <= 5) {
            allRatings.push(entry.answer);
          }
        });
      });
    });

    if (allRatings.length === 0) return 0;
    return (allRatings.reduce((sum, rating) => sum + rating, 0) / allRatings.length).toFixed(1);
  }
}

const reportStore = new ReportStore();
export default reportStore;