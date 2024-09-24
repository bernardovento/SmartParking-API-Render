import Groq from "groq-sdk";
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function AiContent(mensagem: string): Promise<string>{
    try{
      const chatCompletion = await groq.chat.completions
      .create({
        messages: [
          {
            role: "system",
            content: `Ao receber um comentário, você deve dizer apenas "valido" ou "invalido".
                              Comentários válidos são comentários de feedback relacionado a empresa, a universidade de vila velha (uvv), ou o evento do Inova Week.
                              Comentários inválidos são comentários não relacionados ao tema, feitos com intuito de humor ou ser pejorativo/ofensivo. 
                              Retorne sempre no formato JSON com a chave "classificação". Exemplo: {"classificação": "valido"}. 
                              Se não puder classificar, retorne {"classificação": "invalido"}.`,
          },
          {
            role: "user",
            content: mensagem
          }
        ],
        model: "llama-3.1-70b-versatile",
      });
        const content = chatCompletion.choices[0]?.message?.content || "";
        return content;    
    }catch(error){
      console.log("Erro no API do groq", error);
      return "";
    }
  }
  export default AiContent;