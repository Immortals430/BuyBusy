import { useContext, useEffect } from "react"
import { ProductContext } from "../../productContext"
import styles from "./Cart.module.css"
import { useState } from "react"

export default function Cart() {
    const { cart, addOrRemoveItem, purchase } = useContext(ProductContext)
    const [ total, setTotal ] = useState(0)


useEffect(()=>{
    let total = 0
     cart.forEach(elem => {
        total += elem.price
    });
    setTotal(total)
}, [cart])

    return(
        <section>
            <h2 className="total">Total: ₹{total}</h2>
            <button className={styles.purchasebtn} onClick={() => purchase()}>Purchase</button>
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