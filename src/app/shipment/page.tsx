"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Truck, Package, MapPin, Clock, Home, Info, Sun, Moon } from "lucide-react";
import Link from "next/link";

export default function EnhancedShipmentTracker() {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [orderNumber, setOrderNumber] = useState("SHIP-****");
  const [orderDate, setOrderDate] = useState<Date | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setOrderNumber(`SHIP-${Math.floor(Math.random() * 9000 + 1000)}`);
    setOrderDate(new Date());
    const savedTheme = localStorage.getItem("theme");
    setIsDarkMode(savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches));
  }, []);

  useEffect(() => {
    if (isMounted) {
      document.documentElement.classList.toggle("dark", isDarkMode);
      localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    }
  }, [isDarkMode, isMounted]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const formatDateTime = (date: Date) => {
    if (!isMounted) return "Loading...";
    const pad = (num: number) => num.toString().padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
  };

  const addDaysWithTime = (date: Date | null, days: number, hours: number, minutes: number) => {
    if (!date) return new Date();
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    newDate.setHours(hours, minutes, 0, 0);
    return newDate;
  };

  // 8-day shipping timeline
  const orderConfirmedDate = orderDate || new Date();
  const inTransitDate = addDaysWithTime(orderDate, 2, 14, 15);
  const outForDeliveryDate = addDaysWithTime(orderDate, 5, 8, 45);
  const deliveredDate = addDaysWithTime(orderDate, 8, 15, 20);

  const shippingSteps = [
    {
      icon: <Package className="w-8 h-8" />,
      title: "Order Confirmed",
      description: "Your order has been successfully placed and confirmed.",
      time: formatDateTime(orderConfirmedDate),
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: "In Transit",
      description: "Your package has left our warehouse in New York.",
      time: formatDateTime(inTransitDate),
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Out for Delivery",
      description: "Your package is with your local delivery partner.",
      time: formatDateTime(outForDeliveryDate),
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Delivered",
      description: "Package successfully delivered to your doorstep.",
      time: formatDateTime(deliveredDate),
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (progress < 100) {
        setProgress(prev => Math.min(prev + 1, 100));
        setCurrentStep(Math.floor((progress + 1) / 25));
      }
    }, 50);

    return () => clearInterval(interval);
  }, [progress]);

  const getStatusColor = (stepIndex: number) => {
    return stepIndex <= currentStep ? 
      (isDarkMode ? "bg-green-400" : "bg-green-500") : 
      (isDarkMode ? "bg-gray-600" : "bg-gray-200");
  };

  if (!isMounted) return null;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gradient-to-br from-gray-50 to-blue-50 text-gray-800'}`}>
      <div className="p-6 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`w-full max-w-3xl rounded-2xl shadow-lg p-8 transition-colors duration-300 ${
            isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'
          }`}
        >
          {/* Theme Toggle */}
          <div className="flex justify-end mb-4">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full ${isDarkMode ? 'text-yellow-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
            </button>
          </div>

          {/* Header Section */}
          <div className="flex items-center justify-between mb-8" suppressHydrationWarning>
            <div>
              <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                Order #{orderNumber}
              </h1>
              {orderDate && (
                <p className={`flex items-center gap-2 mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  <Clock className="w-4 h-4" />
                  Estimated delivery: {deliveredDate.toLocaleDateString('en-US', { 
                    month: 'long', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                </p>
              )}
            </div>
            <button
              onClick={() => setShowDetails(!showDetails)}
              className={`flex items-center gap-2 transition-colors ${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}
            >
              <Info className="w-5 h-5" />
              {showDetails ? "Hide Details" : "Show Details"}
            </button>
          </div>

          {/* Progress Visualization */}
          <div className={`relative h-2 rounded-full mb-12 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
            <motion.div
              className="absolute h-full rounded-full"
              style={{
                background: isDarkMode 
                  ? 'linear-gradient(to right, #60a5fa, #34d399)' 
                  : 'linear-gradient(to right, #3b82f6, #10b981)'
              }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 2 }}
            />
            <motion.div
              className="absolute -top-4 -translate-x-1/2"
              animate={{ left: `${progress}%` }}
              transition={{ duration: 2 }}
            >
              <Truck className={`w-10 h-10 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            </motion.div>
          </div>

          {/* Timeline Steps */}
          <div className="grid gap-8 relative">
            {shippingSteps.map((step, index) => (
              <motion.div
                key={index}
                className="flex gap-6 items-start"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStatusColor(index)}`}>
                  {step.icon}
                </div>
                <div className="flex-1">
                  <h3 className={`font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                    {step.title}
                  </h3>
                  <AnimatePresence>
                    {showDetails && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <p className={`mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {step.description}
                        </p>
                        <p className={`text-sm mt-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                          {step.time}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Delivery Notification */}
          {currentStep === shippingSteps.length - 1 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`mt-8 p-6 rounded-xl flex items-center gap-4 ${
                isDarkMode ? 'bg-green-900 border border-green-800' : 'bg-green-50 border border-green-200'
              }`}
            >
              <CheckCircle className={`w-8 h-8 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
              <div>
                <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-green-200' : 'text-green-800'}`}>
                  Delivery Successful!
                </h3>
                <p className={isDarkMode ? 'text-green-300' : 'text-green-700'}>
                  Your package was delivered at {shippingSteps[3].time.split(' ')[1]}
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Action Button */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8"
        >
          <Link
            href="/"
            className={`px-6 py-3 rounded-lg flex items-center gap-2 transition-colors ${
              isDarkMode ? 'bg-gray-700 text-gray-100 hover:bg-gray-600' : 'bg-gray-900 text-white hover:bg-gray-800'
            }`}
          >
            <Home className="w-5 h-5" />
            Return to Homepage
          </Link>
        </motion.div>
      </div>
    </div>
  );
}





// "use client";

// import { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { CheckCircle, Truck, Package, MapPin, Clock, Home, Info } from "lucide-react";
// import Link from "next/link";

// export default function EnhancedShipmentTracker() {
//   const [currentStep, setCurrentStep] = useState(0);
//   const [progress, setProgress] = useState(0);
//   const [showDetails, setShowDetails] = useState(false);

//   const shippingSteps = [
//     {
//       icon: <Package className="w-8 h-8" />,
//       title: "Order Confirmed",
//       description: "Your order has been successfully placed and confirmed.",
//       time: "2024-03-10 09:30",
//     },
//     {
//       icon: <Truck className="w-8 h-8" />,
//       title: "In Transit",
//       description: "Your package has left our warehouse in New York.",
//       time: "2024-03-11 14:15",
//     },
//     {
//       icon: <MapPin className="w-8 h-8" />,
//       title: "Out for Delivery",
//       description: "Your package is with your local delivery partner.",
//       time: "2024-03-12 08:45",
//     },
//     {
//       icon: <CheckCircle className="w-8 h-8" />,
//       title: "Delivered",
//       description: "Package successfully delivered to your doorstep.",
//       time: "2024-03-12 15:20",
//     },
//   ];

//   // Animation controls
//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (progress < 100) {
//         setProgress(prev => Math.min(prev + 1, 100));
//         setCurrentStep(Math.floor((progress + 1) / 25));
//       }
//     }, 50);

//     return () => clearInterval(interval);
//   }, [progress]);

//   const getStatusColor = (stepIndex: number) => {
//     return stepIndex <= currentStep ? "bg-green-500" : "bg-gray-200";
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6 flex flex-col items-center">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8"
//       >
//         {/* Header Section */}
//         <div className="flex items-center justify-between mb-8">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-800">Order #SHIP-2468</h1>
//             <p className="text-gray-600 flex items-center gap-2 mt-1">
//               <Clock className="w-4 h-4" />
//               Estimated delivery: March 12, 2024
//             </p>
//           </div>
//           <button
//             onClick={() => setShowDetails(!showDetails)}
//             className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
//           >
//             <Info className="w-5 h-5" />
//             {showDetails ? "Hide Details" : "Show Details"}
//           </button>
//         </div>

//         {/* Progress Visualization */}
//         <div className="relative h-2 bg-gray-200 rounded-full mb-12">
//           <motion.div
//             className="absolute h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full"
//             initial={{ width: 0 }}
//             animate={{ width: `${progress}%` }}
//             transition={{ duration: 2 }}
//           />
//           <motion.div
//             className="absolute -top-4 -translate-x-1/2"
//             animate={{ left: `${progress}%` }}
//             transition={{ duration: 2 }}
//           >
//             <Truck className="w-10 h-10 text-blue-600" />
//           </motion.div>
//         </div>

//         {/* Timeline Steps */}
//         <div className="grid gap-8 relative">
//           {shippingSteps.map((step, index) => (
//             <motion.div
//               key={index}
//               className="flex gap-6 items-start"
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: index * 0.1 }}
//             >
//               <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStatusColor(index)}`}>
//                 {step.icon}
//               </div>
//               <div className="flex-1">
//                 <h3 className="font-semibold text-gray-800">{step.title}</h3>
//                 <AnimatePresence>
//                   {showDetails && (
//                     <motion.div
//                       initial={{ opacity: 0, height: 0 }}
//                       animate={{ opacity: 1, height: "auto" }}
//                       exit={{ opacity: 0, height: 0 }}
//                     >
//                       <p className="text-gray-600 mt-1">{step.description}</p>
//                       <p className="text-sm text-gray-500 mt-2">{step.time}</p>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {/* Delivery Notification */}
//         {currentStep === shippingSteps.length - 1 && (
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="mt-8 p-6 bg-green-50 border border-green-200 rounded-xl flex items-center gap-4"
//           >
//             <CheckCircle className="w-8 h-8 text-green-600" />
//             <div>
//               <h3 className="text-lg font-semibold text-green-800">Delivery Successful!</h3>
//               <p className="text-green-700">Your package was delivered at 3:20 PM</p>
//             </div>
//           </motion.div>
//         )}
//       </motion.div>

