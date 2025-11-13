// src/user/Education-Menu/MenuEducation.jsx
import React, { useState, useEffect, useCallback } from "react";
import {
    Paper, List, ListItem, ListItemAvatar, ListItemSecondaryAction,
    ListItemText, Avatar, IconButton, Typography, Divider, CircularProgress,
    Button
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SchoolIcon from "@mui/icons-material/School"; 
import AddBoxIcon from "@mui/icons-material/AddBox"; // Add an icon for Create
import DeleteEducation from "./DeleteEducation.jsx";
import auth from "../../lib/auth-helper.js";
import { list } from "../API JS/api-education.js"; 
import { useLocation, Navigate, Link } from "react-router-dom"; 

export default function MenuEducation() {
    const location = useLocation();
    const [education, setEducation] = useState([]);
    const [redirectToSignin, setRedirectToSignin] = useState(false);
    const [loading, setLoading] = useState(true);
    
    const jwt = auth.isAuthenticated(); 
    const isAdmin = jwt.user && jwt.user.role === "admin"; 

    const removeEducation = useCallback((deletedId) => {
        // Optimistically update the list after deletion
        setEducation(prev => prev.filter(item => item._id !== deletedId));
    }, []);

    useEffect(() => {
        if (!jwt) {
            setRedirectToSignin(true);
            return;
        }
        
        const abortController = new AbortController();
        const signal = abortController.signal;
        
        // 💡 FIX: Pass the JWT credentials object for authorization
        list({ t: jwt.token }, signal).then((data) => { 
            setLoading(false);
            if (data && data.error) {
                if (data.error === "Unauthorized" || data.error === "Server failed to respond with API data. Status: 401") {
                    // Force re-login if token is invalid or expired
                    setRedirectToSignin(true);
                } else {
                    // Log other errors (e.g., 404, server down)
                    console.error("Failed to fetch education list:", data.error);
                }
            } else {
                setEducation(data); 
            }
        });
        
        return () => abortController.abort();
    }, [jwt.token]); // Included jwt.token in dependencies for completeness, though it usually doesn't change here

    if (redirectToSignin) {
        return <Navigate to="/signin" state={{ from: location.pathname }} replace />;
    }
    
    // Optional: Render loading spinner if data is being fetched
    if (loading) {
        return (
            <Paper elevation={4} sx={{ maxWidth: 600, mx: "auto", mt: 5, p: 3, textAlign: 'center' }}>
                <CircularProgress />
                <Typography variant="body1">Loading Education Data...</Typography>
            </Paper>
        );
    }


    return (
        <Paper elevation={4} sx={{ maxWidth: 600, mx: "auto", mt: 5, p: 3, }}>
            <Typography variant="h6" sx={{ mt: 3, mb: 2, color: "text.primary", display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                My Education
                {/* 💡 NEW: Link to the Create Education form */}
                {isAdmin && (
                    <Link to="/education/new">
                        <IconButton aria-label="Add" color="secondary">
                            <AddBoxIcon />
                        </IconButton>
                    </Link>
                )}
            </Typography>
            <List dense>
                {/* Check for empty list */}
                {education.length === 0 && !loading && (
                    <Typography variant="body1" sx={{ p: 2, textAlign: 'center' }}>
                        No education entries found.
                    </Typography>
                )}

                {/* Render Education Items */}
                {education.length > 0 && (
                    education.map((item, i) => {
                        const showActions = isAdmin; 
                        
                        return (
                            <span key={i}>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar><SchoolIcon /></Avatar>
                                    </ListItemAvatar>
                                    <ListItemText 
                                        primary={item.institution} 
                                        secondary={`${item.degree} (${item.year})`} 
                                    />
                                    
                                    {showActions && (
                                        <ListItemSecondaryAction>
                                            <Link to={`/education/edit/${item._id}`}>
                                                <IconButton aria-label="Edit" color="primary">
                                                    <EditIcon />
                                                </IconButton>
                                            </Link>
                                            <DeleteEducation 
                                                educationId={item._id} 
                                                onRemove={removeEducation} 
                                            />
                                        </ListItemSecondaryAction>
                                    )}
                                </ListItem>
                                <Divider />
                            </span>
                        )
                    })
                )}
            </List>
        </Paper>
    );
}