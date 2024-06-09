import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

// Función para generar un token JWT
export const generateToken = (payload, expiresIn) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
};

// Función para verificar un token JWT
export const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return null; // Devuelve null si hay un error al verificar el token
    }
};