import { Link, Outlet } from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "../../authContext";

function Navbar(){
    
    const {logout, authUser} = useContext(AuthContext)


    return (
        <>
            <nav className="flex">
                <Link to='/' className="logo" >Buy Busy</Link>
                <div className="flex navlistcontainer vcenter" >
                    <Link to={"/my-orders"}>My Orders</Link>
                    <Link to="/cart">Cart</Link>
                    { authUser.login ? <div onClick={logout}>Logout</div> :
                                 <Link to='/signin'>SignIn</Link>
                    }               
                </div>
            </nav>

            <Outlet />
        </>
    )
}

export default Navbar;