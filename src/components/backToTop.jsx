import React, { useEffect, useState } from 'react'

const BackToTop = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        if(window.scrollY > 300 ) {
            setVisible(true);
        } else {
            setVisible(false)
        }
      }

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll)

    }, [])
    

    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    }
  return (
   <>
   <button
   onClick={handleScrollToTop}
   className={`fixed bottom-5 right-10 p-4 bg-white/30 rounded-full hover:bg-gray-200 hover:shadow-md hover:backdrop-blur-md text-black/70 backdrop-blur-sm transition-opacity duration-500 ${visible ? "opacity-100" : "opacity-0 pointer-events-none"} `}
   >
   Back to Top
   </button>
   </>
  )
}

export default BackToTop