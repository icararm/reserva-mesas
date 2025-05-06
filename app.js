import express from "express";
import routerReserva from "./routers/reservaRoute.js"; 
import routerConfirmacoes from "./routers/confirmacaoRoute.js";
import routerRelatorio from "./routers/relatorioRoute.js";
import routerMesa from "./routers/mesaRoute.js";
import routerUsuario from "./routers/usuarioRoute.js";

const app = express();
const port = 3000;

app.use(express.json());

// Importa e usa as rotas
app.use(routerReserva);
app.use(routerConfirmacoes);
app.use(routerRelatorio);
app.use(routerMesa);
app.use(routerUsuario);

app.get("/", (req, res) => {
  res.send("Servidor rodando");
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

  