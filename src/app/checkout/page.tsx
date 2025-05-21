// "use client";

// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { FaCcVisa, FaCcMastercard, FaCcAmex, FaPaypal, FaBitcoin } from "react-icons/fa";
// import { SiCoinbase, SiKlarna } from "react-icons/si";
// import Link from "next/link";
// import { jsPDF } from "jspdf"; // Import jsPDF for PDF generation

// export type CartItem = {
//   _id: string;
//   title: string;
//   price: number;
//   quantity: number;
//   image: string;
// };

// const CheckoutPage = () => {
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);
//   const [selectedPayment, setSelectedPayment] = useState("");
//   const [billingAddress, setBillingAddress] = useState("");
//   const [shippingAddress, setShippingAddress] = useState("");

//   useEffect(() => {
//     const savedCart = localStorage.getItem("cart");
//     if (savedCart) {
//       setCartItems(JSON.parse(savedCart));
//     }
//   }, []);

//   const handlePaymentChange = (method: string) => {
//     setSelectedPayment(method);
//   };

//   const calculateTotal = () => {
//     return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
//   };

//   const updateQuantity = (id: string, newQuantity: number) => {
//     if (newQuantity < 1) return;
//     const updatedCart = cartItems.map((item) =>
//       item._id === id ? { ...item, quantity: newQuantity } : item
//     );
//     setCartItems(updatedCart);
//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//   };

//   // Function to download receipt as PDF
//   const downloadSlip = () => {
//     const doc = new jsPDF();

//     // Header - Company Info
//     doc.setFont("helvetica", "bold");
//     doc.setFontSize(16);
//     doc.text("Comforty", 20, 20); // Company name
//     doc.setFontSize(10);
//     doc.text("12, MILKYWAY Galaxy/Earth", 20, 30);
//     doc.text("Tel: 123-456-7890", 20, 35);
//     doc.text("Cashier: M1520", 120, 30);
//     doc.text("Date: 12/12/2023", 120, 35);

//     // Order List Header
//     doc.setFontSize(12);
//     doc.text("QTY  DESCRIPTION          PRICE     TOTAL", 20, 50);

//     let yPosition = 60;
//     cartItems.forEach((item) => {
//       const itemTotal = item.price * item.quantity;
//       doc.text(`${item.quantity}    ${item.title.substring(0, 20)}...  $${item.price.toFixed(2)}    $${itemTotal.toFixed(2)}`, 20, yPosition);
//       yPosition += 10;
//     });

//     // Summary - Tax and Total
//     const total = calculateTotal();
//     const tax = total * 0.17; // 17% VAT
//     doc.setFont("helvetica", "normal");
//     doc.text(`TAXABLE TOT:    $${total.toFixed(2)}`, 20, yPosition + 10);
//     doc.text(`VAT 17%:        $${tax.toFixed(2)}`, 20, yPosition + 20);
//     doc.text(`TOTAL:          $${(total + tax).toFixed(2)}`, 20, yPosition + 30);

//     // Footer - Thank You Message
//     yPosition += 40;
//     doc.setFontSize(10);
//     doc.text("* THANK YOU *", 20, yPosition);
//     doc.text("Contact us: support@comforty.com", 20, yPosition + 10);

//     // Optionally, you can add a barcode or any other footer details
//     // doc.addImage("barcode-image.png", "PNG", 100, yPosition + 20, 40, 20); // Uncomment to add barcode image

//     doc.save("receipt.pdf"); // Trigger download
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg"
//     >
//       <h1 className="text-2xl font-semibold mb-4 text-center">Checkout</h1>
//       <p className="text-gray-600 text-sm mb-4 text-center">All transactions are secure and encrypted.</p>

//       {/* Order Summary */}
//       <motion.div
//         initial={{ y: 20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ delay: 0.2 }}
//         className="border rounded-md p-4 mb-6"
//       >
//         <h2 className="text-xl font-semibold mb-3">Order Summary</h2>
//         {cartItems.length > 0 ? (
//           cartItems.map((item) => (
//             <motion.div
//               key={item._id}
//               className="flex justify-between items-center p-2 border-b"
//               whileHover={{ scale: 1.02 }}
//             >
//               <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded-md" />
//               <span>{item.title}</span>
//               <span>${item.price.toFixed(2)}</span>
//               <div className="flex items-center space-x-2">
//                 <button
//                   onClick={() => updateQuantity(item._id, item.quantity - 1)}
//                   className="px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
//                 >
//                   -
//                 </button>
//                 <span>{item.quantity}</span>
//                 <button
//                   onClick={() => updateQuantity(item._id, item.quantity + 1)}
//                   className="px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
//                 >
//                   +
//                 </button>
//               </div>
//             </motion.div>
//           ))
//         ) : (
//           <p>No items in cart</p>
//         )}
//         <div className="flex justify-between text-lg font-semibold mt-2">
//           <span>Total</span>
//           <span>${calculateTotal().toFixed(2)}</span>
//         </div>
//       </motion.div>

//       {/* Shipping Information */}
//       <motion.div
//         initial={{ y: 20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ delay: 0.4 }}
//         className="border rounded-md p-4 mb-6"
//       >
//         <h2 className="text-xl font-semibold mb-3">Shipping Address</h2>
//         <input
//           type="text"
//           placeholder="Full Name"
//           className="w-full border p-2 mb-2 rounded-md"
//         />
//         <input
//           type="text"
//           placeholder="Street Address"
//           className="w-full border p-2 mb-2 rounded-md"
//           value={shippingAddress}
//           onChange={(e) => setShippingAddress(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="City"
//           className="w-full border p-2 mb-2 rounded-md"
//         />
//         <input
//           type="text"
//           placeholder="Postal Code"
//           className="w-full border p-2 mb-2 rounded-md"
//         />
//         <input
//           type="text"
//           placeholder="Phone Number"
//           className="w-full border p-2 mb-2 rounded-md"
//         />
//       </motion.div>

//       {/* Billing Information */}
//       <motion.div
//         initial={{ y: 20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ delay: 0.6 }}
//         className="border rounded-md p-4 mb-6"
//       >
//         <h2 className="text-xl font-semibold mb-3">Billing Address</h2>
//         <label className="flex items-center space-x-2 mb-3">
//           <input
//             type="checkbox"
//             onChange={() => setBillingAddress(shippingAddress)}
//             className="form-checkbox text-blue-500"
//           />
//           <span>Same as Shipping Address</span>
//         </label>
//         <input
//           type="text"
//           placeholder="Street Address"
//           className="w-full border p-2 mb-2 rounded-md"
//           value={billingAddress}
//           onChange={(e) => setBillingAddress(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="City"
//           className="w-full border p-2 mb-2 rounded-md"
//         />
//         <input
//           type="text"
//           placeholder="Postal Code"
//           className="w-full border p-2 mb-2 rounded-md"
//         />
//       </motion.div>

//       {/* Payment Options */}
//       <motion.div
//         initial={{ y: 20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ delay: 0.8 }}
//         className="border rounded-md p-4 space-y-3"
//       >
//         <h2 className="text-xl font-semibold mb-3">Payment Method</h2>

//         {/* Credit Card */}
//         <label className="flex items-center space-x-3 cursor-pointer">
//           <input
//             type="radio"
//             name="payment"
//             value="credit_card"
//             checked={selectedPayment === "credit_card"}
//             onChange={() => handlePaymentChange("credit_card")}
//             className="form-radio text-blue-500"
//           />
//           <span className="text-lg font-medium">Credit Card</span>
//           <div className="ml-auto flex space-x-2 text-gray-500">
//             <FaCcVisa size={30} />
//             <FaCcMastercard size={30} />
//             <FaCcAmex size={30} />
//           </div>
//         </label>

//         {/* PayPal */}
//         <label className="flex items-center space-x-3 cursor-pointer">
//           <input
//             type="radio"
//             name="payment"
//             value="paypal"
//             checked={selectedPayment === "paypal"}
//             onChange={() => handlePaymentChange("paypal")}
//             className="form-radio text-blue-500"
//           />
//           <FaPaypal size={30} className="text-blue-600" />
//           <span className="text-lg font-medium">PayPal</span>
//         </label>

//         {/* Klarna */}
//         <label className="flex items-center space-x-3 cursor-pointer">
//           <input
//             type="radio"
//             name="payment"
//             value="klarna"
//             checked={selectedPayment === "klarna"}
//             onChange={() => handlePaymentChange("klarna")}
//             className="form-radio text-blue-500"
//           />
//           <SiKlarna size={30} className="text-pink-500" />
//           <span className="text-lg font-medium">Buy now, pay later with Klarna</span>
//         </label>

//         {/* Coinbase Commerce */}
//         <label className="flex items-center space-x-3 cursor-pointer">
//           <input
//             type="radio"
//             name="payment"
//             value="coinbase"
//             checked={selectedPayment === "coinbase"}
//             onChange={() => handlePaymentChange("coinbase")}
//             className="form-radio text-blue-500"
//           />
//           <SiCoinbase size={30} className="text-blue-500" />
//           <span className="text-lg font-medium">Coinbase Commerce</span>
//           <div className="ml-auto flex space-x-2 text-gray-500">
//             <FaBitcoin size={30} />
//           </div>
//         </label>

//         {/* Coinbase Commerce Redirect Message */}
//         {selectedPayment === "coinbase" && (
//           <div className="p-3 bg-gray-100 rounded-md text-sm text-gray-700">
//             You will be redirected to Coinbase to complete your purchase.
//           </div>
//         )}
//       </motion.div>

//       {/* Download Slip Button */}
//       <motion.div
//         initial={{ y: 20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ delay: 1 }}
//         className="text-center mt-6"
//       >
//         <button
//           onClick={downloadSlip}
//           className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//         >
//           Download Slip
//         </button>
//       </motion.div>
//     </motion.div>
//   );
// };

// export default CheckoutPage;











//                      import CheckoutForm from "@/app/checkoutt/CheckoutForm";


"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "@/app/checkoutt/CheckoutForm";
import LoadingSpinner from "@/components/LoadingSpinner";
0

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export type CartItem = {
  _id: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
};

