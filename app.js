import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

// Importação das rotas
import atendenteRoutes from './routes/atendente.js';
import garcomRoutes from './routes/garcom.js';
import gerenteRoutes from './routes/gerente.js';
import usuarioRoutes from './routes/usuario.js';

// Configurações de diretório
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.use(express.static('public'));

// configuração da sessão
import session from 'express-session';

app.use(session({
  secret: 'chave-secreta',
  resave: false,
  saveUninitialized: false
}));

// Rotas
app.use('/api/atendente', atendenteRoutes);
app.use('/api/garcom', garcomRoutes);
app.use('/api/gerente', gerenteRoutes);
app.use('/api', usuarioRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

