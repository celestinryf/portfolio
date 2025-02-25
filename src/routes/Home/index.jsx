// home.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import style from './home.module.css';
import clubImage from '../../assets/images/Meetings/DSC_0207.JPG';
import umarketImage from '../../assets/images/UMarket/images/UMarket.PNG';
import uwealthImage3 from '../../assets/images/UWealth/images/mobile-uwealth2.png';
import tscHackathonFlyer1 from '../../assets/images/Hackathons/TSC/Draft5.jpg';
import urecruiter from '../../assets/images/URecruiter/Screenshot 2025-02-24 at 11.07.29 PM.png';

const Home = () => {
    // Prevent scrolling on this page
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    const projects = [
        {
            id: 1,
            title: 'UMarket',
            category: 'TSC Social Media & Marketplace',
            imageUrl: umarketImage,
            link: 'https://techstartupclub.netlify.app/projects/UMarket'
        },
        {
            id: 2,
            title: 'URecruiter',
            category: 'AI HR tool',
            imageUrl: urecruiter,
            link: '/urecruiter'
        },
        {
            id: 3,
            title: 'Tech Startup Club',
            category: 'President, Founder',
            imageUrl: clubImage,
            link: 'https://techstartupclub.netlify.app/'
        },
        {
            id: 4,
            title: 'UHackathon',
            category: 'Host, Founder',
            imageUrl: tscHackathonFlyer1,
            link: '/uhackathon',
        },
        {
            id: 5,
            title: 'UWealth',
            category: 'TSC Stock Tracker',
            imageUrl: uwealthImage3,
            link: 'https://techstartupclub.netlify.app/projects/UWealth'
        }
    ];

    return (
        <div className={style.homeContainer}>
            <div className={style.mainContent}>
                <header className={style.header}>
                    <div className={style.headerGroup}>
                        <div className={style.studioTitle}>Célestin Ryf</div>
                        <div className={style.workInfo}>President, Founder of Tech Startup Club at Univeristy of Washington</div>
                        <section className={style.introSection}>
                            <p className={style.introText}>
                                An independent design studio collaborating with people who
                                believe in the power of design to transform their brand,
                                product or idea and take it to the next level.
                            </p>
                        </section>
                    </div>
                    
                    <div className={style.contactGroup}>
                        <div className={style.contactEmail}>celestinryf@gmail.com</div>
                        <div className={style.contactPhone}>+1 253 881 9185</div>
                        <div className={style.socialLinks}>
                            <a href="https://techstartupclub.netlify.app/" target="_blank" rel="noopener noreferrer">Tech Startup Club</a>
                        </div>
                        <div className={style.socialLinks}>
                            <a href="https://linkedin.com/celestinryf" target="_blank" rel="noopener noreferrer">Linkedin</a>
                        </div>
                        <div className={style.socialLinks}>
                            <a href="https://github.com/celestinryf" target="_blank" rel="noopener noreferrer">Github</a>
                        </div>
                        <div className={style.langSwitch}>
                            <span>En, </span>
                            <span>Fre</span>
                        </div>
                    </div>
                </header>
            </div>

            <section className={style.projectsGrid}>
                {projects.map(project => (
                    <div 
                        key={project.id} 
                        className={style.projectCard}
                    >
                        {/* Link wrapper around the entire card */}
                        {project.link.startsWith('http') ? (
                            <a 
                                href={project.link} 
                                className={style.projectLink}
                                target="_blank" 
                                rel="noopener noreferrer"
                            ></a>
                        ) : (
                            <Link to={project.link} className={style.projectLink}></Link>
                        )}
                        
                        {/* Card content */}
                        {project.imageComponent}
                        
                        {project.imageUrl && (
                            <div className={style.projectImage} style={{backgroundImage: `url(${project.imageUrl})`}}></div>
                        )}
                        
                        {/* Coming Soon overlay for UHackathon */}
                        {project.comingSoon && (
                            <div className={style.comingSoonOverlay}>
                                <span>SPRING 2025</span>
                            </div>
                        )}
                        
                        <div className={style.projectInfo}>
                            <h3>{project.title}</h3>
                            <p>{project.category}</p>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default Home;