import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import './Layout.css';
{/* Importing a logo image from src/asset/LOGO.png */}
import logo from '../src/assets/LOGO.png';
export default function Layout() {
  return (
    <>
      <div className="wrapper">
        <header>
          <img src={logo} alt="Logo" className="logo" />
          <h1>My Portfolio</h1>
          <nav>
            {/* Navigation Links with class for CSS */}
            <Link to="/" className="home">Home</Link> |
            <Link to="/about" className="about">About Me</Link> |
            <Link to="/education" className="education">Education</Link> |
            <Link to="/project" className="project">Project</Link> |
            <Link to="/contact" className="contact">Contact Me</Link>
            | <Link to="/services" className="services">Services</Link>
            | <Link to="/signin" className="signin">Sign In</Link>
          </nav>
        </header>

        <hr />

        <main>
          <Outlet />
          {/* This is where the routed components will be rendered */}
        </main>

        <hr />

        <footer>
          <p>&copy; 2025 My Portfolio. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}