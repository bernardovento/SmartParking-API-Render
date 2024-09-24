import { Router } from "express";

import UserController from "../controllers/UserController";

const UserRouter = Router();

//Inserir usuários
// UserRouter.get("/users", UserController.listUser);

//Inserir usuários
// UserRouter.post("/user", UserController.createUser);

//Deletar usuários
// UserRouter.delete("/user/:id", UserController.deleteUser);

export default UserRouter;