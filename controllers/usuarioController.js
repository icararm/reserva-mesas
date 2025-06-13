import db from '../database/db.js';

// Cadastrar novo usuário
export function cadastrarUsuario(req, res) {
  const { nome, tipo } = req.body;

  if (!nome || !tipo) {
    return res.status(400).json({ erro: 'Nome e tipo são obrigatórios.' });
  }

  const checkSql = `SELECT * FROM usuarios WHERE nome = ? AND tipo = ?`;
  db.get(checkSql, [nome, tipo], (err, row) => {
    if (err) return res.status(500).json({ erro: 'Erro ao verificar usuário.' });
    if (row) return res.status(409).json({ erro: 'Usuário já existe.' });

    const insertSql = `INSERT INTO usuarios (nome, tipo) VALUES (?, ?)`;
    db.run(insertSql, [nome, tipo], function (err) {
      if (err) return res.status(500).json({ erro: 'Erro ao cadastrar usuário.' });
      res.status(201).json({ ok: true, id: this.lastID });
    });
  });
}

export function loginUsuario(req, res) {
  const { nome, tipo } = req.body;

  if (!nome || !tipo) {
    return res.status(400).json({ erro: 'Nome e tipo são obrigatórios.' });
  }

  const sql = `SELECT * FROM usuarios WHERE nome = ? AND tipo = ?`;
  db.get(sql, [nome, tipo], (err, row) => {
    if (err) return res.status(500).json({ erro: 'Erro ao buscar usuário.' });
    if (!row) return res.status(401).json({ erro: 'Usuário não encontrado.' });

    // Salvar o ID e tipo na sessão
    req.session.userId = row.id;
    req.session.userTipo = row.tipo;

    res.json({ ok: true, tipo: row.tipo });
  });
}

// Listar Garçons
export function listarGarcons(req, res) {
  const sql = `SELECT id, nome FROM usuarios WHERE tipo = 'garcom' ORDER BY nome`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ erro: 'Erro ao buscar garçons.' });
    }
    res.json(rows);
  });
}