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
  // Tabela de usuários (atendente, garçom, gerente)
  db.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      senha TEXT NOT NULL,
      tipo TEXT NOT NULL CHECK(tipo IN ('atendente', 'garcom', 'gerente'))
    )
  `);

  db.serialize(() => {
    db.run("ALTER TABLE mesas RENAME TO mesas_antiga");
    db.run(`
      CREATE TABLE mesas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        capacidade INTEGER NOT NULL
      )
    `);
    db.run(`
      INSERT INTO mesas (id, capacidade)
      SELECT id, capacidade FROM mesas_antiga
    `);
    db.run("DROP TABLE mesas_antiga");
  });




  // Tabela de reservas
  db.run(`
    CREATE TABLE IF NOT EXISTS reservas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cliente TEXT NOT NULL,
      mesa_id INTEGER NOT NULL,
      data_reserva TEXT NOT NULL,
      horario_inicio TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'pendente',
      confirmada INTEGER NOT NULL DEFAULT 0,
      atendente_id INTEGER,
      garcom_id INTEGER,
      FOREIGN KEY (mesa_id) REFERENCES mesas(id),
      FOREIGN KEY (atendente_id) REFERENCES usuarios(id),
      FOREIGN KEY (garcom_id) REFERENCES usuarios(id)
    )
  `);
});

export default db;
