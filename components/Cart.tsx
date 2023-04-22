import CartItem from "./CartItem";
import { useContext, useEffect } from "react";
import { CartContext } from "@/contexts/CartContext";
import { CartItem as CartItemType } from "@/types/CartItem";

function Cart() {
  const { cartItems, total, updateTotal, emptyCart } = useContext(CartContext);

  useEffect(() => {
    updateTotal();
  }, [cartItems, updateTotal]);

  return (
    <div className="flex flex-col  my-10 py-6  rounded-2xl bg-gray-50 ring-1 ring-inset ring-gray-900/5">
      {cartItems.length > 0 ? (
        <div className="max-h-80 overflow-y-scroll overflow-x-hidden  mb-4 ">
          {cartItems.map((item: CartItemType, index: number) => {
            return <CartItem key={index} {...item} />;
          })}
        </div>
      ) : (
        <p className="m-auto">Your Cart is Empty</p>
      )}

      <div className="px-6">
        <div className="flex justify-between p-4">
          <h3>Total</h3>
          <p>$ {total}</p>
        </div>
        <button
          onClick={() => emptyCart()}
          className="w-full bg-black text-white py-6"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;
