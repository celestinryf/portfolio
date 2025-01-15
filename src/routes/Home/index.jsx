// home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import style from './home.module.css';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';

const Home = () => {
    return (
        <>
            <Nav />
            <MainSection />
            <Footer />
        </>
    )
}

const MainSection = () => {
    return (
        <section className={style.graphicHeader}>
            <div className={style.headerContent}>
                <Link to="/contact" className={style.flatButton}>Contact</Link>
            </div>
        </section>
    )
}

export default Home