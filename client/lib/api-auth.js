const API_URL = import.meta.env.VITE_API_URL;

const signin = async (user) => {
    try {
        let response = await fetch(`${API_URL}/auth/signin`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(user),
        });
        return await response.json();
    } catch (err) {
        console.log("Signin API Error:", err);
    }
};

const signout = async () => {
    try {
        let response = await fetch(`${API_URL}/auth/signout`, { method: "GET" });
        return await response.json();
    } catch (err) {
        console.log("Signout API Error:", err);
    }
};

export { signin, signout };
