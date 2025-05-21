// "use client";

// import React from "react";
// import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
// import { useCart } from "@/app/context/CartContext";
// import { urlFor } from "@/sanity/lib/image";
// import { useRouter } from "next/navigation";
// import { Product } from "@/app/types/product";
// import { Trash, ArrowLeft, Tag, ShoppingBag } from "lucide-react";

// function Bag() {
//   const router = useRouter();
//   const { cart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = useCart();
//   const [showDiscountCode, setShowDiscountCode] = React.useState(false);
//   const [discountCode, setDiscountCode] = React.useState("");

//   const calculateSubtotal = (): number => {
//     return cart.reduce((total, item) => total + item.price * item.quantity, 0);
//   };

//   const applyDiscount = (): number => {
//     return discountCode === "SAVE10" ? calculateSubtotal() * 0.9 : calculateSubtotal();
//   };

//   const handleCheckout = (): void => {
//     router.push("/checkout");
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, x: -50, scale: 0.8 },
//     visible: { opacity: 1, x: 0, scale: 1 },
//     exit: { opacity: 0, x: 50, scale: 0.8, transition: { duration: 0.2 } }
//   };

//   const priceUpdateVariants = {
//     pulse: { scale: [1, 1.1, 1], transition: { duration: 0.3 } }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.6 }}
//       className="container mx-auto p-4 md:p-6 lg:p-8"
//     >
//       <LayoutGroup>
//         <div className="flex justify-between items-center mb-6">
//           <motion.button
//             onClick={() => router.back()}
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
//           >
//             <ArrowLeft className="w-5 h-5" />
//             <span className="text-lg">Continue Shopping</span>
//           </motion.button>
          
//           {cart.length > 0 && (
//             <motion.div layout className="relative">
//               <motion.button
//                 onClick={clearCart}
//                 whileHover={{ scale: 1.05, rotate: [0, -5, 5, -5, 0] }}
//                 whileTap={{ scale: 0.9 }}
//                 className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-all flex items-center gap-2"
//               >
//                 <Trash className="w-5 h-5" />
//                 Clear Bag
//               </motion.button>
//             </motion.div>
//           )}
//         </div>

//         <AnimatePresence mode="popLayout">
//           {cart.length > 0 ? (
//             // Changed React Fragment to motion.div with layout
//             <motion.div layout key="cart-items">
//               <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 <AnimatePresence>
//                   {cart.map((item) => (
//                     <motion.div
//                       key={item._id}
//                       layout
//                       variants={itemVariants}
//                       initial="hidden"
//                       animate="visible"
//                       exit="exit"
//                       transition={{ type: "spring", stiffness: 300, damping: 20 }}
//                       className="bg-white rounded-lg shadow-lg p-4 flex flex-col relative group"
//                       whileHover={{ scale: 1.02, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}
//                     >
//                       {/* ... rest of item rendering ... */}
//                     </motion.div>
//                   ))}
//                 </AnimatePresence>
//               </motion.div>

//               <motion.div
//                 layout
//                 className="mt-8 bg-gray-100 p-6 rounded-xl shadow-md space-y-6"
//               >
//                 {/* ... discount code section ... */}
//               </motion.div>
//             </motion.div>
//           ) : (
//             <motion.div
//               key="empty-cart"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               className="text-center mt-20 space-y-8"
//             >
//               {/* ... empty cart content ... */}
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </LayoutGroup>
//     </motion.div>
//   );
// }

// export default Bag;













"use client";

import React from "react";
import { motion } from "framer-motion";
import { useCart } from "@/app/context/CartContext";
import { urlFor } from "@/sanity/lib/image";
import { useRouter } from "next/navigation";
import { Product } from "@/app/types/product";

