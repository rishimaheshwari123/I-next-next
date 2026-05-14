// API Configuration
// const BASE_URL = 'http://localhost:8080/api/v1';
const BASE_URL = 'https://i-next-next.onrender.com/api/v1';

// Employee Management API Endpoints
export const EMPLOYEE_API = {
  // Employee
  REGISTER: `${BASE_URL}/employee/register`,
  GET_ALL: `${BASE_URL}/employee/all`,
  GET_BY_ID: (id) => `${BASE_URL}/employee/${id}`,
  GET_MY_PROFILE: `${BASE_URL}/employee/profile/me`,
  UPDATE_MY_PROFILE: `${BASE_URL}/employee/profile/me`,
  UPDATE: (id) => `${BASE_URL}/employee/${id}`,
  DELETE: (id) => `${BASE_URL}/employee/${id}`,
  GET_STATS: `${BASE_URL}/employee/stats`,

  // Attendance
  PUNCH_IN: `${BASE_URL}/attendance/punch-in`,
  PUNCH_OUT: `${BASE_URL}/attendance/punch-out`,
  MY_ATTENDANCE: `${BASE_URL}/attendance/my-attendance`,
  TODAY_STATUS: `${BASE_URL}/attendance/today-status`,
  ALL_ATTENDANCE: `${BASE_URL}/attendance/all`,
  EMPLOYEE_ATTENDANCE: (id) => `${BASE_URL}/attendance/employee/${id}`,
  MARK_ATTENDANCE: `${BASE_URL}/attendance/mark`,
  ATTENDANCE_REPORT: `${BASE_URL}/attendance/report`,

  // Leave
  APPLY_LEAVE: `${BASE_URL}/leave/apply`,
  MY_LEAVES: `${BASE_URL}/leave/my-leaves`,
  ALL_LEAVES: `${BASE_URL}/leave/all`,
  APPROVE_LEAVE: (id) => `${BASE_URL}/leave/approve/${id}`,
  REJECT_LEAVE: (id) => `${BASE_URL}/leave/reject/${id}`,
  CANCEL_LEAVE: (id) => `${BASE_URL}/leave/cancel/${id}`,
  LEAVE_STATS: `${BASE_URL}/leave/stats`,

  // Task
  CREATE_TASK: `${BASE_URL}/task/create`,
  ALL_TASKS: `${BASE_URL}/task/all`,
  MY_TASKS: `${BASE_URL}/task/my-tasks`,
  GET_TASK: (id) => `${BASE_URL}/task/${id}`,
  UPDATE_TASK: (id) => `${BASE_URL}/task/${id}`,
  UPDATE_TASK_STATUS: (id) => `${BASE_URL}/task/update-status/${id}`,
  DELETE_TASK: (id) => `${BASE_URL}/task/${id}`,
  TASK_STATS: `${BASE_URL}/task/stats`,

  // Task Chat
  SEND_MESSAGE: (taskId) => `${BASE_URL}/task-chat/${taskId}/message`,
  GET_MESSAGES: (taskId) => `${BASE_URL}/task-chat/${taskId}/messages`,
  EDIT_MESSAGE: (chatId) => `${BASE_URL}/task-chat/message/${chatId}`,
  DELETE_MESSAGE: (chatId) => `${BASE_URL}/task-chat/message/${chatId}`,
  MARK_AS_READ: (chatId) => `${BASE_URL}/task-chat/message/${chatId}/read`,
  MARK_ALL_READ: (taskId) => `${BASE_URL}/task-chat/${taskId}/read-all`,
  UNREAD_COUNT: `${BASE_URL}/task-chat/unread-count`,
};

export { BASE_URL };
