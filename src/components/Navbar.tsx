

"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useCart } from "@/app/context/CartContext";
import { SignInButton, SignUpButton, UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";
interface CartItem {
  id: string;
  quantity: number;
}

export default function Navbar({ isDarkMode = false }: { isDarkMode?: boolean }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cart } = useCart() as unknown as { cart: CartItem[] };
  const totalItems = cart.reduce((total: number, item: CartItem) => total + item.quantity, 0);

  return (
    <nav className={`${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50"} shadow-lg`}>
      {/* Main Navbar Container */}
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img 
              src="/logo c.png" 
              alt="Amreli Woods Logo" 
              className="w-16 h-16 rounded-full border-2 border-amber-600"
            />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">
              Amreli Woods
            </h1>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex gap-8">
              <Link href="/" className="hover:text-amber-600 transition-colors duration-300 font-medium">
                Home
              </Link>
              <Link href="/AboutUs" className="hover:text-amber-600 transition-colors duration-300 font-medium">
                About
              </Link>
              <Link href="/Producte" className="hover:text-amber-600 transition-colors duration-300 font-medium">
                Products
              </Link>
              <Link href="/Contact" className="hover:text-amber-600 transition-colors duration-300 font-medium">
                Contact
              </Link>
            </div>

            <div className="flex items-center gap-6 ml-8">
              <SignedOut>
                <div className="flex gap-4">
                  <SignInButton mode="modal">
                    <motion.button
                      className="px-6 py-2 rounded-full bg-amber-600 text-white hover:bg-amber-700 transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                    >
                      Login
                    </motion.button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <motion.button
                      className="px-6 py-2 border-2 border-amber-600 text-amber-600 rounded-full hover:bg-amber-50 transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                    >
                      Register
                    </motion.button>
                  </SignUpButton>
                </div>
              </SignedOut>

              <SignedIn>
                <UserButton appearance={{
                  elements: {
                    userButtonBox: "w-10 h-10",
                    userButtonTrigger: "focus:shadow-none",
                    avatarBox: "w-10 h-10"
                  }
                }} />
              </SignedIn>

              <Link href="/cart" className="relative">
                <AiOutlineShoppingCart className="text-2xl hover:text-amber-600 transition-colors duration-300" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute w-full bg-white/95 backdrop-blur-sm z-50"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col gap-4">
                <Link href="/" className="py-2 hover:text-amber-600" onClick={() => setIsMobileMenuOpen(false)}>
                  Home
                </Link>
                <Link href="/AboutUs" className="py-2 hover:text-amber-600" onClick={() => setIsMobileMenuOpen(false)}>
                  About
                </Link>
                <Link href="/Producte" className="py-2 hover:text-amber-600" onClick={() => setIsMobileMenuOpen(false)}>
                  Products
                </Link>
                <Link href="/Contact" className="py-2 hover:text-amber-600" onClick={() => setIsMobileMenuOpen(false)}>
                  Contact
                </Link>

                <div className="pt-4 border-t border-gray-200">
                  <SignedOut>
                    <div className="flex flex-col gap-3">
                      <SignInButton mode="modal">
                        <motion.button
                          className="w-full py-2 rounded-lg bg-amber-600 text-white"
                          whileTap={{ scale: 0.98 }}
                        >
                          Login
                        </motion.button>
                      </SignInButton>
                      <SignUpButton mode="modal">
                        <motion.button
                          className="w-full py-2 rounded-lg border-2 border-amber-600 text-amber-600"
                          whileTap={{ scale: 0.98 }}
                        >
                          Register
                        </motion.button>
                      </SignUpButton>
                    </div>
                  </SignedOut>
                  <SignedIn>
                    <div className="flex justify-center">
                      <UserButton afterSignOutUrl="/" />
                    </div>
                  </SignedIn>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}









































































// "use client";
// import React, { useState } from "react";
// import { SignInButton, UserButton, SignedIn, SignedOut } from '@clerk/nextjs';
// import Link from "next/link";
// import { motion } from "framer-motion";
// import { FiMenu, FiX } from "react-icons/fi";
// import { AiOutlineShoppingCart } from "react-icons/ai";

// function Navbar() {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   return (
//     <div className="bg-gray-100 shadow-md">
//       {/* Top Navbar Section */}
//       <div className="flex justify-between items-center p-4">
//         {/* Logo Section */}
//         <div className="flex items-center gap-3">
//           <img src="/Logo Icon.png" alt="Logo" className="w-8 h-8" />
//           <h1 className="text-lg font-bold">Comforty</h1>
//         </div>

//         {/* Right Section */}
//         <div className="flex items-center gap-4">
//           {/* Clerk Sign In Button for Mobile */}
//           <SignedOut>
//             <SignInButton />
//           </SignedOut>

//           {/* Cart Icon */}
//           <Link href="/cart" className="text-2xl text-green-400 hover:text-green-500 transition-all duration-300">
//             <AiOutlineShoppingCart />
//           </Link>

//           {/* Mobile Menu Toggle */}
//           <button className="text-2xl md:hidden" onClick={() => setIsMobileMenuOpen((prev) => !prev)} aria-label="Toggle Menu">
//             {isMobileMenuOpen ? <FiX /> : <FiMenu />}
//           </button>

//           {/* Clerk UserButton for Desktop */}
//           <SignedIn>
//             <UserButton />
//           </SignedIn>
//         </div>
//       </div>

//       {/* Navigation Links */}
//       <div className={`${isMobileMenuOpen ? "block" : "hidden"} md:flex flex-col md:flex-row justify-between items-center py-4 px-4 bg-gray-200`}>
//         <div className="flex flex-col md:flex-row md:gap-8 w-full">
//           <Link href="/" className="py-2 text-gray-700 hover:text-blue-500 transition-all duration-300">Home</Link>
//           <Link href="/AboutUs" className="py-2 text-gray-700 hover:text-blue-500 transition-all duration-300">About</Link>
//           <Link href="/Producte" className="py-2 text-gray-700 hover:text-blue-500 transition-all duration-300">Product</Link>
//           <Link href="/Contact" className="py-2 text-gray-700 hover:text-blue-500 transition-all duration-300">Contact</Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Navbar;




























// "use client";
// import React, { useState } from "react";
// import { SignInButton, UserButton, SignedIn, SignedOut } from '@clerk/nextjs';
// import Link from "next/link";
// import { motion } from "framer-motion";
// import { FiMenu, FiX } from "react-icons/fi";
// import { AiOutlineShoppingCart } from "react-icons/ai";

// function Navbar() {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   return (
//     <div className="bg-gray-100 shadow-md">
//       {/* Top Navbar Section */}
//       <div className="flex justify-between items-center p-4">
//         {/* Logo Section */}
//         <div className="flex items-center gap-3">
//           <img src="/Logo Icon.png" alt="Logo" className="w-8 h-8" />
//           <h1 className="text-lg font-bold">Comforty</h1>
//         </div>

//         {/* Right Section */}
//         <div className="flex items-center gap-4">
//           {/* Cart Icon */}
//           <Link href="/cart" className="text-2xl text-green-400 hover:text-green-500 transition-all duration-300 md:hidden">
//             <AiOutlineShoppingCart />
//           </Link>

//           {/* Mobile Menu Toggle */}
//           <button className="text-2xl md:hidden" onClick={() => setIsMobileMenuOpen((prev) => !prev)} aria-label="Toggle Menu">
//             {isMobileMenuOpen ? <FiX /> : <FiMenu />}
//           </button>

//           {/* Clerk Sign In Button for Mobile */}
//           <SignedOut>
//             <SignInButton />
//           </SignedOut>

//           {/* Clerk UserButton for Desktop */}
//           <SignedIn>
//             <UserButton />
//           </SignedIn>
//         </div>
//       </div>

//       {/* Navigation Links */}
//       <div className={`${isMobileMenuOpen ? "block" : "hidden"} md:flex flex-col md:flex-row justify-between items-center py-4 px-4 bg-gray-200`}>
//         <div className="flex flex-col md:flex-row md:gap-8 w-full">
//           <Link href="/" className="py-2 text-gray-700 hover:text-blue-500 transition-all duration-300">Home</Link>
//           <Link href="/AboutUs" className="py-2 text-gray-700 hover:text-blue-500 transition-all duration-300">About</Link>
//           <Link href="/Producte" className="py-2 text-gray-700 hover:text-blue-500 transition-all duration-300">Product</Link>
//           <Link href="/Contact" className="py-2 text-gray-700 hover:text-blue-500 transition-all duration-300">Contact</Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Navbar;
   


//yyy









// "use client";

// import React, { useState } from "react";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import { FiMenu, FiX } from "react-icons/fi";
// import { AiOutlineShoppingCart } from "react-icons/ai";

// // Login Page Modal Component
// const LoginPage = ({ onClose }: { onClose: () => void }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, scale: 0.8 }}
//       animate={{ opacity: 1, scale: 1 }}
//       exit={{ opacity: 0, scale: 0.8 }}
//       transition={{ duration: 0.5 }}
//       className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 mx-auto relative"
//     >
//       <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome Back</h2>
//       <p className="text-gray-600 mb-6">Please enter your details to log in.</p>
//       <form className="space-y-4">
//         <input
//           type="email"
//           placeholder="Email address"
//           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
//         />
//         <div className="flex justify-between items-center">
//           <label className="flex items-center">
//             <input type="checkbox" className="mr-2" />
//             <span className="text-gray-600">Remember me</span>
//           </label>
//           <button type="button" className="text-teal-500 hover:underline">
//             Forgot password?
//           </button>
//         </div>
//         <button
//           type="submit"
//           className="w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 transition-all"
//         >
//           Sign In
//         </button>
//       </form>
//       <button
//         onClick={onClose}
//         className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 font-bold text-xl"
//       >
//         ✕
//       </button>
//     </motion.div>
//   );
// };

// function Navbar() {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

//   return (
//     <div className="bg-gray-100 shadow-md">
//       {/* Top Navbar Section */}
//       <div className="flex justify-between items-center p-4">
//         {/* Logo Section */}
//         <div className="flex items-center gap-3">
//           <img src="/Logo Icon.png" alt="Logo" className="w-8 h-8" />
//           <h1 className="text-lg font-bold">Comforty</h1>
//         </div>

//         {/* Right Section */}
//         <div className="flex items-center gap-4">
//           {/* Login Button for Mobile */}
//           <button
//             onClick={() => setIsLoginModalOpen(true)}
//             className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-all duration-300 md:hidden"
//           >
//             Login
//           </button>

//           {/* Cart Icon for Mobile */}
//           <Link
//             href="/cart"
//             className="text-2xl text-green-400 hover:text-green-500 transition-all duration-300 md:hidden"
//           >
//             <AiOutlineShoppingCart />
//           </Link>

//           {/* Mobile Menu Toggle */}
//           <button
//             className="text-2xl md:hidden"
//             onClick={() => setIsMobileMenuOpen((prev) => !prev)}
//             aria-label="Toggle Menu"
//           >
//             {isMobileMenuOpen ? <FiX /> : <FiMenu />}
//           </button>
//         </div>

//         {/* Right Section for Desktop */}
//         <div className="hidden md:flex items-center gap-4">
//           <button
//             onClick={() => setIsLoginModalOpen(true)}
//             className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-all duration-300"
//           >
//             Login
//           </button>

//           {/* Cart Link for Desktop */}
//           <Link href="/cart" className="text-2xl text-green-400 hover:text-green-500 transition-all duration-300">
//             <AiOutlineShoppingCart />
//           </Link>
//         </div>
//       </div>

//       {/* Navigation Links */}
//       <div
//         className={`${
//           isMobileMenuOpen ? "block" : "hidden"
//         } md:flex flex-col md:flex-row justify-between items-center py-4 px-4 bg-gray-200`}
//       >
//         <div className="flex flex-col md:flex-row md:gap-8 w-full">
//           <Link
//             href="/"
//             className="py-2 text-gray-700 hover:text-blue-500 transition-all duration-300"
//           >
//             Home
//           </Link>
//           <Link
//             href="/AboutUs"
//             className="py-2 text-gray-700 hover:text-blue-500 transition-all duration-300"
//           >
//             About
//           </Link>
//           <Link
//             href="/Producte"
//             className="py-2 text-gray-700 hover:text-blue-500 transition-all duration-300"
//           >
//             Product
//           </Link>
//           <Link
//             href="/Contact"
//             className="py-2 text-gray-700 hover:text-blue-500 transition-all duration-300"
//           >
//             Contact
//           </Link>

//           {/* Cart Link for Mobile (Inside Navigation Menu) */}
//           <Link
//             href="/cart"
//             className="text-2xl text-green-600 hover:text-green-900 transition-all duration-300 md:hidden flex justify-end mt-2"
//           >
//             <AiOutlineShoppingCart />
//           </Link>
//         </div>
//       </div>

//       {/* Login Modal */}
//       {isLoginModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <LoginPage onClose={() => setIsLoginModalOpen(false)} />
//         </div>
//       )}
//     </div>
//   );
// }

// export default Navbar;




















// hhhhhhhhhhhhhhhh






















// "use client";
// import React, { useState } from "react";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import { FiMenu, FiX } from "react-icons/fi";
// import { AiOutlineShoppingCart } from "react-icons/ai";
// import { useCart } from "@/app/context/CartContext";
// import {
//   SignInButton,
//   SignUpButton,
//   UserButton,
//   SignedIn,
//   SignedOut,
// } from "@clerk/nextjs";

// interface CartItem {
//   id: string;
//   quantity: number;
//   // Add other necessary item properties here
// }

// export default function Navbar() {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const { cart } = useCart() as unknown as { cart: CartItem[] };

//   const totalItems = cart.reduce((total: number, item: CartItem) => total + item.quantity, 0);

//   return (
//     <div className="bg-gray-100 shadow-md">
//       {/* Top Navbar Section */}
//       <div className="flex justify-between items-center p-4">
//         {/* Logo Section */}
//         <div className="flex items-center gap-3">
//           <img
//             src="/logo c.png"
//             alt="Company Logo"
//             className="w-16 h-16"
//             loading="lazy"
//           />
//           <h1 className="text-lg font-bold">Amreli Woods</h1>
//         </div>

//         {/* Right Section */}
//         <div className="flex items-center gap-4">
//           {/* Mobile Auth Buttons */}
//           <SignedOut>
//             <div className="md:hidden flex gap-2">
//               <SignInButton mode="modal">
//                 <motion.button
//                   className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-all duration-300"
//                   whileHover={{ scale: 1.05 }}
//                   aria-label="Login"
//                 >
//                   Login
//                 </motion.button>
//               </SignInButton>
//             </div>
//           </SignedOut>

//           {/* Cart Icon for Mobile */}
//           <Link
//             href="/cart"
//             className="text-2xl text-green-400 hover:text-green-500 transition-all duration-300 md:hidden relative"
//             aria-label="Shopping Cart"
//           >
//             <AiOutlineShoppingCart />
//             {totalItems > 0 && (
//               <span className="absolute -top-2 -right-2 bg-teal-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
//                 {totalItems}
//               </span>
//             )}
//           </Link>

//           {/* Mobile Menu Toggle */}
//           <button
//             className="text-2xl md:hidden"
//             onClick={() => setIsMobileMenuOpen((prev) => !prev)}
//             aria-label={isMobileMenuOpen ? "Close Menu" : "Open Menu"}
//           >
//             {isMobileMenuOpen ? <FiX /> : <FiMenu />}
//           </button>
//         </div>

//         {/* Desktop Right Section */}
//         <div className="hidden md:flex items-center gap-4">
//           <SignedOut>
//             <div className="flex gap-2">
//               <SignInButton mode="modal">
//                 <motion.button
//                   className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-all duration-300"
//                   whileHover={{ scale: 1.05 }}
//                   aria-label="Login"
//                 >
//                   Login
//                 </motion.button>
//               </SignInButton>
//               <SignUpButton mode="modal">
//                 <motion.button
//                   className="px-4 py-2 border border-teal-500 text-teal-500 rounded-lg hover:bg-teal-50 transition-all duration-300"
//                   whileHover={{
//                     scale: 1.05,
//                     backgroundColor: "#f0f8ff"
//                   }}
//                   aria-label="Register"
//                 >
//                   Register
//                 </motion.button>
//               </SignUpButton>
//             </div>
//           </SignedOut>

//           <SignedIn>
//             <UserButton
//               afterSignOutUrl="/"
//               appearance={{
//                 elements: {
//                   userButtonTrigger: "focus:shadow-none",
//                 },
//               }}
//             />
//           </SignedIn>

//           {/* Cart Link for Desktop */}
//           <Link
//             href="/cart"
//             className="text-2xl text-green-400 hover:text-green-500 transition-all duration-300 relative"
//             aria-label="Shopping Cart"
//           >
//             <AiOutlineShoppingCart />
//             {totalItems > 0 && (
//               <span className="absolute -top-2 -right-2 bg-teal-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
//                 {totalItems}
//               </span>
//             )}
//           </Link>
//         </div>
//       </div>

//       {/* Mobile Navigation Links */}
//       <div
//         className={`${
//           isMobileMenuOpen ? "block" : "hidden"
//         } md:flex flex-col md:flex-row justify-between items-center py-4 px-4 bg-gray-200`}
//       >
//         <div className="flex flex-col md:flex-row md:gap-8 w-full">
//           <Link
//             href="/"
//             className="py-2 text-gray-700 hover:text-blue-500 transition-all duration-300"
//             onClick={() => setIsMobileMenuOpen(false)}
//           >
//             Home
//           </Link>
//           <Link
//             href="/AboutUs"
//             className="py-2 text-gray-700 hover:text-blue-500 transition-all duration-300"
//             onClick={() => setIsMobileMenuOpen(false)}
//           >
//             About
//           </Link>
//           <Link
//             href="/Producte"
//             className="py-2 text-gray-700 hover:text-blue-500 transition-all duration-300"
//             onClick={() => setIsMobileMenuOpen(false)}
//           >
//             Products
//           </Link>
//           <Link
//             href="/Contact"
//             className="py-2 text-gray-700 hover:text-blue-500 transition-all duration-300"
//             onClick={() => setIsMobileMenuOpen(false)}
//           >
//             Contact
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }
