function Bag() {
  const router = useRouter();
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = useCart();

  const calculateSubtotal = (): number => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleCheckout = (): void => {
    router.push("/checkout");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="container mx-auto p-4 md:p-6 lg:p-8"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Your Bag</h2>
        {cart.length > 0 && (
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="relative"
          >
            <motion.button
              onClick={clearCart}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-all"
            >
              Clear Bag
            </motion.button>
          </motion.div>
        )}
      </div>
      {cart.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cart.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg shadow-lg p-4 flex flex-col"
              >
                {item.image ? (
                  <motion.img
                    src={urlFor(item.image).url()}
                    alt={item.title}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                ) : (
                  <div className="w-full h-40 bg-gray-200 flex items-center justify-center rounded-lg mb-4">
                    No image available
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-800 mt-4 mb-4">
                    Price: ${item.price.toFixed(2)}
                  </p>
                  <div className="flex items-center gap-2">
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => decreaseQuantity(item._id)}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-2 py-1 rounded"
                      aria-label="Decrease quantity"
                    >
                      -
                    </motion.button>
                    <span className="text-gray-800 font-medium">
                      {item.quantity}
                    </span>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => increaseQuantity(item._id)}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-2 py-1 rounded"
                      aria-label="Increase quantity"
                    >
                      +
                    </motion.button>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => removeFromCart(item._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-all mt-4"
                  >
                    Remove
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 bg-gray-100 p-4 rounded-lg shadow-md flex flex-col items-center sm:items-start"
          >
            <h3 className="text-xl font-semibold text-gray-800">
              Subtotal: 
              <motion.span
                initial={{ color: "#008000" }}
                animate={{ color: ["#28a745", "#008000", "#28a745"] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                className="text-green-600 ml-2"
              >
                ${calculateSubtotal().toFixed(2)}
              </motion.span>
            </h3>
            <div className="flex gap-4 mt-4">
              <motion.button
                onClick={() => router.push("/cart")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded transition-all"
              >
                Go to Cart
              </motion.button>
              <motion.button
                onClick={handleCheckout}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded transition-all"
              >
                Checkout
              </motion.button>
            </div>
          </motion.div>
        </>
      ) : (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-gray-600 text-center mt-12"
        >
          Your bag is empty.
        </motion.p>
      )}
    </motion.div>
  );
}

export default Bag;






































// "use client";

// import React, { useState } from "react";
// import { motion } from "framer-motion";

// type Item = {
//   name: string;
//   color: string;
//   size: string;
//   quantity: number;
//   image: string;
//   price: number;
// };

// function Bag() {
//   const [items, setItems] = useState<Item[]>([
//     {
//       name: "Library Stool Chair",
//       color: "Ashen Slate/Cobalt Bliss",
//       size: "L",
//       quantity: 1,
//       image: "/Image (5).png",
//       price: 100,
//     },
//     {
//       name: "Library Stool Chair",
//       color: "Ashen Slate/Cobalt Bliss",
//       size: "L",
//       quantity: 1,
//       image: "/eee.png",
//       price: 99,
//     },
//   ]);

//   const handleRemoveItem = (index: number): void => {
//     const updatedItems = items.filter((_, i) => i !== index);
//     setItems(updatedItems);
//   };

//   const handleQuantityChange = (index: number, newQuantity: number): void => {
//     if (newQuantity > 0) {
//       const updatedItems = [...items];
//       updatedItems[index].quantity = newQuantity;
//       setItems(updatedItems);
//     }
//   };

//   const handleClearBag = (): void => {
//     setItems([]);
//   };

//   const calculateSubtotal = (): number => {
//     return items.reduce((total, item) => total + item.price * item.quantity, 0);
//   };

//   const handleCheckout = (): void => {
//     alert("Proceeding to checkout...");
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.6 }}
//       className="container mx-auto p-4 md:p-6 lg:p-8"
//     >
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-3xl font-bold text-gray-800">Your Bag</h2>
//         {items.length > 0 && (
//           <motion.div
//             initial={{ scale: 0.9 }}
//             animate={{ scale: 1 }}
//             className="relative"
//           >
//             <motion.button
//               onClick={handleClearBag}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.9 }}
//               className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-all"
//             >
//               Clear Bag
//             </motion.button>
//           </motion.div>
//         )}
//       </div>
//       {items.length > 0 ? (
//         <>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {items.map((item, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.5 }}
//                 className="bg-white rounded-lg shadow-lg p-4 flex flex-col"
//               >
//                 <motion.img
//                   src={item.image}
//                   alt={item.name}
//                   className="w-full h-40 object-cover rounded-lg mb-4"
//                   whileHover={{ scale: 1.05 }}
//                   transition={{ duration: 0.3 }}
//                 />
//                 <div className="flex-1">
//                   <h3 className="text-xl font-semibold text-gray-800 mb-2">
//                     {item.name}
//                   </h3>
//                   <p className="text-gray-600 mb-1">Color: {item.color}</p>
//                   <p className="text-gray-600 mb-4">Size: {item.size}</p>
//                   <div className="flex items-center gap-2">
//                     <motion.button
//                       whileTap={{ scale: 0.9 }}
//                       onClick={() => handleQuantityChange(index, item.quantity - 1)}
//                       className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-2 py-1 rounded"
//                       aria-label="Decrease quantity"
//                     >
//                       -
//                     </motion.button>
//                     <span className="text-gray-800 font-medium">
//                       {item.quantity}
//                     </span>
//                     <motion.button
//                       whileTap={{ scale: 0.9 }}
//                       onClick={() => handleQuantityChange(index, item.quantity + 1)}
//                       className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-2 py-1 rounded"
//                       aria-label="Increase quantity"
//                     >
//                       +
//                     </motion.button>
//                   </div>
//                   <p className="text-gray-800 mt-4 mb-4">
//                     Price: ${item.price.toFixed(2)}
//                   </p>
//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.9 }}
//                     onClick={() => handleRemoveItem(index)}
//                     className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-all"
//                   >
//                     Remove
//                   </motion.button>
//                 </div>
//               </motion.div>
//             ))}
//           </div>

//           {/* Subtotal Box */}
//           <motion.div
//             initial={{ y: 30, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//             className="mt-8 bg-gray-100 p-4 rounded-lg shadow-md flex flex-col items-center sm:items-start"
//           >
//             <h3 className="text-xl font-semibold text-gray-800">
//               Subtotal: 
//               <motion.span
//                 initial={{ color: "#008000" }}
//                 animate={{ color: ["#28a745", "#008000", "#28a745"] }}
//                 transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
//                 className="text-green-600 ml-2"
//               >
//                 ${calculateSubtotal().toFixed(2)}
//               </motion.span>
//             </h3>
//             <motion.button
//               onClick={handleCheckout}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.9 }}
//               className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded transition-all"
//             >
//               Checkout
//             </motion.button>
//           </motion.div>
//         </>
//       ) : (
//         <motion.p
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.8 }}
//           className="text-gray-600 text-center mt-12"
//         >
//           Your bag is empty.
//         </motion.p>
//       )}
//     </motion.div>
//   );
// }

