// NavBar.jsx
import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import styles from './index.module.css';
import mainLogo from '../../../assets/images/portraits/celestin.jpeg';

console.log('Nav styles:', styles);

const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 10;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrolled]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <div className={`${styles['nav-bar']} ${scrolled ? styles.scrolled : ''}`}>
            <div className={styles['nav-content']}>
                <Link className={styles.logo} to="/" onClick={closeMenu}>
                    <img src={mainLogo} alt="Tech Startup Club Logo" />
                </Link>

                <button className={styles['menu-toggle']} onClick={toggleMenu}>
                    <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
                </button>

                <nav className={`${isMenuOpen ? styles.open : ''}`}>
                    <NavLink 
                        className={({isActive}) => `${styles['nav-link']} ${isActive ? styles.active : ''}`}
                        to="/experience"
                        onClick={closeMenu}
                    >
                        Experience
                    </NavLink>
                    <NavLink 
                        className={({isActive}) => `${styles['nav-link']} ${isActive ? styles.active : ''}`}
                        to="/projects"
                        onClick={closeMenu}
                    >
                        Projects
                    </NavLink>
                    <NavLink 
                        className={({isActive}) => `${styles['nav-link']} ${isActive ? styles.active : ''}`}
                        to="/skills"
                        onClick={closeMenu}
                    >
                        Skills
                    </NavLink>                    <NavLink 
                        className={({isActive}) => `${styles['nav-link']} ${isActive ? styles.active : ''}`}
                        to="/blog"
                        onClick={closeMenu}
                    >
                        Blog
                    </NavLink>
                    <NavLink 
                        className={({isActive}) => `${styles['nav-link']} ${isActive ? styles.active : ''}`}
                        to="/about"
                        onClick={closeMenu}
                    >
                        About
                    </NavLink>
                    <NavLink 
                        className={({isActive}) => `${styles['nav-link']} ${styles['join-link']} ${isActive ? styles.active : ''}`}
                        to="/contact"
                        onClick={closeMenu}
                    >
                        Contact
                    </NavLink>
                </nav>
            </div>
        </div>
    );
};

export default NavBar;