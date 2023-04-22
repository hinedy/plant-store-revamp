import { Plant } from "@/types/Plant";
import{ useState, createContext, ReactNode } from "react";
import { CartItem } from "@/types/CartItem";

type ContextValue = {
  cartItems: CartItem[];
  total: number;
  addToCart: (newItem: CartItem) => void;
  removeFromCart: (id: number) => void;
  increaseAmount : (id: number) => void;
  decreaseAmount : (id: number) => void;
  updateTotal: () => void
  emptyCart: () => void;

};

export const CartContext = createContext<ContextValue>(null!);

type ContextProviderProps = {
  children: ReactNode;
};

function CartContextProvider({ children }: ContextProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState<number>(0)

  function addToCart(newItem: CartItem) {
    setCartItems((prevItems) => [...prevItems, newItem]);
  }

  function removeFromCart(id: number) {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }

  function increaseAmount(id: number) {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, amount: item.amount + 1 } : item
      )
    );
  }

  function decreaseAmount(id: number) {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, amount: item.amount - 1 } : item
      )
    );
  }
  function updateTotal() {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.price * item.amount;
    });
    setTotal(total);
  }

  function emptyCart() {
    setCartItems([]);
    setTotal(0);
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        total,
        addToCart,
        removeFromCart,
        increaseAmount,
        decreaseAmount,
        updateTotal,
        emptyCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export { CartContextProvider };