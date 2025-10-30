import React from 'react'
import './MainRouter.css'
import { Route, Routes } from 'react-router-dom'
//import Home from './components/home'
import About from './src/about'
import Contact from './src/contact'
import Education from './src/education'
import Project from './src/project'
import Layout from './components/Layout'
import Home from './core/Home'

const MainRouter = () => {
return (<div className="container">
<Layout/>
<Routes>
<Route exact path="/" element={<Home />} />
<Route exact path="/about" element={<About />} />
<Route exact path="/education" element={<Education />} />
<Route exact path="/project" element={<Project />} />
<Route exact path="/contact" element={<Contact />} />

{/* Outlet for nested routes */}
</Routes>
</div>
)
}
export default MainRouter