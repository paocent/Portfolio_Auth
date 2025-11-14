import express from 'express'
import contactFormCtrl from '../controllers/contactsForm.controller.js' // Import the new controller

const router = express.Router()

// The POST route is what your React front-end uses:
// It is expecting a POST request at '/api/contact'
router.route('/api/contact')
    .post(contactFormCtrl.create) // When a POST request comes in, call the create function

// Note: You can add a GET route here later if you want to view all messages
/*
router.route('/api/contactmessages')
    .get(contactFormCtrl.list)
*/

export default router