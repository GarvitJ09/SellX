import React from 'react'   
import { useLocation } from 'react-router-dom'
import './style.css'
const ProductDetail=(props)=> { 
    const location = useLocation() 
     
    const data=props.location.state; 
    console.log(data)
    return (
        <div className="flex-column">   
            <div>
                <img className="img-detail" src={data['url']['url']}></img>
            </div>
            <div>  
            <div>
                <h3>{data['title']['title']}</h3>
            </div>
            <div style={{margin:"25px 15px"}}>
                <p>{data['description']['description']}</p>
            </div>
            <div>
                <p><h4>Price:</h4>{data['price']['price']}</p>
            </div>
            <div>
                <p><h4>Contact:</h4>{data['userEmail']['userEmail']}</p>
            </div>
            </div>
        </div>
    )
}
export {ProductDetail};
