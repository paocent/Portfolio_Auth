// In server/routes/contacts.routes.js

import express from 'express'
import contactsCtrl from '../controllers/contacts.controller.js'
import authCtrl from '../controllers/auth.controller.js'

const router = express.Router()

// --- 1. Define router.param ONLY ONCE ---
router.param('contactsId', contactsCtrl.contactsByID)

router.route('/api/contacts')
    .post(contactsCtrl.create)
    .get(contactsCtrl.list)


router.route('/api/contacts/all') 
    // Uses hasAuthorization, which should be fine if you confirm the user is loaded correctly
    .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, contactsCtrl.removeAll) 

router.route('/api/contacts/:contactsId')
    .get(authCtrl.requireSignin, contactsCtrl.read)
    // Uses hasAuthorization (which correctly checks if the user is an admin)
    .put(authCtrl.requireSignin, authCtrl.hasAuthorization, contactsCtrl.update) 
    .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, contactsCtrl.remove) 

// ❌ REMOVED: Deleted the redundant router.param definition here.
// The file should now successfully define all your routes without crashing.

export default router