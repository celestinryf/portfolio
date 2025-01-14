import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faInstagram, faDiscord } from '@fortawesome/free-brands-svg-icons';
import { faCopyright, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import './index.module.css';

const Footer = () => {
    return (
        <div className="page-footer">
            <div className="socialSection">
                <span className="socialText">Follow us on</span>
                <div className="socialLinks">
                    <a href="https://github.com/TechStartupClub" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faGithub} />
                    </a>
                    <a href="https://www.linkedin.com/company/techstartupclub/" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faLinkedin} />
                    </a>
                    <a href="https://www.instagram.com/techstartupuw/?hl=en" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faInstagram} />
                    </a>
                    <a href="https://discord.gg/SPJnwq5hPk" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faDiscord} />
                    </a>
                    <a href="mailto:techstartup@uw.edu" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faEnvelope} />
                    </a>
                </div>
            </div>
            <div className="right-section">
                <FontAwesomeIcon icon={faCopyright} className="cpSymbol" />
                <h1>Tech Startup Club 2024</h1>
            </div>
        </div>
    );
};

export default Footer;