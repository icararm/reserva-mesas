import db from '../database/db.js';

// Criar nova reserva (Atendente)
export function criarReserva(req, res) {
  console.log('req.body:', req.body);

  let { data, hora, mesa, qtd_pessoas, nome_cliente } = req.body;

  // Conversões de tipos
  mesa = parseInt(mesa, 10);
  qtd_pessoas = parseInt(qtd_pessoas, 10);

  if (!data || !hora || !mesa || !qtd_pessoas || !nome_cliente) {
    return res.status(400).json({ erro: 'Todos os campos são obrigatórios.' });
  }

  const sql = `
    INSERT INTO reservas (data, hora, mesa, qtd_pessoas, nome_cliente, status)
    VALUES (?, ?, ?, ?, ?, 'pendente')
  `;

  db.run(sql, [data, hora, mesa, qtd_pessoas, nome_cliente], function (err) {
    if (err) {
      console.error('Erro ao inserir no banco:', err.message);
      return res.status(500).json({ erro: 'Erro ao criar reserva.' });
    }
    res.status(201).json({ id: this.lastID });
  });
}


// Cancelar reserva (Atendente)
export function cancelarReserva(req, res) {
  const reservaId = req.params.id;

  const sql = `
    UPDATE reservas SET status = 'cancelada'
    WHERE id = ? AND status = 'pendente'
  `;

  db.run(sql, [reservaId], function (err) {
    if (err) {
      return res.status(500).json({ erro: 'Erro ao cancelar reserva.' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ erro: 'Reserva não encontrada ou já cancelada/confirmada.' });
    }
    res.json({ mensagem: 'Reserva cancelada com sucesso.' });
  });
}

// Listar reservas
export function listarReservasPendentes(req, res) {
  const sql = `
    SELECT * FROM reservas
    WHERE status = 'pendente'
    ORDER BY data, hora
  `;

  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ erro: 'Erro ao buscar reservas.' });
    }
    res.json(rows);
  });
}

/*Confirmar reserva (Garçom)
export function confirmarReserva(req, res) {
  const reservaId = req.params.id;

  const sql = `
    UPDATE reservas SET status = 'confirmada'
    WHERE id = ? AND status = 'pendente'
  `;

  db.run(sql, [reservaId], function (err) {
    if (err) {
      return res.status(500).json({ erro: 'Erro ao confirmar reserva.' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ erro: 'Reserva não encontrada ou já confirmada/cancelada.' });
    }
    res.json({ mensagem: 'Reserva confirmada com sucesso.' });
  });
}
*/

export function confirmarReserva(req, res) {
  const reservaId = req.params.id;
  const garcomId = req.session.userId;

  if (!garcomId || req.session.userTipo !== 'garcom') {
    return res.status(403).json({ erro: 'Apenas garçons podem confirmar reservas.' });
  }

  const sql = `
    UPDATE reservas SET status = 'confirmada', garcom_id = ?
    WHERE id = ? AND status = 'pendente'
  `;

  db.run(sql, [garcomId, reservaId], function (err) {
    if (err) {
      return res.status(500).json({ erro: 'Erro ao confirmar reserva.' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ erro: 'Reserva não encontrada ou já confirmada/cancelada.' });
    }
    res.json({ mensagem: 'Reserva confirmada com sucesso.' });
  });
}

