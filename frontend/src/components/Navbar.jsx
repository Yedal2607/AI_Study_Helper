import { Link } from "react-router-dom";
function Navbar() {
  return (
    <nav className="w-[80%]">

      <div className="flex h-[80px] items-center">
        <Link to="/" className="text-[1.3em] text-[#ffffff] font-inter font-[700] transition duration-130 hover:scale-[1.3]">Home</Link>
      </div>
    </nav>
  )
    
}

export default Navbar;
  