const CheckoutPage = () => {
  // State declarations
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [shippingOption, setShippingOption] = useState<"standard" | "express">("standard");
  const [clientSecret, setClientSecret] = useState("");
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  
  // User information
  const [email] = useState("jd@gmail.com");
  const [deliveryAddress] = useState("John Doe, 102 Louis Rd, Ebensburg, Pennsylvania, 15931-4900, United States");

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Calculate total with shipping
  const calculateTotal = () => {
    const subtotal = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    return subtotal + (shippingOption === "express" ? 10 : 0);
  };

  // Create payment intent
  useEffect(() => {
    const initializePayment = async () => {
      try {
        setPaymentLoading(true);
        setPaymentError("");
        
        const total = calculateTotal();
        if (total <= 0) throw new Error("Invalid order total");
        if (cartItems.length === 0) throw new Error("Cart is empty");

        const response = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: total * 100 }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Payment setup failed");
        }

        const data = await response.json();
        if (!data.clientSecret) throw new Error("Invalid payment response");

        setClientSecret(data.clientSecret);
      } catch (err) {
        const error = err as Error;
        setPaymentError(error.message);
      } finally {
        setPaymentLoading(false);
      }
    };

    if (cartItems.length > 0) {
      initializePayment();
    }
  }, [cartItems, shippingOption]);

  // Shipping option handler
  const handleShippingOptionChange = (option: "standard" | "express") => {
    setShippingOption(option);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto p-6 bg-white rounded-lg grid grid-cols-1 lg:grid-cols-2 gap-6"
    >
      {/* Left Column - Order Summary */}
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Checkout</h1>
        
        {/* Cart Items */}
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item._id} className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-gray-500">Qty: {item.quantity}</p>
                </div>
              </div>
              <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>

        {/* Order Total */}
        <div className="border-t pt-4 space-y-3">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${(calculateTotal() - (shippingOption === "express" ? 10 : 0)).toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>{shippingOption === "express" ? "$10.00" : "Free"}</span>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>${calculateTotal().toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Right Column - Payment Section */}
      <div className="bg-gray-50 p-6 rounded-lg space-y-6">
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Payment Details</h2>
          
          {/* Error Messages */}
          {paymentError && (
            <div className="p-4 mb-4 text-red-700 bg-red-50 rounded-lg">
              <strong>Payment Error:</strong> {paymentError}
            </div>
          )}

          {/* Loading State */}
          {paymentLoading ? (
            <div className="text-center py-8">
              <LoadingSpinner />
              <p className="mt-2 text-gray-600">Loading payment gateway...</p>
            </div>
          ) : clientSecret ? (
            <Elements
              stripe={stripePromise}
              options={{
                clientSecret,
                appearance: {
                  theme: "stripe",
                  variables: {
                    colorPrimary: "#2563eb",
                    borderRadius: "8px"
                  }
                }
              }}
            >
              <CheckoutForm 
                totalAmount={calculateTotal()}
                email={email}
                deliveryAddress={deliveryAddress}
              />
            </Elements>
          ) : (
            <div className="text-center p-4 bg-yellow-50 text-yellow-700 rounded-lg">
              {cartItems.length === 0 ? "Your cart is empty" : "Payment system unavailable"}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CheckoutPage;
















//            2
// "use client";

// import { useState, useEffect } from "react";
// import { FaCcVisa, FaCcMastercard, FaCcAmex, FaPaypal } from "react-icons/fa";
// import { motion } from "framer-motion";
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import CheckoutForm from "@/components/CheckoutForm";
// import LoadingSpinner from "@/components/LoadingSpinner";

// const stripePromise = loadStripe(
//   process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
// );

// export type CartItem = {
//   _id: string;
//   title: string;
//   price: number;
//   quantity: number;
//   image: string;
// };

// const CheckoutPage = () => {
//   // State declarations
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);
//   const [shippingOption, setShippingOption] = useState<"standard" | "express">("standard");
//   const [promoCode, setPromoCode] = useState("");
//   const [email] = useState("jd@gmail.com");
//   const [deliveryAddress] = useState("John Doe, 102 Louis Rd, Ebensburg, Pennsylvania, 15931-4900, United States");
//   const [isClient, setIsClient] = useState(false);
//   const [clientSecret, setClientSecret] = useState("");
//   const [paymentLoading, setPaymentLoading] = useState(false);
//   const [paymentError, setPaymentError] = useState("");

//   // Initialize client-side state
//   useEffect(() => {
//     setIsClient(true);
//     const savedCart = localStorage.getItem("cart");
//     if (savedCart) {
//       setCartItems(JSON.parse(savedCart));
//     }
//   }, []);

//   // Calculate total with shipping
//   const calculateTotal = () => {
//     const subtotal = cartItems.reduce(
//       (total, item) => total + item.price * item.quantity,
//       0
//     );
//     return subtotal + (shippingOption === "express" ? 10 : 0);
//   };

//   // Payment intent creation
//   useEffect(() => {
//     const initializePayment = async () => {
//       try {
//         setPaymentLoading(true);
//         setPaymentError("");
        
//         const total = calculateTotal();
//         if (total <= 0) throw new Error("Invalid order total");

//         const response = await fetch("/api/create-payment-intent", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ amount: total * 100 }),
//         });

//         if (!response.ok) throw new Error("Failed to create payment intent");
//         const data = await response.json();
//         if (!data.clientSecret) throw new Error("Invalid payment intent response");

//         setClientSecret(data.clientSecret);
//       } catch (err) {
//         setPaymentError(err instanceof Error ? err.message : "Payment initialization failed");
//       } finally {
//         setPaymentLoading(false);
//       }
//     };

//     if (isClient && calculateTotal() > 0) {
//       initializePayment();
//     }
//   }, [cartItems, shippingOption, isClient]);

//   // Handler functions
//   const handleShippingOptionChange = (option: "standard" | "express") => {
//     setShippingOption(option);
//   };

//   const handlePromoCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setPromoCode(e.target.value);
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg grid grid-cols-1 lg:grid-cols-2 gap-6"
//     >
//       {/* Left Column - User Details and Shipping */}
//       <div className="col-span-1 lg:col-span-1">
//         <h1 className="text-3xl font-semibold mb-6 text-center text-gray-700">Checkout</h1>

//         {/* Shipping Country */}
//         <div className="mb-4 p-4 bg-gray-50 rounded-lg border">
//           <h2 className="text-lg font-semibold mb-2">Shipping Country</h2>
//           <div className="flex items-center space-x-4">
//             <span>United States</span>
//             <button
//               className="text-blue-600"
//               onClick={() => alert("Change Country")}
//             >
//               Change
//             </button>
//           </div>
//         </div>

//         {/* Promo/Student Code */}
//         <div className="mb-4 p-4 bg-gray-50 rounded-lg border">
//           <h2 className="text-lg font-semibold mb-2">Promo/Student Code</h2>
//           <input
//             type="text"
//             placeholder="Enter code"
//             value={promoCode}
//             onChange={handlePromoCodeChange}
//             className="w-full border p-3 rounded-md"
//           />
//         </div>

//         {/* Email Address */}
//         <div className="mb-4 p-4 bg-gray-50 rounded-lg border">
//           <h2 className="text-lg font-semibold mb-2">Email Address</h2>
//           <div className="flex items-center space-x-4">
//             <span>{email}</span>
//             <button
//               className="text-blue-600"
//               onClick={() => alert("Change Email")}
//             >
//               Change
//             </button>
//           </div>
//         </div>

//         {/* Delivery Address */}
//         <div className="mb-4 p-4 bg-gray-50 rounded-lg border">
//           <h2 className="text-lg font-semibold mb-2">Delivery Address</h2>
//           <div className="flex items-center space-x-4">
//             <span>{deliveryAddress}</span>
//             <button
//               className="text-blue-600"
//               onClick={() => alert("Change Address")}
//             >
//               Change
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Right Column - Order Summary */}
//       <div className="col-span-1 lg:col-span-1 p-6 bg-gray-50 rounded-lg border">
//         <h2 className="text-xl font-semibold mb-3">{cartItems.length} ITEM{cartItems.length !== 1 ? 'S' : ''}</h2>
//         {cartItems.length > 0 ? (
//           cartItems.map((item) => (
//             <div key={item._id} className="flex justify-between items-center mb-4">
//               <div className="flex items-center space-x-2">
//                 <img
//                   src={item.image}
//                   alt={item.title}
//                   className="w-16 h-16 object-cover rounded-md"
//                 />
//                 <span>{item.title}</span>
//               </div>
//               <div className="text-gray-700">
//                 ${item.price.toFixed(2)} x {item.quantity}
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No items in cart</p>
//         )}

//         {/* Total Summary */}
//         <div className="border-t pt-4">
//           <div className="flex justify-between text-lg font-semibold text-gray-800">
//             <span>Subtotal</span>
//             <span>${(calculateTotal() - (shippingOption === "express" ? 10 : 0)).toFixed(2)}</span>
//           </div>
//           <div className="flex justify-between text-lg font-semibold text-gray-800">
//             <span>Shipping</span>
//             <span>{shippingOption === "express" ? "$10.00" : "Free"}</span>
//           </div>
//           <div className="flex justify-between text-lg font-semibold text-gray-800">
//             <span>Sales Tax</span>
//             <span>$0.00</span>
//           </div>
//           <div className="flex justify-between text-lg font-semibold text-gray-800">
//             <span>Total to Pay</span>
//             <span>${calculateTotal().toFixed(2)}</span>
//           </div>
//         </div>

//         {/* Shipping Options */}
//         <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
//           <h2 className="text-lg font-semibold mb-2">Shipping Option</h2>
//           <div className="flex items-center space-x-4">
//             <label className="cursor-pointer">
//               <input
//                 type="radio"
//                 name="shippingOption"
//                 value="standard"
//                 checked={shippingOption === "standard"}
//                 onChange={() => handleShippingOptionChange("standard")}
//                 className="mr-2"
//               />
//               Standard
//             </label>
//             <label className="cursor-pointer">
//               <input
//                 type="radio"
//                 name="shippingOption"
//                 value="express"
//                 checked={shippingOption === "express"}
//                 onChange={() => handleShippingOptionChange("express")}
//                 className="mr-2"
//               />
//               Express ($10)
//             </label>
//           </div>
//         </div>

//         {/* Payment Section */}
//         <div className="mt-6 text-center">
//           {paymentError && (
//             <div className="text-red-500 mb-4">{paymentError}</div>
//           )}

//           {paymentLoading ? (
//             <div className="flex flex-col items-center">
//               <LoadingSpinner/>
//               <p className="mt-2 text-gray-600">Initializing payment...</p>
//             </div>
//           ) : clientSecret ? (
//             <Elements
//               stripe={stripePromise}
//               options={{
//                 clientSecret,
//                 appearance: {
//                   theme: "stripe",
//                   variables: {
//                     colorPrimary: "#3b82f6",
//                     borderRadius: "6px",
//                   },
//                 },
//               }}
//             >
//               <CheckoutForm 
//                 totalAmount={calculateTotal()}
//                 email={email}
//                 deliveryAddress={deliveryAddress}
//               />
//             </Elements>
//           ) : (
//             <button 
//               className="px-6 py-3 bg-gray-400 text-white rounded-lg cursor-not-allowed"
//               disabled
//             >
//               Checkout unavailable
//             </button>
//           )}
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default CheckoutPage;




//     yyyy
// "use client";

// import { useState, useEffect } from "react";
// import { FaCcVisa, FaCcMastercard, FaCcAmex, FaPaypal } from "react-icons/fa";
// import { motion } from "framer-motion"; // Ensure proper import of motion

// export type CartItem = {
//   _id: string;
//   title: string;
//   price: number;
//   quantity: number;
//   image: string;
// };

// const CheckoutPage = () => {
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);
//   const [shippingCountry, setShippingCountry] = useState("United States");
//   const [promoCode, setPromoCode] = useState("");
//   const [email, setEmail] = useState("jd@gmail.com");
//   const [deliveryAddress, setDeliveryAddress] = useState("John Doe, 102 Louis Rd, Ebensburg, Pennsylvania, 15931-4900, United States");
//   const [shippingOption, setShippingOption] = useState("standard");
//   const [isClient, setIsClient] = useState(false);

//   useEffect(() => {
//     setIsClient(true);
//     const savedCart = localStorage.getItem("cart");
//     if (savedCart) {
//       setCartItems(JSON.parse(savedCart));
//     }
//   }, []);

//   const calculateTotal = () => {
//     return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
//   };

//   const handleShippingOptionChange = (option: string) => {
//     setShippingOption(option);
//   };

//   const handlePromoCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setPromoCode(e.target.value);
//   };

//   const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setEmail(e.target.value);
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg grid grid-cols-1 lg:grid-cols-2 gap-6"
//     >
//       {/* Left Column - User Details and Shipping */}
//       <div className="col-span-1 lg:col-span-1">
//         <h1 className="text-3xl font-semibold mb-6 text-center text-gray-700">Checkout</h1>

//         {/* Shipping Country */}
//         <div className="mb-4 p-4 bg-gray-50 rounded-lg border">
//           <h2 className="text-lg font-semibold mb-2">Shipping Country</h2>
//           <div className="flex items-center space-x-4">
//             <span>{shippingCountry}</span>
//             <button
//               className="text-blue-600"
//               onClick={() => alert("Change Country")}
//             >
//               Change
//             </button>
//           </div>
//         </div>

//         {/* Promo/Student Code */}
//         <div className="mb-4 p-4 bg-gray-50 rounded-lg border">
//           <h2 className="text-lg font-semibold mb-2">Promo/Student Code</h2>
//           <input
//             type="text"
//             placeholder="Enter code"
//             value={promoCode}
//             onChange={handlePromoCodeChange}
//             className="w-full border p-3 rounded-md"
//           />
//         </div>

//         {/* Email Address */}
//         <div className="mb-4 p-4 bg-gray-50 rounded-lg border">
//           <h2 className="text-lg font-semibold mb-2">Email Address</h2>
//           <div className="flex items-center space-x-4">
//             <span>{email}</span>
//             <button
//               className="text-blue-600"
//               onClick={() => alert("Change Email")}
//             >
//               Change
//             </button>
//           </div>
//         </div>

//         {/* Delivery Address */}
//         <div className="mb-4 p-4 bg-gray-50 rounded-lg border">
//           <h2 className="text-lg font-semibold mb-2">Delivery Address</h2>
//           <div className="flex items-center space-x-4">
//             <span>{deliveryAddress}</span>
//             <button
//               className="text-blue-600"
//               onClick={() => alert("Change Address")}
//             >
//               Change
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Right Column - Order Summary */}
//       <div className="col-span-1 lg:col-span-1 p-6 bg-gray-50 rounded-lg border">
//         <h2 className="text-xl font-semibold mb-3">1 ITEM</h2>
//         {cartItems.length > 0 ? (
//           cartItems.map((item) => (
//             <div key={item._id} className="flex justify-between items-center mb-4">
//               <div className="flex items-center space-x-2">
//                 <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded-md" />
//                 <span>{item.title}</span>
//               </div>
//               <div className="text-gray-700">
//                 ${item.price.toFixed(2)} x {item.quantity}
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No items in cart</p>
//         )}

//         {/* Total Summary */}
//         <div className="border-t pt-4">
//           <div className="flex justify-between text-lg font-semibold text-gray-800">
//             <span>Subtotal</span>
//             <span>${calculateTotal().toFixed(2)}</span>
//           </div>
//           <div className="flex justify-between text-lg font-semibold text-gray-800">
//             <span>Shipping</span>
//             <span>Free</span>
//           </div>
//           <div className="flex justify-between text-lg font-semibold text-gray-800">
//             <span>Sales Tax</span>
//             <span>$0.00</span>
//           </div>
//           <div className="flex justify-between text-lg font-semibold text-gray-800">
//             <span>Total to Pay</span>
//             <span>${calculateTotal().toFixed(2)}</span>
//           </div>
//         </div>

//         {/* Shipping Options */}
//         <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
//           <h2 className="text-lg font-semibold mb-2">Shipping Option</h2>
//           <div className="flex items-center space-x-4">
//             <label className="cursor-pointer">
//               <input
//                 type="radio"
//                 name="shippingOption"
//                 value="standard"
//                 checked={shippingOption === "standard"}
//                 onChange={() => handleShippingOptionChange("standard")}
//                 className="mr-2"
//               />
//               Standard
//             </label>
//             <label className="cursor-pointer">
//               <input
//                 type="radio"
//                 name="shippingOption"
//                 value="express"
//                 checked={shippingOption === "express"}
//                 onChange={() => handleShippingOptionChange("express")}
//                 className="mr-2"
//               />
//               Express ($10)
//             </label>
//           </div>
//         </div>

//         {/* Checkout Button */}
//         <div className="mt-6 text-center">
//           <a
//             href="/payment"  // Link to next page (change route accordingly)
//             className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//           >
//             Proceed to Next Page
//           </a>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default CheckoutPage;




// "use client";

// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { FaCcVisa, FaCcMastercard, FaCcAmex, FaPaypal, FaBitcoin } from "react-icons/fa";
// import { SiCoinbase, SiKlarna } from "react-icons/si";
// import { jsPDF } from "jspdf"; // Import jsPDF for PDF generation
// import Link from "next/link"; // Use Link for client-side navigation

