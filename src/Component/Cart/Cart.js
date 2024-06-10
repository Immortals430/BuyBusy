import { useEffect } from "react"
import styles from "./Cart.module.css"
import { useState } from "react"
import { authSelector } from "../../Redux/reducers/authReducer"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { productActions, productSelector } from "../../Redux/reducers/productReducer"
import { toast } from "react-toastify"
import { setDoc, doc} from "firebase/firestore";
import { db } from "../../firebase";


export default function Cart() {
    const [ total, setTotal ] = useState(0)
    const { authUser } = useSelector(authSelector)
    const dispatch = useDispatch()
    const {myOrder, products, cart} = useSelector(productSelector)


    
    useEffect(() => {
        if(authUser.uid){
            async function updatecartDb(){
                await setDoc(doc(db, "User", authUser.uid), {cart});  
            }
            updatecartDb()
        }
    }, [cart])

    // add or remove items
    async function addOrRemoveItem({ id, name, price, image }, add)  {
        if(authUser.uid) dispatch(productActions.updateCart({products, id, name, price, image, add}))
        else toast.error("Login First")
    }


    // purchase 
     async function purchase(){
        try{
            let res = cart.map(obj => obj)
            let updatedMyOrder = [...myOrder, ...res]

            dispatch(productActions.setMyorder(updatedMyOrder))
            dispatch(productActions.setCart([]))
            await setDoc(doc(db, "MyOrder", authUser.uid), {myOrder: updatedMyOrder});
        }
        catch(err) {toast.error('Login first')}
    }


    // update total
    useEffect(()=>{
        let total = 0
        cart.forEach(elem => total += elem.price);
        setTotal(total)
    }, [cart])

    return(
        <section>
            <h2 className="total">Total: ₹{total}</h2>
            <button className={styles.purchasebtn}   onClick={purchase}  >Purchase</button>
            <ul className="flex col">
    
                {cart.map((value, i) => {

                    return <li className="flex cartItemContainer" key={i}>
                                <div>
                                    <div><img src={value.image} alt={value.name} /></div>
                                </div>
                                <div className="flex col carItemDetails">
                                    <h2>{value.name}</h2>
                                    <br/>
                                    <div>
                                    <button className={styles.button} onClick={() => addOrRemoveItem(value, true)}>Add</button>
                                    <button className={styles.button} onClick={() => addOrRemoveItem(value, false)}>Remove</button><br/>
                                    </div>
                                    <h3><span>Count: {value.count}</span></h3>
                                    <h3>Price: ₹{value.price}</h3>
                                </div>
                            </li> 
                })}

            </ul>

        </section>
    )
}