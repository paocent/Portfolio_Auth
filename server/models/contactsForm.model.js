import mongoose from 'mongoose'

const contactMessageSchema = new mongoose.Schema({
    // Fields directly from your React form (Contact.jsx)
    firstName: {
        type: String,
        trim: true,
        required: 'First name is required'
    },
    lastName: {
        type: String,
        trim: true,
        required: 'Last name is required'
    },
    email: {
        type: String,
        trim: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
        required: 'Email is required'
    },
    message: { // This is the new key from your <textarea>
        type: String,
        required: 'Message content is required'
    },
    
    // Auto-generated timestamp for when the message was received
    sentAt: {
        type: Date,
        default: Date.now
    }
});

// Export the model. We'll name the collection 'ContactMessages'
export default mongoose.model('ContactMessage', contactMessageSchema);