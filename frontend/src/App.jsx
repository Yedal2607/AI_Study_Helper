import Navbar from "./components/Navbar"
import { Navigate, Route, Routes, useLocation } from "react-router-dom"
import ChatPage from "./features/ai-chat/pages/Chat"
import { Login } from "./features/authentication/pages/Login"
import { Register } from "./features/authentication/pages/Register"
import { useAuth } from "./features/authentication/context/AuthContext"

function App() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const showNavbar = location.pathname !== "/" && location.pathname !== "/register";

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#111418] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.28),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.18),_transparent_30%),linear-gradient(180deg,_rgba(255,255,255,0.02),_transparent_45%)]" />
        <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-blue-500/15 blur-3xl" />
        <div className="absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:56px_56px] opacity-20" />
      </div>
      {showNavbar && (
        <header className="sticky top-0 z-20 bg-white/5 backdrop-blur-md">
          <Navbar/>
        </header>
      )}
      <div className="relative z-10">
        <Routes>
          <Route path="/" element={isAuthenticated ? <Navigate to="/chat" replace /> : <Login />} />
          <Route path="/register" element={isAuthenticated ? <Navigate to="/chat" replace /> : <Register />} />
          <Route path="/chat" element={isAuthenticated ? <ChatPage/> : <Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  )

}

export default App
