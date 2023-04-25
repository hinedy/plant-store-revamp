import CartItem from "./CartItem";
import { useContext, useEffect } from "react";
import { CartContext } from "@/contexts/CartContext";
import { CartItem as CartItemType } from "@/types/CartItem";
import styles from "@/styles/Cart.module.scss";

function Cart() {
  const { cartItems, total, updateTotal, emptyCart } = useContext(CartContext);

  useEffect(() => {
    updateTotal();
  }, [cartItems, updateTotal]);

  const totalCostDisplay = total.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <div className={styles.container}>
      {cartItems.length > 0 ? (
        <div className={styles.wrapper}>
          {cartItems.map((item: CartItemType, index: number) => {
            return <CartItem key={index} {...item} />;
          })}
        </div>
      ) : (
        <p className={styles.message}>Your Cart is Empty</p>
      )}

      <div className={styles.checkout}>
        <div className={styles.total}>
          <h3>Total</h3>
          <p> {totalCostDisplay}</p>
        </div>
        <button onClick={() => emptyCart()} className={styles.btn__primary}>
          Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;
