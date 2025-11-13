// MainRouter.jsx
import React from 'react';
import './MainRouter.css';
import { Route, Routes } from 'react-router-dom';

// --- Standard Imports ---
import About from './src/about';
import Contact from './src/contact';
// 💡 Issue: Rename this for clarity (e.g., StaticEducationPage) if it's not the CRUD list
import StaticEducationPage from './src/education'; 
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
import NewContacts from './user/Contacts-Menu/NewContacts.jsx';
import NewEducation from './user/Education-Menu/NewEducation.jsx';
import Menu from './core/Menu';

// --- FEATURE IMPORTS ---

// CONTACTS
import MenuContacts from './user/Contacts-Menu/ListContact.jsx'; // Contacts List
import EditContact from './user/Contacts-Menu/EditContacts.jsx'; // Edit Contact Form

// EDUCATION (Must match exported names and paths)
// 💡 FIX 1: Ensure imports match your file system and export type (default vs named)
import MenuEducation from './user/Education-Menu/ListEducation.jsx'; // Education List View
import EditEducation from './user/Education-Menu/EditEducation.jsx'; // Edit Education Form


function MainRouter() {
  return (
    <div className="container">
      {/* 💡 FIX 2: Move <Menu /> outside the <Route path="/" element={<Layout />} /> */}
      {/* The Menu should render on every page, while Layout wraps only page content */}
      <Menu /> 

      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public Routes */}
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          
          {/* Static Education Page (If you have one) */}
          {/* 💡 FIX 3: Changed variable name to avoid conflict with CRUD component */}
          <Route path="education" element={<StaticEducationPage />} /> 

          <Route path="project" element={<Project />} />
          <Route path="contact" element={<Contact />} />
          <Route path="services" element={<Services />} /> 
          <Route path="users" element={<Users />} />
          <Route path="signup" element={<Signup />} />
          <Route path="signin" element={<SignIn />} />
          
          {/* AUTHENTICATED/PRIVATE ROUTES */}
          
          {/* 1. CONTACTS Routes */}
          <Route 
            path="contacts" 
            element={<PrivateRoute><MenuContacts /></PrivateRoute>} 
          />
          <Route
            path="contacts/edit/:contactId"
            element={<PrivateRoute><EditContact /></PrivateRoute>}
          />

{/* 💡 FIX: ADD THE NEW CONTACTS CREATION ROUTE */}
            <Route 
                path="contacts/new" 
                element={<PrivateRoute><NewContacts /></PrivateRoute>} 
            />

            {/* 2. EDUCATION Routes (CRUD) */}
            {/* 💡 NEW: Education List View (e.g., /education/list or /education-crud) */}
            {/* We'll use /education-list to avoid conflict with the static /education route */}
            <Route 
                path="education-list" 
                element={<PrivateRoute><MenuEducation /></PrivateRoute>} 
            />
            
            {/* 💡 NEW: Edit Education Route */}
            <Route
                path="education/edit/:educationId"
                element={<PrivateRoute><EditEducation /></PrivateRoute>}
            />
            
          {/* 3. User Profile Routes */}
          {/* Using /user/:userId and /user/edit/:userId is best practice for clarity */}
          <Route path="user/:userId" element={<Profile />} />
          <Route
            path="user/edit/:userId"
            element={<PrivateRoute><EditProfile /></PrivateRoute>}
          />
          
          {/* 💡 CLEANUP: Removed duplicate <Route path="profile" element={<Profile />} /> 
            since /user/:userId serves the same purpose. */}
          
        </Route>
      </Routes>
    </div>
  );
};

export default MainRouter;