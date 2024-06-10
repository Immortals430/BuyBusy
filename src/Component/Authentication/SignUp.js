import React from "react";
import { Link } from "react-router-dom";
import { signUp } from "../../Redux/reducers/authReducer";
import { useDispatch } from "react-redux";



function SignUp(){

    const emailRef = React.createRef();
    const passwordRef = React.createRef();
    const usernameRef = React.createRef();
    const dispatch = useDispatch()

  
    return(
        <>
            <section className="authContainer flex">
                <h2 className="authHeading">Sign Up</h2>
                <form className="authForm flex" onSubmit={(e)=> dispatch(signUp({e, displayName: usernameRef.current.value, email: emailRef.current.value,password: passwordRef.current.value}))} >
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