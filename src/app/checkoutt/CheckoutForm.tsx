"use client";

import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { FormEvent, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const CheckoutForm = ({
  totalAmount,
  email,
  deliveryAddress,
}: {
  totalAmount: number;
  email: string;
  deliveryAddress: string;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState("Loading payment form...");
  const [showNoPaymentPopup, setShowNoPaymentPopup] = useState(false);

  useEffect(() => {
    if (!stripe) return;

    // Check if elements are available
    const checkElements = async () => {
      if (elements) {
        setMessage(""); // Clear message when elements are ready
      }
    };
    
    checkElements();
  }, [stripe, elements]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setProcessing(true);

    if (!stripe || !elements) {
      setError("Payment system not ready");
      setProcessing(false);
      return;
    }

    try {
      const { error: stripeError } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/success`,
          receipt_email: email,
          shipping: {
            address: {
              line1: deliveryAddress.split(", ")[1],
              city: deliveryAddress.split(", ")[2],
              postal_code: deliveryAddress.split(", ")[3].split("-")[0],
              country: "US",
            },
            name: deliveryAddress.split(", ")[0],
          },
        },
        redirect: 'if_required'
      });

      if (stripeError) {
        throw stripeError;
      }

      // Clear cart on successful payment
      localStorage.removeItem("cart");
      router.push("/success");
      
    } catch (err: any) {
      setError(err.message || "Payment failed");
      setShowNoPaymentPopup(true); // Show "No Payment" popup
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="border rounded-lg p-4 bg-white">
        <PaymentElement />
        {message && <p className="text-sm text-gray-500 mt-2">{message}</p>}
      </div>

      <button
        type="submit"
        disabled={!stripe || processing}
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors duration-200"
      >
        {processing ? "Processing..." : `Pay $${totalAmount.toFixed(2)}`}
      </button>

      {error && (
        <div className="text-red-500 text-center p-2 bg-red-50 rounded-lg">
          {error}
        </div>
      )}

      {/* No Payment Popup with animation */}
      {showNoPaymentPopup && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ type: "spring", stiffness: 100, damping: 25 }}
        >
          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl font-semibold text-center text-red-600">
              Payment Failed
            </h2>
            <p className="text-center mt-4 text-gray-700">
              Your payment could not be processed. Please try again later or contact support.
            </p>
            <button
              onClick={() => setShowNoPaymentPopup(false)}
              className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-full w-full hover:bg-blue-700 transition-colors duration-200"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </form>
  );
};

export default CheckoutForm;











































































































// "use client";

// import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import { FormEvent, useState, useEffect } from "react";
// import { useRouter } from "next/navigation";

// const CheckoutForm = ({
//   totalAmount,
//   email,
//   deliveryAddress,
// }: {
//   totalAmount: number;
//   email: string;
//   deliveryAddress: string;
// }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const router = useRouter();
//   const [error, setError] = useState("");
//   const [processing, setProcessing] = useState(false);
//   const [message, setMessage] = useState("Loading payment form...");

//   useEffect(() => {
//     if (!stripe) return;

//     // Check if elements are available
//     const checkElements = async () => {
//       if (elements) {
//         setMessage(""); // Clear message when elements are ready
//       }
//     };
    
//     checkElements();
//   }, [stripe, elements]);

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     setError("");
//     setProcessing(true);

//     if (!stripe || !elements) {
//       setError("Payment system not ready");
//       setProcessing(false);
//       return;
//     }

//     try {
//       const { error: stripeError } = await stripe.confirmPayment({
//         elements,
//         confirmParams: {
//           return_url: `${window.location.origin}/success`,
//           receipt_email: email,
//           shipping: {
//             address: {
//               line1: deliveryAddress.split(", ")[1],
//               city: deliveryAddress.split(", ")[2],
//               postal_code: deliveryAddress.split(", ")[3].split("-")[0],
//               country: "US",
//             },
//             name: deliveryAddress.split(", ")[0],
//           },
//         },
//         redirect: 'if_required'
//       });

//       if (stripeError) {
//         throw stripeError;
//       }

//       // Clear cart on successful payment
//       localStorage.removeItem("cart");
//       router.push("/success");
      
//     } catch (err: any) {
//       setError(err.message || "Payment failed");
//     } finally {
//       setProcessing(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       <div className="border rounded-lg p-4 bg-white">
//         <PaymentElement />
//         {message && <p className="text-sm text-gray-500 mt-2">{message}</p>}
//       </div>

//       <button
//         type="submit"
//         disabled={!stripe || processing}
//         className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors duration-200"
//       >
//         {processing ? "Processing..." : `Pay $${totalAmount.toFixed(2)}`}
//       </button>

//       {error && (
//         <div className="text-red-500 text-center p-2 bg-red-50 rounded-lg">
//           {error}
//         </div>
//       )}
//     </form>
//   );
// };

// export default CheckoutForm;



// "use client";

// import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import { FormEvent, useState, useEffect } from "react";
// import { FaCcVisa, FaCcMastercard, FaCcAmex } from "react-icons/fa";

// const CheckoutForm = ({
//   totalAmount,
//   email,
//   deliveryAddress,
// }: {
//   totalAmount: number;
//   email: string;
//   deliveryAddress: string;
// }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [error, setError] = useState("");
//   const [processing, setProcessing] = useState(false);

//   useEffect(() => {
//     if (!stripe) {
//       setError("Payment system loading...");
//     }
//   }, [stripe]);

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     setError("");
//     setProcessing(true);

//     if (!stripe || !elements) {
//       setError("Payment system not ready");
//       setProcessing(false);
//       return;
//     }

//     try {
//       const addressParts = deliveryAddress.split(", ");
      
//       const { error: stripeError } = await stripe.confirmPayment({
//         elements,
//         confirmParams: {
//           return_url: `${window.location.origin}/checkout/success`,
//           receipt_email: email,
//           shipping: {
//             name: addressParts[0],
//             address: {
//               line1: addressParts[1],
//               city: addressParts[2],
//               postal_code: addressParts[3].split("-")[0],
//               country: "US",
//             }
//           }
//         }
//       });

//       if (stripeError) throw stripeError;
//     } catch (err: any) {
//       setError(err.message || "Payment failed");
//     } finally {
//       setProcessing(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       <div className="border rounded-lg p-4 bg-white">
//         <CardElement
//           options={{
//             style: {
//               base: {
//                 fontSize: "16px",
//                 color: "#374151",
//                 "::placeholder": {
//                   color: "#9CA3AF",
//                 },
//               },
//             },
//             hidePostalCode: true,
//           }}
//         />
//       </div>

//       <div className="flex items-center justify-between text-gray-600">
//         <div className="flex gap-3">
//           <FaCcVisa className="text-2xl text-blue-900" />
//           <FaCcMastercard className="text-2xl text-red-600" />
//           <FaCcAmex className="text-2xl text-blue-500" />
//         </div>
//         <span className="font-medium">Total: ${totalAmount.toFixed(2)}</span>
//       </div>

//       <button
//         type="submit"
//         disabled={!stripe || processing}
//         className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
//       >
//         {processing ? "Processing..." : `Pay $${totalAmount.toFixed(2)}`}
//       </button>

//       {error && (
//         <div className="text-red-500 text-center mt-3 p-2 bg-red-50 rounded">
//           {error}
//         </div>
//       )}
//     </form>
//   );
// };

// export default CheckoutForm;