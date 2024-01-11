import { getAuth, signOut, updateProfile, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { createContext, useState } from "react";
import { toast } from "react-toastify";


export const AuthContext = createContext();


export default function AuthContextProvider({children}){

    const [authUser, setAuthUser] = useState({login: false, displayName: null, uid: null})


    // sign up function
    async function signUp(e, displayName, email, password){
        e.preventDefault()
        const auth = getAuth();
        const res = await createUserWithEmailAndPassword(auth, email, password)  // signup
        await updateProfile(auth.currentUser, { displayName })                   // set username after signup
    }

    // sign in function
    async function signIn(e, email, password){
        try{
            e.preventDefault()
            const auth = getAuth();
            const {user: {displayName, uid}}  = await signInWithEmailAndPassword(auth, email, password)
            setAuthUser({login: true, displayName, uid})
            toast.success('Login successfull')
        }
        catch(err){
            toast.error('Login failed')
        }        
    }


    // sign out function
    async function logout(){
        const auth = getAuth();
        await signOut(auth)
        toast.success('Logged out')
        setAuthUser({login: false, displayName: null, uid: null})
    }

    return (
        <AuthContext.Provider value={{signIn, signUp, logout, authUser}}>
            {children}
        </AuthContext.Provider>
    )
}