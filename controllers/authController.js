import bcrypt from 'bcrypt';
import { generateToken, verifyToken } from '../utils/jwtUtils.js';
import { getAgentByEmailAndPassword } from '../models/agentsModel.js';

export const signIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Autenticar al agente basado en las credenciales
        const agent = await getAgentByEmailAndPassword(email, password);
        if (!agent) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        // Verificar la contraseña
        const passwordMatch = await bcrypt.compare(password, agent.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        // Generar el token JWT con una fecha de expiración de 2 minutos
        const token = generateToken({ email: agent.email }, '2m');
        console.log('Token generado:', token);

        // HTML de respuesta
        const htmlResponse = `
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Bienvenido</title>
            </head>
            <body>
                <h1>Bienvenido, ${agent.email}</h1>
                <p>¡Has iniciado sesión correctamente!</p>
                <p><a href="/restricted">Acceder a la ruta restringida</a></p>
                <script>
                    // Guardar el token en SessionStorage
                    sessionStorage.setItem('token', '${token}');
                    // Establecer tiempo de expiración (2 minutos = 120 segundos)
                    setTimeout(() => {
                        sessionStorage.removeItem('token');
                    }, 120000);
                </script>
            </body>
            </html>
        `;

        // Devolver el HTML de respuesta y el token en formato JSON
        res.json({ html: htmlResponse, token });
    } catch (error) {
        console.error('Error al autenticar:', error);
        res.status(500).send('Error interno del servidor');
    }
};

export const restricted = (req, res) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).send('Acceso denegado');
    }

    // Verificar si el token es válido y no ha expirado
    const decoded = verifyToken(token);
    if (!decoded) {
        return res.status(401).send('Token inválido o expirado');
    }

    // Mostrar el email del agente autorizado
    res.send(`Bienvenido, ${decoded.email}`);
};






