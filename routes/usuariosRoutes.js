import express from 'express';
import db from '../db.js';

const router = express.Router();

// Listar todos os usuários
router.get('/', (req, res) => {
  db.all('SELECT id, nome, email, tipo FROM usuarios', [], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Erro ao listar usuários' });
    res.json(rows);
  });
});

// Criar usuário
router.post('/', (req, res) => {
  const { nome, email, senha, tipo } = req.body;
  if (!nome || !email || !senha || !tipo) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }
  const sql = 'INSERT INTO usuarios (nome, email, senha, tipo) VALUES (?, ?, ?, ?)';
  db.run(sql, [nome, email, senha, tipo], function(err) {
    if (err) return res.status(500).json({ error: 'Erro ao criar usuário' });
    res.status(201).json({ id: this.lastID, nome, email, tipo });
  });
});

// Atualizar usuário
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nome, email, senha, tipo } = req.body;
  const sql = `UPDATE usuarios SET nome = ?, email = ?, senha = ?, tipo = ? WHERE id = ?`;
  db.run(sql, [nome, email, senha, tipo, id], function(err) {
    if (err) return res.status(500).json({ error: 'Erro ao atualizar usuário' });
    if (this.changes === 0) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.json({ message: `Usuário ${id} atualizado com sucesso` });
  });
});

// Excluir usuário
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM usuarios WHERE id = ?', [id], function(err) {
    if (err) return res.status(500).json({ error: 'Erro ao deletar usuário' });
    if (this.changes === 0) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.json({ message: `Usuário ${id} deletado com sucesso` });
  });
});

export default router;



