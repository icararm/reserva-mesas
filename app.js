import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Servidor rodando");
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

app.get('/clientes', (req, res) => {
    res.json([
      { id: 1, nome: 'João' },
      { id: 2, nome: 'Maria' }
    ]);
  });

  app.get('/mesas', (req, res) => {
    res.json([
      { id: 1, lugares: 4 },
      { id: 2, lugares: 2 }
    ]);
  });
  