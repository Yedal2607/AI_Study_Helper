import Navbar from "./components/Navbar"
import { Navigate, Route, Routes, useLocation } from "react-router-dom"
import ChatPage from "./pages/Chat"
import { Login } from "./pages/Login"
import { useAuth } from "./context/AuthContext"

function App() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const showNavbar = location.pathname !== "/";

  return (
    <div className="min-h-screen bg-[#111418] ">
      {showNavbar && (
        <header className="flex justify-center items-center bg-[#252a31] ">
          <Navbar/>
        </header>
      )}
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/chat" replace /> : <Login />} />
        <Route path="/chat" element={isAuthenticated ? <ChatPage/> : <Navigate to="/" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )

}

export default App
