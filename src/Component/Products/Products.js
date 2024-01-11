import { useContext } from "react"
import { ProductContext } from "../../productContext"
import Filter from "./Filter/Filter"
import Spinner from "react-spinner-material"

function Products(){

    const {filteredProduct, addOrRemoveItem} = useContext(ProductContext)

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
                                    <button onClick={()=> addOrRemoveItem(value, true)}>Add to Cart</button>
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