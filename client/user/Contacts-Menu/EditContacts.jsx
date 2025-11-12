import { useState, useEffect } from "react";
import {
    Card,
    CardActions,
    CardContent,
    Button,
    TextField,
    Typography,
    Icon,
} from "@mui/material";
import auth from "../../lib/auth-helper.js";
import { read, update } from "../API JS/api-contacts.js";
import { Navigate, useParams } from "react-router-dom";

export default function EditContact() {
    const { contactId } = useParams(); 
    
    const [values, setValues] = useState({
        // 💡 NEW/REVISED: Added separate first and last name fields
        firstName: "", 
        lastName: "", 
        email: "",
        open: false,
        error: "",
        redirectToContacts: false, 
    });
    
    const jwt = auth.isAuthenticated();

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        read({ id: contactId }, { t: jwt.token }, signal).then((data) => {
            if (data?.error) {
                setValues((prev) => ({ ...prev, error: data.error }));
            } else {
                setValues((prev) => ({
                    ...prev,
                    // 💡 REVISED: Initialize with firstName and lastName from API data
                    firstName: data.firstName || "",
                    lastName: data.lastName || "",
                    email: data.email || "",
                }));
            }
        });

        return () => abortController.abort();
    }, [contactId]); 

    const clickSubmit = () => {
        const contact = {
            // 💡 REVISED: Send firstName, lastName, and email for update
            firstName: values.firstName || undefined,
            lastName: values.lastName || undefined,
            email: values.email || undefined,
        };
        
        update({ id: contactId }, { t: jwt.token }, contact).then((data) => {
            if (data?.error) {
                setValues((prev) => ({ ...prev, error: data.error }));
            } else {
                setValues((prev) => ({
                    ...prev,
                    redirectToContacts: true,
                }));
            }
        });
    };

    const handleChange = (name) => (event) => {
        setValues((prev) => ({ ...prev, [name]: event.target.value }));
    };

    if (values.redirectToContacts) {
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
                    Edit Contact
                </Typography>
                
                {/* 💡 NEW: First Name Field */}
                <TextField
                    id="firstName"
                    label="First Name"
                    value={values.firstName}
                    onChange={handleChange("firstName")}
                    margin="normal"
                    sx={{ mx: 1, width: 300 }}
                />
                <br />
                
                {/* 💡 NEW: Last Name Field */}
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
                    Submit
                </Button>
            </CardActions>
        </Card>
    );
}