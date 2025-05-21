"use client";

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { FormEvent, useState, useEffect } from "react";
import { FaCcVisa, FaCcMastercard, FaCcAmex, FaPaypal } from "react-icons/fa";

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
  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!stripe) {
      setError("Stripe.js hasn't loaded yet");
    }
  }, [stripe]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!stripe || !elements) {
      setError("Payment system not ready");
      return;
    }

    setIsProcessing(true);

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
      });

      if (stripeError) {
        throw stripeError;
      }

      setMessage("Payment processing...");
    } catch (err: any) {
      setError(err.message || "Payment failed");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="p-4 border rounded-lg bg-white">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#ef4444",
              },
            },
            hidePostalCode: true,
          }}
        />
      </div>

      <div className="flex justify-between items-center text-sm text-gray-600">
        <div className="flex space-x-2">
          <FaCcVisa className="text-2xl text-blue-900" />
          <FaCcMastercard className="text-2xl text-red-700" />
          <FaCcAmex className="text-2xl text-blue-500" />
          <FaPaypal className="text-2xl text-blue-700" />
        </div>
        <span className="font-semibold">Total: ${totalAmount.toFixed(2)}</span>
      </div>

      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors duration-200"
      >
        {isProcessing ? "Processing..." : `Pay $${totalAmount.toFixed(2)}`}
      </button>

      {error && (
        <div className="text-red-500 text-center mt-2 p-2 bg-red-50 rounded-lg">
          {error}
        </div>
      )}

      {message && (
        <div className="text-blue-600 text-center mt-2 p-2 bg-blue-50 rounded-lg">
          {message}
        </div>
      )}
    </form>
  );
};

export default CheckoutForm;