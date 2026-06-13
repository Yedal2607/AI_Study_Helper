import Navbar from "./components/Navbar"
import { Routes,Route } from "react-router-dom"
import ChatPage from "./pages/Chat"

function App() {

  return (
    <div className="min-h-screen bg-[#111418] ">
      <header className="flex justify-center items-center bg-[#252a31] ">
        <Navbar/>
      </header>
      <Routes>
        <Route path="/chat" element={<ChatPage/>}>
          
        </Route>
      </Routes>
    </div>
  )

}

export default App
