import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Product, CartItem, ICartContext } from "../models/cart";

export const initalValues = {
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
};

const CartContext = createContext<ICartContext>(initalValues);
export const useCart = () => useContext(CartContext);

const CartProvider = ({ children }: PropsWithChildren<any>) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const lsData = localStorage.getItem("cart");
    return lsData ? JSON.parse(lsData) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    const clonedCart = [...cart];
    const existingItem = clonedCart.find(
      (item) => item.product.id === product.id
    );
    if (existingItem) {
      existingItem.quantity++;
      setCart(clonedCart);
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId: string) => {
    setCart((currentCart) => {
      const itemExists = currentCart.find(
        (item) => item.product.id === productId
      );
      if (itemExists && itemExists.quantity > 1) {
        return currentCart.map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        return currentCart.filter((item) => item.product.id !== productId);
      }
    });
  };
  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