//       {/* Action Button */}
//       <motion.div
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//         className="mt-8"
//       >
//         <Link
//           href="/"
//           className="px-6 py-3 bg-gray-900 text-white rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors"
//         >
//           <Home className="w-5 h-5" />
//           Return to Homepage
//         </Link>
//       </motion.div>
//     </div>
//   );
// }






































// "use client";

// import { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { CheckCircle, Truck, Package, MapPin, Clock, Home } from "lucide-react";
// import Link from "next/link";

// export default function ShipmentAnimation() {
//   const [currentStep, setCurrentStep] = useState(0);
//   const [progress, setProgress] = useState(0);
//   const [isDelivered, setIsDelivered] = useState(false);

//   const steps = [
//     { 
//       icon: <Package className="w-10 h-10" />,
//       text: "Order Placed",
//       description: "Your order has been confirmed and is being prepared for shipment."
//     },
//     { 
//       icon: <Truck className="w-10 h-10" />, 
//       text: "Out for Delivery",
//       description: "Your package has left our warehouse and is on its way."
//     },
//     { 
//       icon: <MapPin className="w-10 h-10" />, 
//       text: "Arriving Soon",
//       description: "Your package is in your area and will arrive shortly."
//     },
//     { 
//       icon: <CheckCircle className="w-10 h-10" />, 
//       text: "Delivered!",
//       description: "Your package has been successfully delivered."
//     },
//   ];

