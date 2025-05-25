import express from 'express';
import db from '../db.js';

const router = express.Router();

// Reservas em período
router.get('/periodo', (req, res) => {
  const { inicio, fim } = req.query;
  if (!inicio || !fim) return res.status(400).json({ error: 'Parâmetros inicio e fim são obrigatórios' });
  const sql = 'SELECT * FROM reservas WHERE data_reserva BETWEEN ? AND ?';
  db.all(sql, [inicio, fim], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Erro ao buscar relatório' });
    res.json(rows);
  });
});

// Reservas por mesa
router.get('/mesa/:mesa_id', (req, res) => {
  const { mesa_id } = req.params;
  const sql = 'SELECT * FROM reservas WHERE mesa_id = ?';
  db.all(sql, [mesa_id], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Erro ao buscar relatório' });
    res.json(rows);
  });
});

// Reservas confirmadas por garçom
router.get('/garcom/:garcom_id', (req, res) => {
  const { garcom_id } = req.params;
  const sql = `SELECT * FROM reservas WHERE garcom_id = ? AND confirmada = 1`;
  db.all(sql, [garcom_id], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Erro ao buscar relatório' });
    res.json(rows);
  });
});

export default router;


