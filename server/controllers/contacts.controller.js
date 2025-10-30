import Contacts from '../models/contacts.model.js'
import extend from 'lodash/extend.js'
import errorHandler from './error.controller.js'

// Helper function to remove sensitive fields from a contact object
const clearSensitiveData = (contact) => {
    // Note: Mongoose document properties must be set to 'undefined' or deleted
    contact.hashed_password = undefined
    contact.salt = undefined
    return contact
}

const create = async (req, res) => {
    const contact = new Contacts(req.body) // Renamed to singular 'contact'
    try {
        await contact.save()
        return res.status(200).json({
            message: "Successfully created contact!" // Updated message
        })
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

// 🎯 REVISION: Updated .select() to include firstName and lastName 
//               while excluding sensitive fields.
const list = async (req, res) => { 
    try {
        let contacts = await Contacts.find({}) // Using singular 'Contacts' model
            .select('firstName lastName email'); // Selecting fields present in your schema
        
        // You might consider excluding 'hashed_password' and 'salt' explicitly 
        // using negative selection if they're not filtered by default in your model.
        // .select('-hashed_password -salt');

        res.json(contacts)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const contactsByID = async (req, res, next, id) => {
    try {
        let contact = await Contacts.findById(id) // Renamed to singular 'contact'
        if (!contact)
            return res.status('400').json({
                error: "Contact not found" // Singularized error message
            })
        req.contact = contact // Storing as req.contact for consistency
        next()
    } catch (err) {
        return res.status('400').json({
            error: "Could not retrieve contact" // Singularized error message
        })
    }
}

// 🎯 REVISION: Using the clearSensitiveData helper and req.contact
const read = (req, res) => {
    // The contactsByID middleware stores the object in req.contact
    return res.json(clearSensitiveData(req.contact))
}

const update = async (req, res) => {
    try {
        let contact = req.contact // Use req.contact from middleware
        contact = extend(contact, req.body)
        contact.updated = Date.now()
        await contact.save()
        
        // 🎯 REVISION: Use the helper to clear sensitive fields before responding
        res.json(clearSensitiveData(contact))
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const remove = async (req, res) => {
    try {
        let contact = req.contact // Use req.contact from middleware
        let deletedContact = await contact.deleteOne() // Renamed to singular
        
        // 🎯 REVISION: Use the helper to clear sensitive fields before responding
        res.json(clearSensitiveData(deletedContact))
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const removeAll = async (req, res) => {
    try {
        const result = await Contacts.deleteMany({}); // Empty object selects ALL documents
        return res.status(200).json({
            message: `Successfully deleted ${result.deletedCount} contacts.`,
            deletedCount: result.deletedCount
        });
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
}

// Exporting with the original function names for router compatibility
export default { 
    create, 
    contactsByID, // Note: This function name might be better as contactByID for singular param, but keep for router compatibility
    read, 
    list, 
    remove, 
    update,
    removeAll
}