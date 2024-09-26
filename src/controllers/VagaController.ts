import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import AiName from '../utils/AiName';
import fetch from 'node-fetch';

const prisma = new PrismaClient();

function getRandomColor(): string {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
class VagaController {
    constructor() {}

    // Método para listar todos os vagas
    async listVaga(req: Request, res: Response) {
        try {
            const vaga = await prisma.vaga.findMany();
            res.json(vaga);
        } catch (error) {
            console.error(error);
            return res.status(500).json({
            });
        }
    }

    // Método para criar um novo vaga
    /*
    async createVaga(req: Request, res: Response) {
      // Inicializa a vaga com o nome vazio
      const name = ''; 
  
      // Cria a vaga no banco de dados
      try {
          const newVaga = await prisma.vaga.create({
              data: {
                  name  // Inicializa o campo name com string vazia
              },
          });
  
          console.log("Vaga criada com sucesso");
          res.status(200).json({
              status: 200,
              newVaga,
          });
      } catch (error) {
          console.error("Erro ao criar vaga", error);
          res.status(500).json({ message: "Erro ao criar vaga." });
      }
    }*/
  
        async listAVaga(req: Request, res: Response) {
          try {
            const id = req.params.id;
            const vaga = await prisma.vaga.findUnique({
              where: {
                id: parseInt(id),
              },
            }  );
            res.json(vaga);
          } catch (error) {
            console.error(error);
            return res.status(500).json({
            });
          }
      }
      async updateVaga(req: Request, res: Response) {
        try {
          const id = req.params.id;
          const name = req.body.name;
      
          const responseName = await AiName(name);
      
          if (!responseName || responseName.trim() === "") {
            console.error("Resposta da API para o nome está vazia");
            return res.status(500).json({ message: "Resposta da API para o nome está vazia." });
          }
      
          let validName;
          try {
            validName = JSON.parse(responseName);
            console.log("ValidName:", validName);
          } catch (error) {
            console.error("Erro ao parsear JSON do nome", error);
            return res.status(500).json({ message: "Erro ao processar a resposta da API para o nome." });
          }
      
          if (!validName.classificação) {
            return res.status(500).json({ message: "Classificação inválida no retorno da API." });
          }

          if (validName.classificação === "invalido") {
            return res.status(400).json({ message: "Nome inválido. Por favor, insira um nome válido." });
          }
          

          const randomColor = getRandomColor();

          const updatedVaga = await prisma.vaga.update({
            where: {
              id: parseInt(id),
            },
            data: { 
              name,
              color : randomColor
             },
          });
      
          if (updatedVaga) {
            // Iniciar timeout para limpar o nome após 5 minutos (300000ms)
            setTimeout(async () => {
              try {
                await prisma.vaga.update({
                  where: { id: parseInt(id) },
                  data: { name: '', color: '' },
                });
                console.log(`Vaga com ID ${id} teve o nome limpo após 5 minutos.`);
              } catch (error) {
                console.error(`Erro ao limpar o nome da vaga com ID ${id}:`, error);
              }
            }, 1800000); // 1800000 milissegundos = 30 minutos
      
            return res.json({
              status: 200,
              updatedVaga,
            });
          }
        } catch (error) {
          console.log(error);
          res.json({
            status: 500,
            message: error,
          });
        }
      }
              
    }

export default new VagaController();