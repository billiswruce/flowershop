export interface Product {
  id: string;
  name: string;
  description?: string;
  images: string[];
  price: number; // Uppdaterad för att matcha API-svaret
}

export interface CartItem {
  product: Product;
  quantity: number;
}
export interface ICartContext {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
}
