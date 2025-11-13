import React, { useState } from "react";
import {
    IconButton,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import auth from "../../lib/auth-helper.js";
import { remove } from "../API JS/api-education.js"; // 💡 Import 'remove' from the education API

export default function DeleteEducation(props) {
    const [open, setOpen] = useState(false);
    const jwt = auth.isAuthenticated();

    // 1. Handles opening the confirmation dialog
    const clickButton = () => {
        setOpen(true);
    };

    // 2. Handles closing the dialog without deleting
    const handleClose = () => {
        setOpen(false);
    };

    // 3. Handles the deletion logic
    const deleteEducation = () => {
        // Calls the remove API function, passing the educationId
        remove({ educationId: props.educationId }, { t: jwt.token }).then((data) => {
            if (data && data.error) {
                console.error("Failed to delete education:", data.error);
                // Optionally show an error message to the user
            } else {
                // On success, close the dialog and call the callback function 
                // passed from MenuEducation.jsx to update the list
                setOpen(false);
                props.onRemove(props.educationId);
            }
        });
    };

    return (
        <span style={{ display: "inline-block" }}>
            {/* The Delete Button */}
            <IconButton
                aria-label="Delete"
                onClick={clickButton}
                color="error"
            >
                <DeleteIcon />
            </IconButton>

            {/* The Confirmation Dialog */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{"Delete Education Entry"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Confirm to permanently delete this education entry.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={deleteEducation} color="error" autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </span>
    );
}