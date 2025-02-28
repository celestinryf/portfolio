// Projects.jsx
import React from 'react';
import style from './projects.module.css';
import { 
    FaReact, 
    FaNode, 
    FaPython, 
    FaAws, 
    FaBootstrap,
    FaDocker,
    FaGithub,
    FaOpenAI
} from 'react-icons/fa';
import { 
    SiTypescript, 
    SiExpress, 
    SiPostgresql, 
    SiJavascript,
    SiHtml5,
    SiCss3,
    SiR,
    SiOpenai,
    SiFlask,
    SiLangchain
} from 'react-icons/si';
import { Database } from 'lucide-react'

import { Link } from 'react-router-dom';

import ClubWebsiteDemo from '../../assets/images/ClubWebsite/images/Screenshot2.png';
import UMarketDemo from '../../assets/images/UMarket/images/UMarket.PNG';
import UWealthDemo from '../../assets/images/UWealth/images/Stock-Summary.png';
import Notesapp from '../../assets/images/projects/Notesapp/Screenshot.png';
import Urecruiter from '../../assets/images/URecruiter/Screenshot4.png';

const techStackIcons = {
    'React': <FaReact />,
    'OpenAI': <SiOpenai />,
    'Flask': <SiFlask />,
    'LangChain': <SiLangchain />,
    'TypeScript': <SiTypescript />,
    'Node.js': <FaNode />,
    'Express': <SiExpress />,
    'Python': <FaPython />,
    'AWS': <FaAws />,
    'PostgreSQL': <SiPostgresql />,
    'JavaScript': <SiJavascript />,
    'HTML': <SiHtml5 />,
    'CSS': <SiCss3 />,
    'R': <SiR />,
    'TKinter': <FaPython />,
    'Bootstrap': <FaBootstrap />,
    'Supabase': <Database />,
    'Docker': <FaDocker/>
};

const projects = [
    // {
    //     name: 'UFacilitator 2025',
    //     image: UMarketDemo,
    //     description: 'Led full-stack development of a worksheet creation app for UWT SET Factilitators. Led a team for migration from Google Drive documents to PostgreSQL server, training a model on this database to auto-generate worksheets given users keywords.',
    //     github: 'https://github.com/TechStartupClub/UMarket',
    //     route: '/projects/UAssignment'
    // },
    {
        name: 'URecruiter 2025',
        image: Urecruiter,
        description: '',
        github: 'https://github.com/celestinryf/URecruiter',
        route: '/projects/URecruiter'
    },
    {
        name: 'UMarket 2025',
        image: UMarketDemo,
        description: 'Led full-stack development of a Social media and marketplace for Univeristy of Washington students. Focused on the API connections and UI/UX.',
        github: 'https://github.com/TechStartupClub/UMarket',
        route: '/projects/UMarket'
    },
    {
        name: 'UWealth 2024',
        image: UWealthDemo,
        description: 'Led full-stack development of stock tracking website, focusing on development of internal API and API connections between 3rd party, internal, and client.',
        github: 'https://github.com/TechStartupClub/UWealth',
        route: '/projects/UWealth'
    },    
    {
        name: 'Club Website 2024',
        image: ClubWebsiteDemo,
        description: 'Developed the website for Tech Startup Club, leading a team of 3 to design and create the website.',
        github: 'https://github.com/TechStartupClub/club-website',
        route: 'https://techstartupclub.netlify.app/'
    },
    {
        name: 'Manchester United Statistical Analysis 2024',
        // image: UWealthDemo,
        description: 'Built an app to analyze Manchester Uniteds ttransfer spending in the last 10 years. Used R to create graphs, to display data, and to analyze 213,000 players statistics.',
        // github: 'https://github.com/TechStartupClub/UWealth',
        route: '/projects/ManUtd'
    },
    {
        name: 'Python Calculus Calculator 2023',
        // image: UWealthDemo,
        description: 'Developed a Calculus Calculator app in Pyhton with GUI built with TKinter. Able to complete operations including volume, density, matrix algebra, derivatives, integrals, and more.',
        // github: 'https://github.com/TechStartupClub/UWealth',
        route: '/projects/Calculator'
    },
    {
        name: 'Python Notes App 2023',
        image: Notesapp,
        description: 'Developed a Calculus Calculator app in Pyhton with GUI built with TKinter. Able to complete operations including volume, density, matrix algebra, derivatives, integrals, and more.',
        // github: 'https://github.com/TechStartupClub/UWealth',
        route: '/projects/NotesApp'
    }
];

const ProjectCard = ({ project }) => {
    const techStacks = {
        // 'UAssignment 2025': ['React', 'TypeScript', 'Node.js', 'Express', 'Python', 'AWS', 'PostgreSQL'],
        'URecruiter 2025': ['OpenAI', 'Python', 'Flask', 'React', 'JavaScript', 'PostgreSQL'],
        'UMarket 2025': ['React', 'TypeScript', 'Node.js', 'Express', 'SupaBase', 'PostgreSQL', 'Docker'],
        'UWealth 2024': ['React', 'JavaScript', 'Node.js', 'Express', 'PostgreSQL'],
        'Club Website 2024': ['React', 'JavaScript', 'HTML', 'CSS'],
        'Manchester United Statistical Analysis 2024': ['R', 'Python'],
        'Python Calculus Calculator 2023': ['Python', 'TKinter', 'Bootstrap'],
        'Python Notes App 2023': ['Python', 'TKinter', 'Bootstrap']
    };

    return (
        <div className={style.projectCard}>
            <Link to={project.route} className={style.cardContent}>
                {project.image && (
                    <div className={style.videoContainer}>
                        <img 
                            src={project.image} 
                            alt={project.name}
                            className={style.projectVideo}
                        />
                    </div>
                )}
                <div className={style.projectInfo}>
                    <h2>{project.name}</h2>
                    <p>{project.description}</p>
                    <div className={style.techSection}>
                        <div className={style.techStack}>
                            {techStacks[project.name]?.map((tech, index) => (
                                <span key={index} className={style.techBadge}>
                                    <span className={style.techIcon}>{techStackIcons[tech]}</span>
                                    {tech}
                                </span>
                            ))}
                        </div>
                        {project.github && (
                            <a 
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={style.githubLink}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <FaGithub /> View on GitHub
                            </a>
                        )}
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