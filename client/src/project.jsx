import React from 'react';
import './general.css';
import EMS from './assets/EmployeeManagementSystem.png';
import BookHive from './assets/BookHive.png';
import GoldCorner from './assets/GoldCorner.png';
export default function Project() {
return (
<>

<p className="project-title">My Projects</p>

<div className="project-main">
    <div className="project-card">
        <img src={EMS} alt="Employee Management System" className="project-image" />
        <h3>Employee Management System</h3>
        <p><b>Description:</b> System that manages employee records and information as well as track employee flight details.</p>
        <p><b>Role:</b> Developer</p>
        <p><b>Current Status:</b> Deployed and used in production.</p>
        <p><b>Programs used:</b> Python, Flask, MySQL, CSS, HTML</p>
        <p><b>Project Link:</b> <a href="https://adamepaolo98.pythonanywhere.com/" target="_blank" rel="noopener noreferrer">View Project</a></p>
        <p><a href={EMS} target="_blank" rel="noopener noreferrer">Expand Image</a></p>

    </div>
    <div className="project-card">
        <img src={BookHive} alt="Book Hive" className="project-image" />
        <h3>Book Hive</h3>
        <p><b>Description:</b> A web application for managing and sharing book collections.</p>
        <p><b>Role:</b> Developer</p>
        <p><b>Current Status:</b> Deployed and used in production.</p>
        <p><b>Programs used:</b> Python, Flask, MySQL, CSS, HTML</p>
        <p><b>Project Link:</b> <a href="https://adamepaolo1.pythonanywhere.com/" target="_blank" rel="noopener noreferrer">View Project</a></p>
        <p><a href={BookHive} target="_blank" rel="noopener noreferrer">Expand Image</a></p>
    </div>
    <div className="project-card">
        <img src={GoldCorner} alt="Gold Corner Travel and Tours Website" className="project-image" />
        <h3>Gold Corner Travel and Tours Website</h3>
        <p><b>Description:</b> A web application for contact and inquire about travel and tour services.</p>
        <p><b>Role:</b> Developer</p>
        <p><b>Current Status:</b> Deployed and used in production.</p>
        <p><b>Programs used:</b> CSS, HTML, JavaScript</p>
        <p><b>Project Link:</b> <a href="https://goldcorner.github.io/" target="_blank" rel="noopener noreferrer">View Project</a></p>
        <p><a href={GoldCorner} target="_blank" rel="noopener noreferrer">Expand Image</a></p>
    </div>
</div>







</>
);
}