// export default Bag;


































// "use client";

// import React, { useState } from "react";
// import { motion } from "framer-motion";

// const LoginPage = ({ onClose }: { onClose: () => void }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, scale: 0.8 }}
//       animate={{ opacity: 1, scale: 1 }}
//       exit={{ opacity: 0, scale: 0.8 }}
//       transition={{ duration: 0.5 }}
//       className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 mx-auto"
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
//           <img src="/google-icon.png" alt="Google" className="w-5 h-5" />
//           Sign in with Google
//         </button>
//         <button className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-lg mt-2 hover:bg-gray-100">
//           <img src="/facebook-icon.png" alt="Facebook" className="w-5 h-5" />
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

// const LoginModalButton = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   return (
//     <>
//       {/* Trigger Button */}
//       <button
//         onClick={() => setIsModalOpen(true)}
//         className="bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition-all"
//       >
//         Open Login Modal
//       </button>

//       {/* Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.3 }}
//             className="fixed inset-0 z-40"
//             onClick={() => setIsModalOpen(false)}
//           ></motion.div>
//           <div className="z-50">
//             <LoginPage onClose={() => setIsModalOpen(false)} />
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default LoginModalButton;


// import React from "react";

// const LoginPage = () => {
//   return (
//     <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-50 p-4">
//       {/* Left Section */}
//       <div className="md:w-1/2 flex flex-col items-center justify-center p-6 bg-white rounded-md shadow-md max-w-lg w-full">
//         <div className="text-center mb-6">
//           <img src="/logo.png" alt="Furniture World Logo" className="h-12 mb-4" />
//           <h2 className="text-2xl font-bold text-gray-800">Welcome back</h2>
//           <p className="text-gray-500">Please enter your details</p>
//         </div>

