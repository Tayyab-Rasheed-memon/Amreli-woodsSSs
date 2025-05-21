import { client } from "@/sanity/lib/client";
import { allProduct } from "@/sanity/lib/qury";
import { Product } from "@/app/types/product";

// Fetch all products from Sanity
export async function fetchProducts(): Promise<Product[]> {
  try {
    const products: Product[] = await client.fetch(allProduct);
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}
