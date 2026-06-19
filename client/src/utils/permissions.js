/**
 * Permission Utility Functions
 * Used to check user permissions throughout the application
 */

/**
 * Check if user has a specific permission
 * @param {Object} user - User object from localStorage
 * @param {String} permission - Permission key to check
 * @returns {Boolean} - True if user has permission, false otherwise
 */
export const hasPermission = (user, permission) => {
  // Super admin (isStaff = false) has all access
  if (!user?.isStaff) return true;
  
  // Staff members need specific permission
  return user?.permissions?.[permission] === true;
};

/**
 * Check if user has any of the specified permissions
 * @param {Object} user - User object from localStorage
 * @param {Array} permissions - Array of permission keys to check
 * @returns {Boolean} - True if user has any of the permissions
 */
export const hasAnyPermission = (user, permissions) => {
  if (!user?.isStaff) return true;
  
  return permissions.some(permission => user?.permissions?.[permission] === true);
};

/**
 * Check if user has all of the specified permissions
 * @param {Object} user - User object from localStorage
 * @param {Array} permissions - Array of permission keys to check
 * @returns {Boolean} - True if user has all of the permissions
 */
export const hasAllPermissions = (user, permissions) => {
  if (!user?.isStaff) return true;
  
  return permissions.every(permission => user?.permissions?.[permission] === true);
};

/**
 * Get user from localStorage
 * @returns {Object|null} - User object or null if not found
 */
export const getCurrentUser = () => {
  if (typeof window === 'undefined') return null;
  
  const userData = localStorage.getItem('user');
  return userData ? JSON.parse(userData) : null;
};

/**
 * Check if user is super admin
 * @param {Object} user - User object from localStorage
 * @returns {Boolean} - True if user is super admin
 */
export const isSuperAdmin = (user) => {
  return user?.role === 'admin' && !user?.isStaff;
};

/**
 * Check if user is staff member
 * @param {Object} user - User object from localStorage
 * @returns {Boolean} - True if user is staff member
 */
export const isStaffMember = (user) => {
  return user?.role === 'admin' && user?.isStaff === true;
};

/**
 * Permission keys mapping
 */
export const PERMISSIONS = {
  DASHBOARD: 'dashboard',
  BLOGS: 'blogs',
  CLIENT_PLANS: 'clientPlans',
  MANAGE_CLIENTS: 'manageClients',
  SERVER_HOSTING: 'serverHosting',
  CONTACTS: 'contacts',
  DOMAIN_INQUIRIES: 'domainInquiries',
  ADVERTISEMENTS: 'advertisements',
  SUPPORT_TICKETS: 'supportTickets',
  CONTACT_INQUIRIES: 'contactInquiries',
  AI_CHATBOT: 'aiChatbot',
  EMPLOYEES: 'employees',
  ATTENDANCE: 'attendance',
  LEAVE_REQUESTS: 'leaveRequests',
  TASKS: 'tasks',
  LEAD_MANAGEMENT: 'leadManagement',
  STAFF_MANAGEMENT: 'staffManagement',
};
