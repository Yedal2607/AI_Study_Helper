import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
function Navbar() {
  return (
    <nav className="w-[80%]  ">

      <div className="flex h-[60px] items-center">
        <Link to="/" className=" px-4 rounded-lg text-[1.5em] text-[#ffffff] font-inter font-[700] transition duration-130 hover:scale-[1.3] hover:bg-slate-500">
          <FontAwesomeIcon icon={faHouse} />
        </Link>
      </div>
    </nav>
  )
    
}

export default Navbar;
  