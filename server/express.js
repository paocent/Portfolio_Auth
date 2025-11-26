import express from 'express'
import path from 'path' // <-- FIX 1: Must import 'path' to use path.join()
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'

// Route Imports
import userRoutes from './routes/user.routes.js'
import authRoutes from './routes/auth.routes.js'
import contactsRoutes from './routes/contacts.routes.js'
import educationRoutes from './routes/education.routes.js'
import projectsRoutes from './routes/project.routes.js'
import contactForms from './routes/contactsForm.routes.js'

// FIX 2: Define CURRENT_WORKING_DIR
// This variable provides the root directory where the 'node server' command was executed.
const CURRENT_WORKING_DIR = process.cwd()

const app = express()

// --- 1. Parsing Middleware (MUST be first) ---

// Use modern Express parsers (handles req.body)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files - This line now works because 'path' and 'CURRENT_WORKING_DIR' are defined.
app.use(express.static(path.join(CURRENT_WORKING_DIR, "dist/app")));

// Use Cookie Parser (Handles req.cookies)
app.use(cookieParser());

// --- 2. Security/Utility Middleware ---

app.use(compress())
app.use(helmet())
app.use(cors())

// --- 3. Route Handlers (MUST be after parsing middleware) ---

app.use('/', userRoutes)
app.use('/', contactsRoutes)
app.use('/', authRoutes)
app.use('/', educationRoutes)
app.use('/', projectsRoutes)
app.use('/', contactForms)

// --- 4. Error Handling Middleware (MUST be last) ---

app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        // This handles errors from express-jwt (requireSignin)
        res.status(401).json({"error" : err.name + ": " + err.message})
    } else if (err) {
        // Handles Mongoose validation errors or other general errors
        res.status(400).json({"error" : err.name + ": " + err.message})
        console.log(err)
    }
})

export default app