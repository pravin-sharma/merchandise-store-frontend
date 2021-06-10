import { isAuthenticated } from "../../auth/helper";
import API_URL from "../../backend";

// Category Calls
//--- Create Category
export const createCategory = (userId, token, categoryName) => {
    return fetch(`${API_URL}/category/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            "Content-Type": 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ categoryName })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            return console.log(err);
        })
}

//--- Get All Categories
export const getAllCategories = () => {
    return fetch(`${API_URL}/category/allCategory`, {
        method: "GET"
    })
        .then(response => response.json())
        .catch(err => console.log(err))
}


// Product Calls
//--- Create Product
export const createProduct = (userId, token, product) => {
    return fetch(`${API_URL}/product/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: product
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}

//--- Get All Products
// export const getAllProducts = async () => {
//     try {
//         let response = await fetch(`${API_URL}/product/getAllProducts`, { method: "GET" });
//         console.log(response)
//         return response.json()
//     } catch (err) {
//         console.log(err)
//     }
// }

export const getAllProducts = () => {
    return fetch(`${API_URL}/product/getAllProducts`, { method: "GET" })
        .then(response => response.json())
        .catch(err => console.log(err))
}

//-- Get a Product
export const getProduct = (productId) => {
    return fetch(`${API_URL}/${productId}`, {
        method: 'GET'
    })
        .then(response => response.json())
        .catch(err => console.log(err))
}

//-- Update a Product
export const updateProduct = (userId, token, productId, product) => {
    return fetch(`${API_URL}/product/${productId}/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: product
    })
        .then(response => response.json())
        .catch(err => console.log(err))
}

//-- Delete a Product
export const deleteProduct = (userId, token, productId) => {
    return fetch(`${API_URL}/product/${productId}/${userId}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .catch(err => console.log(err))
}
