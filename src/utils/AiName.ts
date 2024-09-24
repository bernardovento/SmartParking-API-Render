import Groq from "groq-sdk";
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function AiName(mensagem: string): Promise<string>{
    try{
      const chatCompletion = await groq.chat.completions
      .create({
        messages: [
          {
            role: "system",
            content: `Ao receber um nome, você deve dizer apenas "valido" ou "invalido".
                              Nomes inválidos são nomes falsos, como nomes que uma pessoa não teria de verdade, feitos com intuito de humor ou ser pejorativo/ofensivo. 
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
export default AiName;