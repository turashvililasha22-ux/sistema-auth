import express from "express";
import passport from "../config/passport.js";

const router = express.Router();

// Iniciar sesión con Google
router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
        prompt: "select_account"
    })
);

// Callback de Google
router.get(
    "/google/callback",
    passport.authenticate("google", {
        failureRedirect: "/"
    }),
    (req, res) => {

        req.session.userId = req.user._id;
        req.session.email = req.user.email;
        req.session.nombre = req.user.nombre;
        req.session.apellido = req.user.apellido;

        res.redirect("/dashboard.html");
    }
);

export default router;