// "use client";
// import React, { useEffect, useState, useRef, Dispatch, SetStateAction } from "react";
// import { Product } from "@/app/types/product";
// import { client } from "@/sanity/lib/client";
// import { allProduct } from "@/sanity/lib/qury";
// import { urlFor } from "@/sanity/lib/image";
// import Link from "next/link";
// import Image from "next/image";
// import { motion, AnimatePresence } from "framer-motion";
// import { ShoppingCart, ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
// import { useCart } from "@/app/context/CartContext";

// function Hero({ 
//   isDarkMode, 
//   setIsDarkMode 
// }: { 
//   isDarkMode: boolean; 
//   setIsDarkMode: Dispatch<SetStateAction<boolean>>; 
// }) {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortOption, setSortOption] = useState("title");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);
//   const [heroImageIndex, setHeroImageIndex] = useState(0);
//   const { addToCart: contextAddToCart } = useCart();
//   const productGridRef = useRef<HTMLDivElement>(null);

//   const itemsPerPage = 8;

//   useEffect(() => {
//     if (productGridRef.current) {
//       productGridRef.current.scrollIntoView({
//         behavior: "smooth",
//         block: "start",
//       });
//     }
//   }, [currentPage]);

//   useEffect(() => {
//     if (products.length > 0) {
//       const interval = setInterval(() => {
//         setHeroImageIndex((prev) => (prev + 1) % products.length);
//       }, 5000);
//       return () => clearInterval(interval);
//     }
//   }, [products]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const fetchedProducts: Product[] = await client.fetch(allProduct);
//         setProducts(fetchedProducts);
//         setLoading(false);
//       } catch (error) {
//         console.error("Failed to fetch products:", error);
//         setLoading(false);
//       }
//     };
//     fetchProducts();
//   }, []);

//   const handleAddToCart = (product: Product) => {
//     contextAddToCart(product);
//     setSuccessMessage(`${product.title} added to cart!`);
//     setTimeout(() => setSuccessMessage(null), 3000);
//   };

//   const filteredProducts = products.filter(
//     (product) =>
//       (selectedCategory === "All" || product._id === selectedCategory) &&
//       product.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const sortedProducts = [...filteredProducts].sort((a, b) => {
//     if (sortOption === "price") return a.price - b.price;
//     if (sortOption === "title") return a.title.localeCompare(b.title);
//     return 0;
//   });

//   const paginatedProducts = sortedProducts.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

//   return (
//     <div className={isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-black"}>
//       {/* Dark Mode Toggle Button */}
//       <button
//         onClick={() => setIsDarkMode(!isDarkMode)}
//         style={{ position: "fixed", top: 10, right: 10, padding: "8px 12px", cursor: "pointer" }}
//       >
//         {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
//       </button>

//       {/* Amreli Woods Hero Section */}
//       <section className="container mx-auto px-6 py-16">
//         <div className="flex flex-col md:flex-row items-center justify-between gap-12">
//           <motion.div 
//             className="md:w-1/2 space-y-8"
//             initial={{ opacity: 0, x: -50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8 }}
//           >
//             <motion.p
//               className="text-4xl font-bold text-amber-600"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.4 }}
//             >
//               Amreli Woods
//             </motion.p>
//             <h1 className="text-5xl md:text-6xl font-bold leading-tight">
//               Crafting Excellence <br/>
//               <span className="bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">
//                 In Wood & Design
//               </span>
//             </h1>
//             <motion.div
//               initial={{ scale: 0 }}
//               animate={{ scale: 1 }}
//               transition={{ type: "spring", stiffness: 200 }}
//             >
//               <Link href="/Products">
//                 <motion.button
//                   whileHover={{
//                     scale: 1.1,
//                     backgroundColor: [
//                       "#b45309",
//                       "#4f46e5",
//                       "#059669",
//                       "#dc2626"
//                     ],
//                     transition: { 
//                       duration: 2,
//                       repeat: Infinity,
//                       repeatType: "reverse"
//                     }
//                   }}
//                   className="group relative px-8 py-4 rounded-full text-lg font-semibold shadow-lg transition-all"
//                 >
//                   <span className="text-white">Explore Collection</span>
//                   <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-600 to-amber-800 opacity-20 group-hover:opacity-40 transition-opacity duration-300 -z-10"/>
//                 </motion.button>
//               </Link>
//             </motion.div>
//           </motion.div>

