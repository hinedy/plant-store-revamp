import Image from "next/image";
import Link from "next/link";
import AmountControls from "./AmountControls";
import Button from "@mui/material/Button";
import { Plant as PlantType } from "@/types/Plant";
import { CartItem as CartItemType } from "@/types/CartItem";
import { useContext } from "react";
import { CartContext } from "@/contexts/CartContext";
import styles from "@/styles/Product.module.scss";
import textStyles from "@/styles/text.module.scss";

interface ProductProps {
  plant: PlantType;
  cartItems: CartItemType[];
}

export default function Product({ plant, cartItems }: ProductProps) {
  const inCart = cartItems.find((item) => plant.id === item.id);
  const { addToCart } = useContext(CartContext);

  const handleAddToCartClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <Link href={`/plant/${plant.id}`} className={styles.container}>
      <div className={styles.image}>
        <Image
          src={plant.img}
          placeholder="empty"
          fill
          sizes="(max-width: 768px) 100vw,
                    (max-width: 1200px) 50vw,
                    33vw"
          style={{ objectFit: "cover" }}
          alt="plant preview image"
        ></Image>
      </div>
      <div className={styles.details}>
        <div>
          <h3 className={textStyles.text_lg}>{plant.name}</h3>
          <p className={`${textStyles.text_xs} ${textStyles.text_gray}`}>
            {plant.description}
          </p>
        </div>
        <div className={styles.controls}>
          <div>
            <p className={textStyles.text_lg}>${plant.price}</p>
            <p
              className={`${textStyles.text_xs} ${textStyles.text_gray} ${textStyles.italic}`}
            >
              {plant.availability}
            </p>
          </div>
          {inCart && inCart.amount >= 1 ? (
            <AmountControls {...inCart}></AmountControls>
          ) : (
            <Button
              onClick={(e) => {
                handleAddToCartClick(e);
                addToCart({ ...plant, amount: 1 });
              }}
              variant="outlined"
              size="small"
              color="primary"
              sx={{
                color: "darkgreen",
                borderColor: "darkgreen",
                "&:hover": {
                  backgroundColor: "#F6FEFA",
                  borderColor: "darkgreen",
                },
              }}
            >
              Add to Cart
            </Button>
          )}
        </div>
      </div>
    </Link>
  );
}
