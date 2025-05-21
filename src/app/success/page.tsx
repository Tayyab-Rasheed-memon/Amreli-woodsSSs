"use client";

import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import { useCart } from "@/app/context/CartContext";
import Link from "next/link";
import { motion } from "framer-motion";

// Define the structure of a cart item for type safety
interface CartItem {
  _id: string;
  quantity: number;
  title: string;
  price: number;
}

const SuccessPage = () => {
  const { clearCart, cart } = useCart();
  const [isClient, setIsClient] = useState<boolean>(false);
  const [formattedDate, setFormattedDate] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  // PDF Configuration
  const COMPANY_LOGO = "/logo c.png";
  const PRIMARY_COLOR: [number, number, number] = [0, 51, 102];
  const ACCENT_COLOR: [number, number, number] = [220, 53, 69];
  const SIGNATURE_IMAGE = "/eeee.png"; // Ensure this is the correct path in your public folder

  useEffect(() => {
    setIsClient(true);
    const currentDate = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true
    };
    setFormattedDate(currentDate.toLocaleString('en-US', options));
  }, []);

  const downloadReceipt = () => {
    const doc = new jsPDF();
    
    // Add Company Logo
    doc.addImage(COMPANY_LOGO, "PNG", 15, 10, 25, 25);

    // Header Section
    doc.setFontSize(18);
    doc.setTextColor(...PRIMARY_COLOR);
    doc.setFont("helvetica", "bold");
    doc.text("AMRELI WOODS OFFICIAL RECEIPT", 105, 20, { align: "center" });

    // Date Formatting (M/D/YYYY) - Right Aligned
    const issueDate = new Date().toLocaleDateString('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric',
    });
    doc.setFontSize(12);
    doc.setTextColor(40);
    doc.text(`Issued: ${issueDate}`, 195, 28, { align: "right" });

    // Table Header
    doc.setFillColor(...PRIMARY_COLOR);
    doc.rect(15, 45, 180, 10, 'F');
    doc.setTextColor(255);
    doc.text("QTY", 20, 51);
    doc.text("DESCRIPTION", 60, 51);
    doc.text("TOTAL (USD)", 195, 51, { align: "right" });

    // Cart Items
    let yPosition = 65;
    doc.setTextColor(40);
    doc.setFont("helvetica", "normal");
    cart.forEach((item: CartItem) => {
      doc.text(`${item.quantity}`, 20, yPosition);
      doc.text(item.title.substring(0, 30), 60, yPosition);
      doc.text(`$${(item.price * item.quantity).toFixed(2)}`, 195, yPosition, { align: "right" });
      yPosition += 10;
    });

    // Calculations
    const totalAmount = cart.reduce((sum: number, item: CartItem) => sum + item.price * item.quantity, 0);
    const vatAmount = totalAmount * 0.17;
    
    yPosition += 10;
    doc.text("TAXABLE TOT:", 130, yPosition);
    doc.text(`$${totalAmount.toFixed(2)}`, 195, yPosition, { align: "right" });
    yPosition += 10;
    doc.text("VAT 17%:", 130, yPosition);
    doc.text(`$${vatAmount.toFixed(2)}`, 195, yPosition, { align: "right" });
    yPosition += 10;
    doc.setFont("helvetica", "bold");
    doc.text("TOTAL:", 130, yPosition);
    doc.setTextColor(...ACCENT_COLOR);
    doc.text(`$${(totalAmount + vatAmount).toFixed(2)}`, 195, yPosition, { align: "right" });

    // Footer Section
    yPosition += 15;
    doc.setDrawColor(200);
    doc.line(15, yPosition, 195, yPosition);
    yPosition += 10;
    doc.setTextColor(...PRIMARY_COLOR);
    doc.setFontSize(12);
    doc.text("Authorized Signature:", 15, yPosition);

    // Add Signature Image
    doc.addImage(SIGNATURE_IMAGE, "PNG", 80, yPosition - 5, 40, 15); // Adjust size and position

    // Save PDF
    doc.save(`AMRELIWOODS-Receipt-${Date.now()}.pdf`);
    clearCart();
  };

  const totalAmount = cart.reduce((sum: number, item: CartItem) => sum + item.price * item.quantity, 0);
  const vatAmount = totalAmount * 0.17;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-green-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg"
      >
        {/* Header Section */}
        <div className="text-center mb-6 space-y-2">
          <motion.h1 
            animate={{ y: [-2, 2, -2] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-3xl font-bold text-blue-600"
          >
            AMRELI WOODS
          </motion.h1>
          <p className="text-sm text-gray-500 font-mono">{formattedDate}</p>
        </div>

        {/* Receipt Body */}
        <motion.div
          id="animated-receipt"
          className="bg-white p-6 rounded-lg border-2 border-blue-100 shadow-inner"
        >
          {/* Items Table */}
          <div className="mb-4 space-y-4">
            <div className="grid grid-cols-12 gap-2 font-bold text-sm pb-2 border-b-2 border-blue-50">
              <div className="col-span-2">QTY</div>
              <div className="col-span-8">DESCRIPTION</div>
              <div className="col-span-2 text-right">TOTAL</div>
            </div>

            {cart.map((item: CartItem, index: number) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="grid grid-cols-12 gap-2 text-sm"
              >
                <div className="col-span-2">{item.quantity}</div>
                <div className="col-span-8 truncate">{item.title}</div>
                <div className="col-span-2 text-right">${(item.price * item.quantity).toFixed(2)}</div>
              </motion.div>
            ))}
          </div>

          {/* Calculation Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="pt-4 space-y-2 border-t-2 border-blue-50"
          >
            <div className="flex justify-between text-sm">
              <span>TAXABLE TOT:</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>VAT 17%:</span>
              <span>${vatAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-blue-600">
              <span>TOTAL:</span>
              <span>${(totalAmount + vatAmount).toFixed(2)}</span>
            </div>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-6 pt-4 text-center text-xs space-y-1 border-t-2 border-blue-50"
          >
            <p className="text-blue-400 font-bold animate-pulse">* THANK YOU *</p>
            <p className="text-gray-500">Contact: Comforty.com@gaami.com</p>
            <p className="text-gray-500">Phone: +9203318327545</p>
            <p className="text-gray-400 mt-2">OWNER: IT boy</p>
          </motion.div>
        </motion.div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={downloadReceipt}
            disabled={isGenerating}
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-bold flex items-center justify-center"
          >
            {isGenerating ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity }}
                className="h-6 w-6 border-2 border-white rounded-full border-t-transparent"
              />
            ) : (
              'Download Receipt'
            )}
          </motion.button>

          <Link
            href="/shipment"
            className="block text-center py-2 px-4 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            ← Continue Shopping
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default SuccessPage;







































































// "use client";

// import { useEffect, useState } from "react";
// import { jsPDF } from "jspdf";
// import { useCart } from "@/app/context/CartContext";
// import Link from "next/link";
// import { motion } from "framer-motion";

// const SuccessPage = () => {
//   const { clearCart, cart } = useCart();
//   const [isClient, setIsClient] = useState(false);
//   const [formattedDate, setFormattedDate] = useState("");
//   const [isGenerating, setIsGenerating] = useState(false);

//   // PDF Configuration
//   const COMPANY_LOGO = "/logo c.png";
//   const PRIMARY_COLOR: [number, number, number] = [0, 51, 102];
//   const ACCENT_COLOR: [number, number, number] = [220, 53, 69];

//   useEffect(() => {
//     setIsClient(true);
//     const currentDate = new Date();
//     const options: Intl.DateTimeFormatOptions = {
//       weekday: 'long',
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//       hour: 'numeric',
//       minute: 'numeric',
//       second: 'numeric',
//       hour12: true
//     };
//     setFormattedDate(currentDate.toLocaleString('en-US', options));
//   }, []);

//   const downloadReceipt = () => {
//     const doc = new jsPDF();
    
//     // Add Company Logo
//     doc.addImage(COMPANY_LOGO, "PNG", 15, 10, 25, 25);

//     // Header Section
//     doc.setFontSize(18);
//     doc.setTextColor(...PRIMARY_COLOR);
//     doc.setFont("helvetica", "bold");
//     doc.text("AMRELI WOODS OFFICIAL RECEIPT", 105, 20, { align: "center" });

//     // Date Formatting (M/D/YYYY) - Right Aligned
//     const issueDate = new Date().toLocaleDateString('en-US', {
//       month: 'numeric',
//       day: 'numeric',
//       year: 'numeric',
//     });
//     doc.setFontSize(12);
//     doc.setTextColor(40);
//     doc.text(`Issued: ${issueDate}`, 195, 28, { align: "right" });

//     // Table Header
//     doc.setFillColor(...PRIMARY_COLOR);
//     doc.rect(15, 45, 180, 10, 'F');
//     doc.setTextColor(255);
//     doc.text("QTY", 20, 51);
//     doc.text("DESCRIPTION", 60, 51);
//     doc.text("TOTAL (USD)", 195, 51, { align: "right" });

//     // Cart Items
//     let yPosition = 65;
//     doc.setTextColor(40);
//     doc.setFont("helvetica", "normal");
//     cart.forEach((item) => {
//       doc.text(`${item.quantity}`, 20, yPosition);
//       doc.text(item.title.substring(0, 30), 60, yPosition);
//       doc.text(`$${(item.price * item.quantity).toFixed(2)}`, 195, yPosition, { align: "right" });
//       yPosition += 10;
//     });

//     // Calculations
//     const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
//     const vatAmount = totalAmount * 0.17;
    
//     yPosition += 10;
//     doc.text("TAXABLE TOT:", 130, yPosition);
//     doc.text(`$${totalAmount.toFixed(2)}`, 195, yPosition, { align: "right" });
//     yPosition += 10;
//     doc.text("VAT 17%:", 130, yPosition);
//     doc.text(`$${vatAmount.toFixed(2)}`, 195, yPosition, { align: "right" });
//     yPosition += 10;
//     doc.setFont("helvetica", "bold");
//     doc.text("TOTAL:", 130, yPosition);
//     doc.setTextColor(...ACCENT_COLOR);
//     doc.text(`$${(totalAmount + vatAmount).toFixed(2)}`, 195, yPosition, { align: "right" });

//     // Footer Section
//     yPosition += 15;
//     doc.setDrawColor(200);
//     doc.line(15, yPosition, 195, yPosition);
//     yPosition += 10;
//     doc.setTextColor(...PRIMARY_COLOR);
//     doc.setFontSize(12);
//     doc.text("Authorized Signature: ______", 15, yPosition);

//     // Save PDF
//     doc.save(`AMRELIWOODS-Receipt-${Date.now()}.pdf`);
//     clearCart();
//   };

//   const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
//   const vatAmount = totalAmount * 0.17;

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-green-50">
//       <motion.div
//         initial={{ opacity: 0, scale: 0.9 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.3 }}
//         className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg"
//       >
//         {/* Header Section */}
//         <div className="text-center mb-6 space-y-2">
//           <motion.h1 
//             animate={{ y: [-2, 2, -2] }}
//             transition={{ duration: 1.5, repeat: Infinity }}
//             className="text-3xl font-bold text-blue-600"
//           >
//             AMRELI WOODS
//           </motion.h1>
//           <p className="text-sm text-gray-500 font-mono">{formattedDate}</p>
//         </div>

//         {/* Receipt Body */}
//         <motion.div
//           id="animated-receipt"
//           className="bg-white p-6 rounded-lg border-2 border-blue-100 shadow-inner"
//         >
//           {/* Items Table */}
//           <div className="mb-4 space-y-4">
//             <div className="grid grid-cols-12 gap-2 font-bold text-sm pb-2 border-b-2 border-blue-50">
//               <div className="col-span-2">QTY</div>
//               <div className="col-span-8">DESCRIPTION</div>
//               <div className="col-span-2 text-right">TOTAL</div>
//             </div>

//             {cart.map((item, index) => (
//               <motion.div
//                 key={item._id}
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: index * 0.1 }}
//                 className="grid grid-cols-12 gap-2 text-sm"
//               >
//                 <div className="col-span-2">{item.quantity}</div>
//                 <div className="col-span-8 truncate">{item.title}</div>
//                 <div className="col-span-2 text-right">${(item.price * item.quantity).toFixed(2)}</div>
//               </motion.div>
//             ))}
//           </div>

