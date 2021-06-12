import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from "../core/Base";
import { getAllCategories, getProduct, updateProduct } from './helper/adminapicall';

const UpdateProduct = (props) => {
    
    const { token, user } = isAuthenticated();

    const [values, setValue] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        photo: '',
        categories: [],
        category: '',
        loading: false,
        error: '',
        createdProduct: '',
        isRedirect: false,
        formData: ''
    });

    useEffect(() => {
        preload(props.match.params.productId);
    }, [])

    const { name, description, price, stock, photo,
        categories, category, loading, error, formData,
        createdProduct, isRedirect } = values;

    const preload = (productId) => {
        getProduct(productId)
            .then(data => {
                if (data.error) {
                    setValue({ ...values, error: data.error })
                } else {
                    console.log('set getProduct');
                    setValue({
                        ...values,
                        name: data.name,
                        description: data.description,
                        price: data.price,
                        category: data.category._id,
                        stock: data.stock,
                        formData: new FormData()
                    })
                }
            })
            .catch(err => console.log(err))
    }

    //TODO: loading all categories and getting products simultneously are overwriting each other and emptying the state 
    //disabled loading all categories automatically for now 
    const preloadCategories = (e) => {
        e.preventDefault(); 

        getAllCategories()
            .then(data => {
                if (data.error) {
                    setValue({ ...values, error: data.error })
                } else {
                    console.log('set preloadCat');
                    setValue({
                        ...values,
                        categories: data.categories,
                        formData: new FormData()
                    })
                }
            })
            .catch(err => console.log(err))
    }


    const handleChange = (e) => {
        //if photo
        if (e.target.name === 'photo') {
            setValue({
                ...values,
                photo: e.target.files[0]
            })
        } else {
            setValue({
                ...values,
                [e.target.name]: e.target.value
            })
        }

        // setting FormData
        formData.set(e.target.name, e.target.value);
    }

    const onUpdate = (e) => {
        e.preventDefault();
        setValue({
            ...values,
            error: '',
            loading: true
        })
        console.log('inside onUpdate');
        // api call - create product
        updateProduct(props.match.params.productId, user._id, token, formData)
            .then(data => {
                console.log(data);
                if (data.error) {
                    setValue({ ...values, error: data.error })
                } else {
                    setValue({
                        ...values,
                        name: '',
                        description: '',
                        price: '',
                        stock: '',
                        photo: '',
                        category: '',
                        loading: false,
                        error: '',
                        createdProduct: data.product.name,
                        isRedirect: true,
                    })
                }

            })
            .catch(err => console.log(err))
    }

    const BackButton = () => {
        return (
            <div className="mt-2">
                <Link
                    className='btn btn-sm btn-dark mb-3'
                    to='/admin/dashboard'
                >
                    {"<"} Admin Dashboard
                </Link>
            </div>
        )
    }

    const successMessage = () => {
        return (
            <div className="alert alert-success mt-3"
                style={{ display: createdProduct ? "" : "none" }}
            >
                <h4>{createdProduct} createed Successfully</h4>
            </div>
        )
    }
    const errorMessage = () => {
        return (
            <div className="alert alert-danger mt-3"
                style={{ display: error ? "" : "none" }}
            >
                <h4>{error}</h4>
            </div>
        )
    }

    const ProductForm = () => {
        return (
            <form>
                <span>Post photo</span>
                <div className="form-group">
                    <div className="btn btn-block btn-success">
                        <input
                            onChange={handleChange}
                            type="file"
                            name="photo"
                            accept="image"
                            placeholder="choose a file"
                        />
                    </div>
                </div>
                <div className="form-group">
                    <input
                        onChange={handleChange}
                        name="name"
                        className="form-control"
                        placeholder="Name"
                        value={name}
                    />
                </div>
                <div className="form-group">
                    <textarea
                        onChange={handleChange}
                        name="description"
                        className="form-control"
                        placeholder="Description"
                        value={description}
                    />
                </div>
                <div className="form-group">
                    <input
                        onChange={handleChange}
                        type="number"
                        name='price'
                        className="form-control"
                        placeholder="Price"
                        value={price}
                    />
                </div>
                <div className="form-group">
                    <select
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Category"
                        name='category'
                        value={category}
                    >
                        <option>Select</option>
                        {categories && categories.map((cate, index) => {
                            return <option key={index} value={cate._id}>{cate.name}</option>
                        })}
                    </select>
                </div>
                <div className="form-group">
                    <input
                        onChange={handleChange}
                        type="number"
                        className="form-control"
                        placeholder="Quantity"
                        name='stock'
                        value={stock}
                    />
                </div>

                <button
                    type="submit"
                    onClick={onUpdate}
                    className="btn btn-outline-success mb-3"
                >
                    Update Product
                </button>
                <button
                    type="submit"
                    onClick={preloadCategories}
                    className="btn btn-outline-success mb-3"
                >
                    Load Categories
                </button>
            </form>
        )
    }

    return (
        <Base
            title="Add a product here!"
            description='Welcome to product creation section'
            className='container bg-info p-4'
        >
            {BackButton()}
            <div className="row bg-dark text-white rounded">
                <div className="col-md-8 offset-md-2">
                    {successMessage()}
                    {errorMessage()}
                    {ProductForm()}
                </div>
            </div>
        </Base>
    );
}

export default UpdateProduct;
