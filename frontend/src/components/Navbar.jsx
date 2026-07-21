import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from "../features/ai-chat/authentication/context/AuthContext";
function Navbar() {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="mx-auto flex w-full items-center justify-between px-4 py-2.5 sm:px-6 lg:px-8">
      <div className="ml-40 flex items-center">
        <Link
          to="/chat"
          className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-lg text-white shadow-lg shadow-black/20 transition duration-200 hover:-translate-y-0.5 hover:bg-white/10"
        >
          <FontAwesomeIcon icon={faHouse} />
        </Link>
      </div>
      <div className="mr-40 pl-4 sm:pl-6">
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
        >
          <FontAwesomeIcon icon={faRightFromBracket} />
          Logout
        </button>
      </div>
    </nav>
  )
    
}

export default Navbar;
  
