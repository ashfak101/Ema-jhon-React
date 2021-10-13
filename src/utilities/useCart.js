import { useEffect, useState } from "react"
import { getStoredCart } from "./fakedb"

const useCart=products=>{
     const [cart ,setCart]= useState([])

     useEffect(()=>{
         if(products.length){
             const savedCart = getStoredCart();
             const storedCart=[];
             for(const key in savedCart){
                 const addedProduct=products.find(product=>product.key===key);
                 if(addedProduct){
                     //set Quantity
                     const quantity=savedCart[key];
                     addedProduct.quantity=quantity;
                     storedCart.push(addedProduct)
                 }
             }
             setCart(storedCart)
         }
     },[products])
     return [cart,setCart]
}
export default useCart;