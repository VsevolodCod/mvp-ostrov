// Простое глобальное состояние для управления заданиями пользователя
// В реальном приложении это было бы в Redux, Zustand или Context API

class UserStore {
  constructor() {
    this.assignments = [];
    this.points = 0;
    this.listeners = [];
    this.loadFromStorage();
  }

  // Загрузка данных из localStorage
  loadFromStorage() {
    try {
      const savedData = localStorage.getItem('userStore');
      if (savedData) {
        const parsed = JSON.parse(savedData);
        this.assignments = parsed.assignments || [];
        this.points = parsed.points || 0;
      }
    } catch (error) {
      console.error('Ошибка загрузки данных из localStorage:', error);
    }
  }

  // Сохранение данных в localStorage
  saveToStorage() {
    try {
      const dataToSave = {
        assignments: this.assignments,
        points: this.points
      };
      localStorage.setItem('userStore', JSON.stringify(dataToSave));
    } catch (error) {
      console.error('Ошибка сохранения данных в localStorage:', error);
    }
  }

  // Подписка на изменения
  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  // Уведомление подписчиков об изменениях
  notify() {
    this.saveToStorage();
    this.listeners.forEach(listener => listener(this.assignments, this.points));
  }

  // Получить все задания пользователя
  getUserAssignments() {
    return this.assignments;
  }

  // Взять задание
  takeAssignment(assignment) {
    const existingAssignment = this.assignments.find(a => a.id === assignment.id);
    if (existingAssignment) {
      console.log('Задание уже взято');
      return false;
    }

    const userAssignment = {
      ...assignment,
      status: 'Активное',
      takenAt: new Date().toISOString(),
      userId: 'current-user' // В реальном приложении это был бы ID текущего пользователя
    };

    this.assignments.push(userAssignment);
    this.notify();
    return true;
  }

  // Завершить задание
  completeAssignment(assignmentId, reportData = {}) {
    const assignment = this.assignments.find(a => a.id === assignmentId);
    if (assignment && assignment.status === 'Активное') {
      assignment.status = 'Завершено';
      assignment.completedAt = new Date().toISOString();
      assignment.reportData = reportData;
      
      // Начисляем очки за выполнение задания
      const pointsEarned = this.calculatePoints(assignment);
      this.points += pointsEarned;
      assignment.pointsEarned = pointsEarned;
      
      this.notify();
      return { success: true, pointsEarned };
    }
    return { success: false, pointsEarned: 0 };
  }

  // Расчет очков за задание
  calculatePoints(assignment) {
    let basePoints = 100; // Базовые очки за выполнение
    
    // Бонус за приоритет
    if (assignment.priority === 'Высокий') {
      basePoints += 50;
    } else if (assignment.priority === 'Средний') {
      basePoints += 25;
    }
    
    // Бонус за тип вознаграждения
    if (assignment.reward && assignment.reward.includes('Бесплатно')) {
      basePoints += 30;
    }
    
    // Бонус за качество отчета (если есть данные отчета)
    if (assignment.reportData && assignment.reportData.overallRating) {
      const rating = assignment.reportData.overallRating;
      if (rating >= 4.5) {
        basePoints += 50; // Отличный отчет
      } else if (rating >= 4.0) {
        basePoints += 25; // Хороший отчет
      }
    }
    
    return basePoints;
  }

  // Отменить задание
  cancelAssignment(assignmentId) {
    this.assignments = this.assignments.filter(a => a.id !== assignmentId);
    this.notify();
    return true;
  }

  // Проверить, взято ли задание
  isAssignmentTaken(assignmentId) {
    return this.assignments.some(a => a.id === assignmentId);
  }

  // Получить статистику пользователя
  getUserStats() {
    const total = this.assignments.length;
    const active = this.assignments.filter(a => a.status === 'Активное').length;
    const completed = this.assignments.filter(a => a.status === 'Завершено').length;
    const totalPointsEarned = this.assignments
      .filter(a => a.status === 'Завершено' && a.pointsEarned)
      .reduce((sum, a) => sum + a.pointsEarned, 0);
    
    return {
      total,
      active,
      completed,
      points: this.points,
      totalPointsEarned
    };
  }

  // Получить текущие очки
  getPoints() {
    return this.points;
  }

  // Добавить очки (для тестирования или бонусов)
  addPoints(amount) {
    this.points += amount;
    this.notify();
    return this.points;
  }

  // Система уровней
  getLevelInfo(points = this.points) {
    const levels = [
      { name: "Новичок", minPoints: 0, maxPoints: 499, color: "gray", icon: "🌱", description: "Только начинаете свой путь" },
      { name: "Исследователь", minPoints: 500, maxPoints: 999, color: "blue", icon: "🔍", description: "Изучаете мир отелей" },
      { name: "Критик", minPoints: 1000, maxPoints: 1999, color: "green", icon: "⭐", description: "Опытный оценщик" },
      { name: "Эксперт", minPoints: 2000, maxPoints: 3999, color: "purple", icon: "🏆", description: "Признанный специалист" },
      { name: "Мастер", minPoints: 4000, maxPoints: 6999, color: "orange", icon: "👑", description: "Мастер своего дела" },
      { name: "Легенда", minPoints: 7000, maxPoints: 9999, color: "red", icon: "🔥", description: "Легендарный секретный гость" },
      { name: "Мифический", minPoints: 10000, maxPoints: 19999, color: "indigo", icon: "✨", description: "Мифический уровень мастерства" },
      { name: "Божественный", minPoints: 20000, maxPoints: Infinity, color: "gold", icon: "🌟", description: "Божественный уровень экспертизы" }
    ];

    const currentLevel = levels.find(level => points >= level.minPoints && points < level.maxPoints) || levels[levels.length - 1];
    const nextLevel = levels.find(level => level.minPoints > points) || null;
    
    return {
      current: currentLevel,
      next: nextLevel,
      progress: nextLevel ? ((points - currentLevel.minPoints) / (nextLevel.minPoints - currentLevel.minPoints)) * 100 : 100,
      pointsToNext: nextLevel ? nextLevel.minPoints - points : 0
    };
  }

  // Получить информацию о пользователе для таблицы лидеров
  getUserLeaderboardInfo() {
    const levelInfo = this.getLevelInfo();
    return {
      name: "Анна Петрова", // В реальном приложении это было бы из профиля
      points: this.points,
      level: levelInfo.current,
      completedAssignments: this.assignments.filter(a => a.status === 'Завершено').length,
      joinDate: "2023-01-15"
    };
  }

  // Сбросить все данные (для тестирования)
  resetData() {
    this.assignments = [];
    this.points = 0;
    localStorage.removeItem('userStore');
    this.notify();
  }
}

// Создаем единственный экземпляр store
const userStore = new UserStore();

export default userStore;