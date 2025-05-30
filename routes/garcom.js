import express from 'express';
import { confirmarReserva, listarReservasPendentes } from '../controllers/reservaController.js';

const router = express.Router();

// PUT /api/garcom/reservas/:id/confirmar
router.put('/reservas/:id/confirmar', confirmarReserva);

// PUT para atualizar status de reserva (usar o novo método genérico)
//router.put('/reservas/:id/status', atualizarStatusReserva);

//GET
router.get('/reservas/pendentes', listarReservasPendentes);

export default router;