//           {/* Calculation Section */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.5 }}
//             className="pt-4 space-y-2 border-t-2 border-blue-50"
//           >
//             <div className="flex justify-between text-sm">
//               <span>TAXABLE TOT:</span>
//               <span>${totalAmount.toFixed(2)}</span>
//             </div>
//             <div className="flex justify-between text-sm">
//               <span>VAT 17%:</span>
//               <span>${vatAmount.toFixed(2)}</span>
//             </div>
//             <div className="flex justify-between font-bold text-blue-600">
//               <span>TOTAL:</span>
//               <span>${(totalAmount + vatAmount).toFixed(2)}</span>
//             </div>
//           </motion.div>

//           {/* Footer */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.8 }}
//             className="mt-6 pt-4 text-center text-xs space-y-1 border-t-2 border-blue-50"
//           >
//             <p className="text-blue-400 font-bold animate-pulse">* THANK YOU *</p>
//             <p className="text-gray-500">Contact: Comforty.com@gaami.com</p>
//             <p className="text-gray-500">Phone: +9203318327545</p>
//             <p className="text-gray-400 mt-2">OWNER: IT boy</p>
//           </motion.div>
//         </motion.div>

//         {/* Action Buttons */}
//         <div className="mt-8 flex flex-col gap-4">
//           <motion.button
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             onClick={downloadReceipt}
//             disabled={isGenerating}
//             className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-bold flex items-center justify-center"
//           >
//             {isGenerating ? (
//               <motion.div
//                 animate={{ rotate: 360 }}
//                 transition={{ duration: 1, repeat: Infinity }}
//                 className="h-6 w-6 border-2 border-white rounded-full border-t-transparent"
//               />
//             ) : (
//               'Download Receipt'
//             )}
//           </motion.button>

