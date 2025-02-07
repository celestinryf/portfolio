import React from 'react';
import Navbar from '../Nav';
import Footer from '../Footer';
import styles from './index.module.css';

// interface PageLayoutProps {
//     children: React.ReactNode;
//     showFooter?: boolean;
// }

const PageLayout= ({ 
    children, 
    showFooter = true 
}) => {
    return (
        <div className={styles.layoutContainer}>
            <Navbar />
            {children}
            {showFooter && <Footer />}
        </div>
    );
};

export default PageLayout;