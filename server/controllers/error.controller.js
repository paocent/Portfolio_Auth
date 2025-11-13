// server/controllers/error.controller.js

/**
 * Extracts the user-friendly error message from a Mongoose or MongoDB error object.
 * This is crucial for displaying specific validation errors (like bad email format) 
 * on the frontend.
 */

/**
 * 
 * function handleError(req, res) {

// Your code to handle the error

}

function getErrorMessage(errMsg) {

console.log(errMsg);

return errMsg;

}

// Export the controller function

export default {

handleError: handleError,

getErrorMessage:getErrorMessage

};
    */



const getErrorMessage = (err) => {
    // Log the full error object for server-side debugging
    console.log(err); 
    
    let message = 'Server validation failed.'; // Default message

    // 1. Handle MongoDB unique key errors (e.g., duplicate email error code 11000)
    if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                message = 'A resource with this key already exists (e.g., duplicate email or title).';
                break;
            default:
                message = 'An unexpected database error occurred.';
        }
    } 
    
    // 2. Handle Mongoose validation errors (like required fields or email format)
    else if (err.errors) {
        // Iterate through the error properties (e.g., 'email', 'hashed_password')
        for (let propName in err.errors) {
            if (err.errors[propName].message) {
                // Set the message to the specific error text
                message = err.errors[propName].message;
                break; // Stop after finding the first validation message
            }
        }
    }
    
    // Fallback if the error structure is unknown
    return message || 'An unknown error occurred.'; 
};

// Placeholder function (can be used for general error response handling)
function handleError(req, res) {
    // You can implement logging or other generic error handling here
    // Currently, your controller is calling getErrorMessage directly.
}

// Export the controller functions
export default {
    handleError: handleError,
    getErrorMessage: getErrorMessage
};