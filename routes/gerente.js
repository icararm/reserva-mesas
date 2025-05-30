import express from 'express';
import {
  relatorioPorPeriodo,
  relatorioPorMesa,
  relatorioPorGarcom,
} from '../controllers/relatorioController.js';

const router = express.Router();

// GET /api/gerente/relatorios/periodo?inicio=2025-01-01&fim=2025-01-31
router.get('/relatorios/periodo', relatorioPorPeriodo);

// GET /api/gerente/relatorios/mesa/:mesa
router.get('/relatorios/mesa/:mesa', relatorioPorMesa);

// GET /api/gerente/relatorios/garcom/:garcomId
router.get('/relatorios/garcom/:garcomId', relatorioPorGarcom);

export default router;



