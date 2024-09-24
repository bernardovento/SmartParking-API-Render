import { Request, Response} from 'express';
import bcrypt from "bcrypt";
import { PrismaClient} from '@prisma/client'
import { CheckUserPassword } from '../utils/HashPassword';
import { generateJwToken } from '../utils/JWT';

const prisma = new PrismaClient();

 class AuthController{
    constructor(){}

    async signin(req: Request, res: Response){
        try{
            const {name, password} = req.body;

            if(!name || !password){
                return res.json({
                    status: 400,
                    message: "Não contém o nome ou senha no body"
                })
            }

            const user = await prisma.user.findFirst({
                where: {
                    name
                },
            });

            if(!user){
                return res.json({
                    status: 500, 
                    message: "Nome não encontrado"
                })
            }

            const passwordCheck = await CheckUserPassword(password, user.password ?? '');

            if(!passwordCheck){
                return res.json({
                    status: 401,
                    message: "Usuário ou senha inválidos!"
                })
            }
            return res.json({
                status: 200,
                message: "Logado com sucesso!",
                token: await generateJwToken(req.body)
            })
        }catch(error){
            console.log(error);
            return res.status(500).json({
                error: error
            })
        }
    }

    async signout(){

    }
}
export default new AuthController;
