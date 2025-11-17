import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const signToken = (user) => {
    return jwt.sign(
        {
            sub: user._id,
            role: user.role},
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
    }
    const token = signToken(user);
    res.json({ token,user: { id: user._id, name: user.name, role: user.role } });
};

export const register = async (req, res) => {
    const { name, email, password, role } = req.body;
    const newUser = await User.create({ name, email, password, role });
    res.status(201).json({ message: 'Usuario registrado', newUser});
};