// export type CartItem = {
//   _id: string;
//   title: string;
//   price: number;
//   quantity: number;
//   image: string;
// };

// const CheckoutPage = () => {
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);
//   const [selectedPayment, setSelectedPayment] = useState("");
//   const [billingAddress, setBillingAddress] = useState("");
//   const [shippingAddress, setShippingAddress] = useState("");
//   const [isClient, setIsClient] = useState(false); // Track client-side rendering

//   useEffect(() => {
//     setIsClient(true); // Set to true only on the client
//     const savedCart = localStorage.getItem("cart");
//     if (savedCart) {
//       setCartItems(JSON.parse(savedCart));
//     }
//   }, []);

//   const handlePaymentChange = (method: string) => {
//     setSelectedPayment(method);
//   };

//   const calculateTotal = () => {
//     return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
//   };

//   const updateQuantity = (id: string, newQuantity: number) => {
//     if (newQuantity < 1) return;
//     const updatedCart = cartItems.map((item) =>
//       item._id === id ? { ...item, quantity: newQuantity } : item
//     );
//     setCartItems(updatedCart);
//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//   };

//   // Function to download receipt as PDF
//   const downloadSlip = () => {
//     if (!isClient) return; // Ensure this runs only on the client

//     const doc = new jsPDF();

//     // Get current date and day
//     const currentDate = new Date();
//     const formattedDate = currentDate.toLocaleDateString('en-US'); // Formats date like "MM/DD/YYYY"
//     const currentDay = currentDate.toLocaleString('en-US', { weekday: 'long' }); // Gets the full day name

//     // Header - Company Info with small Comforty logo
//     doc.setFont("helvetica", "bold");
//     doc.setFontSize(16);
//     doc.setTextColor(0, 0, 255); // Blue color for company name
//     doc.text("Comforty", 20, 20); // Company name
//     doc.setFontSize(10);
//     doc.setTextColor(0, 0, 0); // Black color for other text
//     doc.text("12, MILKYWAY Galaxy/Earth", 20, 30);
//     doc.text("Tel: +9203318327545", 20, 35);
//     doc.text(`Cashier: M1520`, 120, 30);
//     doc.text(`Date: ${formattedDate} (${currentDay})`, 120, 35); // Add Date and Day dynamically

//     // Add Comforty logo image (ensure path is correct)
//     doc.addImage('/Logo Icon.png', 170, 15, 20, 20);  // Modify these values as per your desired image size and position

//     // Order List Header
//     doc.setFontSize(12);
//     doc.setTextColor(0, 0, 0); // Black color for header
//     doc.setFont("helvetica", "bold"); // Bold header
//     doc.text("QTY", 20, 50);
//     doc.text("DESCRIPTION", 40, 50);
//     doc.text("PRICE", 120, 50);
//     doc.text("TOTAL", 160, 50);

//     // Add a line below the header
//     doc.setDrawColor(0, 0, 0); // Black color for the line
//     doc.line(20, 55, 190, 55); // Draw a line below the header

//     let yPosition = 60;
//     cartItems.forEach((item) => {
//       const itemTotal = item.price * item.quantity;

//       // Align columns: QTY, DESCRIPTION, PRICE, TOTAL
//       doc.setFont("helvetica", "normal"); // Normal font for items
//       doc.text(`${item.quantity}`, 20, yPosition); // QTY (aligned to the left)
//       doc.text(`${item.title.substring(0, 20)}...`, 40, yPosition); // DESCRIPTION (aligned to the left)
//       doc.text(`$${item.price.toFixed(2)}`, 120, yPosition); // PRICE (aligned to the right)
//       doc.text(`$${itemTotal.toFixed(2)}`, 160, yPosition); // TOTAL (aligned to the right)

//       yPosition += 10; // Move to the next line
//     });

//     // Summary - Tax and Total
//     const total = calculateTotal();
//     const tax = total * 0.17; // 17% VAT
//     doc.setFont("helvetica", "bold"); // Bold font for summary
//     doc.text(`TAXABLE TOT:    $${total.toFixed(2)}`, 20, yPosition + 10);
//     doc.text(`VAT 17%:        $${tax.toFixed(2)}`, 20, yPosition + 20);
//     doc.text(`TOTAL:          $${(total + tax).toFixed(2)}`, 20, yPosition + 30);

//     // Footer - Thank You Message and Contact Info
//     yPosition += 40;
//     doc.setFontSize(10);
//     doc.setTextColor(0, 0, 255); // Blue color for thank you message
//     doc.text("* THANK YOU *", 20, yPosition);
//     doc.setTextColor(0, 0, 0); // Black color for contact info
//     doc.text("Contact us: Comforty.com@gaami.com", 20, yPosition + 10);
//     doc.text("Phone: +9203318327545", 20, yPosition + 20);
//     doc.text("OWNER: I T boy", 20, yPosition + 30);

//     // Add a border around the entire content
//     doc.setDrawColor(0, 0, 0); // Black color for the border
//     doc.rect(10, 10, 190, yPosition + 40); // Adjust the dimensions as needed

//     doc.save("receipt.pdf"); // Trigger download
//   };

//   if (!isClient) return null; // Render nothing on the server

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg"
//     >
//       <h1 className="text-3xl font-semibold mb-4 text-center text-blue-700">Checkout</h1>
//       <p className="text-gray-600 text-sm mb-4 text-center">All transactions are secure and encrypted.</p>

//       {/* Order Summary */}
//       <motion.div
//         initial={{ y: 20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ delay: 0.2 }}
//         className="border rounded-md p-4 mb-6 bg-gray-50"
//       >
//         <h2 className="text-2xl font-semibold mb-3 text-gray-800">Order Summary</h2>
//         {cartItems.length > 0 ? (
//           cartItems.map((item) => (
//             <motion.div
//               key={item._id}
//               className="flex justify-between items-center p-3 border-b"
//               whileHover={{ scale: 1.02 }}
//             >
//               <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded-md" />
//               <span className="text-gray-700">{item.title}</span>
//               <span className="text-gray-600">${item.price.toFixed(2)}</span>
//               <div className="flex items-center space-x-2">
//                 <button
//                   onClick={() => updateQuantity(item._id, item.quantity - 1)}
//                   className="px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
//                 >
//                   -
//                 </button>
//                 <span className="text-gray-800">{item.quantity}</span>
//                 <button
//                   onClick={() => updateQuantity(item._id, item.quantity + 1)}
//                   className="px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
//                 >
//                   +
//                 </button>
//               </div>
//             </motion.div>
//           ))
//         ) : (
//           <p>No items in cart</p>
//         )}
//         <div className="flex justify-between text-lg font-semibold mt-2 text-gray-800">
//           <span>Total</span>
//           <span>${calculateTotal().toFixed(2)}</span>
//         </div>
//       </motion.div>

//       {/* Shipping Information */}
//       <motion.div
//         initial={{ y: 20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ delay: 0.4 }}
//         className="border rounded-md p-4 mb-6 bg-gray-50"
//       >
//         <h2 className="text-2xl font-semibold mb-3 text-gray-800">Shipping Address</h2>
//         <input
//           type="text"
//           placeholder="Full Name"
//           className="w-full border p-3 mb-3 rounded-md"
//         />
//         <input
//           type="text"
//           placeholder="Street Address"
//           className="w-full border p-3 mb-3 rounded-md"
//           value={shippingAddress}
//           onChange={(e) => setShippingAddress(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="City"
//           className="w-full border p-3 mb-3 rounded-md"
//         />
//         <input
//           type="text"
//           placeholder="Postal Code"
//           className="w-full border p-3 mb-3 rounded-md"
//         />
//         <input
//           type="text"
//           placeholder="Phone Number"
//           className="w-full border p-3 mb-3 rounded-md"
//         />
//       </motion.div>

//       {/* Billing Information */}
//       <motion.div
//         initial={{ y: 20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ delay: 0.6 }}
//         className="border rounded-md p-4 mb-6 bg-gray-50"
//       >
//         <h2 className="text-2xl font-semibold mb-3 text-gray-800">Billing Address</h2>
//         <label className="flex items-center space-x-2 mb-3">
//           <input
//             type="checkbox"
//             onChange={() => setBillingAddress(shippingAddress)}
//             className="form-checkbox text-blue-500"
//           />
//           <span>Same as Shipping Address</span>
//         </label>
//         <input
//           type="text"
//           placeholder="Street Address"
//           className="w-full border p-3 mb-3 rounded-md"
//           value={billingAddress}
//           onChange={(e) => setBillingAddress(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="City"
//           className="w-full border p-3 mb-3 rounded-md"
//         />
//         <input
//           type="text"
//           placeholder="Postal Code"
//           className="w-full border p-3 mb-3 rounded-md"
//         />
//       </motion.div>

//       {/* Payment Options */}
//       <motion.div
//         initial={{ y: 20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ delay: 0.8 }}
//         className="border rounded-md p-4 space-y-3 mb-6 bg-gray-50"
//       >
//         <h2 className="text-2xl font-semibold mb-3 text-gray-800">Payment Method</h2>

//         {/* Credit Card */}
//         <label className="flex items-center space-x-3 cursor-pointer">
//           <input
//             type="radio"
//             name="payment"
//             value="credit_card"
//             checked={selectedPayment === "credit_card"}
//             onChange={() => handlePaymentChange("credit_card")}
//             className="form-radio text-blue-500"
//           />
//           <span className="text-lg font-medium text-gray-700">Credit Card</span>
//           <div className="ml-auto flex space-x-2 text-gray-500">
//             <FaCcVisa size={30} />
//             <FaCcMastercard size={30} />
//             <FaCcAmex size={30} />
//           </div>
//         </label>

//         {/* PayPal */}
//         <label className="flex items-center space-x-3 cursor-pointer">
//           <input
//             type="radio"
//             name="payment"
//             value="paypal"
//             checked={selectedPayment === "paypal"}
//             onChange={() => handlePaymentChange("paypal")}
//             className="form-radio text-blue-500"
//           />
//           <FaPaypal size={30} className="text-blue-600" />
//           <span className="text-lg font-medium text-gray-700">PayPal</span>
//         </label>

//         {/* Klarna */}
//         <label className="flex items-center space-x-3 cursor-pointer">
//           <input
//             type="radio"
//             name="payment"
//             value="klarna"
//             checked={selectedPayment === "klarna"}
//             onChange={() => handlePaymentChange("klarna")}
//             className="form-radio text-blue-500"
//           />
//           <SiKlarna size={30} className="text-pink-500" />
//           <span className="text-lg font-medium text-gray-700">Buy now, pay later with Klarna</span>
//         </label>

//         {/* Coinbase Commerce */}
//         <label className="flex items-center space-x-3 cursor-pointer">
//           <input
//             type="radio"
//             name="payment"
//             value="coinbase"
//             checked={selectedPayment === "coinbase"}
//             onChange={() => handlePaymentChange("coinbase")}
//             className="form-radio text-blue-500"
//           />
//           <SiCoinbase size={30} className="text-blue-500" />
//           <span className="text-lg font-medium text-gray-700">Coinbase Commerce</span>
//           <div className="ml-auto flex space-x-2 text-gray-500">
//             <FaBitcoin size={30} />
//           </div>
//         </label>

//         {/* Coinbase Commerce Redirect Message */}
//         {selectedPayment === "coinbase" && (
//           <div className="p-3 bg-gray-100 rounded-md text-sm text-gray-700">
//             You will be redirected to Coinbase to complete your purchase.
//           </div>
//         )}
//       </motion.div>

//       {/* Download Slip Button */}
//       <motion.div
//         initial={{ y: 20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ delay: 1 }}
//         className="text-center mt-6"
//       >
//         <button
//           onClick={downloadSlip}
//           className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//         >
//           Download Slip
//         </button>
//       </motion.div>
//     </motion.div>
//   );
// };

// export default CheckoutPage;












// "use client";

// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { FaCcVisa, FaCcMastercard, FaCcAmex, FaPaypal, FaBitcoin } from "react-icons/fa";
// import { SiCoinbase, SiKlarna } from "react-icons/si";
// import { jsPDF } from "jspdf"; // Import jsPDF for PDF generation

// export type CartItem = {
//   _id: string;
//   title: string;
//   price: number;
//   quantity: number;
//   image: string;
// };

// const CheckoutPage = () => {
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);
//   const [selectedPayment, setSelectedPayment] = useState("");
//   const [billingAddress, setBillingAddress] = useState("");
//   const [shippingAddress, setShippingAddress] = useState("");

//   useEffect(() => {
//     const savedCart = localStorage.getItem("cart");
//     if (savedCart) {
//       setCartItems(JSON.parse(savedCart));
//     }
//   }, []);

//   const handlePaymentChange = (method: string) => {
//     setSelectedPayment(method);
//   };

//   const calculateTotal = () => {
//     return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
//   };

//   const updateQuantity = (id: string, newQuantity: number) => {
//     if (newQuantity < 1) return;
//     const updatedCart = cartItems.map((item) =>
//       item._id === id ? { ...item, quantity: newQuantity } : item
//     );
//     setCartItems(updatedCart);
//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//   };

//   // Function to download receipt as PDF
//   const downloadSlip = () => {
//     const doc = new jsPDF();

//     // Get current date and day
//     const currentDate = new Date();
//     const formattedDate = currentDate.toLocaleDateString('en-US'); // Formats date like "MM/DD/YYYY"
//     const currentDay = currentDate.toLocaleString('en-US', { weekday: 'long' }); // Gets the full day name

