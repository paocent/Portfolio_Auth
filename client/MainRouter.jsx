// MainRouter.jsx
import React from 'react';
import './MainRouter.css';
import { Route, Routes } from 'react-router-dom';
// Standard Imports
import About from './src/about';
import Contact from './src/contact';
import Education from './src/education';
import Project from './src/project';
import Layout from './components/Layout';
import Services from './src/Services';
import Home from './components/home';
import Users from './user/Users-Menu/Users.jsx';
import Signup from './user/Signup';
import SignIn from './lib/SignIn';
import Profile from './user/Profile-Menu/Profile.jsx';
import PrivateRoute from './lib/PrivateRoute';
import EditProfile from './user/Profile-Menu/EditProfile.jsx';
// --- CONTACTS IMPORTS ---
import MenuContacts from './user/Contacts-Menu/ListContact.jsx';
// 💡 NEW: Assuming your edit contact component is named EditContact.jsx
import EditContact from './user/Contacts-Menu/EditContacts.jsx';
import Menu from './core/Menu';

function MainRouter() {
  return (
    <div className="container">
      <Menu />

      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public Routes */}
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="education" element={<Education />} />
          <Route path="project" element={<Project />} />
          <Route path="contact" element={<Contact />} />
          <Route path="services" element={<Services />} /> 
          <Route path="users" element={<Users />} />
          <Route path="signup" element={<Signup />} />
          <Route path="signin" element={<SignIn />} />
          
          {/* AUTHENTICATED/PRIVATE ROUTES */}
          
          {/* Contacts List Route (Protected) */}
          <Route 
            path="contacts" 
            element={<PrivateRoute><MenuContacts /></PrivateRoute>} 
          />

          {/* 💡 NEW: Edit Contact Route (Protected) */}
          {/* This allows an admin to navigate to /contacts/edit/12345 */}
          <Route
            path="contacts/edit/:contactId"
            element={<PrivateRoute><EditContact /></PrivateRoute>}
          />

          {/* User Profile Routes */}
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