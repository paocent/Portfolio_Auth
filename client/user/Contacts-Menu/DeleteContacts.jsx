// In client/user/Contacts-Menu/DeleteContact.jsx

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
// 💡 Path adjustment confirmed from previous steps
import auth from "../../lib/auth-helper.js"; 
import { remove } from "../API JS/api-contacts.js"; // Note: This uses api-contacts.js

// 💡 Accepts the onRemove function from the parent list component
export default function DeleteContact({ contactId, onRemove }) {
    const [open, setOpen] = useState(false);
    // ❌ Removed 'redirect' state and <Navigate> hook
    const jwt = auth.isAuthenticated();

    const clickButton = () => {
        setOpen(true);
    };

    const deleteContact = () => {
        remove({ id: contactId }, { t: jwt.token }).then((data) => {
            if (data?.error) {
                console.error(data.error);
            } else {
                // 💡 Call the onRemove function passed from the parent
                onRemove(contactId);
                setOpen(false); // Close the dialog after deletion
            }
        });
    };

    const handleRequestClose = () => {
        setOpen(false);
    };

    // ❌ Removed conditional redirect check

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
                <DialogTitle>Delete Contact</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this contact? This action is
                        irreversible.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleRequestClose} color="primary">
                        Cancel
                    </Button>
                    <Button
                        onClick={deleteContact}
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

DeleteContact.propTypes = {
    contactId: PropTypes.string.isRequired,
    onRemove: PropTypes.func.isRequired, // 💡 Must include the new prop
};