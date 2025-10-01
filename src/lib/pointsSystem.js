// Система очков и достижений
export class PointsSystem {
  constructor() {
    this.pointsKey = 'userPoints';
    this.achievementsKey = 'userAchievements';
    this.leaderboardKey = 'leaderboard';
  }

  // Получить текущие очки пользователя
  getUserPoints() {
    return parseInt(localStorage.getItem(this.pointsKey) || '0');
  }

  // Добавить очки
  addPoints(points, reason = '') {
    const currentPoints = this.getUserPoints();
    const newPoints = currentPoints + points;
    localStorage.setItem(this.pointsKey, newPoints.toString());
    
    // Записываем в историю
    this.addPointsHistory(points, reason);
    
    // Проверяем достижения
    this.checkAchievements(newPoints);
    
    // Обновляем таблицу лидеров
    this.updateLeaderboard(newPoints);
    
    return newPoints;
  }

  // История очков
  addPointsHistory(points, reason) {
    const history = this.getPointsHistory();
    const entry = {
      id: Date.now(),
      points,
      reason,
      date: new Date().toISOString(),
      total: this.getUserPoints()
    };
    history.unshift(entry);
    
    // Храним только последние 50 записей
    if (history.length > 50) {
      history.splice(50);
    }
    
    localStorage.setItem('pointsHistory', JSON.stringify(history));
  }

  getPointsHistory() {
    return JSON.parse(localStorage.getItem('pointsHistory') || '[]');
  }

  // Система уровней
  getUserLevel() {
    const points = this.getUserPoints();
    if (points < 500) return { level: 1, name: 'Новичок', nextLevel: 500 };
    if (points < 1500) return { level: 2, name: 'Исследователь', nextLevel: 1500 };
    if (points < 3000) return { level: 3, name: 'Эксперт', nextLevel: 3000 };
    if (points < 5000) return { level: 4, name: 'Мастер', nextLevel: 5000 };
    if (points < 8000) return { level: 5, name: 'Гуру', nextLevel: 8000 };
    return { level: 6, name: 'Легенда', nextLevel: null };
  }

  // Достижения
  checkAchievements(points) {
    const achievements = this.getUserAchievements();
    const newAchievements = [];

    const possibleAchievements = [
      { id: 'first_points', name: 'Первые очки', description: 'Получите первые очки', threshold: 1 },
      { id: 'hundred_points', name: 'Сотня', description: 'Наберите 100 очков', threshold: 100 },
      { id: 'five_hundred', name: 'Пятьсот', description: 'Наберите 500 очков', threshold: 500 },
      { id: 'thousand', name: 'Тысяча', description: 'Наберите 1000 очков', threshold: 1000 },
      { id: 'expert', name: 'Эксперт', description: 'Достигните уровня Эксперт', threshold: 1500 },
      { id: 'master', name: 'Мастер', description: 'Достигните уровня Мастер', threshold: 3000 },
      { id: 'guru', name: 'Гуру', description: 'Достигните уровня Гуру', threshold: 5000 },
      { id: 'legend', name: 'Легенда', description: 'Достигните уровня Легенда', threshold: 8000 }
    ];

    possibleAchievements.forEach(achievement => {
      if (points >= achievement.threshold && !achievements.find(a => a.id === achievement.id)) {
        newAchievements.push({
          ...achievement,
          unlockedAt: new Date().toISOString()
        });
      }
    });

    if (newAchievements.length > 0) {
      const updatedAchievements = [...achievements, ...newAchievements];
      localStorage.setItem(this.achievementsKey, JSON.stringify(updatedAchievements));
      return newAchievements;
    }

    return [];
  }

  getUserAchievements() {
    return JSON.parse(localStorage.getItem(this.achievementsKey) || '[]');
  }

  // Таблица лидеров
  updateLeaderboard(points) {
    const leaderboard = this.getLeaderboard();
    const userName = this.getUserName();
    
    const existingEntry = leaderboard.find(entry => entry.name === userName);
    
    if (existingEntry) {
      existingEntry.points = points;
      existingEntry.lastUpdate = new Date().toISOString();
    } else {
      leaderboard.push({
        name: userName,
        points,
        level: this.getUserLevel().name,
        lastUpdate: new Date().toISOString()
      });
    }

    // Сортируем по очкам
    leaderboard.sort((a, b) => b.points - a.points);
    
    // Храним только топ-100
    if (leaderboard.length > 100) {
      leaderboard.splice(100);
    }

    localStorage.setItem(this.leaderboardKey, JSON.stringify(leaderboard));
  }

  getLeaderboard() {
    const defaultLeaderboard = [
      { name: 'Анна Петрова', points: 8500, level: 'Легенда', lastUpdate: '2024-10-01' },
      { name: 'Михаил Иванов', points: 7200, level: 'Гуру', lastUpdate: '2024-09-28' },
      { name: 'Елена Сидорова', points: 6800, level: 'Гуру', lastUpdate: '2024-09-30' },
      { name: 'Дмитрий Козлов', points: 5400, level: 'Гуру', lastUpdate: '2024-09-29' },
      { name: 'Ольга Морозова', points: 4900, level: 'Мастер', lastUpdate: '2024-09-27' },
      { name: 'Александр Попов', points: 4200, level: 'Мастер', lastUpdate: '2024-09-26' },
      { name: 'Мария Волкова', points: 3800, level: 'Мастер', lastUpdate: '2024-09-25' },
      { name: 'Сергей Новиков', points: 3200, level: 'Эксперт', lastUpdate: '2024-09-24' }
    ];

    const stored = localStorage.getItem(this.leaderboardKey);
    if (!stored) {
      localStorage.setItem(this.leaderboardKey, JSON.stringify(defaultLeaderboard));
      return defaultLeaderboard;
    }
    return JSON.parse(stored);
  }

  getUserName() {
    return localStorage.getItem('userName') || 'Гость';
  }

  setUserName(name) {
    localStorage.setItem('userName', name);
  }

  // Получить позицию пользователя в таблице лидеров
  getUserPosition() {
    const leaderboard = this.getLeaderboard();
    const userName = this.getUserName();
    const position = leaderboard.findIndex(entry => entry.name === userName);
    return position === -1 ? null : position + 1;
  }
}

export const pointsSystem = new PointsSystem();