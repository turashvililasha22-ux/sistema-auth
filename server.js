import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import session from "express-session";
import MongoStore from "connect-mongo";
import dotenv from "dotenv";
import passport from "./config/passport.js";


import { conectarDB } from "./config/config.js";
import authRoutes from "./routes/auth.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import googleRoutes from "./routes/google.routes.js";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares básicos de Express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sesiones
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URI
        })
    })
);
app.use(passport.initialize());
app.use(passport.session());

// Archivos públicos
app.use(express.static(path.join(__dirname, "views")));

// Página principal
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

// Autenticación
app.use("/", authRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/auth/", googleRoutes);

// Iniciar servidor después de conectar MongoDB
async function iniciarServidor() {
    try {
        await conectarDB();

        app.listen(PORT, () => {
            console.log(`Servidor funcionando en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Error al iniciar el servidor:", error);
    }
}

iniciarServidor();