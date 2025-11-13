// src/user/Contacts-Menu/NewContacts.jsx

import React, { useState } from "react";
import {
    Card, CardActions, CardContent, Button, TextField, Typography, Icon,
} from "@mui/material";
import auth from "../../lib/auth-helper.js";
import { create } from "../API JS/api-contacts.js";
import { Navigate } from "react-router-dom";

export default function NewContacts() {
    const [values, setValues] = useState({
        firstName: "",
        lastName: "",
        email: "",
        error: "",
        redirectToContacts: false,
    });

    const jwt = auth.isAuthenticated();

    const handleChange = (name) => (event) => {
        setValues((prev) => ({ ...prev, [name]: event.target.value, error: "" }));
    };

    const clickSubmit = () => {
        const contact = {
            firstName: values.firstName || undefined,
            lastName: values.lastName || undefined,
            email: values.email || undefined,
        };

        // Call the API create function
        create(contact, { t: jwt.token }).then((data) => {
            if (data?.error) {
                setValues((prev) => ({ ...prev, error: data.error }));
            } else {
                setValues((prev) => ({
                    ...prev,
                    error: "",
                    redirectToContacts: true,
                }));
            }
        });
    };

    if (values.redirectToContacts) {
        // Redirect to the list view after successful creation
        return <Navigate to={`/contacts`} />;
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
                    New Contact
                </Typography>
                
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
                    type="email"
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
                        {values.error}
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