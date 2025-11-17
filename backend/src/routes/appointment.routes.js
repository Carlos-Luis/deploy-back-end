import { Router } from 'express';
import { body } from 'express-validator';
import {
  createAppointment,
  listAppointments,
  updateAppointment
} from '../controllers/appointment.controller.js';
import { requireAuth } from '../middleware/auth.js';
import { requireRole } from '../middleware/roles.js';

const router = Router();

// Todas requieren autenticación
router.use(requireAuth);

/**
 * POST /appointments
 * Crear cita (recepcionista o admin)
 */
router.post(
  '/',
  requireRole('recepcionista', 'admin'),
  [
    body('doctor', 'ID de médico requerido').notEmpty(),
    body('patient', 'ID de paciente requerido').notEmpty(),
    body('scheduledAt', 'Fecha requerida (ISO 8601)').isISO8601(),
    body('motivo', 'Motivo requerido').notEmpty()
  ],
  createAppointment
);

/**
 * GET /appointments
 * Listar citas (todos los autenticados)
 */
router.get('/', listAppointments);

/**
 * PATCH /appointments/:id
 * Actualizar estado de cita (médico o admin)
 */
router.patch(
  '/:id',
  requireRole('medico', 'admin'),
  [
    body('estado', 'Estado inválido').isIn(['pendiente', 'confirmada', 'cancelada', 'completada'])
  ],
  updateAppointment
);

export default router;