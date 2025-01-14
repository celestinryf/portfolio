import React from 'react'
import './index.module.css';


const Card = (props) => {
    return (
        <div className='card-container'>
            <img 
            src={props.imgSrc}
            alt={props.imgAlt}
            className='card-img'/>
            <h1 className='card-title'>{props.title}</h1>
            <p className='card-description'>{props.description}</p>
            <a href={props.link} className='card-link'>{props.btnText}</a>
        </div>
    )
}

export default Card