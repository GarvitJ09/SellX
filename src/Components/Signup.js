import React,{useState} from 'react'  
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {app} from '../firebase-config'
import { Link,useHistory } from 'react-router-dom';
import './Signup.css'
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
const Signup=()=> {  
    const [user,setUser]=useState({
        email:"",
        password:""
    });
    const history=useHistory();
    const setEmail=(e)=>{ 
        setUser({ 
            ...user,
            email:e.target.value
        }) 
    }
    const setPass=(e)=>{ 
        setUser({ 
            ...user,
            password:e.target.value
        }) 
    }
    const signup=()=>{ 
        // alert(user.email);
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, user.email, user.password)
        .then((userCredential) => { 
            console.log("sucessfully created account")
            const user = userCredential.user; 
            history.push("/");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
        });
    }
    return (
        <div className="form">
            <div>
                <form id="form-signup" method="post">
                <div className="field"> 
                    <div>
                        <EmailIcon  fontSize="large"/>
                    </div>
                    <div>
                        <input type="email" id="email" onChange={setEmail} placeholder="email" required></input>
                    </div>
                </div>
                <div className="field"> 
                    <div>
                        <LockIcon  fontSize="large"/>
                    </div> 
                    <div> 
                    <input type="password" id="password" onChange={setPass}  placeholder="password" required></input>
                </div>
                </div>
                </form>
            </div>
            <div>
                <button onClick={signup}>Signup</button>
            </div>
            <div>
                Already Have an account ? <Link to="/login" className="link">Login</Link>
            </div>
        </div>
    )
}
export {Signup};
