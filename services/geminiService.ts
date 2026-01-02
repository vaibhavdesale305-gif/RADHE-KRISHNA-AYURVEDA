
import { GoogleGenAI, Type } from "@google/genai";

// Always initialize GoogleGenAI directly with process.env.API_KEY as per coding guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateProductDescription(productName: string, category: string) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Write a compelling, short, and premium Ayurvedic product description for "${productName}" in the "${category}" category. Focus on natural ingredients and traditional Indian benefits.`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return null;
  }
}

export async function getAyurvedicAdvice(query: string) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are an Ayurvedic expert for Radhe Krishna Ayurveda. Provide helpful advice for the user query: "${query}". Keep it professional and centered on natural remedies.`,
      config: {
        systemInstruction: "You are a professional Ayurvedic consultant. Always suggest natural, herbal remedies and promote traditional Indian wellness."
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Advice Error:", error);
    return "I am currently unable to provide advice. Please try again later.";
  }
}
