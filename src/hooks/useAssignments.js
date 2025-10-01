import { useState, useEffect } from 'react';
import { pointsSystem } from '@/lib/pointsSystem.js';

export const useAssignments = () => {
  const [takenAssignments, setTakenAssignments] = useState([]);

  // Загружаем взятые задания из localStorage при инициализации
  useEffect(() => {
    const saved = localStorage.getItem('takenAssignments');
    if (saved) {
      setTakenAssignments(JSON.parse(saved));
    }
  }, []);

  // Сохраняем в localStorage при изменении
  useEffect(() => {
    localStorage.setItem('takenAssignments', JSON.stringify(takenAssignments));
  }, [takenAssignments]);

  const takeAssignment = (assignment) => {
    if (isAssignmentTaken(assignment.id)) {
      return false;
    }
    
    const assignmentWithStatus = {
      ...assignment,
      status: 'Активное',
      takenAt: new Date().toISOString(),
      progress: 0
    };
    
    setTakenAssignments(prev => [...prev, assignmentWithStatus]);
    
    // Добавляем очки за взятие задания
    pointsSystem.addPoints(50, `Взято задание: ${assignment.hotel_name}`);
    
    return true;
  };

  const completeAssignment = (assignmentId) => {
    const assignment = takenAssignments.find(a => a.id === assignmentId);
    if (!assignment) return false;

    setTakenAssignments(prev => 
      prev.map(a => 
        a.id === assignmentId 
          ? { ...a, status: 'Завершено', completedAt: new Date().toISOString() }
          : a
      )
    );

    // Добавляем очки за завершение
    const points = assignment.reward_points || 200;
    pointsSystem.addPoints(points, `Завершено задание: ${assignment.hotel_name}`);
    
    return { success: true, pointsEarned: points };
  };

  const cancelAssignment = (assignmentId) => {
    setTakenAssignments(prev => prev.filter(a => a.id !== assignmentId));
    return true;
  };

  const isAssignmentTaken = (assignmentId) => {
    return takenAssignments.some(assignment => assignment.id === assignmentId);
  };

  const getUserAssignments = () => {
    return takenAssignments;
  };

  const getUserStats = () => {
    const completed = takenAssignments.filter(a => a.status === 'Завершено').length;
    const active = takenAssignments.filter(a => a.status === 'Активное').length;
    
    return {
      completed,
      active,
      total: takenAssignments.length,
      points: pointsSystem.getUserPoints(),
      level: pointsSystem.getUserLevel()
    };
  };

  return {
    takeAssignment,
    isAssignmentTaken,
    getUserAssignments,
    takenAssignments,
    completeAssignment,
    cancelAssignment,
    getUserStats,
    points: pointsSystem.getUserPoints()
  };
};

// Экспортируем также как useUserAssignments для совместимости
export const useUserAssignments = useAssignments;