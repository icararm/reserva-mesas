import { Router } from 'express';
import connection from '../db.js';


const router = Router();

router.get("/reservas", async (req, res) => {
  try {
    const [rows] = await connection.execute('SELECT * FROM reservas');
    res.json(rows); // Retorna todas as reservas em formato JSON
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao listar as reservas' });
  }
});

router.post("/reservas", async (req, res) => {
  const { cliente, mesa, dataReserva, horaReserva } = req.body;

  if (!cliente || !mesa || !dataReserva || !horaReserva) {
    return res.status(400).json({ error: 'Todos os campos (cliente, mesa, dataReserva, horaReserva) são obrigatórios' });
  }

  try {
    const [result] = await connection.execute(
      'INSERT INTO reservas (cliente, mesa, dataReserva, horaReserva) VALUES (?, ?, ?, ?)',
      [cliente, mesa, dataReserva, horaReserva]
    );
    res.status(201).json({ id: result.insertId, cliente, mesa, dataReserva, horaReserva });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar a reserva' });
  }
});

//router.put("/atendimentos/:id", (req, res) => {
//  const { id } = req.params;
//  res.send(`Atualizando atendimento com ID: ${id}`);
//});

router.delete("/reservas/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await connection.execute('DELETE FROM reservas WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Reserva não encontrada' });
    }

    res.json({ message: `Reserva com ID ${id} excluída com sucesso` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao excluir a reserva' });
  }
});

export default router;

