import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from "../context/AuthContext";
function Navbar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="flex w-[80%] items-center justify-between">
      <div className="flex h-[60px] items-center">
        <Link to="/chat" className="px-4 rounded-lg text-[1.5em] text-[#ffffff] font-inter font-[700] transition duration-130 hover:scale-[1.3] hover:bg-slate-500">
          <FontAwesomeIcon icon={faHouse} />
        </Link>
      </div>
      <div>
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-500"
        >
          <FontAwesomeIcon icon={faRightFromBracket} />
          Logout
        </button>
      </div>
    </nav>
  )
    
}

export default Navbar;
  
