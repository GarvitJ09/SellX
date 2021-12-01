import React,{useState,useEffect} from 'react'  
import { getFirestore,collection, addDoc,getDocs } from "firebase/firestore"; 
import { Link } from "react-router-dom";  
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useHistory } from 'react-router-dom';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

const Frame = ({id,title,url,price,description}) => {  
    return (
    <div  key={id} class="flex-box">
        <center class="flex-row">
        <div> 
                <p><h4>Title : {title}</h4></p> 
                </div>
                <div>
                <img src={url} className="img-responsive" ></img>  
                </div>
                <div>
                <Link to={{
                    pathname:`/${id}`,
                    state:{  
                        title:{title},
                        id:{id},
                        url:{url},
                        price:{price},
                        description:{description}
                        }
                    }} ><button>Show details</button></Link>
                </div>
        </center>
    </div>
    );
}

export default function MyProducts() {
    const auth = getAuth();
    const history=useHistory();
    var userId;
    onAuthStateChanged(auth, (user) => {
        if (!user) { 
            history.push("/login"); 
        } else{
            userId=user.uid;
        }
});
    const [searchTerm, setSearchTerm] = useState("");
    const setsearch=(e)=>{
        setSearchTerm(e.target.value)
    }
    const [info , setInfo] = useState([]);  
      const firestore = getFirestore();
      const fetchBlogs=async()=>{
      const querySnapshot =await  getDocs(collection(firestore,`${userId}`)).then((querySnapshot) => { 
        querySnapshot.forEach(element => {  
            var data={
              title:element.data().title,
              url:element.data().url,
              id:element.id,
              description:element.data().description,
              price:element.data().price
            } 
            setInfo(arr=>[...arr , data]);
              
        });
    })
}
    useEffect(() => {
        fetchBlogs();
      }, [])
    console.log(info); 
    return(
        <div>
            <center>
            <h2>Products</h2>
            <div style={{display:"inline-flex",alignItems:'center'}}>
                <div>
                    <input className="search-products" type="text" placeholder="search" onChange={setsearch} />
                </div>
                <div>
                    <SearchOutlinedIcon fontSize="large"/>
                </div>
            </div>            
            </center>
            <div className="flex-container"> 
          
        {
            (info.filter((product) => {
            if (searchTerm === "") {
              return product;
            } else if (
              product.title
                .toLowerCase()
                .includes(searchTerm.toLocaleLowerCase())
            ) {
              return product;
            }})).map((data) => (
            <Frame 
                id={data.id}
                title={data.title}  
                url={data.url}
                price={data.price}
                description={data.description}
            />
            ))
        }
        </div>
        </div>
    )
}
