import React from 'react';
import useProducts from '../../hooks/useProducts';
import useCart from '../../utilities/useCart';
import Cart from '../Cart/Cart';
import ReviewItem  from '../ReviewItem/ReviewItem';
import {deleteFromDb,clearTheCart} from '../../utilities/fakedb';
import { useHistory } from 'react-router';


const OrderReview = () => {
    const [products  ] = useProducts();
    const [cart,setCart]=useCart(products);
    const history = useHistory();

    const handleRemove =key=>{
        const newCart= cart.filter(product=>product.key!==key)
        setCart(newCart);
        deleteFromDb(key);
    }
    const handlePlaceOrder=()=>{
        history.push('/placeorder');
        setCart([])
        clearTheCart()
    }

    return (
        <div className="shop-container">
            <div className="product-container">

                {
                    cart.map(product=> <ReviewItem
                        key={product.key}
                        product={product}
                        handleRemove={handleRemove}
                        ></ReviewItem>)
                       
                }
            </div>


            <div className=" cart-container ">
           
                <Cart cart={cart}>
                 
                        <button onClick={handlePlaceOrder} className='btn-regular'>pLace Order</button>
                    
                </Cart>
            </div>
        </div>
    );
};

export default OrderReview;