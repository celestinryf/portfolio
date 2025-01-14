// NavBar.jsx
import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import './index.module.css';
import mainLogo from '../../assets/images/portraits/celestin.jpeg';

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
        <div className={`nav-bar ${scrolled ? 'scrolled' : ''}`}>
            <div className="nav-content">
                <Link className="logo" to="/" onClick={closeMenu}>
                    <img src={mainLogo} alt="Tech Startup Club Logo" />
                </Link>

                <button className="menu-toggle" onClick={toggleMenu}>
                    <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
                </button>

                <nav className={isMenuOpen ? 'open' : ''}>
                    <NavLink 
                        exact="true" 
                        className="nav-link events-link" 
                        to="/events"
                        onClick={closeMenu}
                    >
                        Events
                    </NavLink>
                    <NavLink 
                        exact="true" 
                        className="nav-link projects-link" 
                        to="/projects"
                        onClick={closeMenu}
                    >
                        Projects
                    </NavLink>
                    <NavLink 
                        exact="true" 
                        className="nav-link blog-link" 
                        to="/blog"
                        onClick={closeMenu}
                    >
                        Blog
                    </NavLink>
                    <NavLink 
                        exact="true" 
                        className="nav-link about-link" 
                        to="/about"
                        onClick={closeMenu}
                    >
                        About
                    </NavLink>
                    <NavLink 
                        exact="true" 
                        className="nav-link contact-link" 
                        to="/contact"
                        onClick={closeMenu}
                    >
                        Contact
                    </NavLink>
                    <NavLink 
                        exact="true" 
                        className="nav-link join-link" 
                        to="/joinus"
                        onClick={closeMenu}
                    >
                        Join Us
                    </NavLink>
                </nav>
            </div>
        </div>
    );
};

export default NavBar;