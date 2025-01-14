import React from 'react';
import { Link } from 'react-router-dom';
import style from './style/home.module.css';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Card from '../components/Card';

const Home = () => {
    return (
        <>
            <Nav />
            <Footer />
        </>
    )
}

export default Home