//           <div className="md:w-1/2 relative h-[500px] w-full">
//             <AnimatePresence mode="wait">
//               {products.length > 0 && (
//                 <motion.div
//                   key={heroImageIndex}
//                   initial={{ opacity: 0, scale: 0.9 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   exit={{ opacity: 0, scale: 0.9 }}
//                   transition={{ duration: 0.8, ease: "easeInOut" }}
//                   className="absolute inset-0"
//                 >
//                   <Image
//                     src={urlFor(products[heroImageIndex]?.image).url()}
//                     alt={products[heroImageIndex]?.title || "Amreli Woods Collection"}
//                     fill
//                     className="object-contain rounded-2xl shadow-2xl border-4 border-amber-100"
//                     priority
//                   />
//                   <div className="absolute bottom-4 left-4 bg-amber-600 text-white px-4 py-2 rounded-lg shadow-md">
//                     <span className="font-bold">Amreli Woods</span> Premium Collection
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>
//         </div>
//       </section>

//       {/* Product Grid */}
//       <div ref={productGridRef} className="container mx-auto py-12">
//         {loading ? (
//           <div className="flex justify-center py-24">
//             <Loader2 className="w-12 h-12 animate-spin text-amber-600"/>
//           </div>
//         ) : (
//           <motion.div 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//           >
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//               {paginatedProducts.map((product, index) => (
//                 <motion.div
//                   key={product._id}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: index * 0.1 }}
//                   className={`group relative rounded-xl overflow-hidden shadow-lg ${
//                     isDarkMode ? "bg-gray-800" : "bg-white"
//                   }`}
//                 >
//                   <Link href={`/product/${product.slug}`} className="block">
//                     <div className="relative h-80">
//                       {product.image ? (
//                         <Image
//                           src={urlFor(product.image).url()}
//                           alt={product.title}
//                           fill
//                           className="object-cover transition-transform duration-300 group-hover:scale-105"
//                         />
//                       ) : (
//                         <div className="w-full h-full bg-gray-100 flex items-center justify-center">
//                           <span className="text-gray-500">Image Coming Soon</span>
//                         </div>
//                       )}
//                     </div>
//                     <div className="p-6">
//                       <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
//                       <p className="text-2xl font-bold text-amber-600">
//                         ${product.price.toFixed(2)}
//                       </p>
//                     </div>
//                   </Link>

//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={() => handleAddToCart(product)}
//                     className={`absolute top-4 right-4 p-3 rounded-full shadow-lg ${
//                       isDarkMode 
//                         ? "bg-amber-600 hover:bg-amber-500 text-white"
//                         : "bg-white/90 hover:bg-white text-gray-900"
//                     }`}
//                   >
//                     <ShoppingCart className="w-6 h-6"/>
//                   </motion.button>
//                 </motion.div>
//               ))}
//             </div>

//             <div className="mt-12 flex justify-center gap-4">
//               <button
//                 onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                 disabled={currentPage === 1}
//                 className={`p-2 rounded-lg ${
//                   isDarkMode 
//                     ? "bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800" 
//                     : "bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100"
//                 }`}
//               >
//                 <ArrowLeft className="w-6 h-6"/>
//               </button>
              
//               <div className="flex items-center gap-2">
//                 {Array.from({ length: totalPages }).map((_, idx) => (
//                   <button
//                     key={idx}
//                     onClick={() => setCurrentPage(idx + 1)}
//                     className={`w-10 h-10 rounded-full flex items-center justify-center ${
//                       currentPage === idx + 1
//                         ? "bg-amber-600 text-white"
//                         : isDarkMode
//                         ? "bg-gray-700 hover:bg-gray-600"
//                         : "bg-gray-200 hover:bg-gray-300"
//                     }`}
//                   >
//                     {idx + 1}
//                   </button>
//                 ))}
//               </div>

//               <button
//                 onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//                 disabled={currentPage === totalPages}
//                 className={`p-2 rounded-lg ${
//                   isDarkMode 
//                     ? "bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800" 
//                     : "bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100"
//                 }`}
//               >
//                 <ArrowRight className="w-6 h-6"/>
//               </button>
//             </div>
//           </motion.div>
//         )}
//       </div>

//       <AnimatePresence>
//         {successMessage && (
//           <motion.div
//             className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 px-6 py-3 bg-amber-600 text-white rounded-full shadow-xl"
//             initial={{ opacity: 0, y: 100 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: 100 }}
//           >
//             <ShoppingCart className="w-5 h-5"/>
//             <span className="font-semibold">Amreli Woods:</span> {successMessage}
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// export default Hero;











// "use client";
// import React, { useState } from "react";
// import Link from "next/link";
// import { FiMenu, FiX } from "react-icons/fi";
// import { AiOutlineShoppingCart } from "react-icons/ai";
// import { useCart } from "@/app/context/CartContext";
// import { SignInButton, SignUpButton, UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
// import { motion, AnimatePresence } from "framer-motion";
// interface CartItem {
//   id: string;
//   quantity: number;
// }

// export default function Navbar({ isDarkMode = false }: { isDarkMode?: boolean }) {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const { cart } = useCart() as unknown as { cart: CartItem[] };
//   const totalItems = cart.reduce((total: number, item: CartItem) => total + item.quantity, 0);

//   return (
//     <nav className={`${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50"} shadow-lg`}>
//       {/* Main Navbar Container */}
//       <div className="container mx-auto px-4">
//         <div className="flex justify-between items-center h-20">
//           {/* Logo Section */}
//           <motion.div
//             className="flex items-center gap-3"
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             <img 
//               src="/logo c.png" 
//               alt="Amreli Woods Logo" 
//               className="w-16 h-16 rounded-full border-2 border-amber-600"
//             />
//             <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">
//               Amreli Woods
//             </h1>
//           </motion.div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center gap-8">
//             <div className="flex gap-8">
//               <Link href="/" className="hover:text-amber-600 transition-colors duration-300 font-medium">
//                 Home
//               </Link>
//               <Link href="/AboutUs" className="hover:text-amber-600 transition-colors duration-300 font-medium">
//                 About
//               </Link>
//               <Link href="/Producte" className="hover:text-amber-600 transition-colors duration-300 font-medium">
//                 Products
//               </Link>
//               <Link href="/Contact" className="hover:text-amber-600 transition-colors duration-300 font-medium">
//                 Contact
//               </Link>
//             </div>

//             <div className="flex items-center gap-6 ml-8">
//               <SignedOut>
//                 <div className="flex gap-4">
//                   <SignInButton mode="modal">
//                     <motion.button
//                       className="px-6 py-2 rounded-full bg-amber-600 text-white hover:bg-amber-700 transition-all duration-300"
//                       whileHover={{ scale: 1.05 }}
//                     >
//                       Login
//                     </motion.button>
//                   </SignInButton>
//                   <SignUpButton mode="modal">
//                     <motion.button
//                       className="px-6 py-2 border-2 border-amber-600 text-amber-600 rounded-full hover:bg-amber-50 transition-all duration-300"
//                       whileHover={{ scale: 1.05 }}
//                     >
//                       Register
//                     </motion.button>
//                   </SignUpButton>
//                 </div>
//               </SignedOut>

//               <SignedIn>
//                 <UserButton appearance={{
//                   elements: {
//                     userButtonBox: "w-10 h-10",
//                     userButtonTrigger: "focus:shadow-none",
//                     avatarBox: "w-10 h-10"
//                   }
//                 }} />
//               </SignedIn>

//               <Link href="/cart" className="relative">
//                 <AiOutlineShoppingCart className="text-2xl hover:text-amber-600 transition-colors duration-300" />
//                 {totalItems > 0 && (
//                   <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
//                     {totalItems}
//                   </span>
//                 )}
//               </Link>
//             </div>
//           </div>

//           {/* Mobile Menu Toggle */}
//           <button
//             className="md:hidden text-2xl"
//             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//             aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
//           >
//             {isMobileMenuOpen ? <FiX /> : <FiMenu />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       <AnimatePresence>
//         {isMobileMenuOpen && (
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             className="md:hidden absolute w-full bg-white/95 backdrop-blur-sm z-50"
//           >
//             <div className="container mx-auto px-4 py-4">
//               <div className="flex flex-col gap-4">
//                 <Link href="/" className="py-2 hover:text-amber-600" onClick={() => setIsMobileMenuOpen(false)}>
//                   Home
//                 </Link>
//                 <Link href="/AboutUs" className="py-2 hover:text-amber-600" onClick={() => setIsMobileMenuOpen(false)}>
//                   About
//                 </Link>
//                 <Link href="/Producte" className="py-2 hover:text-amber-600" onClick={() => setIsMobileMenuOpen(false)}>
//                   Products
//                 </Link>
//                 <Link href="/Contact" className="py-2 hover:text-amber-600" onClick={() => setIsMobileMenuOpen(false)}>
//                   Contact
//                 </Link>

//                 <div className="pt-4 border-t border-gray-200">
//                   <SignedOut>
//                     <div className="flex flex-col gap-3">
//                       <SignInButton mode="modal">
//                         <motion.button
//                           className="w-full py-2 rounded-lg bg-amber-600 text-white"
//                           whileTap={{ scale: 0.98 }}
//                         >
//                           Login
//                         </motion.button>
//                       </SignInButton>
//                       <SignUpButton mode="modal">
//                         <motion.button
//                           className="w-full py-2 rounded-lg border-2 border-amber-600 text-amber-600"
//                           whileTap={{ scale: 0.98 }}
//                         >
//                           Register
//                         </motion.button>
//                       </SignUpButton>
//                     </div>
//                   </SignedOut>
//                   <SignedIn>
//                     <div className="flex justify-center">
//                       <UserButton afterSignOutUrl="/" />
//                     </div>
//                   </SignedIn>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </nav>
//   );
// }






























// "use client";
// import React, { useState } from "react";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import { FiMenu, FiX } from "react-icons/fi";
// import { AiOutlineShoppingCart } from "react-icons/ai";
// import { useCart } from "@/app/context/CartContext";
// import {
//   SignInButton,
//   UserButton,
//   SignedIn,
//   SignedOut,
// } from "@clerk/nextjs";

// function Navbar() {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const { cart } = useCart();

//   const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

//   return (
//     <div className="bg-gray-100 shadow-md">
//       {/* Top Navbar Section */}
//       <div className="flex justify-between items-center p-4">
//         {/* Logo Section */}
//         <div className="flex items-center gap-3">
//           <img src="/logo c.png" alt="Logo" className="w-16 h-16" />
//           <h1 className="text-lg font-bold">Amreli Woods</h1>
//         </div>

//         {/* Right Section */}
//         <div className="flex items-center gap-4">
//           {/* Mobile Auth Buttons */}
//           <SignedOut>
//             <div className="md:hidden flex gap-2">
//               <SignInButton mode="modal">
//                 <motion.button
//                   className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-all duration-300"
//                   whileHover={{ scale: 1.1 }}
//                   animate={{ boxShadow: "0 0 15px 5px rgba(0, 255, 255, 0.5)" }}
//                 >
//                   Login
//                 </motion.button>
//               </SignInButton>
//             </div>
//           </SignedOut>

