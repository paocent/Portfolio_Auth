import '../src/src-CSS/general.css';
import React from 'react';
import photo from './assets/Paolo.jpg'
import resume from './assets/Resume.pdf'
export default function About() {
return (
<>

    <div className="content-container">
        <p className='header'>About Me:</p>

        <img src={photo} alt="Paolo Andrei Adame" className="about-image" />
        <h2><center>Paolo Andrei Adame</center></h2>
        <hr />
        <br></br>
        <p>Hi, My name is Paolo Andrei Adame. </p>
        <p>I am currently a student at Centennial College, taking Software Engineering Technology - AI program. </p>
        <p>I am passionate about web development and eager to learn and grow in this field.</p>
        <p>In my free time, I enjoy playing video games, watching anime, and exploring new technologies.</p>
    
    <p>Feel free to explore my portfolio to see some of the projects I've worked on!</p>
    <br></br>

    <p className='header'>Mission Statement:</p>
    <p>My mission is to create user-friendly and accessible web applications that provide value to users and contribute to the community.</p>
    <p>I am committed to continuous learning and improvement, staying updated with the latest trends and technologies in web development.</p>
    <p>I aim to collaborate with like-minded individuals and organizations to create innovative solutions that address real-world problems.</p>
    <p>Through my work, I strive to make a positive impact on the digital landscape and enhance the online experience for users.</p>
    <p></p>

    <hr />
    <p><center>Thank you for visiting my portfolio!</center></p>
    <p> Resume  PDF Section</p>
    <p>Alternative text - include a link <a href={resume} target='_blank' rel='noopener noreferrer'>to the PDF!</a></p>
    

    


    </div>

</>
);
}