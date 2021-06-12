import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import { getCategory, updateCategory } from './helper/adminapicall';


const UpdateCategory = (props) => {

    const [name, setCategoryName] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const { token, user } = isAuthenticated();

    useEffect(()=>{
        preload(props.match.params.categoryId)
    },[])

    const preload = (categoryId) =>{
        getCategory(categoryId)
        .then(data =>{
            if(data.error){
                setError(data.error);
            }else{
                setCategoryName(data.name);
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();

        setError(false);
        setSuccess(false);

        //api call
        updateCategory(props.match.params.categoryId, user._id, token, name)
            .then(data => {
                if (data.error) {
                    setError(true);
                } else {
                    setError(false);
                    setSuccess(true);
                }
            })
            .catch(err => {
                console.log(err);
                setError(true)
            })
    }

    const handleChange = (e) => {
        setError(false);
        setCategoryName(e.target.value);
    }

    const BackButton = () => {
        return (
            <div className="mt-1">
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
            success && <h4 className='text-success'>
                Category Updated Successfully
            </h4>
        )
    }

    const errorMessage = () => {
        return (
            error && <h4 className='text-danger'>
                Category Updation Failed
            </h4>
        )
    }

    const CategoryForm = () => {
        return (
            <form>
                <div className="form-group">
                    <p className='lead text-white mt-3'>Enter the category</p>
                    <input
                        type="text"
                        className='form-control my-3'
                        autoFocus
                        required
                        placeholder='For Ex. Summer'
                        onChange={handleChange}
                        value={name}
                    />
                    <button
                        className='btn btn-outline-info mb-2'
                        onClick={onSubmit}
                    >
                        Update Category
                    </button>
                </div>
            </form>
        )
    }

    return (
        <Base
            title="Update Category"
            description="Admin can update a category which can later be used for products"
            className="container bg-info p-4"
        >
            {BackButton()}
            <div className="row bg-dark rounded">
                <div className="col-md-8 offset-md-2">
                    {errorMessage()}
                    {successMessage()}
                    {CategoryForm()}
                </div>
            </div>
        </Base>
    );
}

export default UpdateCategory;