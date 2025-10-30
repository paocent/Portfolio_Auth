import express from 'express'
import projectCtrl from '../controllers/projects.controller.js'
import authCtrl from '../controllers/auth.controller.js'
const router = express.Router()

// ----------------------------------------------------
// Base Routes: /api/projects
// ----------------------------------------------------
router.route('/api/projects')
    .post(projectCtrl.create)
    .get(projectCtrl.list)

// ----------------------------------------------------
// Specific Routes MUST COME BEFORE Parameterized Routes
// ----------------------------------------------------

// 1. DELETE ALL: This specific path must be defined first
router.route('/api/projects/all')
    .delete(projectCtrl.removeAll) // No sign-in needed for mass deletion (adjust security as required)

// ----------------------------------------------------
// Parameterized Routes: /api/projects/:projectId
// ----------------------------------------------------

// 2. Define the parameterized routes
router.route('/api/projects/:projectId')
    .get(authCtrl.requireSignin, projectCtrl.read)
    .put(authCtrl.requireSignin, authCtrl.hasAuthorization, projectCtrl.update)
    .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, projectCtrl.remove)

// 3. Register the projectId parameter middleware ONCE
router.param('projectId', projectCtrl.projectByID)

export default router
