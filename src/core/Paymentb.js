import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { loadCartItems, clearCart } from './helper/cartHelper';
import { getToken, processPayment } from './helper/paymentbHelper';
import { createOrder } from './helper/orderHelper';
import { isAuthenticated } from '../auth/helper';

import DropIn from 'braintree-web-drop-in-react';

const Paymentb = ({
    cartItems,
    setReloadCartItems = f => f,
    reloadCartItems = undefined
}) => {
    
    const { token, user } = isAuthenticated();
    const [info, setInfo] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: "",
        instance: {}
    })

    useEffect(() => {
        getTokenFromBackend(user?._id, token)
    }, [])

    const getTokenFromBackend = (userId, token) => {
        getToken(userId, token)
            .then(info => {
                console.log(info);
                if (info.error) {
                    setInfo({
                        ...info,
                        error: info.error
                    })
                } else {
                    setInfo({
                        ...info,
                        clientToken: info.clientToken
                    })
                }
            })
    }

    const showbtdropIn = () => {
        return (
            <div>
                {info.clientToken != null && cartItems?.length > 0 ?
                    (
                        <div>
                            <DropIn
                                options={{ authorization: info.clientToken }}
                                onInstance={(instance) => (info.instance = instance)}
                            />
                            <button className='btn btn-success btn-block' onClick={onPurchase}>Buy</button>
                        </div>
                    ) : (<h3>Please Login Or Add something to cart</h3>)}
            </div>
        )
    }

    const onPurchase = () => {
        setInfo({ 
            ...info,
            loading: true 
        });
        let nonce;
        let getNonce = info.instance.requestPaymentMethod().then(data => {
          nonce = data.nonce;
          const paymentData = {
            paymentMethodNonce: nonce,
            amount: getAmount()
          };

          processPayment(user._id, token, paymentData)
            .then(response => {
                console.log(response);
              setInfo({ ...info, success: response.success, loading: false });
              console.log("PAYMENT SUCCESS");

              //create order
              const orderData = {
                products: cartItems,
                transaction_id: response.transaction.id,
                amount: response.transaction.amount
              };
              createOrder(user._id, token, orderData);

              // clear the cart
              clearCart(() => {
                  
              });
              
              // force reload
              setReloadCartItems(!reloadCartItems);
            })
            .catch(error => {
              setInfo({ loading: false, success: false });
              console.log("PAYMENT FAILED");
            });
        });
      };
    
      const getAmount = () => {
        let amount = 0;
        cartItems?.map(cartItem => {
          amount = amount + cartItem.price;
        });
        return amount;
      };

    return (
        <div>
            <h3>Proceed for Payment: $ {getAmount()}</h3>
            {showbtdropIn()}
        </div>
    );
}

export default Paymentb;
