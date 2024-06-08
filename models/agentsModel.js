import { agents } from '../data/agentes.js';
import bcrypt from 'bcrypt';

export const getAgentByEmailAndPassword = (email, password) => {
    const agent = agents.find(agent => agent.email === email);
    if (agent && bcrypt.compareSync(password, agent.password)) {
        return agent;
    }
    return null;
};

export const getAgentByEmail = (email) => {
    return agents.find(agent => agent.email === email);
};