//           {/* Cart Icon for Mobile */}
//           <Link
//             href="/cart"
//             className="text-2xl text-green-400 hover:text-green-500 transition-all duration-300 md:hidden"
//           >
//             <AiOutlineShoppingCart />
//           </Link>

//           {/* Mobile Menu Toggle */}
//           <button
//             className="text-2xl md:hidden"
//             onClick={() => setIsMobileMenuOpen((prev) => !prev)}
//             aria-label="Toggle Menu"
//           >
//             {isMobileMenuOpen ? <FiX /> : <FiMenu />}
//           </button>
//         </div>

//         {/* Desktop Right Section */}
//         <div className="hidden md:flex items-center gap-4">
//           <SignedOut>
//             <div className="flex gap-2">
//               <SignInButton mode="modal">
//                 <motion.button
//                   className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-all duration-300"
//                   whileHover={{ scale: 1.1 }}
//                   animate={{ boxShadow: "0 0 15px 5px rgba(0, 255, 255, 0.5)" }}
//                 >
//                   Login
//                 </motion.button>
//               </SignInButton>
//             </div>
//           </SignedOut>

//           <SignedIn>
//             <UserButton
//               afterSignOutUrl="/"
//               appearance={{
//                 elements: {
//                   userButtonTrigger: "focus:shadow-none",
//                 },
//               }}
//             />
//           </SignedIn>

//           {/* Cart Link for Desktop */}
//           <Link
//             href="/cart"
//             className="text-2xl text-green-400 hover:text-green-500 transition-all duration-300 relative"
//           >
//             <AiOutlineShoppingCart />
//             {totalItems > 0 && (
//               <span className="absolute -top-2 -right-2 bg-teal-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
//                 {totalItems}
//               </span>
//             )}
//           </Link>
//         </div>
//       </div>

//       {/* Mobile Navigation Links */}
//       <div
//         className={`${
//           isMobileMenuOpen ? "block" : "hidden"
//         } md:flex flex-col md:flex-row justify-between items-center py-4 px-4 bg-gray-200`}
//       >
//         <div className="flex flex-col md:flex-row md:gap-8 w-full">
//           <Link
//             href="/"
//             className="py-2 text-gray-700 hover:text-blue-500 transition-all duration-300"
//           >
//             Home
//           </Link>
//           <Link
//             href="/AboutUs"
//             className="py-2 text-gray-700 hover:text-blue-500 transition-all duration-300"
//           >
//             About
//           </Link>
//           <Link
//             href="/Producte"
//             className="py-2 text-gray-700 hover:text-blue-500 transition-all duration-300"
//           >
//             Product
//           </Link>
//           <Link
//             href="/Contact"
//             className="py-2 text-gray-700 hover:text-blue-500 transition-all duration-300"
//           >
//             Contact
//           </Link>

//           {/* Mobile Cart Link */}
//           <Link
//             href="/cart"
//             className="text-2xl text-green-600 hover:text-green-900 transition-all duration-300 md:hidden flex justify-end mt-2"
//           >
//             <AiOutlineShoppingCart />
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Navbar;




// "use client";
// import React, { useState } from "react";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import { FiMenu, FiX } from "react-icons/fi";
// import { AiOutlineShoppingCart } from "react-icons/ai";
// import { useCart } from "@/app/context/CartContext";
// import {
//   SignInButton,
//   SignUpButton,
//   UserButton,
//   SignedIn,
//   SignedOut,
// } from "@clerk/nextjs";

// function Navbar() {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const { cart } = useCart();  // Access the cart context to get the cart items

//   // Calculate total items in the cart
//   const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

//   return (
//     <div className="bg-gray-100 shadow-md">
//       {/* Top Navbar Section */}
//       <div className="flex justify-between items-center p-4">
//         {/* Logo Section */}
//         <div className="flex items-center gap-3">
//         <img src="/logo c.png" alt="Logo" className="w-16 h-16" />
//         <h1 className="text-lg font-bold">Amreli Woods</h1>
//         </div>

//         {/* Right Section */}
//         <div className="flex items-center gap-4">
//           {/* Mobile Auth Buttons */}
//           <SignedOut>
//             <div className="md:hidden flex gap-2">
//               <SignInButton mode="modal">
//                 <motion.button
//                   className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-all duration-300"
//                   whileHover={{ scale: 1.1 }}
//                   animate={{ boxShadow: "0 0 15px 5px rgba(0, 255, 255, 0.5)" }}
//                 >
//                   Sign In
//                 </motion.button>
//               </SignInButton>
//             </div>
//           </SignedOut>

//           {/* Cart Icon for Mobile */}
//           <Link
//             href="/cart"
//             className="text-2xl text-green-400 hover:text-green-500 transition-all duration-300 md:hidden"
//           >
//             <AiOutlineShoppingCart />
//           </Link>

//           {/* Mobile Menu Toggle */}
//           <button
//             className="text-2xl md:hidden"
//             onClick={() => setIsMobileMenuOpen((prev) => !prev)}
//             aria-label="Toggle Menu"
//           >
//             {isMobileMenuOpen ? <FiX /> : <FiMenu />}
//           </button>
//         </div>

//         {/* Desktop Right Section */}
//         <div className="hidden md:flex items-center gap-4">
//           <SignedOut>
//             <div className="flex gap-2">
//               <SignInButton mode="modal">
//                 <motion.button
//                   className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-all duration-300"
//                   whileHover={{ scale: 1.1 }}
//                   animate={{ boxShadow: "0 0 15px 5px rgba(0, 255, 255, 0.5)" }}
//                 >
//                   Sign In
//                 </motion.button>
//               </SignInButton>
//               <SignUpButton mode="modal">
//                 <motion.button
//                   className="px-4 py-2 border border-teal-500 text-teal-500 rounded-lg hover:bg-teal-50 transition-all duration-300"
//                   whileHover={{
//                     scale: 1.1,
//                     backgroundColor: ["#f0f8ff", "#ffebcd", "#dcdcdc"],
//                     transition: { duration: 1, repeat: Infinity, repeatType: "loop" },
//                   }}
//                 >
//                   Sign Up
//                 </motion.button>
//               </SignUpButton>
//             </div>
//           </SignedOut>

//           <SignedIn>
//             <UserButton
//               afterSignOutUrl="/"
//               appearance={{
//                 elements: {
//                   userButtonTrigger: "focus:shadow-none",
//                 },
//               }}
//             />
//           </SignedIn>

//           {/* Cart Link for Desktop */}
//           <Link
//             href="/cart"
//             className="text-2xl text-green-400 hover:text-green-500 transition-all duration-300 relative"
//           >
//             <AiOutlineShoppingCart />
//             {totalItems > 0 && (
//               <span className="absolute -top-2 -right-2 bg-teal-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
//                 {totalItems}
//               </span>
//             )}
//           </Link>
//         </div>
//       </div>

//       {/* Mobile Navigation Links */}
//       <div
//         className={`${
//           isMobileMenuOpen ? "block" : "hidden"
//         } md:flex flex-col md:flex-row justify-between items-center py-4 px-4 bg-gray-200`}
//       >
//         <div className="flex flex-col md:flex-row md:gap-8 w-full">
//           <Link
//             href="/"
//             className="py-2 text-gray-700 hover:text-blue-500 transition-all duration-300"
//           >
//             Home
//           </Link>
//           <Link
//             href="/AboutUs"
//             className="py-2 text-gray-700 hover:text-blue-500 transition-all duration-300"
//           >
//             About
//           </Link>
//           <Link
//             href="/Producte"
//             className="py-2 text-gray-700 hover:text-blue-500 transition-all duration-300"
//           >
//             Product
//           </Link>
//           <Link
//             href="/Contact"
//             className="py-2 text-gray-700 hover:text-blue-500 transition-all duration-300"
//           >
//             Contact
//           </Link>

//           {/* Mobile Cart Link */}
//           <Link
//             href="/cart"
//             className="text-2xl text-green-600 hover:text-green-900 transition-all duration-300 md:hidden flex justify-end mt-2"
//           >
//             <AiOutlineShoppingCart />
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Navbar;

















// "use client";
// import React, { useState } from "react";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import { FiMenu, FiX } from "react-icons/fi";
// import { AiOutlineShoppingCart } from "react-icons/ai";
// import { useCart } from "@/app/context/CartContext";
// import {
//   SignInButton,
//   SignUpButton,
//   UserButton,
//   SignedIn,
//   SignedOut,
// } from "@clerk/nextjs";

// function Navbar() {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const { cart } = useCart();  // Access the cart context to get the cart items

//   // Calculate total items in the cart
//   const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

//   return (
//     <div className="bg-gray-100 shadow-md">
//       {/* Top Navbar Section */}
//       <div className="flex justify-between items-center p-4">
//         {/* Logo Section */}
//         <div className="flex items-center gap-3">
//           <img src="/Logo Icon.png" alt="Logo" className="w-8 h-8" />
//           <h1 className="text-lg font-bold">Comforty</h1>
//         </div>

//         {/* Right Section */}
//         <div className="flex items-center gap-4">
//           {/* Mobile Auth Buttons */}
//           <SignedOut>
//             <div className="md:hidden flex gap-2">
//               <SignInButton mode="modal">
//                 <button className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-all duration-300">
//                   Sign In
//                 </button>
//               </SignInButton>
//             </div>
//           </SignedOut>

//           {/* Cart Icon for Mobile */}
//           <Link
//             href="/cart"
//             className="text-2xl text-green-400 hover:text-green-500 transition-all duration-300 md:hidden"
//           >
//             <AiOutlineShoppingCart />
//           </Link>

//           {/* Mobile Menu Toggle */}
//           <button
//             className="text-2xl md:hidden"
//             onClick={() => setIsMobileMenuOpen((prev) => !prev)}
//             aria-label="Toggle Menu"
//           >
//             {isMobileMenuOpen ? <FiX /> : <FiMenu />}
//           </button>
//         </div>

//         {/* Desktop Right Section */}
//         <div className="hidden md:flex items-center gap-4">
//           <SignedOut>
//             <div className="flex gap-2">
//               <SignInButton mode="modal">
//                 <button className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-all duration-300">
//                   Sign In
//                 </button>
//               </SignInButton>
//               <SignUpButton mode="modal">
//                 <button className="px-4 py-2 border border-teal-500 text-teal-500 rounded-lg hover:bg-teal-50 transition-all duration-300">
//                   Sign Up
//                 </button>
//               </SignUpButton>
//             </div>
//           </SignedOut>

//           <SignedIn>
//             <UserButton
//               afterSignOutUrl="/"
//               appearance={{
//                 elements: {
//                   userButtonTrigger: "focus:shadow-none",
//                 },
//               }}
//             />
//           </SignedIn>

//           {/* Cart Link for Desktop */}
//           <Link
//             href="/cart"
//             className="text-2xl text-green-400 hover:text-green-500 transition-all duration-300 relative"
//           >
//             <AiOutlineShoppingCart />
//             {totalItems > 0 && (
//               <span className="absolute -top-2 -right-2 bg-teal-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
//                 {totalItems}
//               </span>
//             )}
//           </Link>
//         </div>
//       </div>

