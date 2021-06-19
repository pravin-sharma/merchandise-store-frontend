export const addItemToCart = (item, next) => {

    let cart = [];
    let count;
    if (typeof window !== undefined) {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
        }


        // setting and updating count of item
        //  for first item
        cart.push({
            ...item,
            count: 1
        })

        localStorage.setItem('cart', JSON.stringify(cart));
        next();
    }
}

export const removeItemFromCart = (itemId) => {
    let cart = []
    if (typeof window !== undefined) {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
        }

        cart = cart.filter(cartItem => {
            return cartItem._id != itemId
        })

        localStorage.setItem('cart', JSON.stringify(cart));
    }
}

// Loading all items in a cart
export const loadCartItems = () => {
    if (typeof window !== undefined) {
        if (localStorage.getItem('cart')) {
            return JSON.parse(localStorage.getItem('cart'));
        }
    }
}

// Clear the cart after creating the order
export const clearCart = (next) => {
    if (typeof window !== undefined) {
        localStorage.removeItem('cart');
        next();
    }
}