//   useEffect(() => {
//     if (currentStep < steps.length - 1) {
//       const timer = setTimeout(() => {
//         setCurrentStep((prev) => prev + 1);
//       }, 3000);
//       return () => clearTimeout(timer);
//     } else {
//       setIsDelivered(true);
//     }
//   }, [currentStep]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setProgress((prev) => {
//         if (prev >= 100) {
//           clearInterval(interval);
//           return 100;
//         }
//         return prev + (100 / (steps.length * 2));
//       });
//     }, 500);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
//       <motion.div
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.5 }}
//         className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-2xl"
//       >
//         <div className="flex items-center justify-between mb-8">
//           <h2 className="text-3xl font-bold text-gray-800">Order Tracking</h2>
//           <div className="flex items-center gap-2 text-blue-600">
//             <Clock className="w-6 h-6" />
//             <span className="font-medium">Estimated Delivery: 2-3 Days</span>
//           </div>
//         </div>

//         <div className="relative py-8">
//           {/* Animated Truck */}
//           <motion.div
//             className="absolute -top-4 left-0"
//             animate={{ x: `${progress}%` }}
//             transition={{ duration: 3, ease: "linear" }}
//           >
//             <Truck className="w-12 h-12 text-blue-600" />
//           </motion.div>

//           {/* Progress Bar */}
//           <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
//             <motion.div
//               className="h-full bg-gradient-to-r from-blue-500 to-indigo-600"
//               initial={{ width: 0 }}
//               animate={{ width: `${progress}%` }}
//               transition={{ duration: 3, ease: "linear" }}
//             />
//           </div>

