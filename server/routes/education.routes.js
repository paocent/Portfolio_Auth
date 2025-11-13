// src/routes/education.routes.js (REVISED for standard Express routing)
import express from 'express'
import educationCtrl from '../controllers/educations.controller.js'
import authCtrl from '../controllers/auth.controller.js'
const router = express.Router()

// ASSUMPTION: This router is mounted in the main server file using:
// app.use('/api/education', router)

// ----------------------------------------------------
// Base Routes: (Endpoint is the root: /api/education)
// ----------------------------------------------------
router.route('/') 
    // GET /api/education - List all (Requires Signin, which should resolve the HTML error)
    .get(authCtrl.requireSignin, educationCtrl.list)
    // POST /api/education - Create new (Requires Signin)
    .post(authCtrl.requireSignin, educationCtrl.create)

// ----------------------------------------------------
// Specific Routes (e.g., /api/education/all)
// ----------------------------------------------------
router.route('/all') 
    // DELETE /api/education/all
    .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, educationCtrl.removeAll) 

// ----------------------------------------------------
// Parameterized Routes: (e.g., /api/education/:educationId)
// ----------------------------------------------------
router.route('/:educationId')
    // GET /api/education/:educationId - Read one
    .get(authCtrl.requireSignin, educationCtrl.read)
    // PUT /api/education/:educationId - Update one
    .put(authCtrl.requireSignin, authCtrl.hasAuthorization, educationCtrl.update)
    // DELETE /api/education/:educationId - Remove one
    .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, educationCtrl.remove)

// 3. Register the educationId parameter middleware ONCE
router.param('educationId', educationCtrl.educationByID)

export default router