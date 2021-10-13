import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { addToDb, getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'

const Shop = () => {
    const [products,setProducts] =useState([]);
    const [cart , setCart] =useState([]);
    const [displayProduct,setDisplayProduct]=useState([])
    useEffect(()=>{
        fetch('./products.JSON')
         .then(res=>res.json())
         .then(data=>{
             setProducts(data)
             setDisplayProduct(data)
         });
    },[])

    useEffect(()=>{
       if(products.length){
        const savedCart = getStoredCart();
        const storedCart =[]
        for(const key in savedCart){
            
            const addedProduct =products.find(product=>product.key===key);
            if(addedProduct){
                const quantity = savedCart[key];
                addedProduct.quantity=quantity;
                storedCart.push(addedProduct);
            }
           
        }
        setCart(storedCart)
       }
    },[products])

    const handleAddToCart =(product)=>{
        const exists = cart.find(pd=>pd.key===product.key)
        let newCart=[];
        if(exists){
                const remaining=cart.filter(pd=>pd.key!==product.key);
                exists.quantity=exists.quantity+1;
                newCart=[...remaining,product]
        }
        else{
            product.quantity=1;
            newCart=[...cart,product]
        }
        
        setCart(newCart)
        //Save to Local storage for now
        addToDb(product.key)
    }
    const handleSearch=event=>{
        const searchText =event.target.value;
        const matchedProduct = products.filter(product=>product.name.toLowerCase().includes(searchText.toLowerCase()))
        setDisplayProduct(matchedProduct)
        console.log(matchedProduct.length)
    }

    return (
        <div>
            <div className="search-container">
                <input
                onChange ={ handleSearch}
                type="text" placeholder="Search Your Product" />
            </div>
            <div className="shop-container">
                <div className="product-container">
                
                {
                    displayProduct.map(product=><Product
                        key={product.key} 
                        product={product}
                        handleAddToCart ={handleAddToCart}
                        ></Product>)               
                }
                </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to='/review'>
                    <button className='btn-regular'>Review Your Order</button>
                    </Link>
                </Cart>
            </div>
        </div>
        </div>
    );
};

export default Shop;