import React, {useState, useEffect} from 'react';
import { Redirect } from 'react-router-dom';
import { addItemToCart, removeItemFromCart } from './helper/cartHelper';
import ImageHelper from './helper/ImageHelper';

const Card = ({ product,
    addToCartButton = true,
    removeFromCartButton = false,
    setReloadCartItems = f => f,
    reloadCartItems= undefined
}) => {

    const [redirect, setRedirect] = useState(false);

    const cardTitle = product ? product.name: 'Default Title'
    const cardDescription = product ? product.description: 'Default Description'
    const cardPrice = product ? product.price: 'Default Price'

    const addToCart = () =>{
        return addItemToCart(product, ()=>{
            setRedirect(true)
        })
    }

    const removeFromCart = (itemId) =>{
        removeItemFromCart(itemId);
        setReloadCartItems(!reloadCartItems);
    }

    const perfromRedirect = (redirect) =>{
        if(redirect){
            return <Redirect to="/cart" />
        }
    }

    const showAddToCartButton = (addToCartButton) => {
        return (
            addToCartButton &&
            <button
                onClick={addToCart}
                className="btn btn-block btn-outline-success mt-2 mb-2"
            >
                Add to Cart
            </button>
        )
    }

    const showRemoveFromCartButton = (removeFromCartButton) => {
        return (
            removeFromCartButton &&
            <button
                onClick={() => { 
                    removeFromCart(product._id)
                }}
                className="btn btn-block btn-outline-danger mt-2 mb-2"
            >
                Remove from cart
            </button>
        )
    }

    return (
        <div className="card text-white bg-dark border border-info mb-3">
            <div className="card-header lead">{cardTitle}</div>
            <div className="card-body">
                
                <ImageHelper product={product} />
                <p className="mt-3 lead bg-success font-weight-normal text-wrap">
                    {cardDescription}
                </p>
                <p className="btn btn-success rounded  btn-sm px-4 text-right">$ {cardPrice}</p>
                <div className="row">
                    <div className="col-12">
                        {showAddToCartButton(addToCartButton)}
                        {perfromRedirect(redirect)}
                    </div>
                    <div className="col-12">
                        {showRemoveFromCartButton(removeFromCartButton)}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;