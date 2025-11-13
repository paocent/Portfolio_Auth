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
import DeleteUser from "../Users-Menu/DeleteUser.jsx";
import auth from "../../lib/auth-helper.js";
import { read } from "../API JS/api-user.js";
import { useLocation, Navigate, Link, useParams } from "react-router-dom";

export default function Profile() {
    const location = useLocation();
    const [user, setUser] = useState({});
    const [redirectToSignin, setRedirectToSignin] = useState(false);
    const jwt = auth.isAuthenticated();
    const { userId } = useParams();

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        read({ userId }, { t: jwt.token }, signal).then((data) => {
            if (data && data.error) {
                setRedirectToSignin(true);
            } else {
                setUser(data);
            }
        });
        return () => abortController.abort();
    }, [userId]);

    if (redirectToSignin) {
        return <Navigate to="/signin" state={{ from: location.pathname }} replace />;
    }

    // Safely determine the role for display
    const userRole = user.role ? user.role.toUpperCase() : 'N/A';
    const primaryText = user.name ? user.name : 'Loading...';

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
                Profile
            </Typography>
            <List dense>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <PersonIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={primaryText} secondary={user.email} />
                    {auth.isAuthenticated().user &&
                        auth.isAuthenticated().user._id === user._id && (
                            <ListItemSecondaryAction>
                                <Link to={`/user/edit/${user._id}`}>
                                    <IconButton aria-label="Edit" color="primary">
                                        <EditIcon />
                                    </IconButton>
                                </Link>
                                <DeleteUser userId={user._id} />
                            </ListItemSecondaryAction>
                        )}
                </ListItem>
                <Divider />
                
                {/* 💡 NEW: Display User Role */}
                <ListItem>
                    <ListItemText
                        primary={`User Role: ${userRole}`}
                        // Optional: Use a subtitle for emphasis or context
                        secondary={userRole === 'ADMIN' ? "Authorized to manage contacts and users." : "Standard user privileges."}
                    />
                </ListItem>
                <Divider />
                
                <ListItem>
                    <ListItemText
                        primary={
                            user.created
                                ? `Joined: ${new Date(user.created).toDateString()}`
                                : "Loading..."
                        }
                    />
                </ListItem>
            </List>
        </Paper>
    );
}