const API_BASE = "/api/education/"; 

// --- Helper Functions (Ensuring robust response handling) ---

const handleResponse = async (response) => {
    const contentType = response.headers.get("content-type");
    
    // Check for non-OK status or non-JSON content (e.g., HTML error page)
    if (!response.ok || !contentType || !contentType.includes("application/json")) {
        const errorText = await response.text();
        console.error("Server responded with non-JSON content or error status:", errorText);
        
        throw new Error(`Server failed to respond with API data. Status: ${response.status}`);
    }

    try {
        const data = await response.json();
        if (data.error) {
            throw data;
        }
        return data;
    } catch (err) {
        console.error("Failed to parse response JSON:", err);
        throw err;
    }
};

const handleError = (err) => {
    console.error("API call failed:", err);
    // Return the error object or throw a structured error
    return { error: err.message || "An unknown network error occurred" }; 
};

// --- CRUD Functions ---

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
            headers: { // Add headers to send the token
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
        // Correct URL construction: API_BASE + ID (since API_BASE ends in /)
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