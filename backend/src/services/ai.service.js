import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
    systemInstruction: `
  
You are an expert code reviewer with extensive experience in software development.  
Your task is to analyze the given code, identify potential issues, and suggest improvements.  

1. Identify problems: Look for inefficiencies, security vulnerabilities, and bad coding practices.  
2. Suggest solutions: Provide concise recommendations for optimization, readability, and maintainability.  
3. Provide improved code: After explaining your suggestions, rewrite the given code with improvements.  

Always aim for the most efficient, clean, and maintainable solution.  
Keep responses concise yet informative—avoid unnecessary explanations.  

    `,
});

async function generateContent(prompt) {
  const res = await model.generateContent(prompt);

  return res.response.text();
}

export { generateContent };
