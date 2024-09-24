import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors"; // Importando o middleware cors

import AuthRoutes from "./routes/AuthRoutes";
import FeedbackRouter from "./routes/FeedbackRoutes";
import VagaRouter from "./routes/VagaRoutes";

const prisma = new PrismaClient();
const app = express();

// Configurando o CORS para permitir múltiplas origens
const allowedOrigins = ['http://localhost:8081', 'https://smartparking.com.br'];

app.use(cors({
  origin: (origin, callback) => {
    // Verifica se a origem da requisição está na lista de origens permitidas
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Não permitido por CORS'));
    }
  },
  credentials: true // Se precisar enviar cookies ou cabeçalhos de autenticação
}));

app.use(express.json());

app.use(AuthRoutes);
app.use(FeedbackRouter);
app.use(VagaRouter);

app.listen(process.env.PORT ? Number(process.env.PORT) : 3333, function () {
  console.log("Servidor rodando na porta " + process.env.PORT);
});