import React, { useState } from 'react';
import { 
    FaEnvelope,
    FaPhone, 
    FaLinkedin, 
    FaGithub, 
    FaMapMarkerAlt, 
    FaPaperPlane, 
    FaSpinner 
} from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import styles from './contact.module.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const result = await emailjs.sendForm(
                'service_26k5ou9',
                'template_b1rkwat',
                e.target,
                'OgFI71xdn4iRuzZ4m'
            );
            
            if (result.status === 200) {
                setSubmitStatus('success');
                setFormData({ from_name: '', from_email: '', subject: '', message: '' });
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.heroSection}>
                <h1>Let's Connect</h1>
                <p>I'm always interested in hearing about new opportunities and exciting projects.</p>
            </div>

            <div className={styles.contentWrapper}>
                <div className={styles.contactInfo}>
                    <div className={styles.infoCard}>
                        <h2>Contact Information</h2>
                        <p>Feel free to reach out through any of these channels:</p>
                        
                        <div className={styles.contactDetails}>
                            <a href="mailto:celestinryf@gmail.com" className={styles.contactLink}>
                                <FaEnvelope className={styles.icon} />
                                <span>celestinryf@gmail.com</span>
                            </a>

                            <a href="tel:+12538819185" className={styles.contactLink}>
                                <FaPhone className={styles.icon} />
                                <span>253-881-9185</span>
                            </a>
                            
                            <a href="https://linkedin.com/in/celestinryf" className={styles.contactLink} target="_blank" rel="noopener noreferrer">
                                <FaLinkedin className={styles.icon} />
                                <span>LinkedIn Profile</span>
                            </a>
                            
                            <a href="https://github.com/celestinryf" className={styles.contactLink} target="_blank" rel="noopener noreferrer">
                                <FaGithub className={styles.icon} />
                                <span>GitHub Portfolio</span>
                            </a>
                            
                            <div className={styles.contactLink}>
                                <FaMapMarkerAlt className={styles.icon} />
                                <span>Seattle</span>
                            </div>
                        </div>

                        <div className={styles.availability}>
                            <h3>Current Status</h3>
                            <p>Open to opportunities in:</p>
                            <ul>
                                <li>Full-stack Development</li>
                                <li>Frontend Development</li>
                                <li>Backend Development</li>
                                <li>Database Development</li>
                                <li>AI/ML</li>
                                <li>Data Science & Analytics</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className={styles.formSection}>
                    <div className={styles.formCard}>
                        <h2>Send Me an Email</h2>
                        
                        {submitStatus && (
                            <div className={`${styles.alert} ${
                                submitStatus === 'success' ? styles.alertSuccess : styles.alertError
                            }`}>
                                <p>
                                    {submitStatus === 'success'
                                        ? "Thank you for your message! I'll get back to you soon."
                                        : 'There was an error sending your message. Please try again.'}
                                </p>
                            </div>
                        )}
                        
                        <form onSubmit={handleSubmit} className={styles.contactForm}>
                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="Your name"
                                    />
                                </div>
                                
                                <div className={styles.formGroup}>
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="your.email@example.com"
                                    />
                                </div>
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="subject">Subject</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    placeholder="What's this regarding?"
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="message">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    placeholder="Tell me about your opportunity..."
                                    rows={6}
                                />
                            </div>

                            <button
                                type="submit"
                                className={styles.submitButton}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <FaSpinner className={styles.spinner} />
                                        <span>Sending...</span>
                                    </>
                                ) : (
                                    <>
                                        <FaPaperPlane className={styles.sendIcon} />
                                        <span>Send Message</span>
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;