// src/user/Contacts-Menu/MenuContacts.jsx

import React, { useState, useEffect, useCallback } from "react";
import {
    Paper, List, ListItem, ListItemAvatar, ListItemSecondaryAction,
    ListItemText, Avatar, IconButton, Typography, Divider, CircularProgress,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from "@mui/icons-material/Person";
import AddBoxIcon from "@mui/icons-material/AddBox"; 
import DeleteContact from "./DeleteContacts.jsx";
import auth from "../../lib/auth-helper.js";
import { list } from "../API JS/api-contacts.js";
import { useLocation, Navigate, Link } from "react-router-dom"; 

export default function MenuContacts() {
    const location = useLocation();
    const [contacts, setContacts] = useState([]); 
    const [redirectToSignin, setRedirectToSignin] = useState(false);
    const [loading, setLoading] = useState(true);

    const jwt = auth.isAuthenticated(); 
    const currentUserId = jwt.user ? jwt.user._id : null;
    const isAdmin = jwt.user && jwt.user.role === "admin"; 

    const removeContact = useCallback((deletedContactId) => {
        setContacts(prevContacts => prevContacts.filter(
            (contact) => contact._id !== deletedContactId
        ));
    }, []);

    useEffect(() => {
        if (!jwt) {
            setRedirectToSignin(true);
            return;
        }
        
        const abortController = new AbortController();
        const signal = abortController.signal;
        
        // 💡 FIX: Pass the JWT token for authorization
        list({ t: jwt.token }, signal).then((data) => { 
            setLoading(false);
            if (data && data.error) {
                if (data.error.includes("Unauthorized") || data.error.includes("401")) {
                    setRedirectToSignin(true);
                } else {
                    console.error("Failed to fetch contact list:", data.error);
                }
            } else {
                setContacts(data); 
            }
        });
        
        // Cleanup function: Aborts the API call if the component unmounts
        return () => abortController.abort();
        
    }, [jwt.token]); // Dependency array includes token

    if (redirectToSignin) {
        return <Navigate to="/signin" state={{ from: location.pathname }} replace />;
    }
    
    const showLoading = loading;
    const noContactsFound = !loading && contacts.length === 0;

    return (
        <Paper elevation={4} sx={{ maxWidth: 600, mx: "auto", mt: 5, p: 3 }}>
            <Typography variant="h6" sx={{ mt: 3, mb: 2, color: "text.primary", display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                All Contacts
                {/* Link to the Create Contact form */}
                <Link to="/contacts/new">
                    <IconButton aria-label="Add" color="secondary">
                        <AddBoxIcon />
                    </IconButton>
                </Link>
            </Typography>
            <List dense>
                {showLoading && (
                    <ListItem sx={{ justifyContent: 'center' }}>
                        <CircularProgress />
                    </ListItem>
                )}
                
                {noContactsFound && (
                    <ListItem>
                        <ListItemText 
                            primary={"No contacts found."}
                        />
                    </ListItem>
                )}
                
                {!showLoading && contacts.length > 0 && (
                    contacts.map((contact, i) => {
                        // Allows admin or the owner (if contact includes an owner ID) to edit/delete
                        // Assuming isOwner/isAdmin logic is determined by the specific requirements
                        const showActions = isAdmin || currentUserId === contact._id; 

                        return (
                            <span key={i}>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar><PersonIcon /></Avatar>
                                    </ListItemAvatar>
                                    <ListItemText 
                                        primary={`${contact.firstName} ${contact.lastName}`} 
                                        secondary={contact.email} 
                                    />
                                    
                                    {showActions && (
                                        <ListItemSecondaryAction>
                                            <Link to={`/contacts/edit/${contact._id}`}>
                                                <IconButton aria-label="Edit" color="primary">
                                                    <EditIcon />
                                                </IconButton>
                                            </Link>
                                            <DeleteContact 
                                                contactId={contact._id} 
                                                onRemove={removeContact}
                                            />
                                        </ListItemSecondaryAction>
                                    )}
                                </ListItem>
                                <Divider />
                            </span>
                        );
                    })
                )}
            </List>
        </Paper>
    );
}