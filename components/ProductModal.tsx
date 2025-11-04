
import React, { useState, useRef, useEffect } from 'react';
import { Product, ChatMessage } from '../types';
import { answerProductQuestion } from '../services/geminiService';
import { XIcon, SendIcon } from './IconComponents';
import Spinner from './Spinner';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);
  
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading) return;

    const userMessage: ChatMessage = { sender: 'user', text: userInput };
    setChatHistory(prev => [...prev, userMessage]);
    setUserInput('');
    setIsLoading(true);

    try {
      const aiResponseText = await answerProductQuestion(product, userInput);
      const aiMessage: ChatMessage = { sender: 'ai', text: aiResponseText };
      setChatHistory(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = { sender: 'ai', text: 'Sorry, I encountered an error. Please try again.' };
      setChatHistory(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
        className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
        onClick={onClose}
        aria-modal="true"
        role="dialog"
    >
      <div 
        className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors z-10" aria-label="Close modal">
          <XIcon />
        </button>
        
        <div className="w-full md:w-1/2">
          <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
        </div>

        <div className="w-full md:w-1/2 p-6 flex flex-col">
          <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">{product.name}</h2>
          <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">${product.price.toFixed(2)}</p>
          <p className="text-gray-600 dark:text-gray-300 mb-6 flex-shrink-0">{product.description}</p>
          
          <div className="flex-grow flex flex-col border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-900/50">
            <div className="p-3 border-b border-gray-200 dark:border-gray-700 text-center font-semibold text-gray-700 dark:text-gray-200">Ask AI about this product</div>
            <div ref={chatContainerRef} className="flex-grow p-4 space-y-4 overflow-y-auto">
              {chatHistory.map((msg, index) => (
                <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${msg.sender === 'user' ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                 <div className="flex justify-start">
                    <div className="max-w-xs lg:max-w-md px-4 py-2 rounded-2xl bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none">
                       <Spinner />
                    </div>
                 </div>
              )}
            </div>
            <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-200 dark:border-gray-700 flex items-center bg-white dark:bg-gray-800">
              <input
                type="text"
                value={userInput}
                onChange={e => setUserInput(e.target.value)}
                placeholder="Type your question..."
                className="flex-grow bg-transparent focus:outline-none px-2 text-gray-800 dark:text-gray-200"
                disabled={isLoading}
              />
              <button type="submit" disabled={isLoading || !userInput.trim()} className="p-2 text-indigo-600 dark:text-indigo-400 disabled:text-gray-400 dark:disabled:text-gray-600 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors">
                <SendIcon />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
