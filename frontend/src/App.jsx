import { Navigate, Route, Routes } from "react-router-dom";
import ChatPage from "./features/ai-chat/pages/Chat";
import { Login } from "./features/authentication/pages/Login";
import { Register } from "./features/authentication/pages/Register";
import { useAuth } from "./features/authentication/hooks/useAuth";
import ThemeToggle from "./context/ThemeToggle";

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="ui-page min-h-screen">
      <ThemeToggle />
      <Routes>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/chat" replace /> : <Login />} />
        <Route path="/register" element={isAuthenticated ? <Navigate to="/chat" replace /> : <Register />} />
        <Route path="/chat" element={isAuthenticated ? <ChatPage /> : <Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
}

export default App;