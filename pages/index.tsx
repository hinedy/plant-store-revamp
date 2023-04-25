import Cart from "@/components/Cart";
import Product from "@/components/Product";
import { CartContext } from "@/contexts/CartContext";
import { useContext } from "react";
import { Plant as PlantType } from "@/types/Plant";
import { GetServerSideProps, NextPage } from "next";
import styles from "@/styles/Home.module.scss";

interface HomeProps {
  plants: PlantType[];
}
const Home: NextPage<HomeProps> = ({ plants }) => {
  const { cartItems } = useContext(CartContext);

  return (
    <div className={styles.container}>
      <div className={styles.container__grid}>
        <div className={styles.container__grid__products}>
          {plants.map((plant, index) => (
            <Product key={index} plant={plant} cartItems={cartItems} />
          ))}
        </div>
        <div className={styles.container__grid__cart}>
          <div className={styles.cart}>
            <Cart></Cart>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch("http://localhost:3000/api/plants");
  const plants = await res.json();

  return {
    props: {
      plants,
    },
  };
};

export default Home;
