import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ThemeProvider } from './components/custom/theme-provider.jsx';
import Layout from './Layout'; // Import the new Layout component
import App from './App.jsx';
import CreateTrip from './create-trip/index.jsx';
import ViewTrip from './view-trip/[tripID]/index.jsx';
import MyTrips from './my-trips/index.jsx';
import './index.css';
import { Toaster } from './components/ui/sonner.jsx';

const router = createBrowserRouter([
  {
    element: <Layout />, // Use Layout for all routes
    children: [
      {
        path: "/",
        element: <App />
      },
      {
        path: "/create-trip",
        element: <CreateTrip />
      },
      {
        path: "/view-trip/:tripID",
        element: <ViewTrip />
      },
      {
        path: "/my-trips",
        element: <MyTrips />
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Toaster />
        <RouterProvider router={router} />
      </ThemeProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);
