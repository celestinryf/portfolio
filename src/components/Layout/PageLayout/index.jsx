import React from 'react';
import Navbar from '../Nav';
import Footer from '../Footer';
import styles from './index.module.css';

const PageLayout = ({ 
    children, 
    showFooter = true 
}) => {
    return (
        <div className={styles.layoutContainer}>
            <Navbar />
            <div className={styles.mainContent}>
                {children}
            </div>
            {showFooter && <Footer />}
        </div>
    );
};

export default PageLayout;