//           <Link
//             href="/shipment"
//             className="block text-center py-2 px-4 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
//           >
//             ← Continue Shopping
//           </Link>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default SuccessPage;








// "use client";

// import { useEffect, useState } from "react";
// import { jsPDF } from "jspdf";
// import { useCart } from "@/app/context/CartContext";
// import Link from "next/link";
// import { motion } from "framer-motion";

// const SuccessPage = () => {
//   const { clearCart, cart } = useCart();
//   const [isClient, setIsClient] = useState(false);
//   const [formattedDate, setFormattedDate] = useState("");
//   const [isGenerating, setIsGenerating] = useState(false);

//   // PDF Configuration
//   const COMPANY_LOGO = "/Logo Icon.png";
//   const PRIMARY_COLOR: [number, number, number] = [0, 51, 102];
//   const ACCENT_COLOR: [number, number, number] = [220, 53, 69];

//   useEffect(() => {
//     setIsClient(true);
//     const currentDate = new Date();
//     const options: Intl.DateTimeFormatOptions = {
//       weekday: 'long',
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//       hour: 'numeric',
//       minute: 'numeric',
//       second: 'numeric',
//       hour12: true
//     };
//     setFormattedDate(currentDate.toLocaleString('en-US', options));
//   }, []);

//   const downloadReceipt = () => {
//     const doc = new jsPDF();
    
