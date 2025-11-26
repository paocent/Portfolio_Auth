import express from 'express'
import path from 'path'
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

const CURRENT_WORKING_DIR = process.cwd()

const app = express()

// --- 1. Parsing Middleware (MUST be first) ---

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the build output folder (dist/app)
app.use(express.static(path.join(CURRENT_WORKING_DIR, "dist/app"))); // <-- ADDED/VERIFIED

// Use Cookie Parser (Handles req.cookies)
app.use(cookieParser());

// --- 2. Security/Utility Middleware ---

app.use(compress())
app.use(helmet())
app.use(cors())

// --- 3. API Route Handlers ---

app.use('/', userRoutes)
app.use('/', contactsRoutes)
app.use('/', authRoutes)
app.use('/', educationRoutes)
app.use('/', projectsRoutes)
app.use('/', contactForms)

// --- 4. Catch-All/SPA Fallback Route (CRUCIAL FIX) ---
// For any GET request not handled by the Express routes above, send the React app's index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(CURRENT_WORKING_DIR, 'dist/app', 'index.html'));
})

// --- 5. Error Handling Middleware (MUST be last) ---

app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({"error" : err.name + ": " + err.message})
    } else if (err) {
        res.status(400).json({"error" : err.name + ": " + err.message})
        console.log(err)
    }
})

export default app