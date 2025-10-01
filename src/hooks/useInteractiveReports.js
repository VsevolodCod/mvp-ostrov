import { useState, useEffect } from 'react';
import reportStore from '@/lib/reportStore.js';

export const useInteractiveReports = () => {
  const [reports, setReports] = useState({
    active: reportStore.activeReports,
    completed: reportStore.completedReports
  });

  useEffect(() => {
    const unsubscribe = reportStore.subscribe((newReports) => {
      setReports(newReports);
    });

    return unsubscribe;
  }, []);

  const createReport = (assignment) => {
    return reportStore.createReport(assignment);
  };

  const getActiveReport = (assignmentId) => {
    return reportStore.getActiveReport(assignmentId);
  };

  const updateCheckpoint = (reportId, checkpointId, data) => {
    return reportStore.updateCheckpoint(reportId, checkpointId, data);
  };

  const updateBlockAnswer = (reportId, blockId, questionId, answer) => {
    return reportStore.updateBlockAnswer(reportId, blockId, questionId, answer);
  };

  const addPhotoToAnswer = (reportId, blockId, questionId, photo) => {
    return reportStore.addPhotoToAnswer(reportId, blockId, questionId, photo);
  };

  const completeReport = (reportId) => {
    return reportStore.completeReport(reportId);
  };

  const getUserReportStats = () => {
    return reportStore.getUserReportStats();
  };

  return {
    reports,
    createReport,
    getActiveReport,
    updateCheckpoint,
    updateBlockAnswer,
    addPhotoToAnswer,
    completeReport,
    getUserReportStats
  };
};