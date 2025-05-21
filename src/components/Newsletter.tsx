import React, { useState } from "react";

const products = [
  { src: "/download (1).jpeg", name: "Classic Comfort", price: 120 },
  { src: "/Elite Luxe.jpeg", name: "Elite Luxe", price: 150 },
  { src: "/download (3).jpeg", name: "Urban Haven", price: 200 },
  { src: "/download (4).jpeg", name: "Cozy Nest", price: 180 },
  { src: "/images (2).jpeg", name: "Serene Style", price: 140 },
  { src: "/images (1).jpeg", name: "Royal Retreat", price: 160 },
];

type Product = {
  src: string;
  name: string;
  price: number;
};

type CartItem = {
  product: Product;
  quantity: number;
};

const Newsletter = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);

  // Add Product to Cart
  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.product.name === product.name);
      if (existingItem) {
        return prevCart.map((item) =>
          item.product.name === product.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
  };

  // Remove Product from Cart
  const removeFromCart = (product: Product) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.product.name === product.name
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Close Product Modal
  const closeModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="bg-gray-100 p-6 sm:p-10 mt-10">
      <h2 className="text-center text-3xl font-bold mb-6">
        Subscribe to Our Newsletter
      </h2>

      <div className="flex flex-col sm:flex-row items-center gap-4 max-w-3xl mx-auto">
        <input
          type="email"
          placeholder="Enter your email address..."
          className="flex-1 border border-gray-300 rounded-md px-4 py-3 focus:ring-2 focus:ring-blue-500 transition-transform duration-300 transform hover:scale-105"
        />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md transition-transform duration-300 transform hover:scale-110 shadow-md">
          Subscribe
        </button>
      </div>

      <h3 className="text-center text-2xl font-bold mt-10">
        Explore Our Products
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-6 px-4">
        {products.map((product, index) => (
          <div
            key={index}
            className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105"
          >
            <img
              src={product.src}
              alt={product.name}
              className="rounded-lg object-cover w-full h-40 md:h-48"
            />
            <div
              className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
              onClick={() => setSelectedProduct(product)}
            >
              <span className="text-white font-bold text-sm">{product.name}</span>
              <span className="text-white text-xs mt-1">${product.price.toFixed(2)}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product);
                }}
                className="mt-2 bg-teal-500 hover:bg-teal-600 text-white px-4 py-1 rounded-md text-xs"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative bg-white rounded-lg p-6 shadow-xl w-96">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 font-bold text-xl"
            >
              ✕
            </button>
            <img
              src={selectedProduct.src}
              alt={selectedProduct.name}
              className="w-full h-auto rounded-lg mb-4"
            />
            <h3 className="text-lg font-bold">{selectedProduct.name}</h3>
            <p className="text-gray-600 mt-2">${selectedProduct.price.toFixed(2)}</p>
            <button
              onClick={() => {
                addToCart(selectedProduct);
                closeModal();
              }}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md"
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}

      <div className="mt-10 p-4 bg-white shadow-md rounded-lg max-w-3xl mx-auto">
        <h3 className="text-xl font-bold">Your Cart</h3>
        {cart.length === 0 ? (
          <p className="text-gray-600 mt-2">Your cart is empty.</p>
        ) : (
          <ul className="mt-4 space-y-4">
            {cart.map((item, index) => (
              <li key={index} className="flex justify-between items-center border-b py-2">
                <span>{item.product.name}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => removeFromCart(item.product)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-xs"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => addToCart(item.product)}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-xs"
                  >
                    +
                  </button>
                </div>
                <span>${(item.product.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Newsletter;

// import React, { useState } from "react";

// type Product = {
//   src: string;
//   name: string;
//   price: number;
// };

// type CartItem = {
//   product: Product;
//   quantity: number;
// };

// const Newsletter = () => {
//   const [selectedImage, setSelectedImage] = useState<Product | null>(null); // State to track selected product
//   const [cart, setCart] = useState<CartItem[]>([]); // State to manage cart

//   const products: Product[] = [
//     { src: "/download (1).jpeg", name: "Classic Comfort", price: 120 },
//     { src: "/Elite Luxe.jpeg", name: "Elite Luxe", price: 150 },
//     { src: "/Elegant Edge.jpeg", name: "Elegant Edge", price: 200 },
//     { src: "/Alyxa Sofa.webp", name: "Alyxa Sofa", price: 180 },
//     { src: "/images (2).jpeg", name: "Serene Style", price: 140 },
//     { src: "/images (1).jpeg", name: "Royal Retreat", price: 160 },
//   ];

//   // Add to Cart Function
//   const addToCart = (product: Product) => {
//     setCart((prevCart) => {
//       const existingItem = prevCart.find((item) => item.product.name === product.name);
//       if (existingItem) {
//         return prevCart.map((item) =>
//           item.product.name === product.name
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       }
//       return [...prevCart, { product, quantity: 1 }];
//     });
//   };

//   // Remove from Cart Function
//   const removeFromCart = (product: Product) => {
//     setCart((prevCart) =>
//       prevCart
//         .map((item) =>
//           item.product.name === product.name
//             ? { ...item, quantity: item.quantity - 1 }
//             : item
//         )
//         .filter((item) => item.quantity > 0)
//     );
//   };

//   // Close Modal Function
//   const closeModal = () => {
//     setSelectedImage(null);
//   };

//   return (
//     <div className="bg-gray-100 p-6 sm:p-10 mt-10 animate-fadeIn">
//       {/* Title */}
//       <h2 className="text-center text-2xl sm:text-3xl font-bold mb-6">
//         Subscribe to the Newsletter
//       </h2>

//       {/* Subscription Form */}
//       <div className="flex flex-col sm:flex-row items-center gap-4 max-w-3xl mx-auto animate-slideIn">
//         <input
//           type="email"
//           placeholder="Enter your email address..."
//           className="flex-1 border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform duration-300 transform hover:scale-105"
//           aria-label="Email Address"
//         />
//         <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md transition-all duration-300 transform hover:scale-110 shadow-md">
//           SUBSCRIBE
//         </button>
//       </div>

//       {/* Instagram Section */}
//       <h3 className="text-center text-xl sm:text-2xl font-bold mt-10">
//         Explore Products and Discounts on Instagram
//       </h3>

//       {/* Instagram Images */}
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-6 px-4">
//         {products.map((product, index) => (
//           <div
//             key={index}
//             className="relative group overflow-hidden rounded-md shadow-md hover:shadow-lg transition-all"
//           >
//             <img
//               src={product.src}
//               alt={product.name}
//               className="rounded-md object-cover w-full h-40 md:h-48 transition-transform duration-300 transform hover:scale-110"
//             />
//             {/* Hover Effect */}
//             <div
//               onClick={() => setSelectedImage(product)} // Open modal with clicked product
//               className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
//             >
//               <span className="text-white font-bold text-sm">{product.name}</span>
//               <span className="text-white text-xs mt-1">
//                 ${product.price.toFixed(2)}
//               </span>
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation(); // Prevent modal from opening when clicking the button
//                   addToCart(product);
//                 }}
//                 className="mt-2 bg-teal-500 hover:bg-teal-600 text-white px-4 py-1 rounded-md text-xs"
//               >
//                 Add to Cart
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Modal for Selected Image */}
//       {selectedImage && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
//           <div className="relative bg-white rounded-lg p-6 shadow-lg max-w-3xl w-full">
//             {/* Close Button */}
//             <button
//               onClick={closeModal}
//               className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 font-bold text-xl"
//             >
//               ✕
//             </button>
//             {/* Image and Details */}
//             <div className="flex flex-col items-center">
//               <img
//                 src={selectedImage.src}
//                 alt={selectedImage.name}
//                 className="w-full h-auto rounded-md"
//               />
//               <h3 className="text-lg font-bold mt-4">{selectedImage.name}</h3>
//               <p className="text-gray-600 mt-2">
//                 ${selectedImage.price.toFixed(2)}
//               </p>
//               <button
//                 onClick={() => addToCart(selectedImage)}
//                 className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md"
//               >
//                 Add to Cart
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Cart Summary */}
//       <div className="mt-10 p-4 bg-white shadow-md rounded-lg max-w-3xl mx-auto">
//         <h3 className="text-xl font-bold">Cart Summary</h3>
//         {cart.length === 0 ? (
//           <p className="text-gray-600 mt-2">Your cart is empty.</p>
//         ) : (
//           <ul className="mt-4 space-y-4">
//             {cart.map((item, index) => (
//               <li
//                 key={index}
//                 className="flex justify-between items-center border-b py-2"
//               >
//                 <span>{item.product.name}</span>
//                 <div className="flex items-center gap-2">
//                   <button
//                     onClick={() => removeFromCart(item.product)}
//                     className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-xs"
//                   >
//                     -
//                   </button>
//                   <span>{item.quantity}</span>
//                   <button
//                     onClick={() => addToCart(item.product)}
//                     className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-xs"
//                   >
//                     +
//                   </button>
//                 </div>
//                 <span>${(item.product.price * item.quantity).toFixed(2)}</span>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Newsletter;















// import React from "react";

// const Newsletter = () => {
//   return (
//     <div id="S" className="bg-gray-100 p-10 mt-[150px] animate-fadeIn">
//       {/* Title */}
//       <h2
//         id="T"
//         className="text-2xl font-bold mb-4 transition-opacity duration-1000 opacity-0 animate-fadeInDelay"
//       >
//         Or Subscribe To The Newsletter
//       </h2>

//       {/* Subscription Form */}
//       <div
//         id="U"
//         className="flex flex-col md:flex-row items-center gap-4 animate-fadeIn"
//       >
//         <input
//           type="email"
//           placeholder="Email Address..."
//           id="V"
//           className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform duration-300 transform hover:scale-105"
//           aria-label="Email Address"
//         />
//         <button
//           id="W"
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md transition-all duration-300 transform hover:scale-110"
//         >
//           SUBMIT
//         </button>
//       </div>

//       {/* Instagram Section */}
//       <h3
//         id="X"
//         className="text-xl font-bold mt-8 transition-opacity duration-1000 opacity-0 animate-fadeInDelay"
//       >
//         Follow Products And Discounts On Instagram
//       </h3>

//       {/* Instagram Images */}
//       <div
//         id="Y"
//         className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mt-4 animate-fadeInDelay"
//       >
//         {["/download (1).jpeg", "/download (2).jpeg", "/download (3).jpeg", "/download (4).jpeg", "/images (2).jpeg", "/images (1).jpeg"].map(
//           (src, index) => (
//             <img
//               key={index}
//               src={src}
//               alt={`Chair ${index + 1}`}
//               id={`img-${index}`}
//               className="rounded-md object-cover w-full transition-transform duration-300 transform hover:scale-110 hover:shadow-lg"
//             />
//           )
//         )}
//       </div>
//     </div>
//   );
// };

// export default Newsletter;

// import React from "react";

// const Newsletter = () => {
//   return (
//     <div id="S" className="bg-gray-100 p-10 mt-[150px]">
//       {/* Title */}
//       <h2 id="T" className="text-2xl font-bold mb-4">
//         Or Subscribe To The Newsletter
//       </h2>

//       {/* Subscription Form */}
//       <div id="U" className="flex flex-col md:flex-row items-center gap-4">
//         <input
//           type="email"
//           placeholder="Email Address..."
//           id="V"
//           className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           aria-label="Email Address"
//         />
//         <button
//           id="W"
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md transition-all duration-300"
//         >
//           SUBMIT
//         </button>
//       </div>

//       {/* Instagram Section */}
//       <h3 id="X" className="text-xl font-bold mt-8">
//         Follow Products And Discounts On Instagram
//       </h3>

//       {/* Instagram Images */}
//       <div id="Y" className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mt-4">
//         <img
//           src="/download (1).jpeg"
//           alt="Chair 1"
//           id="Z"
//           className="rounded-md object-cover w-full"
//         />
//         <img
//           src="/download (2).jpeg"
//           alt="Chair 2"
//           id="AA"
//           className="rounded-md object-cover w-full"
//         />
//         <img
//           src="/download (3).jpeg"
//           alt="Chair 3"
//           id="AB"
//           className="rounded-md object-cover w-full"
//         />
//         <img
//           src="/download (4).jpeg"
//           alt="Chair 4"
//           id="AC"
//           className="rounded-md object-cover w-full"
//         />
//         <img
//           src="/images (2).jpeg"
//           alt="Chair 5"
//           id="AD"
//           className="rounded-md object-cover w-full"
//         />
//         <img
//           src="/images (1).jpeg"
//           alt="Chair 6"
//           id="AE"
//           className="rounded-md object-cover w-full"
//         />
//       </div>
//     </div>
//   );
// };

// export default Newsletter;

// // import React from 'react'; 

// // const Newsletter = () => {
// //   return (
// //     <div id="S" className="bg-gray-100 p-10 mt-[150px]">
// //       <h2 id="T" className="text-2xl font-bold mb-4">Or Subscribe To The Newsletter</h2>
// //       <div id="U" className="flex items-center">
// //         <input
// //           type="email"
// //           placeholder="Email Address..."
// //           id="V"
// //           className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
// //         />
// //         <button id="W" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md ml-4">
// //           SUBMIT
// //         </button>
// //       </div>
// //       <h3 id="X" className="text-xl font-bold mt-8">Follow Products And Discounts On Instagram</h3>
// //       <div id="Y" className="grid grid-cols-6 gap-4 mt-4">
// //         <img
// //           src="/eee.pngnpm run dev
// //           "
// //           alt="Chair 1"
// //           id="Z"
// //           className="rounded-md"
// //         />
// //         <img
// //           src="/Image (8).png"
// //           alt="Chair 2"
// //           id="AA"
// //           className="rounded-md"
// //         />
// //         <img
// //           src="/Image (1).png"
// //           alt="Chair 3"
// //           id="AB"
// //           className="rounded-md"
// //         />
// //         <img
// //           src="/Image (2).png"
// //           alt="Chair 4"
// //           id="AC"
// //           className="rounded-md"
// //         />
// //         <img
// //           src="/Image (4).png"
// //           alt="Chair 5"
// //           id="AD"
// //           className="rounded-md"
// //         />
// //         <img
// //           src="/Image (6).png"
// //           alt="Chair 6"
// //           id="AE"
// //           className="rounded-md"
// //         />
// //       </div>
// //     </div>
// //   );
// // };

// // export default Newsletter;
