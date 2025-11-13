// src/user/Education-Menu/NewEducation.jsx

import React, { useState } from "react";
import {
    Card, CardActions, CardContent, Button, TextField, Typography, Icon,
} from "@mui/material";
import auth from "../../lib/auth-helper.js";
import { create } from "../API JS/api-education.js";
import { Navigate } from "react-router-dom";

export default function NewEducation() {
    const [values, setValues] = useState({
        institution: "",
        degree: "",
        year: "", // Stored as a string from the text field
        error: "",
        redirectToEducation: false,
    });

    const jwt = auth.isAuthenticated();

    const handleChange = (name) => (event) => {
        setValues((prev) => ({ ...prev, [name]: event.target.value, error: "" }));
    };

    const clickSubmit = () => {
        const education = {
            institution: values.institution || undefined,
            degree: values.degree || undefined,
            // Ensure year is saved as a number if your schema requires it, otherwise string is fine.
            year: values.year || undefined, 
        };

        // Call the API create function
        create(education, { t: jwt.token }).then((data) => {
            if (data?.error) {
                setValues((prev) => ({ ...prev, error: data.error }));
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
        // Redirect to the education list view after successful creation
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
                    id="institution"
                    label="Institution Name"
                    value={values.institution}
                    onChange={handleChange("institution")}
                    margin="normal"
                    sx={{ mx: 1, width: 300 }}
                />
                <br />
                
                <TextField
                    id="degree"
                    label="Degree/Qualification"
                    value={values.degree}
                    onChange={handleChange("degree")}
                    margin="normal"
                    sx={{ mx: 1, width: 300 }}
                />
                <br />
                
                <TextField
                    id="year"
                    label="Year Completed"
                    type="number" // Use number type for a better input experience
                    value={values.year}
                    onChange={handleChange("year")}
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