import React, { useState, useEffect } from "react";
import {
    Paper,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    Avatar,
    IconButton,
    Typography,
    Divider,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from "@mui/icons-material/Person";
import DeleteContacts from "./DeleteContacts.jsx";
import auth from "../lib/auth-helper.js";
import { list } from "./api-contacts.js"; 
import { useLocation, Navigate, Link } from "react-router-dom"; 

export default function MenuContacts() {
    const location = useLocation();
    const [contacts, setContacts] = useState([]); 
    const [redirectToSignin, setRedirectToSignin] = useState(false);
    
    // Get JWT once
    const jwt = auth.isAuthenticated(); 
    
    // Define isAdmin based on the JWT
    const isAdmin = jwt.user && jwt.user.role === "admin"; 
    
    // Get the current user's ID to check for ownership
    const currentUserId = jwt.user ? jwt.user._id : null;
    
    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        
        list(signal).then((data) => { 
            if (data && data.error) {
                if (data.error === "Unauthorized") {
                    setRedirectToSignin(true);
                } else {
                    console.error("Failed to fetch contact list:", data.error);
                }
            } else {
                setContacts(data); 
            }
        });
        
        return () => abortController.abort();
    }, [jwt.token]); 

    if (redirectToSignin) {
        return <Navigate to="/signin" state={{ from: location.pathname }} replace />;
    }

    return (
        <Paper
            elevation={4}
            sx={{
                maxWidth: 600,
                mx: "auto",
                mt: 5,
                p: 3,
            }}
        >
            <Typography variant="h6" sx={{ mt: 3, mb: 2, color: "text.primary" }}>
                All Contacts
            </Typography>
            <List dense>
                {contacts.length === 0 ? (
                    <ListItem>
                        <ListItemText 
                            primary={
                                contacts.length === 0 ? "No contacts found or still loading..." : "Loading..."
                            }
                        />
                    </ListItem>
                ) : (
                    contacts.map((contact, i) => {
                        // Check if the current contact is owned by the logged-in user
                        const isOwner = currentUserId === contact._id;

                        // NEW LOGIC: Show actions if user is Admin OR user is the Owner
                        const showActions = isAdmin || isOwner;

                        return (
                            <span key={i}>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <PersonIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText 
                                        primary={contact.name} 
                                        secondary={contact.email} 
                                    />
                                    
                                    {/* APPLY THE NEW CONDITIONAL LOGIC */}
                                    {showActions && (
                                        <ListItemSecondaryAction>
                                            <Link to={`/contacts/edit/${contact._id}`}>
                                                <IconButton aria-label="Edit" color="primary">
                                                    <EditIcon />
                                                </IconButton>
                                            </Link>
                                            <DeleteContacts contactId={contact._id} />
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