import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import React, { useEffect, useMemo, useState } from "react";
import { fetchProducts, getProductsCategory } from "../api/product";
import ShoppingProductTile from "./product-tile";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import LoadingSkeleton from "./ui/loading";
import { Spinner } from "./ui/spinner";

const ShoppingListing = ({
  cartItems,
  setCartItems,
  handleAddToCart,
  handleDeleteCart,
}) => {
  const [queryProduct, setQueryProduct] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log(queryProduct, "Query product");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getProductsCategory();
        setCategory(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, []);

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["products"],
    queryFn: ({ pageParam = 1 }) => fetchProducts({ pageParam }),

    getNextPageParam: (lastPage, allPages) => {
      const nextSkip = allPages.length * 10;
      if (nextSkip < lastPage.total) return nextSkip;
      return undefined;
    },
  });
  const products = data?.pages.flatMap((page) => page.products) || [];

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 100 >=
      document.documentElement.scrollHeight
    ) {
      if (hasNextPage && !isFetchingNextPage) fetchNextPage();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasNextPage, isFetchingNextPage]);

  const handleFilterChange = (value) => {
    setLoading(true);
    setSelectedFilter(value);

    setTimeout(() => {
      setLoading(false);
    }, 700);
  };
  const filteredProducts = React.useMemo(() => {
    if (!data) return [];

    let temp = [...products];

    if (queryProduct.trim()) {
      temp = temp.filter((item) =>
        item.title.toLowerCase().includes(queryProduct.toLowerCase())
      );
    }

    if (selectedFilter && selectedFilter != "all") {
      temp = temp.filter(
        (item) => item.category.toLowerCase() === selectedFilter.toLowerCase()
      );
    }

    if (sortBy === "price-low") {
      temp.sort((a, b) => a.price - b.price);
    }
    if (sortBy === "price-high") {
      temp.sort((a, b) => b.price - a.price);
    }
    return temp;
  }, [data, queryProduct, selectedFilter, sortBy]);
  console.log(selectedFilter, "filter");
  console.log(filteredProducts, "temp");
  console.log(sortBy, "sortby");
  console.log(category, "category all");

  return (
    <>
      <div className="flex w-full justify-center items-center mx-2 p-4 bg-white dark:text-white dark:bg-primary-dark ">
        <Select onValueChange={handleFilterChange}>
          <SelectTrigger
            className="
      px-0 py-1 w-fit bg-transparent 
      border-0 shadow-none 
      outline-none 
      focus:ring-0 focus:outline-none 
      focus-visible:ring-0 focus-visible:outline-none
      data-[placeholder]:text-black/50 dark:data-[placeholder]:text-white/50
    "
          >
            <SelectValue placeholder="Filters" />
          </SelectTrigger>

          <SelectContent
            className="
      border border-white/20 shadow-none
      rounded-none dark:bg-neutral-800 dark:text-white/50 bg-white/10 backdrop-blur-3xl
      "
          >
            <SelectItem value="all">All</SelectItem>
            {category &&
              category.slice(0, 5).map((item, i) => (
                <SelectItem key={i} value={item}>
                  {item}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>

        <div className="search w-[60%] mx-auto">
          <form action="" className="flex gap-1 justify-center items-center">
            <input
              type="text"
              value={queryProduct}
              onChange={(e) => setQueryProduct(e.target.value)}
              placeholder="What are you looking for?"
              className="text-center w-full border-0 border-b border-black/30 outline-none focus:ring-0 focus:border-black/80 text-primary-text bg-transparent dark:text-white/80 dark:border-b dark:border-white/35 dark:focus:border-white/70"
            />
          </form>
        </div>

        {/* Sort By  */}

        <Select onValueChange={setSortBy}>
          <SelectTrigger
            className="
      px-0 py-1 w-fit bg-transparent 
      border-0 shadow-none 
      outline-none 
      focus:ring-0 focus:outline-none 
      focus-visible:ring-0 focus-visible:outline-none
      data-[placeholder]:text-black/50 dark:data-[placeholder]:text-white/50
    "
          >
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>

          <SelectContent
            className="
      border border-black/10 shadow-none
      rounded-none dark:text-white dark:bg-neutal-800
    "
          >
            <SelectItem value="price-low">Price: Low-High</SelectItem>
            <SelectItem value="price-high">Price: High-Low</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {loading || isLoading ? (
        <LoadingSkeleton />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mx-2 p-4">
          <ShoppingProductTile
            products={filteredProducts}
            handleAddToCart={handleAddToCart}
          />
        </div>
      )}

      {isFetchingNextPage && (
        <div className="flex justify-center items-center">
          <Spinner className="size-6 text-black/30" />
        </div>
      )}
    </>
  );
};

export default ShoppingListing;
