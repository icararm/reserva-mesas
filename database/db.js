// db.js
import sqlite3 from 'sqlite3';
sqlite3.verbose();

const db = new sqlite3.Database('./reservas.db', (err) => {
  if (err) {
    console.error('Erro ao conectar com o banco de dados:', err.message);
  } else {
    console.log('Conectado ao banco de dados SQLite.');
  }
});

db.serialize(() => {
  // Criar tabela usuarios
  db.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      tipo TEXT NOT NULL CHECK(tipo IN ('atendente', 'garcom', 'gerente'))
    )
  `);

  // Criar tabela reservas
  db.run(`
    CREATE TABLE IF NOT EXISTS reservas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      data TEXT NOT NULL,
      hora TEXT NOT NULL,
      mesa INTEGER NOT NULL,
      qtd_pessoas INTEGER NOT NULL,
      nome_cliente TEXT NOT NULL,
      status TEXT NOT NULL CHECK(status IN ('pendente', 'confirmada', 'cancelada')),
      garcom_id INTEGER,
      FOREIGN KEY (garcom_id) REFERENCES usuarios(id)
    )
  `);
});

export default db;
