import express from 'express'
import userCtrl from '../controllers/user.controller.js'
import authCtrl from '../controllers/auth.controller.js'
const router = express.Router()

// 1. Base /api/users routes (Create and List)
router.route('/api/users')
  .post(userCtrl.create)
  .get(userCtrl.list)

// 2. Define the specific, non-parameterized route first.
// The route path is EXACTLY '/api/users/all'.
router.route('/api/users/all')
    .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.removeAll)
    

// 3. Define the PARAMETER HANDLER.
router.param('userId', userCtrl.userByID)

// 4. Define the parameterized route last.
// The path '/api/users/:userId' will now only be used if it doesn't match '/api/users/all'.
router.route('/api/users/:userId')
    .get(authCtrl.requireSignin, userCtrl.read)
    .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
    .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove)

export default router