import express from 'express';
import connection from '../db.js';


const router = express.Router();

// listar todas as mesas
router.get('/mesas', async (req, res) => {
  try {
    const [rows] = await connection.execute('SELECT * FROM mesas');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao listar mesas' });
  }
});

// criar uma nova mesa
router.post('/mesas', async (req, res) => {
  const { numero, lugares } = req.body;

  if (!numero || !lugares) {
    return res.status(400).json({ error: 'Campos "numero" e "lugares" são obrigatórios' });
  }

  try {
    const [result] = await connection.execute(
      'INSERT INTO mesas (numero, lugares) VALUES (?, ?)',
      [numero, lugares]
    );
    res.status(201).json({ id: result.insertId, numero, lugares });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar mesa' });
  }
});

// atualizar uma mesa específica
router.put('/mesas/:id', async (req, res) => {
  const { id } = req.params;
  const { numero, lugares } = req.body;

  try {
    const [result] = await connection.execute(
      'UPDATE mesas SET numero = ?, lugares = ? WHERE id = ?',
      [numero, lugares, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Mesa não encontrada' });
    }
    res.json({ message: `Mesa ${id} atualizada com sucesso` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao atualizar mesa' });
  }
});

// excluir uma mesa
router.delete('/mesas/:id', async(req, res) => {
  const { id } = req.params;

  try {
    const [result] = await connection.execute('DELETE FROM mesas WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Mesa não encontrada' });
    }
    res.json({ message: `Mesa ${id} deletada com sucesso` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao deletar mesa' });
  }
});

export default router;
