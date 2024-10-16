import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import './index.css'
import { KindeProvider } from "@kinde-oss/kinde-auth-react"

import App from './App';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <KindeProvider
        clientId={import.meta.env.VITE_KINDE_CLIENT_ID}
        domain={import.meta.env.VITE_KINDE_DOMAIN}
        redirectUri={import.meta.env.VITE_KINDE_REDIRECT_URI}
        logoutUri={import.meta.env.VITE_KINDE_LOGOUT_URI}
      >
   <App />
   </KindeProvider>
  </StrictMode>
)