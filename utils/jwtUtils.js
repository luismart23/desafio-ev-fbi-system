import jwt from 'jsonwebtoken';

const secretKey = 'your_secret_key';

export const generateToken = (payload, expiresIn) => {
    return jwt.sign(payload, secretKey, { expiresIn });
};

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, secretKey);
    } catch (error) {
        return null;
    }
};
