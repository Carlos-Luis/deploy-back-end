import User from '../models/User.js';

export const createUser = async (req, res) => {
    const { name, email, password, role } = req.body;
    const user = await User.create({ name, email, password, role });
    res.status(201).json({ message: 'Usuario creado', user });
};


export const listUsers = async (req, res) => {
    const users = await User.find().select('-password');
    res.json(users);
};

