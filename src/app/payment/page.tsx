"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaCcVisa, FaCcMastercard, FaCcAmex, FaPaypal } from "react-icons/fa";
import { jsPDF } from "jspdf"; // Import jsPDF for PDF generation

export type CartItem = {
  _id: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
};

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    month: "",
    year: "",
    cvv: ""
  });
  const [isPaymentComplete, setIsPaymentComplete] = useState(false); // To track if payment is complete
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Set to true only on the client
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Function to download receipt as PDF
  const downloadSlip = () => {
    if (!isClient) return; // Ensure this runs only on the client

    const doc = new jsPDF();

    // Get current date and day
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-US'); // Formats date like "MM/DD/YYYY"
    const currentDay = currentDate.toLocaleString('en-US', { weekday: 'long' }); // Gets the full day name

    // Header - Company Info with small Comforty logo
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 255); // Blue color for company name
    doc.text("Comforty", 20, 20); // Company name
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0); // Black color for other text
    doc.text("12, MILKYWAY Galaxy/Earth", 20, 30);
    doc.text("Tel: +9203318327545", 20, 35);
    doc.text(`Cashier: M1520`, 120, 30);
    doc.text(`Date: ${formattedDate} (${currentDay})`, 120, 35); // Add Date and Day dynamically

    // Add Comforty logo image (ensure path is correct)
    doc.addImage('/Logo Icon.png', 170, 15, 20, 20);  // Modify these values as per your desired image size and position

    // Order List Header
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0); // Black color for header
    doc.setFont("helvetica", "bold"); // Bold header
    doc.text("QTY", 20, 50);
    doc.text("DESCRIPTION", 40, 50);
    doc.text("PRICE", 120, 50);
    doc.text("TOTAL", 160, 50);

    // Add a line below the header
    doc.setDrawColor(0, 0, 0); // Black color for the line
    doc.line(20, 55, 190, 55); // Draw a line below the header

    let yPosition = 60;
    cartItems.forEach((item) => {
      const itemTotal = item.price * item.quantity;

      // Align columns: QTY, DESCRIPTION, PRICE, TOTAL
      doc.setFont("helvetica", "normal"); // Normal font for items
      doc.text(`${item.quantity}`, 20, yPosition); // QTY (aligned to the left)
      doc.text(`${item.title.substring(0, 20)}...`, 40, yPosition); // DESCRIPTION (aligned to the left)
      doc.text(`$${item.price.toFixed(2)}`, 120, yPosition); // PRICE (aligned to the right)
      doc.text(`$${itemTotal.toFixed(2)}`, 160, yPosition); // TOTAL (aligned to the right)

      yPosition += 10; // Move to the next line
    });

    // Summary - Tax and Total
    const total = calculateTotal();
    const tax = total * 0.17; // 17% VAT
    doc.setFont("helvetica", "bold"); // Bold font for summary
    doc.text(`TAXABLE TOT:    $${total.toFixed(2)}`, 20, yPosition + 10);
    doc.text(`VAT 17%:        $${tax.toFixed(2)}`, 20, yPosition + 20);
    doc.text(`TOTAL:          $${(total + tax).toFixed(2)}`, 20, yPosition + 30);

    // Footer - Thank You Message and Contact Info
    yPosition += 40;
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 255); // Blue color for thank you message
    doc.text("* THANK YOU *", 20, yPosition);
    doc.setTextColor(0, 0, 0); // Black color for contact info
    doc.text("Contact us: Comforty.com@gaami.com", 20, yPosition + 10);
    doc.text("Phone: +9203318327545", 20, yPosition + 20);
    doc.text("OWNER: I T boy", 20, yPosition + 30);

    // Add a border around the entire content
    doc.setDrawColor(0, 0, 0); // Black color for the border
    doc.rect(10, 10, 190, yPosition + 40); // Adjust the dimensions as needed

    doc.save("receipt.pdf"); // Trigger download
  };

  // Handle changes in payment details
  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle the 'Done' button click, validating payment info
  const handlePaymentDone = () => {
    const { cardNumber, month, year, cvv } = paymentDetails;
    if (cardNumber && month && year && cvv) {
      setIsPaymentComplete(true); // Enable the buttons once payment details are complete
    } else {
      alert("Please fill in all payment details.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg grid grid-cols-1 sm:grid-cols-2 gap-6"
    >
      <div className="col-span-1 sm:col-span-1">
        <h1 className="text-3xl font-semibold mb-6 text-center text-blue-700">Complete Your Purchase</h1>

        {/* Purchase Details */}
        <div className="mb-4 p-4 bg-gray-50 rounded-lg border">
          <h2 className="text-xl font-semibold mb-3">Purchase Details</h2>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item._id} className="flex justify-between items-center mb-3">
                <span className="text-gray-700">{item.title}</span>
                <span className="text-gray-600">${item.price.toFixed(2)}</span>
              </div>
            ))
          ) : (
            <p>No items in cart</p>
          )}
          <div className="flex justify-between text-lg font-semibold mt-2 text-gray-800">
            <span>Total</span>
            <span>${calculateTotal().toFixed(2)}</span>
          </div>
        </div>

        {/* Payment Information */}
        <div className="mb-4 p-4 bg-gray-50 rounded-lg border">
          <h2 className="text-xl font-semibold mb-3">Payment Information</h2>
          <form>
            <input
              type="text"
              placeholder="Card Number"
              name="cardNumber"
              value={paymentDetails.cardNumber}
              onChange={handlePaymentChange}
              className="w-full border p-3 mb-3 rounded-md"
            />
            <div className="grid grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Expiration Month"
                name="month"
                value={paymentDetails.month}
                onChange={handlePaymentChange}
                className="w-full border p-3 mb-3 rounded-md"
              />
              <input
                type="text"
                placeholder="Expiration Year"
                name="year"
                value={paymentDetails.year}
                onChange={handlePaymentChange}
                className="w-full border p-3 mb-3 rounded-md"
              />
              <input
                type="text"
                placeholder="CVV"
                name="cvv"
                value={paymentDetails.cvv}
                onChange={handlePaymentChange}
                className="w-full border p-3 mb-3 rounded-md"
              />
            </div>
            <button
              type="button"
              onClick={handlePaymentDone}
              className="w-full py-2 bg-blue-500 text-white rounded-md"
            >
              Done
            </button>
          </form>
        </div>

        {/* Conditional Buttons */}
        {isPaymentComplete && (
          <div className="flex space-x-4 mt-6">
            <button
              onClick={downloadSlip}
              className="py-2 px-4 bg-green-500 text-white rounded-md"
            >
              Download Receipt
            </button>
            <button className="py-2 px-4 bg-yellow-500 text-white rounded-md">
              Go to Shipment
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default CheckoutPage;


// "use client";

// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { FaCcVisa, FaCcMastercard, FaCcAmex, FaPaypal } from "react-icons/fa";
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
//   const [billingAddress, setBillingAddress] = useState("");
//   const [paymentMethod, setPaymentMethod] = useState("credit_card");
//   const [isClient, setIsClient] = useState(false);

//   useEffect(() => {
//     setIsClient(true); // Set to true only on the client
//     const savedCart = localStorage.getItem("cart");
//     if (savedCart) {
//       setCartItems(JSON.parse(savedCart));
//     }
//   }, []);

//   const calculateTotal = () => {
//     return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
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

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg grid grid-cols-1 sm:grid-cols-2 gap-6"
//     >
//       <div className="col-span-1 sm:col-span-1">
//         <h1 className="text-3xl font-semibold mb-6 text-center text-blue-700">Complete Your Purchase</h1>

//         {/* Basic Information */}
//         <div className="mb-4 p-4 bg-gray-50 rounded-lg border">
//           <h2 className="text-xl font-semibold mb-3">1. Your Basic Information</h2>
//           <form>
//             <input
//               type="text"
//               placeholder="First Name"
//               className="w-full border p-3 mb-3 rounded-md"
//             />
//             <input
//               type="text"
//               placeholder="Last Name"
//               className="w-full border p-3 mb-3 rounded-md"
//             />
//             <input
//               type="email"
//               placeholder="Email Address"
//               className="w-full border p-3 mb-3 rounded-md"
//             />
//             <input
//               type="text"
//               placeholder="Company Name"
//               className="w-full border p-3 mb-3 rounded-md"
//             />
//           </form>
//         </div>

//         {/* Billing Address */}
//         <div className="mb-4 p-4 bg-gray-50 rounded-lg border">
//           <h2 className="text-xl font-semibold mb-3">2. Billing Address</h2>
//           <form>
//             <input
//               type="text"
//               placeholder="Street"
//               className="w-full border p-3 mb-3 rounded-md"
//             />
//             <input
//               type="text"
//               placeholder="City"
//               className="w-full border p-3 mb-3 rounded-md"
//             />
//             <input
//               type="text"
//               placeholder="Country"
//               className="w-full border p-3 mb-3 rounded-md"
//             />
//             <input
//               type="text"
//               placeholder="Zip Code"
//               className="w-full border p-3 mb-3 rounded-md"
//             />
//           </form>
//         </div>

//         {/* Payment Information */}
//         <div className="mb-4 p-4 bg-gray-50 rounded-lg border">
//           <h2 className="text-xl font-semibold mb-3">3. Your Payment Information</h2>
//           <div className="mb-3 flex items-center">
//             <input
//               type="radio"
//               name="payment"
//               value="credit_card"
//               checked={paymentMethod === "credit_card"}
//               onChange={() => setPaymentMethod("credit_card")}
//               className="mr-2"
//             />
//             <span className="text-lg font-medium">Credit Card</span>
//             <div className="ml-auto flex space-x-2 text-gray-500">
//               <FaCcVisa size={30} />
//               <FaCcMastercard size={30} />
//               <FaCcAmex size={30} />
//             </div>
//           </div>
//           {paymentMethod === "credit_card" && (
//             <form>
//               <input
//                 type="text"
//                 placeholder="Credit Card Number"
//                 className="w-full border p-3 mb-3 rounded-md"
//               />
//               <div className="grid grid-cols-3 gap-4">
//                 <input
//                   type="text"
//                   placeholder="Month"
//                   className="w-full border p-3 mb-3 rounded-md"
//                 />
//                 <input
//                   type="text"
//                   placeholder="Year"
//                   className="w-full border p-3 mb-3 rounded-md"
//                 />
//                 <input
//                   type="text"
//                   placeholder="CVV"
//                   className="w-full border p-3 mb-3 rounded-md"
//                 />
//               </div>
//             </form>
//           )}
//         </div>

//         <div className="text-center mt-6">
//           <button
//             className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
//             onClick={() => alert("Checkout Now")}
//           >
//             Checkout Now
//           </button>
//         </div>
//       </div>

//       {/* Purchase Details */}
//       <div className="col-span-1 sm:col-span-1 bg-gray-50 p-6 rounded-lg border">
//         <h2 className="text-xl font-semibold mb-3">Purchase Details</h2>
//         {cartItems.length > 0 ? (
//           cartItems.map((item) => (
//             <div key={item._id} className="flex justify-between items-center mb-3">
//               <span className="text-gray-700">{item.title}</span>
//               <span className="text-gray-600">${item.price.toFixed(2)}</span>
//             </div>
//           ))
//         ) : (
//           <p>No items in cart</p>
//         )}
//         <div className="flex justify-between text-lg font-semibold mt-2 text-gray-800">
//           <span>Total</span>
//           <span>${calculateTotal().toFixed(2)}</span>
//         </div>
//         <div className="text-center mt-6">
//           <button
//             onClick={downloadSlip}
//             className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//           >
//             Download Receipt
//           </button>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default CheckoutPage;


// "use client";

// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { FaCcVisa, FaCcMastercard, FaCcAmex, FaPaypal } from "react-icons/fa";

// export type CartItem = {
//   _id: string;
//   title: string;
//   price: number;
//   quantity: number;
//   image: string;
// };

// const CheckoutPage = () => {
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);
//   const [billingAddress, setBillingAddress] = useState("");
//   const [paymentMethod, setPaymentMethod] = useState("credit_card");
//   const [isClient, setIsClient] = useState(false);

//   useEffect(() => {
//     setIsClient(true); // Set to true only on the client
//     const savedCart = localStorage.getItem("cart");
//     if (savedCart) {
//       setCartItems(JSON.parse(savedCart));
//     }
//   }, []);

//   const calculateTotal = () => {
//     return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg grid grid-cols-1 sm:grid-cols-2 gap-6"
//     >
//       <div className="col-span-1 sm:col-span-1">
//         <h1 className="text-3xl font-semibold mb-6 text-center text-blue-700">Complete Your Purchase</h1>

//         {/* Basic Information */}
//         <div className="mb-4 p-4 bg-gray-50 rounded-lg border">
//           <h2 className="text-xl font-semibold mb-3">1. Your Basic Information</h2>
//           <form>
//             <input
//               type="text"
//               placeholder="First Name"
//               className="w-full border p-3 mb-3 rounded-md"
//             />
//             <input
//               type="text"
//               placeholder="Last Name"
//               className="w-full border p-3 mb-3 rounded-md"
//             />
//             <input
//               type="email"
//               placeholder="Email Address"
//               className="w-full border p-3 mb-3 rounded-md"
//             />
//             <input
//               type="text"
//               placeholder="Company Name"
//               className="w-full border p-3 mb-3 rounded-md"
//             />
//           </form>
//         </div>

//         {/* Billing Address */}
//         <div className="mb-4 p-4 bg-gray-50 rounded-lg border">
//           <h2 className="text-xl font-semibold mb-3">2. Billing Address</h2>
//           <form>
//             <input
//               type="text"
//               placeholder="Street"
//               className="w-full border p-3 mb-3 rounded-md"
//             />
//             <input
//               type="text"
//               placeholder="City"
//               className="w-full border p-3 mb-3 rounded-md"
//             />
//             <input
//               type="text"
//               placeholder="Country"
//               className="w-full border p-3 mb-3 rounded-md"
//             />
//             <input
//               type="text"
//               placeholder="Zip Code"
//               className="w-full border p-3 mb-3 rounded-md"
//             />
//           </form>
//         </div>

//         {/* Payment Information */}
//         <div className="mb-4 p-4 bg-gray-50 rounded-lg border">
//           <h2 className="text-xl font-semibold mb-3">3. Your Payment Information</h2>
//           <div className="mb-3 flex items-center">
//             <input
//               type="radio"
//               name="payment"
//               value="credit_card"
//               checked={paymentMethod === "credit_card"}
//               onChange={() => setPaymentMethod("credit_card")}
//               className="mr-2"
//             />
//             <span className="text-lg font-medium">Credit Card</span>
//             <div className="ml-auto flex space-x-2 text-gray-500">
//               <FaCcVisa size={30} />
//               <FaCcMastercard size={30} />
//               <FaCcAmex size={30} />
//             </div>
//           </div>
//           {paymentMethod === "credit_card" && (
//             <form>
//               <input
//                 type="text"
//                 placeholder="Credit Card Number"
//                 className="w-full border p-3 mb-3 rounded-md"
//               />
//               <div className="grid grid-cols-3 gap-4">
//                 <input
//                   type="text"
//                   placeholder="Month"
//                   className="w-full border p-3 mb-3 rounded-md"
//                 />
//                 <input
//                   type="text"
//                   placeholder="Year"
//                   className="w-full border p-3 mb-3 rounded-md"
//                 />
//                 <input
//                   type="text"
//                   placeholder="CVV"
//                   className="w-full border p-3 mb-3 rounded-md"
//                 />
//               </div>
//             </form>
//           )}
//         </div>

//         <div className="text-center mt-6">
//           <button
//             className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
//             onClick={() => alert("Checkout Now")}
//           >
//             Checkout Now
//           </button>
//         </div>
//       </div>

//       {/* Purchase Details */}
//       <div className="col-span-1 sm:col-span-1 bg-gray-50 p-6 rounded-lg border">
//         <h2 className="text-xl font-semibold mb-3">Purchase Details</h2>
//         {cartItems.length > 0 ? (
//           cartItems.map((item) => (
//             <div key={item._id} className="flex justify-between items-center mb-3">
//               <span className="text-gray-700">{item.title}</span>
//               <span className="text-gray-600">${item.price.toFixed(2)}</span>
//             </div>
//           ))
//         ) : (
//           <p>No items in cart</p>
//         )}
//         <div className="flex justify-between text-lg font-semibold mt-2 text-gray-800">
//           <span>Total</span>
//           <span>${calculateTotal().toFixed(2)}</span>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default CheckoutPage;