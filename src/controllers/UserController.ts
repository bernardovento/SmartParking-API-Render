import {Request, Response} from 'express';
import { CreateHashPassword } from '../utils/HashPassword';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class UserController {
    constructor(){
    }
    /*
    async listUser(req: Request, res: Response) {
      try {
          const user = await prisma.user.findMany();
          res.json(user);
      } catch (error) {
          console.error(error);
          return res.status(500).json({
          });
      }
  }

    async createUser(req: Request, res: Response){
        try {
            const userdata = req.body;

            userdata.password = await CreateHashPassword(userdata.password);

            console.log(userdata.password);
        
            console.log(userdata);
            const newuser = await prisma.user.create({
              data: userdata,
            });
        
            console.log(newuser);
        
            res.json({
              status: 200,
              newuser: newuser,
            });
          } catch (error) {
            console.log(error);
            res.json({
              status: 500,
              message: error,
            });
          }
    }

    async deleteUser(req: Request, res: Response){
        try {
            const id = req.params.id;
        
            await prisma.user.delete({
              where: {
                id: parseInt(id),
              },
            });
        
            res.status(200).json({
              status: 200,
              message: "Usuário deletado com sucesso",
            });
          } catch (error) {
            console.log(error);
            res.status(400).json({
              message: "Falha ao deletar o registro",
            });
          }
    }*/
}

export default new UserController();