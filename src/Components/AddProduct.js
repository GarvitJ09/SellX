import React,{useState} from 'react'  
import { getStorage, ref,uploadBytes,getDownloadURL } from "firebase/storage";
import { collection, addDoc,getFirestore,getEmail } from "firebase/firestore"; 
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useHistory } from 'react-router-dom';
import './AddProduct.css'

const AddProduct=()=> {
    const auth = getAuth();
    const history=useHistory();
    var userId,email;
    onAuthStateChanged(auth, (user) => {
        if (!user) { 
            history.push("/login"); 
        } else{ 
            userId=user.uid;
            email=user.email;
        }
});

    const [data,setData]=useState({
        title:"",
        description:"",
        price:"",
        url:""        
    });
    const setTitle=(e)=>{
        setData({
            ...data,
            title:e.target.value
        })
    }
     
    const setDescription=(e)=>{
        setData({
            ...data,
            description:e.target.value
        })
    }
    const setPrice=(e)=>{
        setData({
            ...data,
            price:e.target.value
        })
    }
    const setImage=(e)=>{
        setData({
            ...data,
            url:e.target.value
        })
    }
    const writeData=(e)=>{ 
        e.preventDefault();  
        //Image Upload 
        let bucketName='Books';
        let file=e.target[3].files[0];
        const storage = getStorage();
        const storageRef = ref(storage, `${bucketName}/${data.title}`);
        uploadBytes(storageRef, file).then((snapshot) => {  
        const firestore=getFirestore();
        getDownloadURL(ref(storage, `${bucketName}/${data.title}`)).then((url)=>{
            console.log(url);
            const newCityRef = addDoc(collection(firestore, "Books"),{
                title:data.title,
                description:data.description,
                price:data.price,
                url:url,
                userId:userId,
                userEmail:email
            });
            //console.log(userId);
            addDoc(collection(firestore, `${userId}`),{
                title:data.title,
                description:data.description,
                price:data.price,
                url:url
            });
        }) 
        alert("Upload successful"); 
        }); 
   

}
    return (
        <div className="form">
            <form onSubmit={writeData} >
                <div>
                    <label>Title</label><br/>
                    <input type="text" onChange={setTitle} ></input>
                </div>
                <div>
                    <label>Description</label><br/>
                    <textarea cols="20" rows="5" onChange={setDescription} ></textarea>
                </div>
                <div>
                    <label>Price</label><br/>
                    <input type="text" onChange={setPrice} ></input>
                </div>
                <div>
                    <label>Image</label><br/>
                    <input type="file" onChange={setImage} ></input>
                </div>
                <div>
                    <button type="submit">Upload</button>
                </div>
            </form>
        </div>
    )
}

export {AddProduct};