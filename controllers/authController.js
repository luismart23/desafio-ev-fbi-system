import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { agents } from '../data/agentes.js';

// Función para generar un token JWT
const generateToken = (payload, expiresIn) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
};

// Función para verificar un token JWT
const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return null; // Devuelve null si hay un error al verificar el token
    }
};

export const handleLoginFormSubmit = async (req, res) => {
    const { email, password } = req.body;
    const agent = agents.find(a => a.email === email);

    if (!agent || !await bcrypt.compare(password, agent.password)) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const token = generateToken({ email: agent.email }, '2m');
    const expirationTime = new Date().getTime() + 2 * 60 * 1000;
    req.session.token = token;
    req.session.tokenExpiration = expirationTime;

    // Redirigir al usuario a la página de bienvenida después de iniciar sesión
    res.redirect('/welcome');
};

export const handleWelcomePage = (req, res) => {
    const token = req.session.token;
    const tokenExpiration = req.session.tokenExpiration;

    // Verificar si el token es válido y obtener el email del agente
    if (token && Date.now() < tokenExpiration) {
        const decodedToken = verifyToken(token);
        if (decodedToken && decodedToken.email) {
            return res.send(`
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Bienvenida</title>
        </head>
        <body>
          <h1>Bienvenido, ${decodedToken.email}</h1>
          <p><a href="/auth/restricted">Ir a la ruta restringida</a></p>
        </body>
        </html>
      `);
        }
    }

    // Si el usuario no está autenticado, redirigir al inicio de sesión
    res.redirect('/');
};

export const handleRestrictedLinkClick = (req, res) => {
    const token = req.session.token;
    const tokenExpiration = req.session.tokenExpiration;

    // Verificar si el token es válido y obtener el email del agente
    if (token && Date.now() < tokenExpiration) {
        const decodedToken = verifyToken(token);
        if (decodedToken && decodedToken.email) {
            return res.send(`
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Ruta Restringida</title>
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
        </head>
        <body>
          <div class="container">
            <h1 class="text-center">Bienvenido a la Ruta Restringida, ${decodedToken.email}</h1>
            <div id="restricted-content" class="text-center"></div>
          </div>
        </body>
        </html>
      `);
        }
    }

    // Si el usuario no está autenticado, redirigir al inicio de sesión
    res.redirect('/');
};
