"use client";
import { useState } from "react"; // Import useState for dark mode toggle

import Hero from "@/components/Hero"; // Ensure Hero component is correctly imported
import Newsletter from "@/components/Newsletter";
import Product from "@/components/Products";
import Images from "@/components/Images";
import QuestionsLooksHere from "@/components/ContactForm";
import PopularProducts from "@/components/PopularProducts";
import AboutUs from "@/components/AboutUs";
import ProductList from "@/components/ProductListing"; // Ensure the correct import for the product listing
import Products from "./products/page";
import Bag from "@/components/Bag";

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false); // State for dark mode toggle

  return (
    <div className={isDarkMode ? "dark-mode" : "light-mode"}>
      {/* Dark Mode Toggle Button */}
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        style={{ position: "fixed", top: 10, right: 10, padding: "8px 12px", cursor: "pointer" }}
      >
        {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      {/* Page Content */}
      <Hero isDarkMode={isDarkMode} /> 
      <Products />
      <Newsletter />
      <Bag />
      <Images />
     
      
     <PopularProducts/>
    </div>
  );
}

// "use client";
// import { useState } from "react"; // Import useState for dark mode toggle

// import Bag from "@/components/Bag";
// import Hero from "@/components/Hero";
// import Newsletter from "@/components/Newsletter";
// import Product from "@/components/Productes";
// import Images from "@/components/Images";
// import QuestionsLooksHere from "@/components/ContactForm";
// import PopularProducts from "@/components/PopularProducts";
// import AboutUs from "@/components/AboutUs";
// import ProductList from "@/components/ProductListing";  // Ensure the correct import for the product listing

// export default function Home() {
//   const [isDarkMode, setIsDarkMode] = useState(false);

//   return (
//     <div className={isDarkMode ? "dark-mode" : "light-mode"}>
//       <button 
//         onClick={() => setIsDarkMode(!isDarkMode)} 
//         style={{ position: "fixed", top: 10, right: 10, padding: "8px 12px", cursor: "pointer" }}
//       >
//         {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
//       </button>

//       <Hero isDarkMode={isDarkMode} /> 
//       <Product />
//       <Newsletter />
//       <Bag />
//       <Images />
//       <QuestionsLooksHere />
//       <AboutUs />
//       <PopularProducts />
//     </div>
//   );
// }
