import 'dotenv/config';
import mongoose from 'mongoose';
import User from '../models/User.js';
import { connectDB } from '../config/db.js';

await connectDB(process.env.MONGODB_URI);
await User.deleteMany({});

await User.insertMany([
    { name: 'Admin User',
      email: 'admin@example.com',
      password: 'adminpassword',
      role: 'admin'
    },
    { name: 'Recepcionista', 
      email: 'recep@demo.com', 
      password: '123456', 
      role: 'recepcionista' 
    },
    { name: 'Medico', 
      email: 'medico@demo.com', 
      password: '123456', 
      role: 'medico' 
    }
]);
console.log('Datos de usuario iniciales insertados');
await mongoose.disconnect();

