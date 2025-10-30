import User from '../models/user.model.js'
import extend from 'lodash/extend.js'
import errorHandler from './error.controller.js'

// Helper function to remove sensitive fields from a user object before sending it to the client
const clearSensitiveData = (user) => {
    // Note: Mongoose document properties must be set to 'undefined' or deleted
    user.hashed_password = undefined
    user.salt = undefined
    // For Read/List/Update endpoints, we only return non-sensitive data
    return user
}

const create = async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        return res.status(200).json({
            message: "Successfully signed up!"
        })
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const list = async (req, res) => {
    try {
        // Select only non-sensitive fields
        let users = await User.find().select('name email updated created')
        res.json(users)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

// Middleware: Retrieves user by ID for param handling
const userByID = async (req, res, next, id) => {
    try {
        let user = await User.findById(id)
        if (!user)
            // FIXED: Changed status code from string '400' to integer 400
            return res.status(400).json({
                error: "User not found"
            })
        req.profile = user
        next()
    } catch (err) {
        // FIXED: Changed status code from string '400' to integer 400
        return res.status(400).json({
            error: "Could not retrieve user"
        })
    }
}

const read = (req, res) => {
    // Use the helper function to clear sensitive data
    return res.json(clearSensitiveData(req.profile))
}

const update = async (req, res) => {
    try {
        let user = req.profile
        user = extend(user, req.body)
        user.updated = Date.now()
        await user.save()
        // Use the helper function to clear sensitive data
        res.json(clearSensitiveData(user))
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const remove = async (req, res) => {
    try {
        let user = req.profile
        let deletedUser = await user.deleteOne()
        // Use the helper function to clear sensitive data
        res.json(clearSensitiveData(deletedUser))
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

// NEW FUNCTION: Implementation for DELETE /api/users/all
const removeAll = async (req, res) => {
    try {
        const result = await User.deleteMany({});
        return res.status(200).json({
            message: `Successfully deleted ${result.deletedCount} users.`,
            deletedCount: result.deletedCount
        });
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
}

export default { 
    create, 
    userByID, 
    read, 
    list, 
    remove, 
    update,
    removeAll // MUST BE EXPORTED to resolve the TypeError in the router
}
