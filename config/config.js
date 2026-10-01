import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGO_URI;

// Validación preventiva de la variable de entorno
if (!uri) {
  throw new Error('La variable de entorno MONGO_URI no está configurada.');
}

const client = new MongoClient(uri);
let db = null;

async function conectarDB() {
  try {
    await client.connect();
    db = client.db('auth_db');
    console.log('Conectado exitosamente a MongoDB');
    return db;
  } catch (error) {
    console.error('Error crítico al conectar a MongoDB:', error);
    process.exit(1); // Detiene la aplicación si no hay base de datos
  }
}

function getDB() {
  if (!db) {
    throw new Error('La base de datos no ha sido inicializada. Llama a conectarDB() primero.');
  }
  return db;
}

export { conectarDB, getDB, client };