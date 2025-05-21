"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { Trash } from "lucide-react";
import { useCart } from "@/app/context/CartContext";
import { Product } from "@/app/types/product";

const CartPage = () => {
  const router = useRouter();
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = useCart();
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const calculatedTotal = cart.reduce((acc, product) => acc + product.price * product.quantity, 0);
    setTotalPrice(calculatedTotal);
  }, [cart]);

  const handleCheckout = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
    router.push("/checkout");
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <h1 className="text-2xl font-bold mb-4 text-center">Shopping Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-600 text-center">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((product, index) => (
            <div 
              key={product._id || `cart-product-${index}`}  
              className="flex flex-col md:flex-row items-center justify-between border-b p-4 gap-4"
            >
              <div className="flex items-center gap-4">
                {product.image ? (
                  <Image
                    src={urlFor(product.image).url()}
                    alt={product.title || "Untitled Product"}
                    width={150}
                    height={100}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                ) : (
                  <div className="w-24 h-24 bg-gray-200 flex items-center justify-center text-gray-500">
                    No Image Available
                  </div>
                )}
                <div>
                  <span className="font-semibold text-lg">{product.title || "Unknown Product"}</span>
                  <p className="text-gray-500">${(product.price ?? 0).toFixed(2)}</p>
                </div>
              </div>

              {/* Quantity Bar */}
              <div className="flex items-center gap-2 border px-3 py-1 rounded-md shadow-md bg-gray-100">
                <button
                  onClick={() => decreaseQuantity(product._id)}
                  className="px-3 py-1 bg-gray-300 text-black rounded hover:bg-gray-400"
                >
                  -
                </button>
                <input
                  type="number"
                  value={product.quantity}
                  min="1"
                  className="w-12 text-center border-none bg-transparent"
                  readOnly
                />
                <button
                  onClick={() => increaseQuantity(product._id)}
                  className="px-3 py-1 bg-gray-300 text-black rounded hover:bg-gray-400"
                >
                  +
                </button>
              </div>

              <button 
                onClick={() => removeFromCart(product._id)}
                className="text-red-500 hover:text-red-700 flex items-center gap-2"
              >
                <Trash className="w-5 h-5" /> Remove
              </button>
            </div>
          ))}

          <div className="mt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-xl font-semibold">Total: ${totalPrice.toFixed(2)}</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <button 
                onClick={clearCart} 
                className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-all"
              >
                Clear Cart
              </button>
              <button 
                onClick={handleCheckout} 
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-all"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
// "use client";

// import { useRouter } from "next/navigation";
// import { useState, useEffect } from "react";
// import Image from "next/image";
// import { urlFor } from "@/sanity/lib/image";
// import { Trash } from "lucide-react";

// import { Product } from "@/app/types/product"; // Ensure correct type import

// const CartPage = () => {
//   const router = useRouter();
//   const [cartProducts, setCartProducts] = useState<Product[]>([]);

//   // Load cart from localStorage
//   useEffect(() => {
//     const savedCart = localStorage.getItem("cart");
//     if (savedCart) {
//       try {
//         setCartProducts(JSON.parse(savedCart));
//       } catch (error) {
//         console.error("Error parsing cart from localStorage:", error);
//       }
//     }
//   }, []);

//   // Remove product from cart
//   const removeFromCart = (productId: string) => {
//     const updatedCart = cartProducts.filter((product) => product._id !== productId);
//     setCartProducts(updatedCart);
//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//   };

//   // Navigate to checkout
//   const handleCheckout = () => {
//     localStorage.setItem("cart", JSON.stringify(cartProducts)); // Save cart data
//     router.push("/checkout");
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>

//       {cartProducts.length === 0 ? (
//         <p className="text-gray-600">Your cart is empty.</p>
//       ) : (
//         <div className="space-y-4">
//           {cartProducts.map((product, index) => (
//             <div 
//               key={product._id || `cart-product-${index}`}  // Fallback to index if _id is missing
//               className="flex items-center justify-between border-b p-4"
//             >
//               {/* Product Image & Details */}
//               <div className="block p-4 cursor-pointer">
//                               {product.image ? (
//                                 <Image
//                                   src={urlFor(product.image).url()}
//                                   alt={product.title || "Untitled Product"}
//                                   width={300}
//                                   height={200}
//                                   className="w-full h-48 object-cover mb-4 rounded-md"
//                                 />
//                               ) : (
//                                 <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
//                                   No Image Available
//                                 </div>
//                 )}

//                 <div>
//                   <span className="font-semibold">{product.title || "Unknown Product"}</span>
//                   <p className="text-gray-500">${(product.price ?? 0).toFixed(2)}</p>
//                 </div>
//               </div>

//               {/* Remove Button */}
//               <button 
//                 onClick={() => removeFromCart(product._id)}
//                 className="text-red-500 hover:text-red-700 flex items-center gap-2"
//               >
//                 <Trash className="w-5 h-5" /> Remove
//               </button>
//             </div>
//           ))}

//           {/* Checkout Button */}
//           <div className="mt-6 flex justify-end">
//             <button 
//               onClick={handleCheckout} 
//               className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-all"
//             >
//               Proceed to Checkout
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CartPage;



// "use client";

// import { useRouter } from "next/navigation";
// import { useState } from "react";

// type CartItem = {
//   id: number;
//   name: string;
//   price: number;
//   quantity: number;
// };

// const CartPage = () => {
//   const router = useRouter();
//   const [cartItems] = useState<CartItem[]>([
//     { id: 1, name: "Eames Daw", price: 25, quantity: 2 },
//     { id: 2, name: "Eames Molded Fiberglass", price: 95, quantity: 1 },
//     { id: 3, name: "Eames Walnut Lounge", price: 105, quantity: 1 },
//   ]);

//   const handleCheckout = () => {
//     localStorage.setItem("cart", JSON.stringify(cartItems)); // Save cart data
//     router.push("/checkout"); // Navigate to checkout page
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
//       {cartItems.map((item) => (
//         <div key={item.id} className="flex justify-between border-b p-4">
//           <span>{item.name}</span>
//           <span>${item.price.toFixed(2)}</span>
//         </div>
//       ))}
//       <div className="mt-6">
//         <button onClick={handleCheckout} className="bg-blue-500 text-white px-4 py-2 rounded">
//           Proceed to Checkout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CartPage;
