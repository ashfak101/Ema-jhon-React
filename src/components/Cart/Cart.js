import React from 'react';
import './Cart.css'

const Cart = (props) => {
    const {cart} =props;
    let totalQuantity = 0;
   /*  const total=cart.reduce((previous,product)=>previous+product.price,0) */
    let total =0;
    for(const product of cart){
        if(!product.quantity)
        {
            product.quantity =1
        }
        total =total + product.price * product.quantity;
        totalQuantity =totalQuantity + product.quantity;
    }
    return (
        <div>
            <h3>Order Summary</h3>
           <h5>Item Ordered: {totalQuantity}</h5>
           <h5>Total: {total}</h5>
           {
               props.children
           }
        </div>
    );
};

export default Cart;