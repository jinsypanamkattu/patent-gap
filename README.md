# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


# Smarter Patent Protection

A comprehensive patent management system built with React, Vite, Redux, and Axios.

## Features

- User Authentication (Login, Register, Forgot Password)
- Dashboard with Active/Closed Patents
- Patent Detail View
- Profile Management
- Case Management
- Request Demo Functionality
- Responsive Design with Tailwind CSS
- API Integration with Axios
- JWT Authentication
- Error Handling & Loading States

## Technologies Used

- React 18
- Vite
- Redux (Custom Implementation)
- Axios for API calls
- Tailwind CSS
- Lucide Icons

## Installation
```bash
npm install
```

## Environment Setup

Create a `.env` file in the root directory:
```env
VITE_API_BASE_URL=http://localhost:5173/api
VITE_APP_NAME=Smarter Patent Protection
VITE_APP_VERSION=22.14.0
```

## Development
```bash
npm run dev
```

The application will run on `http://localhost:3000`

## Build
```bash
npm run build
```

## API Integration

The application uses Axios for all API calls. The API configuration includes:

- JWT token management
- Request/Response interceptors
- Error handling
- Automatic token refresh
- Loading states

### API Endpoints

- **Auth**: `/api/auth/login`, `/api/auth/register`, `/api/auth/logout`
- **Patents**: `/api/patents`, `/api/patents/:id`
- **Cases**: `/api/cases`, `/api/cases/:id`
- **Demo**: `/api/demo/request`
- **Profile**: `/api/profile`

## Project Structure
```
src/
├── api/           # Axios configuration and API calls
├── components/    # Reusable components
├── pages/         # Page components
├── store/         # Redux store
├── hooks/         # Custom hooks
└── utils/         # Utility functions and constants
```

## Notes

- Currently using mock data for development
- Replace mock API calls with real endpoints in production
- JWT tokens are stored in localStorage
- All API calls include error handling and loading states