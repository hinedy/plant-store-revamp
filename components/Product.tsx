import Image from "next/image";
import Link from "next/link";
import AmountControls from "./AmountControls";
import Button from "@mui/material/Button";
import { Plant as PlantType } from "@/types/Plant";
import { CartItem as CartItemType } from "@/types/CartItem";
import { useContext } from "react";
import { CartContext } from "@/contexts/CartContext";

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
    <Link
      href={`/plant/${plant.id}`}
      className="group flex flex-col justify-between border-2 border-red-700 border-solid"
    >
      <div className="relative aspect-w-1 aspect-h-1 w-full h-[250px] overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8 ">
        <Image
          src={plant.img}
          placeholder="empty"
          fill
          sizes="(max-width: 768px) 100vw,
                    (max-width: 1200px) 50vw,
                    33vw"
          style={{ objectFit: "cover" }}
          alt="plant preview image"
          className="h-full w-full object-cover object-center group-hover:opacity-75"
        ></Image>
      </div>
      <h3 className="mt-4 text-lg text-black-700">{plant.name}</h3>
      <p className="text-xs text-gray-600">{plant.description}</p>
      <div className="flex justify-between my-3">
        <div>
          <p className="mt-1 text-lg font-medium text-gray-900">
            {plant.price}
          </p>
          <p className="text-xs italic text-gray-600">{plant.availability}</p>
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
          >
            Add to Cart
          </Button>
        )}
      </div>
    </Link>
  );
}
