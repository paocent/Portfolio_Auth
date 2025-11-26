import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';

// Route Imports
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';
import contactsRoutes from './routes/contacts.routes.js';
import educationRoutes from './routes/education.routes.js';
import projectsRoutes from './routes/project.routes.js';
import contactForms from './routes/contactsForm.routes.js';

const CURRENT_WORKING_DIR = process.cwd();

const app = express();

// ------------------------------------------------------------------
// ⭐ STEP 1 — CORS: MUST BE FIRST ⭐
// ------------------------------------------------------------------

const allowedOrigins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://portfolio-auth-frontend-proj.onrender.com"
];

app.use(
    cors({
        origin: function (origin, callback) {
            // Allow Postman / mobile / curl (no origin)
            if (!origin) return callback(null, true);

            if (allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("CORS blocked: " + origin));
            }
        },
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

// ------------------------------------------------------------------
// ⭐ STEP 2 — Parsing Middleware ⭐
// ------------------------------------------------------------------

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookies must come AFTER CORS + JSON parsing
app.use(cookieParser());

// ------------------------------------------------------------------
// ⭐ STEP 3 — Security & Utilities ⭐
// ------------------------------------------------------------------

app.use(compress());
app.use(helmet());

// ------------------------------------------------------------------
// ⭐ STEP 4 — Static Files (Production Only) ⭐
// ------------------------------------------------------------------

app.use(express.static(path.join(CURRENT_WORKING_DIR, "dist/app")));

// ------------------------------------------------------------------
// ⭐ STEP 5 — Routes ⭐
// ------------------------------------------------------------------

app.use('/', userRoutes);
app.use('/', contactsRoutes);
app.use('/', authRoutes);
app.use('/', educationRoutes);
app.use('/', projectsRoutes);
app.use('/', contactForms);

// ------------------------------------------------------------------
// ⭐ STEP 6 — Error Handling ⭐
// ------------------------------------------------------------------

app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({ error: err.name + ": " + err.message });
    }

    if (err.message?.startsWith("CORS blocked:")) {
        return res.status(403).json({ error: err.message });
    }

    if (err) {
        console.log("SERVER ERROR:", err);
        return res.status(400).json({ error: err.name + ": " + err.message });
    }
});

export default app;
