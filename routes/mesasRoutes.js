import express from 'express';
import db from '../db.js';

const router = express.Router();

// Listar todas as mesas (rota raiz, pois o prefixo /mesas já está no app.js)
router.get('/', (req, res) => {
  db.all('SELECT * FROM mesas', [], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Erro ao listar mesas' });
    res.json(rows);
  });
});

// Criar mesa
router.post('/', (req, res) => {
  const { numero, capacidade } = req.body;
  if (!numero || !capacidade) {
    return res.status(400).json({ error: 'Campos numero e capacidade são obrigatórios' });
  }
  db.run('INSERT INTO mesas (numero, capacidade) VALUES (?, ?)', [numero, capacidade], function(err) {
    if (err) return res.status(500).json({ error: 'Erro ao criar mesa' });
    res.status(201).json({ id: this.lastID, numero, capacidade });
  });
});

// Atualizar mesa
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { numero, capacidade } = req.body;
  db.run('UPDATE mesas SET numero = ?, capacidade = ? WHERE id = ?', [numero, capacidade, id], function(err) {
    if (err) return res.status(500).json({ error: 'Erro ao atualizar mesa' });
    if (this.changes === 0) return res.status(404).json({ error: 'Mesa não encontrada' });
    res.json({ message: `Mesa ${id} atualizada com sucesso` });
  });
});

// Excluir mesa
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM mesas WHERE id = ?', [id], function(err) {
    if (err) return res.status(500).json({ error: 'Erro ao deletar mesa' });
    if (this.changes === 0) return res.status(404).json({ error: 'Mesa não encontrada' });
    res.json({ message: `Mesa ${id} deletada com sucesso` });
  });
});

export default router;


