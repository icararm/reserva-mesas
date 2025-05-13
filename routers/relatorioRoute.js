import express from 'express';
import connection from '../db.js';


const router = express.Router();

// relatório de reservas por período
router.get('/relatorios/periodo', async (req, res) => {
  const { inicio, fim } = req.query;

  if (!inicio || !fim) {
    return res.status(400).json({ error: 'Parâmetros "inicio" e "fim" são obrigatórios.' });
  }

  try {
    // Exemplo de consulta SQL para obter reservas dentro do período fornecido
    const [rows] = await connection.execute(
      'SELECT * FROM reservas WHERE dataReserva BETWEEN ? AND ?',
      [inicio, fim]
    );
    res.json({ reservas: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar relatório de reservas por período.' });
  }
});

// relatório de reservas por mesa
  router.get('/relatorios/mesa/:numeroMesa', async (req, res) => {
    const { numeroMesa } = req.params;
  
    if (!numeroMesa) {
      return res.status(400).json({ error: 'Parâmetro "numeroMesa" é obrigatório.' });
    }
  
    try {
      // Exemplo de consulta SQL para obter reservas para uma mesa específica
      const [rows] = await connection.execute(
        'SELECT * FROM reservas WHERE mesa = ?',
        [numeroMesa]
      );
      res.json({ reservas: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar relatório de reservas por mesa.' });
  }
});

// relatório de mesas confirmadas por garçom
router.get('/relatorios/garcom/:idGarcom', async(req, res) => {
  const { idGarcom } = req.params;
  
  if (!idGarcom) {
    return res.status(400).json({ error: 'Parâmetro "idGarcom" é obrigatório.' });
  }

  try {
    // Exemplo de consulta SQL para obter mesas confirmadas por garçom
    const [rows] = await connection.execute(
      'SELECT * FROM reservas WHERE idGarcom = ? AND confirmada = 1',
      [idGarcom]
    );
    res.json({ reservas: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar relatório de mesas confirmadas por garçom.' });
  }
});

export default router;
