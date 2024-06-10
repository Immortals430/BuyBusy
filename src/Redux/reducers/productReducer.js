import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDocs, collection, setDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { toast } from "react-toastify";
import { authActions } from "./authReducer";




const initialState = {
    products: [],
    filteredProduct: false,
    cart: [],
    myOrder: [],
    filterConfig: {
        priceRange: 10,
        mensClothing: false,
        womensClothing: false,
        jwellery: false,
        electronic: false},
    message: null
}



const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload
        },
        setFilteredProduct: (state, action) => {
            state.filteredProduct = action.payload
        },
        setCart: (state, action) => {
            state.cart = action.payload
        },
        setMyorder: (state, action) => {
            state.myOrder = action.payload
        },
        filter: (state, action) => {
            state.filterConfig = action.payload        
        },
        updateCart: (state, action) => {
            let index = state.cart.findIndex(obj => obj.id === action.payload.id)
            let productIndex = action.payload.products.findIndex(obj => obj.id === action.payload.id)

            if(index === -1){ 
                state.cart.unshift({
                    id : action.payload.id,
                    name: action.payload.name,
                    price: action.payload.price,
                    count: 1,
                    image: action.payload.image
                })
             }                                                        // if item is not in cart then add
            else{
                if(action.payload.add){
                    state.cart[index].count++
                    state.cart[index].price += action.payload.products[productIndex].price                 // if item is in cart then increase count
                    toast.info(" Product Added")
                }                                    
                else{
                    if(state.cart[index].count === 1) state.cart.splice(index, 1)                 // if item is 0 then remove it from cart
                    else{
                        state.cart[index].count--
                        state.cart[index].price -= action.payload.products[productIndex].price             // if item is in cart then decrease count
                        toast.info(" Product Removed ")
                    }                                   
                }
            }   
        }
    },

    extraReducers: (builder) => {
        builder.addCase(authActions.signIn, (state, action) => {
            state.message = action.payload.displayName
        })
    }

})

// updateDb after purchase
export const updateDb = createAsyncThunk('product/setProduct', async function({authUser, myOrder}){
    await setDoc(doc(db, "MyOrder", authUser.uid), {myOrder});
    await setDoc(doc(db, "User", authUser.uid), {cart: []}); 
}  )     




// getProduct on initial login
export const getProduct = createAsyncThunk('product/setProduct', async (args, thunkAPI) => {
    const querySnapshot = await getDocs(collection(db, "Products"));
    querySnapshot.docs.forEach((doc) => {
        thunkAPI.dispatch(productActions.setProducts(doc.data().cart))
        thunkAPI.dispatch(productActions.setFilteredProduct(doc.data().cart))
        });
})

// fetchCart
export const fetchCart = createAsyncThunk('product/fetchCart', async (authUser, thunkAPI) => {
    onSnapshot(doc(db, "User", authUser.uid), (res) => {
        const cart = res.data()
        if( Object.keys(cart).length === 0) thunkAPI.dispatch(productActions.setCart([]))
        else thunkAPI.dispatch(productActions.setCart(cart.cart))
    });
    onSnapshot(doc(db, "MyOrder", authUser.uid), (res) => {
        const myOrder = res.data()
        if( Object.keys(myOrder).length === 0) thunkAPI.dispatch(productActions.setMyorder([]))
        else thunkAPI.dispatch(productActions.setMyorder(myOrder.myOrder))
    });
})



export const productReducer = productSlice.reducer
export const productActions = productSlice.actions
export const productSelector = state => state.productReducer