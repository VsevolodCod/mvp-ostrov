import { useState, useEffect } from 'react';
import userStore from '@/lib/userStore.js';

export const useUserAssignments = () => {
  const [assignments, setAssignments] = useState(userStore.getUserAssignments());
  const [points, setPoints] = useState(userStore.getPoints());

  useEffect(() => {
    // Подписываемся на изменения в store
    const unsubscribe = userStore.subscribe((newAssignments, newPoints) => {
      setAssignments([...newAssignments]);
      setPoints(newPoints);
    });

    // Отписываемся при размонтировании компонента
    return unsubscribe;
  }, []);

  const takeAssignment = (assignment) => {
    return userStore.takeAssignment(assignment);
  };

  const completeAssignment = (assignmentId, reportData) => {
    return userStore.completeAssignment(assignmentId, reportData);
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

  const addPoints = (amount) => {
    return userStore.addPoints(amount);
  };

  const resetData = () => {
    return userStore.resetData();
  };

  const getLevelInfo = () => {
    return userStore.getLevelInfo();
  };

  const getUserLeaderboardInfo = () => {
    return userStore.getUserLeaderboardInfo();
  };

  return {
    assignments,
    points,
    takeAssignment,
    completeAssignment,
    cancelAssignment,
    isAssignmentTaken,
    getUserStats,
    addPoints,
    resetData,
    getLevelInfo,
    getUserLeaderboardInfo
  };
};