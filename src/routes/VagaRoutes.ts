import { Router } from "express";

import VagaController from "../controllers/VagaController";

const VagaRouter = Router()

//Listar todas as vagas
VagaRouter.get("/vagas", VagaController.listVaga);

//Lisar uma vaga específica
VagaRouter.get("/vaga/:id", VagaController.listAVaga);


//Inserir usuários
//VagaRouter.post("/vaga", VagaController.createVaga);

// Alterar uma vaga!
VagaRouter.put("/vaga/:id", VagaController.updateVaga);


export default VagaRouter;