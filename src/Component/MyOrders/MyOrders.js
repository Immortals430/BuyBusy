import { useSelector } from "react-redux"
import { productSelector } from "../../Redux/reducers/productReducer"

export default function MyOrders(){

    const { myOrder } = useSelector(productSelector)


    return (
        <section>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Count</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    
                {myOrder.map((value, i) => (
                    <tr>
                        <td>{value.name}</td>
                        <td>{value.count}</td>
                        <td>{value.price}</td>
                    </tr>
                ))}
               
                </tbody>
            </table>
        </section>
    )

}