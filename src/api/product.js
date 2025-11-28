export const fetchProducts = async({pageParam = 0}) => {
   try {
      const limit = 10;
    const res = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${pageParam}`)
    const data = await res.json();
    console.log(data)
    return data ;
   } catch (error) {
    console.log(error)
   }
    
}

export const getProductsCategory = async() => {
   try {
      const res = await fetch('https://dummyjson.com/products/category-list')
      const data = await res.json();
      console.log(data, "category list")
      return data;
   } catch (error) {
      
   }
}