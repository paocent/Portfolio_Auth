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

// Define CURRENT_WORKING_DIR
const CURRENT_WORKING_DIR = process.cwd()

const app = express()

// --- 1. Parsing Middleware ---

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(CURRENT_WORKING_DIR, "dist/app")));

// Use Cookie Parser
app.use(cookieParser());

// --- 2. Security/Utility Middleware ---

app.use(compress())
app.use(helmet())

// ------------------------------------------------------------------
// ⭐ CRITICAL FIX: Configured CORS Middleware ⭐
// ------------------------------------------------------------------

// 1. Define the exact URL of your Frontend Static Site (The Fix!)
const FRONTEND_URL = 'https://portfolio-auth-frontend-proj.onrender.com'; 

app.use(cors({
  origin: FRONTEND_URL,       // Allows ONLY requests from your specific frontend URL
  credentials: true,          // ESSENTIAL for sending cookies/auth tokens
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// ------------------------------------------------------------------


// --- 3. Route Handlers ---

app.use('/', userRoutes)
app.use('/', contactsRoutes)
app.use('/', authRoutes)
app.use('/', educationRoutes)
app.use('/', projectsRoutes)
app.use('/', contactForms)

// --- 4. Error Handling Middleware ---

app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        // Handles errors from express-jwt (requireSignin)
        res.status(401).json({"error" : err.name + ": " + err.message})
    } else if (err) {
        // Handles Mongoose validation errors or other general errors
        res.status(400).json({"error" : err.name + ": " + err.message})
        console.log(err)
    }
})

export default app