import bcrypt from 'bcrypt';
import { generateToken } from '../utils/jwtUtils.js';
import { agents } from '../data/agents.js';

export const signIn = async (req, res) => {
    const { email, password } = req.body;
    const agent = agents.find(a => a.email === email);

    if (!agent || !await bcrypt.compare(password, agent.password)) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const token = generateToken({ email: agent.email }, '2m');
    res.json({ token, email: agent.email });
};

