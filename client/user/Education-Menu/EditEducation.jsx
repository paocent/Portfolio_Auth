// src/user/Education-Menu/EditEducation.jsx (REVISED TO MATCH LIST FIELDS)

import { useState, useEffect } from "react";
import {
    Card, CardActions, CardContent, Button, TextField,
    Typography, Icon,
} from "@mui/material";
import auth from "../../lib/auth-helper.js";
import { read, update } from "../API JS/api-education.js";
import { Navigate, useParams } from "react-router-dom";

export default function EditEducation() {
    const { educationId } = useParams();

    const [values, setValues] = useState({
        // 🚨 REVISED FIELDS based on your MenuEducation List display
        title: "",          // Displays as primary text
        firstName: "",      // Displays in secondary text
        lastName: "",       // Displays in secondary text
        email: "",          // Displays in secondary text
        error: "",
        redirectToEducation: false,
    });

    const jwt = auth.isAuthenticated();

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        read({ educationId }, { t: jwt.token }, signal).then((data) => {
            if (data?.error) {
                setValues((prev) => ({ ...prev, error: data.error }));
            } else {
                setValues((prev) => ({
                    ...prev,
                    // 🚨 Initialize state with the fields found in the MenuEducation List
                    title: data.title || "",
                    firstName: data.firstName || "",
                    lastName: data.lastName || "",
                    email: data.email || "",
                }));
            }
        });

        //return () => abortController.abort();
    }, [educationId]);

    const clickSubmit = () => {
        const educationData = {
            // 🚨 Data object for update using the new fields
            title: values.title || undefined,
            firstName: values.firstName || undefined,
            lastName: values.lastName || undefined,
            email: values.email || undefined,
        };

        update({ educationId }, { t: jwt.token }, educationData).then((data) => {
            if (data?.error) {
                setValues((prev) => ({ ...prev, error: data.error }));
            } else {
                setValues((prev) => ({
                    ...prev,
                    redirectToEducation: true,
                }));
            }
        });
    };

    const handleChange = (name) => (event) => {
        setValues((prev) => ({ ...prev, [name]: event.target.value }));
    };

    if (values.redirectToEducation) {
        return <Navigate to={`/education-list`} />;
    }

    return (
        <Card sx={{ maxWidth: 600, mx: "auto", mt: 5, textAlign: "center", pb: 2, }}>
            <CardContent>
                <Typography variant="h6" sx={{ mt: 2, mb: 2, color: "text.primary" }}>
                    Edit Education Entry
                </Typography>

                {/* 🚨 REVISED FIELDS */}
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
                    label="Contact First Name"
                    value={values.firstName}
                    onChange={handleChange("firstName")}
                    margin="normal"
                    sx={{ mx: 1, width: 300 }}
                />
                <br />
                <TextField
                    id="lastName"
                    label="Contact Last Name"
                    value={values.lastName}
                    onChange={handleChange("lastName")}
                    margin="normal"
                    sx={{ mx: 1, width: 300 }}
                />
                <br />
                <TextField
                    id="email"
                    label="Contact Email"
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