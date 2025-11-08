
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import auth from "../auth/auth-helper";

export default function SignOut() {
    const navigate = useNavigate();
    useEffect(() => {
        auth.signout(() => navigate("/"));
    }, [navigate]);

    return null;
}