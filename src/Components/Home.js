import React,{useState} from 'react'  
import {
    BrowserRouter as Router,
    Switch,
    Route, 
    NavLink, 
  } from "react-router-dom";  
  import {Login} from './Login';
  import {Signup} from './Signup';  
  import {AddProduct} from './AddProduct' ;
  import {ProductDetail} from './ProductDetail';  
  import { Product } from './Products';
import { Logout } from './Logout'; 
import './Home.css';
import MyProducts from './MyProducts';
import { getAuth, onAuthStateChanged } from "firebase/auth"; 
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';
import MainPage from './MainPage';
import { Link,useHistory } from 'react-router-dom';

const Home=()=> { 
  
  const auth = getAuth(); 
  const [id,setId]=useState(false);
    onAuthStateChanged(auth, (user) => {
        if (!user) { 
          console.log("no user"); 
          setId(false);
        } else{ 
          console.log("user"); 
          setId(true); 
        }
});
    return (
      <Router>  
        <div>  
          <ul className="flex-column-nav"> 
          <li className="logo"><Link to="/" className="link-logo" style={{display:"inline-flex",alignItems:'center'}}><StoreMallDirectoryIcon fontSize="large"/>SellX</Link></li> 
            <li>  
              <NavLink to="/products" className="navbar-item" exact activeStyle={  
                {color:'red'}
              }>Home</NavLink>  
            </li>  
            {!id&&(<li>  
              <NavLink to="/login" className="navbar-item" exact activeStyle={  
                {color:'red'}  
              }>Login</NavLink>  
            </li> )} 
            {!id&&(<li>  
              <NavLink to="/signup" className="navbar-item" exact activeStyle={  
                {color:'red'}  
              }>Signup</NavLink>  
            </li>)}
            {id&&(<li>  
              <NavLink to="/addproduct" className="navbar-item" exact activeStyle={  
                {color:'red'}  
              }>Add Product</NavLink>  
            </li>)}
            {id&&(<li>  
              <NavLink to="/myproducts" className="navbar-item" exact activeStyle={  
                {color:'red'}  
              }>My Products</NavLink>  
            </li> )}
            {id&&(<li>  
              <NavLink to="/logout" className="navbar-item" exact activeStyle={  
                {color:'red'}  
              }>Logout</NavLink>
              </li> )} 
          </ul>
          </div>   
          <Switch>
            <Route exact path="/" component={MainPage} />    
            <Route exact path="/products" component={Product} />  
            <Route exact path="/login" component={Login} />  
            <Route exact path="/signup" component={Signup} /> 
            <Route exact path="/addproduct" component={AddProduct} />
            <Route exact path="/myproducts" component={MyProducts}/>
            <Route exact path="/logout" component={Logout} />
            <Route exact path="/:id" component={ProductDetail} /> 
          </Switch>  
      </Router> 
    )
}
 
 
export {Home};
