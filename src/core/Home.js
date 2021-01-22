import React from 'react';

import '../styles.css'
import API_URL from '../backend'
import Base from './Base';


console.log(API_URL)
const Home = () =>{
    return (<Base title="Home Page" description="All the products">
        <h1>Thsirts..........</h1>
    </Base>)
}

export default Home