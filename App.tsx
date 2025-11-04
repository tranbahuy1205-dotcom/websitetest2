
import React, { useState, useEffect, useCallback } from 'react';
import { Product } from './types';
import Header from './components/Header';
import ProductGrid from './components/ProductGrid';
import ProductModal from './components/ProductModal';
import DescriptionGenerator from './components/DescriptionGenerator';
import { generateDescription } from './services/geminiService';
import { initialProducts } from './constants';

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isGeneratorVisible, setIsGeneratorVisible] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const toggleGeneratorVisibility = () => {
    setIsGeneratorVisible(prev => !prev);
  };

  const handleAddProduct = useCallback(async (name: string, keywords: string[], price: number) => {
    setIsGenerating(true);
    try {
      const description = await generateDescription(name, keywords);
      const newProduct: Product = {
        id: Date.now(),
        name,
        price,
        description,
        imageUrl: `https://picsum.photos/seed/${Date.now()}/600/600`,
        keywords,
      };
      setProducts(prevProducts => [newProduct, ...prevProducts]);
      setIsGeneratorVisible(false);
    } catch (error) {
      console.error("Failed to generate product description:", error);
      alert("Error generating product. Please check the console for details.");
    } finally {
      setIsGenerating(false);
    }
  }, []);

  useEffect(() => {
    if (selectedProduct) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    // Cleanup function
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [selectedProduct]);


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans transition-colors duration-300">
      <Header onToggleGenerator={toggleGeneratorVisibility} isGeneratorVisible={isGeneratorVisible} />
      
      <main className="container mx-auto px-4 py-8">
        <DescriptionGenerator 
          isVisible={isGeneratorVisible} 
          onAddProduct={handleAddProduct}
          isGenerating={isGenerating}
        />
        
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">Our Products</h2>
        <ProductGrid products={products} onSelectProduct={handleSelectProduct} />
      </main>

      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default App;
