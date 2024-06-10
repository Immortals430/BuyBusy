import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignIn from "./Component/Authentication/SignIn";
import SignUp from "./Component/Authentication/SignUp";
import Navbar from "./Component/Navbar/Navbar"
import Products from "./Component/Products/Products";
import Cart from "./Component/Cart/Cart";
import MyOrders from "./Component/MyOrders/MyOrders";
import { Provider } from "react-redux";
import { store } from "./Redux/store"
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



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
      <Provider store={store}>
        <ToastContainer />
        <RouterProvider router={router} />
      </Provider>
    </>
  )
}

export default App;
