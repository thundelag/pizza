export interface Pizza {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  ingredients: string[];
  spicy?: boolean;
  vegetarian?: boolean;
  popular?: boolean;
}
