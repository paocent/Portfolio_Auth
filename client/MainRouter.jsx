// MainRouter.jsx
import React from 'react';
import './MainRouter.css';
import { Route, Routes } from 'react-router-dom';
//import Home from './components/home';
import About from './src/about';
import Contact from './src/contact';
import Education from './src/education';
import Project from './src/project';
import Layout from './components/Layout';
import Services from './src/Services';
import Home from './core/Home';

const MainRouter = () => {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="education" element={<Education />} />
          <Route path="project" element={<Project />} />
          <Route path="contact" element={<Contact />} />
          <Route path="services" element={<Services />} />
          
        </Route>
      </Routes>
    </div>
  );
};

export default MainRouter;