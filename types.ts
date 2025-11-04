
export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  keywords: string[];
}

export interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
}