//       {/* Mobile Navigation Links */}
//       <div
//         className={`${
//           isMobileMenuOpen ? "block" : "hidden"
//         } md:flex flex-col md:flex-row justify-between items-center py-4 px-4 bg-gray-200`}
//       >
//         <div className="flex flex-col md:flex-row md:gap-8 w-full">
//           <Link
//             href="/"
//             className="py-2 text-gray-700 hover:text-blue-500 transition-all duration-300"
//           >
//             Home
//           </Link>
//           <Link
//             href="/AboutUs"
//             className="py-2 text-gray-700 hover:text-blue-500 transition-all duration-300"
//           >
//             About
//           </Link>
//           <Link
//             href="/Producte"
//             className="py-2 text-gray-700 hover:text-blue-500 transition-all duration-300"
//           >
//             Product
//           </Link>
//           <Link
//             href="/Contact"
//             className="py-2 text-gray-700 hover:text-blue-500 transition-all duration-300"
//           >
//             Contact
//           </Link>

//           {/* Mobile Cart Link */}
//           <Link
//             href="/cart"
//             className="text-2xl text-green-600 hover:text-green-900 transition-all duration-300 md:hidden flex justify-end mt-2"
//           >
//             <AiOutlineShoppingCart />
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Navbar;






// "use client";

// import React, { useState } from "react";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import { FiMenu, FiX } from "react-icons/fi";
// import { AiOutlineShoppingCart } from "react-icons/ai";
// import {
//   SignInButton,
//   SignUpButton,
//   UserButton,
//   SignedIn,
//   SignedOut,
// } from "@clerk/nextjs";

// function Navbar() {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   return (
//     <div className="bg-gray-100 shadow-md">
//       {/* Top Navbar Section */}
//       <div className="flex justify-between items-center p-4">
//         {/* Logo Section */}
//         <div className="flex items-center gap-3">
//           <img src="/Logo Icon.png" alt="Logo" className="w-8 h-8" />
//           <h1 className="text-lg font-bold">Comforty</h1>
//         </div>

//         {/* Right Section */}
//         <div className="flex items-center gap-4">
//           {/* Mobile Auth Buttons */}
//           <SignedOut>
//             <div className="md:hidden flex gap-2">
//               <SignInButton mode="modal">
//                 <button className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-all duration-300">
//                   Sign In
//                 </button>
//               </SignInButton>
//             </div>
//           </SignedOut>

//           {/* Cart Icon for Mobile */}
//           <Link
//             href="/cart"
//             className="text-2xl text-green-400 hover:text-green-500 transition-all duration-300 md:hidden"
//           >
//             <AiOutlineShoppingCart />
//           </Link>

//           {/* Mobile Menu Toggle */}
//           <button
//             className="text-2xl md:hidden"
//             onClick={() => setIsMobileMenuOpen((prev) => !prev)}
//             aria-label="Toggle Menu"
//           >
//             {isMobileMenuOpen ? <FiX /> : <FiMenu />}
//           </button>
//         </div>

//         {/* Desktop Right Section */}
//         <div className="hidden md:flex items-center gap-4">
//           <SignedOut>
//             <div className="flex gap-2">
//               <SignInButton mode="modal">
//                 <button className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-all duration-300">
//                   Sign In
//                 </button>
//               </SignInButton>
//               <SignUpButton mode="modal">
//                 <button className="px-4 py-2 border border-teal-500 text-teal-500 rounded-lg hover:bg-teal-50 transition-all duration-300">
//                   Sign Up
//                 </button>
//               </SignUpButton>
//             </div>
//           </SignedOut>

//           <SignedIn>
//             <UserButton
//               afterSignOutUrl="/"
//               appearance={{
//                 elements: {
//                   userButtonTrigger: "focus:shadow-none",
//                 },
//               }}
//             />
//           </SignedIn>

//           {/* Cart Link for Desktop */}
//           <Link
//             href="/cart"
//             className="text-2xl text-green-400 hover:text-green-500 transition-all duration-300 relative"
//           >
//             <AiOutlineShoppingCart />
//             <span className="absolute -top-2 -right-2 bg-teal-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
//               3
//             </span>
//           </Link>
//         </div>
//       </div>

//       {/* Mobile Navigation Links */}
//       <div
//         className={`${
//           isMobileMenuOpen ? "block" : "hidden"
//         } md:flex flex-col md:flex-row justify-between items-center py-4 px-4 bg-gray-200`}
//       >
//         <div className="flex flex-col md:flex-row md:gap-8 w-full">
//           <Link
//             href="/"
//             className="py-2 text-gray-700 hover:text-blue-500 transition-all duration-300"
//           >
//             Home
//           </Link>
//           <Link
//             href="/AboutUs"
//             className="py-2 text-gray-700 hover:text-blue-500 transition-all duration-300"
//           >
//             About
//           </Link>
//           <Link
//             href="/Producte"
//             className="py-2 text-gray-700 hover:text-blue-500 transition-all duration-300"
//           >
//             Product
//           </Link>
//           <Link
//             href="/Contact"
//             className="py-2 text-gray-700 hover:text-blue-500 transition-all duration-300"
//           >
//             Contact
//           </Link>

//           {/* Mobile Cart Link */}
//           <Link
//             href="/cart"
//             className="text-2xl text-green-600 hover:text-green-900 transition-all duration-300 md:hidden flex justify-end mt-2"
//           >
//             <AiOutlineShoppingCart />
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Navbar;









// "use client";

// import React, { useState } from "react";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import { FiMenu, FiX } from "react-icons/fi";
// import { AiOutlineShoppingCart } from "react-icons/ai";
// import {
//   SignInButton,
//   SignUpButton,
//   UserButton,
//   SignedIn,
//   SignedOut,
// } from "@clerk/nextjs";

// function Navbar() {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   // Clerk appearance configuration
//   const clerkAppearance = {
//     elements: {
//       formButtonPrimary: "bg-teal-500 hover:bg-teal-600 text-white",
//       footerActionLink: "text-teal-500 hover:text-teal-600",
//       formFieldInput:
//         "border border-gray-300 focus:ring-teal-500 focus:border-teal-500",
//     },
//   };

//   return (
//     <div className="bg-gray-100 shadow-md">
//       {/* Top Navbar Section */}
//       <div className="flex justify-between items-center p-4">
//         {/* Logo Section */}
//         <div className="flex items-center gap-3">
//           <img src="/Logo Icon.png" alt="Logo" className="w-8 h-8" />
//           <h1 className="text-lg font-bold">Comforty</h1>
//         </div>

//         {/* Right Section */}
//         <div className="flex items-center gap-4">
//           {/* Mobile Auth Buttons */}
//           <SignedOut>
//             <div className="md:hidden flex gap-2">
//               <SignInButton mode="modal">
//                 <button className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-all duration-300">
//                   Sign In
//                 </button>
//               </SignInButton>
//             </div>
//           </SignedOut>

//           {/* Cart Icon for Mobile */}
//           <Link
//             href="/cart"
//             className="text-2xl text-green-400 hover:text-green-500 transition-all duration-300 md:hidden"
//           >
//             <AiOutlineShoppingCart />
//           </Link>

//           {/* Mobile Menu Toggle */}
//           <button
//             className="text-2xl md:hidden"
//             onClick={() => setIsMobileMenuOpen((prev) => !prev)}
//             aria-label="Toggle Menu"
//           >
//             {isMobileMenuOpen ? <FiX /> : <FiMenu />}
//           </button>
//         </div>

//         {/* Desktop Right Section */}
//         <div className="hidden md:flex items-center gap-4">
//           <SignedOut>
//             <div className="flex gap-2">
//               <SignInButton mode="modal">
//                 <button className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-all duration-300">
//                   Sign In
//                 </button>
//               </SignInButton>
//               <SignUpButton mode="modal">
//                 <button className="px-4 py-2 border border-teal-500 text-teal-500 rounded-lg hover:bg-teal-50 transition-all duration-300">
//                   Sign Up
//                 </button>
//               </SignUpButton>
//             </div>
//           </SignedOut>

//           <SignedIn>
//             <UserButton
//               afterSignOutUrl="/"
//               appearance={{
//                 elements: {
//                   userButtonTrigger: "focus:shadow-none",
//                 },
//               }}
//             />
//           </SignedIn>

//           {/* Cart Link for Desktop */}
//           <Link
//             href="/cart"
//             className="text-2xl text-green-400 hover:text-green-500 transition-all duration-300"
//           >
//             <AiOutlineShoppingCart />
//           </Link>
//         </div>
//       </div>

//       {/* Mobile Navigation Links */}
//       <div
//         className={`${
//           isMobileMenuOpen ? "block" : "hidden"
//         } md:flex flex-col md:flex-row justify-between items-center py-4 px-4 bg-gray-200`}
//       >
//         <div className="flex flex-col md:flex-row md:gap-8 w-full">
//           <Link
//             href="/"
//             className="py-2 text-gray-700 hover:text-blue-500 transition-all duration-300"
//           >
//             Home
//           </Link>
//           <Link
//             href="/AboutUs"
//             className="py-2 text-gray-700 hover:text-blue-500 transition-all duration-300"
//           >
//             About
//           </Link>
//           <Link
//             href="/Producte"
//             className="py-2 text-gray-700 hover:text-blue-500 transition-all duration-300"
//           >
//             Product
//           </Link>
//           <Link
//             href="/Contact"
//             className="py-2 text-gray-700 hover:text-blue-500 transition-all duration-300"
//           >
//             Contact
//           </Link>

//           {/* Mobile Auth Links */}
          

//           {/* Mobile Cart Link */}
//           <Link
//             href="/cart"
//             className="text-2xl text-green-600 hover:text-green-900 transition-all duration-300 md:hidden flex justify-end mt-2"
//           >
//             <AiOutlineShoppingCart />
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Navbar;










// "use client";

// import React, { useState } from "react";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import { FiMenu, FiX, FiShoppingBag } from "react-icons/fi";

// // Login Page Modal Component
// const LoginPage = ({ onClose }: { onClose: () => void }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, scale: 0.8 }}
//       animate={{ opacity: 1, scale: 1 }}
//       exit={{ opacity: 0, scale: 0.8 }}
//       transition={{ duration: 0.5 }}
//       className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 mx-auto relative"
//     >
//       <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome Back</h2>
//       <p className="text-gray-600 mb-6">Please enter your details to log in.</p>
//       <form className="space-y-4">
//         <input
//           type="email"
//           placeholder="Email address"
//           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
//         />
//         <div className="flex justify-between items-center">
//           <label className="flex items-center">
//             <input type="checkbox" className="mr-2" />
//             <span className="text-gray-600">Remember me</span>
//           </label>
//           <button type="button" className="text-teal-500 hover:underline">
//             Forgot password?
//           </button>
//         </div>
//         <button
//           type="submit"
//           className="w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 transition-all"
//         >
//           Sign In
//         </button>
//       </form>
//       <div className="mt-6">
//         <button className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-lg hover:bg-gray-100">
//           <img src="/google.png" alt="Google" className="w-5 h-5" />
//           Sign in with Google
//         </button>
//         <button className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-lg mt-2 hover:bg-gray-100">
//           <img src="/facebook.png" alt="Facebook" className="w-5 h-5" />
//           Sign in with Facebook
//         </button>
//       </div>
//       <button
//         onClick={onClose}
//         className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 font-bold text-xl"
//       >
//         ✕
//       </button>
//     </motion.div>
//   );
// };

