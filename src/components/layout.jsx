import React, { useState } from 'react'
import Header from './header'
import ShoppingListing from './listing';
import BackToTop from './backToTop';

const PageLayout = () => {
    const [cartItem, setCartItem] = useState(()=> {
      const saved = localStorage.getItem("cartItem");
      return saved ? JSON.parse(saved) : [];
    });

    // add to cart 

    function handleAddToCart(item) {
      setCartItem((prev) => {
         const updatedCartItem =  [...prev, item]
      localStorage.setItem("cartItem", JSON.stringify(updatedCartItem))
      return updatedCartItem;
      })
    }

      function handleDeleteCart (itemId) {
         setCartItem((prev) => {
          const updatedCartItem = prev.filter((item => item.id !== itemId));
          localStorage.setItem("cartItem", JSON.stringify(updatedCartItem))
          return updatedCartItem;
         })
      }

    
    console.log(cartItem,"cartItem")
  return (
    <>
    <div className='flex flex-col min-h-screen min-w-screen text-black dark:bg-primary-dark dark:text-white transition-colors duration-200 liner gap-6'>
        <Header cartItem={cartItem} setCartItem={setCartItem} handleDeleteCart={handleDeleteCart} />
        <BackToTop/>
        <ShoppingListing handleAddToCart={handleAddToCart} setCartItem={setCartItem}/>
    </div>
    </>
  )
}

export default PageLayout;