import { useState, useEffect } from 'react';

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
    
    setTakenAssignments(prev => [...prev, assignment]);
    return true;
  };

  const isAssignmentTaken = (assignmentId) => {
    return takenAssignments.some(assignment => assignment.id === assignmentId);
  };

  const getUserAssignments = () => {
    return takenAssignments;
  };

  return {
    takeAssignment,
    isAssignmentTaken,
    getUserAssignments,
    takenAssignments
  };
};

// Экспортируем также как useUserAssignments для совместимости
export const useUserAssignments = useAssignments;