import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import * as usuarioModel from '../models/model.js';

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const usuario = await usuarioModel.crearOActualizarGoogle({
                    googleId: profile.id,
                    email: profile.emails[0].value,
                    nombre: profile.name.givenName,
                    apellido: profile.name.familyName,
                    foto: profile.photos?.[0]?.value
                });

                done(null, usuario);
            } catch (error) {
                console.error('Error en Google OAuth:', error);
                done(error, null);
            }
        }
    )
);

passport.serializeUser((usuario, done) => {
    done(null, usuario._id.toString());
});

passport.deserializeUser(async (id, done) => {
    try {
        const usuario = await usuarioModel.buscarPorId(id);
        done(null, usuario);
    } catch (error) {
        done(error, null);
    }
});

export default passport;