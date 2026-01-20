// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    ME: '/auth/me',
  },
  PATENTS: {
    BASE: '/patents',
    ACTIVE: '/patents?status=active',
    CLOSED: '/patents?status=closed',
  },
  CASES: {
    BASE: '/cases',
  },
  DEMO: {
    REQUEST: '/demo/request',
  },
  CONTACT: {
    BASE: '/contact',
  },
  PROFILE: {
    BASE: '/profile',
  },
};

// Status codes
export const STATUS_CODES = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};

// Patent status
export const PATENT_STATUS = {
  ACTIVE: 'active',
  CLOSED: 'closed',
  PENDING: 'pending',
};

// Case status
export const CASE_STATUS = {
  IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed',
  PENDING: 'Pending',
};