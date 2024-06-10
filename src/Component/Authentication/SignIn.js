import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authSelector, signIn } from "../../Redux/reducers/authReducer";


function SignIn(){

    const emailRef = React.createRef();
    const passwordRef = React.createRef();
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { authUser } = useSelector(authSelector)

    useEffect(() => {
        if(authUser.login) navigate('/')
    }, [authUser])

    return(
        <>     
            <section className="authContainer flex">
                <h2 className="authHeading">Sign In</h2>
                <form  onSubmit={(e)=> dispatch(signIn({e,email: emailRef.current.value,password: passwordRef.current.value})) } className="authForm flex">
                    <input type="text" required placeholder="Enter your name" defaultValue="Vishal"/>
                    <input type="email" required placeholder="Enter your Email" ref={emailRef} defaultValue="a@gmail.com" />
                    <input type="password" required placeholder="Enter your Password" ref={passwordRef} defaultValue="11111111" />
                    <button className="authButton">Sign In</button>
                </form>
                <p>Don't have an account?</p>
                <Link to='/signup' className="authRedirect">SignUp</Link>
            </section> 
        </>
    )
}

export default SignIn