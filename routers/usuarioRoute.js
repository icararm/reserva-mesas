import express from 'express';
const router = express.Router();

// listar todos os usuários
router.get('/usuario', (req, res) => {
  res.send('Listando todos os usuários');
});

// criar um novo usuário
router.post('/usuario', (req, res) => {
  res.send('Usuário criado');
});

// atualizar um usuário
router.put('/usuario/:id', (req, res) => {
  const { id } = req.params;
  res.send(`Usuário ${id} atualizado`);
});

// excluir um usuário
router.delete('/usuario/:id', (req, res) => {
  const { id } = req.params;
  res.send(`Usuário ${id} deletado`);
});

export default router;
