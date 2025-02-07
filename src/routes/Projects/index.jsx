// Projects.jsx
import React from 'react';
import style from './projects.module.css';
import { FaGithub } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import ClubWebsiteDemo from '../../assets/images/ClubWebsite/videos/ClubWebsite demo.mov';
import UMarketDemo from '../../assets/images/UMarket/videos/UMarket demo.mov';
import UWealthDemo from '../../assets/images/UWealth/Videos/UWealth video.mp4';

const projects = [
    {
        name: 'UMarket 2025',
        video: UMarketDemo,
        description: 'Led full-stack development of a Social media and marketplace for Univeristy of Washington students. Focused on the API connections and UI/UX.',
        github: 'https://github.com/TechStartupClub/UMarket',
        route: '/projects/UMarket'
    },
    {
        name: 'UWealth 2024',
        video: UWealthDemo,
        description: 'Led full-stack development of stock tracking website, focusing on development of internal API and API connections between 3rd party, internal, and client.',
        github: 'https://github.com/TechStartupClub/UWealth',
        route: '/projects/UWealth'
    },    
    {
        name: 'Club Website 2024',
        video: ClubWebsiteDemo,
        description: 'Developed the website for Tech Startup Club, leading a team of 3 to design and create the website.',
        github: 'https://github.com/TechStartupClub/club-website',
        route: 'https://techstartupclub.netlify.app/'
    },
    {
        name: 'Manchester United Statistical Analysis 2024',
        // video: UWealthDemo,
        description: 'Built an app to analyze Manchester Uniteds ttransfer spending in the last 10 years. Used R to create graphs to display data, and to analyze 213,000 players statistics.',
        // github: 'https://github.com/TechStartupClub/UWealth',
        route: '/projects/ManUtd'
    },
    {
        name: 'Python Calculus Calculator 2023',
        // video: UWealthDemo,
        description: 'Developed a Calculus Calculator app in Pyhton with GUI built with TKinter. Able to complete operations including volume, density, matrix algebra, derivatives, integrals, and more.',
        // github: 'https://github.com/TechStartupClub/UWealth',
        route: '/projects/Calculator'
    }
];

const ProjectCard = ({ project }) => {
    const techStacks = {
        'UMarket 2025': ['React', 'TypeScript', 'Node.js', 'Express', 'Python', 'AWS', 'PostgreSQL'],
        'UWealth 2024': ['React', 'JavaScript', 'Node.js', 'Express', 'PostgreSQL'],
        'Club Website 2024': ['React', 'JavaScript', 'HTML', 'CSS'],
        'Manchester United Statistical Analysis 2024': ['R', 'Python'],
        'Python Calculus Calculator 2023': ['Python', 'TKinter', 'Bootstrap']
    };

    return (
        <div className={style.projectCard}>
            <Link to={project.route} className={style.cardContent}>
                <div className={style.videoContainer}>
                    <video 
                        src={project.video} 
                        muted 
                        loop 
                        playsInline
                        autoPlay
                        className={style.projectVideo}
                    >
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div className={style.projectInfo}>
                    <h2>{project.name}</h2>
                    <p>{project.description}</p>
                    <div className={style.techSection}>
                        <div className={style.techStack}>
                            {techStacks[project.name]?.map((tech, index) => (
                                <span key={index} className={style.techBadge}>
                                    {tech}
                                </span>
                            ))}
                        </div>
                        <a 
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={style.githubLink}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <FaGithub /> View on GitHub
                        </a>
                    </div>
                </div>
            </Link>
        </div>
    );
};

const Projects = () => {
    return (
        <div className={style.layoutWrapper}>
            <div className={style.mainContent}>
                <section className={style.header}>
                    <div className={style.content}>
                        <h1>Projects</h1>
                        <p>Industry-standard applications built with modern tech stacks</p>
                    </div>
                </section>
                <div className={style.projectsSection}>
                    <div className={style.projectsGrid}>
                        {projects.map((project, index) => (
                            <ProjectCard key={index} project={project} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Projects;