//         <form className="w-full">
//           <div className="mb-4">
//             <label className="block text-gray-600 font-medium mb-2">Email address</label>
//             <input
//               type="email"
//               placeholder="john@domain.com"
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-600 font-medium mb-2">Password</label>
//             <input
//               type="password"
//               placeholder="Enter your password"
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             />
//           </div>

//           <div className="flex items-center justify-between mb-4">
//             <label className="flex items-center">
//               <input type="checkbox" className="mr-2" />
//               <span className="text-gray-600">Remember me</span>
//             </label>
//             <a href="#" className="text-blue-500 hover:underline text-sm">
//               Forgot password?
//             </a>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
//           >
//             Sign In
//           </button>

//           <div className="mt-4 flex items-center justify-center gap-4">
//             <button
//               type="button"
//               className="w-full bg-gray-100 hover:bg-gray-200 text-gray-600 font-medium py-2 px-4 rounded-md flex items-center justify-center gap-2"
//             >
//               <img src="/google-icon.png" alt="Google" className="h-5" />
//               Sign in with Google
//             </button>

//             <button
//               type="button"
//               className="w-full bg-gray-100 hover:bg-gray-200 text-gray-600 font-medium py-2 px-4 rounded-md flex items-center justify-center gap-2"
//             >
//               <img src="/facebook-icon.png" alt="Facebook" className="h-5" />
//               Sign in with Facebook
//             </button>
//           </div>
//         </form>
//       </div>

//       {/* Right Section */}
//       <div className="md:w-1/2 flex items-center justify-center p-6">
//         <div className="text-center max-w-sm">
//           <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
//             Unlock a World of Furniture Delights!
//           </h1>
//           <p className="text-gray-600">
//             Discover premium furniture collections that redefine comfort and elegance.
//           </p>
//           <img
//             src="/chair-image.png"
//             alt="Chair"
//             className="mt-6 rounded-lg shadow-lg"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;


// "use client";

// import React, { useState } from "react";
// import { motion } from "framer-motion";

// type Item = {
//   name: string;
//   color: string;
//   size: string;
//   quantity: number;
//   image: string;
//   price: number;
// };

// function Bag() {
//   const [items, setItems] = useState<Item[]>([
//     {
//       name: "Library Stool Chair",
//       color: "Ashen Slate/Cobalt Bliss",
//       size: "L",
//       quantity: 1,
//       image: "/Image (5).png",
//       price: 100,
//     },
//     {
//       name: "Library Stool Chair",
//       color: "Ashen Slate/Cobalt Bliss",
//       size: "L",
//       quantity: 1,
//       image: "/eee.png",
//       price: 99,
//     },
//   ]);

//   const handleRemoveItem = (index: number): void => {
//     const updatedItems = items.filter((_, i) => i !== index);
//     setItems(updatedItems);
//   };

//   const handleQuantityChange = (index: number, newQuantity: number): void => {
//     if (newQuantity > 0) {
//       const updatedItems = [...items];
//       updatedItems[index].quantity = newQuantity;
//       setItems(updatedItems);
//     }
//   };

//   const handleClearBag = (): void => {
//     setItems([]);
//   };

