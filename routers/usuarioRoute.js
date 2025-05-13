import express from 'express';
import connection from '../db.js';


const router = express.Router();

// listar todos os usuários

router.get('/usuario', async (req, res) => {
    try {
        const [rows] = await connection.execute('SELECT * FROM usuarios');
        res.json(rows);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao listar usuários' });
      }
});

// criar um novo usuário
router.post('/usuario', async (req, res) => {
    const { nome, email, senha, tipo } = req.body;
    try {
      const [result] = await connection.execute(
        'INSERT INTO usuarios (nome, email, senha, tipo) VALUES (?, ?, ?, ?)',
        [nome, email, senha, tipo]
      );
      res.status(201).json({ id: result.insertId, nome, email, tipo });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao criar usuário' });
    }
});

// atualizar um usuário
router.put('/usuario/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, email, senha, tipo } = req.body;
    try {
      await connection.execute(
        'UPDATE usuarios SET nome = ?, email = ?, senha = ?, tipo = ? WHERE id = ?',
        [nome, email, senha, tipo, id]
      );
      res.json({ message: `Usuário ${id} atualizado com sucesso` });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
});

// excluir um usuário
router.delete('/usuario/:id', async (req, res) => {
    const { id } = req.params;
    try {
      await connection.execute('DELETE FROM usuarios WHERE id = ?', [id]);
      res.json({ message: `Usuário ${id} deletado com sucesso` });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao deletar usuário' });
    }
});

export default router;
