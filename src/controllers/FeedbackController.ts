import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import AiContent from '../utils/AiContent';
import AiName from '../utils/AiName';
import { verifyToken } from '../utils/JWT';


const prisma = new PrismaClient();

class FeedbackController {
    constructor() {}

    // Método para listar todos os feedbacks
    async listFeedback(req: Request, res: Response) {
        try {
            const feedback = await prisma.feedback.findMany();
            res.json(feedback);
        } catch (error) {
            console.error(error);
            return res.status(500).json({
            });
        }
    }

    // Método para criar um novo feedback
    async createFeedback(req: Request, res: Response) {
        const { content, name } = req.body; // Garantir que os dados vêm do req.body

        // Inicio padrão da criação de Feedback
        const responseContent = await AiContent(content);
        const responseName = await AiName(name);

        // Verificar se as respostas não estão vazias
        if (!responseContent || responseContent.trim() === "") {
            console.error("Resposta da API para o conteúdo está vazia");
            return res.status(500).json({ message: "Resposta da API para o conteúdo está vazia." });
        }

        if (!responseName || responseName.trim() === "") {
            console.error("Resposta da API para o nome está vazia");
            return res.status(500).json({ message: "Resposta da API para o nome está vazia." });
        }

        // Faz o parse do JSON para validar o conteúdo e o nome
        let validContent, validName;
        try {
            validContent = JSON.parse(responseContent);
            console.log("ValidContent:", validContent);
        } catch (error) {
            console.error("Erro ao parsear JSON do conteúdo", error);
            return res.status(500).json({ message: "Erro ao processar a resposta da API para o conteúdo." });
        }

        try {
            validName = JSON.parse(responseName);
            console.log("ValidName:", validName);
        } catch (error) {
            console.error("Erro ao parsear JSON do nome", error);
            return res.status(500).json({ message: "Erro ao processar a resposta da API para o nome." });
        }

        // Verificar se a chave 'classificação' está presente e válida
        if (!validContent.classificação || !validName.classificação) {
            return res.status(500).json({ message: "Classificação inválida no retorno da API." });
        }

        // Cria o feedback no banco de dados
        const newFeedback = await prisma.feedback.create({
            data: {
                name,  // Nome do feedback
                content, // Conteúdo do feedback
                validContent: validContent.classificação, // Classificação do conteúdo (valido/invalido)
                validName: validName.classificação, // Classificação do nome (valido/invalido)
            },
        });

        console.log("Feedback postado com sucesso");
        res.status(200).json({
            status: 200,
            newFeedback,
        });
    }
    async deleteFeedback(req: Request, res: Response) {
        try {
          // Pegue o token do cabeçalho de autorização
          const authHeader = req.headers.authorization;
      
          if (!authHeader) {
            return res.status(401).json({
              message: "Autenticação necessária",
            });
          }
      
          // O token normalmente vem no formato "Bearer TOKEN", então precisamos separá-lo
          const token = authHeader.split(' ')[1];
      
          // Verifique o token
          const decoded = await verifyToken(token);
      
          if (!decoded) {
            return res.status(401).json({
              message: "Token inválido ou expirado",
            });
          }
      
          // Token válido, então prossiga com a exclusão do feedback
          const id = req.params.id;
      
          await prisma.feedback.delete({
            where: {
              id: parseInt(id),
            },
          });
      
          res.status(200).json({
            status: 200,
            message: "Feedback deletado com sucesso",
          });
        } catch (error) {
          console.error(error);
          res.status(400).json({
            message: "Falha ao deletar o registro",
          });
        }
      }      
}

export default new FeedbackController();