//     // Header - Company Info with small Comforty logo
//     doc.setFont("helvetica", "bold");
//     doc.setFontSize(16);
//     doc.text("Comforty", 20, 20); // Company name
//     doc.setFontSize(10);
//     doc.text("12, MILKYWAY Galaxy/Earth", 20, 30);
//     doc.text("Tel: +9203318327545", 20, 35);
//     doc.text(`Cashier: M1520`, 120, 30);
//     doc.text(`Date: ${formattedDate} (${currentDay})`, 120, 35); // Add Date and Day dynamically

//     // Add Comforty logo image (ensure path is correct)
//      doc.addImage('/Logo Icon.png',  170, 15, 20, 20);  // Modify these values as per your desired image size and position

//     // Order List Header
//     doc.setFontSize(12);
//     doc.text("QTY  DESCRIPTION          PRICE     TOTAL", 20, 50);

//     let yPosition = 60;
//     cartItems.forEach((item) => {
//       const itemTotal = item.price * item.quantity;
//       doc.text(`${item.quantity}    ${item.title.substring(0, 20)}...  $${item.price.toFixed(2)}    $${itemTotal.toFixed(2)}`, 20, yPosition);
//       yPosition += 10;
//     });

//     // Summary - Tax and Total
//     const total = calculateTotal();
//     const tax = total * 0.17; // 17% VAT
//     doc.setFont("helvetica", "normal");
//     doc.text(`TAXABLE TOT:    $${total.toFixed(2)}`, 20, yPosition + 10);
//     doc.text(`VAT 17%:        $${tax.toFixed(2)}`, 20, yPosition + 20);
//     doc.text(`TOTAL:          $${(total + tax).toFixed(2)}`, 20, yPosition + 30);

//     // Footer - Thank You Message and Contact Info
//     yPosition += 40;
//     doc.setFontSize(10);
//     doc.text("* THANK YOU *", 20, yPosition);
//     doc.text("Contact us: Comforty.com@gaami.com", 20, yPosition + 10);
//     doc.text("Phone: +9203318327545", 20, yPosition + 20);
//     doc.text("OWNER: I T boy", 20, yPosition + 30);

//     doc.save("receipt.pdf"); // Trigger download
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg"
//     >
//       <h1 className="text-3xl font-semibold mb-4 text-center text-blue-700">Checkout</h1>
//       <p className="text-gray-600 text-sm mb-4 text-center">All transactions are secure and encrypted.</p>

//       {/* Order Summary */}
//       <motion.div
//         initial={{ y: 20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ delay: 0.2 }}
//         className="border rounded-md p-4 mb-6 bg-gray-50"
//       >
//         <h2 className="text-2xl font-semibold mb-3 text-gray-800">Order Summary</h2>
//         {cartItems.length > 0 ? (
//           cartItems.map((item) => (
//             <motion.div
//               key={item._id}
//               className="flex justify-between items-center p-3 border-b"
//               whileHover={{ scale: 1.02 }}
//             >
//               <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded-md" />
//               <span className="text-gray-700">{item.title}</span>
//               <span className="text-gray-600">${item.price.toFixed(2)}</span>
//               <div className="flex items-center space-x-2">
//                 <button
//                   onClick={() => updateQuantity(item._id, item.quantity - 1)}
//                   className="px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
//                 >
//                   -
//                 </button>
//                 <span className="text-gray-800">{item.quantity}</span>
//                 <button
//                   onClick={() => updateQuantity(item._id, item.quantity + 1)}
//                   className="px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
//                 >
//                   +
//                 </button>
//               </div>
//             </motion.div>
//           ))
//         ) : (
//           <p>No items in cart</p>
//         )}
//         <div className="flex justify-between text-lg font-semibold mt-2 text-gray-800">
//           <span>Total</span>
//           <span>${calculateTotal().toFixed(2)}</span>
//         </div>
//       </motion.div>

//       {/* Shipping Information */}
//       <motion.div
//         initial={{ y: 20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ delay: 0.4 }}
//         className="border rounded-md p-4 mb-6 bg-gray-50"
//       >
//         <h2 className="text-2xl font-semibold mb-3 text-gray-800">Shipping Address</h2>
//         <input
//           type="text"
//           placeholder="Full Name"
//           className="w-full border p-3 mb-3 rounded-md"
//         />
//         <input
//           type="text"
//           placeholder="Street Address"
//           className="w-full border p-3 mb-3 rounded-md"
//           value={shippingAddress}
//           onChange={(e) => setShippingAddress(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="City"
//           className="w-full border p-3 mb-3 rounded-md"
//         />
//         <input
//           type="text"
//           placeholder="Postal Code"
//           className="w-full border p-3 mb-3 rounded-md"
//         />
//         <input
//           type="text"
//           placeholder="Phone Number"
//           className="w-full border p-3 mb-3 rounded-md"
//         />
//       </motion.div>

//       {/* Billing Information */}
//       <motion.div
//         initial={{ y: 20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ delay: 0.6 }}
//         className="border rounded-md p-4 mb-6 bg-gray-50"
//       >
//         <h2 className="text-2xl font-semibold mb-3 text-gray-800">Billing Address</h2>
//         <label className="flex items-center space-x-2 mb-3">
//           <input
//             type="checkbox"
//             onChange={() => setBillingAddress(shippingAddress)}
//             className="form-checkbox text-blue-500"
//           />
//           <span>Same as Shipping Address</span>
//         </label>
//         <input
//           type="text"
//           placeholder="Street Address"
//           className="w-full border p-3 mb-3 rounded-md"
//           value={billingAddress}
//           onChange={(e) => setBillingAddress(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="City"
//           className="w-full border p-3 mb-3 rounded-md"
//         />
//         <input
//           type="text"
//           placeholder="Postal Code"
//           className="w-full border p-3 mb-3 rounded-md"
//         />
//       </motion.div>

//       {/* Payment Options */}
//       <motion.div
//         initial={{ y: 20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ delay: 0.8 }}
//         className="border rounded-md p-4 space-y-3 mb-6 bg-gray-50"
//       >
//         <h2 className="text-2xl font-semibold mb-3 text-gray-800">Payment Method</h2>

//         {/* Credit Card */}
//         <label className="flex items-center space-x-3 cursor-pointer">
//           <input
//             type="radio"
//             name="payment"
//             value="credit_card"
//             checked={selectedPayment === "credit_card"}
//             onChange={() => handlePaymentChange("credit_card")}
//             className="form-radio text-blue-500"
//           />
//           <span className="text-lg font-medium text-gray-700">Credit Card</span>
//           <div className="ml-auto flex space-x-2 text-gray-500">
//             <FaCcVisa size={30} />
//             <FaCcMastercard size={30} />
//             <FaCcAmex size={30} />
//           </div>
//         </label>

//         {/* PayPal */}
//         <label className="flex items-center space-x-3 cursor-pointer">
//           <input
//             type="radio"
//             name="payment"
//             value="paypal"
//             checked={selectedPayment === "paypal"}
//             onChange={() => handlePaymentChange("paypal")}
//             className="form-radio text-blue-500"
//           />
//           <FaPaypal size={30} className="text-blue-600" />
//           <span className="text-lg font-medium text-gray-700">PayPal</span>
//         </label>

//         {/* Klarna */}
//         <label className="flex items-center space-x-3 cursor-pointer">
//           <input
//             type="radio"
//             name="payment"
//             value="klarna"
//             checked={selectedPayment === "klarna"}
//             onChange={() => handlePaymentChange("klarna")}
//             className="form-radio text-blue-500"
//           />
//           <SiKlarna size={30} className="text-pink-500" />
//           <span className="text-lg font-medium text-gray-700">Buy now, pay later with Klarna</span>
//         </label>

//         {/* Coinbase Commerce */}
//         <label className="flex items-center space-x-3 cursor-pointer">
//           <input
//             type="radio"
//             name="payment"
//             value="coinbase"
//             checked={selectedPayment === "coinbase"}
//             onChange={() => handlePaymentChange("coinbase")}
//             className="form-radio text-blue-500"
//           />
//           <SiCoinbase size={30} className="text-blue-500" />
//           <span className="text-lg font-medium text-gray-700">Coinbase Commerce</span>
//           <div className="ml-auto flex space-x-2 text-gray-500">
//             <FaBitcoin size={30} />
//           </div>
//         </label>

//         {/* Coinbase Commerce Redirect Message */}
//         {selectedPayment === "coinbase" && (
//           <div className="p-3 bg-gray-100 rounded-md text-sm text-gray-700">
//             You will be redirected to Coinbase to complete your purchase.
//           </div>
//         )}
//       </motion.div>

//       {/* Download Slip Button */}
//       <motion.div
//         initial={{ y: 20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ delay: 1 }}
//         className="text-center mt-6"
//       >
//         <button
//           onClick={downloadSlip}
//           className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//         >
//           Download Slip
//         </button>
//       </motion.div>
//     </motion.div>
//   );
// };

// export default CheckoutPage;























// "use client";

// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { FaCcVisa, FaCcMastercard, FaCcAmex, FaPaypal, FaBitcoin } from "react-icons/fa";
// import { SiCoinbase, SiKlarna } from "react-icons/si";
// import { jsPDF } from "jspdf"; // Import jsPDF for PDF generation

// export type CartItem = {
//   _id: string;
//   title: string;
//   price: number;
//   quantity: number;
//   image: string;
// };

// const CheckoutPage = () => {
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);
//   const [selectedPayment, setSelectedPayment] = useState("");
//   const [billingAddress, setBillingAddress] = useState("");
//   const [shippingAddress, setShippingAddress] = useState("");

//   useEffect(() => {
//     const savedCart = localStorage.getItem("cart");
//     if (savedCart) {
//       setCartItems(JSON.parse(savedCart));
//     }
//   }, []);

//   const handlePaymentChange = (method: string) => {
//     setSelectedPayment(method);
//   };

//   const calculateTotal = () => {
//     return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
//   };

//   const updateQuantity = (id: string, newQuantity: number) => {
//     if (newQuantity < 1) return;
//     const updatedCart = cartItems.map((item) =>
//       item._id === id ? { ...item, quantity: newQuantity } : item
//     );
//     setCartItems(updatedCart);
//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//   };

//   // Function to download receipt as PDF
//   const downloadSlip = () => {
//     const doc = new jsPDF();

//     // Header - Company Info with small Comforty logo
//     doc.setFont("helvetica", "bold");
//     doc.setFontSize(16);
//     doc.text("Comforty", 20, 20); // Company name
//     doc.setFontSize(10);
//     doc.text("12, MILKYWAY Galaxy/Earth", 20, 30);
//     doc.text("Tel: +9203318327545", 20, 35);
//     doc.text("Cashier: M1520", 120, 30);
//     doc.text("Date: 12/12/2023", 120, 35);

//     // Add Comforty logo image (ensure path is correct)
//     doc.addImage('/Logo Icon.png',  170, 15, 20, 20);  // Modify these values as per your desired image size and position

//     // Order List Header
//     doc.setFontSize(12);
//     doc.text("QTY  DESCRIPTION          PRICE     TOTAL", 20, 50);

//     let yPosition = 60;
//     cartItems.forEach((item) => {
//       const itemTotal = item.price * item.quantity;
//       doc.text(`${item.quantity}    ${item.title.substring(0, 20)}...  $${item.price.toFixed(2)}    $${itemTotal.toFixed(2)}`, 20, yPosition);
//       yPosition += 10;
//     });

//     // Summary - Tax and Total
//     const total = calculateTotal();
//     const tax = total * 0.17; // 17% VAT
//     doc.setFont("helvetica", "normal");
//     doc.text(`TAXABLE TOT:    $${total.toFixed(2)}`, 20, yPosition + 10);
//     doc.text(`VAT 17%:        $${tax.toFixed(2)}`, 20, yPosition + 20);
//     doc.text(`TOTAL:          $${(total + tax).toFixed(2)}`, 20, yPosition + 30);

//     // Footer - Thank You Message and Contact Info
//     yPosition += 40;
//     doc.setFontSize(10);
//     doc.text("* THANK YOU *", 20, yPosition);
//     doc.text("Contact us: Comforty.com@gami.com", 20, yPosition + 10);
    // doc.text("Phone: +9203318327545", 20, yPosition + 20);
    // doc.text("OWNER: I T boy", 20, yPosition + 30);

//     doc.save("receipt.pdf"); // Trigger download
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg"
//     >
//       <h1 className="text-3xl font-semibold mb-4 text-center text-blue-700">Checkout</h1>
//       <p className="text-gray-600 text-sm mb-4 text-center">All transactions are secure and encrypted.</p>

//       {/* Order Summary */}
//       <motion.div
//         initial={{ y: 20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ delay: 0.2 }}
//         className="border rounded-md p-4 mb-6 bg-gray-50"
//       >
//         <h2 className="text-2xl font-semibold mb-3 text-gray-800">Order Summary</h2>
//         {cartItems.length > 0 ? (
//           cartItems.map((item) => (
//             <motion.div
//               key={item._id}
//               className="flex justify-between items-center p-3 border-b"
//               whileHover={{ scale: 1.02 }}
//             >
//               <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded-md" />
//               <span className="text-gray-700">{item.title}</span>
//               <span className="text-gray-600">${item.price.toFixed(2)}</span>
//               <div className="flex items-center space-x-2">
//                 <button
//                   onClick={() => updateQuantity(item._id, item.quantity - 1)}
//                   className="px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
//                 >
//                   -
//                 </button>
//                 <span className="text-gray-800">{item.quantity}</span>
//                 <button
//                   onClick={() => updateQuantity(item._id, item.quantity + 1)}
//                   className="px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
//                 >
//                   +
//                 </button>
//               </div>
//             </motion.div>
//           ))
//         ) : (
//           <p>No items in cart</p>
//         )}
//         <div className="flex justify-between text-lg font-semibold mt-2 text-gray-800">
//           <span>Total</span>
//           <span>${calculateTotal().toFixed(2)}</span>
//         </div>
//       </motion.div>

