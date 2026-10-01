import bcrypt from 'bcrypt';
import { getDB } from '../config/config.js';
import { ObjectId } from 'mongodb';
// Crear un nuevo usuario (hashea la contraseña)
async function crearUsuario({ email, password, nombre, apellido, metodo = 'local' }) {
    const db = getDB();
    const hashedPassword = await bcrypt.hash(password, 10);
    const nuevoUsuario = {
        email,
        password: hashedPassword,
        nombre,
        apellido,
        metodo,
        fechaRegistro: new Date()
    };
    const result = await db.collection('usuarios').insertOne(nuevoUsuario);
    return { ...nuevoUsuario, _id: result.insertedId };
}
// Buscar usuario por email
async function buscarPorEmail(email) {
    const db = getDB();
    return await db.collection('usuarios').findOne({ email });
}
// Buscar usuario por ID
async function buscarPorId(id) {
    const db = getDB();
    return await db.collection('usuarios').findOne({ _id: new ObjectId(id) });
}

// Comparar contraseña
async function compararPassword(passwordPlano, passwordHash) {
    return await bcrypt.compare(passwordPlano, passwordHash);
}
// Crear o actualizar usuario de Google
async function crearOActualizarGoogle({ googleId, email, nombre, foto }) {
    const db = getDB();
    const existente = await db.collection('usuarios').findOne({ email });
    if (existente) return existente;
    const nuevo = {
        googleId, email, nombre, foto,
        metodo: 'google',
        fechaRegistro: new Date()
    };
    const result = await db.collection('usuarios').insertOne(nuevo);
    return { ...nuevo, _id: result.insertedId };
}
export {
    crearUsuario,
    buscarPorEmail,
    buscarPorId,
    compararPassword,
    crearOActualizarGoogle
};