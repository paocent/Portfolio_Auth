import express from 'express'
import contactsCtrl from '../controllers/contacts.controller.js'
import authCtrl from '../controllers/auth.controller.js'
const router = express.Router()
router.route('/api/contacts')
    .post(contactsCtrl.create)
    .get(contactsCtrl.list)

router.param('contactsId', contactsCtrl.contactsByID)


router.route('/api/contacts/all') // A dedicated route for mass deletion
    .delete(contactsCtrl.removeAll) // Maps the DELETE request to the new controller function

    router.route('/api/contacts/:contactsId')
    .get(authCtrl.requireSignin, contactsCtrl.read)
    .put(authCtrl.requireSignin, authCtrl.hasAuthorization, contactsCtrl.update)
    .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, contactsCtrl.remove)

    router.param('contactsId', contactsCtrl.contactsByID)
export default router