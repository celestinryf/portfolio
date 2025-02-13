import React from 'react';
import style from './blog.module.css';

import post1image1 from '../../assets/images/linkedin/personal/post1/1.jpeg';
import post1image2 from '../../assets/images/linkedin/personal/post1/2.jpeg';
import post1image3 from '../../assets/images/linkedin/personal/post1/3.jpeg';

import post2image1 from '../../assets/images/linkedin/personal/post2/1.jpeg';
import post2image2 from '../../assets/images/linkedin/personal/post2/2.jpeg';
import post2image3 from '../../assets/images/linkedin/personal/post2/3.jpeg';

import post3image1 from '../../assets/images/linkedin/club/post1/1.jpeg';
import post3image2 from '../../assets/images/linkedin/club/post1/2.jpeg';
import post3image3 from '../../assets/images/linkedin/club/post1/3.jpeg';
import post3image4 from '../../assets/images/linkedin/club/post1/4.jpeg';

const Blog = () => {
    const posts = [
        {
            title: "Wrapping up an exciting first quarter for Tech Startup Club at University of Washington! 🎉",
            date: "December 2024",
            content: `    
                Massive thank you to everyone involved from officers, to members, to professors, to industry partners. With all the effort and energy committed to this project, we've created a strong foundation of opportunities for our future careers!  
    
                Your TSC Officers for Winter 2025 are: President Célestin Ryf, Full-stack Lead Nicholas Jordan, Back-end lead Jacob Klymenko, front-end lead Preston Sia, and Design/UX lead Primitivo Bambao IV.  
    
                The work is not done yet though as our Fall project is still going. If you want to get involved scan the QR code or tap this link: https://lnkd.in/gSy2X2Xm.  
            `,
            likes: 16,
            comments: 3,
            link: "https://www.linkedin.com/posts/techstartupclub_wrapping-up-an-exciting-first-quarter-for-activity-7270994532891000832-IZ0b?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEHCCgwB6cLRLNu8vTHXYXWPEcBddgPQnxw",
            images: [post3image1, post3image2, post3image3, post3image4]
        },
        {
            title: "What A Quarter!",
            date: "December 2024",
            content: `
                Tech Startup Club has successfully launched, I had multiple interviews (and failed them 😭), met TONS of new exciting people, and learned new technologies and skills along the way.  
    
                Thanks a MILLION to all of my founding members, it's definitely been a journey and you've had my back the whole time through, even when it seemed like I didn't know what I was doing (which I don't). 😁  
    
                Thank you to Nicholas Jordan, Jacob Klymenko, Preston Sia, Primitivo Bambao IV, Anthony Naydyuk, Alex Yu, Fernando Olivar Neri, Luke Willis, Nikita Bizyuk, Austin Nguyen, Linda Miao, John Diego, those who come infrequently ... and to the chair for taking our group photo! 😂  
    
                Here's to the Future! 🚀🥂  
    
                💰 Join TSC: https://lnkd.in/gCyhYjR7  
            `,
            likes: 29,
            comments: 7,
            link: "https://www.linkedin.com/posts/celestinryf_what-a-quarter-tech-startup-club-has-successfully-activity-7270986408792596480-CbNL?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEHCCgwB6cLRLNu8vTHXYXWPEcBddgPQnxw",
            images: [post2image1, post2image2, post2image3]
        },
        {
            title: "🌟 5 weeks of Tech Startup Club! 🌟",
            date: "November 2024",
            content: `🚀 At TSC, students dive into real-world, company-like projects that build hands-on experience in defined roles.  
    
                Whether you're a seasoned developer eager to expand your skill set, like Jacob Klymenko, who’s building a custom user authentication system, or you're new to the fundamentals of development, we’ve got a spot for you.  
    
                Every member is matched to a project role, whether in frontend or backend, with personalized guidance to ensure everyone’s growth and success.  
    
                📅 Join Us Every Tuesday & Thursday, 12:30-1:30 PM, in person or virtually on Discord (discord.gg/EvSjT9PG).  
    
                Our meetings focus on code reviews, assignments, and visualizing our projects’ progress.  
    
                As we transition to an official club, we’ll soon have a dedicated classroom—stay tuned on Discord for updates!  
    
                Big thank you to my co-founders Nicholas Jordan and Jacob Klymenko for helping bring this idea to life.  
    
                Thanks to Preston Sia, Luke Willis, Primitivo Bambao, Fernando Olivar Neri, Alex Yu, Anthony Naydyuk and more that come online or infrequently for giving us your time and expertise!  
    
                Special thanks to Primitivo Bambao for the pictures.  
    
                👥 Join our mission, gain invaluable experience, and help shape tomorrow's tech landscape!  
            `,
            likes: 27,
            comments: 5,
            link: "https://www.linkedin.com/posts/celestinryf_5-weeks-of-tech-startup-club-at-activity-7256372127430254594-LC9I?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEHCCgwB6cLRLNu8vTHXYXWPEcBddgPQnxw",
            images: [post1image1, post1image2, post1image3]
        },
    ];

    return (
        <div className={style.layoutWrapper}>
            <div className={style.mainContent}>
                <h1 className={style.mainTitle}>
                    <span className={style.emoji}>📝</span> Blog Posts
                </h1>
                
                <div className={style.postsGrid}>
                    {posts.map((post, index) => (
                        <div key={index} className={style.postCard}>
                            <div className={style.postHeader}>
                                <div className={style.postDate}>{post.date}</div>
                            </div>
                            
                            <h2 className={style.postTitle}>{post.title}</h2>
                            <p className={style.postContent}>{post.content}</p>

                            <div className={style.postImages}>
                                {post.images.map((image, imgIndex) => (
                                    <img 
                                        key={imgIndex} 
                                        src={image} 
                                        alt={`Blog post ${index + 1} visual ${imgIndex + 1}`}
                                        className={style.postImage} 
                                    />
                                ))}
                            </div>
                            
                            <div className={style.postFooter}>
                                <div className={style.postStats}>
                                    <span>👍 {post.likes}</span>
                                    <span>💬 {post.comments}</span>
                                </div>
                                <a 
                                    href={post.link} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className={style.postLink}
                                >
                                    Read on LinkedIn →
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Blog;
