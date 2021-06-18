import React, { useEffect, useState } from 'react';

import '../styles.css'
import API_URL from '../backend'
import Base from './Base';
import Card from './Card';
import { getAllProducts } from './helper/coreapicalls';

const Home = () => {

    const [products, setProducts] = useState([]);
    const [error, setError] = useState(false);

    const loadAllProducts = () => {
        getAllProducts().then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProducts(data.products)
            }
        })
    }

    useEffect(() => {
        loadAllProducts()
    }, []);

    return (
        <Base title="Home Page" description="All the products">
            <div className="row text-center">
                <h1 className="text-white">All Tshirts..</h1>
                <div className="row">
                    {products.length > 0 ? (products?.map((product, index) => (
                        <div key={index} className="col-4">
                            <Card product={product} />
                        </div>
                    ))) : (
                        <div className="alert alert-info mt-5" role="alert">
                            Loading Awesome Tshirts for you...
                        </div>
                        )
                    }
                </div>
            </div>

        </Base>
    )
}

export default Home