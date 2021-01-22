import React, { useState } from "react";
import Base from '../core/Base'
import { Link } from "react-router-dom";

const Signup = () => {

    const signUpForm = () => {
        return (
            <div className='row'>
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light">Name</label>
                            <input type="text" />
                        </div>
                        <div className="form-group">
                            <label className="text-light">Email</label>
                            <input type="email" />
                        </div>
                        <div className="form-group">
                            <label className="text-light">Password</label>
                            <input type="password" />
                        </div>
                        <button className="btn btn-success btn-block">
                            Submit
                    </button>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <Base title='signup page' description='page for user to signup'>
            <h1>Sign up works</h1>
            {signUpForm()}
        </Base>
    )
}

export default Signup;