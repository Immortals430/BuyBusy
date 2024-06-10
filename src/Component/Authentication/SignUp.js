import React, { useContext } from "react";
import {AuthContext} from "../../authContext"
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";


function SignUp(){

    const {signUp, authUser} = useContext(AuthContext)
    const emailRef = React.createRef();
    const passwordRef = React.createRef();
    const usernameRef = React.createRef();
    const navigate = useNavigate()

    useEffect(() => {
        if(authUser.login) navigate('/')
    }, [authUser])
  
    return(
        <>
            <section className="authContainer flex">
                <h2 className="authHeading">Sign Up</h2>
                <form className="authForm flex" onSubmit={(e)=> signUp(e,usernameRef.current.value, emailRef.current.value, passwordRef.current.value)}>
                    <input type="text" required placeholder="Enter your name" ref={usernameRef}/>
                    <input type="email" required placeholder="Enter your Email" ref={emailRef} />
                    <input type="password" required placeholder="Enter your Password" ref={passwordRef} />
                    <button className="authButton" >Sign Up</button>
                </form>
                <p>Already have an account?</p>
                <Link to='/signin' className="authRedirect">SignIn</Link>
            </section>
        </>
    )
}

export default SignUp