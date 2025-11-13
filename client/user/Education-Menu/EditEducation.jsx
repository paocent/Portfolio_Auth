// src/user/Education-Menu/EditEducation.jsx
import { useState, useEffect } from "react";
import {
    Card, CardActions, CardContent, Button, TextField,
    Typography, Icon,
} from "@mui/material";
import auth from "../../lib/auth-helper.js";
import { read, update } from "../API JS/api-education.js"; // 💡 Changed API import
import { Navigate, useParams } from "react-router-dom";

export default function EditEducation() {
    // 💡 Changed parameter name to match route definition
    const { educationId } = useParams(); 
    
    const [values, setValues] = useState({
        institution: "", // 💡 NEW FIELD
        degree: "",      // 💡 NEW FIELD
        year: "",        // 💡 NEW FIELD
        error: "",
        redirectToEducation: false, // 💡 Changed redirect state
    });
    
    const jwt = auth.isAuthenticated();

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        // 💡 Call read from the education API
        read({ educationId }, { t: jwt.token }, signal).then((data) => {
            if (data?.error) {
                setValues((prev) => ({ ...prev, error: data.error }));
            } else {
                setValues((prev) => ({
                    ...prev,
                    // 💡 Initialize state with education data fields
                    institution: data.institution || "",
                    degree: data.degree || "",
                    year: data.year || "",
                }));
            }
        });

        return () => abortController.abort();
    }, [educationId]); 

    const clickSubmit = () => {
        const educationData = { // 💡 Data object for update
            institution: values.institution || undefined,
            degree: values.degree || undefined,
            year: values.year || undefined, 
        };
        
        // 💡 Call update from the education API
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
        return <Navigate to={`/education`} />; // 💡 Redirect to new education list route
    }

    return (
        <Card sx={{ maxWidth: 600, mx: "auto", mt: 5, textAlign: "center", pb: 2, }}>
            <CardContent>
                <Typography variant="h6" sx={{ mt: 2, mb: 2, color: "text.primary" }}>
                    Edit Education Entry
                </Typography>
                
                {/* 💡 Education Fields */}
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
                    label="Degree/Certificate"
                    value={values.degree}
                    onChange={handleChange("degree")}
                    margin="normal"
                    sx={{ mx: 1, width: 300 }}
                />
                <br />
                <TextField
                    id="year"
                    label="Graduation Year"
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
                    Submit
                </Button>
            </CardActions>
        </Card>
    );
}