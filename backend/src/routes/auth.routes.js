import { Router } from 'express';
import { body } from 'express-validator';
import { login, register } from '../controllers/auth.controller.js';

// Rutas públicas de autenticación
const router = Router();

/**
 * POST /auth/login
 * Body: { email, password }
 */
router.post(
  '/login',
  [
    body('email', 'Email inválido').isEmail(),
    body('password', 'Password requerido').notEmpty()
  ],
  // Nota: para simplificar, dejamos la validación semántica al controller
  login
);

/**
 * POST /auth/register
 * (Puedes dejarla pública o protegerla para admin; el caso pide seed, pero aquí está por si la usas)
 * Body: { name, email, password, role }
 */
router.post(
  '/register',
  [
    body('name', 'Nombre requerido').notEmpty(),
    body('email', 'Email inválido').isEmail(),
    body('password', 'Password requerido (>= 4 chars para práctica)').isLength({ min: 4 }),
    body('role', 'Rol inválido').isIn(['admin', 'recepcionista', 'medico'])
  ],
  register
);

export default router;