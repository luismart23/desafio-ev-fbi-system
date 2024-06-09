import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import session from 'express-session';
import { fileURLToPath } from 'url';
import { handleLoginFormSubmit, handleRestrictedLinkClick, handleWelcomePage } from './controllers/authController.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configura el middleware de sesión
app.use(session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: true
}));

// Servir archivos estáticos
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

// Ruta para servir el archivo index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta para servir el archivo restricted.html
app.get('/restricted.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'restricted.html'));
});

// Ruta para servir el archivo welcome.html
app.get('/welcome', handleWelcomePage);

// Rutas de autenticación
app.post('/auth/signin', handleLoginFormSubmit);
app.get('/auth/restricted', handleRestrictedLinkClick);

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});