import { Router } from 'express';
import connection from '../db.js';


const router = Router();

// Confirmar ocupação de reserva
router.post('/confirmacoes/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await connection.execute(
      'UPDATE reservas SET confirmada = 1 WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Reserva não encontrada' });
    }

    res.json({ message: `Reserva ${id} confirmada com sucesso.` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao confirmar a reserva' });
  }
});
  export default router;