//           {/* Steps */}
//           <div className="grid grid-cols-4 gap-4 mt-8">
//             {steps.map((step, index) => (
//               <motion.div
//                 key={index}
//                 className={`flex flex-col items-center text-center ${
//                   index <= currentStep ? "text-blue-600" : "text-gray-400"
//                 }`}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.2 }}
//               >
//                 <motion.div
//                   className={`p-4 rounded-full mb-2 ${
//                     index <= currentStep
//                       ? "bg-blue-100 shadow-lg"
//                       : "bg-gray-100"
//                   }`}
//                   whileHover={{ scale: 1.1 }}
//                 >
//                   {step.icon}
//                 </motion.div>
//                 <h3 className="font-semibold mb-1">{step.text}</h3>
//                 <p className="text-sm text-gray-600">{step.description}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>

//         {/* Delivery Notification */}
//         <AnimatePresence>
//           {isDelivered && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               className="mt-8 p-6 bg-green-50 border border-green-200 rounded-xl"
//             >
//               <div className="flex items-center gap-4">
//                 <CheckCircle className="w-8 h-8 text-green-600" />
//                 <div>
//                   <h3 className="text-lg font-semibold text-green-800">
//                     Successfully Delivered!
//                   </h3>
//                   <p className="text-green-700">
//                     Your package has been delivered. Thank you for choosing us!
//                   </p>
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </motion.div>

//       {/* Back to Home Button */}
//       <motion.div
//         className="mt-8"
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//       >
//         <Link
//           href="/"
//           className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow-md flex items-center gap-2 hover:shadow-lg transition-all"
//         >
//           <Home className="w-5 h-5" />
//           Return to Homepage
//         </Link>
//       </motion.div>
//     </div>
//   );
// }



















// "use client";

// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { CheckCircle, Truck, Package, MapPin } from "lucide-react";
// import Link from "next/link"; // Importing Link from next.js

// export default function ShipmentAnimation() {
//   const [currentStep, setCurrentStep] = useState(0);

//   const steps = [
//     { icon: <Package className="w-10 h-10 text-gray-500" />, text: "Order Placed" },
//     { icon: <Truck className="w-10 h-10 text-gray-500" />, text: "Out for Delivery" },
//     { icon: <MapPin className="w-10 h-10 text-gray-500" />, text: "Arriving Soon" },
//     { icon: <CheckCircle className="w-10 h-10 text-green-500" />, text: "Delivered!" },
//   ];

//   useEffect(() => {
//     if (currentStep < steps.length - 1) {
//       const timer = setTimeout(() => {
//         setCurrentStep((prev) => prev + 1);
//       }, 2000);
//       return () => clearTimeout(timer);
//     }
//   }, [currentStep]);

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1 }}
//         className="bg-white shadow-md rounded-lg p-6 w-full max-w-md text-center"
//       >
//         <h2 className="text-2xl font-semibold mb-4">Your Order is on the Way!</h2>

