import { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../../contexts/auth.context";

const renderNavLinkActive = ({ isActive }) => isActive ? 'nav-link active' : 'nav-link';

function Navbar() {
    const context = useContext(AuthContext); 

    return (
    
    <nav className="main-navbar navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
            <NavLink className="navbar-brand" to="/">
                <img src="/icon.svg" width="30" height="30" className="d-inline-block align-top mx-3" alt="Icon" />
                Iron House | {context.user?.name}
            </NavLink>


            <div className="collapse navbar-collapse">
                
                {context.user && (
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <NavLink className={renderNavLinkActive} to="/properties">Properties</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className={renderNavLinkActive} to="/new-property">New Property</NavLink>
                    </li>
                </ul>
                )}
                

                <ul className="navbar-nav mb-2 mb-lg-0">
                {!context.user && (
                    <>
                        <li className="nav-item"><NavLink className={renderNavLinkActive} to="/register">Register</NavLink></li> 
                        <li className="nav-item"><NavLink className={renderNavLinkActive} to="/login">Login</NavLink></li>
                    </>
                )}
                {context.user && (
                    <li className="nav-item"><button onClick={context.doLogout} className="nav-link" >Logout</button></li> 
                )}
                </ul>
            </div>
        </div>
    </nav>

  );
}

export default Navbar;