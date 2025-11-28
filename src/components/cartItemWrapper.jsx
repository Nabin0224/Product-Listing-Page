import { Cross, Delete, DeleteIcon, LucideDelete } from "lucide-react";
import React from "react";

const CartItemWrapper = ({ cartItem, handleDeleteCart }) => {
  console.log(cartItem, "cartItem in wrapper");
  return (
    <>
      {cartItem.map((item) => (
        <div className="grid grid-cols-2 gap-2 max-w-full p-4">
          <div className="">
            <img
              src={item.images[0]}
              alt="Cart Image"
              className="object-cover h-32"
            />
          </div>
          <div className="relative details flex flex-col gap-2 items-start justify-center mx-2 w-full">
            <DeleteIcon
              color="black"
              strokeWidth={1}
              className="absolute top-0 right-2"
              onClick={() => handleDeleteCart(item.id)}
            />
            <span className="inline-block truncate text-sm">{item.title}</span>
            <span>Rs {item.price}</span>
          </div>
        </div>
      ))}
    </>
  );
};

export default CartItemWrapper;
