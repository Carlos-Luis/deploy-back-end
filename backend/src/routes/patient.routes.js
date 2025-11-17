import { Router } from 'express';
import { body } from 'express-validator';
import {
  createPatient,
  listPatients,
  updatePatient,
  deletePatient
} from '../controllers/patient.controller.js';
import { requireAuth } from '../middleware/auth.js';
import { requireRole } from '../middleware/roles.js';

const router = Router();

// Todas requieren autenticación
router.use(requireAuth);

/**
 * POST /patients
 * Crea paciente (solo recepcionista o admin)
 */
router.post(
  '/',
  requireRole('recepcionista', 'admin'),
  [
    body('fullName', 'Nombre requerido').notEmpty(),
    body('ci', 'CI requerido').notEmpty(),
    body('birthDate', 'Fecha de nacimiento inválida (ISO 8601)').isISO8601(),
    body('phone', 'Teléfono requerido').notEmpty()
  ],
  createPatient
);

/**
 * GET /patients
 * Listado (lo habilitamos para recepcionista, admin y médico)
 */
router.get('/', requireRole('recepcionista', 'admin', 'medico'), listPatients);

/**
 * PUT /patients/:id
 * Actualiza paciente (recepcionista o admin)
 */
router.put(
  '/:id',
  requireRole('recepcionista', 'admin'),
  [
    body('fullName').optional().notEmpty(),
    body('birthDate').optional().isISO8601(),
    body('phone').optional().notEmpty()
  ],
  updatePatient
);

/**
 * DELETE /patients/:id
 * Elimina paciente (solo admin)
 */
router.delete('/:id', requireRole('admin'), deletePatient);

export default router;
