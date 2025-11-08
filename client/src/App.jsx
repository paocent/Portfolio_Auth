import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MainRouter from '../MainRouter'; // will read main router from client/MainRouter.jsx
    const App = () => {
        return (
            <Router>
            <MainRouter />
            </Router>
        );
    };
export default App;