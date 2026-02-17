import axiosInstance from './axiosConfig';

export const demoApi = {
  // Submit demo request
  requestDemo: async (demoData) => {
    try {
      const response = await axiosInstance.post('/demo/request', demoData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to submit demo request' };
    }
  },

  // Submit contact form
  submitContact: async (contactData) => {
    try {
      const response = await axiosInstance.post('/contact', contactData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to submit contact form' };
    }
  },

  // Update user profile
  updateProfile: async (profileData) => {
    try {
      const response = await axiosInstance.put('/profile', profileData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update profile' };
    }
  },
};