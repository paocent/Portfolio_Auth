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
import Home from './components/home';
import Users from './user/Users';
import Signup from './user/Signup';
import SignIn from './lib/SignIn';
import Profile from './user/Profile';
import PrivateRoute from './lib/PrivateRoute';
import EditProfile from './user/EditProfile';
import Menu from './core/Menu';
function MainRouter() {
  return (
    <div className="container">
      <Menu />


      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="education" element={<Education />} />
          <Route path="project" element={<Project />} />
          <Route path="contact" element={<Contact />} />
          <Route path="services" element={<Services />} />          
          <Route path="users" element={<Users />} />
          <Route path="signup" element={<Signup />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="profile" element={<Profile />} />

          <Route
            path="user/edit/:userId"
            element={<PrivateRoute><EditProfile /></PrivateRoute>}
          />
          <Route path="user/:userId" element={<Profile />} />
          

          
   
          
        </Route>
      </Routes>
    </div>
  );
};

export default MainRouter;