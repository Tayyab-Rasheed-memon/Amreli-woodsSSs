






















































































































"use client";
import React, { useEffect, useState } from "react";
import { Product } from "@/app/types/product";
import { client } from "@/sanity/lib/client";
import { allProduct } from "@/sanity/lib/qury";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/app/context/CartContext";
import { FiInstagram, FiFacebook, FiTwitter, FiMail } from "react-icons/fi";

function ProductList() {
  // State declarations
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalProduct, setModalProduct] = useState<Product | null>(null);
  const [sortBy, setSortBy] = useState("price");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const { cart, addToCart, increaseQuantity, decreaseQuantity } = useCart();

  // Data fetching
  useEffect(() => {
    async function fetchProducts() {
      try {
        setIsLoading(true);
        const fetchedProducts: Product[] = await client.fetch(allProduct);
        setProducts(fetchedProducts);
        setFilteredProducts(fetchedProducts);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setIsLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // Filtering and sorting
  useEffect(() => {
    const results = products
      .filter(product => 
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        product.price >= priceRange[0] &&
        product.price <= priceRange[1]
      )
      .sort((a, b) => {
        if(sortBy === "price") return a.price - b.price;
        if(sortBy === "name") return a.title.localeCompare(b.title);
        return 0;
      });
    setFilteredProducts(results);
  }, [searchTerm, products, sortBy, priceRange]);

  // Modal handling
  const openModal = (product: Product) => {
    setModalProduct(product);
    setShowModal(true);
  };

  const closeModal = () => {
    setModalProduct(null);
    setShowModal(false);
  };

  return (
    <div className="bg-gray-50 text-black">
      {/* Search and Filters */}
      <div className="container mx-auto p-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-6 py-3 border-2 border-amber-200 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <select 
            className="p-3 border-2 border-amber-200 rounded-full"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="price">Sort by Price</option>
            <option value="name">Sort by Name</option>
          </select>
        </div>
        
        <div className="space-y-2">
          <label className="text-amber-700">Price Range: ${priceRange[0]} - ${priceRange[1]}</label>
          <input
            type="range"
            min="0"
            max="10000"
            step="100"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
            className="w-full accent-amber-600"
          />
        </div>
      </div>

      {/* Product Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
        }}
      >
        {isLoading ? (
          <motion.div
            className="col-span-full text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-amber-700">Loading products...</p>
          </motion.div>
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <motion.div
              key={product._id}
              className="border rounded-lg shadow-md overflow-hidden bg-white"
              whileHover={{ scale: 1.02 }}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <div className="relative group h-64">
                <Image
                  src={urlFor(product.image).url()}
                  alt={product.title}
                  fill
                  className="object-cover"
                />
                <button
                  onClick={() => openModal(product)}
                  className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white font-bold transition-opacity"
                >
                  Quick View
                </button>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-amber-800">{product.title}</h3>
                <p className="text-amber-600">${product.price}</p>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => addToCart(product)}
                  className="mt-4 w-full bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700 transition-colors"
                >
                  Add to Cart
                </motion.button>
              </div>
            </motion.div>
          ))
        ) : (
          <motion.div
            className="col-span-full text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-amber-700">No products found</p>
          </motion.div>
        )}
      </motion.div>

      {/* Product Modal */}
      <AnimatePresence>
        {showModal && modalProduct && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={closeModal}
          >
            <motion.div
              className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full mx-4"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-amber-700 hover:text-amber-900"
              >
                ✕
              </button>
              <h2 className="text-3xl font-bold text-amber-800 mb-6">{modalProduct.title}</h2>
              <div className="relative h-96 mb-6">
                <Image
                  src={urlFor(modalProduct.image).url()}
                  alt={modalProduct.title}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <p className="text-amber-700 mb-6">{modalProduct.description}</p>
              <div className="flex justify-between items-center">
                <p className="text-2xl font-bold text-amber-800">${modalProduct.price}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => {
                    addToCart(modalProduct);
                    closeModal();
                  }}
                  className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700"
                >
                  Add to Cart
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Cart */}
      <motion.div
        className="fixed bottom-4 right-4 bg-white shadow-xl rounded-lg p-4 w-80 border border-amber-100"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        whileHover={{ scale: 1.02 }}
      >
        <h3 className="text-xl font-bold text-amber-800 mb-4">Your Cart</h3>
        {cart.length === 0 ? (
          <p className="text-amber-600">Your cart is empty</p>
        ) : (
          <>
            <ul className="space-y-3">
              {cart.map((item) => (
                <li key={item._id} className="flex justify-between items-center">
                  <span className="text-amber-700">{item.title}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => decreaseQuantity(item._id)}
                      className="px-2 py-1 bg-amber-100 text-amber-700 rounded hover:bg-amber-200"
                    >
                      -
                    </button>
                    <span className="w-6 text-center">{item.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(item._id)}
                      className="px-2 py-1 bg-amber-100 text-amber-700 rounded hover:bg-amber-200"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-amber-800">${(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-4 border-t border-amber-100">
              <p className="text-lg font-bold text-amber-800">
                Total: ${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
              </p>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}

export default ProductList;













// "use client"
// import React, { useEffect, useState } from "react";
// import { Product } from "@/app/types/product";
// import { client } from "@/sanity/lib/client";
// import { allProduct } from "@/sanity/lib/qury";
// import { urlFor } from "@/sanity/lib/image";
// import Image from "next/image";
// import { motion, AnimatePresence } from "framer-motion";
// import { useCart } from "@/app/context/CartContext";

// function Hero() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [modalProduct, setModalProduct] = useState<Product | null>(null);
  
//   // Use cart context
//   const { cart, addToCart, increaseQuantity, decreaseQuantity } = useCart();

//   useEffect(() => {
//     async function fetchProducts() {
//       try {
//         setIsLoading(true);
//         const fetchedProducts: Product[] = await client.fetch(allProduct);
//         setProducts(fetchedProducts);
//         setFilteredProducts(fetchedProducts);
//         setIsLoading(false);
//       } catch (error) {
//         console.error("Failed to fetch products:", error);
//         setIsLoading(false);
//       }
//     }
//     fetchProducts();
//   }, []);

//   useEffect(() => {
//     const results = products.filter((product) =>
//       product.title.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredProducts(results);
//   }, [searchTerm, products]);

//   const openModal = (product: Product) => {
//     setModalProduct(product);
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setModalProduct(null);
//     setShowModal(false);
//   };

//   return (
//     <div className="bg-gray-50 text-black">
//       {/* Search Bar */}
//       <motion.div
//         className="py-6 px-6"
//         initial={{ y: -50, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.5 }}
//       >
//         <input
//           type="text"
//           placeholder="Search for products..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="w-full px-4 py-2 border rounded shadow focus:outline-none focus:ring-2 focus:ring-teal-500"
//         />
//       </motion.div>

//       {/* Product Grid */}
//       <motion.div
//         className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6"
//         initial="hidden"
//         animate="visible"
//         variants={{
//           hidden: { opacity: 0 },
//           visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
//         }}
//       >
//         {isLoading ? (
//           <motion.div
//             className="col-span-full text-center py-16"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//           >
//             <p>Loading products...</p>
//           </motion.div>
//         ) : filteredProducts.length > 0 ? (
//           filteredProducts.map((product) => (
//             <motion.div
//               key={product._id}
//               className="border rounded-lg shadow-md overflow-hidden"
//               whileHover={{ scale: 1.05, rotate: 1 }}
//               initial={{ y: 30, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               exit={{ opacity: 0 }}
//             >
//               <div className="relative group">
//                 <Image
//                   src={urlFor(product.image).url()}
//                   alt={product.title}
//                   width={200}
//                   height={150}
//                   className="w-full h-48 object-cover"
//                 />
//                 <button
//                   onClick={() => openModal(product)}
//                   className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white font-bold transition-opacity"
//                 >
//                   Quick View
//                 </button>
//               </div>
//               <div className="p-4">
//                 <h3 className="text-lg font-bold">{product.title}</h3>
//                 <p className="text-gray-700">${product.price}</p>
//                 <motion.button
//                   whileTap={{ scale: 0.95, rotate: -2 }}
//                   onClick={() => addToCart(product)}
//                   className="mt-4 w-full bg-teal-500 text-white px-4 py-2 rounded shadow hover:bg-teal-600 transition"
//                 >
//                   Add to Cart
//                 </motion.button>
//               </div>
//             </motion.div>
//           ))
//         ) : (
//           <motion.div
//             className="col-span-full text-center py-16"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//           >
//             No products match your search.
//           </motion.div>
//         )}
//       </motion.div>

//       {/* Quick View Modal */}
//       <AnimatePresence>
//         {showModal && modalProduct && (
//           <div
//             className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
//             onClick={closeModal}
//           >
//             <motion.div
//               className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg mx-auto relative"
//               initial={{ opacity: 0, y: -50 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: 50 }}
//               onClick={(e) => e.stopPropagation()}
//             >
//               <button
//                 onClick={closeModal}
//                 className="absolute top-3 right-3 bg-gray-300 hover:bg-gray-400 rounded-full p-1"
//               >
//                 ✕
//               </button>
//               <h2 className="text-2xl font-bold mb-4">{modalProduct.title}</h2>
//               <Image
//                 src={urlFor(modalProduct.image).url()}
//                 alt={modalProduct.title}
//                 width={400}
//                 height={300}
//                 className="w-full h-64 object-cover rounded-lg mb-4"
//               />
//               <p className="text-gray-700 mb-4">{modalProduct.description}</p>
//               <div className="flex justify-between items-center">
//                 <p className="text-lg font-bold">Price: ${modalProduct.price}</p>
//                 <button
//                   onClick={() => {
//                     addToCart(modalProduct);
//                     closeModal();
//                   }}
//                   className="bg-teal-500 text-white px-4 py-2 rounded shadow hover:bg-teal-600 transition"
//                 >
//                   Add to Cart
//                 </button>
//               </div>
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>

//       {/* Cart Summary */}
//       <motion.div
//         className="fixed bottom-4 right-4 bg-white shadow-lg rounded-lg p-4 w-80"
//         initial={{ y: 100, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         whileHover={{ scale: 1.02 }}
//         transition={{ type: "spring", stiffness: 100 }}
//       >
//         <h3 className="text-lg font-bold mb-4">Cart</h3>
//         {cart.length === 0 ? (
//           <p className="text-gray-500">Your cart is empty.</p>
//         ) : (
//           <ul>
//             {cart.map((item) => (
//               <li key={item._id} className="flex justify-between items-center mb-2">
//                 <span>{item.title}</span>
//                 <div className="flex items-center gap-2">
//                   <button
//                     onClick={() => decreaseQuantity(item._id)}
//                     className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400 transition"
//                   >
//                     -
//                   </button>
//                   <span>{item.quantity}</span>
//                   <button
//                     onClick={() => increaseQuantity(item._id)}
//                     className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400 transition"
//                   >
//                     +
//                   </button>
//                 </div>
//                 <span>${(item.price * item.quantity).toFixed(2)}</span>
//               </li>
//             ))}
//           </ul>
//         )}
//         {cart.length > 0 && (
//           <motion.p
//             className="text-lg font-bold mt-4"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//           >
//             Total: $
//             {cart.reduce(
//               (total, item) => total + item.price * item.quantity,
//               0
//             ).toFixed(2)}
//           </motion.p>
//         )}
//       </motion.div>
//     </div>
//   );
// }

// export default Hero;









































































































































































































































































































































// "use client"
// import React, { useEffect, useState } from "react";
// import { Product } from "@/app/types/product";
// import { client } from "@/sanity/lib/client";
// import { allProduct } from "@/sanity/lib/qury";
// import { urlFor } from "@/sanity/lib/image";
// import Image from "next/image";
// import { motion, AnimatePresence } from "framer-motion";

// function Hero() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
//   const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [modalProduct, setModalProduct] = useState<Product | null>(null);

//   useEffect(() => {
//     async function fetchProducts() {
//       try {
//         setIsLoading(true);
//         const fetchedProducts: Product[] = await client.fetch(allProduct);
//         setProducts(fetchedProducts);
//         setFilteredProducts(fetchedProducts);
//         setIsLoading(false);
//       } catch (error) {
//         console.error("Failed to fetch products:", error);
//         setIsLoading(false);
//       }
//     }
//     fetchProducts();
//   }, []);

//   useEffect(() => {
//     const results = products.filter((product) =>
//       product.title.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredProducts(results);
//   }, [searchTerm, products]);

//   const addToCart = (product: Product) => {
//     setCart((prevCart) => {
//       const existingItem = prevCart.find((item) => item.product._id === product._id);
//       if (existingItem) {
//         return prevCart.map((item) =>
//           item.product._id === product._id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       }
//       return [...prevCart, { product, quantity: 1 }];
//     });
//   };

//   const incrementQuantity = (productId: string) => {
//     setCart((prevCart) =>
//       prevCart.map((item) =>
//         item.product._id === productId
//           ? { ...item, quantity: item.quantity + 1 }
//           : item
//       )
//     );
//   };

//   const decrementQuantity = (productId: string) => {
//     setCart((prevCart) =>
//       prevCart
//         .map((item) =>
//           item.product._id === productId
//             ? { ...item, quantity: item.quantity - 1 }
//             : item
//         )
//         .filter((item) => item.quantity > 0)
//     );
//   };

//   const openModal = (product: Product) => {
//     setModalProduct(product);
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setModalProduct(null);
//     setShowModal(false);
//   };

//   return (
//     <div className="bg-gray-50 text-black"> {/* Removed dynamic dark mode class */}
//       {/* Search Bar */}
//       <motion.div
//         className="py-6 px-6"
//         initial={{ y: -50, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.5 }}
//       >
//         <input
//           type="text"
//           placeholder="Search for products..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="w-full px-4 py-2 border rounded shadow focus:outline-none focus:ring-2 focus:ring-teal-500"
//         />
//       </motion.div>

//       {/* Product Grid */}
//       <motion.div
//         className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6"
//         initial="hidden"
//         animate="visible"
//         variants={{
//           hidden: { opacity: 0 },
//           visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
//         }}
//       >
//         {isLoading ? (
//           <motion.div
//             className="col-span-full text-center py-16"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//           >
//             <p>Loading products...</p>
//           </motion.div>
//         ) : filteredProducts.length > 0 ? (
//           filteredProducts.map((product) => (
//             <motion.div
//               key={product._id}
//               className="border rounded-lg shadow-md overflow-hidden"
//               whileHover={{ scale: 1.05, rotate: 1 }}
//               initial={{ y: 30, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               exit={{ opacity: 0 }}
//             >
//               <div className="relative group">
//                 <Image
//                   src={urlFor(product.image).url()}
//                   alt={product.title}
//                   width={200}
//                   height={150}
//                   className="w-full h-48 object-cover"
//                 />
//                 <button
//                   onClick={() => openModal(product)}
//                   className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white font-bold transition-opacity"
//                 >
//                   Quick View
//                 </button>
//               </div>
//               <div className="p-4">
//                 <h3 className="text-lg font-bold">{product.title}</h3>
//                 <p className="text-gray-700">${product.price}</p>
//                 <motion.button
//                   whileTap={{ scale: 0.95, rotate: -2 }}
//                   onClick={() => addToCart(product)}
//                   className="mt-4 w-full bg-teal-500 text-white px-4 py-2 rounded shadow hover:bg-teal-600 transition"
//                 >
//                   Add to Cart
//                 </motion.button>
//               </div>
//             </motion.div>
//           ))
//         ) : (
//           <motion.div
//             className="col-span-full text-center py-16"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//           >
//             No products match your search.
//           </motion.div>
//         )}
//       </motion.div>

//       {/* Quick View Modal */}
//       <AnimatePresence>
//         {showModal && modalProduct && (
//           <div
//             className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
//             onClick={closeModal}
//           >
//             <motion.div
//               className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg mx-auto relative"
//               initial={{ opacity: 0, y: -50 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: 50 }}
//               onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
//             >
//               <button
//                 onClick={closeModal}
//                 className="absolute top-3 right-3 bg-gray-300 hover:bg-gray-400 rounded-full p-1"
//               >
//                 ✕
//               </button>
//               <h2 className="text-2xl font-bold mb-4">{modalProduct.title}</h2>
//               <Image
//                 src={urlFor(modalProduct.image).url()}
//                 alt={modalProduct.title}
//                 width={400}
//                 height={300}
//                 className="w-full h-64 object-cover rounded-lg mb-4"
//               />
//               <p className="text-gray-700 mb-4">{modalProduct.description}</p>
//               <div className="flex justify-between items-center">
//                 <p className="text-lg font-bold">Price: ${modalProduct.price}</p>
//                 <button
//                   onClick={() => {
//                     addToCart(modalProduct);
//                     closeModal();
//                   }}
//                   className="bg-teal-500 text-white px-4 py-2 rounded shadow hover:bg-teal-600 transition"
//                 >
//                   Add to Cart
//                 </button>
//               </div>
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>

//       {/* Cart Summary */}
//       <motion.div
//         className="fixed bottom-4 right-4 bg-white shadow-lg rounded-lg p-4 w-80"
//         initial={{ y: 100, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         whileHover={{ scale: 1.02 }}
//         transition={{ type: "spring", stiffness: 100 }}
//       >
//         <h3 className="text-lg font-bold mb-4">Cart</h3>
//         {cart.length === 0 ? (
//           <p className="text-gray-500">Your cart is empty.</p>
//         ) : (
//           <ul>
//             {cart.map((item) => (
//               <li key={item.product._id} className="flex justify-between items-center mb-2">
//                 <span>{item.product.title}</span>
//                 <div className="flex items-center gap-2">
//                   <button
//                     onClick={() => decrementQuantity(item.product._id)}
//                     className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400 transition"
//                   >
//                     -
//                   </button>
//                   <span>{item.quantity}</span>
//                   <button
//                     onClick={() => incrementQuantity(item.product._id)}
//                     className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400 transition"
//                   >
//                     +
//                   </button>
//                 </div>
//                 <span>${(item.product.price * item.quantity).toFixed(2)}</span>
//               </li>
//             ))}
//           </ul>
//         )}
//         {cart.length > 0 && (
//           <motion.p
//             className="text-lg font-bold mt-4"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//           >
//             Total: $ 
//             {cart.reduce(
//               (total, item) => total + item.product.price * item.quantity,
//               0
//             ).toFixed(2)}
//           </motion.p>
//         )}
//       </motion.div>
//     </div>
//   );
// }

// export default Hero;

// "use client"
// import React, { useEffect, useState } from "react";
// import { Product } from "@/app/types/product";
// import { client } from "@/sanity/lib/client";
// import { allProduct } from "@/sanity/lib/qury";
// import { urlFor } from "@/sanity/lib/image";
// import Image from "next/image";
// import { motion, AnimatePresence } from "framer-motion";

// function Hero({ isDarkMode }: { isDarkMode: boolean }) {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
//   const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [modalProduct, setModalProduct] = useState<Product | null>(null);

//   useEffect(() => {
//     async function fetchProducts() {
//       try {
//         setIsLoading(true);
//         const fetchedProducts: Product[] = await client.fetch(allProduct);
//         setProducts(fetchedProducts);
//         setFilteredProducts(fetchedProducts);
//         setIsLoading(false);
//       } catch (error) {
//         console.error("Failed to fetch products:", error);
//         setIsLoading(false);
//       }
//     }
//     fetchProducts();
//   }, []);

//   useEffect(() => {
//     const results = products.filter((product) =>
//       product.title.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredProducts(results);
//   }, [searchTerm, products]);

//   const addToCart = (product: Product) => {
//     setCart((prevCart) => {
//       const existingItem = prevCart.find((item) => item.product._id === product._id);
//       if (existingItem) {
//         return prevCart.map((item) =>
//           item.product._id === product._id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       }
//       return [...prevCart, { product, quantity: 1 }];
//     });
//   };

//   const incrementQuantity = (productId: string) => {
//     setCart((prevCart) =>
//       prevCart.map((item) =>
//         item.product._id === productId
//           ? { ...item, quantity: item.quantity + 1 }
//           : item
//       )
//     );
//   };

//   const decrementQuantity = (productId: string) => {
//     setCart((prevCart) =>
//       prevCart
//         .map((item) =>
//           item.product._id === productId
//             ? { ...item, quantity: item.quantity - 1 }
//             : item
//         )
//         .filter((item) => item.quantity > 0)
//     );
//   };

//   const openModal = (product: Product) => {
//     setModalProduct(product);
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setModalProduct(null);
//     setShowModal(false);
//   };

//   return (
//     <div className={isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-black"}>
//       {/* Search Bar */}
//       <motion.div
//         className="py-6 px-6"
//         initial={{ y: -50, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.5 }}
//       >
//         <input
//           type="text"
//           placeholder="Search for products..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="w-full px-4 py-2 border rounded shadow focus:outline-none focus:ring-2 focus:ring-teal-500"
//         />
//       </motion.div>

//       {/* Product Grid */}
//       <motion.div
//         className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6"
//         initial="hidden"
//         animate="visible"
//         variants={{
//           hidden: { opacity: 0 },
//           visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
//         }}
//       >
//         {isLoading ? (
//           <motion.div
//             className="col-span-full text-center py-16"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//           >
//             <p>Loading products...</p>
//           </motion.div>
//         ) : filteredProducts.length > 0 ? (
//           filteredProducts.map((product) => (
//             <motion.div
//               key={product._id}
//               className="border rounded-lg shadow-md overflow-hidden"
//               whileHover={{ scale: 1.05, rotate: 1 }}
//               initial={{ y: 30, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               exit={{ opacity: 0 }}
//             >
//               <div className="relative group">
//                 <Image
//                   src={urlFor(product.image).url()}
//                   alt={product.title}
//                   width={200}
//                   height={150}
//                   className="w-full h-48 object-cover"
//                 />
//                 <button
//                   onClick={() => openModal(product)}
//                   className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white font-bold transition-opacity"
//                 >
//                   Quick View
//                 </button>
//               </div>
//               <div className="p-4">
//                 <h3 className="text-lg font-bold">{product.title}</h3>
//                 <p className="text-gray-700">${product.price}</p>
//                 <motion.button
//                   whileTap={{ scale: 0.95, rotate: -2 }}
//                   onClick={() => addToCart(product)}
//                   className="mt-4 w-full bg-teal-500 text-white px-4 py-2 rounded shadow hover:bg-teal-600 transition"
//                 >
//                   Add to Cart
//                 </motion.button>
//               </div>
//             </motion.div>
//           ))
//         ) : (
//           <motion.div
//             className="col-span-full text-center py-16"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//           >
//             No products match your search.
//           </motion.div>
//         )}
//       </motion.div>

//       {/* Quick View Modal */}
//       <AnimatePresence>
//         {showModal && modalProduct && (
//           <div
//             className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
//             onClick={closeModal}
//           >
//             <motion.div
//               className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg mx-auto relative"
//               initial={{ opacity: 0, y: -50 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: 50 }}
//               onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
//             >
//               <button
//                 onClick={closeModal}
//                 className="absolute top-3 right-3 bg-gray-300 hover:bg-gray-400 rounded-full p-1"
//               >
//                 ✕
//               </button>
//               <h2 className="text-2xl font-bold mb-4">{modalProduct.title}</h2>
//               <Image
//                 src={urlFor(modalProduct.image).url()}
//                 alt={modalProduct.title}
//                 width={400}
//                 height={300}
//                 className="w-full h-64 object-cover rounded-lg mb-4"
//               />
//               <p className="text-gray-700 mb-4">{modalProduct.description}</p>
//               <div className="flex justify-between items-center">
//                 <p className="text-lg font-bold">Price: ${modalProduct.price}</p>
//                 <button
//                   onClick={() => {
//                     addToCart(modalProduct);
//                     closeModal();
//                   }}
//                   className="bg-teal-500 text-white px-4 py-2 rounded shadow hover:bg-teal-600 transition"
//                 >
//                   Add to Cart
//                 </button>
//               </div>
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>

//       {/* Cart Summary */}
//       <motion.div
//         className="fixed bottom-4 right-4 bg-white shadow-lg rounded-lg p-4 w-80"
//         initial={{ y: 100, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         whileHover={{ scale: 1.02 }}
//         transition={{ type: "spring", stiffness: 100 }}
//       >
//         <h3 className="text-lg font-bold mb-4">Cart</h3>
//         {cart.length === 0 ? (
//           <p className="text-gray-500">Your cart is empty.</p>
//         ) : (
//           <ul>
//             {cart.map((item) => (
//               <li key={item.product._id} className="flex justify-between items-center mb-2">
//                 <span>{item.product.title}</span>
//                 <div className="flex items-center gap-2">
//                   <button
//                     onClick={() => decrementQuantity(item.product._id)}
//                     className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400 transition"
//                   >
//                     -
//                   </button>
//                   <span>{item.quantity}</span>
//                   <button
//                     onClick={() => incrementQuantity(item.product._id)}
//                     className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400 transition"
//                   >
//                     +
//                   </button>
//                 </div>
//                 <span>${(item.product.price * item.quantity).toFixed(2)}</span>
//               </li>
//             ))}
//           </ul>
//         )}
//         {cart.length > 0 && (
//           <motion.p
//             className="text-lg font-bold mt-4"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//           >
//             Total: $
//             {cart.reduce(
//               (total, item) => total + item.product.price * item.quantity,
//               0
//             ).toFixed(2)}
//           </motion.p>
//         )}
//       </motion.div>
//     </div>
//   );
// }

// export default Hero;
