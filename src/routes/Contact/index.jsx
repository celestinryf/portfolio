import React, { useRef } from 'react';
import style from './contact.module.css';
import emailjs from '@emailjs/browser';
import mainLogo from '../../assets/images/logos/Tech Startup Club Logo.png';

const Contact = () => {
    const refForm = useRef();

    const sendEmail = (e) => {
        e.preventDefault();
        emailjs.sendForm('service_ed0db6u', 'template_in0zoc9', refForm.current, 'HTL8crLZotnXzJw5h')
            .then(
                () => {
                    alert('Message Successfully Sent!');
                    window.location.reload(false);
                },
                () => {
                    alert("Failed to Send Message");
                }
            );
    };

    return (
        <div className={style.layoutWrapper}>
            <div className={style.mainContent}>
                <section className={style.header}>
                    <div className={style.content}>
                        <h1>Get In Touch</h1>
                        <p>Have questions? We'd love to hear from you.</p>
                    </div>
                </section>
                <div className={style.container}>
                    <div className={style['contact-page']}>
                        <div className={style['text-zone']}>
                            <div className={style['contact-form']}>
                                <form ref={refForm} onSubmit={sendEmail}>
                                    <ul>
                                        <li className={style.half}>
                                            <input type='text' name='name' placeholder='Name' required />
                                        </li>
                                        <li className={style.half}>
                                            <input type='email' name='email' placeholder='Email' required />
                                        </li>
                                        <li>
                                            <input type='text' name='subject' placeholder='Subject' required />
                                        </li>
                                        <li>
                                            <textarea placeholder="Message" name="message" required />
                                        </li>
                                        <li>
                                            <input type="submit" className={style['flat-button']} value="SEND" />
                                        </li>
                                    </ul>
                                </form>
                            </div>
                        </div>
                        <div className={style['about-img']}>
                            <img className={style.mainLogo} src={mainLogo} alt="Tech Startup Club Logo" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;