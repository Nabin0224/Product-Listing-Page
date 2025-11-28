import React, { useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { fetchProducts } from "../api/product";
import { useQuery } from "@tanstack/react-query";

const ShoppingProductTile = ({ products, handleAddToCart }) => {
  const [showCart, setShowCart] = useState(null);
  

  function handleHover(id, hoverStatus) {
    setShowCart(hoverStatus ? id : null);
  }

  return (
    <>
      {products &&
        products.map((product) => (
          <Card
            key={product.id}
            className="border-0 font-extralight text-sm 
             bg-white dark:bg-neutral-900 
             text-black dark:text-white"
          >
            <div
              className={`relative w-full h-72 bg-[#f2f2f2] dark:bg-neutral-800 
                  p-4 flex items-center justify-center`}
              onMouseEnter={() => handleHover(product.id, true)}
              onMouseLeave={() => handleHover(product.id, false)}
            >
              <img src={product.images[0]} className="h-48 object-contain" />

              <button
                className={`absolute -bottom-3 md:bottom-2 -right-2 p-4 bg-transparent font-extralight text-black/70 dark:text-white/50 md:opacity-0 md:translate-y-5 transition-all duration-300 ease-in-out ${
                  showCart === product.id ? "md:opacity-100 md:translate-y-0" : ""
                }`}

                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>

            <CardContent className="-mt-5 dark:text-white/70">
              <div className="title truncate">{product.title}</div>
              <div className="price">NRP {product.price}</div>
            </CardContent>
          </Card>
        ))}
    </>
  );
};

export default ShoppingProductTile;
