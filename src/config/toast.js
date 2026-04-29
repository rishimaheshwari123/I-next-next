import { toast } from 'react-toastify';

// Custom toast configurations
export const toastConfig = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

// Custom toast functions
export const showSuccessToast = (message, options = {}) => {
  toast.success(message, {
    ...toastConfig,
    ...options,
  });
};

export const showErrorToast = (message, options = {}) => {
  toast.error(message, {
    ...toastConfig,
    autoClose: 4000,
    ...options,
  });
};

export const showInfoToast = (message, options = {}) => {
  toast.info(message, {
    ...toastConfig,
    ...options,
  });
};

export const showWarningToast = (message, options = {}) => {
  toast.warning(message, {
    ...toastConfig,
    ...options,
  });
};

export const showLoadingToast = (message, options = {}) => {
  return toast.loading(message, {
    position: "top-right",
    ...options,
  });
};

// Login specific toasts
export const loginToasts = {
  loading: () => showLoadingToast("Logging in..."),
  success: (userName) => showSuccessToast(`Welcome back, ${userName}! 🎉`),
  error: (message) => showErrorToast(message || "Login failed. Please try again! ❌"),
  accessDenied: () => showErrorToast("Access denied. Admin privileges required! ❌", { autoClose: 5000 }),
  networkError: () => showErrorToast("Network error. Please check your connection! 🌐"),
};

// Logout specific toasts
export const logoutToasts = {
  loading: () => showLoadingToast("Logging out..."),
  success: () => showSuccessToast("Logged out successfully! See you soon! 👋", { autoClose: 2000 }),
};

// Dashboard specific toasts
export const dashboardToasts = {
  welcome: (userName) => showSuccessToast(`Welcome to your dashboard, ${userName}! 🚀`, { autoClose: 4000 }),
};