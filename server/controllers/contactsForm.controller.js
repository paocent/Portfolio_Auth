import ContactMessage from '../models/contactsForm.model.js' // Import the new model
import errorHandler from './error.controller.js' // Keep your error handler

// This is the only function needed for the contact form:
// It receives data from the React front-end and saves it.
const create = async (req, res) => {
    // 1. Create a new document instance using the request body (req.body)
    const message = new ContactMessage(req.body) 
    
    try {
        // 2. Save the message to MongoDB
        await message.save()
        
        // 3. Send a success response back to the React front-end
        return res.status(200).json({
            message: "Message received successfully! We'll be in touch."
        })
    } catch (err) {
        // 4. Handle any validation or database errors
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err) // Uses your existing error handler
        })
    }
}

export default { 
    create // Only export the create function
}