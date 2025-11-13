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
    const isAdmin = jwt.user && jwt.user.role === "admin"; // This is the variable we will use

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
        
        // Handling API call issues observed in previous context
        // Errors like "Server responded with non-JSON content or error status" (404/500)
        // or AbortError can occur here
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
        
        return () => abortController.abort();
        
    }, [jwt.token]);

    if (redirectToSignin) {
        return <Navigate to="/signin" state={{ from: location.pathname }} replace />;
    }
    
    const showLoading = loading;
    const noContactsFound = !loading && contacts.length === 0;

    return (
        <Paper elevation={4} sx={{ maxWidth: 600, mx: "auto", mt: 5, p: 3 }}>
            <Typography variant="h6" sx={{ mt: 3, mb: 2, color: "text.primary", display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                All Contacts
                
                {/* 🔑 FIX: Only show the Add button if the user is an Admin */}
                {isAdmin && (
                    <Link to="/contacts/new">
                        <IconButton aria-label="Add" color="secondary">
                            <AddBoxIcon />
                        </IconButton>
                    </Link>
                )}
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
                        // This logic is for showing the Edit/Delete actions on each item.
                        // It currently allows the owner (if contact._id matches currentUserId) or an admin to see the actions.
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