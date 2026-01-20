import axiosInstance from './axiosConfig';

export const authApi = {
  // Login user
  login: async (email, password) => {
    try {
      const response = await axiosInstance.post('/auth/login', {
        email,
        password,
      });
      
      // Store token and user data
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Login failed' };
    }
  },

  // Register new user
  register: async (name, email, password, company) => {
    try {
      const response = await axiosInstance.post('/auth/register', {
        name,
        email,
        password,
        company,
      });
      
      // Store token and user data
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Registration failed' };
    }
  },

  // Forgot password
  forgotPassword: async (email) => {
    try {
      const response = await axiosInstance.post('/auth/forgot-password', {
        email,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to send reset link' };
    }
  },

  // Reset password
  resetPassword: async (token, newPassword) => {
    try {
      const response = await axiosInstance.post('/auth/reset-password', {
        token,
        newPassword,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Password reset failed' };
    }
  },

  // Logout
  logout: async () => {
    try {
      await axiosInstance.post('/auth/logout');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } catch (error) {
      // Even if API call fails, remove local data
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },

  // Get current user profile
  getCurrentUser: async () => {
    try {
      const response = await axiosInstance.get('/auth/me');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch user data' };
    }
  },
};