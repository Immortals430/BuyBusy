import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignIn from "./Component/Authentication/SignIn";
import SignUp from "./Component/Authentication/SignUp";
import Navbar from "./Component/Navbar/Navbar"
import Products from "./Component/Products/Products";
import ProductContextProvider from "./productContext";
import AuthContextProvider from "./authContext";
import Cart from "./Component/Cart/Cart";
import MyOrders from "./Component/MyOrders/MyOrders";



function App() {

  const router = createBrowserRouter([{
    path: '/',
    element: <Navbar/>,
    children:[
      { index: true, element: <Products/> },
      { path: 'signin', element: <SignIn/> },
      { path: 'signup', element: <SignUp/> },
      { path: 'cart', element: <Cart/> },
      { path: 'my-orders', element: <MyOrders/> }
    ]
  }])


  return (
    <>
    <AuthContextProvider>
      <ProductContextProvider>
        <RouterProvider router={router} />
      </ProductContextProvider>
    </AuthContextProvider>
    </>
  )
}

export default App;
