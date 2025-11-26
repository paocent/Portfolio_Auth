// src/user/API JS/api-education.js

const API_BASE = `${import.meta.env.VITE_API_URL}/api/contacts/`;

// --- Helper Functions (Ensuring robust response handling) ---

const handleResponse = async (response) => {
    // 1. Check for success first. If OK (200, 201), parse the body and return the data.
    if (response.ok) {
        // Attempt to parse response body as JSON
        try {
            return await response.json();
        } catch (err) {
            // Handle cases where response.ok is true but body is empty or malformed JSON
            console.error("Successfully received response but failed to parse JSON:", err);
            // Return an empty object or null for a successful but empty response
            return {}; 
        }
    }

    // 2. If status is NOT OK (e.g., 400, 401, 500), try to extract the detailed error body.
    try {
        const contentType = response.headers.get("content-type");
        
        if (contentType && contentType.includes("application/json")) {
            // Server sent a JSON error body (like the Mongoose validation error)
            const errorData = await response.json();
            
            // Throw a structured error that contains the full error body (including 'errors' and '_message')
            // The frontend will catch this and extract the specific message.
            throw { error: errorData };
        } else {
            // Server sent a non-JSON error (e.g., HTML, plain text error page)
            const errorText = await response.text();
            console.error("Server responded with non-JSON error:", errorText);
            throw { error: `Server error (${response.status}): ${response.statusText}` };
        }
    } catch (err) {
        // Catch network errors, response.json() errors, or the error object thrown above
        // Re-throw the structured error.
        throw err;
    }
};

const handleError = (err) => {
    // This function handles errors thrown from handleResponse or network errors.
    console.error("API call failed:", err);
    
    // If the error has the structure we created in handleResponse (e.g., { error: { ...details... }})
    if (err && err.error) {
        return err; // Return the structured error object { error: data }
    } 
    
    // Handle generic network errors or unknown errors
    return { error: err.message || "An unknown network error occurred" }; 
};

// --- CRUD Functions (Minor fixes for clarity and consistency) ---

const create = async (education, { t }) => {
    try {
        const response = await fetch(API_BASE, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${t}`,
            },
            body: JSON.stringify(education),
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

const read = async ({ educationId }, { t }, signal) => {
    try {
        const response = await fetch(`${API_BASE}${educationId}`, { 
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

const update = async ({ educationId }, { t }, education) => {
    try {
        const response = await fetch(`${API_BASE}${educationId}`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${t}`,
            },
            body: JSON.stringify(education),
        });
        return await handleResponse(response);
    } catch (err) {
        return handleError(err);
    }
};

const remove = async ({ educationId }, { t }) => {
    try {
        const response = await fetch(`${API_BASE}${educationId}`, {
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