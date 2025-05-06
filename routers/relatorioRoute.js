import express from 'express';
const router = express.Router();

// relatório de reservas por período
router.get('/relatorios/periodo', (req, res) => {
  const { inicio, fim } = req.query;
  res.send(`Relatório de reservas de ${inicio} até ${fim}`);
});

// relatório de reservas por mesa
router.get('/relatorios/mesa/:numeroMesa', (req, res) => {
  const { numeroMesa } = req.params;
  res.send(`Relatório de reservas para a mesa ${numeroMesa}`);
});

// relatório de mesas confirmadas por garçom
router.get('/relatorios/garcom/:idGarcom', (req, res) => {
  const { idGarcom } = req.params;
  res.send(`Relatório de mesas confirmadas pelo garçom ${idGarcom}`);
});

export default router;
