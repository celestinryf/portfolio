// home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import style from './home.module.css';

const Home = () => {
    return (
        <>
            <MainSection />
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