//       {/* Shipping Information */}
//       <motion.div
//         initial={{ y: 20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ delay: 0.4 }}
//         className="border rounded-md p-4 mb-6 bg-gray-50"
//       >
//         <h2 className="text-2xl font-semibold mb-3 text-gray-800">Shipping Address</h2>
//         <input
//           type="text"
//           placeholder="Full Name"
//           className="w-full border p-3 mb-3 rounded-md"
//         />
//         <input
//           type="text"
//           placeholder="Street Address"
//           className="w-full border p-3 mb-3 rounded-md"
//           value={shippingAddress}
//           onChange={(e) => setShippingAddress(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="City"
//           className="w-full border p-3 mb-3 rounded-md"
//         />
//         <input
//           type="text"
//           placeholder="Postal Code"
//           className="w-full border p-3 mb-3 rounded-md"
//         />
//         <input
//           type="text"
//           placeholder="Phone Number"
//           className="w-full border p-3 mb-3 rounded-md"
//         />
//       </motion.div>

//       {/* Billing Information */}
//       <motion.div
//         initial={{ y: 20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ delay: 0.6 }}
//         className="border rounded-md p-4 mb-6 bg-gray-50"
//       >
//         <h2 className="text-2xl font-semibold mb-3 text-gray-800">Billing Address</h2>
//         <label className="flex items-center space-x-2 mb-3">
//           <input
//             type="checkbox"
//             onChange={() => setBillingAddress(shippingAddress)}
//             className="form-checkbox text-blue-500"
//           />
//           <span>Same as Shipping Address</span>
//         </label>
//         <input
//           type="text"
//           placeholder="Street Address"
//           className="w-full border p-3 mb-3 rounded-md"
//           value={billingAddress}
//           onChange={(e) => setBillingAddress(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="City"
//           className="w-full border p-3 mb-3 rounded-md"
//         />
//         <input
//           type="text"
//           placeholder="Postal Code"
//           className="w-full border p-3 mb-3 rounded-md"
//         />
//       </motion.div>

//       {/* Payment Options */}
//       <motion.div
//         initial={{ y: 20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ delay: 0.8 }}
//         className="border rounded-md p-4 space-y-3 mb-6 bg-gray-50"
//       >
//         <h2 className="text-2xl font-semibold mb-3 text-gray-800">Payment Method</h2>

//         {/* Credit Card */}
//         <label className="flex items-center space-x-3 cursor-pointer">
//           <input
//             type="radio"
//             name="payment"
//             value="credit_card"
//             checked={selectedPayment === "credit_card"}
//             onChange={() => handlePaymentChange("credit_card")}
//             className="form-radio text-blue-500"
//           />
//           <span className="text-lg font-medium text-gray-700">Credit Card</span>
//           <div className="ml-auto flex space-x-2 text-gray-500">
//             <FaCcVisa size={30} />
//             <FaCcMastercard size={30} />
//             <FaCcAmex size={30} />
//           </div>
//         </label>

//         {/* PayPal */}
//         <label className="flex items-center space-x-3 cursor-pointer">
//           <input
//             type="radio"
//             name="payment"
//             value="paypal"
//             checked={selectedPayment === "paypal"}
//             onChange={() => handlePaymentChange("paypal")}
//             className="form-radio text-blue-500"
//           />
//           <FaPaypal size={30} className="text-blue-600" />
//           <span className="text-lg font-medium text-gray-700">PayPal</span>
//         </label>

//         {/* Klarna */}
//         <label className="flex items-center space-x-3 cursor-pointer">
//           <input
//             type="radio"
//             name="payment"
//             value="klarna"
//             checked={selectedPayment === "klarna"}
//             onChange={() => handlePaymentChange("klarna")}
//             className="form-radio text-blue-500"
//           />
//           <SiKlarna size={30} className="text-pink-500" />
//           <span className="text-lg font-medium text-gray-700">Buy now, pay later with Klarna</span>
//         </label>

//         {/* Coinbase Commerce */}
//         <label className="flex items-center space-x-3 cursor-pointer">
//           <input
//             type="radio"
//             name="payment"
//             value="coinbase"
//             checked={selectedPayment === "coinbase"}
//             onChange={() => handlePaymentChange("coinbase")}
//             className="form-radio text-blue-500"
//           />
//           <SiCoinbase size={30} className="text-blue-500" />
//           <span className="text-lg font-medium text-gray-700">Coinbase Commerce</span>
//           <div className="ml-auto flex space-x-2 text-gray-500">
//             <FaBitcoin size={30} />
//           </div>
//         </label>

//         {/* Coinbase Commerce Redirect Message */}
//         {selectedPayment === "coinbase" && (
//           <div className="p-3 bg-gray-100 rounded-md text-sm text-gray-700">
//             You will be redirected to Coinbase to complete your purchase.
//           </div>
//         )}
//       </motion.div>

//       {/* Download Slip Button */}
//       <motion.div
//         initial={{ y: 20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ delay: 1 }}
//         className="text-center mt-6"
//       >
//         <button
//           onClick={downloadSlip}
//           className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//         >
//           Download Slip
//         </button>
//       </motion.div>
//     </motion.div>
//   );
// };

// export default CheckoutPage;















// "use client";

// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { FaCcVisa, FaCcMastercard, FaCcAmex, FaPaypal, FaBitcoin } from "react-icons/fa";
// import { SiCoinbase, SiKlarna } from "react-icons/si";
// import Link from "next/link";
// import { jsPDF } from "jspdf"; // Import jsPDF for PDF generation

// export type CartItem = {
//   _id: string;
//   title: string;
//   price: number;
//   quantity: number;
//   image: string;
// };

// const CheckoutPage = () => {
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);
//   const [selectedPayment, setSelectedPayment] = useState("");
//   const [billingAddress, setBillingAddress] = useState("");
//   const [shippingAddress, setShippingAddress] = useState("");

//   useEffect(() => {
//     const savedCart = localStorage.getItem("cart");
//     if (savedCart) {
//       setCartItems(JSON.parse(savedCart));
//     }
//   }, []);

//   const handlePaymentChange = (method: string) => {
//     setSelectedPayment(method);
//   };

//   const calculateTotal = () => {
//     return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
//   };

//   const updateQuantity = (id: string, newQuantity: number) => {
//     if (newQuantity < 1) return;
//     const updatedCart = cartItems.map((item) =>
//       item._id === id ? { ...item, quantity: newQuantity } : item
//     );
//     setCartItems(updatedCart);
//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//   };

//   const downloadSlip = () => {
//     const doc = new jsPDF();
//     doc.setFont("helvetica", "normal");
//     doc.setFontSize(16);
//     doc.text("Comforty", 20, 20); // Company Name
//     doc.addImage("/logo.png", "PNG", 20, 30, 50, 50); // Add Logo (Ensure logo.png is in public folder)

//     let yPosition = 80;
//     doc.text("Order Summary:", 20, yPosition);

//     cartItems.forEach((item, index) => {
//       yPosition += 10;
//       doc.text(`${item.title} - ${item.quantity} x $${item.price.toFixed(2)}`, 20, yPosition);
//     });

//     yPosition += 10;
//     doc.text(`Total: $${calculateTotal().toFixed(2)}`, 20, yPosition);

//     doc.save("order-slip.pdf"); // Trigger download
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg"
//     >
//       <h1 className="text-2xl font-semibold mb-4 text-center">Checkout</h1>
//       <p className="text-gray-600 text-sm mb-4 text-center">All transactions are secure and encrypted.</p>

//       {/* Order Summary */}
//       <motion.div
//         initial={{ y: 20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ delay: 0.2 }}
//         className="border rounded-md p-4 mb-6"
//       >
//         <h2 className="text-xl font-semibold mb-3">Order Summary</h2>
//         {cartItems.length > 0 ? (
//           cartItems.map((item) => (
//             <motion.div
//               key={item._id}
//               className="flex justify-between items-center p-2 border-b"
//               whileHover={{ scale: 1.02 }}
//             >
//               <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded-md" />
//               <span>{item.title}</span>
//               <span>${item.price.toFixed(2)}</span>
//               <div className="flex items-center space-x-2">
//                 <button
//                   onClick={() => updateQuantity(item._id, item.quantity - 1)}
//                   className="px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
//                 >
//                   -
//                 </button>
//                 <span>{item.quantity}</span>
//                 <button
//                   onClick={() => updateQuantity(item._id, item.quantity + 1)}
//                   className="px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
//                 >
//                   +
//                 </button>
//               </div>
//             </motion.div>
//           ))
//         ) : (
//           <p>No items in cart</p>
//         )}
//         <div className="flex justify-between text-lg font-semibold mt-2">
//           <span>Total</span>
//           <span>${calculateTotal().toFixed(2)}</span>
//         </div>
//       </motion.div>

//       {/* Shipping Information */}
//       <motion.div
//         initial={{ y: 20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ delay: 0.4 }}
//         className="border rounded-md p-4 mb-6"
//       >
//         <h2 className="text-xl font-semibold mb-3">Shipping Address</h2>
//         <input
//           type="text"
//           placeholder="Full Name"
//           className="w-full border p-2 mb-2 rounded-md"
//         />
//         <input
//           type="text"
//           placeholder="Street Address"
//           className="w-full border p-2 mb-2 rounded-md"
//           value={shippingAddress}
//           onChange={(e) => setShippingAddress(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="City"
//           className="w-full border p-2 mb-2 rounded-md"
//         />
//         <input
//           type="text"
//           placeholder="Postal Code"
//           className="w-full border p-2 mb-2 rounded-md"
//         />
//         <input
//           type="text"
//           placeholder="Phone Number"
//           className="w-full border p-2 mb-2 rounded-md"
//         />
//       </motion.div>

//       {/* Billing Information */}
//       <motion.div
//         initial={{ y: 20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ delay: 0.6 }}
//         className="border rounded-md p-4 mb-6"
//       >
//         <h2 className="text-xl font-semibold mb-3">Billing Address</h2>
//         <label className="flex items-center space-x-2 mb-3">
//           <input
//             type="checkbox"
//             onChange={() => setBillingAddress(shippingAddress)}
//             className="form-checkbox text-blue-500"
//           />
//           <span>Same as Shipping Address</span>
//         </label>
//         <input
//           type="text"
//           placeholder="Street Address"
//           className="w-full border p-2 mb-2 rounded-md"
//           value={billingAddress}
//           onChange={(e) => setBillingAddress(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="City"
//           className="w-full border p-2 mb-2 rounded-md"
//         />
//         <input
//           type="text"
//           placeholder="Postal Code"
//           className="w-full border p-2 mb-2 rounded-md"
//         />
//       </motion.div>

//       {/* Payment Options */}
//       <motion.div
//         initial={{ y: 20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ delay: 0.8 }}
//         className="border rounded-md p-4 space-y-3"
//       >
//         <h2 className="text-xl font-semibold mb-3">Payment Method</h2>

//         {/* Credit Card */}
//         <label className="flex items-center space-x-3 cursor-pointer">
//           <input
//             type="radio"
//             name="payment"
//             value="credit_card"
//             checked={selectedPayment === "credit_card"}
//             onChange={() => handlePaymentChange("credit_card")}
//             className="form-radio text-blue-500"
//           />
//           <span className="text-lg font-medium">Credit Card</span>
//           <div className="ml-auto flex space-x-2 text-gray-500">
//             <FaCcVisa size={30} />
//             <FaCcMastercard size={30} />
//             <FaCcAmex size={30} />
//           </div>
//         </label>

//         {/* PayPal */}
//         <label className="flex items-center space-x-3 cursor-pointer">
//           <input
//             type="radio"
//             name="payment"
//             value="paypal"
//             checked={selectedPayment === "paypal"}
//             onChange={() => handlePaymentChange("paypal")}
//             className="form-radio text-blue-500"
//           />
//           <FaPaypal size={30} className="text-blue-600" />
//           <span className="text-lg font-medium">PayPal</span>
//         </label>

//         {/* Cryptocurrencies */}
//         <label className="flex items-center space-x-3 cursor-pointer">
//           <input
//             type="radio"
//             name="payment"
//             value="crypto"
//             checked={selectedPayment === "crypto"}
//             onChange={() => handlePaymentChange("crypto")}
//             className="form-radio text-blue-500"
//           />
//           <span className="text-lg font-medium">Crypto</span>
//           <div className="ml-auto flex space-x-2 text-gray-500">
//             <FaBitcoin size={30} />
//             <SiCoinbase size={30} />
//           </div>
//         </label>

//         {/* Klarna */}
//         <label className="flex items-center space-x-3 cursor-pointer">
//           <input
//             type="radio"
//             name="payment"
//             value="klarna"
//             checked={selectedPayment === "klarna"}
//             onChange={() => handlePaymentChange("klarna")}
//             className="form-radio text-blue-500"
//           />
//           <SiKlarna size={30} />
//           <span className="text-lg font-medium">Klarna</span>
//         </label>
//       </motion.div>

//       {/* Download Slip Button */}
//       <motion.div
//         initial={{ y: 20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ delay: 1 }}
//         className="text-center mt-6"
//       >
//         <button
//           onClick={downloadSlip}
//           className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//         >
//           Download Slip
//         </button>
//       </motion.div>
//     </motion.div>
//   );
// };

// export default CheckoutPage;




// "use client";

// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { FaCcVisa, FaCcMastercard, FaCcAmex, FaPaypal, FaBitcoin } from "react-icons/fa";
// import { SiCoinbase, SiKlarna } from "react-icons/si";
// import Link from "next/link";

// export type CartItem = {
//   _id: string;
//   title: string;
//   price: number;
//   quantity: number;
//   image: string;
// };

// const CheckoutPage = () => {
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);
//   const [selectedPayment, setSelectedPayment] = useState("");
//   const [billingAddress, setBillingAddress] = useState("");
//   const [shippingAddress, setShippingAddress] = useState("");

//   useEffect(() => {
//     const savedCart = localStorage.getItem("cart");
//     if (savedCart) {
//       setCartItems(JSON.parse(savedCart));
//     }
//   }, []);

//   const handlePaymentChange = (method: string) => {
//     setSelectedPayment(method);
//   };

//   const calculateTotal = () => {
//     return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
//   };

//   const updateQuantity = (id: string, newQuantity: number) => {
//     if (newQuantity < 1) return;
//     const updatedCart = cartItems.map((item) =>
//       item._id === id ? { ...item, quantity: newQuantity } : item
//     );
//     setCartItems(updatedCart);
//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg"
//     >
//       <h1 className="text-2xl font-semibold mb-4 text-center">Checkout</h1>
//       <p className="text-gray-600 text-sm mb-4 text-center">All transactions are secure and encrypted.</p>

//       {/* Order Summary */}
//       <motion.div 
//         initial={{ y: 20, opacity: 0 }} 
//         animate={{ y: 0, opacity: 1 }} 
//         transition={{ delay: 0.2 }}
//         className="border rounded-md p-4 mb-6"
//       >
//         <h2 className="text-xl font-semibold mb-3">Order Summary</h2>
//         {cartItems.length > 0 ? (
//           cartItems.map((item) => (
//             <motion.div 
//               key={item._id} 
//               className="flex justify-between items-center p-2 border-b"
//               whileHover={{ scale: 1.02 }}
//             >
//               <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded-md" />
//               <span>{item.title}</span>
//               <span>${item.price.toFixed(2)}</span>
//               <div className="flex items-center space-x-2">
//                 <button
//                   onClick={() => updateQuantity(item._id, item.quantity - 1)}
//                   className="px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
//                 >
//                   -
//                 </button>
//                 <span>{item.quantity}</span>
//                 <button
//                   onClick={() => updateQuantity(item._id, item.quantity + 1)}
//                   className="px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
//                 >
//                   +
//                 </button>
//               </div>
//             </motion.div>
//           ))
//         ) : (
//           <p>No items in cart</p>
//         )}
//         <div className="flex justify-between text-lg font-semibold mt-2">
//           <span>Total</span>
//           <span>${calculateTotal().toFixed(2)}</span>
//         </div>
//       </motion.div>

//       {/* Shipping Information */}
//       <motion.div
//         initial={{ y: 20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ delay: 0.4 }}
//         className="border rounded-md p-4 mb-6"
//       >
//         <h2 className="text-xl font-semibold mb-3">Shipping Address</h2>
//         <input
//           type="text"
//           placeholder="Full Name"
//           className="w-full border p-2 mb-2 rounded-md"
//         />
//         <input
//           type="text"
//           placeholder="Street Address"
//           className="w-full border p-2 mb-2 rounded-md"
//           value={shippingAddress}
//           onChange={(e) => setShippingAddress(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="City"
//           className="w-full border p-2 mb-2 rounded-md"
//         />
//         <input
//           type="text"
//           placeholder="Postal Code"
//           className="w-full border p-2 mb-2 rounded-md"
//         />
//         <input
//           type="text"
//           placeholder="Phone Number"
//           className="w-full border p-2 mb-2 rounded-md"
//         />
//       </motion.div>

//       {/* Billing Information */}
//       <motion.div
//         initial={{ y: 20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ delay: 0.6 }}
//         className="border rounded-md p-4 mb-6"
//       >
//         <h2 className="text-xl font-semibold mb-3">Billing Address</h2>
//         <label className="flex items-center space-x-2 mb-3">
//           <input
//             type="checkbox"
//             onChange={() => setBillingAddress(shippingAddress)}
//             className="form-checkbox text-blue-500"
//           />
//           <span>Same as Shipping Address</span>
//         </label>
//         <input
//           type="text"
//           placeholder="Street Address"
//           className="w-full border p-2 mb-2 rounded-md"
//           value={billingAddress}
//           onChange={(e) => setBillingAddress(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="City"
//           className="w-full border p-2 mb-2 rounded-md"
//         />
//         <input
//           type="text"
//           placeholder="Postal Code"
//           className="w-full border p-2 mb-2 rounded-md"
//         />
//       </motion.div>

//       {/* Payment Options */}
//       <motion.div
//         initial={{ y: 20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ delay: 0.8 }}
//         className="border rounded-md p-4 space-y-3"
//       >
//         <h2 className="text-xl font-semibold mb-3">Payment Method</h2>

//         {/* Credit Card */}
//         <label className="flex items-center space-x-3 cursor-pointer">
//           <input
//             type="radio"
//             name="payment"
//             value="credit_card"
//             checked={selectedPayment === "credit_card"}
//             onChange={() => handlePaymentChange("credit_card")}
//             className="form-radio text-blue-500"
//           />
//           <span className="text-lg font-medium">Credit Card</span>
//           <div className="ml-auto flex space-x-2 text-gray-500">
//             <FaCcVisa size={30} />
//             <FaCcMastercard size={30} />
//             <FaCcAmex size={30} />
//           </div>
//         </label>

//         {/* PayPal */}
//         <label className="flex items-center space-x-3 cursor-pointer">
//           <input
//             type="radio"
//             name="payment"
//             value="paypal"
//             checked={selectedPayment === "paypal"}
//             onChange={() => handlePaymentChange("paypal")}
//             className="form-radio text-blue-500"
//           />
//           <FaPaypal size={30} className="text-blue-600" />
//           <span className="text-lg font-medium">PayPal</span>
//         </label>

//         {/* Klarna */}
//         <label className="flex items-center space-x-3 cursor-pointer">
//           <input
//             type="radio"
//             name="payment"
//             value="klarna"
//             checked={selectedPayment === "klarna"}
//             onChange={() => handlePaymentChange("klarna")}
//             className="form-radio text-blue-500"
//           />
//           <SiKlarna size={30} className="text-pink-500" />
//           <span className="text-lg font-medium">Buy now, pay later with Klarna</span>
//         </label>

//         {/* Coinbase Commerce */}
//         <label className="flex items-center space-x-3 cursor-pointer">
//           <input
//             type="radio"
//             name="payment"
//             value="coinbase"
//             checked={selectedPayment === "coinbase"}
//             onChange={() => handlePaymentChange("coinbase")}
//             className="form-radio text-blue-500"
//           />
//           <SiCoinbase size={30} className="text-blue-500" />
//           <span className="text-lg font-medium">Coinbase Commerce</span>
//           <div className="ml-auto flex space-x-2 text-gray-500">
//             <FaBitcoin size={30} />
//           </div>
//         </label>

//         {/* Coinbase Commerce Redirect Message */}
//         {selectedPayment === "coinbase" && (
//           <div className="p-3 bg-gray-100 rounded-md text-sm text-gray-700">
//             You will be redirected to Coinbase to complete your purchase.
//           </div>
//         )}
//       </motion.div>

//       {/* Submit Button */}
//       <motion.div 
//   initial={{ y: 20, opacity: 0 }} 
//   animate={{ y: 0, opacity: 1 }} 
//   transition={{ delay: 1.0 }} 
//   className="text-center"
// >
//   <Link href="/shipment">
    
//       <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
//         Complete Purchase
//       </button>
    
//   </Link>
// </motion.div>
//     </motion.div>
//   );
// };

// export default CheckoutPage;












// "use client";

// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { FaCcVisa, FaCcMastercard, FaCcAmex, FaPaypal, FaBitcoin } from "react-icons/fa";
// import { SiCoinbase, SiKlarna } from "react-icons/si";

// export type CartItem = {
//   _id: string;
//   title: string;
//   price: number;
//   quantity: number;
//   image: string;
// };

// const CheckoutPage = () => {
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);
//   const [selectedPayment, setSelectedPayment] = useState("");
//   const [billingAddress, setBillingAddress] = useState("");
//   const [shippingAddress, setShippingAddress] = useState("");

//   useEffect(() => {
//     const savedCart = localStorage.getItem("cart");
//     if (savedCart) {
//       setCartItems(JSON.parse(savedCart));
//     }
//   }, []);

//   const handlePaymentChange = (method: string) => {
//     setSelectedPayment(method);
//   };

//   const calculateTotal = () => {
//     return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
//   };

//   const updateQuantity = (id: string, newQuantity: number) => {
//     if (newQuantity < 1) return;
//     const updatedCart = cartItems.map((item) =>
//       item._id === id ? { ...item, quantity: newQuantity } : item
//     );
//     setCartItems(updatedCart);
//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg"
//     >
//       <h1 className="text-2xl font-semibold mb-4 text-center">Checkout</h1>
//       <p className="text-gray-600 text-sm mb-4 text-center">All transactions are secure and encrypted.</p>

//       {/* Order Summary */}
//       <motion.div 
//         initial={{ y: 20, opacity: 0 }} 
//         animate={{ y: 0, opacity: 1 }} 
//         transition={{ delay: 0.2 }}
//         className="border rounded-md p-4 mb-6"
//       >
//         <h2 className="text-xl font-semibold mb-3">Order Summary</h2>
//         {cartItems.length > 0 ? (
//           cartItems.map((item) => (
//             <motion.div 
//               key={item._id} 
//               className="flex justify-between items-center p-2 border-b"
//               whileHover={{ scale: 1.02 }}
//             >
//               <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded-md" />
//               <span>{item.title}</span>
//               <span>${item.price.toFixed(2)}</span>
//               <div className="flex items-center space-x-2">
//                 <button
//                   onClick={() => updateQuantity(item._id, item.quantity - 1)}
//                   className="px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
//                 >
//                   -
//                 </button>
//                 <span>{item.quantity}</span>
//                 <button
//                   onClick={() => updateQuantity(item._id, item.quantity + 1)}
//                   className="px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
//                 >
//                   +
//                 </button>
//               </div>
//             </motion.div>
//           ))
//         ) : (
//           <p>No items in cart</p>
//         )}
//         <div className="flex justify-between text-lg font-semibold mt-2">
//           <span>Total</span>
//           <span>${calculateTotal().toFixed(2)}</span>
//         </div>
//       </motion.div>

//       {/* Shipping Information */}
//       <motion.div
//         initial={{ y: 20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ delay: 0.4 }}
//         className="border rounded-md p-4 mb-6"
//       >
//         <h2 className="text-xl font-semibold mb-3">Shipping Address</h2>
//         <input
//           type="text"
//           placeholder="Full Name"
//           className="w-full border p-2 mb-2 rounded-md"
//         />
//         <input
//           type="text"
//           placeholder="Street Address"
//           className="w-full border p-2 mb-2 rounded-md"
//           value={shippingAddress}
//           onChange={(e) => setShippingAddress(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="City"
//           className="w-full border p-2 mb-2 rounded-md"
//         />
//         <input
//           type="text"
//           placeholder="Postal Code"
//           className="w-full border p-2 mb-2 rounded-md"
//         />
//         <input
//           type="text"
//           placeholder="Phone Number"
//           className="w-full border p-2 mb-2 rounded-md"
//         />
//       </motion.div>

//       {/* Billing Information */}
//       <motion.div
//         initial={{ y: 20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ delay: 0.6 }}
//         className="border rounded-md p-4 mb-6"
//       >
//         <h2 className="text-xl font-semibold mb-3">Billing Address</h2>
//         <label className="flex items-center space-x-2 mb-3">
//           <input
//             type="checkbox"
//             onChange={() => setBillingAddress(shippingAddress)}
//             className="form-checkbox text-blue-500"
//           />
//           <span>Same as Shipping Address</span>
//         </label>
//         <input
//           type="text"
//           placeholder="Street Address"
//           className="w-full border p-2 mb-2 rounded-md"
//           value={billingAddress}
//           onChange={(e) => setBillingAddress(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="City"
//           className="w-full border p-2 mb-2 rounded-md"
//         />
//         <input
//           type="text"
//           placeholder="Postal Code"
//           className="w-full border p-2 mb-2 rounded-md"
//         />
//       </motion.div>

//       {/* Payment Options */}
//       <motion.div
//         initial={{ y: 20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ delay: 0.8 }}
//         className="border rounded-md p-4 space-y-3"
//       >
//         <h2 className="text-xl font-semibold mb-3">Payment Method</h2>

//         {/* Credit Card */}
//         <label className="flex items-center space-x-3 cursor-pointer">
//           <input
//             type="radio"
//             name="payment"
//             value="credit_card"
//             checked={selectedPayment === "credit_card"}
//             onChange={() => handlePaymentChange("credit_card")}
//             className="form-radio text-blue-500"
//           />
//           <span className="text-lg font-medium">Credit Card</span>
//           <div className="ml-auto flex space-x-2 text-gray-500">
//             <FaCcVisa size={30} />
//             <FaCcMastercard size={30} />
//             <FaCcAmex size={30} />
//           </div>
//         </label>

//         {/* PayPal */}
//         <label className="flex items-center space-x-3 cursor-pointer">
//           <input
//             type="radio"
//             name="payment"
//             value="paypal"
//             checked={selectedPayment === "paypal"}
//             onChange={() => handlePaymentChange("paypal")}
//             className="form-radio text-blue-500"
//           />
//           <FaPaypal size={30} className="text-blue-600" />
//           <span className="text-lg font-medium">PayPal</span>
//         </label>

