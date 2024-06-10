import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { productActions, productSelector } from "../../../Redux/reducers/productReducer"
import { useEffect } from "react"

function Filter(){

    const priceRange = React.createRef()
    const mensClothing = React.createRef()
    const womensClothing = React.createRef()
    const jwellery = React.createRef()
    const electronic = React.createRef()
    const dispatch = useDispatch()
    const { filterConfig, products } = useSelector(productSelector)

    // call filter
    function callFilter(){
            dispatch(productActions.filter({
                priceRange: Number(priceRange.current.value), 
                mensClothing: mensClothing.current.checked,
                womensClothing: womensClothing.current.checked,
                jwellery: jwellery.current.checked,
                electronic: electronic.current.checked
            }))
    }


    useEffect(() => {
        if(!filterConfig.electronic && !filterConfig.jwellery && !filterConfig.mensClothing && !filterConfig.womensClothing){
            let res = products.filter(obj => filterConfig.priceRange <= obj.price)
            if(res.length > 0) dispatch(productActions.setFilteredProduct(res))
            return
        }
        function executeFilter(){
            let res = products.filter(obj => filterConfig[obj.category] && filterConfig.priceRange <= obj.price)
            dispatch(productActions.setFilteredProduct(res))
        }
        executeFilter()
    }, [filterConfig, products])


    return(
        <aside>
            <h3>Filter</h3>    
            <br/>        
            <label htmlFor="range"><h3>Price:  {filterConfig.priceRange}</h3></label>
            <input type="range" defaultValue="10" max="100000" min="10" ref={priceRange} onChange={callFilter} />
            <br/><br/>
            <h3>Category</h3><br/>          
            <input type="checkbox" id="mens-clothing" ref={mensClothing} onChange={callFilter} />
            <label htmlFor="mens-clothing">Mens Clothing</label>
            <br/>
            <input type="checkbox" id="womens-clothing" ref={womensClothing} onChange={callFilter} />
            <label htmlFor="womens-clothing">Womens Clothing</label>
            <br/>
            <input type="checkbox" id="jwellery" ref={jwellery} onChange={callFilter} />
            <label htmlFor="jwellery">Jwellery</label>
            <br/>
            <input type="checkbox" id="electronic" ref={electronic} onChange={callFilter} />
            <label htmlFor="electronic">Electronic</label>

        </aside>
    )
}

export default Filter