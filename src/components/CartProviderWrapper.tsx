"use client"; // ✅ Ensure this is a Client Component

import { CartProvider } from "@/app/context/CartContext";

export default function CartProviderWrapper({ children }: { children: React.ReactNode }) {
  return <CartProvider>{children}</CartProvider>;
}
