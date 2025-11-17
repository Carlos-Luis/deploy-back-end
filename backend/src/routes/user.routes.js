import { Router } from 'express';
import { body } from 'express-validator';
import { createUser, listUsers } from '../controllers/user.controller.js';
import { requireAuth } from '../middleware/auth.js';
import { requireRole } from '../middleware/roles.js';

const router = Router();

// Todas las rutas requieren autenticación
router.use(requireAuth);

/**
 * GET /users
 * Lista de usuarios (sin password)
 * Accesible por admin y recepcionista
 */
router.get('/users', requireRole('admin', 'recepcionista'), listUsers);

/**
 * POST /users
 * Body: { name, email, password, role }
 * Solo admin puede crear usuarios
 */
router.post(
  '/',
  requireRole('admin'),
  [
    body('name', 'Nombre requerido').notEmpty(),
    body('email', 'Email inválido').isEmail(),
    body('password', 'Password requerido').isLength({ min: 4 }),
    body('role', 'Rol inválido').isIn(['admin', 'recepcionista', 'medico'])
  ],
  createUser
);

export default router;