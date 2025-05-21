import { groq } from "next-sanity";

// Fetch all products for the product listing page
export const allProduct = groq`
  *[_type == "products"]{
    _id, // Unique identifier for each product
    title, // Product title
    price, // Product price
    originalPrice, // Original price for calculating savings
    stock, // Stock field
    "slug": slug.current, // Dynamic slug for routing
    "image": image.asset->url // Image URL
  }
`;

// Fetch a specific product by slug for dynamic product pages
export const eight = groq`
  *[_type == "products" && slug.current == $slug][0]{
    _id,
    title, // Product title
    description, // Product description for detail pages
    price, // Product price
    originalPrice, // Original price for calculating savings
    stock, // Stock field
    "image": image.asset->url, // Image URL
    "slug": slug.current // Dynamic slug
  }
`;

// Fetch featured products (optional, for homepage or promotional sections)
export const featuredProductsQuery = groq`
  *[_type == "products" && featured == true][0..4]{
    _id, // Unique identifier for each product
    title, // Product title
    price, // Product price
    originalPrice, // Original price for calculating savings
    stock, // Stock field
    "slug": slug.current, // Dynamic slug for routing
    "image": image.asset->url // Image URL
  }
`;







// import { groq } from "next-sanity";

// // Fetch all products for the product listing page
// export const allProduct = groq`
//   *[_type == "products"]{
//     _id, // Unique identifier for each product
//     title, // Product title
//     price, // Product price
//     originalPrice, // Original price for calculating savings
//     "slug": slug.current, // Dynamic slug for routing
//     "image": image.asset->url // Image URL
//   }
// `;

// // Fetch a specific product by slug for dynamic product pages
// export const eight = groq`
//   *[_type == "products" && slug.current == $slug][0]{
//     _id,
//     title, // Product title
//     description, // Product description for detail pages
//     price, // Product price
//     originalPrice, // Original price for calculating savings
//     "image": image.asset->url, // Image URL
//     "slug": slug.current // Dynamic slug
//   }
// `;

// // Fetch featured products (optional, for homepage or promotional sections)
// export const featuredProductsQuery = groq`
//   *[_type == "products" && featured == true][0..4]{
//     _id, // Unique identifier for each product
//     title, // Product title
//     price, // Product price
//     originalPrice, // Original price for calculating savings
//     "slug": slug.current, // Dynamic slug for routing
//     "image": image.asset->url // Image URL
//   }
// `;

// import { groq } from "next-sanity";

// // Fetch all products for the product listing page
// export const allProduct = groq`
//   *[_type == "products"]{
//     _id, // Unique identifier for each product
//     title, // Product title
//     price, // Product price
//     "slug": slug.current, // Dynamic slug for routing
//     "image": image.asset->url // Image URL
//   }
// `;

// // Fetch a specific product by slug for dynamic product pages
// export const eight = groq`
//   *[_type == "products" && slug.current == $slug][0]{
//     _id,
//     title, // Product title
//     description, // Product description for detail pages
//     price, // Product price
//     "image": image.asset->url, // Image URL
//     "slug": slug.current // Dynamic slug
//   }
// `;

// // Fetch featured products (optional, for homepage or promotional sections)
// export const featuredProductsQuery = groq`
//   *[_type == "products" && featured == true][0..4]{
//     _id, // Unique identifier for each product
//     title, // Product title
//     price, // Product price
//     "slug": slug.current, // Dynamic slug for routing
//     "image": image.asset->url // Image URL
//   }
// `;
