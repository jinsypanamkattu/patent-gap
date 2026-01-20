import React, { useReducer, useEffect, createContext } from 'react';
import { reducer } from './reducer';
import { initialState } from './initialState';
import { ACTIONS } from './actions';
import { authApi } from '../api/authApi';
import { patentApi } from '../api/patentApi';

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (storedUser && token) {
      const user = JSON.parse(storedUser);
      dispatch({ type: ACTIONS.LOGIN, payload: user });
      loadPatents();
    }
  }, []);

  const loadPatents = async () => {
    try {
      // In production, use real API call
      // const response = await patentApi.getAllPatents();
      // dispatch({ type: ACTIONS.SET_PATENTS, payload: response.data });
      
      // For now, use mock data
      const { mockPatents } = await import('../utils/mockData');
      dispatch({ type: ACTIONS.SET_PATENTS, payload: mockPatents });
    } catch (error) {
      console.error('Failed to load patents:', error);
    }
  };

  const login = async (email, password) => {
    try {
      // In production, use real API call
      // const response = await authApi.login(email, password);
      // const user = response.user;
      
      // For now, use mock data
      const user = { 
        id: 1, 
        name: 'John Doe', 
        email, 
        company: 'Tech Innovations Inc.' 
      };
      
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', 'mock-jwt-token');
      
      dispatch({ type: ACTIONS.LOGIN, payload: user });
      await loadPatents();
      
      return { success: true };
    } catch (error) {
      console.error('Login failed:', error);
      return { success: false, error: error.message };
    }
  };

  const register = async (name, email, password, company) => {
    try {
      // In production, use real API call
      // const response = await authApi.register(name, email, password, company);
      // const user = response.user;
      
      // For now, use mock data
      const user = { id: Date.now(), name, email, company };
      
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', 'mock-jwt-token');
      
      dispatch({ type: ACTIONS.REGISTER, payload: user });
      await loadPatents();
      
      return { success: true };
    } catch (error) {
      console.error('Registration failed:', error);
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      // In production, use real API call
      // await authApi.logout();
      
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      dispatch({ type: ACTIONS.LOGOUT });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const setPage = (page) => {
    dispatch({ type: ACTIONS.SET_PAGE, payload: page });
  };

  return (
    <StoreContext.Provider value={{ 
      state, 
      login, 
      register, 
      dispatch,
      logout, 
      setPage,
      loadPatents 
    }}>
      {children}
    </StoreContext.Provider>
  );
};