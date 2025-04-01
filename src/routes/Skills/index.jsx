import React from 'react';
import style from './skills.module.css';
import { FaJava, FaPython, FaNodeJs, FaAws, FaDocker, FaHtml5, FaReact, FaGithub } from 'react-icons/fa';
import { SiTypescript, SiJavascript, SiR, SiMysql, SiPostgresql, SiTableau, SiPycharm, SiIntellijidea, SiPandas, SiExpress, SiPython, SiNetlify, SiFlask, SiOpenai, SiLangchain, SiAnthropic } from 'react-icons/si';
import { VscCode } from "react-icons/vsc";
// import { TbBrandAnthropic } from 'react-icons/tb';

const Skills = () => {
   const frontendSkills = [
       {
           title: 'JavaScript',
           icon: <SiJavascript />,
           description: 'Web Programming Language'
       },
       {
           title: 'TypeScript',
           icon: <SiTypescript />,
           description: 'Typed JavaScript'
       },
       {
           title: 'React',
           icon: <FaReact />,
           description: 'Frontend Framework'
       },
       {
           title: 'HTML&CSS',
           icon: <FaHtml5 />,
           description: 'Web Markup & Styling'
       }
   ];

   const backendSkills = [
       {
           title: 'Java',
           icon: <FaJava />,
           description: 'Object-Oriented Programming Language'
       },
       {
           title: 'Python',
           icon: <FaPython />,
           description: 'High-level Programming Language'
       },
       {
           title: 'Node.js',
           icon: <FaNodeJs />,
           description: 'JavaScript Runtime'
       },
       {
           title: 'Express.js',
           icon: <SiExpress />,
           description: 'Node.js Framework'
       },
       {
           title: 'Flask',
           icon: <SiFlask />,
           description: 'Python Web Framework'
       }
   ];

   const dataScience = [
        {
            title: 'R',
            icon: <SiR />,
            description: 'Statistical Computing Language'
        },
        {
            title: 'Tableau',
            icon: <SiTableau />,
            description: 'Data Visualization'
        },
        {
            title: 'Matplotlib',
            icon: <SiPython />,
            description: 'Data Visualization Library'
        }
    ];

   const aiMlSkills = [
        {
            title: 'LangChain',
            icon: <SiLangchain />,
            description: 'LLM Application Framework'
        },
        {
            title: 'Claude API',
            icon: <SiAnthropic />,
            description: 'Anthropic LLM Integration'
        },
        {
            title: 'ChatGPT API',
            icon: <SiOpenai />,
            description: 'OpenAI LLM Integration'
        }
    ];

   const databaseSkills = [
       {
           title: 'MySQL',
           icon: <SiMysql />,
           description: 'Relational Database'
       },
       {
           title: 'PostgreSQL',
           icon: <SiPostgresql />,
           description: 'Relational Database'
       },  
       {
           title: 'Pandas',
           icon: <SiPandas />,
           description: 'Python ML Database'
       }
   ];

   const cloudDevOpsSkills = [
       {
           title: 'AWS',
           icon: <FaAws />,
           description: 'Cloud Platform'
       },
       {
           title: 'Docker',
           icon: <FaDocker />,
           description: 'Containerization Platform'
       },
       {
           title: 'Netlify',
           icon: <SiNetlify />,
           description: 'Frontend deployment Platform'
       }
   ];

   const otherTools = [
       {
           title: 'Git & Github',
           icon: <FaGithub />,
           description: 'Version Control'
       },
       {
            title: 'VScode',
            icon: <VscCode />,
            description: 'Visual Studio Code IDE'
        },
       {
           title: 'PyCharm',
           icon: <SiPycharm />,
           description: 'Python IDE'
       },
       {
           title: 'IntelliJ',
           icon: <SiIntellijidea />,
           description: 'Java IDE'
       }
   ];

   return (
       <div className={style.layoutWrapper}>
           <div className={style.mainContent}>
               <section className={style.skillSection}>
                   <h2 className={style.sectionTitle}>Frontend</h2>
                   <div className={style.skillsGrid}>
                       {frontendSkills.map((skill, index) => (
                           <div key={index} className={style.skillCard}>
                               <div className={style.icon}>{skill.icon}</div>
                               <h3 className={style.skillTitle}>{skill.title}</h3>
                               <p className={style.skillDescription}>{skill.description}</p>
                           </div>
                       ))}
                   </div>
               </section>

               <section className={style.skillSection}>
                   <h2 className={style.sectionTitle}>Backend</h2>
                   <div className={style.skillsGrid}>
                       {backendSkills.map((skill, index) => (
                           <div key={index} className={style.skillCard}>
                               <div className={style.icon}>{skill.icon}</div>
                               <h3 className={style.skillTitle}>{skill.title}</h3>
                               <p className={style.skillDescription}>{skill.description}</p>
                           </div>
                       ))}
                   </div>
               </section>

               <section className={style.skillSection}>
                    <h2 className={style.sectionTitle}>Data Science</h2>
                    <div className={style.skillsGrid}>
                        {dataScience.map((skill, index) => (
                            <div key={index} className={style.skillCard}>
                                <div className={style.icon}>{skill.icon}</div>
                                <h3 className={style.skillTitle}>{skill.title}</h3>
                                <p className={style.skillDescription}>{skill.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className={style.skillSection}>
                    <h2 className={style.sectionTitle}>AI/ML</h2>
                    <div className={style.skillsGrid}>
                        {aiMlSkills.map((skill, index) => (
                            <div key={index} className={style.skillCard}>
                                <div className={style.icon}>{skill.icon}</div>
                                <h3 className={style.skillTitle}>{skill.title}</h3>
                                <p className={style.skillDescription}>{skill.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

               <section className={style.skillSection}>
                   <h2 className={style.sectionTitle}>Databases</h2>
                   <div className={style.skillsGrid}>
                       {databaseSkills.map((skill, index) => (
                           <div key={index} className={style.skillCard}>
                               <div className={style.icon}>{skill.icon}</div>
                               <h3 className={style.skillTitle}>{skill.title}</h3>
                               <p className={style.skillDescription}>{skill.description}</p>
                           </div>
                       ))}
                   </div>
               </section>

               <section className={style.skillSection}>
                   <h2 className={style.sectionTitle}>Cloud & DevOps</h2>
                   <div className={style.skillsGrid}>
                       {cloudDevOpsSkills.map((skill, index) => (
                           <div key={index} className={style.skillCard}>
                               <div className={style.icon}>{skill.icon}</div>
                               <h3 className={style.skillTitle}>{skill.title}</h3>
                               <p className={style.skillDescription}>{skill.description}</p>
                           </div>
                       ))}
                   </div>
               </section>

               <section className={style.skillSection}>
                   <h2 className={style.sectionTitle}>Other Tools & Practices</h2>
                   <div className={style.skillsGrid}>
                       {otherTools.map((skill, index) => (
                           <div key={index} className={style.skillCard}>
                               <div className={style.icon}>{skill.icon}</div>
                               <h3 className={style.skillTitle}>{skill.title}</h3>
                               <p className={style.skillDescription}>{skill.description}</p>
                           </div>
                       ))}
                   </div>
               </section>
           </div>
       </div>
   );
};

export default Skills;