import { Router } from 'express';

const router = Router();

// Confirmar ocupação de reserva
router.post('/confirmacoes/:id', (req, res) => {
    const { id } = req.params;
    res.send(`Reserva ${id} confirmada pelo garçom.`);
  });
  
  export default router;