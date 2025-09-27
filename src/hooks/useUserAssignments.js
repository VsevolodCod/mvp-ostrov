import { useState, useEffect } from 'react';
import userStore from '@/lib/userStore.js';

export const useUserAssignments = () => {
  const [assignments, setAssignments] = useState(userStore.getUserAssignments());

  useEffect(() => {
    // Подписываемся на изменения в store
    const unsubscribe = userStore.subscribe((newAssignments) => {
      setAssignments([...newAssignments]);
    });

    // Отписываемся при размонтировании компонента
    return unsubscribe;
  }, []);

  const takeAssignment = (assignment) => {
    return userStore.takeAssignment(assignment);
  };

  const completeAssignment = (assignmentId) => {
    return userStore.completeAssignment(assignmentId);
  };

  const cancelAssignment = (assignmentId) => {
    return userStore.cancelAssignment(assignmentId);
  };

  const isAssignmentTaken = (assignmentId) => {
    return userStore.isAssignmentTaken(assignmentId);
  };

  const getUserStats = () => {
    return userStore.getUserStats();
  };

  return {
    assignments,
    takeAssignment,
    completeAssignment,
    cancelAssignment,
    isAssignmentTaken,
    getUserStats
  };
};