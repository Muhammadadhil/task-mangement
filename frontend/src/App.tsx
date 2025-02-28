import { TaskProvider } from "@/contexts/TaskContext";
import { Dashboard } from "@/components/Dashbaord";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/Home";
import EmailVerification from "./pages/VerifyEmail";

function App() {
    return (
        <TaskProvider>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/verify-email/:token" element={<EmailVerification />} />
            </Routes>
        </TaskProvider>
    );
}

export default App;
