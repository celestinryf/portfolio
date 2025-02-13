import styles from "./about.module.css";

const About = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Hey, I'm Celestin 👋</h1>
      
      <p className={styles.paragraph}>
        I'm a Computer Science student at the University of Washington with a passion for building things that matter. 
        Whether it's full-stack applications, AI-driven insights, or data analytics, I love solving real-world problems with technology.
      </p>

      <p className={styles.paragraph}>
        As the President of the Tech Startup Club, I lead teams to develop applications, manage version control, and connect with 
        professionals in tech and business. I thrive in fast-paced, collaborative environments, where I can lead, learn, and innovate.
      </p>

      <p className={styles.paragraph}>
        Beyond coding, you'll find me analyzing football data, experimenting with new tech, or brainstorming the next big idea. 
        I believe in continuous growth, and I'm always looking for exciting projects to contribute to.
      </p>

      <p className={styles.paragraph}>
        Let’s connect! Whether you're interested in tech, startups, or just a great conversation, feel free to reach out. 🚀
      </p>

      <div className={styles.links}>
        <a href="https://www.linkedin.com/in/celestinryf/" target="_blank" rel="noopener noreferrer" className={styles.link}>
          LinkedIn
        </a>
        <a href="https://github.com/celestinryf" target="_blank" rel="noopener noreferrer" className={styles.link}>
          GitHub
        </a>
        <a href="https://uwtechstartupclub.netlify.app/" target="_blank" rel="noopener noreferrer" className={styles.link}>
          Tech Startup Club
        </a>
      </div>
    </div>
  );
};

export default About;
