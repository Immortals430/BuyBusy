import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getAuth, updateProfile, createUserWithEmailAndPassword } from "firebase/auth"
import { actions } from "./productReducer"
import { signInWithEmailAndPassword } from "firebase/auth"
import { toast } from "react-toastify"
import { signOut } from "firebase/auth"


const initialState = {
    authUser: {login: false, displayName: null, uid: null}
}

// signup
export const signUp = createAsyncThunk('auth/signup',
async({e, displayName, email, password}) => {
    e.preventDefault()
    const auth = getAuth();
    await createUserWithEmailAndPassword(auth, email, password)  
    await updateProfile(auth.currentUser, { displayName })                   
})

// sign in
export const signIn = createAsyncThunk('auth/signin', async ({e, email, password}, thunkAPI) => {
    try{
        e.preventDefault()
        const auth = getAuth();
        const {user: {displayName, uid}}  = await signInWithEmailAndPassword(auth, email, password)
        // setAuthUser({login: true, displayName, uid})
        thunkAPI.dispatch(authActions.signIn({login: true, displayName, uid}))
        toast.success('Login successfull')
    }
    catch(err){
        toast.error('Login failed')
    } 
})


// logout

export const logout = createAsyncThunk('auth/logout', async (args, thunkAPI) => {
    const auth = getAuth();
    await signOut(auth)
    toast.success('Logged out')
    thunkAPI.dispatch(authActions.logout({login: false, displayName: null, uid: null}))

})



const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        'signIn': (state, action) => {
            state.authUser = action.payload
        },
        'logout': (state, action) => {
            state.authUser = action.payload
        }
    }
})

export const authReducer = authSlice.reducer
export const authActions = authSlice.actions
export const authSelector = state => state.authReducer