//         <div className="flex justify-between items-center relative py-6">
//           {steps.map((step, index) => (
//             <motion.div
//               key={index}
//               className={`flex flex-col items-center ${index <= currentStep ? "text-green-500" : "text-gray-400"}`}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: index * 0.5 }}
//             >
//               <div className="p-3 bg-white shadow-md rounded-full">{step.icon}</div>
//               <p className="text-sm mt-2">{step.text}</p>
//             </motion.div>
//           ))}

//           {/* Progress Line */}
//           <motion.div
//             className="absolute top-1/2 left-0 w-full h-1 bg-gray-300"
//             initial={{ scaleX: 0 }}
//             animate={{ scaleX: (currentStep + 1) / steps.length }}
//             transition={{ duration: 1 }}
//             style={{ transformOrigin: "left" }}
//           />
//         </div>
//       </motion.div>

//       {currentStep === steps.length - 1 && (
//         <motion.div
//           className="mt-8 p-4 bg-green-100 border border-green-500 text-green-700 rounded-lg text-center"
//           initial={{ opacity: 0, scale: 0.8 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.5 }}
//         >
//           🎉 Congratulations! Your order has been successfully delivered.
//         </motion.div>
//       )}

//       {/* Back to Home Link */}
//       <Link
//         href="/"
//         className="mt-6 px-4 py-2 bg-gray-800 text-white rounded-md shadow-md flex items-center gap-2 hover:bg-gray-900 transition"
//       >
//         <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7" />
//         </svg>
//         Back to Home
//       </Link>
//     </div>
//   );
// }

// "use client";

// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { CheckCircle, Truck, Package, MapPin } from "lucide-react";

// export default function ShipmentAnimation() {
//   const [currentStep, setCurrentStep] = useState(0);

//   const steps = [
//     { icon: <Package className="w-10 h-10 text-gray-500" />, text: "Order Placed" },
//     { icon: <Truck className="w-10 h-10 text-gray-500" />, text: "Out for Delivery" },
//     { icon: <MapPin className="w-10 h-10 text-gray-500" />, text: "Arriving Soon" },
//     { icon: <CheckCircle className="w-10 h-10 text-green-500" />, text: "Delivered!" },
//   ];

//   useEffect(() => {
//     if (currentStep < steps.length - 1) {
//       const timer = setTimeout(() => {
//         setCurrentStep((prev) => prev + 1);
//       }, 2000);
//       return () => clearTimeout(timer);
//     }
//   }, [currentStep]);

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1 }}
//         className="bg-white shadow-md rounded-lg p-6 w-full max-w-md text-center"
//       >
//         <h2 className="text-2xl font-semibold mb-4">Your Order is on the Way!</h2>

//         <div className="flex justify-between items-center relative py-6">
//           {steps.map((step, index) => (
//             <motion.div
//               key={index}
//               className={`flex flex-col items-center ${index <= currentStep ? "text-green-500" : "text-gray-400"}`}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: index * 0.5 }}
//             >
//               <div className="p-3 bg-white shadow-md rounded-full">{step.icon}</div>
//               <p className="text-sm mt-2">{step.text}</p>
//             </motion.div>
//           ))}

//           {/* Progress Line */}
//           <motion.div
//             className="absolute top-1/2 left-0 w-full h-1 bg-gray-300"
//             initial={{ scaleX: 0 }}
//             animate={{ scaleX: (currentStep + 1) / steps.length }}
//             transition={{ duration: 1 }}
//             style={{ transformOrigin: "left" }}
//           />
//         </div>
//       </motion.div>

//       {currentStep === steps.length - 1 && (
//         <motion.div
//           className="mt-8 p-4 bg-green-100 border border-green-500 text-green-700 rounded-lg text-center"
//           initial={{ opacity: 0, scale: 0.8 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.5 }}
//         >
//           🎉 Congratulations! Your order has been successfully delivered.
//         </motion.div>
//       )}
//     </div>
//   );
// }











// "use client";

// import { useEffect, useState } from "react";

// const DeliveryConfirmationPage = () => {
//   const [showConfetti, setShowConfetti] = useState(true);

