




































































"use client"; // Ensure this is client-side rendering

import React, { useEffect, useState } from "react";
import { Product } from "@/app/types/product";
import { client } from "@/sanity/lib/client";
import { allProduct } from "@/sanity/lib/qury";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

function Hero({ isDarkMode }: { isDarkMode: boolean }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<{ title: string; quantity: number }[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("title");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [isLoading, setIsLoading] = useState(true);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setIsLoading(true);
        const fetchedProducts: Product[] = await client.fetch(allProduct);
        setProducts(fetchedProducts);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setIsLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const addToCart = (productTitle: string) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.title === productTitle);
      if (existingItem) {
        return prevCart.map((item) =>
          item.title === productTitle ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { title: productTitle, quantity: 1 }];
    });
  };

  const removeFromCart = (productTitle: string) => {
    setCart((prevCart) => {
      const updatedCart = prevCart
        .map((item) =>
          item.title === productTitle && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);
      return updatedCart;
    });
  };

  const addToWishlist = (productTitle: string) => {
    if (!wishlist.includes(productTitle)) {
      setWishlist([...wishlist, productTitle]);
    }
  };

  const filteredProducts = products.filter((product) =>
    (selectedCategory === "All" || product._id === selectedCategory) &&
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "price") return a.price - b.price;
    if (sortOption === "title") return a.title.localeCompare(b.title);
    return 0;
  });

  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className={isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-black"}>
      {/* Header Section */}
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold">Our Products</h1>
        <div className="flex gap-4 my-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border rounded"
          >
            <option value="All">All Categories</option>
            <option value="Chairs">Chairs</option>
            <option value="Tables">Tables</option>
            <option value="Sofas">Sofas</option>
          </select>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow px-4 py-2 border rounded"
          />
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="px-4 py-2 border rounded"
          >
            <option value="title">Sort by Title</option>
            <option value="price">Sort by Price</option>
          </select>
        </div>
      </div>

      {/* Products Section */}
      {isLoading ? (
        <div className="text-center py-16">Loading products...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6">
          {paginatedProducts.map((product) => (
            <div key={product._id} className="border rounded-lg p-4">
              <Image
                src={urlFor(product.image).url()}
                alt={product.title}
                width={200}
                height={150}
                className="w-full h-48 object-cover rounded-md"
              />
              <h3 className="text-lg font-semibold mt-2">{product.title}</h3>
              <p className="mt-1">${product.price}</p>
              <button
                onClick={() => addToCart(product.title)}
                className="mt-2 bg-teal-500 text-white px-4 py-2 rounded"
              >
                Add to Cart
              </button>
              <button
                onClick={() => addToWishlist(product.title)}
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
              >
                Add to Wishlist
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center my-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Previous
        </button>
        <span className="px-4">Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Hero;

