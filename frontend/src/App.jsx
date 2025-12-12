import Navbar from "./components/Navbar"
import { Routes,Route } from "react-router-dom"
import UploadPage from "./pages/upload"

function App() {

  return (
    <div className="min-h-screen bg-[#111418] ">
      <header className="flex justify-center items-center bg-[#252a31] ">
        <Navbar/>
      </header>
      <Routes>
        <Route path="/upload" element={<UploadPage/>}>
          
        </Route>
      </Routes>
    </div>
  )

}

export default App
