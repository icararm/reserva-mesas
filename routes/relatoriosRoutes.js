import express from 'express';
import db from '../db.js';

const router = express.Router();

// Reservas em período (busca usando campo data_reserva)
function formatDateToISO(dateStr) {
  // Recebe 'dd/mm/aaaa' e retorna 'aaaa-mm-dd'
  const [day, month, year] = dateStr.split('/');
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}

router.get('/periodo', (req, res) => {
  let { inicio, fim } = req.query;

  if (!inicio || !fim) {
    return res.status(400).json({ error: 'Parâmetros inicio e fim são obrigatórios' });
  }

  // Converter para ISO (yyyy-mm-dd)
  inicio = formatDateToISO(inicio);
  fim = formatDateToISO(fim);

  const sql = 'SELECT * FROM reservas WHERE date(data_reserva) BETWEEN date(?) AND date(?)';
  db.all(sql, [inicio, fim], (err, rows) => {
    if (err) {
      console.error('Erro ao buscar relatório:', err);
      return res.status(500).json({ error: 'Erro ao buscar relatório' });
    }
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