//         {/* Klarna */}
//         <label className="flex items-center space-x-3 cursor-pointer">
//           <input
//             type="radio"
//             name="payment"
//             value="klarna"
//             checked={selectedPayment === "klarna"}
//             onChange={() => handlePaymentChange("klarna")}
//             className="form-radio text-blue-500"
//           />
//           <SiKlarna size={30} className="text-pink-500" />
//           <span className="text-lg font-medium">Buy now, pay later with Klarna</span>
//         </label>

//         {/* Coinbase Commerce */}
//         <label className="flex items-center space-x-3 cursor-pointer">
//           <input
//             type="radio"
//             name="payment"
//             value="coinbase"
//             checked={selectedPayment === "coinbase"}
//             onChange={() => handlePaymentChange("coinbase")}
//             className="form-radio text-blue-500"
//           />
//           <SiCoinbase size={30} className="text-blue-500" />
//           <span className="text-lg font-medium">Coinbase Commerce</span>
//           <div className="ml-auto flex space-x-2 text-gray-500">
//             <FaBitcoin size={30} />
//           </div>
//         </label>

//         {/* Coinbase Commerce Redirect Message */}
//         {selectedPayment === "coinbase" && (
//           <div className="p-3 bg-gray-100 rounded-md text-center text-sm text-gray-600">
//             After clicking <strong>"Complete Order"</strong>, you will be redirected to Coinbase Commerce to complete your purchase securely.
//           </div>
//         )}
//       </motion.div>

//       {/* Checkout Buttons */}
//       <motion.div
//         initial={{ y: 20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ delay: 1.0 }}
//         className="mt-6 flex justify-between"
//       >
//         <button className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600">Clear Cart</button>
//         <button
//   className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
//   disabled={!selectedPayment}
//   onClick={() => window.location.href = "/shipment"}
// >
//   Complete Order
// </button>

//       </motion.div>
//     </motion.div>
//   );
// };

// export default CheckoutPage;















// "use client";

// import { useEffect, useState } from "react";
// import { FaCcVisa, FaCcMastercard, FaCcAmex, FaPaypal, FaBitcoin } from "react-icons/fa";
// import { SiCoinbase, SiKlarna } from "react-icons/si";

// export type CartItem = {
//   _id: string;
//   title: string;
//   price: number;
//   quantity: number;
//   image: string;
// };

// const CheckoutPage = () => {
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);
//   const [selectedPayment, setSelectedPayment] = useState("");
//   const [billingAddress, setBillingAddress] = useState("");
//   const [shippingAddress, setShippingAddress] = useState("");

//   useEffect(() => {
//     const savedCart = localStorage.getItem("cart");
//     if (savedCart) {
//       setCartItems(JSON.parse(savedCart));
//     }
//   }, []);

//   const handlePaymentChange = (method: string) => {
//     setSelectedPayment(method);
//   };

//   const calculateTotal = () => {
//     return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
//   };

//   const updateQuantity = (id: string, newQuantity: number) => {
//     if (newQuantity < 1) return; // Ensure quantity is at least 1
//     const updatedCart = cartItems.map((item) =>
//       item._id === id ? { ...item, quantity: newQuantity } : item
//     );
//     setCartItems(updatedCart);
//     localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update localStorage
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
//       <h1 className="text-2xl font-semibold mb-4">Checkout</h1>
//       <p className="text-gray-600 text-sm mb-4">All transactions are secure and encrypted.</p>

//       {/* Order Summary */}
//       <div className="border rounded-md p-4 mb-6">
//         <h2 className="text-xl font-semibold mb-3">Order Summary</h2>
//         {cartItems.length > 0 ? (
//           cartItems.map((item) => (
//             <div key={item._id} className="flex justify-between items-center p-2 border-b">
//               <img src={item.image} alt={item.title} className="w-16 h-16 object-cover" />
//               <span>{item.title}</span>
//               <span>${item.price.toFixed(2)}</span>
//               <div className="flex items-center space-x-2">
//                 <button
//                   onClick={() => updateQuantity(item._id, item.quantity - 1)}
//                   className="px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
//                 >
//                   -
//                 </button>
//                 <span>{item.quantity}</span>
//                 <button
//                   onClick={() => updateQuantity(item._id, item.quantity + 1)}
//                   className="px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
//                 >
//                   +
//                 </button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No items in cart</p>
//         )}
//         <div className="flex justify-between text-lg font-semibold mt-2">
//           <span>Total</span>
//           <span>${calculateTotal().toFixed(2)}</span>
//         </div>
//       </div>

//       {/* Shipping Information */}
//       <div className="border rounded-md p-4 mb-6">
//         <h2 className="text-xl font-semibold mb-3">Shipping Address</h2>
//         <input
//           type="text"
//           placeholder="Full Name"
//           className="w-full border p-2 mb-2 rounded-md"
//         />
//         <input
//           type="text"
//           placeholder="Street Address"
//           className="w-full border p-2 mb-2 rounded-md"
//           value={shippingAddress}
//           onChange={(e) => setShippingAddress(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="City"
//           className="w-full border p-2 mb-2 rounded-md"
//         />
//         <input
//           type="text"
//           placeholder="Postal Code"
//           className="w-full border p-2 mb-2 rounded-md"
//         />
//         <input
//           type="text"
//           placeholder="Phone Number"
//           className="w-full border p-2 mb-2 rounded-md"
//         />
//       </div>

//       {/* Billing Information */}
//       <div className="border rounded-md p-4 mb-6">
//         <h2 className="text-xl font-semibold mb-3">Billing Address</h2>
//         <label className="flex items-center space-x-2 mb-3">
//           <input
//             type="checkbox"
//             onChange={() => setBillingAddress(shippingAddress)}
//             className="form-checkbox text-blue-500"
//           />
//           <span>Same as Shipping Address</span>
//         </label>
//         <input
//           type="text"
//           placeholder="Street Address"
//           className="w-full border p-2 mb-2 rounded-md"
//           value={billingAddress}
//           onChange={(e) => setBillingAddress(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="City"
//           className="w-full border p-2 mb-2 rounded-md"
//         />
//         <input
//           type="text"
//           placeholder="Postal Code"
//           className="w-full border p-2 mb-2 rounded-md"
//         />
//       </div>

//       {/* Payment Options */}
//       <div className="border rounded-md p-4 space-y-3">
//         <h2 className="text-xl font-semibold mb-3">Payment Method</h2>

//         {/* Credit Card */}
//         <label className="flex items-center space-x-3 cursor-pointer">
//           <input
//             type="radio"
//             name="payment"
//             value="credit_card"
//             checked={selectedPayment === "credit_card"}
//             onChange={() => handlePaymentChange("credit_card")}
//             className="form-radio text-blue-500"
//           />
//           <span className="text-lg font-medium">Credit Card</span>
//           <div className="ml-auto flex space-x-2 text-gray-500">
//             <FaCcVisa size={30} />
//             <FaCcMastercard size={30} />
//             <FaCcAmex size={30} />
//           </div>
//         </label>

//         {/* PayPal */}
//         <label className="flex items-center space-x-3 cursor-pointer">
//           <input
//             type="radio"
//             name="payment"
//             value="paypal"
//             checked={selectedPayment === "paypal"}
//             onChange={() => handlePaymentChange("paypal")}
//             className="form-radio text-blue-500"
//           />
//           <FaPaypal size={30} className="text-blue-600" />
//           <span className="text-lg font-medium">PayPal</span>
//         </label>

//         {/* Klarna */}
//         <label className="flex items-center space-x-3 cursor-pointer">
//           <input
//             type="radio"
//             name="payment"
//             value="klarna"
//             checked={selectedPayment === "klarna"}
//             onChange={() => handlePaymentChange("klarna")}
//             className="form-radio text-blue-500"
//           />
//           <SiKlarna size={30} className="text-pink-500" />
//           <span className="text-lg font-medium">Buy now, pay later with Klarna</span>
//         </label>

//         {/* Coinbase Commerce */}
//         <label className="flex items-center space-x-3 cursor-pointer">
//           <input
//             type="radio"
//             name="payment"
//             value="coinbase"
//             checked={selectedPayment === "coinbase"}
//             onChange={() => handlePaymentChange("coinbase")}
//             className="form-radio text-blue-500"
//           />
//           <SiCoinbase size={30} className="text-blue-500" />
//           <span className="text-lg font-medium">Coinbase Commerce</span>
//           <div className="ml-auto flex space-x-2 text-gray-500">
//             <FaBitcoin size={30} />
//           </div>
//         </label>

//         {/* Coinbase Commerce Redirect Message */}
//         {selectedPayment === "coinbase" && (
//           <div className="p-3 bg-gray-100 rounded-md text-center text-sm text-gray-600">
//             After clicking <strong>"Complete Order"</strong>, you will be redirected to Coinbase Commerce to complete your purchase securely.
//           </div>
//         )}
//       </div>

//       {/* Complete Order Button */}
//       <button
//         className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md font-medium transition-colors"
//         disabled={!selectedPayment}
//       >
//         Complete Order
//       </button>
//     </div>
//   );
// };

// export default CheckoutPage;
// "use client";

// import { useEffect, useState } from "react";
// import { FaCcVisa, FaCcMastercard, FaCcAmex, FaPaypal, FaBitcoin } from "react-icons/fa";
// import { SiCoinbase, SiKlarna } from "react-icons/si";

// export type CartItem = {
//   _id: string;
//   title: string;
//   price: number;
//   quantity: number;
//   image: string;
// };

// const CheckoutPage = () => {
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);
//   const [selectedPayment, setSelectedPayment] = useState("");
//   const [billingAddress, setBillingAddress] = useState("");
//   const [shippingAddress, setShippingAddress] = useState("");

//   useEffect(() => {
//     const savedCart = localStorage.getItem("cart");
//     if (savedCart) {
//       setCartItems(JSON.parse(savedCart));
//     }
//   }, []);

//   const handlePaymentChange = (method: string) => {
//     setSelectedPayment(method);
//   };

//   const calculateTotal = () => {
//     return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
//       <h1 className="text-2xl font-semibold mb-4">Checkout</h1>
//       <p className="text-gray-600 text-sm mb-4">All transactions are secure and encrypted.</p>

//       {/* Order Summary */}
//       <div className="border rounded-md p-4 mb-6">
//         <h2 className="text-xl font-semibold mb-3">Order Summary</h2>
//         {cartItems.length > 0 ? (
//           cartItems.map((item) => (
//             <div key={item._id} className="flex justify-between p-2 border-b">
//               <img src={item.image} alt={item.title} className="w-16 h-16 object-cover" />
//               <span>{item.title}</span>
//               <span>${item.price.toFixed(2)}</span>
//               <span>Qty: {item.quantity}</span>
//             </div>
//           ))
//         ) : (
//           <p>No items in cart</p>
//         )}
//         <div className="flex justify-between text-lg font-semibold mt-2">
//           <span>Total</span>
//           <span>${calculateTotal().toFixed(2)}</span>
//         </div>
//       </div>

//       {/* Shipping Information */}
//       <div className="border rounded-md p-4 mb-6">
//         <h2 className="text-xl font-semibold mb-3">Shipping Address</h2>
//         <input
//           type="text"
//           placeholder="Full Name"
//           className="w-full border p-2 mb-2 rounded-md"
//         />
//         <input
//           type="text"
//           placeholder="Street Address"
//           className="w-full border p-2 mb-2 rounded-md"
//           value={shippingAddress}
//           onChange={(e) => setShippingAddress(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="City"
//           className="w-full border p-2 mb-2 rounded-md"
//         />
//         <input
//           type="text"
//           placeholder="Postal Code"
//           className="w-full border p-2 mb-2 rounded-md"
//         />
//         <input
//           type="text"
//           placeholder="Phone Number"
//           className="w-full border p-2 mb-2 rounded-md"
//         />
//       </div>

//       {/* Billing Information */}
//       <div className="border rounded-md p-4 mb-6">
//         <h2 className="text-xl font-semibold mb-3">Billing Address</h2>
//         <label className="flex items-center space-x-2 mb-3">
//           <input
//             type="checkbox"
//             onChange={() => setBillingAddress(shippingAddress)}
//             className="form-checkbox text-blue-500"
//           />
//           <span>Same as Shipping Address</span>
//         </label>
//         <input
//           type="text"
//           placeholder="Street Address"
//           className="w-full border p-2 mb-2 rounded-md"
//           value={billingAddress}
//           onChange={(e) => setBillingAddress(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="City"
//           className="w-full border p-2 mb-2 rounded-md"
//         />
//         <input
//           type="text"
//           placeholder="Postal Code"
//           className="w-full border p-2 mb-2 rounded-md"
//         />
//       </div>

//       {/* Payment Options */}
//       <div className="border rounded-md p-4 space-y-3">
//         <h2 className="text-xl font-semibold mb-3">Payment Method</h2>

//         {/* Credit Card */}
//         <label className="flex items-center space-x-3 cursor-pointer">
//           <input
//             type="radio"
//             name="payment"
//             value="credit_card"
//             checked={selectedPayment === "credit_card"}
//             onChange={() => handlePaymentChange("credit_card")}
//             className="form-radio text-blue-500"
//           />
//           <span className="text-lg font-medium">Credit Card</span>
//           <div className="ml-auto flex space-x-2 text-gray-500">
//             <FaCcVisa size={30} />
//             <FaCcMastercard size={30} />
//             <FaCcAmex size={30} />
//           </div>
//         </label>

