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

  // Lead Management
  CREATE_LEAD: `${BASE_URL}/lead`,
  GET_ALL_LEADS: `${BASE_URL}/lead/all`,
  GET_LEAD_STATS: `${BASE_URL}/lead/stats`,
  GET_FOLLOW_UPS: `${BASE_URL}/lead/follow-ups`,
  GET_LEAD: (id) => `${BASE_URL}/lead/${id}`,
  UPDATE_LEAD: (id) => `${BASE_URL}/lead/${id}`,
  DELETE_LEAD: (id) => `${BASE_URL}/lead/${id}`,
  UPDATE_LEAD_STATUS: (id) => `${BASE_URL}/lead/${id}/status`,
  ASSIGN_LEAD: (id) => `${BASE_URL}/lead/${id}/assign`,
  ADD_ADMIN_NOTES: (id) => `${BASE_URL}/lead/${id}/admin-notes`,

  // Employee Lead Management
  MY_LEADS: `${BASE_URL}/lead/my-leads`,
  UPDATE_MY_LEAD_STATUS: (id) => `${BASE_URL}/lead/${id}/my-status`,
  ADD_LEAD_NOTES: (id) => `${BASE_URL}/lead/${id}/notes`,

  // Staff Management
  CREATE_STAFF: `${BASE_URL}/staff`,
  GET_ALL_STAFF: `${BASE_URL}/staff`,
  GET_STAFF_STATS: `${BASE_URL}/staff/stats`,
  GET_STAFF: (id) => `${BASE_URL}/staff/${id}`,
  UPDATE_STAFF: (id) => `${BASE_URL}/staff/${id}`,
  UPDATE_STAFF_PERMISSIONS: (id) => `${BASE_URL}/staff/${id}/permissions`,
  DELETE_STAFF: (id) => `${BASE_URL}/staff/${id}`,

  // Project Management
  CREATE_PROJECT: `${BASE_URL}/project`,
  GET_ALL_PROJECTS: `${BASE_URL}/project/all`,
  GET_PROJECT_STATS: `${BASE_URL}/project/stats`,
  GET_PROJECT: (id) => `${BASE_URL}/project/${id}`,
  UPDATE_PROJECT: (id) => `${BASE_URL}/project/${id}`,
  DELETE_PROJECT: (id) => `${BASE_URL}/project/${id}`,
  ASSIGN_EMPLOYEES_PROJECT: (id) => `${BASE_URL}/project/${id}/assign`,
  UPDATE_PROJECT_PROGRESS: (id) => `${BASE_URL}/project/${id}/progress`,
  GET_CLIENT_PROJECTS: `${BASE_URL}/project/client/my-projects`,
  GET_EMPLOYEE_PROJECTS: `${BASE_URL}/project/employee/my-projects`,
  GET_PROJECTS_BY_CLIENT_ID: (clientId) => `${BASE_URL}/project/client/${clientId}`, // New endpoint

  // Project Chat
  SEND_PROJECT_MESSAGE: (projectId) => `${BASE_URL}/project-chat/${projectId}/message`,
  GET_PROJECT_MESSAGES: (projectId) => `${BASE_URL}/project-chat/${projectId}/messages`,
  MARK_MESSAGE_READ: (messageId) => `${BASE_URL}/project-chat/message/${messageId}/read`,
  MARK_ALL_READ_PROJECT: (projectId) => `${BASE_URL}/project-chat/${projectId}/read-all`,
  GET_UNREAD_COUNT_PROJECT: `${BASE_URL}/project-chat/unread-count`,
  GET_UNREAD_COUNT_BY_PROJECT: (projectId) => `${BASE_URL}/project-chat/${projectId}/unread-count`,

  // Service Management
  CREATE_SERVICE: `${BASE_URL}/service`,
  GET_ALL_SERVICES: `${BASE_URL}/service/all`,
  GET_SERVICE: (id) => `${BASE_URL}/service/${id}`,
  UPDATE_SERVICE: (id) => `${BASE_URL}/service/${id}`,
  DELETE_SERVICE: (id) => `${BASE_URL}/service/${id}`,
  GET_SERVICE_STATS: `${BASE_URL}/service/stats`,

  // Service Variants
  CREATE_VARIANT: (serviceId) => `${BASE_URL}/service/${serviceId}/variant`,
  GET_VARIANTS: (serviceId) => `${BASE_URL}/service/${serviceId}/variants`,
  GET_VARIANT: (id) => `${BASE_URL}/service/variant/${id}`,
  UPDATE_VARIANT: (id) => `${BASE_URL}/service/variant/${id}`,
  DELETE_VARIANT: (id) => `${BASE_URL}/service/variant/${id}`,

  // Service Inquiries
  CREATE_INQUIRY: `${BASE_URL}/service/inquiry/create`,
  GET_ALL_INQUIRIES: `${BASE_URL}/service/inquiry/all`,
  GET_MY_INQUIRIES: `${BASE_URL}/service/inquiry/my-inquiries`,
  GET_INQUIRY: (id) => `${BASE_URL}/service/inquiry/${id}`,
  UPDATE_INQUIRY_STATUS: (id) => `${BASE_URL}/service/inquiry/${id}/status`,
  GET_INQUIRY_STATS: `${BASE_URL}/service/inquiry/stats`,

  // Revenue Management
  GET_REVENUE_STATS: `${BASE_URL}/revenue/stats`,
  GET_REVENUE_DETAILS: `${BASE_URL}/revenue/details`,

  // Dashboard
  GET_DASHBOARD_STATS: `${BASE_URL}/dashboard/stats`,
};

export { BASE_URL };
