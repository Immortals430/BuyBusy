import React, { useContext } from "react"
import { ProductContext } from "../../../productContext"

function Filter(){

    const priceRange = React.createRef()
    const mensClothing = React.createRef()
    const womensClothing = React.createRef()
    const jwellery = React.createRef()
    const electronic = React.createRef()
    const { filter, filterConfig } = useContext(ProductContext)


    function callFilter(){
        filter(
            Number(priceRange.current.value), 
            mensClothing.current.checked,
            womensClothing.current.checked,
            jwellery.current.checked,
            electronic.current.checked
        )
    }


    return(
        <aside>
            <h3>Filter</h3>    
            <br/>        
            <label htmlFor="range"><h3>Price: {filterConfig.priceRange}</h3></label>
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