import Education from '../models/education.model.js'
import extend from 'lodash/extend.js'
import errorHandler from './error.controller.js'

// Helper function to remove sensitive fields from a education object
const clearSensitiveData = (education) => {
    // Note: Mongoose document properties must be set to 'undefined' or deleted
    education.hashed_password = undefined
    education.salt = undefined
    return education
}

const create = async (req, res) => {
    const education = new Education(req.body) // Renamed to singular 'education'
    try {
        await education.save()
        return res.status(200).json({
            message: "Successfully created education!" // Updated message
        })
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

// Updated .select() to include public fields while excluding sensitive fields.
const list = async (req, res) => { 
    try {
        let educations = await Education.find({}) // Using singular 'Education' model
            .select('title firstName lastName email'); // Selecting fields present in your schema

        res.json(educations)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const educationByID = async (req, res, next, id) => {
    try {
        let education = await Education.findById(id) // Renamed to singular 'education'
        if (!education)
            // FIX 1: Changed status code from string ('400') to integer (400)
            return res.status(400).json({
                error: "Education not found" // Singularized error message
            })
        req.education = education // Storing as req.education for consistency
        next()
    } catch (err) {
        // FIX 2: Changed status code from string ('400') to integer (400)
        return res.status(400).json({
            error: "Could not retrieve education" // Singularized error message
        })
    }
}

// Using the clearSensitiveData helper and req.education
const read = (req, res) => {
    // The educationByID middleware stores the object in req.education
    return res.json(clearSensitiveData(req.education))
}

const update = async (req, res) => {
    try {
        let education = req.education // Use req.education from middleware
        education = extend(education, req.body)
        education.updated = Date.now()
        await education.save()

        // Use the helper to clear sensitive fields before responding
        res.json(clearSensitiveData(education))
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const remove = async (req, res) => {
    try {
        let education = req.education // Use req.education from middleware
        let deletedEducation = await education.deleteOne() // Renamed to singular

        // Use the helper to clear sensitive fields before responding
        res.json(clearSensitiveData(deletedEducation))
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const removeAll = async (req, res) => {
    try {
        const result = await Education.deleteMany({}); // Empty object selects ALL documents
        return res.status(200).json({
            message: `Successfully deleted ${result.deletedCount} educations.`,
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
    educationByID, 
    read, 
    list, 
    remove, 
    update,
    removeAll
}
