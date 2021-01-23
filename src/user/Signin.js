import React, { useState } from "react";
import Base from '../core/Base'
import { Link, Redirect } from "react-router-dom";
import { signin, authenticate, isAuthenticated } from "../auth/helper";

const Signin = () => {

    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        loading: false,
        didRedirected: false
    })

    const { email, password, error, loading, didRedirected } = values;
    const { user } = isAuthenticated();

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value })
    }

    const onSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true })

        //backend call
        signin({ email, password })
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, loading: false })
                } else {
                    authenticate(data, () => {
                        setValues({
                            ...values,
                            didRedirected: true
                        })
                    })
                }
            })
            // TODO: going inside catch even after successful sign in
            .catch(err => {
                console.log(`${err}`)
            })
    }

    const onError = () => {
        <div style={{ display: error ? "" : "none" }} className="alert alert-danger">
            {error}
        </div>
    }

    const onLoading = () => {
        return (
            loading && (
                <div className="alert alert-warning">
                    Loading...
                </div>
            )
        )
    }

    const perfromRedirect = () => {
        // TODO: Do proper redirect
        if (didRedirected) {
            if (user && user.role === 1) {
                console.log("admin logged in")
                // return <p className="text-white">Redirect to admin</p>
                return <Redirect to="/admin/dashboard" />
            } else {
                console.log("user logged in")
                return <Redirect to="/user/dashboard" />
            }
        }

        if (isAuthenticated()) {
            return <Redirect to="/" />
        }
    }


    const signInForm = () => {
        return (
            <div className='row'>
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light">Email</label>
                            <input className="form-control" type="email" onChange={handleChange('email')} value={email} />
                        </div>
                        <div className="form-group">
                            <label className="text-light">Password</label>
                            <input className="form-control" type="password" onChange={handleChange('password')} value={password} />
                        </div>
                        <button onClick={onSubmit} type='button' className="btn btn-success my-3 col-12 btn-block">
                            Sign In
                        </button>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <Base title='signin page' description='page for user to signin'>
            {onError()}
            {onLoading()}
            {signInForm()}
            {perfromRedirect()}
            <p className="text-white">
                {JSON.stringify(values)}
            </p>
        </Base>
    )
}

export default Signin;