// function Navbar() {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

//   return (
//     <div className="bg-gray-100 shadow-md">
//       {/* Top Navbar Section */}
//       <div className="flex justify-between items-center p-4">
//         {/* Logo Section */}
//         <div className="flex items-center gap-3">
//           <img src="/Logo Icon.png" alt="Logo" className="w-8 h-8" />
//           <h1 className="text-lg font-bold">Comforty</h1>
//         </div>

//         {/* Right Section */}
//         <div className="flex items-center gap-4">
//           {/* Login Button for Mobile */}
//           <button
//             onClick={() => setIsLoginModalOpen(true)}
//             className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-all duration-300 md:hidden"
//           >
//             Login
//           </button>

//           {/* Mobile Menu Toggle */}
//           <button
//             className="text-2xl md:hidden"
//             onClick={() => setIsMobileMenuOpen((prev) => !prev)}
//             aria-label="Toggle Menu"
//           >
//             {isMobileMenuOpen ? <FiX /> : <FiMenu />}
//           </button>
//         </div>

//         {/* Right Section for Desktop */}
//         <div className="hidden md:flex items-center gap-4">
//           <button
//             onClick={() => setIsLoginModalOpen(true)}
//             className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-all duration-300"
//           >
//             Login
//           </button>
//           <Link href="/Bag" className="text-2xl text-gray-700 hover:text-blue-500 transition-all duration-300">
//             <FiShoppingBag />
//           </Link>
//         </div>
//       </div>

//       {/* Navigation Links */}
//       <div
//         className={`${
//           isMobileMenuOpen ? "block" : "hidden"
//         } md:flex flex-col md:flex-row justify-between items-center py-4 px-4 bg-gray-200`}
//       >
//         <div className="flex flex-col md:flex-row md:gap-8 w-full">
//           <Link
//             href="/"
//             className="py-2 text-gray-700 hover:text-blue-500 transition-all duration-300"
//           >
//             Home
//           </Link>
//           <Link
//             href="/AboutUs"
//             className="py-2 text-gray-700 hover:text-blue-500 transition-all duration-300"
//           >
//             About
//           </Link>
//           <Link
//             href="/Producte"
//             className="py-2 text-gray-700 hover:text-blue-500 transition-all duration-300"
//           >
//             Product
//           </Link>
//           <Link
//             href="/Contact"
//             className="py-2 text-gray-700 hover:text-blue-500 transition-all duration-300"
//           >
//             Contact
//           </Link>
//         </div>
//       </div>

//       {/* Login Modal */}
//       {isLoginModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <LoginPage onClose={() => setIsLoginModalOpen(false)} />
//         </div>
//       )}
//     </div>
//   );
// }

// export default Navbar;

















































// "use client";

// import React, { useState } from "react";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import { FiMenu, FiX, FiShoppingBag } from "react-icons/fi";

// // Login Page Modal Component
// const LoginPage = ({ onClose }: { onClose: () => void }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, scale: 0.8 }}
//       animate={{ opacity: 1, scale: 1 }}
//       exit={{ opacity: 0, scale: 0.8 }}
//       transition={{ duration: 0.5 }}
//       className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 mx-auto relative"
//     >
//       <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome Back</h2>
//       <p className="text-gray-600 mb-6">Please enter your details to log in.</p>
//       <form className="space-y-4">
//         <input
//           type="email"
//           placeholder="Email address"
//           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
//         />
//         <div className="flex justify-between items-center">
//           <label className="flex items-center">
//             <input type="checkbox" className="mr-2" />
//             <span className="text-gray-600">Remember me</span>
//           </label>
//           <button type="button" className="text-teal-500 hover:underline">
//             Forgot password?
//           </button>
//         </div>
//         <button
//           type="submit"
//           className="w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 transition-all"
//         >
//           Sign In
//         </button>
//       </form>
//       <div className="mt-6">
//         <button className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-lg hover:bg-gray-100">
//           <img src="/google.png" alt="Google" className="w-5 h-5" />
//           Sign in with Google
//         </button>
//         <button className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-lg mt-2 hover:bg-gray-100">
//           <img src="/facebook.png" alt="Facebook" className="w-5 h-5" />
//           Sign in with Facebook
//         </button>
//       </div>
//       <button
//         onClick={onClose}
//         className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 font-bold text-xl"
//       >
//         ✕
//       </button>
//     </motion.div>
//   );
// };

// function Navbar() {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // State for login modal

//   return (
//     <div className="bg-gray-100 shadow-md">
//       {/* Top Navbar Section */}
//       <div className="flex justify-between items-center p-4">
//         {/* Logo Section */}
//         <div className="flex items-center gap-3">
//           <img src="/Logo Icon.png" alt="Logo" className="w-8 h-8" />
//           <h1 className="text-lg font-bold">Comforty</h1>
//         </div>

//         {/* Mobile Menu Toggle */}
//         <button
//           className="text-2xl md:hidden"
//           onClick={() => setIsMobileMenuOpen((prev) => !prev)}
//           aria-label="Toggle Menu"
//         >
//           {isMobileMenuOpen ? <FiX /> : <FiMenu />}
//         </button>

//         {/* Right Section */}
//         <div className="hidden md:flex items-center gap-4">
//           {/* Login Button */}
//           <button
//             onClick={() => setIsLoginModalOpen(true)}
//             className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-all duration-300"
//           >
//             Login
//           </button>

//           {/* Bag Icon */}
//           <Link href="/Bag" className="text-2xl text-gray-700 hover:text-blue-500 transition-all duration-300">
//             <FiShoppingBag />
//           </Link>
//         </div>
//       </div>

//       {/* Navigation Links */}
//       <div
//         className={`${
//           isMobileMenuOpen ? "block" : "hidden"
//         } md:flex flex-col md:flex-row justify-between items-center py-4 px-4 bg-gray-200`}
//       >
//         <div className="flex flex-col md:flex-row md:gap-8 w-full">
//           <Link
//             href="/"
//             className="py-2 text-gray-700 hover:text-blue-500 transition-all duration-300"
//           >
//             Home
//           </Link>
//           <Link
//             href="/AboutUs"
//             className="py-2 text-gray-700 hover:text-blue-500 transition-all duration-300"
//           >
//             About
//           </Link>
//           {/* Product Link with Dropdown */}
//           <div
//             className="relative group"
//             onMouseEnter={() => setIsDropdownOpen(true)}
//             onMouseLeave={() => setIsDropdownOpen(false)}
//           >
//             <button className="py-2 text-gray-700 hover:text-blue-500 transition-all duration-300">
//             <Link
//             href="/Producte"
//             className="py-2 text-gray-700 hover:text-blue-500 transition-all duration-300"
//           >
//             Product
//           </Link>
//             </button>
//             {isDropdownOpen && (
//               <div className="absolute left-0 mt-2 w-40 bg-white shadow-lg rounded-lg">
//                 <ul className="py-2">
//                   <li>
//                     <Link
//                       href="/Producte/sofas"
//                       className="block px-4 py-2 hover:bg-gray-100"
//                     >
//                       Sofas
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       href="/Producte/chairs"
//                       className="block px-4 py-2 hover:bg-gray-100"
//                     >
//                       Chairs
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       href="/Producte/tables"
//                       className="block px-4 py-2 hover:bg-gray-100"
//                     >
//                       Tables
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       href="/Producte/beds"
//                       className="block px-4 py-2 hover:bg-gray-100"
//                     >
//                       Beds
//                     </Link>
//                   </li>
//                 </ul>
//               </div>
//             )}
//           </div>
//           <Link
//             href="/Contact"
//             className="py-2 text-gray-700 hover:text-blue-500 transition-all duration-300"
//           >
//             Contact
//           </Link>
//         </div>
//       </div>

//       {/* Login Modal */}
//       {isLoginModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <LoginPage onClose={() => setIsLoginModalOpen(false)} />
//         </div>
//       )}
//     </div>
//   );
// }

// export default Navbar;



// "use client";

// import React, { useState } from "react";
// import Link from "next/link";
// import { FiMenu, FiX, FiShoppingBag } from "react-icons/fi"; // Icons for responsiveness and interactivity

// function Navbar() {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   return (
//     <div className="bg-gray-100 shadow-md">
//       {/* Top Navbar Section */}
//       <div className="flex justify-between items-center p-4">
//         {/* Logo Section */}
//         <div className="flex items-center gap-3">
//           <img src="/Logo Icon.png" alt="Sofa" className="w-8 h-8" />
//           <h1 className="text-lg font-bold">Comforty</h1>
//         </div>

//         {/* Mobile Menu Toggle */}
//         <button
//           className="text-2xl md:hidden"
//           onClick={() => setIsMobileMenuOpen((prev) => !prev)}
//           aria-label="Toggle Menu"
//         >
//           {isMobileMenuOpen ? <FiX /> : <FiMenu />}
//         </button>

//         {/* Right Section */}
//         <div className="hidden md:flex items-center gap-4">
//           {/* Sign In Button */}
//           <Link
//             href="/AboutUs"
//             className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300"
//           >
//             Sign In
//           </Link>

//           {/* Bag Icon */}
//           <Link href="/Bag" className="text-2xl text-gray-700 hover:text-blue-500 transition-all duration-300">
//             <FiShoppingBag />
//           </Link>
//         </div>
//       </div>

//       {/* Navigation Links */}
//       <div
//         className={`${
//           isMobileMenuOpen ? "block" : "hidden"
//         } md:flex flex-col md:flex-row justify-between items-center py-4 px-4 bg-gray-200`}
//       >
//         <div className="flex flex-col md:flex-row md:gap-8 w-full">
//           <Link
//             href="/"
//             className="py-2 text-gray-700 hover:text-blue-500 transition-all duration-300"
//           >
//             Home
//           </Link>
//           <Link
//             href="/AboutUs"
//             className="py-2 text-gray-700 hover:text-blue-500 transition-all duration-300"
//           >
//             About
//           </Link>
//           {/* Product Link with Dropdown */}
//           <div
//             className="relative group"
//             onMouseEnter={() => setIsDropdownOpen(true)}
//             onMouseLeave={() => setIsDropdownOpen(false)}
//           >
//             <button className="py-2 text-gray-700 hover:text-blue-500 transition-all duration-300">
//               Product
//             </button>
//             {isDropdownOpen && (
//               <div className="absolute left-0 mt-2 w-40 bg-white shadow-lg rounded-lg">
//                 <ul className="py-2">
//                   <li>
//                     <Link
//                       href="/Producte/sofas"
//                       className="block px-4 py-2 hover:bg-gray-100"
//                     >
//                       Sofas
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       href="/Producte/chairs"
//                       className="block px-4 py-2 hover:bg-gray-100"
//                     >
//                       Chairs
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       href="/Producte/tables"
//                       className="block px-4 py-2 hover:bg-gray-100"
//                     >
//                       Tables
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       href="/Producte/beds"
//                       className="block px-4 py-2 hover:bg-gray-100"
//                     >
//                       Beds
//                     </Link>
//                   </li>
//                 </ul>
//               </div>
//             )}
//           </div>
//           <Link
//             href="/Contact"
//             className="py-2 text-gray-700 hover:text-blue-500 transition-all duration-300"
//           >
//             Contact
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Navbar;

