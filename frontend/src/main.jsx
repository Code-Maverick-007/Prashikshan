import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
// 1. IMPORT THE THEME PROVIDER
import { ThemeProvider } from './context/ThemeContext';

const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error("Missing Publishable Key from .env")
}

const ClerkProviderWithRoutes = () => {
  const navigate = useNavigate();
  return (
    <ClerkProvider
      publishableKey={publishableKey}
      navigate={(to) => navigate(to)}
    >
      {/* 2. WRAP THE APP WITH THEME PROVIDER */}
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </ClerkProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ClerkProviderWithRoutes />
    </BrowserRouter>
  </React.StrictMode>
);