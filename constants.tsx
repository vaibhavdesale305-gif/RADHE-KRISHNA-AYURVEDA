
import React from 'react';
import { Product, UserProfile } from './types';

export const COLORS = {
  primary: '#065f46', // Emerald 800
  secondary: '#10b981', // Emerald 500
  accent: '#fbbf24', // Amber 400
  background: '#f8fafc',
};

export const CONTACT_INFO = {
  // WhatsApp साठी '91' असणे गरजेचे आहे, पण कॉलसाठी आपण साधा नंबर वापरू शकतो
  phone: '919730593982', 
  displayPhone: '9730593982',
  email: 'radhekrishnaayurveda@gmail.com',
  address: 'Kasare, Taluka Sakri, District Dhule, Maharashtra, India',
};

export const CATEGORIES = [
  { name: 'Hair Care', icon: '💆' },
  { name: 'Skin Care', icon: '✨' },
  { name: 'Soaps', icon: '🧼' },
  { name: 'Dhoop & Agarbatti', icon: '🪔' },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Herbal Hair Growth Oil',
    category: 'Hair Care',
    description: 'A traditional blend of Bhringraj and Amla for thick, shiny hair.',
    ayurvedicBenefits: ['Reduces hair fall', 'Promotes new growth', 'Prevents premature graying'],
    ingredients: ['Bhringraj', 'Amla', 'Coconut Oil', 'Brahmi'],
    usage: 'Apply once a week and leave for 2 hours before washing.',
    price: 299,
    mrp: 450,
    discount: 34,
    images: ['https://picsum.photos/seed/hair/600/600', 'https://picsum.photos/seed/hair2/600/600'],
    stockStatus: 'In Stock',
    rating: 4.8,
    reviewsCount: 124,
    isEnabled: true,
  },
  {
    id: 'p2',
    name: 'Pure Neem & Aloe Soap',
    category: 'Soaps',
    description: 'Handmade cold-pressed soap for clear, glowing skin.',
    ayurvedicBenefits: ['Antibacterial properties', 'Hydrates skin', 'Treats acne'],
    ingredients: ['Neem oil', 'Aloe vera gel', 'Essential oils'],
    usage: 'Use daily during bath.',
    price: 85,
    mrp: 120,
    discount: 29,
    images: ['https://picsum.photos/seed/soap/600/600'],
    stockStatus: 'In Stock',
    rating: 4.5,
    reviewsCount: 89,
    isEnabled: true,
  },
  {
    id: 'p3',
    name: 'Sandalwood Face Pack',
    category: 'Skin Care',
    description: 'Natural Chandan pack for tan removal and cooling effect.',
    ayurvedicBenefits: ['Removes tan', 'Brightens complexion', 'Cooling effect'],
    ingredients: ['Sandalwood powder', 'Turmeric', 'Multani Mitti'],
    usage: 'Mix with rose water, apply for 15 mins.',
    price: 199,
    mrp: 250,
    discount: 20,
    images: ['https://picsum.photos/seed/skin/600/600'],
    stockStatus: 'Low Stock',
    rating: 4.9,
    reviewsCount: 56,
    isEnabled: true,
  },
  {
    id: 'p4',
    name: 'Premium Guggul Dhoop',
    category: 'Dhoop & Agarbatti',
    description: 'Purify your home with the divine fragrance of Guggul.',
    ayurvedicBenefits: ['Purifies air', 'Reduces stress', 'Spiritual atmosphere'],
    ingredients: ['Natural resin', 'Herbs', 'Honey'],
    usage: 'Light one stick daily for meditation.',
    price: 150,
    mrp: 180,
    discount: 16,
    images: ['https://picsum.photos/seed/dhoop/600/600'],
    stockStatus: 'In Stock',
    rating: 4.7,
    reviewsCount: 210,
    isEnabled: true,
  }
];

export const MOCK_USER: UserProfile = {
  id: 'u1',
  name: 'Radhe Krishna Admin',
  phone: '9730593982',
  email: 'radhekrishnaayurveda@gmail.com',
  role: 'admin',
  addresses: [
    {
      id: 'a1',
      name: 'Radhe Krishna Ayurveda',
      phone: '9730593982',
      addressLine: 'Kasare, Taluka Sakri',
      city: 'Dhule',
      state: 'Maharashtra',
      pincode: '424001',
      isDefault: true,
    }
  ],
};
