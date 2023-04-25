import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import { useContext } from "react";
import { CartContext } from "@/contexts/CartContext";

interface AmountControlsProps {
  id: number;
  amount: number;
}

export default function AmountControls({ id, amount }: AmountControlsProps) {
  const { increaseAmount, decreaseAmount, removeFromCart } =
    useContext(CartContext);

  const customStyles = {
    color: "darkgreen",
    borderColor: "darkgreen",
    "&:hover": {
      backgroundColor: "#F6FEFA",
      borderColor: "darkgreen",
    },
  };
  const handleControlsClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        "& > *": {
          m: 1,
        },
      }}
    >
      <ButtonGroup
        variant="outlined"
        size="small"
        aria-label="outlined button group"
      >
        <Button
          onClick={(e) => {
            handleControlsClick(e);
            if (amount > 1) {
              decreaseAmount(id);
            } else {
              removeFromCart(id);
            }
          }}
          sx={customStyles}
        >
          -
        </Button>
        <Button disableRipple onClick={handleControlsClick} sx={customStyles}>
          {amount}
        </Button>
        <Button
          onClick={(e) => {
            handleControlsClick(e);
            increaseAmount(id);
          }}
          sx={customStyles}
        >
          +
        </Button>
      </ButtonGroup>
    </Box>
  );
}
