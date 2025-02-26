// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from './contexts/AuthContext.tsx';


createRoot(document.getElementById("root")!).render(
    // <StrictMode>
    <BrowserRouter>
        <Toaster />
        <AuthProvider>
            <App />
        </AuthProvider>
    </BrowserRouter>
    // </StrictMode>
);
