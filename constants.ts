
import { Product } from './types';

export const initialProducts: Product[] = [
  {
    id: 1,
    name: 'Acoustic Guitar',
    price: 350.00,
    description: 'A beautifully crafted acoustic guitar with a rich, warm tone. Perfect for both beginners and experienced players. Made from solid spruce and mahogany for superior sound quality.',
    imageUrl: 'https://picsum.photos/seed/guitar/600/600',
    keywords: ['music', 'instrument', 'string', 'wood'],
  },
  {
    id: 2,
    name: 'Wireless Headphones',
    price: 199.99,
    description: 'Immerse yourself in high-fidelity audio with these noise-cancelling wireless headphones. Enjoy up to 30 hours of playtime on a single charge and crystal-clear calls.',
    imageUrl: 'https://picsum.photos/seed/headphones/600/600',
    keywords: ['audio', 'bluetooth', 'tech', 'gadget'],
  },
  {
    id: 3,
    name: 'Professional Camera',
    price: 1250.00,
    description: 'Capture stunning, high-resolution photos and 4K videos with this professional-grade DSLR camera. Features a 24MP sensor and advanced autofocus system.',
    imageUrl: 'https://picsum.photos/seed/camera/600/600',
    keywords: ['photography', 'DSLR', 'lens', 'electronics'],
  },
  {
    id: 4,
    name: 'Leather Backpack',
    price: 220.50,
    description: 'A stylish and durable backpack crafted from genuine leather. Features multiple compartments, including a padded laptop sleeve, making it perfect for work or travel.',
    imageUrl: 'https://picsum.photos/seed/backpack/600/600',
    keywords: ['fashion', 'bag', 'travel', 'leather'],
  },
  {
    id: 5,
    name: 'Smart Watch',
    price: 299.00,
    description: 'Stay connected and track your fitness goals with this sleek smartwatch. Monitor your heart rate, receive notifications, and customize your watch face.',
    imageUrl: 'https://picsum.photos/seed/watch/600/600',
    keywords: ['wearable', 'tech', 'fitness', 'smart'],
  },
  {
    id: 6,
    name: 'Espresso Machine',
    price: 475.00,
    description: 'Become your own barista with this semi-automatic espresso machine. Brew rich, flavorful espresso and create perfect lattes and cappuccinos at home.',
    imageUrl: 'https://picsum.photos/seed/espresso/600/600',
    keywords: ['coffee', 'kitchen', 'appliance', 'home'],
  },
];