//     // Add Company Logo
//     doc.addImage(COMPANY_LOGO, "PNG", 15, 10, 25, 25);

//     // Header Section
//     doc.setFontSize(18);
//     doc.setTextColor(...PRIMARY_COLOR);
//     doc.setFont("helvetica", "bold");
//     doc.text("COMFORTY OFFICIAL RECEIPT", 105, 20, { align: "center" });

//     // Date Formatting (M/D/YYYY)
//     const issueDate = new Date().toLocaleDateString('en-US', {
//       month: 'numeric',
//       day: 'numeric',
//       year: 'numeric',
//     });
//     doc.setFontSize(12);
//     doc.setTextColor(40);
//     doc.text(`Issued: ${issueDate}`, 15, 28);

//     // Table Header
//     doc.setFillColor(...PRIMARY_COLOR);
//     doc.rect(15, 45, 180, 10, 'F');
//     doc.setTextColor(255);
//     doc.text("QTY", 20, 51);
//     doc.text("DESCRIPTION", 60, 51);
//     doc.text("TOTAL (USD)", 195, 51, { align: "right" });

//     // Cart Items
//     let yPosition = 65;
//     doc.setTextColor(40);
//     doc.setFont("helvetica", "normal");
//     cart.forEach((item) => {
//       doc.text(`${item.quantity}`, 20, yPosition);
//       doc.text(item.title.substring(0, 30), 60, yPosition);
//       doc.text(`$${(item.price * item.quantity).toFixed(2)}`, 195, yPosition, { align: "right" });
//       yPosition += 10;
//     });

