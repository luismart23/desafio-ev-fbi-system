import { verifyToken } from '../utils/jwtUtils.js';

export const restricted = (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Acceso denegado. Token no proporcionado.' });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
        return res.status(401).json({ error: 'Acceso denegado. Token inválido.' });
    }

    // Mostrar el email del agente autorizado
    res.send(`<h1>Bienvenido, ${decoded.email}</h1>`);
};
