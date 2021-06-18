import React, { useEffect, useState } from 'react';

import '../styles.css'
import API_URL from '../backend'
import Base from './Base';
import Card from './Card';
import { loadCartItems, removeItemFromCart } from './helper/cartHelper';


const Cart = () => {
    const [cartItems, setCartItems ] = useState([]);
    const [reloadCartItems, setReloadCartItems] = useState(false);

    useEffect(()=>{
        setCartItems(loadCartItems());
    },[reloadCartItems])

    const loadCart = () =>{
        return cartItems?.length > 0 ? (cartItems?.map((item, index)=>{
            return (<Card key={index} 
                    product={item} 
                    addToCartButton = {false}
                    removeFromCartButton = {true}
                    setReloadCartItems={setReloadCartItems}
                    reloadCartItems={reloadCartItems}
                    />)
        })):
        (
            <div className="alert alert-info">
                Cart is empty
            </div>
        )
    }

    const loadCheckout = () =>{
        return <div>
            <h1>Load Checkout Form here</h1>
        </div>
    }

    return (
        <Base title="Your Cart" description="You got a great choice">
            <div className="row text-center">
                    <div className="col-6">{loadCart()}</div>
                    <div className="col-6">{loadCheckout()}</div>
            </div>
        </Base>
    )
}

export default Cart