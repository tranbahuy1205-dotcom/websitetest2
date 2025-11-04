
import React, { useState } from 'react';
import Spinner from './Spinner';

interface DescriptionGeneratorProps {
  isVisible: boolean;
  onAddProduct: (name: string, keywords: string[], price: number) => Promise<void>;
  isGenerating: boolean;
}

const DescriptionGenerator: React.FC<DescriptionGeneratorProps> = ({ isVisible, onAddProduct, isGenerating }) => {
  const [name, setName] = useState('');
  const [keywords, setKeywords] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !keywords || !price) {
      alert("Please fill in all fields.");
      return;
    }
    const priceNumber = parseFloat(price);
    if (isNaN(priceNumber) || priceNumber <= 0) {
      alert("Please enter a valid price.");
      return;
    }
    
    const keywordsArray = keywords.split(',').map(kw => kw.trim()).filter(Boolean);
    onAddProduct(name, keywordsArray, priceNumber);
  };

  if (!isVisible) return null;

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-8 border border-indigo-200 dark:border-indigo-800">
      <h3 className="text-2xl font-bold mb-4 text-center text-gray-900 dark:text-white">AI Product Generator</h3>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-6">Enter product details and let AI write the description and add it to your store.</p>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto">
        <div>
          <label htmlFor="productName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Product Name</label>
          <input
            id="productName"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="e.g., Ergonomic Office Chair"
            className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <label htmlFor="keywords" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Keywords (comma-separated)</label>
          <input
            id="keywords"
            type="text"
            value={keywords}
            onChange={e => setKeywords(e.target.value)}
            placeholder="e.g., mesh back, lumbar support, adjustable"
            className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price ($)</label>
          <input
            id="price"
            type="number"
            step="0.01"
            min="0"
            value={price}
            onChange={e => setPrice(e.target.value)}
            placeholder="e.g., 299.99"
            className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isGenerating}
          className="w-full flex justify-center items-center py-3 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
        >
          {isGenerating ? <><Spinner /> Generating...</> : 'Generate & Add Product'}
        </button>
      </form>
    </div>
  );
};

export default DescriptionGenerator;
