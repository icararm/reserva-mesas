import express from 'express';
const router = express.Router();

// listar todas as mesas
router.get('/mesas', (req, res) => {
  res.send('Listando todas as mesas');
});

// criar uma nova mesa
router.post('/mesas', (req, res) => {
  res.send('Mesa criada');
});

// atualizar uma mesa específica
router.put('/mesas/:id', (req, res) => {
  const { id } = req.params;
  res.send(`Mesa ${id} atualizada`);
});

// excluir uma mesa
router.delete('/mesas/:id', (req, res) => {
  const { id } = req.params;
  res.send(`Mesa ${id} deletada`);
});

export default router;
