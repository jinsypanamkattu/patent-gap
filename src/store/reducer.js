import { ACTIONS } from './actions';

export const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.LOGIN:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        currentPage: 'dashboard'
      };
    case ACTIONS.REGISTER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        currentPage: 'dashboard'
      };
    case ACTIONS.LOGOUT:
      return {
        ...state,
        user: null,
        patents: [],
        isAuthenticated: false,
        currentPage: 'home'
      };
    case ACTIONS.SET_PATENTS:
      return {
        ...state,
        patents: action.payload
      };
     case ACTIONS.SET_PAGE:
          return {
            ...state,
            currentPage: action.payload.page || action.payload,
            pageData: action.payload.data || null  // ADDED: Store page data
          };
    default:
      return state;
  }
};