import * as usuarioModel from '../models/model.js';

async function dashboard(req, res) {
    if (!req.session.userId) {
        return res.status(401).json({
            error: 'No autorizado'
        });
    }

    try {
        const usuario = await usuarioModel.buscarPorId(req.session.userId);

        if (!usuario) {
            return res.status(404).json({
                error: 'Usuario no encontrado'
            });
        }

        res.json({
            usuario: {
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                email: usuario.email
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Error al cargar el dashboard'
        });
    }
}

export { dashboard };