import React, { useContext, useEffect } from "react";
import {AuthContext} from "../../authContext"
import { Link, useNavigate } from "react-router-dom";


function SignIn(){

    const {signIn, authUser} = useContext(AuthContext)
    const emailRef = React.createRef();
    const passwordRef = React.createRef();
    const navigate = useNavigate()

    useEffect(() => {
        if(authUser.login) navigate('/')
    }, [authUser])

    return(
        <>
            
            <section className="authContainer flex">
                <h2 className="authHeading">Sign In</h2>
                <form onSubmit={(e)=> signIn(e, emailRef.current.value, passwordRef.current.value)} className="authForm flex">
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