//   const calculateSubtotal = (): number => {
//     return items.reduce((total, item) => total + item.price * item.quantity, 0);
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.6 }}
//       className="container mx-auto p-6"
//     >
//       <div className="flex justify-between items-center">
//         <h2 className="text-3xl font-bold mb-6 text-gray-800">Your Bag</h2>
//         {items.length > 0 && (
//           <motion.button
//             onClick={handleClearBag}
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.9 }}
//             className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-all"
//           >
//             Clear Bag
//           </motion.button>
//         )}
//       </div>
//       {items.length > 0 ? (
//         <>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {items.map((item, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.5 }}
//                 className="bg-white rounded-lg shadow-lg p-4 flex flex-col md:flex-row items-center"
//               >
//                 <motion.img
//                   src={item.image}
//                   alt={item.name}
//                   className="w-32 h-32 rounded-lg object-cover mb-4 md:mb-0 md:mr-6"
//                   whileHover={{ scale: 1.05 }}
//                   transition={{ duration: 0.3 }}
//                 />
//                 <div className="flex-1">
//                   <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
//                   <p className="text-gray-600">Color: {item.color}</p>
//                   <p className="text-gray-600">Size: {item.size}</p>
//                   <div className="flex items-center gap-2 mt-4">
//                     <motion.button
//                       whileTap={{ scale: 0.9 }}
//                       onClick={() => handleQuantityChange(index, item.quantity - 1)}
//                       className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-2 py-1 rounded"
//                       aria-label="Decrease quantity"
//                     >
//                       -
//                     </motion.button>
//                     <span className="text-gray-800 font-medium">{item.quantity}</span>
//                     <motion.button
//                       whileTap={{ scale: 0.9 }}
//                       onClick={() => handleQuantityChange(index, item.quantity + 1)}
//                       className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-2 py-1 rounded"
//                       aria-label="Increase quantity"
//                     >
//                       +
//                     </motion.button>
//                   </div>
//                   <p className="text-gray-800 mt-4">Price: ${item.price.toFixed(2)}</p>
//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.9 }}
//                     onClick={() => handleRemoveItem(index)}
//                     className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-all"
//                   >
//                     Remove
//                   </motion.button>
//                 </div>
//               </motion.div>
//             ))}
//           </div>

//           {/* Subtotal Box Animation */}
//           <motion.div
//             initial={{ y: 30, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//             className="mt-8 bg-gray-100 p-4 rounded-lg shadow-md"
//           >
//             <h3 className="text-xl font-semibold text-gray-800">
//               Subtotal:{" "}
//               <motion.span
//                 initial={{ color: "#008000" }}
//                 animate={{ color: ["#28a745", "#008000", "#28a745"] }}
//                 transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
//                 className="text-green-600"
//               >
//                 ${calculateSubtotal().toFixed(2)}
//               </motion.span>
//             </h3>
//           </motion.div>
//         </>
//       ) : (
//         <motion.p
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.8 }}
//           className="text-gray-600 text-center mt-12"
//         >
//           Your bag is empty.
//         </motion.p>
//       )}
//     </motion.div>
//   );
// }

// export default Bag;


// "use client";

// import React, { useState } from "react";
// import { motion } from "framer-motion";

// type Item = {
//   name: string;
//   color: string;
//   size: string;
//   quantity: number;
//   image: string;
//   price: number;
// };

// function Bag() {
//   const [items, setItems] = useState<Item[]>([
//     {
//       name: "Library Stool Chair",
//       color: "Ashen Slate/Cobalt Bliss",
//       size: "L",
//       quantity: 1,
//       image: "/Image (5).png",
//       price: 100,
//     },
//     {
//       name: "Library Stool Chair",
//       color: "Ashen Slate/Cobalt Bliss",
//       size: "L",
//       quantity: 1,
//       image: "/eee.png",
//       price: 99,
//     },
//   ]);

