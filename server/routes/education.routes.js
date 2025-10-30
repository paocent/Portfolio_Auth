import express from 'express'
import educationCtrl from '../controllers/educations.controller.js'
import authCtrl from '../controllers/auth.controller.js'
const router = express.Router()

// ----------------------------------------------------
// Base Routes: /api/educations
// ----------------------------------------------------
router.route('/api/educations')
    .post(educationCtrl.create)
    .get(educationCtrl.list)

// ----------------------------------------------------
// Specific Routes MUST COME BEFORE Parameterized Routes
// ----------------------------------------------------

// 1. DELETE ALL: This specific path must be defined first
router.route('/api/educations/all')
    .delete(educationCtrl.removeAll) 

// ----------------------------------------------------
// Parameterized Routes: /api/educations/:educationId
// ----------------------------------------------------

// 2. Define the parameterized routes
router.route('/api/educations/:educationId')
    .get(authCtrl.requireSignin, educationCtrl.read)
    .put(authCtrl.requireSignin, authCtrl.hasAuthorization, educationCtrl.update)
    .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, educationCtrl.remove)

// 3. Register the educationId parameter middleware ONCE
//    This will only run for requests matching the pattern /api/educations/:educationId
router.param('educationId', educationCtrl.educationByID)

export default router
