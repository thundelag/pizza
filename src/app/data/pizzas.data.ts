import { Pizza } from '../models/pizza.model';

export const PIZZAS: Pizza[] = [
  {
    id: 1,
    name: 'Margherita',
    description: 'Classic tomato sauce, mozzarella, and fresh basil',
    price: 9.99,
    image: 'https://via.placeholder.com/300x200?text=Margherita',
    ingredients: ['Tomato Sauce', 'Mozzarella', 'Fresh Basil', 'Olive Oil'],
    vegetarian: true,
    popular: true
  },
  {
    id: 2,
    name: 'Pepperoni',
    description: 'Tomato sauce, mozzarella, and spicy pepperoni',
    price: 12.99,
    image: 'https://via.placeholder.com/300x200?text=Pepperoni',
    ingredients: ['Tomato Sauce', 'Mozzarella', 'Pepperoni'],
    spicy: true,
    popular: true
  },
  {
    id: 3,
    name: 'Vegetarian',
    description: 'Tomato sauce, mozzarella, bell peppers, mushrooms, and olives',
    price: 11.99,
    image: 'https://via.placeholder.com/300x200?text=Vegetarian',
    ingredients: ['Tomato Sauce', 'Mozzarella', 'Bell Peppers', 'Mushrooms', 'Black Olives'],
    vegetarian: true
  },
  {
    id: 4,
    name: 'Quattro Formaggi',
    description: 'Four cheese pizza with mozzarella, gorgonzola, fontina, and parmesan',
    price: 13.99,
    image: 'https://via.placeholder.com/300x200?text=Quattro+Formaggi',
    ingredients: ['Mozzarella', 'Gorgonzola', 'Fontina', 'Parmesan', 'Cream'],
    vegetarian: true
  },
  {
    id: 5,
    name: 'Diavola',
    description: 'Spicy pizza with tomato sauce, mozzarella, spicy salami, and chili peppers',
    price: 12.99,
    image: 'https://via.placeholder.com/300x200?text=Diavola',
    ingredients: ['Tomato Sauce', 'Mozzarella', 'Spicy Salami', 'Chili Peppers'],
    spicy: true
  },
  {
    id: 6,
    name: 'Hawaiian',
    description: 'Tomato sauce, mozzarella, ham, and pineapple',
    price: 11.99,
    image: 'https://via.placeholder.com/300x200?text=Hawaiian',
    ingredients: ['Tomato Sauce', 'Mozzarella', 'Ham', 'Pineapple']
  },
  {
    id: 7,
    name: 'Capricciosa',
    description: 'Tomato sauce, mozzarella, ham, mushrooms, artichokes, and olives',
    price: 13.99,
    image: 'https://via.placeholder.com/300x200?text=Capricciosa',
    ingredients: ['Tomato Sauce', 'Mozzarella', 'Ham', 'Mushrooms', 'Artichokes', 'Olives']
  },
  {
    id: 8,
    name: 'Prosciutto e Funghi',
    description: 'Tomato sauce, mozzarella, ham, and mushrooms',
    price: 12.50,
    image: 'https://via.placeholder.com/300x200?text=Prosciutto+e+Funghi',
    ingredients: ['Tomato Sauce', 'Mozzarella', 'Ham', 'Mushrooms']
  },
  {
    id: 9,
    name: 'Seafood',
    description: 'Tomato sauce, mozzarella, mixed seafood, and garlic',
    price: 14.99,
    image: 'https://via.placeholder.com/300x200?text=Seafood',
    ingredients: ['Tomato Sauce', 'Mozzarella', 'Shrimp', 'Mussels', 'Squid', 'Garlic']
  }
];
