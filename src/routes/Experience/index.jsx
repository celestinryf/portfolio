import React from 'react';
import style from './experience.module.css';
import { FaGraduationCap, FaBriefcase } from 'react-icons/fa';

const Experience = () => {
    const experiences = [
        {
            title: 'Club President, Founder',
            company: 'Tech Startup Club',
            period: 'Sep 2024 - Present',
            type: 'work',
            tech: 'React, TypeScript, Node.js, Express.js, RestfulAPI, AWS, PostgreSQL',
            achievements: [
                'Led Website and mobile app development for a social media & marketplace, a stock tracking website, and websites for multiple clubs.',
                'Built an assignment creation app for UWT SET facilitators using ML, reducing workflows by 2hrs a week.',
                'Consumed 3 clubs under my wing, becoming the most attended club on campus.'
            ]
        },
        {
            title: 'University of Washington',
            company: 'Bachelors in Computer Science',
            period: 'Sep 2023 - Exp. Jun 2026',
            type: 'education',
            tech: 'Java, Git, Github, MySQL, Docker, Agile & Scrum',
            achievements: [
                'Placed in the top 10 at the ICPC coding competition',
                'Competed in an AI hackathon, building an app for recruiters to easily search, setup interviews, and create linkedin ads',
                'Became the 2nd ever Junior that hadnt taken data structures to be interviewed to be a facilitator.'
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
                'Analyzed Man Utds transfer spending over the last 10 years, comparing 213,000 players',
                'Built a notes app using tkinter'
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