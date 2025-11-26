const API_URL = import.meta.env.VITE_API_URL;   // http://localhost:3000
const API_BASE = `${API_URL}/api/users`;

const handleResponse = async (response) => {
    try {
        return await response.json();
    } catch (err) {
        console.error("Failed to parse response JSON:", err);
        throw err;
    }
};

const handleError = (err) => {
    console.error("API call failed:", err);
    throw err;
};

const create = async (user) => {
    try {
        const response = await fetch(API_BASE, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
            credentials: "include",
        });
        return await handleResponse(response);
    } catch (err) {
        return handleError(err);
    }
};

const list = async (signal) => {
    try {
        const response = await fetch(API_BASE, {
            method: "GET",
            signal,
            credentials: "include",
        });
        return await handleResponse(response);
    } catch (err) {
        return handleError(err);
    }
};

const read = async ({ userId }, { t }, signal) => {
    try {
        const response = await fetch(`${API_BASE}/${userId}`, {
            method: "GET",
            signal,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${t}`,
            },
            credentials: "include",
        });
        return await handleResponse(response);
    } catch (err) {
        return handleError(err);
    }
};

const update = async ({ userId }, { t }, user) => {
    try {
        const response = await fetch(`${API_BASE}/${userId}`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${t}`,
            },
            body: JSON.stringify(user),
            credentials: "include",
        });
        return await handleResponse(response);
    } catch (err) {
        return handleError(err);
    }
};

const remove = async ({ userId }, { t }) => {
    try {
        const response = await fetch(`${API_BASE}/${userId}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${t}`,
            },
            credentials: "include",
        });
        return await handleResponse(response);
    } catch (err) {
        return handleError(err);
    }
};

export { create, list, read, update, remove };
