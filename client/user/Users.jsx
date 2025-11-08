import { useState, useEffect } from "react";
import {
    Paper,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    IconButton,
    Avatar,
    Typography,
} from "@mui/material";
import ArrowForward from "@mui/icons-material/ArrowForward";
import { list } from "./api-user.js";
import { Link as RouterLink } from "react-router-dom";

export default function Users() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        list(signal).then((data) => {
            if (data?.error) {
                console.log(data.error);
            } else {
                setUsers(data);
            }
        });

        return () => abortController.abort();
    }, []);

    return (
        <Paper
            elevation={4}
            sx={{
                maxWidth: 600,
                mx: "auto",
                mt: 5,
                p: 3,
            }}
        >
            <Typography variant="h6" sx={{ mb: 2, color: "text.primary" }}>
                All Users
            </Typography>

            <List dense>
                {users.map((item) => (
                    <ListItem
                        button
                        component={RouterLink}
                        to={`/user/${item._id}`}
                        key={item._id}
                        secondaryAction={
                            <IconButton edge="end">
                                <ArrowForward />
                            </IconButton>
                        }
                    >
                        <ListItemAvatar>
                            <Avatar />
                        </ListItemAvatar>
                        <ListItemText primary={item.name} />
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
}