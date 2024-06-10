import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducers/authReducer"
import { productReducer } from "./reducers/productReducer"

export const store = configureStore({
    reducer: {
        productReducer,
        authReducer
    }
})