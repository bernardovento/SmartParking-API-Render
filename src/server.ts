import express, { Request, Response } from "express";

import { PrismaClient } from "@prisma/client";

import AuthRoutes from "./routes/AuthRoutes";
import FeedbackRouter from "./routes/FeedbackRoutes";
import UserRouter from "./routes/UserRoutes";
import VagaRouter from "./routes/VagaRoutes";


const prisma = new PrismaClient();

const app = express();
app.use(express.json());

app.use(AuthRoutes);
app.use(FeedbackRouter);
//app.use(UserRouter);
app.use(VagaRouter);



app.listen(process.env.PORTA_SERVER, function () {
  console.log("Servidor rodando na porta " + process.env.PORTA_SERVER);
});
