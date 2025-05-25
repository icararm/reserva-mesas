import express from 'express';
import db from '../db.js';

const router = express.Router();

// Listar todas as reservas
router.get('/', (req, res) => {
  db.all('SELECT * FROM reservas', [], (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao listar reservas' });
    }
    res.json(rows);
  });
});

// Criar reserva (feito pelo atendente)
router.post('/', (req, res) => {
  const { cliente, mesa_id, data_reserva, horario_inicio, status, atendente_id } = req.body;

  if (!cliente || !mesa_id || !data_reserva || !horario_inicio) {
    return res.status(400).json({ error: 'Campos obrigatórios não preenchidos' });
  }

  const sql = `
    INSERT INTO reservas (cliente, mesa_id, data_reserva, horario_inicio, status, confirmada, atendente_id)
    VALUES (?, ?, ?, ?, ?, 0, ?)
  `;

  db.run(sql, [cliente, mesa_id, data_reserva, horario_inicio, status || 'pendente', atendente_id], function(err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao criar reserva' });
    }
    res.status(201).json({
      id: this.lastID,
      cliente,
      mesa_id,
      data_reserva,
      horario_inicio,
      status: status || 'pendente',
      confirmada: 0,
      atendente_id
    });
  });
});

// Confirmar reserva (feito pelo garçom)
router.post('/:id/confirmar', (req, res) => {
  const { id } = req.params;
  const { garcom_id } = req.body;

  const sql = `
    UPDATE reservas
    SET confirmada = 1, garcom_id = ?, status = 'confirmada'
    WHERE id = ? AND confirmada = 0
  `;

  db.run(sql, [garcom_id, id], function(err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao confirmar reserva' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Reserva não encontrada ou já confirmada' });
    }
    res.json({ message: `Reserva ${id} confirmada com sucesso` });
  });
});

// Cancelar reserva (feito pelo atendente)
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db.run('DELETE FROM reservas WHERE id = ?', [id], function(err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao cancelar reserva' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Reserva não encontrada' });
    }
    res.json({ message: `Reserva ${id} cancelada com sucesso` });
  });
});

export default router;

