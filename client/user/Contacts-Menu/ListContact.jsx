import React, { useState, useEffect, useCallback } from "react";
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
    CircularProgress, // Added for loading state feedback
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from "@mui/icons-material/Person";

// Renamed import to match corrected component name (assuming it's DeleteContact)
import DeleteContact from "./DeleteContacts.jsx";
import auth from "../../lib/auth-helper.js";
import { list } from "../API JS/api-contacts.js";
import { useLocation, Navigate, Link } from "react-router-dom"; 

export default function MenuContacts() {
    const location = useLocation();
    const [contacts, setContacts] = useState([]); 
    const [redirectToSignin, setRedirectToSignin] = useState(false);
    const [loading, setLoading] = useState(true); // New loading state

    // Use isAuthenticated result directly
    const jwt = auth.isAuthenticated(); 
    const currentUserId = jwt.user ? jwt.user._id : null;
    // Check if user is admin once
    const isAdmin = jwt.user && jwt.user.role === "admin"; 

    // Function to filter the deleted contact out of the list state
    const removeContact = useCallback((deletedContactId) => {
        // Create a new array that excludes the contact with the matching ID
        setContacts(prevContacts => prevContacts.filter(
            (contact) => contact._id !== deletedContactId
        ));
    }, []); // useCallback ensures this function doesn't change on every render

    useEffect(() => {
        // Only proceed if authenticated
        if (!jwt) {
            setRedirectToSignin(true);
            return;
        }
        
        const abortController = new AbortController();
        const signal = abortController.signal;
        
        list(signal).then((data) => { 
            setLoading(false); // Data fetching finished
            if (data && data.error) {
                if (data.error === "Unauthorized" || data.error === "User not authorized") {
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
        
    // 💡 CRITICAL FIX: Empty dependency array fixes the AbortError on list loading
    // The list of contacts should only be fetched once on component mount.
    }, []); 

    if (redirectToSignin) {
        return <Navigate to="/signin" state={{ from: location.pathname }} replace />;
    }
    
    // Check for both loading and zero contacts to show the spinner/message
    const showLoading = loading;
    const noContactsFound = !loading && contacts.length === 0;

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
                
                {/* Render the list only if not loading and contacts exist */}
                {!showLoading && contacts.length > 0 && (
                    contacts.map((contact, i) => {
                        // isOwner is likely redundant for a contact list, but kept for logic clarity
                        const isOwner = currentUserId === contact._id;
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
                                        // 💡 REVISED: Combine first and last name for display
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
                                                onRemove={removeContact} // Pass the optimized function
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