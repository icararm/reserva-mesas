import express from 'express';
const app = express();

app.get("/", async (Request, Response) =>{
    Response.send("Página inicial");
});

app.listen(8080, () => {
    console.log("Servidor iniciado na porta 8080: http://localhost:8080");
});