//   // Stop confetti after 5 seconds
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setShowConfetti(false);
//     }, 5000); // 5 seconds

//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-100 to-blue-100">
//       {/* Confetti Animation */}
//       {showConfetti && (
//         <div className="confetti-container">
//           {[...Array(100)].map((_, i) => (
//             <div key={i} className={`confetti confetti-${i % 10}`}></div>
//           ))}
//         </div>
//       )}

//       {/* Delivery Message */}
//       <div className="bg-white p-8 rounded-lg shadow-lg text-center z-10">
//         <h1 className="text-4xl font-bold text-green-600 mb-4">🎉 Order Delivered!</h1>
//         <p className="text-gray-700 text-lg mb-6">
//           Your order has been successfully delivered. Thank you for shopping with us!
//         </p>
//         <button
//           className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-semibold transition-colors"
//           onClick={() => alert("Continue shopping!")}
//         >
//           Continue Shopping
//         </button>
//       </div>
//     </div>
//   );
// };

// export default DeliveryConfirmationPage;
// "use client";

// import { useState } from "react";
// import { FaCcVisa, FaCcMastercard, FaCcAmex, FaPaypal, FaBitcoin } from "react-icons/fa";
// import { SiCoinbase, SiKlarna } from "react-icons/si";

// const PaymentPage = () => {
//   const [selectedPayment, setSelectedPayment] = useState("");
//   const [billingAddress, setBillingAddress] = useState("");
//   const [shippingAddress, setShippingAddress] = useState("");

//   const handlePaymentChange = (method: string) => {
//     setSelectedPayment(method);
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
//       <h1 className="text-2xl font-semibold mb-4">Checkout</h1>
//       <p className="text-gray-600 text-sm mb-4">All transactions are secure and encrypted.</p>

//       {/* Order Summary */}
//       <div className="border rounded-md p-4 mb-6">
//         <h2 className="text-xl font-semibold mb-3">Order Summary</h2>
//         <div className="flex justify-between text-gray-700">
//           <span>Product Name</span>
//           <span>$50.00</span>
//         </div>
//         <div className="flex justify-between text-gray-700">
//           <span>Shipping</span>
//           <span>$5.00</span>
//         </div>
//         <div className="flex justify-between text-lg font-semibold mt-2">
//           <span>Total</span>
//           <span>$55.00</span>
//         </div>
//       </div>

//       {/* Shipping Information */}
//       <div className="border rounded-md p-4 mb-6">
//         <h2 className="text-xl font-semibold mb-3">Shipping Address</h2>
//         <input
//           type="text"
//           placeholder="Full Name"
//           className="w-full border p-2 mb-2"
//         />
//         <input
//           type="text"
//           placeholder="Street Address"
//           className="w-full border p-2 mb-2"
//           value={shippingAddress}
//           onChange={(e) => setShippingAddress(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="City"
//           className="w-full border p-2 mb-2"
//         />
//         <input
//           type="text"
//           placeholder="Postal Code"
//           className="w-full border p-2 mb-2"
//         />
//         <input
//           type="text"
//           placeholder="Phone Number"
//           className="w-full border p-2 mb-2"
//         />
//       </div>

//       {/* Billing Information */}
//       <div className="border rounded-md p-4 mb-6">
//         <h2 className="text-xl font-semibold mb-3">Billing Address</h2>
//         <label className="flex items-center space-x-2 mb-3">
//           <input
//             type="checkbox"
//             onChange={() => setBillingAddress(shippingAddress)}
//           />
//           <span>Same as Shipping Address</span>
//         </label>
//         <input
//           type="text"
//           placeholder="Street Address"
//           className="w-full border p-2 mb-2"
//           value={billingAddress}
//           onChange={(e) => setBillingAddress(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="City"
//           className="w-full border p-2 mb-2"
//         />
//         <input
//           type="text"
//           placeholder="Postal Code"
//           className="w-full border p-2 mb-2"
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
//         className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md font-medium"
//         disabled={!selectedPayment}
//       >
//         Complete Order
//       </button>
//     </div>
//   );
// };

// export default PaymentPage;
