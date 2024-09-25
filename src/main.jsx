import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CreateTrip from './create-trip/index.jsx'
import Header from './components/custom/Header.jsx'
import { Toaster } from './components/ui/sonner.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
import ViewTrip from './view-trip/[tripID]/index.jsx'
import MyTrips from './my-trips/index.jsx'
import { ThemeProvider } from './components/custom/theme-provider.jsx'



const router = createBrowserRouter([
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
    path: "my-trips",
    element: <MyTrips />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        
        <Toaster />
        
        <RouterProvider router={router}>
        <Header />
        </RouterProvider>
      </ThemeProvider>

    </GoogleOAuthProvider>;

  </StrictMode>,
)
