import React,{useState} from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {app} from '../firebase-config';
import { Link,useHistory } from 'react-router-dom';
import './Login.css';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';

const Login=()=> {
    const [user,setUser]=useState({
        email:"",
        password:""
    });
    const history=useHistory();
    const setEmail=(e)=>{
        setUser({
            ...user,
            email:e.target.value
        });
    }
    const setPass=(e)=>{
        setUser({
            ...user,
            password:e.target.value
        });
    }
    const login=()=>{
        const auth = getAuth();
        signInWithEmailAndPassword(auth, user.email, user.password)
        .then((userCredential) => { 
            console.log("sign-in sucessful");
            const user = userCredential.user; 
            history.push("/");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage)
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
                <button onClick={login}>Login</button>
            </div>
            <div>
                Create an account ?<Link to="/signup" className="link">Signup</Link>
            </div>
        </div>
    )
}
export {Login};
