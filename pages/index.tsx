import Cart from "@/components/Cart";
import Product from "@/components/Product";
import { CartContext } from "@/contexts/CartContext";
import { useContext } from "react";
import { Plant as PlantType } from "@/types/Plant";
import { GetServerSideProps, NextPage } from "next";

interface HomeProps {
  plants: PlantType[];
}
const Home: NextPage<HomeProps> = ({ plants }) => {
  const { cartItems } = useContext(CartContext);

  return (
    <div className="px-10 py-10 flex justify-center">
      <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-1 lg:grid-cols-2 lg:col-span-2 xl:grid-cols-3 xl:col-span-3 xl:gap-x-8">
          {plants.map((plant, index) => (
            <Product key={index} plant={plant} cartItems={cartItems} />
          ))}
        </div>

        <div className="col-span-1 relative">
          <div className="sticky right-2 top-12">
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
