import { GetStaticPaths, GetStaticProps } from "next";
import { client } from "@/sanity/lib/client";
import { Product } from "@/app/types/product";
import { useRouter } from "next/router";
import ProductDetails from "./ProductDetails";

type ProductPageProps = {
  product: Product | null;
};

export default function ProductPage({ product }: ProductPageProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <p className="text-center text-gray-500 mt-10">Loading product...</p>;
  }

  if (!product) {
    return <p className="text-center text-red-500 font-bold text-xl">Product not found!</p>;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <ProductDetails product={product} />
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const products = await client.fetch(
    `*[_type == "products" && defined(slug.current)]{ "slug": slug.current }`
  );

  const paths = products.map((product: { slug: string }) => ({
    params: { slug: product.slug },
  }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const { slug } = params as { slug: string };
    const product = await client.fetch(
      `*[_type == "products" && slug.current == $slug][0]`,
      { slug }
    );

    if (!product) {
      return { notFound: true };
    }

    return {
      props: { product },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Error fetching product:", error);
    return { notFound: true };
  }
};













// import { GetStaticPaths, GetStaticProps } from "next";
// import { client } from "@/sanity/lib/client";
// import { Product } from "@/app/types/product";
// import { useRouter } from "next/router";
// import Navbar from "@/components/Navbar";
// import ProductDetails from "./ProductDetails";

// type ProductPageProps = {
//   product: Product | null;
// };

// export default function ProductPage({ product }: ProductPageProps) {
//   const router = useRouter();

//   if (router.isFallback) {
//     return <p className="text-center text-gray-500 mt-10">Loading product...</p>;
//   }

//   if (!product) {
//     return <p className="text-center text-red-500 font-bold text-xl">Product not found!</p>;
//   }

//   return (
//     <div className="bg-gray-50 min-h-screen">
      
//       <ProductDetails product={product} />
//     </div>
//   );
// }

// export const getStaticPaths: GetStaticPaths = async () => {
//   const products = await client.fetch(
//     `*[_type == "products" && defined(slug.current)]{ "slug": slug.current }`
//   );

//   const paths = products.map((product: { slug: string }) => ({
//     params: { slug: product.slug },
//   }));

//   console.log(paths); // Debugging paths
//   return { paths, fallback: true };
// };

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   try {
//     const { slug } = params as { slug: string };
//     const product = await client.fetch(
//       `*[_type == "products" && slug.current == $slug][0]`,
//       { slug }
//     );

//     if (!product) {
//       return { notFound: true };
//     }

//     return {
//       props: { product },
//       revalidate: 60,
//     };
//   } catch (error) {
//     console.error("Error fetching product:", error);
//     return { notFound: true };
//   }
// };
// import { GetStaticPaths, GetStaticProps } from "next";
// import { client } from "@/sanity/lib/client";
// import { Product } from "@/app/types/product";
// import { urlFor } from "@/sanity/lib/image";
// import Image from "next/image";
// import { motion } from "framer-motion";


// type ProductPageProps = {
//   product: Product;
// };

// export default function ProductPage({ product }: ProductPageProps) {
//   if (!product) {
//     return (
//       <motion.div
//         className="container mx-auto py-8 text-center text-red-500"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.5 }}
//       >
//         Product not found!
//       </motion.div>
//     );
//   }

//   return (
//     <motion.div
//       className="container mx-auto py-8"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.8 }}
//     >
//       <div className="flex flex-col md:flex-row items-center gap-8 bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-lg shadow-xl hover:shadow-2xl transition-shadow">
//         <motion.div
//           className="w-full md:w-1/2"
//           initial={{ scale: 0.8, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           transition={{ duration: 0.8 }}
//         >
//           <Image
//             src={urlFor(product.image).url()}
//             alt={product.title || "Product Image"}
//             width={400}
//             height={400}
//             className="rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
//           />
//         </motion.div>

//         <motion.div
//           className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-inner"
//           initial={{ x: 50, opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//           transition={{ duration: 0.8 }}
//         >
//           <h1 className="text-4xl font-extrabold text-teal-600 mb-4 tracking-wide">
//             {product.title}
//           </h1>
//           <p className="text-gray-700 text-lg mb-6 leading-relaxed border-l-4 border-teal-500 pl-4">
//             {product.description}
//           </p>
//           <p className="text-3xl font-bold text-teal-500 mb-4">
//             ${product.price}
//           </p>
//           <button className="px-6 py-2 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-500 hover:shadow-lg transition-all duration-300">
//             Add to Cart
//           </button>
//         </motion.div>
//       </div>
//     </motion.div>
//   );
// }

// export const getStaticPaths: GetStaticPaths = async () => {
//   const products = await client.fetch(
//     `*[_type == "products" && defined(slug.current)]{ "slug": slug.current }`
//   );

//   const paths = products.map((product: { slug: string }) => ({
//     params: { slug: product.slug },
//   }));

//   console.log(paths); // Debugging paths
//   return { paths, fallback: true };
// };

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   const { slug } = params!;
//   console.log(`Fetching product with slug: ${slug}`); // Debugging

//   const product = await client.fetch(
//     `*[_type == "products" && slug.current == $slug][0]`,
//     { slug }
//   );

//   if (!product) {
//     console.log(`No product found for slug: ${slug}`); // Debugging
//     return { notFound: true };
//   }
//   console.log(product); // Debugging product data

//   return {
//     props: { product },
//   };
// };
// // import { GetStaticPaths, GetStaticProps } from "next";
// // import { client } from "@/sanity/lib/client";
// // import { Product } from "@/app/types/product";
// // import { urlFor } from "@/sanity/lib/image";
// // import Image from "next/image";
// // import { motion } from "framer-motion";

// // type ProductPageProps = {
// //   product: Product;
// // };

// // export default function ProductPage({ product }: ProductPageProps) {
// //   if (!product) {
// //     return (
// //       <motion.div
// //         className="container mx-auto py-8 text-center text-red-500"
// //         initial={{ opacity: 0 }}
// //         animate={{ opacity: 1 }}
// //         transition={{ duration: 0.5 }}
// //       >
// //         Product not found!
// //       </motion.div>
// //     );
// //   }

// //   return (
// //     <motion.div
// //       className="container mx-auto py-8"
// //       initial={{ opacity: 0 }}
// //       animate={{ opacity: 1 }}
// //       transition={{ duration: 0.8 }}
// //     >
// //       <div className="flex flex-col md:flex-row items-center gap-8 bg-gray-50 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow">
// //         <motion.div
// //           className="w-full md:w-1/2"
// //           initial={{ scale: 0.8, opacity: 0 }}
// //           animate={{ scale: 1, opacity: 1 }}
// //           transition={{ duration: 0.8 }}
// //         >
// //           <Image
// //             src={urlFor(product.image).url()}
// //             alt={product.title || "Product Image"}
// //             width={400}
// //             height={400}
// //             className="rounded-lg shadow-md"
// //           />
// //         </motion.div>

// //         <motion.div
// //           className="w-full md:w-1/2"
// //           initial={{ x: 50, opacity: 0 }}
// //           animate={{ x: 0, opacity: 1 }}
// //           transition={{ duration: 0.8 }}
// //         >
// //           <h1 className="text-4xl font-bold text-teal-600 mb-4">
// //             {product.title}
// //           </h1>
// //           <p className="text-gray-700 text-lg mb-6 leading-relaxed">
// //             {product.description}
// //           </p>
// //           <p className="text-2xl font-semibold text-teal-500">
// //             ${product.price}
// //           </p>
// //         </motion.div>
// //       </div>
// //     </motion.div>
// //   );
// // }

// // export const getStaticPaths: GetStaticPaths = async () => {
// //   const products = await client.fetch(
// //     `*[_type == "products" && defined(slug.current)]{ "slug": slug.current }`
// //   );

// //   const paths = products.map((product: { slug: string }) => ({
// //     params: { slug: product.slug },
// //   }));

// //   console.log(paths); // Debugging paths
// //   return { paths, fallback: true };
// // };

// // export const getStaticProps: GetStaticProps = async ({ params }) => {
// //   const { slug } = params!;
// //   console.log(`Fetching product with slug: ${slug}`); // Debugging

// //   const product = await client.fetch(
// //     `*[_type == "products" && slug.current == $slug][0]`,
// //     { slug }
// //   );

// //   if (!product) {
// //     console.log(`No product found for slug: ${slug}`); // Debugging
// //     return { notFound: true };
// //   }
// //   console.log(product); // Debugging product data

// //   return {
// //     props: { product },
// //   };
// // };

// // import { GetStaticPaths, GetStaticProps } from "next";
// // import { client } from "@/sanity/lib/client";
// // import { Product } from "@/app/types/product";
// // import { urlFor } from "@/sanity/lib/image";
// // import Image from "next/image";

// // type ProductPageProps = {
// //   product: Product;
// // };

// // export default function ProductPage({ product }: ProductPageProps) {
// //   if (!product) {
// //     return <div>Product not found!</div>;
// //   }

// //   return (
// //     <div className="container mx-auto py-8">
// //       <div className="flex flex-col md:flex-row items-center gap-8">
// //         <Image
// //           src={urlFor(product.image).url()}
// //           alt={product.title || "Product Image"}
// //           width={400}
// //           height={400}
// //           className="rounded-lg shadow-md"
// //         />
// //         <div>
// //           <h1 className="text-3xl font-bold">{product.title}</h1>
// //           <p className="text-gray-600 mt-4">{product.description}</p>
// //           <p className="text-xl text-teal-500 font-semibold mt-6">
// //             ${product.price}
// //           </p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export const getStaticPaths: GetStaticPaths = async () => {
// //   const products = await client.fetch(`*[_type == "products" && defined(slug.current)]{ "slug": slug.current }`);

// //   const paths = products.map((product: { slug: string }) => ({
// //     params: { slug: product.slug },
// //   }));

// //   console.log(paths); // Debugging paths
// //   return { paths, fallback: true };
// // };


// // export const getStaticProps: GetStaticProps = async ({ params }) => {
// //   const { slug } = params!;
// //   console.log(`Fetching product with slug: ${slug}`); // Debugging

// //   const product = await client.fetch(
// //     `*[_type == "products" && slug.current == $slug][0]`,
// //     { slug }
// //   );

// //   if (!product) {
// //     console.log(`No product found for slug: ${slug}`); // Debugging
// //     return { notFound: true };
// //   }
// //   console.log(product); // Debugging product data

// //   return {
// //     props: { product },
// //   };
// // };


// // import { GetStaticPaths, GetStaticProps } from "next";
// // import { client } from "@/sanity/lib/client";
// // import { Product } from "@/app/types/product";
// // import { urlFor } from "@/sanity/lib/image";
// // import Image from "next/image";

// // type ProductPageProps = {
// //   product: Product;
// // };

// // export default function ProductPage({ product }: ProductPageProps) {
// //   if (!product) {
// //     return <div>Product not found!</div>;
// //   }

// //   return (
// //     <div className="container mx-auto py-8">
// //       <div className="flex flex-col md:flex-row items-center gap-8">
// //         <Image
// //           src={urlFor(product.image).url()}
// //           alt={product.title || "Product Image"}
// //           width={400}
// //           height={400}
// //           className="rounded-lg shadow-md"
// //         />
// //         <div>
// //           <h1 className="text-3xl font-bold">{product.title}</h1>
// //           <p className="text-gray-600 mt-4">{product.description}</p>
// //           <p className="text-xl text-teal-500 font-semibold mt-6">
// //             ${product.price}
// //           </p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export const getStaticPaths: GetStaticPaths = async () => {
// //   // Fetch all products with their slugs
// //   const products = await client.fetch(`*[_type == "products"]{ "slug": slug.current }`);

// //   // Map products to the correct paths format
// //   const paths = products.map((product: { slug: string }) => ({
// //     params: { slug: product.slug }, // Ensure slug is a string
// //   }));

// //   return { paths, fallback: true }; // Enable fallback for new products
// // };


// // export const getStaticProps: GetStaticProps = async ({ params }) => {
// //   const { slug } = params!; // Extract slug
// //   const product = await client.fetch(
// //     `*[_type == "products" && slug.current == $slug][0]`,
// //     { slug }
// //   );

// //   if (!product) {
// //     return { notFound: true }; // Return 404 if no product is found
// //   }

// //   return {
// //     props: { product },
// //   };
// // };


// // import { GetStaticPaths, GetStaticProps } from "next";
// // import { client } from "@/sanity/lib/client";
// // import { Product } from "@/app/types/product";
// // import { urlFor } from "@/sanity/lib/image";
// // import Image from "next/image";

// // type ProductPageProps = {
// //   product: Product;
// // };

// // export default function ProductPage({product }: ProductPageProps) {
// //   if (!product) {
// //     return <div>Product not found!</div>;
// //   }

// //   return (
// //     <div className="container mx-auto py-8">
// //       <div className="flex flex-col md:flex-row items-center gap-8">
// //         <Image
// //           src={urlFor(product.image).url()}
// //           alt={product.title || "Product Image"}
// //           width={400}
// //           height={400}
// //           className="rounded-lg shadow-md"
// //         />
// //         <div>
// //           <h1 className="text-3xl font-bold">{product.title}</h1>
// //           <p className="text-gray-600 mt-4">{product.description}</p>
// //           <p className="text-xl text-teal-500 font-semibold mt-6">
// //             ${product.price}
// //           </p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export const getStaticPaths: GetStaticPaths = async () => {
// //   const products: Product[] = await client.fetch(`*[_type == "product"]`);
  
// //   // Ensure 'slug' is a string in the params
// //   const paths = products.map((product) => ({
// //     params: { slug: product.slug.current }, // Use the 'current' field as a string
// //   }));

// //   return { paths, fallback: true }; // Enable fallback for new products
// // };

