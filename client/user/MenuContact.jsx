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
// 🚨 NOTE: We now use the 'list' function from the API
import { list } from "./api-contacts.js"; 
import { useLocation, Navigate, Link } from "react-router-dom"; 
// useParams is not needed for a list view, so it's removed if it was here

export default function MenuContacts() {
    const location = useLocation();
    // 💡 contacts is now initialized as an empty ARRAY
    const [contacts, setContacts] = useState([]); 
    const [redirectToSignin, setRedirectToSignin] = useState(false);
    const jwt = auth.isAuthenticated();
    // const userId = jwt.user && jwt.user._id; // Not needed for general list
    
    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        
        // 1. CALL THE LIST FUNCTION (No ID parameter needed)
        list(signal).then((data) => { 
            if (data && data.error) {
                // If the error is due to authentication, redirect
                if (data.error === "Unauthorized") {
                    setRedirectToSignin(true);
                } else {
                    console.error("Failed to fetch contact list:", data.error);
                }
            } else {
                // 2. Set the state with the returned array of contacts
                setContacts(data); 
            }
        });
        
        return () => abortController.abort();
    }, [jwt.token]); // Dependency array simplified

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
                {/* 3. MAP over the 'contacts' array to display each item */}
                {contacts.length === 0 ? (
                    <ListItem>
                        <ListItemText 
                            primary={
                                contacts.length === 0 ? "No contacts found or still loading..." : "Loading..."
                            }
                        />
                    </ListItem>
                ) : (
                    contacts.map((contact, i) => (
                        <span key={i}>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <PersonIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                {/* Display name and email */}
                                <ListItemText 
                                    primary={contact.name} 
                                    secondary={contact.email} 
                                />
                                
                                {/* Show Edit/Delete only if the logged-in user owns this contact */}
                                {auth.isAuthenticated().user &&
                                    auth.isAuthenticated().user._id === contact._id && (
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
                    ))
                )}
            </List>
        </Paper>
    );
}