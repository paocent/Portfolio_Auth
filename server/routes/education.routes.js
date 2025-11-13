// src/routes/education.routes.js (FIXED for /api/education)

import express from 'express'
import educationCtrl from '../controllers/educations.controller.js'
import authCtrl from '../controllers/auth.controller.js'
const router = express.Router()

// ASSUMPTION: This router is mounted in the main server file using:
// app.use('/', router) 
// The route path is now defined explicitly below:

// ----------------------------------------------------
// Base Routes: (Endpoint is the root: /api/education)
// ----------------------------------------------------
// The full path is defined here
router.route('/api/education')
    // GET /api/education - List all education entries
    .get(authCtrl.requireSignin, educationCtrl.list)
    // POST /api/education - Create a new education entry
    .post(authCtrl.requireSignin, educationCtrl.create)

// ----------------------------------------------------
// Specific Routes (e.g., /api/education/all)
// ----------------------------------------------------
// The full path is defined here
router.route('/api/education/all') 
    // DELETE /api/education/all
    .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, educationCtrl.removeAll) 

// ----------------------------------------------------
// Parameterized Routes: (e.g., /api/education/:educationId)
// ----------------------------------------------------
// Note: Parameter paths must still be absolute or they won't work correctly
router.param('educationId', educationCtrl.educationByID)

router.route('/api/education/:educationId')
    // GET /api/education/:educationId - Read one
    .get(authCtrl.requireSignin, educationCtrl.read)
    // PUT /api/education/:educationId - Update one
    .put(authCtrl.requireSignin, authCtrl.hasAuthorization, educationCtrl.update)
    // DELETE /api/education/:educationId - Remove one
    .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, educationCtrl.remove)

export default router