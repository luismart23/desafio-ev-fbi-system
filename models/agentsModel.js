import { agents } from '../data/agentes.js';
import bcrypt from 'bcrypt';

export const getAgentByEmailAndPassword = async (email, password) => {
    const agent = agents.find(agent => agent.email === email);
    if (agent && await bcrypt.compare(password, agent.password)) {
        return agent;
    }
    return null;
};