const API_BASE = "/api/contacts/";

const handleResponse = async (response) => {
    // 💡 CRITICAL CHECK: If status is not OK (200-299) OR content type is not JSON, 
    // it's likely an HTML error response from the server routing issue.
    const contentType = response.headers.get("content-type");
    
    if (!response.ok || !contentType || !contentType.includes("application/json")) {
        // Read the body as text to log the HTML/error message
        const errorText = await response.text();
        console.error("Server responded with non-JSON content or error status:", errorText);
        
        // Throw an error that reflects the server's failure to respond with API data
        throw new Error(`Server failed to respond with API data. Status: ${response.status}`);
    }

    try {
        const data = await response.json(); // This is line 8, which was failing
        // If the server sends an error object as JSON, handle it here
        if (data.error) {
            throw data; // Throw the structured error object
        }
        return data;
    } catch (err) {
        console.error("Failed to parse response JSON:", err);
        throw err;
    }
};

const handleError = (err) => {
    console.error("API call failed:", err);
    throw err;
};

const create = async (contacts) => {
    try {
        const response = await fetch(API_BASE, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(contacts),
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
        });
        return await handleResponse(response);
    } catch (err) {
        return handleError(err);
    }
};

// --- FIX APPLIED HERE ---
const read = async ({ id }, { t }, signal) => {
    try {
        // 💡 FIX: Removed the extra slash after API_BASE
        const response = await fetch(`${API_BASE}${id}`, { 
            method: "GET",
            signal,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${t}`,
            },
        });
        return await handleResponse(response);
    } catch (err) {
        return handleError(err);
    }
};

// --- FIX APPLIED HERE ---
const update = async ({ id }, { t }, contacts) => {
    try {
        // 💡 FIX: Removed the extra slash after API_BASE
        const response = await fetch(`${API_BASE}${id}`, { 
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${t}`,
            },
            body: JSON.stringify(contacts),
        });
        return await handleResponse(response);
    } catch (err) {
        return handleError(err);
    }
};

// --- REVISED: Now expects a generic 'id' parameter ---
const remove = async ({ id }, { t }) => {
    try {
        const response = await fetch(`${API_BASE}${id}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${t}`,
            },
        });
        return await handleResponse(response);
    } catch (err) {
        return handleError(err);
    }
};

export { create, list, read, update, remove };