//     // Calculations
//     const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
//     const vatAmount = totalAmount * 0.17;
    
//     yPosition += 10;
//     doc.text("TAXABLE TOT:", 130, yPosition);
//     doc.text(`$${totalAmount.toFixed(2)}`, 195, yPosition, { align: "right" });
//     yPosition += 10;
//     doc.text("VAT 17%:", 130, yPosition);
//     doc.text(`$${vatAmount.toFixed(2)}`, 195, yPosition, { align: "right" });
//     yPosition += 10;
//     doc.setFont("helvetica", "bold");
//     doc.text("TOTAL:", 130, yPosition);
//     doc.setTextColor(...ACCENT_COLOR);
//     doc.text(`$${(totalAmount + vatAmount).toFixed(2)}`, 195, yPosition, { align: "right" });

//     // Footer Section
//     yPosition += 15;
//     doc.setDrawColor(200);
//     doc.line(15, yPosition, 195, yPosition);
//     yPosition += 10;
//     doc.setTextColor(...PRIMARY_COLOR);
//     doc.setFontSize(12);
//     doc.text("Authorized Signature: ______", 15, yPosition);

//     // Save PDF
//     doc.save(`Comforty-Receipt-${Date.now()}.pdf`);
//     clearCart();
//   };

//   const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
//   const vatAmount = totalAmount * 0.17;

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-green-50">
//       <motion.div
//         initial={{ opacity: 0, scale: 0.9 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.3 }}
//         className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg"
//       >
//         {/* Header Section */}
//         <div className="text-center mb-6 space-y-2">
//           <motion.h1 
//             animate={{ y: [-2, 2, -2] }}
//             transition={{ duration: 1.5, repeat: Infinity }}
//             className="text-3xl font-bold text-blue-600"
//           >
//             Comforty
//           </motion.h1>
//           <p className="text-sm text-gray-500 font-mono">{formattedDate}</p>
//         </div>

//         {/* Receipt Body */}
//         <motion.div
//           id="animated-receipt"
//           className="bg-white p-6 rounded-lg border-2 border-blue-100 shadow-inner"
//         >
//           {/* Items Table */}
//           <div className="mb-4 space-y-4">
//             <div className="grid grid-cols-12 gap-2 font-bold text-sm pb-2 border-b-2 border-blue-50">
//               <div className="col-span-2">QTY</div>
//               <div className="col-span-8">DESCRIPTION</div>
//               <div className="col-span-2 text-right">TOTAL</div>
//             </div>

//             {cart.map((item, index) => (
//               <motion.div
//                 key={item._id}
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: index * 0.1 }}
//                 className="grid grid-cols-12 gap-2 text-sm"
//               >
//                 <div className="col-span-2">{item.quantity}</div>
//                 <div className="col-span-8 truncate">{item.title}</div>
//                 <div className="col-span-2 text-right">${(item.price * item.quantity).toFixed(2)}</div>
//               </motion.div>
//             ))}
//           </div>

//           {/* Calculation Section */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.5 }}
//             className="pt-4 space-y-2 border-t-2 border-blue-50"
//           >
//             <div className="flex justify-between text-sm">
//               <span>TAXABLE TOT:</span>
//               <span>${totalAmount.toFixed(2)}</span>
//             </div>
//             <div className="flex justify-between text-sm">
//               <span>VAT 17%:</span>
//               <span>${vatAmount.toFixed(2)}</span>
//             </div>
//             <div className="flex justify-between font-bold text-blue-600">
//               <span>TOTAL:</span>
//               <span>${(totalAmount + vatAmount).toFixed(2)}</span>
//             </div>
//           </motion.div>

