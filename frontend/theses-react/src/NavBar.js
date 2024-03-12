import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const NavBar = () => {
    const history = useHistory();
    const chkUserLoginStatus = () => {
        const getuserDetails = localStorage.getItem("userData");
        if ( !getuserDetails) {
          history.push('/login')
        }else {
            history.push('/get-thesis-data')
        }
    }
    return ( 
        <nav className="nav">
            <ul className="links">
                <li className="navLinks"><Link to="/" >Home</Link></li>
                <li className="navLinks"><Link to="/contact">Contact Us</Link></li>
                <li  className="navLinks" onClick = {chkUserLoginStatus}><Link to="/get-thesis-data">Search Content</Link></li>
                <li className="navLinks"><Link to="/login">Login</Link></li>
               <li className="navLinks"><Link to="/register">Register</Link></li>
            </ul>
        </nav>
     );
}
 
export default NavBar;

  