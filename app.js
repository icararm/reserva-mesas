import express from 'express';
import mesasRoutes from './routes/mesasRoutes.js';
import relatoriosRoutes from './routes/relatoriosRoutes.js';
import reservasRoutes from './routes/reservasRoutes.js';
import usuariosRoutes from './routes/usuariosRoutes.js';

const app = express();

app.use(express.json());

app.use('/mesas', mesasRoutes);      
app.use('/reservas', reservasRoutes); 
app.use('/usuarios', usuariosRoutes); 
app.use('/relatorios', relatoriosRoutes); 

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT} http://localhost:3000`);
});


  