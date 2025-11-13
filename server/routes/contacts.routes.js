// server/routes/contacts.routes.js (REVISED for absolute paths and auth)

import express from 'express'
import contactsCtrl from '../controllers/contacts.controller.js'
import authCtrl from '../controllers/auth.controller.js'

const router = express.Router()

// ----------------------------------------------------
// Base Routes: MUST INCLUDE FULL PATH (/api/contacts)
// ----------------------------------------------------
router.route('/api/contacts')
    // GET: List all contacts (Client requests /api/contacts). 
    // 🔑 FIX: Added authCtrl.requireSignin to stop the HTML response error.
    .get(authCtrl.requireSignin, contactsCtrl.list) 
    
    // POST: Create contact (Client requests /api/contacts). Added protection.
    .post(authCtrl.requireSignin, contactsCtrl.create) 

// ----------------------------------------------------
// Specific Routes: (/api/contacts/all)
// ----------------------------------------------------
router.route('/api/contacts/all') 
    .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, contactsCtrl.removeAll) 

// ----------------------------------------------------
// Parameterized Routes: (/api/contacts/:contactsId)
// ----------------------------------------------------
router.route('/api/contacts/:contactsId')
    .get(authCtrl.requireSignin, contactsCtrl.read)
    .put(authCtrl.requireSignin, authCtrl.hasAuthorization, contactsCtrl.update) 
    .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, contactsCtrl.remove) 

// --- 1. Define router.param ONLY ONCE ---
// This middleware must use 'contactsId' as defined in the parameterized routes above.
router.param('contactsId', contactsCtrl.contactsByID) 

export default router