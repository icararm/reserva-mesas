import { Router } from 'express';

const router = Router();

router.get("/reservas", (req, res) => {
  res.send("Listando todos as reservas...");
});

router.post("/reservas", (req, res) => {
   res.send("Criando uma nova reserva..");
});

//router.put("/atendimentos/:id", (req, res) => {
//  const { id } = req.params;
//  res.send(`Atualizando atendimento com ID: ${id}`);
//});

router.delete("/reservas/:id", (req, res) => {
  const { id } = req.params;
  res.send(`Excluindo reserva com ID: ${id}`);
});

export default router;

