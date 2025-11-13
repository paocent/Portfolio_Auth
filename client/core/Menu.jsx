import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import Button from "@mui/material/Button";
import auth from "../lib/auth-helper";
import { Link, useNavigate, useLocation } from "react-router-dom";

// Helper function to set link color based on active path (exact match)
const isActive = (location, path) =>
    location.pathname === path ? "#ff4081" : "#ffffff";

// Helper function for partial match (used for dynamic paths like /user/:userId or base links like /contacts)
const isPartiallyActive = (location, path) => {
    // Exact match takes precedence
    if (location.pathname === path) return "#ff4081";
    
    // Check if the current path starts with the base path
    // We check against the full base path to avoid false positives (e.g., matching /contact-static for /contacts)
    return location.pathname.startsWith(path) ? "#ff4081" : "#ffffff";
};

export default function Menu() {
    const navigate = useNavigate();
    const location = useLocation();
    const isAuthenticated = auth.isAuthenticated();
    const userId = isAuthenticated ? isAuthenticated.user._id : null;

    return (
        <AppBar position="static">
            <Toolbar sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Profile App
                </Typography>

                {/* --- Public Links --- */}
                <Link to="/">
                    <IconButton aria-label="Home" sx={{ color: isActive(location, "/") }}>
                        <HomeIcon />
                    </IconButton>
                </Link>

                <Link to="/users">
                    <Button sx={{ color: isActive(location, "/users") }}>Users</Button>
                </Link>

                {!isAuthenticated && (
                    <>
                        <Link to="/signup">
                            <Button sx={{ color: isActive(location, "/signup") }}>
                                Sign up
                            </Button>
                        </Link>

                        <Link to="/signin">
                            <Button sx={{ color: isActive(location, "/signin") }}>
                                Sign In
                            </Button>
                        </Link>
                    </>
                )}

                {/* --- Authenticated Links --- */}
                {isAuthenticated && (
                    <>
                        {/* 1. Profile Link (Correctly uses the user ID and partial match) */}
                        <Link to={`/user/${userId}`}>
                            <Button
                                sx={{
                                    color: isPartiallyActive(location, `/user/${userId}`),
                                }}
                            >
                                My Profile
                            </Button>
                        </Link>

                        {/* 2. Contacts Link (Links to /contacts list view) */}
                        <Link to="/contacts">
                            <Button 
                                // Uses isPartiallyActive to highlight for /contacts/new or /contacts/edit/:contactId
                                sx={{ color: isPartiallyActive(location, "/contacts") }}
                            >
                                Contacts
                            </Button>
                        </Link>

                        {/* 3. Education Link (Links to /education-list view) */}
                        <Link to="/education-list"> 
                            <Button 
                                // Highlights if path starts with /education-list or /education/edit/
                                sx={{ color: isPartiallyActive(location, "/education") }} 
                            >
                                Education
                            </Button>
                        </Link>
                        
                        {/* 4. Sign Out */}
                        <Button
                            sx={{ color: "#ffffff" }}
                            onClick={() => {
                                auth.clearJWT(() => navigate("/"));
                            }}
                        >
                            Sign out
                        </Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
}