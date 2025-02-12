import React from 'react';
import style from './experience.module.css';
import { FaGraduationCap, FaBriefcase } from 'react-icons/fa';

const Experience = () => {
    const experiences = [
        {
            title: 'Club President, Founder',
            company: 'Tech Startup Club',
            period: 'Jun 2023 - Present',
            type: 'work',
            tech: 'React, TypeScript, Node.js, Express.js, RestfulAPI, AWS, PostgreSQL',
            achievements: [
                'Led Website development for a seamless user experience.',
                'Built an assignment creation app for UWT SET facilitators using ML, reducing workflows by 2hrs a week.',
                'Optimized system performance for 10,000+ users and 50 million bookings.'
            ]
        },
        {
            title: 'University of Washington',
            company: 'Bachelors in computer science',
            period: 'Sep 2023 - Exp. Jun 2026',
            type: 'education',
            tech: 'Java, Git, Github, MySQL, Docker, Agile & Scrum',
            achievements: [
                'Developed chat and video consultation features for patient engagement.',
                'Built an analytics dashboard, improving data insights for Soccer enthusiasts.',
                'Optimized Lighthouse score, boosting application performance.'
            ]
        },
        {
            title: 'Highline Community College',
            company: 'Associates in Mechanical Engineering',
            period: 'Sep 2021 - Jun 2023',
            type: 'education',
            tech: 'Python, R, Matplotlib, Tablaeu',
            achievements: [
                'Worked closely with a Calculus Professor to develop a Calculator app in python.',
                'Built a notes app using tkinter',
                'Optimized Lighthouse score, boosting application performance.'
            ]
        }
    ];

    return (
        <div className={style.layoutWrapper}>
            <div className={style.mainContent}>
                <h1 className={style.mainTitle}>
                    <span className={style.emoji}>📅</span> Work Experience & Education Timeline
                </h1>
                
                <div className={style.timeline}>
                    {experiences.map((exp, index) => (
                        <div key={index} className={style.timelineItem}>
                            <div className={style.timelineMarker}>
                                <div className={style.marker}>
                                    {exp.type === 'education' ? 
                                        <FaGraduationCap className={style.markerIcon} /> : 
                                        <FaBriefcase className={style.markerIcon} />
                                    }
                                </div>
                            </div>
                            
                            <div className={style.timelineContent}>
                                <h2 className={style.title}>{exp.title}</h2>
                                <h3 className={style.company}>{exp.company}</h3>
                                <p className={style.tech}>🛠 {exp.tech}</p>
                                <ul className={style.achievements}>
                                    {exp.achievements.map((achievement, i) => (
                                        <li key={i}>💫 {achievement}</li>
                                    ))}
                                </ul>
                            </div>
                            <span className={style.date}>{exp.period}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Experience;