import { useEffect } from "react"
import { useState } from "react"




const useProducts =() =>{
    const [products,setProduct] = useState([])
    useEffect(()=>{
        fetch('./products.JSON')
        .then(res=>res.json())
        .then(data=>setProduct(data))
    },[]);
     /// Return necessary things
    return [products,setProduct];
}

export default useProducts ;