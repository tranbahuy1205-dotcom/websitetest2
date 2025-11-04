
import { GoogleGenAI } from "@google/genai";
import { Product } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateDescription(productName: string, keywords: string[]): Promise<string> {
  const prompt = `Generate a captivating and professional e-commerce product description for a product named '${productName}'. Highlight these features or keywords: ${keywords.join(', ')}. The description should be around 50-70 words, be persuasive for online shoppers, and avoid any introductory phrases like "Introducing..." or "Here is...". Just provide the description text directly.`;
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text.trim();
  } catch (error) {
    console.error('Error generating description from Gemini:', error);
    throw new Error('Failed to generate product description.');
  }
}

export async function answerProductQuestion(product: Product, question: string): Promise<string> {
  const prompt = `You are a helpful AI assistant for an e-commerce store. Answer the user's question based ONLY on the following product information. If the answer is not in the information, say you don't have that specific information. Keep your answers concise and friendly.

Product Information:
Name: ${product.name}
Price: $${product.price.toFixed(2)}
Description: ${product.description}
Keywords/Tags: ${product.keywords.join(', ')}

User's Question: ${question}`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text.trim();
  } catch (error) {
    console.error('Error answering question with Gemini:', error);
    throw new Error('Failed to get an answer.');
  }
}
