// Система определения приоритета проверки отелей

export class HotelPrioritySystem {
  
  // Определить категорию отеля
  static categorizeHotel(hotel) {
    const reviewCount = hotel.review_count || 0;
    const hasDetailedReviews = hotel.detailed_reviews || false;
    
    if (reviewCount >= 100 && hasDetailedReviews) {
      return 'recognized'; // Признанные - Top-stays
    }
    return 'regular'; // Обычные
  }

  // Рассчитать приоритет отеля
  static calculatePriority(hotel) {
    let priorityScore = 0;
    const reasons = [];

    // 1. Категория отеля (базовый множитель)
    const category = this.categorizeHotel(hotel);
    const categoryMultiplier = category === 'recognized' ? 1.2 : 1.0;

    // 2. Количество отзывов и их актуальность
    const reviewCount = hotel.review_count || 0;
    const lastReviewDate = hotel.last_review_date ? new Date(hotel.last_review_date) : null;
    const monthsAgo = lastReviewDate ? this.getMonthsAgo(lastReviewDate) : 12;

    if (reviewCount < 20) {
      priorityScore += 30;
      reasons.push('Мало отзывов');
    }

    if (monthsAgo > 3) {
      priorityScore += 25;
      reasons.push('Устаревшие отзывы');
    }

    // 3. Давность последнего отчета секретного гостя
    const lastSecretGuestDate = hotel.last_secret_guest_date ? new Date(hotel.last_secret_guest_date) : null;
    const monthsSinceLastCheck = lastSecretGuestDate ? this.getMonthsAgo(lastSecretGuestDate) : 12;

    if (monthsSinceLastCheck > 3) {
      priorityScore += 35;
      reasons.push('Давно не проверялся');
    }

    // 4. Динамика оценок
    const ratingTrend = this.calculateRatingTrend(hotel);
    if (ratingTrend < -0.2) {
      priorityScore += 40;
      reasons.push('Снижение рейтинга');
    }

    // 5. Близость сезона отпусков
    const seasonMultiplier = this.getSeasonMultiplier();
    priorityScore *= seasonMultiplier;

    if (seasonMultiplier > 1) {
      reasons.push('Сезон отпусков');
    }

    // 6. Процент посещений секретных гостей
    const secretGuestVisitRate = hotel.secret_guest_visit_rate || 0;
    if (secretGuestVisitRate < 0.1) { // Менее 10%
      priorityScore += 20;
      reasons.push('Низкий процент проверок');
    }

    // Применяем категорийный множитель
    priorityScore *= categoryMultiplier;

    // Определяем итоговый приоритет
    let priority = 'Низкий';
    if (priorityScore >= 80) {
      priority = 'Высокий';
    } else if (priorityScore >= 50) {
      priority = 'Средний';
    }

    return {
      priority,
      score: Math.round(priorityScore),
      category,
      reasons,
      recommendedReward: this.calculateRecommendedReward(priorityScore, category)
    };
  }

  // Рассчитать тренд рейтинга
  static calculateRatingTrend(hotel) {
    const ratings = hotel.rating_history || [];
    if (ratings.length < 2) return 0;

    // Простой расчет тренда за последние 3 месяца
    const recent = ratings.slice(-3);
    const older = ratings.slice(-6, -3);

    if (older.length === 0) return 0;

    const recentAvg = recent.reduce((sum, r) => sum + r.rating, 0) / recent.length;
    const olderAvg = older.reduce((sum, r) => sum + r.rating, 0) / older.length;

    return recentAvg - olderAvg;
  }

  // Получить множитель сезона
  static getSeasonMultiplier() {
    const now = new Date();
    const month = now.getMonth() + 1; // 1-12

    // Повышаем приоритет перед сезонами отпусков
    // Май-июнь (перед летом), Ноябрь-декабрь (перед зимними праздниками)
    if ([5, 6, 11, 12].includes(month)) {
      return 1.3;
    }

    // Март-апрель (перед майскими и летом)
    if ([3, 4].includes(month)) {
      return 1.2;
    }

    return 1.0;
  }

  // Рассчитать количество месяцев назад
  static getMonthsAgo(date) {
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.floor(diffDays / 30);
  }

  // Рассчитать рекомендуемое вознаграждение
  static calculateRecommendedReward(priorityScore, category) {
    let baseReward = 300; // Базовые баллы

    // Увеличиваем награду для высокоприоритетных отелей
    if (priorityScore >= 80) {
      baseReward = 500;
    } else if (priorityScore >= 50) {
      baseReward = 400;
    }

    // Бонус для признанных отелей (они сложнее для проверки)
    if (category === 'recognized') {
      baseReward += 100;
    }

    // Определяем тип награды
    let rewardType = 'discount';
    let discountPercent = 60;

    if (priorityScore >= 70) {
      rewardType = 'free';
      discountPercent = 100;
    } else if (priorityScore >= 50) {
      discountPercent = 80;
    }

    return {
      type: rewardType,
      points: baseReward,
      discountPercent,
      description: rewardType === 'free' 
        ? `Бесплатное проживание + ${baseReward} баллов`
        : `${discountPercent}% скидка + ${baseReward} баллов`
    };
  }

  // Обновить приоритеты всех отелей
  static updateAllHotelPriorities(hotels) {
    return hotels.map(hotel => {
      const priorityData = this.calculatePriority(hotel);
      return {
        ...hotel,
        priority: priorityData.priority,
        priority_score: priorityData.score,
        priority_reasons: priorityData.reasons,
        recommended_reward: priorityData.recommendedReward,
        category: priorityData.category
      };
    });
  }

  // Получить отели, требующие срочной проверки
  static getUrgentHotels(hotels) {
    return this.updateAllHotelPriorities(hotels)
      .filter(hotel => hotel.priority === 'Высокий')
      .sort((a, b) => b.priority_score - a.priority_score);
  }

  // Получить рекомендации для менеджеров
  static getManagerRecommendations(hotels) {
    const updatedHotels = this.updateAllHotelPriorities(hotels);
    
    const stats = {
      total: updatedHotels.length,
      highPriority: updatedHotels.filter(h => h.priority === 'Высокий').length,
      mediumPriority: updatedHotels.filter(h => h.priority === 'Средний').length,
      lowPriority: updatedHotels.filter(h => h.priority === 'Низкий').length,
      recognized: updatedHotels.filter(h => h.category === 'recognized').length,
      needsUrgentAttention: updatedHotels.filter(h => h.priority_score >= 90).length
    };

    const recommendations = [];

    if (stats.highPriority > stats.total * 0.3) {
      recommendations.push('Высокий процент отелей требует срочной проверки. Рекомендуется увеличить количество секретных гостей.');
    }

    if (stats.needsUrgentAttention > 0) {
      recommendations.push(`${stats.needsUrgentAttention} отелей требуют немедленного внимания (критический приоритет).`);
    }

    const seasonMultiplier = this.getSeasonMultiplier();
    if (seasonMultiplier > 1.2) {
      recommendations.push('Сезон отпусков близко. Рекомендуется увеличить бюджет на программу секретных гостей.');
    }

    return {
      stats,
      recommendations,
      urgentHotels: updatedHotels.filter(h => h.priority_score >= 90).slice(0, 5)
    };
  }
}

export default HotelPrioritySystem;