import axios from "axios";
import Groq from "groq-sdk";
const api = import.meta.env.VITE_GROQ_API_KEY;
const groq = new Groq({ apiKey: api ,dangerouslyAllowBrowser: true });

export async function main() {
  const chatCompletion = await getGroqChatCompletion();
  
  console.log(chatCompletion.choices[0]?.message?.content || "");
}
export async function sendToGroq(message) {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: message,
      },
    ],
    model: "openai/gpt-oss-20b",
  });
}