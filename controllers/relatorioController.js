import db from '../database/db.js';

export function relatorioPorPeriodo(req, res) {
  const { inicio, fim } = req.query;
  console.log('Relatório por período:', inicio, fim);

  const sql = `
    SELECT * FROM reservas
    WHERE data BETWEEN ? AND ?
    ORDER BY data, hora
  `;

  db.all(sql, [inicio, fim], (err, rows) => {
    if (err) {
      console.error('Erro SQL:', err);
      return res.status(500).json({ erro: 'Erro ao gerar relatório por período.' });
    }
    res.json(rows);
  });
}

// Reservas por mesa
export function relatorioPorMesa(req, res) {
  const mesa = req.params.mesa;

  const sql = `
    SELECT * FROM reservas
    WHERE mesa = ?
    ORDER BY data, hora
  `;

  db.all(sql, [mesa], (err, rows) => {
    if (err) {
      return res.status(500).json({ erro: 'Erro ao gerar relatório por mesa.' });
    }
    res.json(rows);
  });
}

// Reservas confirmadas por garçom
export function relatorioPorGarcom(req, res) {
  const garcomId = req.params.garcomId;

  const sql = `
    SELECT * FROM reservas
    WHERE garcom_id = ? AND status = 'confirmada'
    ORDER BY data, hora
  `;

  db.all(sql, [garcomId], (err, rows) => {
    if (err) {
      return res.status(500).json({ erro: 'Erro ao gerar relatório por garçom.' });
    }
    res.json(rows);
  });
}