//   const handleRemoveItem = (index: number): void => {
//     const updatedItems = items.filter((_, i) => i !== index);
//     setItems(updatedItems);
//   };

//   const handleQuantityChange = (index: number, newQuantity: number): void => {
//     if (newQuantity > 0) {
//       const updatedItems = [...items];
//       updatedItems[index].quantity = newQuantity;
//       setItems(updatedItems);
//     }
//   };

//   const calculateSubtotal = (): number => {
//     return items.reduce((total, item) => total + item.price * item.quantity, 0);
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.6 }}
//       className="container mx-auto p-6"
//     >
//       <h2 className="text-3xl font-bold mb-6 text-gray-800">Your Bag</h2>
//       {items.length > 0 ? (
//         <>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {items.map((item, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.5 }}
//                 className="bg-white rounded-lg shadow-lg p-4 flex flex-col md:flex-row items-center"
//               >
//                 <motion.img
//                   src={item.image}
//                   alt={item.name}
//                   className="w-32 h-32 rounded-lg object-cover mb-4 md:mb-0 md:mr-6"
//                   whileHover={{ scale: 1.05 }}
//                   transition={{ duration: 0.3 }}
//                 />
//                 <div className="flex-1">
//                   <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
//                   <p className="text-gray-600">Color: {item.color}</p>
//                   <p className="text-gray-600">Size: {item.size}</p>
//                   <div className="flex items-center gap-2 mt-4">
//                     <motion.button
//                       whileTap={{ scale: 0.9 }}
//                       onClick={() => handleQuantityChange(index, item.quantity - 1)}
//                       className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-2 py-1 rounded"
//                       aria-label="Decrease quantity"
//                     >
//                       -
//                     </motion.button>
//                     <span className="text-gray-800 font-medium">{item.quantity}</span>
//                     <motion.button
//                       whileTap={{ scale: 0.9 }}
//                       onClick={() => handleQuantityChange(index, item.quantity + 1)}
//                       className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-2 py-1 rounded"
//                       aria-label="Increase quantity"
//                     >
//                       +
//                     </motion.button>
//                   </div>
//                   <p className="text-gray-800 mt-4">Price: ${item.price.toFixed(2)}</p>
//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.9 }}
//                     onClick={() => handleRemoveItem(index)}
//                     className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-all"
//                   >
//                     Remove
//                   </motion.button>
//                 </div>
//               </motion.div>
//             ))}
//           </div>

//           {/* Subtotal Box Animation */}
//           <motion.div
//             initial={{ y: 30, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//             className="mt-8 bg-gray-100 p-4 rounded-lg shadow-md"
//           >
//             <h3 className="text-xl font-semibold text-gray-800">
//               Subtotal:{" "}
//               <motion.span
//                 initial={{ color: "#008000" }}
//                 animate={{ color: ["#28a745", "#008000", "#28a745"] }}
//                 transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
//                 className="text-green-600"
//               >
//                 ${calculateSubtotal().toFixed(2)}
//               </motion.span>
//             </h3>
//           </motion.div>
//         </>
//       ) : (
//         <motion.p
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.8 }}
//           className="text-gray-600 text-center mt-12"
//         >
//           Your bag is empty.
//         </motion.p>
//       )}
//     </motion.div>
//   );
// }

// export default Bag;









// "use client"; // Add this at the top to enable client-side rendering

// import React, { useState } from "react";

// type Item = {
//   name: string;
//   color: string;
//   size: string;
//   quantity: number;
//   image: string;
//   price: number;
// };

// function Bag() {
//   const [items, setItems] = useState<Item[]>([
//     {
//       name: "Library Stool Chair",
//       color: "Ashen Slate/Cobalt Bliss",
//       size: "L",
//       quantity: 1,
//       image: "/Image (5).png",
//       price: 100,
//     },
//     {
//       name: "Library Stool Chair",
//       color: "Ashen Slate/Cobalt Bliss",
//       size: "L",
//       quantity: 1,
//       image: "/eee.png",
//       price: 99,
//     },
//   ]);