// "use client";

// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import { FiSun, FiMoon } from "react-icons/fi"; // Icons for theme toggle

// function Navbar() {
//   const [isDarkMode, setIsDarkMode] = useState(false);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   // Load theme from localStorage
//   useEffect(() => {
//     const storedTheme = localStorage.getItem("theme");
//     if (storedTheme === "dark") {
//       setIsDarkMode(true);
//       document.documentElement.classList.add("dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//     }
//   }, []);

//   // Toggle Theme Functionality
//   const toggleTheme = () => {
//     setIsDarkMode((prev) => !prev);
//     const newTheme = isDarkMode ? "light" : "dark";
//     localStorage.setItem("theme", newTheme);
//     document.documentElement.classList.toggle("dark", newTheme === "dark");
//   };

//   return (
//     <div className={`bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}>
//       <div className="flex justify-between items-center p-4">
//         {/* Logo Section */}
//         <div className="flex items-center gap-3">
//           <img src="/Logo Icon.png" alt="Sofa" className="w-8 h-8" />
//           <h1 className="text-lg font-bold">Comforty</h1>
//         </div>

//         {/* Right Section */}
//         <div className="flex items-center gap-4">
//           {/* Theme Toggle Button */}
//           <button
//             onClick={toggleTheme}
//             className="text-2xl"
//             aria-label="Toggle Theme"
//           >
//             {isDarkMode ? <FiSun /> : <FiMoon />}
//           </button>

//           {/* Sign In Button */}
//           <Link
//             href="/AboutUs"
//             className="px-4 py-2 bg-blue-500 text-white dark:bg-blue-700 dark:text-gray-100 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-800 transition-all duration-300"
//           >
//             Sign In
//           </Link>
//         </div>
//       </div>

//       {/* Navigation Links */}
//       <div
//         className="flex flex-wrap justify-between items-center py-4 px-4 text-gray-700 bg-gray-200 dark:bg-gray-800"
//       >
//         <div className="flex flex-wrap gap-8">
//           <Link
//             href="/"
//             className="text-gray-700 dark:text-gray-300 hover:text-blue-900 dark:hover:text-blue-400 transition-all duration-300 ease-in-out"
//           >
//             Home
//           </Link>
//           <Link
//             href="/AboutUs"
//             className="text-gray-700 dark:text-gray-300 hover:text-blue-900 dark:hover:text-blue-400 transition-all duration-300 ease-in-out"
//           >
//             About
//           </Link>
//           {/* Product Link with Dropdown */}
//           <div
//             className="relative group"
//             onMouseEnter={() => setIsDropdownOpen(true)}
//             onMouseLeave={() => setIsDropdownOpen(false)}
//           >
//             <Link
//               href="/Producte"
//               className="text-gray-700 dark:text-gray-300 hover:text-blue-900 dark:hover:text-blue-400 transition-all duration-300 ease-in-out"
//             >
//               Product
//             </Link>
//             {isDropdownOpen && (
//               <div className="absolute left-0 mt-2 w-40 bg-white dark:bg-gray-900 shadow-lg rounded-lg">
//                 <ul className="py-2">
//                   <li>
//                     <Link
//                       href="/Producte/sofas"
//                       className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
//                     >
//                       Sofas
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       href="/Producte/chairs"
//                       className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
//                     >
//                       Chairs
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       href="/Producte/tables"
//                       className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
//                     >
//                       Tables
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       href="/Producte/beds"
//                       className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
//                     >
//                       Beds
//                     </Link>
//                   </li>
//                 </ul>
//               </div>
//             )}
//           </div>
//           <Link
//             href="/Contact"
//             className="text-gray-700 dark:text-gray-300 hover:text-blue-900 dark:hover:text-blue-400 transition-all duration-300 ease-in-out"
//           >
//             Contact
//           </Link>
//           <Link
//             href="/Bag"
//             className="text-gray-700 dark:text-gray-300 hover:text-blue-900 dark:hover:text-blue-400 transition-all duration-300 ease-in-out"
//           >
//             Bag
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Navbar;



















// "use client";

// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import { FiSun, FiMoon } from "react-icons/fi"; // Icons for theme toggle

// function Navbar() {
//   const [isDarkMode, setIsDarkMode] = useState(false);

//   // Load theme from localStorage
//   useEffect(() => {
//     const storedTheme = localStorage.getItem("theme");
//     if (storedTheme === "dark") {
//       setIsDarkMode(true);
//       document.documentElement.classList.add("dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//     }
//   }, []);

//   // Toggle Theme Functionality
//   const toggleTheme = () => {
//     setIsDarkMode((prev) => !prev);
//     const newTheme = isDarkMode ? "light" : "dark";
//     localStorage.setItem("theme", newTheme);
//     document.documentElement.classList.toggle("dark", newTheme === "dark");
//   };

//   return (
//     <div className={`bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}>
//       <div className="flex justify-between items-center p-4">
//         {/* Logo Section */}
//         <div className="flex items-center gap-3">
//           <img src="/Logo Icon.png" alt="Sofa" className="w-8 h-8" />
//           <h1 className="text-lg font-bold">Comforty</h1>
//         </div>

//         {/* Right Section */}
//         <div className="flex items-center gap-4">
//           {/* Theme Toggle Button */}
//           <button
//             onClick={toggleTheme}
//             className="text-2xl"
//             aria-label="Toggle Theme"
//           >
//             {isDarkMode ? <FiSun /> : <FiMoon />}
//           </button>

//           {/* Sign In Button */}
//           <Link
//             href="/AboutUs  "
//             className="px-4 py-2 bg-blue-500 text-white dark:bg-blue-700 dark:text-gray-100 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-800 transition-all duration-300"
//           >
//             Sign In
//           </Link>
//         </div>
//       </div>

//       {/* Navigation Links */}
//       <div
//         id="BC"
//         className="flex flex-wrap justify-between items-center py-4 px-4 text-gray-700 bg-gray-200 dark:bg-gray-800"
//       >
//         <div id="BD" className="flex flex-wrap gap-8">
//           <Link
//             href="/"
//             id="BE"
//             className="text-gray-700 dark:text-gray-300 hover:text-blue-900 dark:hover:text-blue-400 transition-all duration-300 ease-in-out"
//           >
//             Home
//           </Link>
//           <Link
//             href="/AboutUs"
//             id="BF"
//             className="text-gray-700 dark:text-gray-300 hover:text-blue-900 dark:hover:text-blue-400 transition-all duration-300 ease-in-out"
//           >
//             About
//           </Link>
//           <Link
//             href="/Producte"
//             id="BG"
//             className="text-gray-700 dark:text-gray-300 hover:text-blue-900 dark:hover:text-blue-400 transition-all duration-300 ease-in-out"
//           >
//             Product
//           </Link>
//           <Link
//             href="/Contact"
//             id="BH"
//             className="text-gray-700 dark:text-gray-300 hover:text-blue-900 dark:hover:text-blue-400 transition-all duration-300 ease-in-out"
//           >
//             Contact
//           </Link>
//           <Link
//             href="/Bag"
//             id="BI"
//             className="text-gray-700 dark:text-gray-300 hover:text-blue-900 dark:hover:text-blue-400 transition-all duration-300 ease-in-out"
//           >
//             Bag
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Navbar;

// "use client";

// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import { FiSun, FiMoon } from "react-icons/fi"; // Icons for theme toggle

// function Navbar() {
//   const [isDarkMode, setIsDarkMode] = useState(false);

//   // Load theme from localStorage
//   useEffect(() => {
//     const storedTheme = localStorage.getItem("theme");
//     if (storedTheme === "dark") {
//       setIsDarkMode(true);
//       document.documentElement.classList.add("dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//     }
//   }, []);

//   // Toggle Theme Functionality
//   const toggleTheme = () => {
//     setIsDarkMode((prev) => !prev);
//     const newTheme = isDarkMode ? "light" : "dark";
//     localStorage.setItem("theme", newTheme);
//     document.documentElement.classList.toggle("dark", newTheme === "dark");
//   };

//   return (
//     <div className={`bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}>
//       <div className="flex justify-between items-center p-4">
//         {/* Logo Section */}
//         <div className="flex items-center gap-3">
//           <img src="/Logo Icon.png" alt="Sofa" className="w-8 h-8" />
//           <h1 className="text-lg font-bold">Comforty</h1>
//         </div>

//         {/* Right Section */}
//         <div className="flex items-center gap-4">
//           {/* Theme Toggle Button */}
//           <button
//             onClick={toggleTheme}
//             className="text-2xl"
//             aria-label="Toggle Theme"
//           >
//             {isDarkMode ? <FiSun /> : <FiMoon />}
//           </button>

//           {/* Sign In Button */}
//           <Link
//             href="/signin"
//             className="px-4 py-2 bg-blue-500 text-white dark:bg-blue-700 dark:text-gray-100 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-800 transition-all duration-300"
//           >
//             Sign In
//           </Link>
//         </div>
//       </div>

//       {/* Navigation Links */}
//       <div
//         id="BC"
//         className="flex flex-wrap justify-between items-center py-4 px-4 text-gray-700 bg-gray-200 dark:bg-gray-800"
//       >
//         <div id="BD" className="flex flex-wrap gap-8">
//           <Link
//             href="/Home"
//             id="BE"
//             className="text-gray-700 dark:text-gray-300 hover:text-blue-900 dark:hover:text-blue-400 transition-all duration-300 ease-in-out"
//           >
//             Home
//           </Link>
//           <Link
//             href="/AboutUs"
//             id="BF"
//             className="text-gray-700 dark:text-gray-300 hover:text-blue-900 dark:hover:text-blue-400 transition-all duration-300 ease-in-out"
//           >
//             About
//           </Link>
//           <Link
//             href="/Products"
//             id="BG"
//             className="text-gray-700 dark:text-gray-300 hover:text-blue-900 dark:hover:text-blue-400 transition-all duration-300 ease-in-out"
//           >
//             Product
//           </Link>
//           <Link
//             href="/Contact"
//             id="BH"
//             className="text-gray-700 dark:text-gray-300 hover:text-blue-900 dark:hover:text-blue-400 transition-all duration-300 ease-in-out"
//           >
//             Contact
//           </Link>
//           <Link
//             href="/Bag"
//             id="BI"
//             className="text-gray-700 dark:text-gray-300 hover:text-blue-900 dark:hover:text-blue-400 transition-all duration-300 ease-in-out"
//           >
//             Bag
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Navbar;





// "use client"; // Ensure client-side rendering

// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import { client } from "@/sanity/lib/client";
// import { allProduct } from "@/sanity/lib/qury";

// export interface Product {
//   _id: string; // Unique identifier for each product
//   title: string; // Product title
//   description?: string; // Optional field for product description
//   price: number; // Product price
//   image: {
//     asset: {
//       _ref: string; // Reference to the image asset in Sanity
//     };
//   };
//   slug?: {
//     current?: string; // The current slug for dynamic routing
//   };
// }

// function Navbar() {
//   const [products, setProducts] = useState<Product[]>([]); // Holds all products
//   const [searchQuery, setSearchQuery] = useState<string>(""); // Search input
//   const [filteredProducts, setFilteredProducts] = useState<Product[]>([]); // Holds filtered products
//   const [isDarkMode, setIsDarkMode] = useState(false); // Dark mode state

