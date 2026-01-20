import axiosInstance from './axiosConfig';

export const patentApi = {
  // Get all patents for logged-in user
  getAllPatents: async () => {
    try {
      const response = await axiosInstance.get('/patents');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch patents' };
    }
  },

  // Get single patent by ID
  getPatentById: async (patentId) => {
    try {
      const response = await axiosInstance.get(`/patents/${patentId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch patent details' };
    }
  },

  // Get active patents
  getActivePatents: async () => {
    try {
      const response = await axiosInstance.get('/patents?status=active');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch active patents' };
    }
  },

  // Get closed patents
  getClosedPatents: async () => {
    try {
      const response = await axiosInstance.get('/patents?status=closed');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch closed patents' };
    }
  },

  // Create new patent
  createPatent: async (patentData) => {
    try {
      const response = await axiosInstance.post('/patents', patentData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create patent' };
    }
  },

  // Update patent
  updatePatent: async (patentId, patentData) => {
    try {
      const response = await axiosInstance.put(`/patents/${patentId}`, patentData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update patent' };
    }
  },

  // Delete patent
  deletePatent: async (patentId) => {
    try {
      const response = await axiosInstance.delete(`/patents/${patentId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete patent' };
    }
  },

  // Get all cases
  getAllCases: async () => {
    try {
      const response = await axiosInstance.get('/cases');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch cases' };
    }
  },

  // Get case by ID
  getCaseById: async (caseId) => {
    try {
      const response = await axiosInstance.get(`/cases/${caseId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch case details' };
    }
  },

  // Upload patent document
  uploadDocument: async (patentId, formData) => {
    try {
      const response = await axiosInstance.post(
        `/patents/${patentId}/documents`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to upload document' };
    }
  },

  // Download patent document
  downloadDocument: async (patentId, documentId) => {
    try {
      const response = await axiosInstance.get(
        `/patents/${patentId}/documents/${documentId}`,
        {
          responseType: 'blob',
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to download document' };
    }
  },
};