// "use client"

// // src/components/FeaturedProducts.js
// import React, { useState, useEffect } from "react";
// import {client} from "../sanity/lib/client";

// const FeaturedProducts = () => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const query = `*[_type == "products"][0..4]{
//         _id,
//         title,
//         price,
//         "imageUrl": image.asset->url,
//       }`;
//       const data = await client .fetch(query);
//       setProducts(data);
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="container mx-auto py-12 mt-[150px] px-4">
//       {/* Header Section */}
//       <div className="flex justify-between items-center mb-8">
//         <h2 className="text-3xl font-bold">FEATURED PRODUCTS</h2>
//         <a
//           href="/products"
//           className="text-blue-500 hover:underline transition-colors duration-300"
//         >
//           View all
//         </a>
//       </div>

//       {/* Products Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
//         {products.map((product) => (
//           <div
//             key={product._id}
//             className="bg-white rounded-lg shadow-md p-4 transition-transform duration-300 hover:scale-105 hover:shadow-lg"
//           >
//             <img
//               src={product.imageUrl}
//               alt={product.title}
//               className="w-full h-48 object-cover rounded-lg mb-4"
//             />
//             <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
//             <p className="text-gray-600 mb-4">${product.price}</p>
//             <a
//               href={`/product/${product._id}`} // Link to individual product page
//               className="block text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors duration-300"
//             >
//               View Details
//             </a>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default FeaturedProducts;
