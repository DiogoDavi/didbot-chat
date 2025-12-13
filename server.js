import { WebSocketServer } from "ws";
import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

console.log("Chave carregada?", !!process.env.GROQ_API_KEY);

const PORT = process.env.PORT || 3000;

const wss = new WebSocketServer({ port: PORT });

console.log(`✅ Servidor WebSocket rodando na porta ${PORT}`);

wss.on("connection", (ws) => {
  console.log("✅ Cliente conectado!");

  ws.on("message", async (msg) => {
    const userMessage = msg.toString();
    console.log("📩 Usuário:", userMessage);

    try {
      const response = await client.chat.completions.create({
        model: "llama-3.1-8b-instant",
        messages: [
          { role: "user", content: userMessage }
        ],
      });

      const text = response.choices[0].message.content;
      ws.send(text);

    } catch (erro) {
      console.error("❌ Erro IA:", erro);
      ws.send("❌ Erro ao gerar resposta com Groq");
    }
  });
});