//         {/* PayPal */}
//         <label className="flex items-center space-x-3 cursor-pointer">
//           <input
//             type="radio"
//             name="payment"
//             value="paypal"
//             checked={selectedPayment === "paypal"}
//             onChange={() => handlePaymentChange("paypal")}
//             className="form-radio text-blue-500"
//           />
//           <FaPaypal size={30} className="text-blue-600" />
//           <span className="text-lg font-medium">PayPal</span>
//         </label>

//         {/* Klarna */}
//         <label className="flex items-center space-x-3 cursor-pointer">
//           <input
//             type="radio"
//             name="payment"
//             value="klarna"
//             checked={selectedPayment === "klarna"}
//             onChange={() => handlePaymentChange("klarna")}
//             className="form-radio text-blue-500"
//           />
//           <SiKlarna size={30} className="text-pink-500" />
//           <span className="text-lg font-medium">Buy now, pay later with Klarna</span>
//         </label>

//         {/* Coinbase Commerce */}
//         <label className="flex items-center space-x-3 cursor-pointer">
//           <input
//             type="radio"
//             name="payment"
//             value="coinbase"
//             checked={selectedPayment === "coinbase"}
//             onChange={() => handlePaymentChange("coinbase")}
//             className="form-radio text-blue-500"
//           />
//           <SiCoinbase size={30} className="text-blue-500" />
//           <span className="text-lg font-medium">Coinbase Commerce</span>
//           <div className="ml-auto flex space-x-2 text-gray-500">
//             <FaBitcoin size={30} />
//           </div>
//         </label>

//         {/* Coinbase Commerce Redirect Message */}
//         {selectedPayment === "coinbase" && (
//           <div className="p-3 bg-gray-100 rounded-md text-center text-sm text-gray-600">
//             After clicking <strong>"Complete Order"</strong>, you will be redirected to Coinbase Commerce to complete your purchase securely.
//           </div>
//         )}
//       </div>

//       {/* Complete Order Button */}
//       <button
//         className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md font-medium transition-colors"
//         disabled={!selectedPayment}
//       >
//         Complete Order
//       </button>
//     </div>
//   );
// };

// export default CheckoutPage;
// "use client";

// import { useEffect, useState } from "react";
// import { Product } from "@/app/types/product";

// export type CartItem = {
//   _id: string;
//   title: string;
//   price: number;
//   quantity: number;
//   image: string;
// };

// const CheckoutPage = () => {
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);

//   useEffect(() => {
//     const savedCart = localStorage.getItem("cart");
//     if (savedCart) {
//       setCartItems(JSON.parse(savedCart));
//     }
//   }, []);

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-4">Checkout</h1>
//       <div className="border p-4">
//         <h2 className="text-xl font-semibold">Cart Summary</h2>
//         {cartItems.length > 0 ? (
//           cartItems.map((item) => (
//             <div key={item._id} className="flex justify-between p-2 border-b">
//               <img src={item.image} alt={item.title} className="w-16 h-16 object-cover" />
//               <span>{item.title}</span>
//               <span>${item.price.toFixed(2)}</span>
//               <span>Qty: {item.quantity}</span>
//             </div>
//           ))
//         ) : (
//           <p>No items in cart</p>
//         )}
//       </div>
//       <div className="mt-6">
//         <h2 className="text-xl font-semibold">Shipping Information</h2>
//         <input type="text" placeholder="Full Name" className="w-full border p-2 mt-2" />
//         <input type="text" placeholder="Address" className="w-full border p-2 mt-2" />
//         <input type="text" placeholder="City" className="w-full border p-2 mt-2" />
//       </div>
//       <div className="mt-6">
//         <h2 className="text-xl font-semibold">Payment</h2>
//         <input type="text" placeholder="Card Number" className="w-full border p-2 mt-2" />
//         <button className="bg-green-500 text-white px-4 py-2 rounded mt-4">Place Order</button>
//       </div>
//     </div>
//   );
// };

// export default CheckoutPage;










//                                          imaage wala 
// "use client";

// import { useEffect, useState } from "react";

// export type CartItem = {
//   id: number;
//   name: string;
//   price: number;
//   quantity: number;
//   image: string;
// };

// const CheckoutPage = () => {
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);

//   useEffect(() => {
//     const savedCart = localStorage.getItem("cart");
//     if (savedCart) {
//       setCartItems(JSON.parse(savedCart));
//     }
//   }, []);

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-4">Checkout</h1>
//       <div className="border p-4">
//         <h2 className="text-xl font-semibold">Cart Summary</h2>
//         {cartItems.length > 0 ? (
//           cartItems.map((item) => (
//             <div key={item.id || `cart-item-${Math.random()}`} className="flex justify-between p-2 border-b">
//               <img src={item.image} alt={item.name} className="w-16 h-16 object-cover" />
//               <span>{item.name}</span>
//               <span>${item.price.toFixed(2)}</span>
//               <span>Qty: {item.quantity}</span>
//             </div>
//           ))
//         ) : (
//           <p>No items in cart</p>
//         )}
//       </div>
//       <div className="mt-6">
//         <h2 className="text-xl font-semibold">Shipping Information</h2>
//         <input type="text" placeholder="Full Name" className="w-full border p-2 mt-2" />
//         <input type="text" placeholder="Address" className="w-full border p-2 mt-2" />
//         <input type="text" placeholder="City" className="w-full border p-2 mt-2" />
//       </div>
//       <div className="mt-6">
//         <h2 className="text-xl font-semibold">Payment</h2>
//         <input type="text" placeholder="Card Number" className="w-full border p-2 mt-2" />
//         <button className="bg-green-500 text-white px-4 py-2 rounded mt-4">Place Order</button>
//       </div>
//     </div>
//   );
// };

// export default CheckoutPage;







// "use client";

// import { useEffect, useState } from "react";

// export type CartItem = {
//   id: number;
//   name: string;
//   price: number;
//   quantity: number;
// };

// const CheckoutPage = () => {
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);

//   useEffect(() => {
//     const savedCart = localStorage.getItem("cart");
//     if (savedCart) {
//       setCartItems(JSON.parse(savedCart));
//     }
//   }, []);

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-4">Checkout</h1>
//       <div className="border p-4">
//         <h2 className="text-xl font-semibold">Cart Summary</h2>
//         {cartItems.length > 0 ? (
//           cartItems.map((item) => (
//             <div key={item.id || `cart-item-${Math.random()}`} className="flex justify-between p-2 border-b">
//               <span>{item.name}</span>
//               <span>${item.price.toFixed(2)}</span>
//               <span>Qty: {item.quantity}</span>
//             </div>
//           ))
//         ) : (
//           <p>No items in cart</p>
//         )}
//       </div>
//       <div className="mt-6">
//         <h2 className="text-xl font-semibold">Shipping Information</h2>
//         <input type="text" placeholder="Full Name" className="w-full border p-2 mt-2" />
//         <input type="text" placeholder="Address" className="w-full border p-2 mt-2" />
//         <input type="text" placeholder="City" className="w-full border p-2 mt-2" />
//       </div>
//       <div className="mt-6">
//         <h2 className="text-xl font-semibold">Payment</h2>
//         <input type="text" placeholder="Card Number" className="w-full border p-2 mt-2" />
//         <button className="bg-green-500 text-white px-4 py-2 rounded mt-4">Place Order</button>
//       </div>
//     </div>
//   );
// };

// export default CheckoutPage;
// "use client";

// import { createContext, useContext, useState, useEffect, ReactNode } from "react";
// import { Product } from "@/app/types/product";
// import { motion, AnimatePresence } from "framer-motion";
// import Link from "next/link";
// import { ShoppingCart } from "lucide-react";

// // Define cart item type
// export type CartItem = Product & { quantity: number };

// // Define cart context type
// export type CartContextType = {
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

//   // Load cart from localStorage on mount
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
//         return [...prevCart, { ...product, quantity: 1 }];
//       }
//     });
//   };

//   // Increase quantity
//   const increaseQuantity = (productId: string) => {
//     setCart((prevCart) =>
//       prevCart.map((item) =>
//         item._id === productId ? { ...item, quantity: item.quantity + 1 } : item
//       )
//     );
//   };

//   // Decrease quantity
//   const decreaseQuantity = (productId: string) => {
//     setCart((prevCart) =>
//       prevCart
//         .map((item) =>
//           item._id === productId ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
//         )
//         .filter((item) => item.quantity > 0)
//     );
//   };

//   // Remove product from cart
//   const removeFromCart = (productId: string) => {
//     setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
//   };

//   // Clear entire cart
//   const clearCart = () => {
//     setCart([]);
//   };

//   return (
//     <CartContext.Provider
//       value={{ cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart }}
//     >
//       {children}

//       {/* Cart Summary Display */}
//       <div className="border p-4 mb-6">
//         <h2 className="text-xl font-semibold">Cart Summary</h2>
//         {cart.length > 0 ? (
//           cart.map((item) => (
//             <div key={item._id} className="flex items-center justify-between p-2 border-b">
//               <img src={item.image.asset.url} alt={item.title} className="w-16 h-16 object-cover" />
//               <span>{item.title}</span>
//               <span>${item.price.toFixed(2)}</span>
//               <span>Qty: {item.quantity}</span>
//             </div>
//           ))
//         ) : (
//           <p>No items in cart</p>
//         )}
//       </div>

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

// import { useEffect, useState } from "react";

// export type CartItem = {
//   id: number;
//   name: string;
//   price: number;
//   quantity: number;
// };

// const CheckoutPage = () => {
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);

//   useEffect(() => {
//     const savedCart = localStorage.getItem("cart");
//     if (savedCart) {
//       setCartItems(JSON.parse(savedCart));
//     }
//   }, []);

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-4">Checkout</h1>
//       <div className="border p-4">
//         <h2 className="text-xl font-semibold">Cart Summary</h2>
//         {cartItems.length > 0 ? (
//           cartItems.map((item) => (
//             <div key={item.id} className="flex justify-between p-2 border-b">
//               <span>{item.name}</span>
//               <span>${item.price.toFixed(2)}</span>
//               <span>Qty: {item.quantity}</span>
//             </div>
//           ))
//         ) : (
//           <p>No items in cart</p>
//         )}
//       </div>
//       <div className="mt-6">
//         <h2 className="text-xl font-semibold">Shipping Information</h2>
//         <input type="text" placeholder="Full Name" className="w-full border p-2 mt-2" />
//         <input type="text" placeholder="Address" className="w-full border p-2 mt-2" />
//         <input type="text" placeholder="City" className="w-full border p-2 mt-2" />
//       </div>
//       <div className="mt-6">
//         <h2 className="text-xl font-semibold">Payment</h2>
//         <input type="text" placeholder="Card Number" className="w-full border p-2 mt-2" />
//         <button className="bg-green-500 text-white px-4 py-2 rounded mt-4">Place Order</button>
//       </div>
//     </div>
//   );
// };

// export default CheckoutPage;

// "use client";

// import { useEffect, useState } from "react";
// import { Product } from "@/app/types/product"; // Import Product type from your types file

// type CartItem = {
//   id: string;
//   name: string;
//   price: number;
//   quantity: number;
//   slug: string;
//   image: string;
// };

// const CheckoutPage = () => {
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);
//   const [products, setProducts] = useState<Product[]>([]);

//   // Fetch products from Sanity CMS
//   useEffect(() => {
//     const fetchProducts = async () => {
//       const res = await fetch("/api/products"); // Replace with your actual API or Sanity fetch logic
//       const data = await res.json();
//       setProducts(data);
//     };

//     fetchProducts();
//   }, []);

//   // Initialize the cart from localStorage
//   useEffect(() => {
//     const savedCart = localStorage.getItem("cart");

//     if (savedCart) {
//       setCartItems(JSON.parse(savedCart));
//     }
//   }, []);

//   // Calculate total price
//   const getTotalPrice = () => {
//     return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
//   };

//   // Update cart on change
//   const handleQuantityChange = (id: string, quantity: number) => {
//     const updatedCart = cartItems.map(item => 
//       item.id === id ? { ...item, quantity } : item
//     );
//     setCartItems(updatedCart);
//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      
//       <div className="border p-4">
//         <h2 className="text-xl font-semibold">Cart Summary</h2>
//         {cartItems.map((item) => {
//           const product = products.find(p => p.slug.current === item.slug); // Find product by slug
//           return product ? (
//             <div key={item.id} className="flex justify-between p-2">
//               <img src={product.image.asset.url} alt={product.title} className="w-16 h-16" />
//               <span>{product.title}</span>
//               <span>${(item.price * item.quantity).toFixed(2)}</span>
//               <input 
//                 type="number" 
//                 value={item.quantity} 
//                 onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
//                 min="1"
//                 className="ml-2 w-12 p-1"
//               />
//             </div>
//           ) : null;
//         })}
//       </div>

//       <div className="mt-6">
//         <h2 className="text-xl font-semibold">Shipping Information</h2>
//         <input type="text" placeholder="Full Name" className="w-full border p-2 mt-2" />
//         <input type="text" placeholder="Address" className="w-full border p-2 mt-2" />
//         <input type="text" placeholder="City" className="w-full border p-2 mt-2" />
//       </div>

//       <div className="mt-6">
//         <h2 className="text-xl font-semibold">Payment</h2>
//         <input type="text" placeholder="Card Number" className="w-full border p-2 mt-2" />
//         <button className="bg-green-500 text-white px-4 py-2 rounded mt-4">Place Order</button>
//       </div>

//       <div className="mt-6 text-right">
//         <h2 className="text-xl font-semibold">Total: ${getTotalPrice().toFixed(2)}</h2>
//       </div>
//     </div>
//   );
// };

// export default CheckoutPage;