//   const handleRemoveItem = (index: number): void => {
//     const updatedItems = items.filter((_, i) => i !== index);
//     setItems(updatedItems);
//   };

//   const handleQuantityChange = (index: number, newQuantity: number): void => {
//     if (newQuantity > 0) {
//       const updatedItems = [...items];
//       updatedItems[index].quantity = newQuantity;
//       setItems(updatedItems);
//     }
//   };

//   const calculateSubtotal = (): number => {
//     return items.reduce((total, item) => total + item.price * item.quantity, 0);
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <h2 className="text-3xl font-bold mb-6 text-gray-800">Your Bag</h2>
//       {items.length > 0 ? (
//         <>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {items.map((item, index) => (
//               <div
//                 key={index}
//                 className="bg-white rounded-lg shadow-lg p-4 flex flex-col md:flex-row items-center"
//               >
//                 <img
//                   src={item.image}
//                   alt={item.name}
//                   className="w-32 h-32 rounded-lg object-cover mb-4 md:mb-0 md:mr-6"
//                 />
//                 <div className="flex-1">
//                   <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
//                   <p className="text-gray-600">Color: {item.color}</p>
//                   <p className="text-gray-600">Size: {item.size}</p>
//                   <div className="flex items-center gap-2 mt-4">
//                     <button
//                       onClick={() => handleQuantityChange(index, item.quantity - 1)}
//                       className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-2 py-1 rounded"
//                     >
//                       -
//                     </button>
//                     <span className="text-gray-800 font-medium">{item.quantity}</span>
//                     <button
//                       onClick={() => handleQuantityChange(index, item.quantity + 1)}
//                       className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-2 py-1 rounded"
//                     >
//                       +
//                     </button>
//                   </div>
//                   <p className="text-gray-800 mt-4">Price: ${item.price.toFixed(2)}</p>
//                   <button
//                     onClick={() => handleRemoveItem(index)}
//                     className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
//                   >
//                     Remove
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div className="mt-8 bg-gray-100 p-4 rounded-lg shadow-md">
//             <h3 className="text-xl font-semibold text-gray-800">
//               Subtotal: <span className="text-green-600">${calculateSubtotal().toFixed(2)}</span>
//             </h3>
//           </div>
//         </>
//       ) : (
//         <p className="text-gray-600 text-center mt-12">Your bag is empty.</p>
//       )}
//     </div>
//   );
// }

// export default Bag;





// import React from 'react';
// import { motion } from 'framer-motion';

// const Newsletter = () => {
//   return (
//     <motion.div
//       id="AF"
//       className="bg-gradient-to-r from-blue-50 to-blue-100 p-12 mt-[150px] rounded-3xl shadow-2xl max-w-5xl mx-auto"
//       initial={{ opacity: 0, scale: 0.8 }}
//       animate={{ opacity: 1, scale: 1 }}
//       transition={{ duration: 1 }}
//     >
//       {/* Header Section */}
//       <motion.header
//         className="text-center mb-10"
//         initial={{ opacity: 0, y: -30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8, delay: 0.2 }}
//       >
//         <h1 className="text-5xl font-bold text-gray-800">Stay Updated!</h1>
//         <p className="text-lg text-gray-600 mt-4">Get exclusive deals, product updates, and more delivered to your inbox.</p>
//       </motion.header>

//       {/* Email Input Section */}
//       <motion.div
//         id="AH"
//         className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-10"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8, delay: 0.4 }}
//       >
//         <motion.input
//           type="email"
//           placeholder="Enter your email..."
//           id="AI"
//           className="border border-gray-300 rounded-lg px-6 py-4 w-full sm:w-auto focus:outline-none focus:ring-4 focus:ring-blue-500 transition-transform"
//           whileFocus={{ scale: 1.05 }}
//         />
//         <motion.button
//           id="AJ"
//           whileHover={{ scale: 1.1, rotate: 1 }}
//           whileTap={{ scale: 0.95 }}
//           className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg shadow-lg transition-all"
//         >
//           Subscribe
//         </motion.button>
//       </motion.div>

