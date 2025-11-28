import { LogIn, ShoppingBag } from "lucide-react";
import React from "react";
import AppThemeProvider from "@/theme-provider";
import ThemeToggle from "./ui/theme-toggle";
import { Link } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import CartItemWrapper from "./cartItemWrapper";

const Header = ({cartItem, handleDeleteCart}) => {
  return (
    <header className="w-full bg-white shadow-md dark:bg-primary-dark">
      <div className="flex justify-between mx-2 p-2">
        <Link to="/">
          <h1 className="text-3xl text-black dark:text-white">Nabin Store</h1>
        </Link>
        <div className="flex justify-center items-center gap-6 text-black dark:text-white">
          <ThemeToggle />
          <LogIn width={20} height={20} strokeWidth={1} />
          <Sheet >
  <SheetTrigger asChild>

    <button className="relative">
    
  
    <ShoppingBag width={20} height={20} strokeWidth={1} />   { cartItem && cartItem.length > 0 ? <span className="absolute -top-3 -left-3 bg-black text-white rounded-full text-xs px-[4px]">{cartItem.length}</span> : null }
   
  </button> 

  </SheetTrigger>
  <SheetContent side="right" className="w-[400px] sm:w-[340px] bg-white/70 backdrop-blur-2xl dark:text-white dark:bg-neutral-800 overflow-y-auto overflow-x-hidden p-4">
    <SheetHeader>
      <SheetTitle className="text-center"><h2 className="text-2xl">Cart Items</h2></SheetTitle>
    </SheetHeader>
   <CartItemWrapper cartItem={cartItem} handleDeleteCart={handleDeleteCart}  />
  </SheetContent>
</Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
