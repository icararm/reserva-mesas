import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

// Importação das rotas
import atendenteRoutes from './routes/atendente.js';
import garcomRoutes from './routes/garcom.js';
import gerenteRoutes from './routes/gerente.js';

// Configurações de diretório
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json()); // Parse JSON
app.use(express.urlencoded({ extended: true })); // Parse form data

app.use(express.static('public'));

// Rotas
app.use('/api/atendente', atendenteRoutes);
app.use('/api/garcom', garcomRoutes);
app.use('/api/gerente', gerenteRoutes);


// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

