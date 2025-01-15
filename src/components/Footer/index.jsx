import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faInstagram, faDiscord } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import styles from './index.module.css';

const Footer = () => {
    return (
        <div className={styles.pageFooter}>
            <div className={styles.socialSection}>
                <span className={styles.socialText}>Follow us on</span>
                <div className={styles.socialLinks}>
                    <a 
                        href="https://github.com/TechStartupClub" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={styles.socialLink}
                    >
                        <FontAwesomeIcon icon={faGithub} />
                    </a>
                    <a 
                        href="https://www.linkedin.com/company/techstartupclub/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={styles.socialLink}
                    >
                        <FontAwesomeIcon icon={faLinkedin} />
                    </a>
                    <a 
                        href="https://www.instagram.com/techstartupuw/?hl=en" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={styles.socialLink}
                    >
                        <FontAwesomeIcon icon={faInstagram} />
                    </a>
                    <a 
                        href="https://discord.gg/SPJnwq5hPk" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={styles.socialLink}
                    >
                        <FontAwesomeIcon icon={faDiscord} />
                    </a>
                    <a 
                        href="mailto:techstartup@uw.edu" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={styles.socialLink}
                    >
                        <FontAwesomeIcon icon={faEnvelope} />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Footer;