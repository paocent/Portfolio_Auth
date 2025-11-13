import React from 'react';
import './src-CSS/general.css';
import webdev from './assets/WebDev.jpg';
import uiux from './assets/UI.jpg';
import seo from './assets/SEO-image1.jpg';
import cc from './assets/cc.png';
export default function Services() {
return (
<>

<div className="services-container">
    <div className="service-card">
        <h3>Web Development</h3>
        <img src={webdev} alt="Web Development" className="service-image" />
        <p>Building responsive and dynamic websites using modern technologies.</p>
    </div>
    <div className="service-card">
        <h3>UI/UX Design</h3>
        <img src={uiux} alt="UI/UX Design" className="service-image" />
        <p>Creating user-friendly interfaces and enhancing user experience.</p>
    </div>
    <div className="service-card">
        <h3>SEO Optimization</h3>
        <img src={seo} alt="SEO Optimization" className="service-image" />
        <div className="service-icon">🔍</div>
        <p>Improving website visibility and search engine rankings.</p>
    </div>
    <div className="service-card">
        <h3>Content Creation</h3>
        <img src={cc} alt="Content Creation" className="service-image" />
        <div className="service-icon">✍️</div>
        <p>Producing engaging content tailored to your audience.</p>
    </div>
    


</div>
<p><i><center>Images are sourced from Google and belong to their respective owners.</center></i></p>
</>
);
}

