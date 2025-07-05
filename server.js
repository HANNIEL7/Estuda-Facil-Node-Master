import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';

// Carrega variáveis do .env
dotenv.config();

const app = express();

// Middlewares globais
app.use(cors()); // Libera acesso de outros domínios (CORS)
app.use(express.json()); // Permite receber JSON no corpo das requisições

// Define as rotas da aplicação
app.use('/api', authRoutes);

// Inicializa o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
