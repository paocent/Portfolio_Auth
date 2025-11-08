import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import './Layout.css';
{/* FIX: Corrected the relative path for the logo import */}
import logo from '../src/assets/LOGO.png'; 
// Assuming Layout.jsx is in 'src/components/' and LOGO.png is in 'src/assets/'

export default function Layout() {
  return (
    <>
      <div className="wrapper">
        <header>
          {/* Enhanced: Added a container for the logo and title */}
          <div className="header-content"> 
            <img src={logo} alt="Logo" className="logo" />
            <h1>My Portfolio</h1>
          </div>
          <nav>
            {/* Navigation Links with class for CSS - Using fragments for separators */}
            <Link to="/" className="nav-link home">Home</Link> 
            <span className="separator">|</span>
            <Link to="/about" className="nav-link about">About Me</Link> 
            <span className="separator">|</span>
            <Link to="/education" className="nav-link education">Education</Link> 
            <span className="separator">|</span>
            <Link to="/project" className="nav-link project">Project</Link> 
            <span className="separator">|</span>
            <Link to="/contact" className="nav-link contact">Contact Me</Link>
            <span className="separator">|</span>
            <Link to="/services" className="nav-link services">Services</Link>
          </nav>
        </header>

        <hr />

        <main>
          <Outlet />
        </main>

        <hr />

        <footer>
          <p>&copy; 2025 My Portfolio. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}