import { TaskProvider } from "@/contexts/TaskContext";
import { Dashboard } from "@/components/Dashbaord";

function App() {
    return (
        <TaskProvider>
            <Dashboard />
        </TaskProvider>
    );
}

export default App;
