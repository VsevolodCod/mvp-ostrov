// Простое глобальное состояние для управления заданиями пользователя
// В реальном приложении это было бы в Redux, Zustand или Context API

class UserStore {
  constructor() {
    this.assignments = [];
    this.listeners = [];
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
    this.listeners.forEach(listener => listener(this.assignments));
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
  completeAssignment(assignmentId) {
    const assignment = this.assignments.find(a => a.id === assignmentId);
    if (assignment) {
      assignment.status = 'Завершено';
      assignment.completedAt = new Date().toISOString();
      this.notify();
      return true;
    }
    return false;
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
    
    return {
      total,
      active,
      completed
    };
  }
}

// Создаем единственный экземпляр store
const userStore = new UserStore();

export default userStore;