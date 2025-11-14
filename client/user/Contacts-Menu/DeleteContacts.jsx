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
import auth from "../../lib/auth-helper.js"; 
import { remove } from "../API JS/api-contacts.js"; 

export default function DeleteContact({ contactId, onRemove }) {
    const [open, setOpen] = useState(false);
    const jwt = auth.isAuthenticated();

    const clickButton = () => {
        setOpen(true);
    };

    const deleteContact = () => {
        // 🛑 FIX HERE: Change { id: contactId } to { contactId: contactId } 
        // to match the expected parameter name in api-contacts.js
        remove({ contactId: contactId }, { t: jwt.token }).then((data) => {
            if (data?.error) {
                // Now that the ID is correct, this will log proper errors if any occur
                console.error("Delete Error:", data.error);
            } else {
                onRemove(contactId);
                setOpen(false); 
            }
        });
    };

    const handleRequestClose = () => {
        setOpen(false);
    };

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
    onRemove: PropTypes.func.isRequired,
};