//       {/* Instagram Section */}
//       <motion.div
//         className="text-center mb-10"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8, delay: 0.6 }}
//       >
//         <h2 className="text-3xl font-bold text-gray-800">Explore Us on Instagram</h2>
//         <p className="text-gray-600 mt-3">Follow our journey and get inspired.</p>

//         {/* Go To Button */}
//         <motion.button
//           className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all"
//           whileHover={{ scale: 1.1 }}
//           whileTap={{ scale: 0.95 }}
//           onClick={() => window.open('https://www.instagram.com', '_blank')}
//         >
//           Go To
//         </motion.button>
//       </motion.div>

//       {/* Image Gallery Section */}
//       <motion.div
//         id="AL"
//         className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 mb-10"
//         initial="hidden"
//         animate="visible"
//         variants={{
//           hidden: { opacity: 0, y: 50 },
//           visible: {
//             opacity: 1,
//             y: 0,
//             transition: { staggerChildren: 0.3, delayChildren: 0.8 },
//           },
//         }}
//       >
//         {[
//           { id: 'Chair1', src: '/download (1).jpeg', tag: ' Sofa Set' },
//           { id: 'Chair2', src: '/download.jpg', tag: 'Classic Bed Set' },
//           { id: 'Chair3', src: '/download (4).jpeg', tag: 'Dining Table' },
//           { id: 'Chair4', src: '/Cozy Chair.jpg', tag: 'Cozy Chair' },
//           { id: 'Chair5', src: '/Round Dining Table.avif', tag: ' Round Table' },
//           { id: 'Chair6', src: '/d.webp', tag: 'Minimalist Chair' },
//         ].map(({ id, src, tag }) => (
//           <motion.div
//             key={id}
//             className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-xl"
//             whileHover={{ scale: 1.05 }}
//             transition={{ duration: 0.4 }}
//           >
//             <motion.img
//               src={src}
//               alt={tag}
//               id={id}
//               className="object-cover w-full h-full transition-transform duration-500"
//             />
//             <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition duration-300 flex items-center justify-center">
//               <motion.p
//                 className="text-white text-lg font-bold opacity-0 group-hover:opacity-100"
//                 whileHover={{ scale: 1.2 }}
//               >
//                 {tag}
//               </motion.p>
//             </div>
//           </motion.div>
//         ))}
//       </motion.div>

//       {/* Popular Furniture Section */}
//       <motion.div
//         className="text-center mb-10"
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8, delay: 0.7 }}
//       >
//         <h2 className="text-3xl font-bold text-gray-800 mb-6">Popular Furniture</h2>
//         <p className="text-gray-600 mb-8">Browse some of our best-selling furniture pieces below.</p>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           {[
//             { id: 'Furniture1', src: '/download (3).jpg', tag: 'Earthly Elegance', price: '$399.99' },
//             { id: 'Furniture2', src: '/images.jpg', tag: 'Cloud Nine', price: '$249.99' },
//             { id: 'Furniture3', src: '/images.jpeg', tag: 'Sofa chairs', price: '$99.99' },
//             { id: 'Furniture4', src: '/download (1).jpg', tag: 'Moonlit Haven', price: '$499.99' },
//           ].map(({ id, src, tag, price }) => (
//             <motion.div
//               key={id}
//               className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-2 transition-all"
//               whileHover={{ scale: 1.05 }}
//               transition={{ duration: 0.5 }}
//             >
//               <img
//                 src={src}
//                 alt={tag}
//                 className="rounded-md mb-4 w-full"
//               />
//               <h3 className="text-xl font-semibold text-gray-700">{tag}</h3>
//               <p className="text-gray-600 mt-2">{price}</p>
//             </motion.div>
//           ))}
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// };

// export default Newsletter;
// ;

