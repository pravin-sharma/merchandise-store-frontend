import React from 'react'
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated, signout } from '../auth/helper';

const currentTab = (history, path) => {
    if (history.location.pathname === path) {
        return { color: "green" }
    } else {
        return { color: "white" }
    }
}

const NavigationBar = ({ history }) => {
    return (
        <div>
            <ul className="nav nav-tabs bg-dark">
                <li className="nav-item">
                    <Link style={currentTab(history, '/')} className='nav-link' to='/'>
                        Home
                    </Link>
                </li>
                <li className="nav-item">
                    <Link style={currentTab(history, '/cart')} className='nav-link' to='/cart'>
                        Cart
                    </Link>
                </li>
                {isAuthenticated() && isAuthenticated().user.role == 0
                    && <li className="nav-item">
                        <Link style={currentTab(history, '/user/dashboard')} className='nav-link' to='/user/dashboard'>
                            User Dashboard
                    </Link>
                    </li>}
                {isAuthenticated() && isAuthenticated().user.role == 1
                    && <li className="nav-item">
                        <Link style={currentTab(history, '/admin/dashboard')} className='nav-link' to='/admin/dashboard'>
                            Admin Dashboard
                    </Link>
                    </li>}
                {!isAuthenticated() && <li className="nav-item">
                    <Link style={currentTab(history, '/signup')} className='nav-link' to='/signup'>
                        Sign up
                    </Link>
                </li>}
                {!isAuthenticated() && <li className="nav-item">
                    <Link style={currentTab(history, '/signin')} className='nav-link' to='/signin'>
                        Sign in
                    </Link>
                </li>}

                {isAuthenticated() && <li className="nav-item">
                    <div style={currentTab(history, '/signout')} className='nav-link text-warning'
                        onClick={() => {
                            signout(() => {
                                history.push('/signin')
                            })
                        }}>
                        Sign out
                    </div>
                </li>}
            </ul>

        </div>
    )
}

export default withRouter(NavigationBar);