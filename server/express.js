import express from 'express'
import bodyParser from 'body-parser' // Keep for reference, but express.json/urlencoded is preferred
import cookieParser from 'cookie-parser' // Import once
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import userRoutes from './routes/user.routes.js' 
import authRoutes from './routes/auth.routes.js'
import contactsRoutes from './routes/contacts.routes.js'  
import educationRoutes from './routes/education.routes.js'
import projectsRoutes from './routes/project.routes.js'

// Fix 1: Removed duplicate 'import cookieParser from 'cookie-parser''
// The import is handled above.

const app = express()

// --- 1. Parsing Middleware (MUST be first) ---

// Use modern Express parsers (handles req.body)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use Cookie Parser (Handles req.cookies)
app.use(cookieParser()); // <--- CORRECT POSITION

// --- 2. Security/Utility Middleware ---

app.use(compress()) // Compression should run early
app.use(helmet())   // Helmet should run early for security
app.use(cors())     // CORS should run early

// --- Removed Redundant Body-Parser Calls ---
// The following lines were redundant and placed too late:
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(cookieParser()) // Redundant and too late here

// --- 3. Route Handlers (MUST be after parsing middleware) ---

app.use('/', userRoutes)
app.use('/', contactsRoutes)
app.use('/', authRoutes)
app.use('/', educationRoutes)
app.use('/', projectsRoutes)


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