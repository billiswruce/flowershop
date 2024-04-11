import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Product, CartItem, ICartContext, IUser } from "../models/cart";

export const initialValues = {
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  user: { email: "" },
  setUser: () => {},
  clearCart: () => {},
};

const CartContext = createContext<ICartContext>(initialValues);
export const useCart = () => useContext(CartContext);

const CartProvider = ({ children }: PropsWithChildren<any>) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const lsUser = localStorage.getItem("user");
    const currentUser = lsUser ? JSON.parse(lsUser) : { email: "" };
    const lsCart = localStorage.getItem(
      currentUser.email ? `cart-${currentUser.email}` : "cart"
    );
    return lsCart ? JSON.parse(lsCart) : [];
  });

  const [user, setUser] = useState<IUser>({ email: "" });

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
    const lsCart = localStorage.getItem(
      user.email ? `cart-${user.email}` : "cart"
    );
    if (lsCart) {
      setCart(JSON.parse(lsCart));
    } else {
      setCart([]);
    }
  }, [user]);

  useEffect(() => {
    if (user.email) {
      localStorage.setItem(`cart-${user.email}`, JSON.stringify(cart));
    } else {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, user.email]);

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

  const clearCart = () => {
    localStorage.removeItem("cart");
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        user,
        setUser,
        clearCart,
      }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
