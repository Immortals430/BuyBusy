import { createContext, useContext, useEffect, useState } from "react";
import { db } from "./firebase"
import { getDocs, collection, setDoc, doc, onSnapshot } from "firebase/firestore";
import { AuthContext } from "./authContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ProductContext = createContext();



export default function ProductContextProvider({children}){

    const {authUser} = useContext(AuthContext)
    const [products, setProducts] = useState([])
    const [filteredProduct, setFilteredProduct] = useState(false)
    const [cart, setCart] = useState([])
    const [myOrder, setMyOrder] = useState([])
    const [filterConfig, setFilterConfig] = useState({
        priceRange: 10,
        mensClothing: false,
        womensClothing: false,
        jwellery: false,
        electronic: false})



    // Store Products Array in Products state on first render
    useEffect(()=>{
        async function getDocFromFireStore(){
            const querySnapshot = await getDocs(collection(db, "Products"));
            querySnapshot.docs.forEach((doc) => {

                setProducts(doc.data().cart)
                setFilteredProduct(doc.data().cart)
              });
        }
        getDocFromFireStore()
    }, [])


    // add item to cart 
    async function addOrRemoveItem({id, name, price, image}, add){
        if(authUser.uid){                                                             // if login then proced
            let index = cart.findIndex(obj => obj.id === id)
            let productIndex = products.findIndex(obj => obj.id === id)

            if(index === -1) cart.unshift({id, name, price, count: 1, image})         // if item is not in cart then add
            else{
                if(add){
                    cart[index].count++
                    cart[index].price += products[productIndex].price                 // if item is in cart then increase count
                    toast.info(" Product Added")
                }                                    
                else{
                    if(cart[index].count === 1) cart.splice(index, 1)                 // if item is 0 then remove it from cart
                    else{
                        cart[index].count--
                        cart[index].price -= products[productIndex].price             // if item is in cart then decrease count
                        toast.info(" Product Removed ")
                    }                                   
                }
            }    
            await setDoc(doc(db, "User", authUser.uid), {cart});               // update cart db
        }
        else{
            toast.error("Login First")                                        // if not login
        }
    }


    // purchase function
    async function purchase(){
        try{
            cart.forEach((obj) => {
                myOrder.unshift(obj)
            })
            await setDoc(doc(db, "MyOrder", authUser.uid), {myOrder});
            setCart([])
            await setDoc(doc(db, "User", authUser.uid), {cart: []});
        }
        catch(err){
            toast.error('Login first')
        }        
    }


    // fetch Cart
    useEffect(() => {
        async function fetchCart(){
            if(authUser.login){
                onSnapshot(doc(db, "User", authUser.uid), (res) => {
                    const cart = res.data()
                    if( Object.keys(cart).length === 0) setCart([])
                    else setCart(cart.cart)
                });
                onSnapshot(doc(db, "MyOrder", authUser.uid), (res) => {
                    const myOrder = res.data()
                    if( Object.keys(myOrder).length === 0) setMyOrder([])
                    else setMyOrder(myOrder.myOrder)
                });
            }
            else {
                setCart([])
                setMyOrder([])
            }
        }
        fetchCart()
    }, [authUser])


    // filter 
    function filter(priceRange,mensClothing,womensClothing,jwellery,electronic){
        setFilterConfig({priceRange,mensClothing,womensClothing,jwellery,electronic})
    }


    // execute filter
    useEffect(() => {
        if(!filterConfig.electronic && !filterConfig.jwellery && !filterConfig.mensClothing && !filterConfig.womensClothing){
            let res = products.filter(obj => filterConfig.priceRange <= obj.price)
            if(res.length > 0) setFilteredProduct(res)
            return
        }
        function executeFilter(){
            let res = products.filter(obj => filterConfig[obj.category] && filterConfig.priceRange <= obj.price)
            setFilteredProduct(res)
        }
        executeFilter()
    }, [filterConfig, products])



    return (
        <>
            <ProductContext.Provider value={{filteredProduct, addOrRemoveItem, cart, purchase, myOrder, filter, filterConfig}}>
                <ToastContainer />
                {children}
            </ProductContext.Provider>
        </>
    )

}


