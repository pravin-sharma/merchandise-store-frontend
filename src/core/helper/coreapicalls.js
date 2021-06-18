import API_URL from "../../backend";

export const getAllProducts = () => {
    return fetch(`${API_URL}/product/getAllProducts`, {
        method: 'GET'
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}