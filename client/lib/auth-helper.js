import { signout } from "./api-auth.js";

const auth = {
    isAuthenticated() {
        if (typeof window === "undefined") return false;
        if (sessionStorage.getItem("jwt"))
            return JSON.parse(sessionStorage.getItem("jwt"));
        else return false;
    },

    authenticate(jwt, cb) {
        if (typeof window !== "undefined")
            sessionStorage.setItem("jwt", JSON.stringify(jwt));
        if (cb) cb();
    },
// Check if the authenticated user is an admin from user role
    isAdmin() {
        const jwt = this.isAuthenticated();
        return jwt && jwt.user.role === "admin";
    },

    clearJWT(cb) {
        if (typeof window !== "undefined") {
            sessionStorage.removeItem("jwt");
        }
        if (cb) cb();
        signout().then((data) => {
            document.cookie = "t=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        });
    },
};

export default auth;