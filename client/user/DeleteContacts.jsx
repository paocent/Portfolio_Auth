import React, { useState } from "react";
import PropTypes from "prop-types";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import auth from "../lib/auth-helper.js";
import { remove } from "./API JS/api-contacts.js";
import { Navigate } from "react-router-dom";

// Renamed component to singular for better naming convention
export default function DeleteContact({ contactId }) {
    const [open, setOpen] = useState(false);
    // Set redirect to point to the contact list after deletion
    const [redirect, setRedirect] = useState(false);
    const jwt = auth.isAuthenticated();

    const clickButton = () => {
        setOpen(true);
    };

    // Updated function name and logic to handle contact deletion
    const handleDelete = () => {
        // Call the remove API function, passing contactId and token
        remove({ contactId }, { t: jwt.token }).then((data) => {
            if (data?.error) {
                console.error(data.error);
            } else {
                // SUCCESS: DO NOT call auth.clearJWT(). That logs the user out.
                // Simply set redirect to send the user back to the contact list.
                setRedirect(true);
            }
        });
    };

    const handleRequestClose = () => {
        setOpen(false);
    };

    if (redirect) {
        // Navigate to the contact list page (assuming '/users' is the list)
        return <Navigate to="/users" />;
    }

    return (
        <>
            <IconButton
                aria-label="Delete contact"
                onClick={clickButton}
                color="error"
            >
                <DeleteIcon />
            </IconButton>

            <Dialog open={open} onClose={handleRequestClose}>
                <DialogTitle>Delete Contact</DialogTitle> {/* Corrected Title */}
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this contact? This action is
                        irreversible.
                    </DialogContentText> {/* Corrected Text */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleRequestClose} color="primary">
                        Cancel
                    </Button>
                    <Button
                        onClick={handleDelete} // Call the correct function
                        color="error"
                        variant="contained"
                        autoFocus
                    >
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

// Updated PropType definition to match new component name
DeleteContact.propTypes = {
    contactId: PropTypes.string.isRequired,
};