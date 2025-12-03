import { Link } from "react-router-dom";
function Navbar() {
  return (
    <nav >
      

      {/*Center Nav elements*/}
      <div >
        <Link to="/">Home</Link>
        <Link to="/about" >About</Link>
        <Link to="/contact" >Contact</Link>
      </div>
    </nav>
  )
    
}

export default Navbar;
  