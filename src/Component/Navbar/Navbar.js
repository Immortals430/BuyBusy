import { Link, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../../Redux/reducers/authReducer";
import { logout } from "../../Redux/reducers/authReducer";
import { fetchCart } from "../../Redux/reducers/productReducer";
import { productActions } from "../../Redux/reducers/productReducer";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";


function Navbar(){
    const { authUser } = useSelector(authSelector)
    const dispatch = useDispatch()

    // fetch cart on login
    useEffect(() => {
        if(authUser.login) dispatch(fetchCart(authUser))
        else {
            dispatch(productActions.setCart([]))
            dispatch(productActions.setMyorder([]))
        }
    }, [authUser])
    

    return (
        <>
            <ToastContainer />

            <nav className="flex">
                <Link to='/' className="logo" >Buy Busy</Link>
                <div className="flex navlistcontainer vcenter" >
                    <Link to={"/my-orders"}>My Orders</Link>
                    <Link to="/cart">Cart</Link>
                    { authUser.login ? <div onClick={() => dispatch(logout())}>Logout</div> :
                                 <Link to='/signin'>SignIn</Link>
                     }                
                </div>
            </nav>

            <Outlet />
        </>
    )
}

export default Navbar;