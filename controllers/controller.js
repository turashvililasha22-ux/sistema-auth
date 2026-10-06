import * as usuarioModel from '../models/model.js';

async function register(req, res) {
    const { email, password, nombre, apellido } = req.body;

    try {
        const existe = await usuarioModel.buscarPorEmail(email);

        if (existe) {
            return res.status(400).json({
                error: 'El email ya está registrado'
            });
        }

        const usuario = await usuarioModel.crearUsuario({
            email,
            password,
            nombre,
            apellido
        });

        req.session.userId = usuario._id;
        req.session.email = usuario.email;
        req.session.nombre = usuario.nombre;
        req.session.apellido = usuario.apellido;

        res.json({
            mensaje: 'Registro exitoso'
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: 'Error al registrar'
        });
    }
}

async function login(req, res) {
    const { email, password } = req.body;

    try {
        const usuario = await usuarioModel.buscarPorEmail(email);

        console.log("Login email:", email);
        console.log("Usuario encontrado:", Boolean(usuario));
        console.log("Tiene password hash:", Boolean(usuario?.password));

        if (!usuario) {
            return res.status(401).json({
                error: 'Credenciales incorrectas'
            });
        }

        const esValida = await usuarioModel.compararPassword(
            password,
            usuario.password
        );
        console.log("Contraseña válida:", esValida);

        if (!esValida) {
            return res.status(401).json({
                error: 'Credenciales incorrectas'
            });
        }

        req.session.userId = usuario._id;
        req.session.email = usuario.email;
        req.session.nombre = usuario.nombre;
        req.session.apellido = usuario.apellido;

        res.json({
            mensaje: 'Login exitoso'
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: 'Error al iniciar sesión'
        });
    }
}

function logout(req, res) {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({
                error: 'Error al cerrar sesión'
            });
        }

        res.json({
            mensaje: 'Sesión cerrada'
        });
    });
}

export {
    register,
    login,
    logout
};