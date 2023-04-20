import { Plant } from "@/types/Plant";
import{ useState, createContext, ReactNode } from "react";


interface CartItem extends Plant {
    amount: number;
  }


type ContextValue = {
  cartItems: CartItem[];
  addToCart: (newItem: CartItem) => void;
  removeFromCart: (id: number) => void;
  emptyCart: () => void;
};

const CartContext = createContext<ContextValue>(null!);

type ContextProviderProps = {
  children: ReactNode;
};

function ContextProvider({ children }: ContextProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  function addToCart(newItem: CartItem) {
    setCartItems((prevItems) => [...prevItems, newItem]);
  }

  function removeFromCart(id: number) {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }

  function emptyCart() {
    setCartItems([]);
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        emptyCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export { ContextProvider };