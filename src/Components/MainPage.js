import React from 'react'
import './MainPage.css'
import { Link,useHistory } from 'react-router-dom';
import store from '../Assets/bookStore.jpg';
export default function MainPage() {
    return (
        <div className="main-page">
            <button className="mainpage-btn"><Link to="/products" className="link">Explore Products</Link></button>
        </div>
    )
}
