import { TaskProvider } from "@/contexts/TaskContext";
import { Dashboard } from "@/components/Dashbaord";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";

function App() {
    return (
        <TaskProvider>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
            </Routes>
        </TaskProvider>
    );
}

export default App;
