import Image from "next/image";
import AmountControls from "@/components/AmountControls";
import Button from "@mui/material/Button";
import { useContext } from "react";
import { CartContext } from "@/contexts/CartContext";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Plant as PlantType } from "@/types/Plant";
import styles from "@/styles/PlantPage.module.scss";
import textStyles from "@/styles/text.module.scss";

interface PlantProps {
  plant: PlantType;
}
const Plant: NextPage<PlantProps> = ({ plant }) => {
  const { cartItems, addToCart } = useContext(CartContext);
  const inCart = cartItems.find((item) => plant.id === item.id);
  const {
    img,
    name,
    category,
    description,
    price,
    availability,
    size,
    light_requirements: lightRequirements,
    watering_requirements: wateringRequirements,
    soil_type: soilType,
  } = plant;
  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <Image
          src={img}
          alt={`${name} image`}
          placeholder="empty"
          priority
          fill
          sizes="(max-width: 768px) 100vw,
                    (max-width: 1200px) 50vw,
                    33vw"
          style={{ objectFit: "cover" }}
        ></Image>
      </div>
      <div className={styles.details}>
        <h1 className={`${textStyles.bold} ${textStyles.text_xxl}`}>{name}</h1>
        <p className={textStyles.text_gray}>{description}</p>
        <p>
          <span>Category:</span> {category}
        </p>
        <p>
          <span>Size:</span> {size}
        </p>
        <p>
          <span>Light Requirements:</span> {lightRequirements}
        </p>
        <p>
          <span>Watering Requirements:</span> {wateringRequirements}
        </p>
        <p>
          <span>Soil Type:</span> {soilType}
        </p>
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
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  if (!context.params) {
    return {
      props: {
        plant: null,
      },
    };
  }
  const res = await fetch(
    `http://localhost:3000/api/plants/${context.params.id}`
  );
  const plant = await res.json();
  return {
    props: {
      plant,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`http://localhost:3000/api/plants`);
  const plants = await res.json();
  const ids = plants.map((plant: PlantType) => plant.id);
  const paths = ids.map((id: number) => ({ params: { id: id.toString() } }));

  return {
    paths,
    fallback: false,
  };
};

export default Plant;
