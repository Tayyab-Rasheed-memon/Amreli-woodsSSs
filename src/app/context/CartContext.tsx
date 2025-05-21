







//                 Main code
"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product } from "@/app/types/product";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

type CartItem = Product & { quantity: number };

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart from localStorage on initial render
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error("Error loading cart:", error);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add product to cart
  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item._id === product._id);
      if (existingItem) {
        return prevCart.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }]; // Ensure quantity is initialized to 1
      }
    });
  };

  // Increase product quantity
  const increaseQuantity = (productId: string) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Decrease product quantity
  const decreaseQuantity = (productId: string) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item._id === productId ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
        )
        .filter((item) => item.quantity > 0) // Ensure no 0 quantity items
    );
  };

  // Remove product from cart
  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
  };

  // Clear the entire cart
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart }}
    >
      {children}

      {/* Floating Cart Button */}
      <AnimatePresence>
        {cart.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="fixed bottom-8 right-8 bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-3"
          >
            <Link href="/cart" className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              <span>
                {cart.reduce((total, item) => total + (item.quantity || 0), 0)} item
                {cart.reduce((total, item) => total + (item.quantity || 0), 0) > 1 ? "s" : ""} in
                cart
              </span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </CartContext.Provider>
  );
}

// Export the useCart hook
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}





// "use client";

// import { createContext, useContext, useState, useEffect, ReactNode } from "react";
// import { Product } from "@/app/types/product";
// import { motion, AnimatePresence } from "framer-motion";
// import Link from "next/link";
// import { ShoppingCart } from "lucide-react";

// type CartItem = Product & { quantity: number };

// type CartContextType = {
//   cart: CartItem[];
//   addToCart: (product: Product) => void;
//   removeFromCart: (productId: string) => void;
//   increaseQuantity: (productId: string) => void;
//   decreaseQuantity: (productId: string) => void;
//   clearCart: () => void;
// };

// const CartContext = createContext<CartContextType | undefined>(undefined);

// export function CartProvider({ children }: { children: ReactNode }) {
//   const [cart, setCart] = useState<CartItem[]>([]);

//   // Load cart from localStorage on initial render
//   useEffect(() => {
//     try {
//       const savedCart = localStorage.getItem("cart");
//       if (savedCart) {
//         setCart(JSON.parse(savedCart));
//       }
//     } catch (error) {
//       console.error("Error loading cart:", error);
//     }
//   }, []);

//   // Save cart to localStorage whenever it changes
//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(cart));
//   }, [cart]);

//   // Add product to cart
//   const addToCart = (product: Product) => {
//     setCart((prevCart) => {
//       const existingItem = prevCart.find((item) => item._id === product._id);
//       if (existingItem) {
//         return prevCart.map((item) =>
//           item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
//         );
//       } else {
//         return [...prevCart, { ...product, quantity: 1 }]; // Ensure quantity is initialized to 1
//       }
//     });
//   };

//   // Increase product quantity
//   const increaseQuantity = (productId: string) => {
//     setCart((prevCart) =>
//       prevCart.map((item) =>
//         item._id === productId ? { ...item, quantity: item.quantity + 1 } : item
//       )
//     );
//   };

//   // Decrease product quantity
//   const decreaseQuantity = (productId: string) => {
//     setCart((prevCart) =>
//       prevCart
//         .map((item) =>
//           item._id === productId ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
//         )
//         .filter((item) => item.quantity > 0) // Ensure no 0 quantity items
//     );
//   };

//   // Remove product from cart
//   const removeFromCart = (productId: string) => {
//     setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
//   };

//   // Clear the entire cart
//   const clearCart = () => {
//     setCart([]);
//   };

//   return (
//     <CartContext.Provider
//       value={{ cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart }}
//     >
//       {children}

//       {/* Floating Cart Button */}
//       <AnimatePresence>
//         {cart.length > 0 && (
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.9 }}
//             transition={{ duration: 0.5 }}
//             className="fixed bottom-8 right-8 bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-3"
//           >
//             <Link href="/cart" className="flex items-center gap-2">
//               <ShoppingCart className="w-5 h-5" />
//               <span>
//                 {cart.reduce((total, item) => total + (item.quantity || 0), 0)} item
//                 {cart.reduce((total, item) => total + (item.quantity || 0), 0) > 1 ? "s" : ""} in
//                 cart
//               </span>
//             </Link>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </CartContext.Provider>
//   );
// }

// export function useCart() {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error("useCart must be used within a CartProvider");
//   }
//   return context;
// }





















// "use client";

// import { createContext, useContext, useState, useEffect, ReactNode } from "react";
// import { Product } from "@/app/types/product";

// type CartItem = Product & { quantity: number };

// type CartContextType = {
//   cart: CartItem[];
//   addToCart: (product: Product) => void;
//   removeFromCart: (productId: string) => void;
//   clearCart: () => void;
// };

// const CartContext = createContext<CartContextType | undefined>(undefined);

// export function CartProvider({ children }: { children: ReactNode }) {
//   const [cart, setCart] = useState<CartItem[]>([]);

//   // Load cart from localStorage
//   useEffect(() => {
//     const savedCart = localStorage.getItem("cart");
//     if (savedCart) {
//       setCart(JSON.parse(savedCart));
//     }
//   }, []);

//   // Save cart to localStorage whenever it changes
//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(cart));
//   }, [cart]);

//   // Add product to cart
//   const addToCart = (product: Product) => {
//     setCart((prevCart) => {
//       const existingItem = prevCart.find((item) => item._id === product._id);
//       if (existingItem) {
//         return prevCart.map((item) =>
//           item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
//         );
//       } else {
//         return [...prevCart, { ...product, quantity: 1 }];
//       }
//     });
//   };

//   // Remove product from cart
//   const removeFromCart = (productId: string) => {
//     setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
//   };

//   // Clear the entire cart
//   const clearCart = () => {
//     setCart([]);
//   };

//   return (
//     <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// }

// export function useCart() {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error("useCart must be used within a CartProvider");
//   }
//   return context;
// }
