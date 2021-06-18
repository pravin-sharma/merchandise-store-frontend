export const addItemToCart = (item, next) => {

    let cart = [];
    if (typeof window !== undefined) {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
        }
        cart.push(item);
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
        // return cart;
    }
}

export const loadCartItems = () =>{
    if(typeof window !== undefined){
        if(localStorage.getItem('cart')){
            return JSON.parse(localStorage.getItem('cart'));
        }
    }
}