//           {/* Footer */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.8 }}
//             className="mt-6 pt-4 text-center text-xs space-y-1 border-t-2 border-blue-50"
//           >
//             <p className="text-blue-400 font-bold animate-pulse">* THANK YOU *</p>
//             <p className="text-gray-500">Contact: Comforty.com@gaami.com</p>
//             <p className="text-gray-500">Phone: +9203318327545</p>
//             <p className="text-gray-400 mt-2">OWNER: IT boy</p>
//           </motion.div>
//         </motion.div>

//         {/* Action Buttons */}
//         <div className="mt-8 flex flex-col gap-4">
//           <motion.button
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             onClick={downloadReceipt}
//             disabled={isGenerating}
//             className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-bold flex items-center justify-center"
//           >
//             {isGenerating ? (
//               <motion.div
//                 animate={{ rotate: 360 }}
//                 transition={{ duration: 1, repeat: Infinity }}
//                 className="h-6 w-6 border-2 border-white rounded-full border-t-transparent"
//               />
//             ) : (
//               'Download Receipt'
//             )}
//           </motion.button>

//           <Link
//             href="/shipment"
//             className="block text-center py-2 px-4 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
//           >
//             ← Continue Shopping
//           </Link>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default SuccessPage;




































































































































































































































































































































// "use client";

  // import { useEffect, useState } from "react";
  // import { jsPDF } from "jspdf";
  // import { useCart } from "@/app/context/CartContext";
  // import Link from "next/link";
  // import { motion } from "framer-motion";

  // const SuccessPage = () => {
  //   const { clearCart, cart } = useCart();
  //   const [isClient, setIsClient] = useState(false);
  //   const [formattedDate, setFormattedDate] = useState("");
  //   const [isGenerating, setIsGenerating] = useState(false);

  //   // PDF Configuration
  //   const COMPANY_LOGO = "/Logo Icon.png";
  //   const PRIMARY_COLOR: [number, number, number] = [0, 51, 102];
  //   const ACCENT_COLOR: [number, number, number] = [220, 53, 69];

  //   useEffect(() => {
  //     setIsClient(true);
  //     const currentDate = new Date();
  //     const options: Intl.DateTimeFormatOptions = {
  //       weekday: 'long',
  //       year: 'numeric',
  //       month: 'long',
  //       day: 'numeric',
  //       hour: 'numeric',
  //       minute: 'numeric',
  //       second: 'numeric',
  //       hour12: true
  //     };
  //     setFormattedDate(currentDate.toLocaleString('en-US', options));
  //   }, []);

  //   const downloadReceipt = () => {
  //     const doc = new jsPDF();
      
  //     // Add Company Logo
  //     doc.addImage(COMPANY_LOGO, "PNG", 15, 10, 25, 25);

  //     // Header Section
  //     doc.setFontSize(18);
  //     doc.setTextColor(...PRIMARY_COLOR);
  //     doc.setFont("helvetica", "bold");
  //     doc.text("COMFORTY OFFICIAL RECEIPT", 105, 20, { align: "center" });

  //     // Date and Time
  //     doc.setFontSize(10);
  //     doc.setTextColor(40);
  //     doc.text(`Issued: ${new Date().toLocaleDateString()}`, 15, 35);

  //     // Table Header
  //     doc.setFillColor(...PRIMARY_COLOR);
  //     doc.rect(15, 45, 180, 10, 'F');
  //     doc.setTextColor(255);
  //     doc.text("QTY", 20, 51);
  //     doc.text("DESCRIPTION", 60, 51);
  //     doc.text("TOTAL (USD)", 160, 51);

  //     // Dynamic Cart Items
  //     let yPosition = 65;
  //     doc.setTextColor(40);
  //     doc.setFont("helvetica", "normal");
  //     cart.forEach((item) => {
  //       doc.text(`${item.quantity}`, 20, yPosition);
  //       doc.text(item.title.substring(0, 30), 60, yPosition);
  //       doc.text(`$${(item.price * item.quantity).toFixed(2)}`, 160, yPosition);
  //       yPosition += 10;
  //     });

  //     // Calculations
  //     const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  //     const vatAmount = totalAmount * 0.17;
      
  //     yPosition += 10;
  //     doc.text("TAXABLE TOT:", 130, yPosition);
  //     doc.text(`$${totalAmount.toFixed(2)}`, 160, yPosition);
  //     yPosition += 10;
  //     doc.text("VAT 17%:", 130, yPosition);
  //     doc.text(`$${vatAmount.toFixed(2)}`, 160, yPosition);
  //     yPosition += 10;
  //     doc.setFont("helvetica", "bold");
  //     doc.text("TOTAL:", 130, yPosition);
  //     doc.setTextColor(...ACCENT_COLOR);
  //     doc.text(`$${(totalAmount + vatAmount).toFixed(2)}`, 160, yPosition);

  //     // Footer Section
  //     yPosition += 20;
  //     doc.setTextColor(...PRIMARY_COLOR);
  //     doc.setFontSize(12);
  //     doc.text("Authorized Signature: ______", 15, yPosition);
  //     doc.line(15, yPosition + 2, 60, yPosition + 2);

  //     // Contact Information
  //     doc.setFontSize(10);
  //     doc.setTextColor(100);
  //     doc.text("Contact: Comforty.com@gaami.com", 15, 280);
  //     doc.text("Phone: +9203318327545", 15, 285);

  //     // Save PDF
  //     doc.save(`Comforty-Receipt-${Date.now()}.pdf`);
  //     clearCart();
  //   };

  //   const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  //   const vatAmount = totalAmount * 0.17;

  //   return (
  //     <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-green-50">
  //       <motion.div
  //         initial={{ opacity: 0, scale: 0.9 }}
  //         animate={{ opacity: 1, scale: 1 }}
  //         transition={{ duration: 0.3 }}
  //         className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg"
  //       >
  //         {/* Header Section */}
  //         <div className="text-center mb-6 space-y-2">
  //           <motion.h1 
  //             animate={{ y: [-2, 2, -2] }}
  //             transition={{ duration: 1.5, repeat: Infinity }}
  //             className="text-3xl font-bold text-blue-600"
  //           >
  //             Comforty
  //           </motion.h1>
  //           <p className="text-sm text-gray-500 font-mono">{formattedDate}</p>
  //         </div>

  //         {/* Receipt Body */}
  //         <motion.div
  //           id="animated-receipt"
  //           className="bg-white p-6 rounded-lg border-2 border-blue-100 shadow-inner"
  //         >
  //           {/* Items Table */}
  //           <div className="mb-4 space-y-4">
  //             <div className="grid grid-cols-12 gap-2 font-bold text-sm pb-2 border-b-2 border-blue-50">
  //               <div className="col-span-2">QTY</div>
  //               <div className="col-span-8">DESCRIPTION</div>
  //               <div className="col-span-2 text-right">TOTAL</div>
  //             </div>

  //             {cart.map((item, index) => (
  //               <motion.div
  //                 key={item._id}
  //                 initial={{ opacity: 0, x: -20 }}
  //                 animate={{ opacity: 1, x: 0 }}
  //                 transition={{ delay: index * 0.1 }}
  //                 className="grid grid-cols-12 gap-2 text-sm"
  //               >
  //                 <div className="col-span-2">{item.quantity}</div>
  //                 <div className="col-span-8 truncate">{item.title}</div>
  //                 <div className="col-span-2 text-right">${(item.price * item.quantity).toFixed(2)}</div>
  //               </motion.div>
  //             ))}
  //           </div>

  //           {/* Calculation Section */}
  //           <motion.div
  //             initial={{ opacity: 0 }}
  //             animate={{ opacity: 1 }}
  //             transition={{ delay: 0.5 }}
  //             className="pt-4 space-y-2 border-t-2 border-blue-50"
  //           >
  //             <div className="flex justify-between text-sm">
  //               <span>TAXABLE TOT:</span>
  //               <span>${totalAmount.toFixed(2)}</span>
  //             </div>
  //             <div className="flex justify-between text-sm">
  //               <span>VAT 17%:</span>
  //               <span>${vatAmount.toFixed(2)}</span>
  //             </div>
  //             <div className="flex justify-between font-bold text-blue-600">
  //               <span>TOTAL:</span>
  //               <span>${(totalAmount + vatAmount).toFixed(2)}</span>
  //             </div>
  //           </motion.div>

  //           {/* Footer */}
  //           <motion.div
  //             initial={{ opacity: 0 }}
  //             animate={{ opacity: 1 }}
  //             transition={{ delay: 0.8 }}
  //             className="mt-6 pt-4 text-center text-xs space-y-1 border-t-2 border-blue-50"
  //           >
  //             <p className="text-blue-400 font-bold animate-pulse">* THANK YOU *</p>
  //             <p className="text-gray-500">Contact: Comforty.com@gaami.com</p>
  //             <p className="text-gray-500">Phone: +9203318327545</p>
  //             <p className="text-gray-400 mt-2">OWNER: IT boy</p>
  //           </motion.div>
  //         </motion.div>

  //         {/* Action Buttons */}
  //         <div className="mt-8 flex flex-col gap-4">
  //           <motion.button
  //             whileHover={{ scale: 1.02 }}
  //             whileTap={{ scale: 0.98 }}
  //             onClick={downloadReceipt}
  //             disabled={isGenerating}
  //             className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-bold flex items-center justify-center"
  //           >
  //             {isGenerating ? (
  //               <motion.div
  //                 animate={{ rotate: 360 }}
  //                 transition={{ duration: 1, repeat: Infinity }}
  //                 className="h-6 w-6 border-2 border-white rounded-full border-t-transparent"
  //               />
  //             ) : (
  //               'Download Receipt'
  //             )}
  //           </motion.button>

  //           <Link
  //             href="/shipment"
  //             className="block text-center py-2 px-4 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
  //           >
  //             ← Continue Shopping
  //           </Link>
  //         </div>
  //       </motion.div>
  //     </div>
  //   );
  // };

  // export default SuccessPage;






