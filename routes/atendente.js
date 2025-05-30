import express from 'express';
import { criarReserva, cancelarReserva, listarReservasPendentes } from '../controllers/reservaController.js';

const router = express.Router();

// POST /api/atendente/reservas
router.post('/reservas', criarReserva);

// DELETE /api/atendente/reservas/:id
router.delete('/reservas/:id', cancelarReserva);

// Rota para listar reservas pendentes
router.get('/reservas/pendentes', listarReservasPendentes);

export default router;