//   // Fetch products from Sanity
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const fetchedProducts: Product[] = await client.fetch(allProduct);
//         setProducts(fetchedProducts);
//         setFilteredProducts(fetchedProducts); // Initialize filteredProducts
//       } catch (error) {
//         console.error("Failed to fetch products:", error);
//       }
//     };

//     fetchProducts();
//   }, []);

//   // Filter products when search query changes
//   useEffect(() => {
//     const results = products.filter((product) =>
//       product.title.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//     setFilteredProducts(results);
//   }, [searchQuery, products]);

//   // Handle Dark/Light Mode Toggle
//   useEffect(() => {
//     const storedTheme = localStorage.getItem("theme");
//     if (storedTheme) {
//       setIsDarkMode(storedTheme === "dark");
//       document.documentElement.classList.toggle("dark", storedTheme === "dark");
//     }
//   }, []);

//   const toggleTheme = () => {
//     const newTheme = isDarkMode ? "light" : "dark";
//     setIsDarkMode(!isDarkMode);
//     document.documentElement.classList.toggle("dark", newTheme === "dark");
//     localStorage.setItem("theme", newTheme);
//   };

//   return (
//     <div className={`${isDarkMode ? "dark bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
//       {/* Navbar Container */}
//       <div className="flex justify-between items-center p-4 border-b border-gray-300">
//         {/* Logo Section */}
//         <div className="flex items-center gap-3">
//           <img src="/Logo Icon.png" alt="Sofa" className="w-8 h-8" />
//           <h1 className="text-lg font-bold">Comforty</h1>
//         </div>

//         {/* Search Bar */}
//         <div className="flex-1 px-4">
//           <input
//             type="text"
//             placeholder="Search products..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
//               isDarkMode ? "bg-gray-800 text-white border-gray-600" : "bg-white border-gray-300"
//             }`}
//           />
//         </div>

//         {/* Dark/Light Mode Toggle */}
//         <div className="flex items-center">
//           <button
//             onClick={toggleTheme}
//             className={`px-4 py-2 rounded-md font-medium transition ${
//               isDarkMode
//                 ? "bg-gray-700 text-white hover:bg-gray-600"
//                 : "bg-gray-200 text-black hover:bg-gray-300"
//             }`}
//           >
//             {isDarkMode ? "Light Mode" : "Dark Mode"}
//           </button>
//         </div>
//       </div>

//       {/* Filtered Products (Optional Display) */}
//       <div className="container mx-auto py-4">
//         {searchQuery && filteredProducts.length > 0 ? (
//           <ul className="bg-white shadow-md rounded-md p-4">
//             {filteredProducts.map((product, index) => (
//               <li
//                 key={product._id || product.slug?.current || `index-${index}`} // Safely access slug.current
//                 className="p-2 border-b last:border-b-0"
//               >
//                 {product.title}
//               </li>
//             ))}
//           </ul>
//         ) : searchQuery ? (
//           <p className="text-gray-500 text-center">No products found.</p>
//         ) : null}
//       </div>
//     </div>
//   );
// }

// export default Navbar;



// "use client"; // Ensure client-side rendering

// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import { client } from "@/sanity/lib/client";
// import { allProduct } from "@/sanity/lib/qury";

// export interface Product {
//   _id: string; // Unique identifier for each product
//   title: string; // Product title
//   description?: string; // Optional field for product description
//   price: number; // Product price
//   image: {
//     asset: {
//       _ref: string; // Reference to the image asset in Sanity
//     };
//   };
//   slug?: {
//     current?: string; // The current slug for dynamic routing
//   };
// }

// function Navbar() {
//   const [products, setProducts] = useState<Product[]>([]); // Holds all products
//   const [searchQuery, setSearchQuery] = useState<string>(""); // Search input
//   const [filteredProducts, setFilteredProducts] = useState<Product[]>([]); // Holds filtered products

//   // Fetch products from Sanity
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const fetchedProducts: Product[] = await client.fetch(allProduct);
//         setProducts(fetchedProducts);
//         setFilteredProducts(fetchedProducts); // Initialize filteredProducts
//       } catch (error) {
//         console.error("Failed to fetch products:", error);
//       }
//     };

//     fetchProducts();
//   }, []);

//   // Filter products when search query changes
//   useEffect(() => {
//     const results = products.filter((product) =>
//       product.title.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//     setFilteredProducts(results);
//   }, [searchQuery, products]);

//   return (
//     <div>
//       {/* Navbar Container */}
//       <div className="flex justify-between items-center bg-gray-100 p-4 border-b border-gray-300">
//         {/* Logo Section */}
//         <div className="flex items-center gap-3">
//           <img src="/Logo Icon.png" alt="Sofa" className="w-8 h-8" />
//           <h1 className="text-lg font-bold text-blue-900">Comforty</h1>
//         </div>

//         {/* Search Bar */}
//         <div className="flex-1 px-4">
//           <input
//             type="text"
//             placeholder="Search products..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-teal-500"
//           />
//         </div>

//         {/* Cart Section */}
//         <div className="relative">
//           <button className="flex items-center gap-2 bg-white border border-gray-300 rounded-full px-3 py-1 hover:border-blue-900">
//             <img
//               src="https://cdn-icons-png.flaticon.com/512/1170/1170678.png"
//               alt="Cart"
//               className="w-5 h-5"
//             />
//             <span className="text-sm">Cart</span>
//             <span className="absolute bg-teal-500 text-white text-xs font-bold rounded-full px-2 py-1 -top-2 -right-3">
//               2
//             </span>
//           </button>
//         </div>
//       </div>

//       {/* Filtered Products (Optional Display) */}
//       <div className="container mx-auto py-4">
//         {searchQuery && filteredProducts.length > 0 ? (
//           <ul className="bg-white shadow-md rounded-md p-4">
//             {filteredProducts.map((product, index) => (
//               <li
//                 key={product._id || product.slug?.current || `index-${index}`} // Safely access slug.current
//                 className="p-2 border-b last:border-b-0"
//               >
//                 {product.title}
//               </li>
//             ))}
//           </ul>
//         ) : searchQuery ? (
//           <p className="text-gray-500 text-center">No products found.</p>
//         ) : null}
//       </div>
//     </div>
//   );
// }

// export default Navbar;
// "use client";
// import React, { useState } from "react";
// import Link from "next/link";

// type Product = {
//   id: string;
//   title: string;
// };

// type NavbarProps = {
//   products?: Product[]; // Allow products to be optional
// };

// function Navbar({ products = [] }: NavbarProps) {
//   const [searchQuery, setSearchQuery] = useState<string>("");

//   const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(event.target.value);
//   };

//   // Ensure products is an array before filtering
//   const filteredProducts = Array.isArray(products)
//     ? products.filter((item) =>
//       item.title.toLowerCase().includes(searchQuery.toLowerCase())
//       )
//     : [];

//   return (
//     <div>
//       {/* Navbar Container */}
//       <div className="flex justify-between items-center bg-gray-100 p-4 border-b border-gray-300">
//         {/* Logo Section */}
//         <div className="flex items-center gap-3">
//           <img src="/Logo Icon.png" alt="Sofa" className="w-8 h-8" />
//           <h1 className="text-lg font-bold text-blue-900">Comforty</h1>
//         </div>

//         {/* Search Bar */}
//         <div className="flex-1 px-4">
//           <input
//             type="text"
//             placeholder="Search products..."
//             value={searchQuery}
//             onChange={handleSearch}
//             className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-teal-500"
//           />
//         </div>

//         {/* Cart Section */}
//         <div className="relative">
//           <button className="flex items-center gap-2 bg-white border border-gray-300 rounded-full px-3 py-1 hover:border-blue-900">
//             <img
//               src="https://cdn-icons-png.flaticon.com/512/1170/1170678.png"
//               alt="Cart"
//               className="w-5 h-5"
//             />
//             <span className="text-sm">Cart</span>
//             <span className="absolute bg-teal-500 text-white text-xs font-bold rounded-full px-2 py-1 -top-2 -right-3">
//               2
//             </span>
//           </button>
//         </div>
//       </div>

//       {/* Filtered Products (Optional Display) */}
//       <div className="container mx-auto py-4">
//         {searchQuery && filteredProducts.length > 0 ? (
//           <ul className="bg-white shadow-md rounded-md p-4">
//             {filteredProducts.map((product) => (
//               <li key={product.id} className="p-2 border-b last:border-b-0">
//                 {product.title}
//               </li>
//             ))}
//           </ul>
//         ) : searchQuery ? (
//           <p className="text-gray-500 text-center">No products found.</p>
//         ) : null}
//       </div>
//     </div>
//   );
// }

// export default Navbar;


// import React from "react";
// import Link from "next/link";

// function Navbar() {
//   return (
//     <div>
//       {/* Navbar Container */}
//       <div id="AZ" className="flex justify-between items-center bg-gray-100 p-4 border-b border-gray-300">
//         {/* Logo Section */}
//         <div id="BA" className="flex items-center gap-3">
//           <img src="/Logo Icon.png" alt="Sofa" className="w-8 h-8" />
//           <h1 className="text-lg font-bold text-blue-900">Comforty</h1>
//         </div>

//         {/* Cart Section */}
//         <div id="BB" className="relative">
//           <button className="flex items-center gap-2 bg-white border border-gray-300 rounded-full px-3 py-1 hover:border-blue-900">
//             <img
//               src="https://cdn-icons-png.flaticon.com/512/1170/1170678.png"
//               alt="Cart"
//               className="w-5 h-5"
//             />
//             <span className="text-sm">Cart</span>
//             <span className="absolute bg-teal-500 text-white text-xs font-bold rounded-full px-2 py-1 -top-2 -right-3">
//               2
//             </span>
//           </button>
//         </div>
//       </div>

//       {/* Links and Contact Section */}
//       <div id="BC" className="flex flex-wrap justify-between items-center py-4 px-4 text-gray-700">
//         {/* Navigation Links */}
//         <div id="BD" className="flex flex-wrap gap-8">
//           {/* Existing Links */}
//           <Link
//             href="/Home"
//             id="BE"
//             className="text-gray-700 hover:text-blue-900 transition-all duration-300 ease-in-out"
//           >
//             Home
//           </Link>

//           {/* New Links */}
//           <Link
//             href="/AboutUs"
//             id="BF"
//             className="text-gray-700 hover:text-blue-900 transition-all duration-300 ease-in-out"
//           >
//             About
//           </Link>
//           <Link
//             href="/Products"
//             id="BG"
//             className="text-gray-700 hover:text-blue-900 transition-all duration-300 ease-in-out"
//           >
//             Product
//           </Link>
//           <Link
//             href="/Contact"
//             id="BH"
//             className="text-gray-700 hover:text-blue-900 transition-all duration-300 ease-in-out"
//           >
//             Contact
//           </Link>
//           <Link
//             href="/Bag"
//             id="BI"
//             className="text-gray-700 hover:text-blue-900 transition-all duration-300 ease-in-out"
//           >
//             Bag
//           </Link>
//         </div>

//         {/* Contact Information */}
//         <div id="BK" className="mt-2 sm:mt-0">
//           <p>
//             Contact: <strong className="text-blue-900">(808) 555-0111</strong>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Navbar;