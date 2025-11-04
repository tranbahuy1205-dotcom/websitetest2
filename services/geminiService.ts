import { GoogleGenAI } from "@google/genai";
import { Product } from '../types';

let ai: GoogleGenAI | undefined;

function getAiClient(): GoogleGenAI {
  // If the client is already initialized, return it.
  if (ai) {
    return ai;
  }
  // If the API key is not available, throw an error.
  // This function should only be called when we are sure the key exists.
  if (!process.env.API_KEY) {
    throw new Error("Attempted to initialize AI client without an API key.");
  }
  // Initialize and store the client instance.
  ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  return ai;
}

export async function generateDescription(productName: string, keywords: string[]): Promise<string> {
  if (!process.env.API_KEY) {
    console.warn("API_KEY not set. Returning a mock description for demo purposes.");
    // Simulate a network delay for a more realistic demo feel
    await new Promise(resolve => setTimeout(resolve, 1000)); 
    return `Discover the new ${productName}, a premium product designed for excellence. Featuring ${keywords.join(', ')}, it offers unparalleled quality and performance. Perfect for enhancing your daily life, this item combines style and functionality seamlessly.`;
  }

  const prompt = `Generate a captivating and professional e-commerce product description for a product named '${productName}'. Highlight these features or keywords: ${keywords.join(', ')}. The description should be around 50-70 words, be persuasive for online shoppers, and avoid any introductory phrases like "Introducing..." or "Here is...". Just provide the description text directly.`;
  
  try {
    const aiClient = getAiClient();
    const response = await aiClient.models.generateContent({
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
  if (!process.env.API_KEY) {
    console.warn("API_KEY not set. Returning a mock answer for demo purposes.");
    // Simulate a network delay
    await new Promise(resolve => setTimeout(resolve, 750));
    return "As a demo AI, I can't connect to the live service without an API key. However, I can tell you this product is one of our best sellers!";
  }

  const prompt = `You are a helpful AI assistant for an e-commerce store. Answer the user's question based ONLY on the following product information. If the answer is not in the information, say you don't have that specific information. Keep your answers concise and friendly.

Product Information:
Name: ${product.name}
Price: $${product.price.toFixed(2)}
Description: ${product.description}
Keywords/Tags: ${product.keywords.join(', ')}

User's Question: ${question}`;

  try {
    const aiClient = getAiClient();
    const response = await aiClient.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text.trim();
  } catch (error) {
    console.error('Error answering question with Gemini:', error);
    throw new Error('Failed to get an answer.');
  }
}