// // app/success/page.tsx
// "use client";

// import { useEffect } from "react";
// import { useCart } from "@/app/context/CartContext";
// import Link from "next/link";

// const SuccessPage = () => {
//   const { clearCart, cart } = useCart();

//   useEffect(() => {
//     // Final cleanup if cart wasn't cleared during checkout
//     if (cart.length > 0) {
//       clearCart();
//     }
//   }, [clearCart, cart]);

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center p-4">
//       <div className="bg-green-100 p-8 rounded-lg max-w-md text-center">
//         <h1 className="text-2xl font-bold text-green-800 mb-4">
//           Payment Successful!
//         </h1>
//         <p className="text-green-700 mb-4">Your order has been processed successfully.</p>
//         <Link
//           href="/payment"
//           className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
//         >
//           Continue Shopping
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default SuccessPage; // This is the crucial fix
// "use client";

// import { useEffect, useState } from "react";
// import { useSearchParams } from "next/navigation";
// import { CheckCircleIcon } from "@heroicons/react/24/solid";

// const SuccessPage = () => {
//   const searchParams = useSearchParams();
//   const [paymentIntent, setPaymentIntent] = useState<string | null>(null);

//   useEffect(() => {
//     // Safely handle searchParams availability
//     if (typeof window !== 'undefined' && searchParams) {
//       const pi = searchParams.get("payment_intent");
//       if (pi) {
//         setPaymentIntent(pi);
//         // Optional: Send to analytics or backend
//       }
//     }
//   }, [searchParams]);

//   return (
//     <div className="max-w-2xl mx-auto p-6 text-center">
//       <CheckCircleIcon className="w-20 h-20 text-green-500 mx-auto mb-4" />
//       <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
//       {paymentIntent && (
//         <p className="text-gray-600 mb-4">
//           Order ID: <code className="bg-gray-100 p-1 rounded">{paymentIntent}</code>
//         </p>
//       )}
//       <p className="text-lg text-gray-600">
//         Thank you for your purchase. A confirmation email has been sent.
//       </p>
//     </div>
//   );
// };

// export default SuccessPage;