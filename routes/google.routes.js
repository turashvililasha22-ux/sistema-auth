import express from "express";
import passport from "../config/passport.js";

const router = express.Router();

// Ruta para iniciar sesión con Google
router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile", "email"]
    })
);

// Callback de Google después de la autenticación
router.get(
    "/google/callback",
    passport.authenticate("google", {
        failureRedirect: "/"
    }),
    (req, res) => {
        // Redirigir al dashboard después del inicio de sesión exitoso
        res.redirect("/dashboard.html");
    }
);

export default router;