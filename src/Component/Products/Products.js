import Filter from "./Filter/Filter"
import Spinner from "react-spinner-material"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getProduct, productActions } from "../../Redux/reducers/productReducer"
import { productSelector } from "../../Redux/reducers/productReducer"
import { authSelector } from "../../Redux/reducers/authReducer"
import { toast } from "react-toastify"
import { setDoc, doc} from "firebase/firestore";
import { db } from "../../firebase";


function Products(){
    const dispatch = useDispatch()
    const { filteredProduct, products, cart} = useSelector(productSelector)
    const { authUser } = useSelector(authSelector)

    useEffect(() => {
      dispatch(getProduct())
    }, [])

    // add or remove item
    async function addOrRemoveItem({ id, name, price, image }, add)  {
        if(authUser.uid){ 
            dispatch(productActions.updateCart({products, id, name, price, image, add}))
            await setDoc(doc(db, "User", authUser.uid), {cart});  
        }
        else{toast.error("Login First")}
    }


    return (
        <>
            <main>
                {
                    !filteredProduct ? 
                    <Spinner radius={120} color={"#333"} stroke={2} visible={true} style={{display: "block", margin: "20% auto"}} /> : 
                
                    <div className="grid">
                    {filteredProduct.map((value, i) => {
                        
                        return (
                                <div key={i} className="productContainer" >
                                    <img src={value.image} alt="" />
                                    <p>{value.name}</p>
                                    <h4>₹{value.price}</h4>
                                    <button onClick={()=> addOrRemoveItem(value, true)}  >Add to Cart</button>
                                </div>
                        )
                    })}   
                    </div>
                }   
            </main>

            

            <Filter />
        </>
    )
}

export default Products