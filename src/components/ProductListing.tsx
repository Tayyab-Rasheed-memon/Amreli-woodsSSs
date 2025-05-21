// components/ProductListing.tsx
"use client"; // This line marks the file as a client-side component

import React, { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { allProduct } from "@/sanity/lib/qury";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";

type Product = {
  _id: string;
  title: string;
  price: number;
  image: {
    asset: {
      _ref: string;
    };
  };
};

const ProductListing: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const fetchedProducts: Product[] = await client.fetch(allProduct);
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-semibold text-center mb-6">Our Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow"
          >
            <Link href={`/products/${product._id}`}>
              <div className="block p-4">
                {product.image?.asset?._ref && (
                  <img
                    src={urlFor(product.image.asset._ref).url()}
                    alt={product.title}
                    className="w-full h-48 object-cover mb-4 rounded-md"
                  />
                )}
                <h3 className="text-xl font-semibold text-gray-800">{product.title}</h3>
                <p className="text-gray-500 mt-2">${product.price}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductListing;
