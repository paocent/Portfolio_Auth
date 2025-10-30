import Project from '../models/project.model.js'
import extend from 'lodash/extend.js'
import errorHandler from './error.controller.js'

// Helper function to remove sensitive fields from a project object
const clearSensitiveData = (project) => {
    // Note: Mongoose document properties must be set to 'undefined' or deleted
    project.hashed_password = undefined
    project.salt = undefined
    return project
}

const create = async (req, res) => {
    const project = new Project(req.body) // Renamed to singular 'project'
    try {
        await project.save()
        return res.status(200).json({
            message: "Successfully created project!" // Updated message
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
        let projects = await Project.find({}) // Using singular 'Project' model
            // Select all fields required for a public list view
            .select('title firstName lastName email completionDate description created updated'); 

        res.json(projects)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const projectByID = async (req, res, next, id) => {
    try {
        let project = await Project.findById(id) // Renamed to singular 'project'
        if (!project)
            // FIX 1: Changed status code from string ('400') to integer (400)
            return res.status(400).json({
                error: "Project not found" // Singularized error message
            })
        req.project = project // Storing as req.project for consistency
        next()
    } catch (err) {
        // FIX 2: Changed status code from string ('400') to integer (400)
        return res.status(400).json({
            error: "Could not retrieve project" // Singularized error message
        })
    }
}

// Using the clearSensitiveData helper and req.project
const read = (req, res) => {
    // The projectByID middleware stores the object in req.project
    return res.json(clearSensitiveData(req.project))
}

const update = async (req, res) => {
    try {
        let project = req.project // Use req.project from middleware
        project = extend(project, req.body)
        project.updated = Date.now()
        await project.save()

        // Use the helper to clear sensitive fields before responding
        res.json(clearSensitiveData(project))
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const remove = async (req, res) => {
    try {
        let project = req.project // Use req.project from middleware
        let deletedProject = await project.deleteOne() // Renamed to singular

        // Use the helper to clear sensitive fields before responding
        res.json(clearSensitiveData(deletedProject))
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

// Function to delete ALL documents in the collection
const removeAll = async (req, res) => {
    try {
        // Correctly deletes all documents by passing an empty filter object {}
        const result = await Project.deleteMany({}); 
        return res.status(200).json({
            message: `Successfully deleted ${result.deletedCount} projects.`,
            deletedCount: result.deletedCount
        });
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
}

// Exporting all functions for router compatibility
export default { 
    create, 
    projectByID, 
    read, 
    list, 
    remove, 
    update,
    removeAll
}
