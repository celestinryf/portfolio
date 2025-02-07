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
        description: 'A marketplace for university students to buy and sell. Built with React, TypeScript Front-end. Node.js, Express Back-end. Python with Pandas and PyTorch for Machine Learning, AWS for cloud, and PostgreSQL for database.',
        github: 'https://github.com/TechStartupClub/UMarket',
        route: '/projects/UMarket'
    },
    {
        name: 'UWealth 2024',
        video: UWealthDemo,
        description: 'Stock tracking application with user managment, market data, portfolio management, and analyst recommendations. Data from Alpha Vantage presented by React, JavaScript Front-end. Restful API handled by Express, Node.js Back-end server. User database handled by PostgreSQL.',
        github: 'https://github.com/TechStartupClub/UWealth',
        route: '/projects/UWealth'
    },
    {
        name: 'Club Website 2024',
        video: ClubWebsiteDemo,
        description: 'The official Tech Startup Club website built with React, JavaScript, HTML, CSS.',
        github: 'https://github.com/TechStartupClub/club-website',
        route: '/'
    }
];

const ProjectCard = ({ project }) => {
    const techStacks = {
        'UMarket 2025': ['React', 'TypeScript', 'Node.js', 'Express', 'Python', 'AWS', 'PostgreSQL'],
        'UWealth 2024': ['React', 'JavaScript', 'Node.js', 'Express', 'PostgreSQL'],
        'Club Website 2024': ['React', 'JavaScript', 'HTML', 'CSS']
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