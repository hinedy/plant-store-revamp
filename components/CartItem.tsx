import Image from "next/image";
import AmountControls from "./AmountControls";
import { CartItem as CartItemProps } from "@/types/CartItem";
import styles from "@/styles/CartItem.module.scss";
import textStyles from "@/styles/text.module.scss";
import Link from "next/link";

function CartItem(props: CartItemProps) {
  return (
    <Link href={`/plant/${props.id}`} className={styles.container}>
      <div className={styles.image}>
        <Image
          src={props.img}
          alt="product-image"
          fill
          sizes="33vw"
          style={{ objectFit: "cover" }}
        ></Image>
      </div>
      <div className={styles.details}>
        <p className={textStyles.bold}>{props.name}</p>
        <p
          className={`${textStyles.text_sm} ${textStyles.italic} ${textStyles.text_gray}`}
        >
          {props.description}
        </p>
      </div>
      <div className={styles.controls}>
        <AmountControls {...props}></AmountControls>
        <p>$ {+props.price * +props.amount}</p>
      </div>
    </Link>
  );
}

export default CartItem;
