// src/user/API JS/api-contacts.js

const API_BASE = `${import.meta.env.VITE_API_URL}/api/contacts/`;

// --- Helper Functions (Ensuring robust response handling) ---

const handleResponse = async (response) => {
    // 1. Check if the response status is NOT OK (e.g., 400, 500)
    if (!response.ok) {
        // Read the error text/HTML from the server, but don't try to parse it as JSON.
        const errorText = await response.text(); 
        
        // Log the full response content for debugging
        console.error(`Server responded with error status: ${response.status}`, errorText);
        
        // Throw a simplified error. This prevents the "Invalid status code" JSON parsing error.
        throw new Error(`API call failed with status: ${response.status}. Details: ${errorText.substring(0, 100)}...`);
    }

    // 2. If the response IS OK (200, 201, 204), check content type.
    const contentType = response.headers.get("content-type");
    
    // Check if the response has content AND is JSON
    if (contentType && contentType.includes("application/json")) {
        // Try to parse JSON for successful, JSON-containing responses
        try {
            const data = await response.json();
            if (data.error) {
                // Throw if the server successfully returns JSON but includes an error key
                throw new Error(data.error);
            }
            return data;
        } catch (err) {
            console.error("Failed to parse successful response JSON:", err);
            throw new Error("Failed to process server response.");
        }
    }
    
    // 3. Handle successful responses that are not JSON (like a 204 No Content for a successful delete).
    return {}; 
};

const handleError = (err) => {
    console.error("API call failed:", err);
    // Return the error message from the thrown Error object
    return { error: err.message || "An unknown network error occurred" }; 
};

// --- CRUD Functions (These remain largely unchanged as they call the helper) ---

const create = async (contact, { t }) => {
    try {
        const response = await fetch(API_BASE, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${t}`,
            },
            body: JSON.stringify(contact),
        });
        return await handleResponse(response);
    } catch (err) {
        return handleError(err);
    }
};

const list = async (credentials, signal) => { 
    try {
        const response = await fetch(API_BASE, {
            method: "GET",
            signal,
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${credentials.t}`,
            },
        });
        return await handleResponse(response);
    } catch (err) {
        return handleError(err);
    }
};

const read = async ({ contactId }, { t }, signal) => {
    try {
        const response = await fetch(`${API_BASE}${contactId}`, { 
            method: "GET",
            signal,
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${t}`,
            },
        });
        return await handleResponse(response);
    } catch (err) {
        return handleError(err);
    }
};

const update = async ({ contactId }, { t }, contact) => {
    try {
        const response = await fetch(`${API_BASE}${contactId}`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${t}`,
            },
            body: JSON.stringify(contact),
        });
        return await handleResponse(response);
    } catch (err) {
        return handleError(err);
    }
};

const remove = async ({ contactId }, { t }) => {
    try {
        const response = await fetch(`${API_BASE}${contactId}`, { 
            method: "DELETE",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${t}`,
            },
        });
        return await handleResponse(response);
    } catch (err) {
        return handleError(err);
    }
};

export { create, list, read, update, remove };