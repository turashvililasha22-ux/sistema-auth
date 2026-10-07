Sistema Auth

Sistema de autenticación desarrollado como proyecto final utilizando Node.js, Express, MongoDB, Passport.js y Google OAuth 2.0.

La aplicación permite:

    Registrarse con email y contraseña.

    Iniciar sesión con email y contraseña.

    Iniciar sesión mediante Google.

    Crear automáticamente usuarios de Google en MongoDB.

    Mantener sesiones mediante express-session y MongoDB.

    Acceder a un dashboard protegido.

    Cerrar sesión.

    Validar formularios desde el frontend.

    Comunicarse con el backend mediante fetch().

    Utilizar una arquitectura organizada por rutas, controladores, modelos y configuración.

Tecnologías
Backend

    Node.js

    Express.js

    MongoDB

    MongoDB Driver

    Passport.js

    Passport Google OAuth 2.0

    Express Session

    Connect Mongo

    bcrypt

    dotenv

    CORS

Frontend

    HTML5

    CSS3

    JavaScript Vanilla

    Fetch API

Desarrollo

    ES Modules

    Git

    GitHub

    Conventional Commits

Estructura del proyecto

La estructura actual del proyecto es:

sistema-auth/
│
├── server.js
│
├── routes/
│   ├── google.routes.js
│   ├── dashboard.routes.js
│   └── auth.routes.js
│
├── config/
│   ├── passport.js
│   └── config.js
│
├── controllers/
│   ├── dashboard.js
│   ├── google.js
│   └── controller.js
│
├── models/
│   └── model.js
│
├── views/
│   ├── index.html
│   ├── dashboard.html
│   └── assets/
│       ├── css/
│       └── js/
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── README.md

Arquitectura

El proyecto sigue una organización basada en MVC:
Model

El archivo:

models/model.js

se encarga de las operaciones relacionadas con los usuarios y MongoDB.
Controllers

Los controladores contienen la lógica de las diferentes funcionalidades:

controllers/controller.js
controllers/google.js
controllers/dashboard.js

Routes

Las rutas definen los endpoints disponibles:

routes/auth.routes.js
routes/google.routes.js
routes/dashboard.routes.js

Views

La interfaz del usuario se encuentra en:

views/

Incluye:

    index.html para login y registro.

    dashboard.html para la zona protegida.

    CSS y JavaScript dentro de views/assets/.

Requisitos

Para ejecutar el proyecto necesitas:

    Node.js

    npm

    MongoDB

    Una cuenta de Google Cloud para utilizar Google OAuth

Instalación

Clonar el repositorio:

git clone https://github.com/turashvililasha22-ux/sistema-auth.git

Entrar en el proyecto:

cd sistema-auth

Instalar las dependencias:

npm install

Variables de entorno

Crear un archivo .env en la raíz del proyecto.

Ejemplo:

MONGO_URI=mongodb://localhost:27017/auth_db
SESSION_SECRET=tu_secreto_de_sesion
GOOGLE_CLIENT_ID=tu_google_client_id
GOOGLE_CLIENT_SECRET=tu_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback
PORT=3000

Seguridad

El archivo .env no debe subirse a GitHub.

Las credenciales reales de Google y la clave de sesión deben permanecer privadas.

El proyecto incluye .env en .gitignore.
MongoDB

La aplicación utiliza MongoDB como base de datos.

Para desarrollo local se utiliza:

mongodb://localhost:27017/auth_db

La base de datos utilizada por el proyecto es:

auth_db

Los usuarios se almacenan en MongoDB.

Las sesiones también se almacenan en MongoDB mediante connect-mongo.
Google OAuth 2.0

Para utilizar el login con Google es necesario crear credenciales OAuth 2.0 desde Google Cloud Console.
Configuración

Crear un proyecto en Google Cloud y configurar la pantalla de consentimiento OAuth.

Después crear unas credenciales:

OAuth 2.0 Client ID

Seleccionar:

Aplicación web

Como URI de redirección autorizada utilizar:

http://localhost:3000/auth/google/callback

Después copiar las credenciales al archivo .env:

GOOGLE_CLIENT_ID=tu_google_client_id
GOOGLE_CLIENT_SECRET=tu_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback

Si el proyecto de Google está en modo testing, las cuentas utilizadas para realizar las pruebas deben estar añadidas como usuarios de prueba.
Ejecución

Para iniciar el servidor:

npm start

Para iniciar el servidor en modo desarrollo:

npm run dev

La aplicación estará disponible en:

http://localhost:3000

Autenticación local

El usuario puede registrarse utilizando:

    Nombre

    Apellido

    Email

    Contraseña

La contraseña no se almacena directamente.

Se utiliza bcrypt para generar un hash seguro antes de guardar el usuario en MongoDB.

Durante el login, bcrypt compara la contraseña introducida con el hash almacenado.
Autenticación con Google

El usuario puede seleccionar:

Continuar con Google

El sistema inicia el flujo OAuth 2.0.

Después de autenticarse correctamente:

    Google devuelve los datos del usuario.

    Passport procesa el perfil.

    El sistema busca el usuario en MongoDB.

    Si no existe, se crea automáticamente.

    Se crea la sesión.

    El usuario puede acceder al dashboard.

Sesiones

Las sesiones se gestionan utilizando:

express-session
connect-mongo

La información de sesión permite mantener autenticado al usuario mientras navega por la aplicación.
Rutas principales
Autenticación local

POST /register
POST /login
POST /logout

Google

GET /auth/google
GET /auth/google/callback

Dashboard

GET /api/dashboard

El dashboard está protegido y solo puede ser utilizado por usuarios autenticados.
Frontend

El frontend utiliza JavaScript Vanilla y fetch() para comunicarse con el servidor.

La página principal contiene:

    Formulario de login.

    Formulario de registro.

    Validación de campos.

    Mensajes de error.

    Mensajes de éxito.

    Botón de autenticación con Google.

Después de un login o registro correcto, el usuario es redirigido al dashboard.
Seguridad

El proyecto incorpora las siguientes medidas:

    Contraseñas protegidas mediante bcrypt.

    Sesiones almacenadas en MongoDB.

    Variables de entorno para información sensible.

    .env excluido mediante .gitignore.

    Middleware para proteger rutas.

    Mensajes de error genéricos durante el login.

    OAuth 2.0 para la autenticación mediante Google.

Git

El proyecto utiliza Git y GitHub para el control de versiones.
Ramas

La estructura de ramas utilizada es:

main
develop
feature/modelo-usuario
feature/auth-local
feature/auth-google
feature/dashboard-view

Descripción

main contiene la versión estable del proyecto.

develop se utiliza como rama de integración.

Las funcionalidades se organizan mediante ramas feature:

feature/modelo-usuario
feature/auth-local
feature/auth-google
feature/dashboard-view

Conventional Commits

Los commits utilizan el formato:

tipo(área): descripción

Ejemplos:

feat(model): crear modelo de usuario
feat(controller): añadir controlador de registro
feat(routes): crear rutas de autenticación
feat(controller): integrar Google OAuth
feat(view): crear dashboard
fix(routes): corregir redirección tras logout
docs: añadir documentación del proyecto

Estado del proyecto

El MVP incluye:

    Registro local

    Login local

    Hashing de contraseñas con bcrypt

    Sesiones

    MongoDB

    Google OAuth 2.0

    Creación automática de usuario Google

    Logout

    Dashboard protegido

    Middleware de autenticación

    Frontend con JavaScript Vanilla

    Fetch API

    Validación de formularios

    Arquitectura organizada por capas

    ES Modules

    Git y GitHub

    Conventional Commits

    README
