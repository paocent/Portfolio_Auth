import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import {expressjwt} from 'express-jwt'
import config from './../../config/config.js'

const signin = async (req, res) => {
    try {
        let user = await User.findOne({ "email": req.body.email })
        if (!user)
            return res.status(401).json({ error: "User not found" })
        if (!user.authenticate(req.body.password)) {
            return res.status(401).send({ error: "Email and password don't match." })
        }
        
        // 💡 REVISED: Include user's role in the JWT payload
        const token = jwt.sign({ _id: user._id, role: user.role }, config.jwtSecret) 
        
        res.cookie('t', token, { expire: new Date() + 9999 })
        return res.json({
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role // Return the role to the frontend for UI logic
            }
        })
    } catch (err) {
        return res.status(401).json({ error: "Could not sign in" })
    }
}

const signout = (req, res) => {
    res.clearCookie('t')
    return res.status(200).json({
        message: "Signed out successfully!"
    })
}

const requireSignin = expressjwt({
    secret: config.jwtSecret,
    userProperty: "auth",
    algorithms: ['HS256'],
    getToken: (req) => {
        if (req.cookies.t) {
            return req.cookies.t;
        }
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            return authHeader.split(' ')[1];
        }
        return null;
    }
});

const hasAuthorization = (req, res, next) => {
    // 💡 REVISED: Check for Admin role OR Resource Ownership
    // 1. Check if the authenticated user is the resource owner (original logic)
    const isOwner = req.profile && req.auth && req.profile._id == req.auth._id;
    
    // 2. Check if the authenticated user has the 'admin' role (new logic)
    //    The role is now available on req.auth because we added it to the JWT in signin.
    const isAdmin = req.auth && req.auth.role === 'admin'; 

    const authorized = isOwner || isAdmin; 

    if (!(authorized)) {
        return res.status(403).json({
            error: "User is not authorized"
        })
    }
    next()
}

export default { signin, signout, requireSignin, hasAuthorization }