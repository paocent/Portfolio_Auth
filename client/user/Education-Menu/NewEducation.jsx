// src/user/Education-Menu/NewEducation.jsx

import React, { useState } from "react";
import {
    Card, CardActions, CardContent, Button, TextField, Typography, Icon,
} from "@mui/material";
import auth from "../../lib/auth-helper.js";
import { create } from "../API JS/api-education.js";
import { Navigate } from "react-router-dom";

// Helper function to extract and format the validation error
// This function is key to pulling the Mongoose message out of the error object
const formatValidationError = (errorData) => {
    // Check if the structure contains Mongoose validation details
    if (errorData?.errors) {
        // Check specifically for the email error message
        if (errorData.errors.email && errorData.errors.email.message) {
            return errorData.errors.email.message; // e.g., "Please fill a valid email address"
        }
        
        // If there are other errors (like the password one you commented out), 
        // return the main validation message
        return errorData._message || "Validation failed with missing data.";
        
    } else if (typeof errorData === 'string') {
        // Handle simpler string errors
        return errorData;
    }
    
    // Default fallback message
    return "Server failed to respond with API data. Status: 400";
};


export default function NewEducation() {
    const [values, setValues] = useState({
        title: "",
        firstName: "",
        lastName: "", 
        email: "",
        error: "",
        redirectToEducation: false,
    });
    // ... (rest of the component logic for handleChange, clickSubmit, and rendering)

    const jwt = auth.isAuthenticated();

    const handleChange = (name) => (event) => {
        setValues((prev) => ({ ...prev, [name]: event.target.value, error: "" }));
    };

    const clickSubmit = () => {
        const education = {
            title: values.title || undefined,
            firstName: values.firstName || undefined,
            lastName: values.lastName || undefined, 
            email: values.email || undefined,
        };

        // Call the API create function
        create(education, { t: jwt.token }).then((data) => {
            if (data?.error) {
                // ✅ Use the helper function to format the error object
                const clientError = formatValidationError(data.error);
                setValues((prev) => ({ ...prev, error: clientError }));
            } else {
                setValues((prev) => ({
                    ...prev,
                    error: "",
                    redirectToEducation: true,
                }));
            }
        });
    };

    if (values.redirectToEducation) {
        return <Navigate to={`/education-list`} />; 
    }

    return (
        <Card
            sx={{
                maxWidth: 600,
                mx: "auto",
                mt: 5,
                textAlign: "center",
                pb: 2,
            }}
        >
            <CardContent>
                <Typography variant="h6" sx={{ mt: 2, mb: 2, color: "text.primary" }}>
                    Add New Education Entry
                </Typography>
                
                <TextField
                    id="title"
                    label="Title/Program Name"
                    value={values.title}
                    onChange={handleChange("title")}
                    margin="normal"
                    sx={{ mx: 1, width: 300 }}
                />
                <br />
                
                <TextField
                    id="firstName"
                    label="First Name"
                    value={values.firstName}
                    onChange={handleChange("firstName")}
                    margin="normal"
                    sx={{ mx: 1, width: 300 }}
                />
                <br />
                
                <TextField
                    id="lastName"
                    label="Last Name"
                    value={values.lastName}
                    onChange={handleChange("lastName")}
                    margin="normal"
                    sx={{ mx: 1, width: 300 }}
                />
                <br />
                
                <TextField
                    id="email"
                    label="Email"
                    value={values.email}
                    onChange={handleChange("email")}
                    margin="normal"
                    sx={{ mx: 1, width: 300 }}
                />
                <br />
                
                {values.error && (
                    <Typography component="p" color="error" sx={{ mt: 1 }}>
                        <Icon color="error" sx={{ verticalAlign: "middle", mr: 1 }}>
                            error
                        </Icon>
                        {values.error} {/* This is where the Mongoose email error appears */}
                    </Typography>
                )}
            </CardContent>
            <CardActions sx={{ justifyContent: "center" }}>
                <Button color="primary" variant="contained" onClick={clickSubmit} sx={{ mb: 2 }}>
                    Create
                </Button>
            </CardActions>
        </Card>
    );
}