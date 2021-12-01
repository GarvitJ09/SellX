import React from 'react' 
import { getAuth} from "firebase/auth"; 
import { Link,useHistory } from 'react-router-dom';

const Logout=()=> { 
    const history=useHistory();
    const auth = getAuth();
    auth.signOut();
    history.push("/login");
    return (
        <div> 
        </div>
    )
}
export {Logout};
