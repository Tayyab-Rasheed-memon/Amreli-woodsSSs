import { useState, useEffect } from "react";
import { Product } from "@/app/types/product";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { ArrowLeft, Grid } from "lucide-react";

type ProductDetailsProps = {
  product?: Product; // Optional to prevent runtime crashes
};

export default function ProductDetails({ product }: ProductDetailsProps) {
  const router = useRouter();

  if (!product) {
    return <p style={{ textAlign: "center", fontSize: "1.5rem", color: "#777" }}>Loading product details...</p>;
  }

  const [quantity, setQuantity] = useState<number>(1);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [addedToWishlist, setAddedToWishlist] = useState(false);
  const [showProductDetails, setShowProductDetails] = useState(false);

  const stock = product.stock ?? 10; // Default stock if not present in data

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleAddToWishlist = () => {
    setAddedToWishlist((prev) => !prev);
  };

  const renderStars = (rating: number) => {
    const fullStar = "★";
    const emptyStar = "☆";
    const stars = fullStar.repeat(Math.floor(rating)) + emptyStar.repeat(5 - Math.floor(rating));
    return stars.split("").map((star, index) => (
      <motion.span
        key={index}
        style={{ color: star === "★" ? "#FFD700" : "#ddd", fontSize: "1.5rem" }}
        whileHover={{ scale: 1.2, rotate: 10 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        {star}
      </motion.span>
    ));
  };

  const toggleProductDetails = () => {
    setShowProductDetails((prev) => !prev);
  };

  const productCardStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
    gap: "2rem",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: isMobile ? "1rem" : "2rem",
    borderRadius: "12px",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
    textAlign: isMobile ? "center" : "left",
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem", position: "relative" }}
    >
      <motion.div
        whileHover={{
          scale: 1.1,
          backgroundColor: "#007bff",
          color: "#fff",
          transition: { duration: 0.3 },
        }}
        whileTap={{ scale: 0.95 }}
        onClick={() => router.push("/")}
        style={{
          position: "absolute",
          top: "1rem",
          left: "1rem",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0.5rem 1rem",
          fontSize: "1rem",
          borderRadius: "8px",
          cursor: "pointer",
          backgroundColor: "#f8f9fa",
          color: "#007bff",
          border: "1px solid #ddd",
        }}
      >
        <ArrowLeft size={20} /> Back to Home
      </motion.div>

      <motion.div
        whileHover={{
          scale: 1.1,
          backgroundColor: "#28a745",
          color: "#fff",
          transition: { duration: 0.3 },
        }}
        whileTap={{ scale: 0.95 }}
        onClick={() => router.push("/Producte")}
        style={{
          position: "absolute",
          top: "1rem",
          right: "1rem",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0.5rem 1rem",
          fontSize: "1rem",
          borderRadius: "8px",
          cursor: "pointer",
          backgroundColor: "#f8f9fa",
          color: "#28a745",
          border: "1px solid #ddd",
        }}
      >
        <Grid size={20} /> View All Products
      </motion.div>

      <div style={productCardStyle}>
        {/* Image Section */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          style={{ overflow: "hidden", borderRadius: "12px", width: "100%" }}
        >
          <Image
            src={product.image ? urlFor(product.image).url() : "/default-image.jpg"}
            alt={product.title || "Product Image"}
            width={400}
            height={400}
            style={{ width: "100%", height: "auto", borderRadius: "12px" }}
          />
        </motion.div>

        {/* Product Details */}
        <div style={{ padding: isMobile ? "0" : "1rem" }}>
          <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "#333" }}>{product.title || "Untitled Product"}</h1>
          <div style={{ display: "flex", alignItems: "center", margin: "0.5rem 0" }}>
            {renderStars(product.rating ?? 4)} {/* Dynamic Rating */}
            <span style={{ marginLeft: "0.5rem", fontSize: "1.2rem", color: "#555" }}>
              {(product.rating ?? 4).toFixed(1)} / 5
            </span>
          </div>
          <p style={{ fontSize: "1.5rem", color: "#008080", marginBottom: "0.5rem" }}>
            ${product.price?.toFixed(2) ?? "0.00"}
          </p>
          {product.originalPrice && product.originalPrice > product.price && (
            <p style={{ fontSize: "1rem", color: "#28a745" }}>
              Save ${((product.originalPrice ?? 0) - product.price).toFixed(2)}!
            </p>
          )}
          <p style={{ fontSize: "1.2rem", color: stock === 0 ? "#d9534f" : "#28a745" }}>
            {stock === 0 ? "Out of Stock" : `${stock} Items Available`}
          </p>

          {/* Quantity Controls */}
          {stock > 0 && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                style={{
                  padding: "0.5rem 1rem",
                  fontSize: "1rem",
                  backgroundColor: "#ddd",
                  border: "none",
                  borderRadius: "8px",
                  margin: "0 0.5rem",
                  cursor: "pointer",
                }}
              >
                -
              </motion.button>
              <span style={{ fontSize: "1.25rem", fontWeight: "bold" }}>{quantity}</span>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setQuantity(quantity + 1)}
                style={{
                  padding: "0.5rem 1rem",
                  fontSize: "1rem",
                  backgroundColor: "#ddd",
                  border: "none",
                  borderRadius: "8px",
                  margin: "0 0.5rem",
                  cursor: "pointer",
                }}
              >
                +
              </motion.button>
            </div>
          )}

          <motion.button
            whileHover={{
              scale: 1.1,
              backgroundColor: "#28a745",
              transition: { duration: 0.3 },
            }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            style={{
              padding: "1rem",
              fontSize: "1rem",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              width: "100%",
              maxWidth: "200px",
              marginBottom: "1rem",
              backgroundColor: "#007bff",
            }}
          >
            {addedToCart ? "Added to Cart" : "Add to Cart"}
          </motion.button>

          <motion.button
            whileHover={{
              scale: 1.1,
              color: addedToWishlist ? "#fff" : "#ffc107",
              backgroundColor: addedToWishlist ? "#ffc107" : "#f8f9fa",
              transition: { duration: 0.3 },
            }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToWishlist}
            style={{
              padding: "1rem",
              fontSize: "1rem",
              borderRadius: "8px",
              cursor: "pointer",
              width: "100%",
              maxWidth: "200px",
              backgroundColor: addedToWishlist ? "#ffc107" : "#f8f9fa",
              color: addedToWishlist ? "#fff" : "#007bff",
              border: "1px solid #ddd",
            }}
          >
            {addedToWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
          </motion.button>

          <motion.button
            whileHover={{
              scale: 1.1,
              backgroundColor: "#ffc107",
              color: "#fff",
              transition: { duration: 0.3 },
            }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleProductDetails}
            style={{
              padding: "1rem",
              fontSize: "1rem",
              color: "#007bff",
              border: "1px solid #007bff",
              borderRadius: "8px",
              cursor: "pointer",
              marginTop: "1rem",
            }}
          >
            {showProductDetails ? "Hide Details" : "View More Details"}
          </motion.button>
          {showProductDetails && (
            <div style={{ marginTop: "1rem", fontSize: "1rem", color: "#555" }}>
              <p><strong>Category:</strong> {product.category || "N/A"}</p>
              <p><strong>Description:</strong> {product.description || "No description available."}</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

















// import { useState, useEffect } from "react";
// import { Product } from "@/app/types/product";
// import { urlFor } from "@/sanity/lib/image";
// import Image from "next/image";
// import { motion } from "framer-motion";
// import { useRouter } from "next/router";

// type ProductDetailsProps = {
//   product?: Product; // Optional to prevent runtime crashes
// };

// export default function ProductDetails({ product }: ProductDetailsProps) {
//   const router = useRouter();

//   if (!product) {
//     return <p style={{ textAlign: "center", fontSize: "1.5rem", color: "#777" }}>Loading product details...</p>;
//   }

//   const [quantity, setQuantity] = useState<number>(1);
//   const [isMobile, setIsMobile] = useState<boolean>(false);
//   const [addedToCart, setAddedToCart] = useState(false);
//   const [addedToWishlist, setAddedToWishlist] = useState(false);

//   const stock = product.stock ?? 10; // Default stock if not present in data

//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth <= 768);
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const handleAddToCart = () => {
//     setAddedToCart(true);
//     setTimeout(() => setAddedToCart(false), 2000);
//   };

//   const handleAddToWishlist = () => {
//     setAddedToWishlist((prev) => !prev);
//   };

//   const renderStars = (rating: number) => {
//     const fullStar = "★";
//     const emptyStar = "☆";
//     const stars = fullStar.repeat(Math.floor(rating)) + emptyStar.repeat(5 - Math.floor(rating));
//     return stars.split("").map((star, index) => (
//       <motion.span
//         key={index}
//         style={{ color: star === "★" ? "#FFD700" : "#ddd", fontSize: "1.5rem" }}
//         whileHover={{ scale: 1.2, rotate: 10 }}
//         transition={{ type: "spring", stiffness: 200 }}
//       >
//         {star}
//       </motion.span>
//     ));
//   };

//   const productCardStyle: React.CSSProperties = {
//     display: "grid",
//     gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
//     gap: "2rem",
//     alignItems: "center",
//     backgroundColor: "#f9f9f9",
//     padding: isMobile ? "1rem" : "2rem",
//     borderRadius: "12px",
//     boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
//     textAlign: isMobile ? "center" : "left",
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem", position: "relative" }}
//     >
//       <div style={productCardStyle}>
//         {/* Image Section */}
//         <motion.div
//           whileHover={{ scale: 1.05 }}
//           style={{ overflow: "hidden", borderRadius: "12px", width: "100%" }}
//         >
//           <Image
//             src={product.image ? urlFor(product.image).url() : "/default-image.jpg"}
//             alt={product.title || "Product Image"}
//             width={400}
//             height={400}
//             style={{ width: "100%", height: "auto", borderRadius: "12px" }}
//           />
//         </motion.div>

//         {/* Product Details */}
//         <div style={{ padding: isMobile ? "0" : "1rem" }}>
//           <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "#333" }}>{product.title || "Untitled Product"}</h1>
//           <div style={{ display: "flex", alignItems: "center", margin: "0.5rem 0" }}>
//             {renderStars(product.rating ?? 4)} {/* Dynamic Rating */}
//             <span style={{ marginLeft: "0.5rem", fontSize: "1.2rem", color: "#555" }}>
//               {(product.rating ?? 4).toFixed(1)} / 5
//             </span>
//           </div>
//           <p style={{ fontSize: "1.5rem", color: "#008080", marginBottom: "0.5rem" }}>
//             ${product.price?.toFixed(2) ?? "0.00"}
//           </p>
//           {product.originalPrice && product.originalPrice > product.price && (
//             <p style={{ fontSize: "1rem", color: "#28a745" }}>
//               Save ${((product.originalPrice ?? 0) - product.price).toFixed(2)}!
//             </p>
//           )}
//           <p style={{ fontSize: "1.2rem", color: stock === 0 ? "#d9534f" : "#28a745" }}>
//             {stock === 0 ? "Out of Stock" : `${stock} Items Available`}
//           </p>

//           {/* Quantity Controls */}
//           {stock > 0 && (
//             <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
//               <motion.button
//                 whileTap={{ scale: 0.9 }}
//                 onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                 style={{
//                   padding: "0.5rem 1rem",
//                   fontSize: "1rem",
//                   backgroundColor: "#ddd",
//                   border: "none",
//                   borderRadius: "8px",
//                   margin: "0 0.5rem",
//                   cursor: "pointer",
//                 }}
//               >
//                 -
//               </motion.button>
//               <span style={{ fontSize: "1.25rem", fontWeight: "bold" }}>{quantity}</span>
//               <motion.button
//                 whileTap={{ scale: 0.9 }}
//                 onClick={() => setQuantity(quantity + 1)}
//                 style={{
//                   padding: "0.5rem 1rem",
//                   fontSize: "1rem",
//                   backgroundColor: "#ddd",
//                   border: "none",
//                   borderRadius: "8px",
//                   margin: "0 0.5rem",
//                   cursor: "pointer",
//                 }}
//               >
//                 +
//               </motion.button>
//             </div>
//           )}

//           <motion.button
//             whileHover={{
//               scale: 1.1,
//               backgroundColor: "#28a745",
//               transition: { duration: 0.3 },
//             }}
//             whileTap={{ scale: 0.95 }}
//             onClick={handleAddToCart}
//             style={{
//               padding: "1rem",
//               fontSize: "1rem",
//               color: "#fff",
//               border: "none",
//               borderRadius: "8px",
//               cursor: "pointer",
//               width: "100%",
//               maxWidth: "200px",
//               marginBottom: "1rem",
//               backgroundColor: "#007bff",
//             }}
//           >
//             {addedToCart ? "Added to Cart" : "Add to Cart"}
//           </motion.button>

//           <motion.button
//             whileHover={{
//               scale: 1.1,
//               color: addedToWishlist ? "#fff" : "#ffc107",
//               backgroundColor: addedToWishlist ? "#ffc107" : "#f8f9fa",
//               transition: { duration: 0.3 },
//             }}
//             whileTap={{ scale: 0.95 }}
//             onClick={handleAddToWishlist}
//             style={{
//               padding: "1rem",
//               fontSize: "1rem",
//               borderRadius: "8px",
//               cursor: "pointer",
//               width: "100%",
//               maxWidth: "200px",
//               backgroundColor: addedToWishlist ? "#ffc107" : "#f8f9fa",
//               color: addedToWishlist ? "#fff" : "#007bff",
//               border: "1px solid #ddd",
//             }}
//           >
//             {addedToWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
//           </motion.button>
//         </div>
//       </div>

//       {/* Back to Home Button */}
//       <motion.button
//         whileHover={{
//           scale: 1.1,
//           backgroundColor: "#007bff",
//           color: "#fff",
//           transition: { duration: 0.3 },
//         }}
//         whileTap={{ scale: 0.95 }}
//         onClick={() => router.push("/")}
//         style={{
//           position: "absolute",
//           bottom: "2rem",
//           left: "50%",
//           transform: "translateX(-50%)",
//           padding: "1rem",
//           fontSize: "1rem",
//           borderRadius: "8px",
//           cursor: "pointer",
//           backgroundColor: "#f8f9fa",
//           color: "#007bff",
//           border: "1px solid #ddd",
//         }}
//       >
//         Back to Home
//       </motion.button>
//     </motion.div>
//   );
// }















// import { useState, useEffect } from "react";
// import { Product } from "@/app/types/product";
// import { urlFor } from "@/sanity/lib/image";
// import Image from "next/image";
// import { motion } from "framer-motion";
// import { useRouter } from "next/router";

// type ProductDetailsProps = {
//   product?: Product; // Optional to prevent runtime crashes
// };

// export default function ProductDetails({ product }: ProductDetailsProps) {
//   const router = useRouter();

//   if (!product) {
//     return <p style={{ textAlign: "center", fontSize: "1.5rem", color: "#777" }}>Loading product details...</p>;
//   }

//   const [quantity, setQuantity] = useState<number>(1);
//   const [isMobile, setIsMobile] = useState<boolean>(false);
//   const [addedToCart, setAddedToCart] = useState(false);
//   const [addedToWishlist, setAddedToWishlist] = useState(false);

//   const stock = product.stock ?? 10; // Default stock if not present in data

//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth <= 768);
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const handleAddToCart = () => {
//     setAddedToCart(true);
//     setTimeout(() => setAddedToCart(false), 2000);
//   };

//   const handleAddToWishlist = () => {
//     setAddedToWishlist((prev) => !prev);
//   };

//   const renderStars = (rating: number) => {
//     const fullStar = "★";
//     const emptyStar = "☆";
//     const stars = fullStar.repeat(Math.floor(rating)) + emptyStar.repeat(5 - Math.floor(rating));
//     return stars.split("").map((star, index) => (
//       <motion.span
//         key={index}
//         style={{ color: star === "★" ? "#FFD700" : "#ddd", fontSize: "1.5rem" }}
//         whileHover={{ scale: 1.2, rotate: 10 }}
//         transition={{ type: "spring", stiffness: 200 }}
//       >
//         {star}
//       </motion.span>
//     ));
//   };

//   const productCardStyle: React.CSSProperties = {
//     display: "grid",
//     gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
//     gap: "2rem",
//     alignItems: "center",
//     backgroundColor: "#f9f9f9",
//     padding: isMobile ? "1rem" : "2rem",
//     borderRadius: "12px",
//     boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
//     textAlign: isMobile ? "center" : "left",
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem", position: "relative" }}
//     >
//       <div style={productCardStyle}>
//         {/* Image Section */}
//         <motion.div
//           whileHover={{ scale: 1.05 }}
//           style={{ overflow: "hidden", borderRadius: "12px", width: "100%" }}
//         >
//           <Image
//             src={product.image ? urlFor(product.image).url() : "/default-image.jpg"}
//             alt={product.title || "Product Image"}
//             width={400}
//             height={400}
//             style={{ width: "100%", height: "auto", borderRadius: "12px" }}
//           />
//         </motion.div>

//         {/* Product Details */}
//         <div style={{ padding: isMobile ? "0" : "1rem" }}>
//           <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "#333" }}>{product.title || "Untitled Product"}</h1>
//           <div style={{ display: "flex", alignItems: "center", margin: "0.5rem 0" }}>
//             {renderStars(product.rating ?? 4)} {/* Dynamic Rating */}
//             <span style={{ marginLeft: "0.5rem", fontSize: "1.2rem", color: "#555" }}>
//               {(product.rating ?? 4).toFixed(1)} / 5
//             </span>
//           </div>
//           <p style={{ fontSize: "1.5rem", color: "#008080", marginBottom: "0.5rem" }}>
//             ${product.price?.toFixed(2) ?? "0.00"}
//           </p>
//           {product.originalPrice && product.originalPrice > product.price && (
//             <p style={{ fontSize: "1rem", color: "#28a745" }}>
//               Save ${((product.originalPrice ?? 0) - product.price).toFixed(2)}!
//             </p>
//           )}
//           <p style={{ fontSize: "1.2rem", color: stock === 0 ? "#d9534f" : "#28a745" }}>
//             {stock === 0 ? "Out of Stock" : `${stock} Items Available`}
//           </p>

//           {/* Quantity Controls */}
//           {stock > 0 && (
//             <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
//               <motion.button
//                 whileTap={{ scale: 0.9 }}
//                 onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                 style={{
//                   padding: "0.5rem 1rem",
//                   fontSize: "1rem",
//                   backgroundColor: "#ddd",
//                   border: "none",
//                   borderRadius: "8px",
//                   margin: "0 0.5rem",
//                   cursor: "pointer",
//                 }}
//               >
//                 -
//               </motion.button>
//               <span style={{ fontSize: "1.25rem", fontWeight: "bold" }}>{quantity}</span>
//               <motion.button
//                 whileTap={{ scale: 0.9 }}
//                 onClick={() => setQuantity(quantity + 1)}
//                 style={{
//                   padding: "0.5rem 1rem",
//                   fontSize: "1rem",
//                   backgroundColor: "#ddd",
//                   border: "none",
//                   borderRadius: "8px",
//                   margin: "0 0.5rem",
//                   cursor: "pointer",
//                 }}
//               >
//                 +
//               </motion.button>
//             </div>
//           )}

//           <motion.button
//             whileHover={{
//               scale: 1.1,
//               backgroundColor: "#28a745",
//               transition: { duration: 0.3 },
//             }}
//             whileTap={{ scale: 0.95 }}
//             onClick={handleAddToCart}
//             style={{
//               padding: "1rem",
//               fontSize: "1rem",
//               color: "#fff",
//               border: "none",
//               borderRadius: "8px",
//               cursor: "pointer",
//               width: "100%",
//               maxWidth: "200px",
//               marginBottom: "1rem",
//               backgroundColor: "#007bff",
//             }}
//           >
//             {addedToCart ? "Added to Cart" : "Add to Cart"}
//           </motion.button>

//           <motion.button
//             whileHover={{
//               scale: 1.1,
//               color: addedToWishlist ? "#fff" : "#ffc107",
//               backgroundColor: addedToWishlist ? "#ffc107" : "#f8f9fa",
//               transition: { duration: 0.3 },
//             }}
//             whileTap={{ scale: 0.95 }}
//             onClick={handleAddToWishlist}
//             style={{
//               padding: "1rem",
//               fontSize: "1rem",
//               borderRadius: "8px",
//               cursor: "pointer",
//               width: "100%",
//               maxWidth: "200px",
//               backgroundColor: addedToWishlist ? "#ffc107" : "#f8f9fa",
//               color: addedToWishlist ? "#fff" : "#007bff",
//               border: "1px solid #ddd",
//             }}
//           >
//             {addedToWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
//           </motion.button>
//         </div>
//       </div>

//       {/* Back to Home Button */}
//       <motion.button
//         whileHover={{
//           scale: 1.1,
//           backgroundColor: "#007bff",
//           color: "#fff",
//           transition: { duration: 0.3 },
//         }}
//         whileTap={{ scale: 0.95 }}
//         onClick={() => router.push("/")}
//         style={{
//           position: "absolute",
//           bottom: "2rem",
//           left: "2rem",
//           padding: "1rem",
//           fontSize: "1rem",
//           borderRadius: "8px",
//           cursor: "pointer",
//           backgroundColor: "#f8f9fa",
//           color: "#007bff",
//           border: "1px solid #ddd",
//         }}
//       >
//         Back to Home
//       </motion.button>
//     </motion.div>
//   );
// }

// import { useState, useEffect } from "react";
// import { Product } from "@/app/types/product";
// import { urlFor } from "@/sanity/lib/image";
// import Image from "next/image";
// import { motion } from "framer-motion";

// type ProductDetailsProps = {
//   product?: Product; // Optional to prevent runtime crashes
// };

// export default function ProductDetails({ product }: ProductDetailsProps) {
//   if (!product) {
//     return <p style={{ textAlign: "center", fontSize: "1.5rem", color: "#777" }}>Loading product details...</p>;
//   }

//   const [quantity, setQuantity] = useState<number>(1);
//   const [isMobile, setIsMobile] = useState<boolean>(false);
//   const [addedToCart, setAddedToCart] = useState(false);
//   const [addedToWishlist, setAddedToWishlist] = useState(false);

//   const stock = product.stock ?? 10; // Default stock if not present in data

//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth <= 768);
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const handleAddToCart = () => {
//     setAddedToCart(true);
//     setTimeout(() => setAddedToCart(false), 2000);
//   };

//   const handleAddToWishlist = () => {
//     setAddedToWishlist((prev) => !prev);
//   };

//   const renderStars = (rating: number) => {
//     const fullStar = "★";
//     const emptyStar = "☆";
//     const stars = fullStar.repeat(Math.floor(rating)) + emptyStar.repeat(5 - Math.floor(rating));
//     return stars.split("").map((star, index) => (
//       <motion.span
//         key={index}
//         style={{ color: star === "★" ? "#FFD700" : "#ddd", fontSize: "1.5rem" }}
//         whileHover={{ scale: 1.2, rotate: 10 }}
//         transition={{ type: "spring", stiffness: 200 }}
//       >
//         {star}
//       </motion.span>
//     ));
//   };

//   const productCardStyle: React.CSSProperties = {
//     display: "grid",
//     gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
//     gap: "2rem",
//     alignItems: "center",
//     backgroundColor: "#f9f9f9",
//     padding: isMobile ? "1rem" : "2rem",
//     borderRadius: "12px",
//     boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
//     textAlign: isMobile ? "center" : "left",
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}
//     >
//       <div style={productCardStyle}>
//         {/* Image Section */}
//         <motion.div
//           whileHover={{ scale: 1.05 }}
//           style={{ overflow: "hidden", borderRadius: "12px", width: "100%" }}
//         >
//           <Image
//             src={product.image ? urlFor(product.image).url() : "/default-image.jpg"}
//             alt={product.title || "Product Image"}
//             width={400}
//             height={400}
//             style={{ width: "100%", height: "auto", borderRadius: "12px" }}
//           />
//         </motion.div>

//         {/* Product Details */}
//         <div style={{ padding: isMobile ? "0" : "1rem" }}>
//           <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "#333" }}>{product.title || "Untitled Product"}</h1>
//           <div style={{ display: "flex", alignItems: "center", margin: "0.5rem 0" }}>
//             {renderStars(product.rating ?? 4)} {/* Dynamic Rating */}
//             <span style={{ marginLeft: "0.5rem", fontSize: "1.2rem", color: "#555" }}>
//               {(product.rating ?? 4).toFixed(1)} / 5
//             </span>
//           </div>
//           <p style={{ fontSize: "1.5rem", color: "#008080", marginBottom: "0.5rem" }}>
//             ${product.price?.toFixed(2) ?? "0.00"}
//           </p>
//           {product.originalPrice && product.originalPrice > product.price && (
//             <p style={{ fontSize: "1rem", color: "#28a745" }}>
//               Save ${((product.originalPrice ?? 0) - product.price).toFixed(2)}!
//             </p>
//           )}
//           <p style={{ fontSize: "1.2rem", color: stock === 0 ? "#d9534f" : "#28a745" }}>
//             {stock === 0 ? "Out of Stock" : `${stock} Items Available`}
//           </p>

//           {/* Quantity Controls */}
//           {stock > 0 && (
//             <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
//               <motion.button
//                 whileTap={{ scale: 0.9 }}
//                 onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                 style={{
//                   padding: "0.5rem 1rem",
//                   fontSize: "1rem",
//                   backgroundColor: "#ddd",
//                   border: "none",
//                   borderRadius: "8px",
//                   margin: "0 0.5rem",
//                   cursor: "pointer",
//                 }}
//               >
//                 -
//               </motion.button>
//               <span style={{ fontSize: "1.25rem", fontWeight: "bold" }}>{quantity}</span>
//               <motion.button
//                 whileTap={{ scale: 0.9 }}
//                 onClick={() => setQuantity(quantity + 1)}
//                 style={{
//                   padding: "0.5rem 1rem",
//                   fontSize: "1rem",
//                   backgroundColor: "#ddd",
//                   border: "none",
//                   borderRadius: "8px",
//                   margin: "0 0.5rem",
//                   cursor: "pointer",
//                 }}
//               >
//                 +
//               </motion.button>
//             </div>
//           )}

//           <motion.button
//             whileHover={{
//               scale: 1.1,
//               backgroundColor: "#28a745",
//               transition: { duration: 0.3 },
//             }}
//             whileTap={{ scale: 0.95 }}
//             onClick={handleAddToCart}
//             style={{
//               padding: "1rem",
//               fontSize: "1rem",
//               color: "#fff",
//               border: "none",
//               borderRadius: "8px",
//               cursor: "pointer",
//               width: "100%",
//               maxWidth: "200px",
//               marginBottom: "1rem",
//               backgroundColor: "#007bff",
//             }}
//           >
//             {addedToCart ? "Added to Cart" : "Add to Cart"}
//           </motion.button>

//           <motion.button
//             whileHover={{
//               scale: 1.1,
//               color: addedToWishlist ? "#fff" : "#ffc107",
//               backgroundColor: addedToWishlist ? "#ffc107" : "#f8f9fa",
//               transition: { duration: 0.3 },
//             }}
//             whileTap={{ scale: 0.95 }}
//             onClick={handleAddToWishlist}
//             style={{
//               padding: "1rem",
//               fontSize: "1rem",
//               borderRadius: "8px",
//               cursor: "pointer",
//               width: "100%",
//               maxWidth: "200px",
//               backgroundColor: addedToWishlist ? "#ffc107" : "#f8f9fa",
//               color: addedToWishlist ? "#fff" : "#007bff",
//               border: "1px solid #ddd",
//             }}
//           >
//             {addedToWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
//           </motion.button>
//         </div>
//       </div>
//     </motion.div>
//   );
// }

// import { useState, useEffect } from "react";
// import { Product } from "@/app/types/product";
// import { urlFor } from "@/sanity/lib/image";
// import Image from "next/image";
// import { motion } from "framer-motion";

// type ProductDetailsProps = {
//   product?: Product; // `product` is optional to prevent runtime crashes
// };

// export default function ProductDetails({ product }: ProductDetailsProps) {
//   if (!product) {
//     return <p style={{ textAlign: "center", fontSize: "1.5rem", color: "#777" }}>Loading product details...</p>;
//   }

//   const [quantity, setQuantity] = useState<number>(1);
//   const [isMobile, setIsMobile] = useState<boolean>(false);

//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth <= 768);
//     handleResize(); // Set initial value
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const productCardStyle: React.CSSProperties = {
//     display: "grid",
//     gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
//     gap: "2rem",
//     alignItems: "center",
//     backgroundColor: "#f9f9f9",
//     padding: isMobile ? "1rem" : "2rem",
//     borderRadius: "12px",
//     boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
//     textAlign: isMobile ? "center" : "left",
//   };

//   const imageStyle: React.CSSProperties = {
//     overflow: "hidden",
//     borderRadius: "12px",
//     boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
//     width: "100%",
//   };

//   const productDetailsStyle: React.CSSProperties = {
//     padding: isMobile ? "0" : "1rem",
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}
//     >
//       <div style={productCardStyle}>
//         {/* Image Section */}
//         <div style={imageStyle}>
//           <Image
//             src={product.image ? urlFor(product.image).url() : "/default-image.jpg"}
//             alt={product.title || "Product Image"}
//             width={400}
//             height={400}
//             style={{ width: "100%", height: "auto", borderRadius: "12px" }}
//           />
//         </div>

//         {/* Product Details */}
//         <div style={productDetailsStyle}>
//           <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "#333" }}>{product.title || "Untitled Product"}</h1>
//           <p style={{ fontSize: "1.5rem", color: "#008080", marginBottom: "0.5rem" }}>${product.price ?? 0}</p>
//           <p style={{ fontSize: "1.2rem", color: product.stock === 0 ? "#d9534f" : "#28a745" }}>
//             {product.stock === 0 ? "Out of Stock" : "In Stock"}
//           </p>

//           {/* Quantity Controls */}
//           <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
//             <button
//               onClick={() => setQuantity(Math.max(1, quantity - 1))}
//               style={{ padding: "0.5rem 1rem", fontSize: "1rem", margin: "0 0.5rem" }}
//             >
//               -
//             </button>
//             <span style={{ fontSize: "1.25rem", fontWeight: "bold" }}>{quantity}</span>
//             <button
//               onClick={() => setQuantity(quantity + 1)}
//               style={{ padding: "0.5rem 1rem", fontSize: "1rem", margin: "0 0.5rem" }}
//             >
//               +
//             </button>
//           </div>

//           <button
//             style={{
//               padding: "1rem",
//               fontSize: "1rem",
//               backgroundColor: "#007bff",
//               color: "#fff",
//               border: "none",
//               borderRadius: "8px",
//               cursor: "pointer",
//               width: "100%",
//               maxWidth: "200px",
//             }}
//           >
//             Add to Cart
//           </button>
//         </div>
//       </div>
//     </motion.div>
//   );
// }











// import { useState } from "react";
// import { Product } from "@/app/types/product";
// import { urlFor } from "@/sanity/lib/image";
// import Image from "next/image";
// import { motion } from "framer-motion";

// type ProductDetailsProps = {
//   product?: Product; // `product` is optional to prevent runtime crashes
// };

// export default function ProductDetails({ product }: ProductDetailsProps) {
//   if (!product) {
//     return <p style={styles.loadingText}>Loading product details...</p>;
//   }

//   const [quantity, setQuantity] = useState<number>(1);
//   const [addedToCart, setAddedToCart] = useState<boolean>(false);
//   const [addedToWishlist, setAddedToWishlist] = useState<boolean>(false);

//   const handleAddToCart = () => {
//     setAddedToCart(true);
//     setTimeout(() => setAddedToCart(false), 1500);
//   };

//   const handleAddToWishlist = () => {
//     setAddedToWishlist(!addedToWishlist);
//   };

//   // Use optional chaining and nullish coalescing for safety
//   const originalPrice = product.originalPrice ?? product.price ?? 0;
//   const price = product.price ?? 0;
//   const savings = originalPrice > price ? originalPrice - price : 0;
//   const isOutOfStock = product.stock === 0;

//   const renderStars = (rating: number) => {
//     const fullStar = "⭐";
//     const emptyStar = "☆";
//     const stars = fullStar.repeat(Math.floor(rating)) + emptyStar.repeat(5 - Math.floor(rating));
//     return stars.split("").map((star, index) => (
//       <span key={index} style={styles.ratingStar}>
//         {star}
//       </span>
//     ));
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       style={styles.container}
//     >
//       <motion.div
//         whileHover={{ scale: 1.02 }}
//         style={styles.productCard}
//         transition={{ duration: 0.3 }}
//       >
//         {/* Image Section */}
//         <motion.div whileHover={{ scale: 1.05 }} style={styles.productImage}>
//           <Image
//             src={product.image ? urlFor(product.image).url() : "/default-image.jpg"}
//             alt={product.title || "Product Image"}
//             width={400}
//             height={400}
//             style={styles.image}
//           />
//         </motion.div>

//         {/* Product Details */}
//         <div style={styles.productDetails}>
//           <h1 style={styles.productTitle}>{product.title || "Untitled Product"}</h1>

//           {/* Rating Section */}
//           <div style={styles.ratingContainer}>
//             {renderStars(product.rating ?? 4.5)} {/* Default rating is 4.5 */}
//             <span style={styles.ratingText}>
//               {(product.rating ?? 4.5).toFixed(1)} / 5
//             </span>
//           </div>

//           <p style={styles.productPrice}>
//             {originalPrice > price && (
//               <span style={styles.originalPrice}>${originalPrice.toFixed(2)}</span>
//             )}
//             <span>${price.toFixed(2)}</span>
//           </p>

//           {savings > 0 && <p style={styles.savings}>Save ${savings.toFixed(2)}!</p>}

//           <p style={styles.stockStatus}>{isOutOfStock ? "Out of Stock" : "In Stock"}</p>

//           {/* Quantity Controls */}
//           <div style={styles.quantityContainer}>
//             <motion.button
//               whileTap={{ scale: 0.9 }}
//               style={styles.quantityButton}
//               onClick={() => setQuantity(Math.max(1, quantity - 1))}
//               disabled={isOutOfStock}
//             >
//               -
//             </motion.button>
//             <span style={styles.quantityText}>{quantity}</span>
//             <motion.button
//               whileTap={{ scale: 0.9 }}
//               style={styles.quantityButton}
//               onClick={() => setQuantity(quantity + 1)}
//               disabled={isOutOfStock}
//             >
//               +
//             </motion.button>
//           </div>

//           <motion.button
//             whileTap={{ scale: 0.95 }}
//             style={{
//               ...styles.addToCartBtn,
//               ...(addedToCart ? styles.addToCartBtnClicked : {}),
//             }}
//             onClick={handleAddToCart}
//             disabled={isOutOfStock}
//           >
//             {addedToCart ? "Added!" : "Add to Cart"}
//           </motion.button>

//           <motion.button
//             whileTap={{ scale: 0.95 }}
//             style={{
//               ...styles.wishlistButton,
//               ...(addedToWishlist ? styles.wishlistButtonActive : {}),
//             }}
//             onClick={handleAddToWishlist}
//           >
//             {addedToWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
//           </motion.button>
//         </div>
//       </motion.div>

//       {addedToCart && (
//         <motion.p
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.3 }}
//           style={styles.successMessage}
//         >
//           🎉 Added to cart successfully!
//         </motion.p>
//       )}
//     </motion.div>
//   );
// }

// // Styles (TypeScript)
// const styles: { [key: string]: React.CSSProperties } = {
//   container: {
//     maxWidth: "1200px",
//     margin: "0 auto",
//     padding: "2rem",
//     textAlign: "center",
//   },
//   productCard: {
//     display: "grid",
//     gridTemplateColumns: "1fr 1fr",
//     gap: "2rem",
//     alignItems: "center",
//     backgroundColor: "#f9f9f9",
//     padding: "2rem",
//     borderRadius: "12px",
//     boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
//   },
//   productImage: {
//     overflow: "hidden",
//     borderRadius: "12px",
//     boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
//   },
//   image: {
//     borderRadius: "12px",
//   },
//   productDetails: {
//     textAlign: "left",
//   },
//   productTitle: {
//     fontSize: "2rem",
//     fontWeight: "bold",
//     color: "#333",
//   },
//   ratingContainer: {
//     display: "flex",
//     alignItems: "center",
//     marginBottom: "1rem",
//   },
//   ratingStar: {
//     fontSize: "1.5rem",
//     color: "#FFD700", // Gold color for stars
//     marginRight: "4px",
//   },
//   ratingText: {
//     marginLeft: "8px",
//     fontSize: "1rem",
//     color: "#555",
//   },
//   productPrice: {
//     fontSize: "1.5rem",
//     color: "#008080",
//     marginBottom: "0.5rem",
//   },
//   originalPrice: {
//     textDecoration: "line-through",
//     color: "#a0a0a0",
//     marginRight: "0.5rem",
//   },
//   savings: {
//     fontSize: "1rem",
//     color: "#28a745",
//     marginBottom: "1rem",
//   },
//   stockStatus: {
//     fontSize: "1.2rem",
//     color: "#d9534f",
//     marginBottom: "1rem",
//   },
//   quantityContainer: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: "1rem",
//   },
//   quantityButton: {
//     backgroundColor: "#007bff",
//     color: "#fff",
//     border: "none",
//     fontSize: "1.25rem",
//     width: "40px",
//     height: "40px",
//     borderRadius: "8px",
//     cursor: "pointer",
//     margin: "0 10px",
//   },
//   quantityText: {
//     fontSize: "1.25rem",
//     fontWeight: "bold",
//   },
//   addToCartBtn: {
//     width: "100%",
//     maxWidth: "200px",
//     padding: "1rem",
//     backgroundColor: "#007bff",
//     color: "white",
//     fontSize: "1rem",
//     fontWeight: "bold",
//     borderRadius: "8px",
//     cursor: "pointer",
//     marginBottom: "1rem",
//   },
//   addToCartBtnClicked: {
//     backgroundColor: "#28a745",
//   },
//   wishlistButton: {
//     width: "100%",
//     maxWidth: "200px",
//     padding: "1rem",
//     backgroundColor: "#f8f9fa",
//     color: "#007bff",
//     fontSize: "1rem",
//     fontWeight: "bold",
//     borderRadius: "8px",
//     cursor: "pointer",
//     marginBottom: "1rem",
//   },
//   wishlistButtonActive: {
//     backgroundColor: "#ffc107",
//     color: "#fff",
//   },
//   successMessage: {
//     fontSize: "1.25rem",
//     color: "#28a745",
//     fontWeight: "bold",
//     marginTop: "1rem",
//   },
//   loadingText: {
//     textAlign: "center",
//     fontSize: "1.5rem",
//     color: "#777",
//   },
// };



// import { useState } from "react";
// import { Product } from "@/app/types/product";
// import { urlFor } from "@/sanity/lib/image";
// import Image from "next/image";
// import { motion } from "framer-motion";

// type ProductDetailsProps = {
//   product: Product;
// };

// export default function ProductDetails({ product }: ProductDetailsProps) {
//   const [quantity, setQuantity] = useState(1);
//   const [addedToCart, setAddedToCart] = useState(false);
//   const [addedToWishlist, setAddedToWishlist] = useState(false);

//   const handleAddToCart = () => {
//     setAddedToCart(true);
//     setTimeout(() => setAddedToCart(false), 1500);
//   };

//   const handleAddToWishlist = () => {
//     setAddedToWishlist(!addedToWishlist);
//   };

//   const savings =
//     product.originalPrice && product.originalPrice > product.price
//       ? product.originalPrice - product.price
//       : 0;

//   const isOutOfStock = product.stock === 0;

//   // Utility to render rating stars
//   const renderStars = (rating: number) => {
//     const fullStar = "⭐";
//     const emptyStar = "☆";
//     const stars = fullStar.repeat(Math.floor(rating)) + emptyStar.repeat(5 - Math.floor(rating));
//     return stars.split("").map((star, index) => (
//       <span key={index} style={styles.ratingStar}>
//         {star}
//       </span>
//     ));
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       style={styles.container}
//     >
//       <motion.div
//         whileHover={{ scale: 1.02 }}
//         style={styles.productCard}
//         transition={{ duration: 0.3 }}
//       >
//         <motion.div whileHover={{ scale: 1.05 }} style={styles.productImage}>
//           <Image
//             src={urlFor(product.image).url() || "/default-image.jpg"}
//             alt={product.title || "Product Image"}
//             width={400}
//             height={400}
//             style={styles.image}
//           />
//         </motion.div>

//         <div style={styles.productDetails}>
//           <h1 style={styles.productTitle}>{product.title || "Untitled Product"}</h1>

//           {/* Product Rating */}
//           <div style={styles.ratingContainer}>
//             {renderStars(product.rating ?? 4.5)} {/* Default rating is 4.5 */}
//             <span style={styles.ratingText}>
//               {(product.rating ?? 4.5).toFixed(1)} / 5
//             </span>
//           </div>

//           <p style={styles.productPrice}>
//             {product.originalPrice && product.originalPrice > product.price && (
//               <span style={styles.originalPrice}>
//                 ${product.originalPrice.toFixed(2)}
//               </span>
//             )}
//             <span>${product.price.toFixed(2)}</span>
//           </p>

//           {savings > 0 && (
//             <motion.p
//               style={styles.savings}
//               initial={{ y: -10, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ duration: 0.3 }}
//             >
//               Save <span style={styles.savingsAmount}>${savings.toFixed(2)}</span>!
//             </motion.p>
//           )}

//           <p style={styles.productDescription}>
//             {product.description || "No description available."}
//           </p>

//           <p style={styles.stockStatus}>
//             {isOutOfStock ? "Out of Stock" : "In Stock"}
//           </p>

//           <div style={styles.quantityContainer}>
//             <motion.button
//               whileTap={{ scale: 0.9 }}
//               style={styles.quantityButton}
//               onClick={() => setQuantity(Math.max(1, quantity - 1))}
//               disabled={isOutOfStock}
//             >
//               -
//             </motion.button>
//             <span style={styles.quantityText}>{quantity}</span>
//             <motion.button
//               whileTap={{ scale: 0.9 }}
//               style={styles.quantityButton}
//               onClick={() => setQuantity(quantity + 1)}
//               disabled={isOutOfStock}
//             >
//               +
//             </motion.button>
//           </div>

//           <motion.button
//             whileTap={{ scale: 0.95 }}
//             style={{
//               ...styles.addToCartBtn,
//               ...(addedToCart ? styles.addToCartBtnClicked : {}),
//             }}
//             onClick={handleAddToCart}
//             disabled={isOutOfStock}
//           >
//             {addedToCart ? "Added!" : "Add to Cart"}
//           </motion.button>

//           <motion.button
//             whileTap={{ scale: 0.95 }}
//             style={{
//               ...styles.wishlistButton,
//               ...(addedToWishlist ? styles.wishlistButtonActive : {}),
//             }}
//             onClick={handleAddToWishlist}
//           >
//             {addedToWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
//           </motion.button>
//         </div>
//       </motion.div>

//       {addedToCart && (
//         <motion.p
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.3 }}
//           style={styles.successMessage}
//         >
//           🎉 Added to cart successfully!
//         </motion.p>
//       )}
//     </motion.div>
//   );
// }

// const styles: { [key: string]: React.CSSProperties } = {
//   container: {
//     maxWidth: "1200px",
//     margin: "0 auto",
//     padding: "2rem",
//     textAlign: "center",
//   },
//   productCard: {
//     display: "grid",
//     gridTemplateColumns: "1fr 1fr",
//     gap: "2rem",
//     alignItems: "center",
//     backgroundColor: "#f9f9f9",
//     padding: "2rem",
//     borderRadius: "12px",
//     boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
//   },
//   productImage: {
//     overflow: "hidden",
//     borderRadius: "12px",
//     boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
//   },
//   image: {
//     borderRadius: "12px",
//   },
//   productDetails: {
//     textAlign: "left",
//   },
//   productTitle: {
//     fontSize: "2rem",
//     fontWeight: "bold",
//     color: "#333",
//   },
//   ratingContainer: {
//     display: "flex",
//     alignItems: "center",
//     marginBottom: "1rem",
//   },
//   ratingStar: {
//     fontSize: "1.5rem",
//     color: "#FFD700", // Gold color for stars
//     marginRight: "4px",
//   },
//   ratingText: {
//     marginLeft: "8px",
//     fontSize: "1rem",
//     color: "#555",
//   },
//   productPrice: {
//     fontSize: "1.5rem",
//     color: "#008080",
//     marginBottom: "0.5rem",
//   },
//   originalPrice: {
//     textDecoration: "line-through",
//     color: "#a0a0a0",
//     marginRight: "0.5rem",
//   },
//   savings: {
//     fontSize: "1rem",
//     color: "#28a745",
//     marginBottom: "1rem",
//   },
//   productDescription: {
//     fontSize: "1rem",
//     color: "#555",
//     marginBottom: "1.5rem",
//   },
//   stockStatus: {
//     fontSize: "1.2rem",
//     color: "#d9534f",
//     marginBottom: "1rem",
//   },
//   quantityContainer: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: "1rem",
//   },
//   quantityButton: {
//     backgroundColor: "#007bff",
//     color: "#fff",
//     border: "none",
//     fontSize: "1.25rem",
//     width: "40px",
//     height: "40px",
//     borderRadius: "8px",
//     cursor: "pointer",
//     margin: "0 10px",
//   },
//   quantityText: {
//     fontSize: "1.25rem",
//     fontWeight: "bold",
//   },
//   addToCartBtn: {
//     width: "100%",
//     maxWidth: "200px",
//     padding: "1rem",
//     backgroundColor: "#007bff",
//     color: "white",
//     fontSize: "1rem",
//     fontWeight: "bold",
//     borderRadius: "8px",
//     cursor: "pointer",
//     marginBottom: "1rem",
//   },
//   addToCartBtnClicked: {
//     backgroundColor: "#28a745",
//   },
//   wishlistButton: {
//     width: "100%",
//     maxWidth: "200px",
//     padding: "1rem",
//     backgroundColor: "#f8f9fa",
//     color: "#007bff",
//     fontSize: "1rem",
//     fontWeight: "bold",
//     borderRadius: "8px",
//     cursor: "pointer",
//     marginBottom: "1rem",
//   },
//   wishlistButtonActive: {
//     backgroundColor: "#ffc107",
//     color: "#fff",
//   },
//   successMessage: {
//     fontSize: "1.25rem",
//     color: "#28a745",
//     fontWeight: "bold",
//     marginTop: "1rem",
//   },
// };
 




// import { useState } from "react";
// import { Product } from "@/app/types/product";
// import { urlFor } from "@/sanity/lib/image";
// import Image from "next/image";
// import { motion } from "framer-motion";

// type ProductDetailsProps = {
//   product: Product;
// };

// export default function ProductDetails({ product }: ProductDetailsProps) {
//   const [quantity, setQuantity] = useState(1);
//   const [addedToCart, setAddedToCart] = useState(false);
//   const [addedToWishlist, setAddedToWishlist] = useState(false);

//   const handleAddToCart = () => {
//     setAddedToCart(true);
//     setTimeout(() => setAddedToCart(false), 1500);
//   };

//   const handleAddToWishlist = () => {
//     setAddedToWishlist(!addedToWishlist);
//   };

//   const savings =
//     product.originalPrice && product.originalPrice > product.price
//       ? product.originalPrice - product.price
//       : 0;

//   const isOutOfStock = product.stock === 0;

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       style={styles.container}
//     >
//       <motion.div
//         whileHover={{ scale: 1.02 }}
//         style={styles.productCard}
//         transition={{ duration: 0.3 }}
//       >
//         <motion.div
//           whileHover={{ scale: 1.05 }}
//           style={styles.productImage}
//         >
//           <Image
//             src={urlFor(product.image).url() || "/default-image.jpg"}
//             alt={product.title || "Product Image"}
//             width={400}
//             height={400}
//             style={styles.image}
//           />
//         </motion.div>

//         <div style={styles.productDetails}>
//           <h1 style={styles.productTitle}>
//             {product.title || "Untitled Product"}
//           </h1>

//           <p style={styles.productPrice}>
//             {product.originalPrice && product.originalPrice > product.price && (
//               <span style={styles.originalPrice}>
//                 ${product.originalPrice.toFixed(2)}
//               </span>
//             )}
//             <span>${product.price.toFixed(2)}</span>
//           </p>

//           {savings > 0 && (
//             <motion.p
//               style={styles.savings}
//               initial={{ y: -10, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ duration: 0.3 }}
//             >
//               Save <span style={styles.savingsAmount}>${savings.toFixed(2)}</span>!
//             </motion.p>
//           )}

//           <p style={styles.productDescription}>
//             {product.description || "No description available."}
//           </p>

//           <p style={styles.stockStatus}>
//             {isOutOfStock ? "Out of Stock" : "In Stock"}
//           </p>

//           <div style={styles.quantityContainer}>
//             <motion.button
//               whileTap={{ scale: 0.9 }}
//               style={styles.quantityButton}
//               onClick={() => setQuantity(Math.max(1, quantity - 1))}
//               disabled={isOutOfStock}
//             >
//               -
//             </motion.button>
//             <span style={styles.quantityText}>{quantity}</span>
//             <motion.button
//               whileTap={{ scale: 0.9 }}
//               style={styles.quantityButton}
//               onClick={() => setQuantity(quantity + 1)}
//               disabled={isOutOfStock}
//             >
//               +
//             </motion.button>
//           </div>

//           <motion.button
//             whileTap={{ scale: 0.95 }}
//             style={{
//               ...styles.addToCartBtn,
//               ...(addedToCart ? styles.addToCartBtnClicked : {}),
//             }}
//             onClick={handleAddToCart}
//             disabled={isOutOfStock}
//           >
//             {addedToCart ? "Added!" : "Add to Cart"}
//           </motion.button>

//           <motion.button
//             whileTap={{ scale: 0.95 }}
//             style={{
//               ...styles.wishlistButton,
//               ...(addedToWishlist ? styles.wishlistButtonActive : {}),
//             }}
//             onClick={handleAddToWishlist}
//           >
//             {addedToWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
//           </motion.button>
//         </div>
//       </motion.div>

//       {addedToCart && (
//         <motion.p
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.3 }}
//           style={styles.successMessage}
//         >
//           🎉 Added to cart successfully!
//         </motion.p>
//       )}
//     </motion.div>
//   );
// }

// const styles: { [key: string]: React.CSSProperties } = {
//   container: {
//     maxWidth: "1200px",
//     margin: "0 auto",
//     padding: "2rem",
//     textAlign: "center",
//   },
//   productCard: {
//     display: "grid",
//     gridTemplateColumns: "1fr 1fr",
//     gap: "2rem",
//     alignItems: "center",
//     backgroundColor: "#f9f9f9",
//     padding: "2rem",
//     borderRadius: "12px",
//     boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
//   },
//   productImage: {
//     overflow: "hidden",
//     borderRadius: "12px",
//     boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
//   },
//   image: {
//     borderRadius: "12px",
//   },
//   productDetails: {
//     textAlign: "left",
//   },
//   productTitle: {
//     fontSize: "2rem",
//     fontWeight: "bold",
//     color: "#333",
//   },
//   productPrice: {
//     fontSize: "1.5rem",
//     color: "#008080",
//     marginBottom: "0.5rem",
//   },
//   originalPrice: {
//     textDecoration: "line-through",
//     color: "#a0a0a0",
//     marginRight: "0.5rem",
//   },
//   savings: {
//     fontSize: "1rem",
//     color: "#28a745",
//     marginBottom: "1rem",
//   },
//   productDescription: {
//     fontSize: "1rem",
//     color: "#555",
//     marginBottom: "1.5rem",
//   },
//   stockStatus: {
//     fontSize: "1.2rem",
//     color: "#d9534f",
//     marginBottom: "1rem",
//   },
//   quantityContainer: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: "1rem",
//   },
//   quantityButton: {
//     backgroundColor: "#007bff",
//     color: "#fff",
//     border: "none",
//     fontSize: "1.25rem",
//     width: "40px",
//     height: "40px",
//     borderRadius: "8px",
//     cursor: "pointer",
//     margin: "0 10px",
//   },
//   quantityText: {
//     fontSize: "1.25rem",
//     fontWeight: "bold",
//   },
//   addToCartBtn: {
//     width: "100%",
//     maxWidth: "200px",
//     padding: "1rem",
//     backgroundColor: "#007bff",
//     color: "white",
//     fontSize: "1rem",
//     fontWeight: "bold",
//     borderRadius: "8px",
//     cursor: "pointer",
//     marginBottom: "1rem",
//   },
//   addToCartBtnClicked: {
//     backgroundColor: "#28a745",
//   },
//   wishlistButton: {
//     width: "100%",
//     maxWidth: "200px",
//     padding: "1rem",
//     backgroundColor: "#f8f9fa",
//     color: "#007bff",
//     fontSize: "1rem",
//     fontWeight: "bold",
//     borderRadius: "8px",
//     cursor: "pointer",
//     marginBottom: "1rem",
//   },
//   wishlistButtonActive: {
//     backgroundColor: "#ffc107",
//     color: "#fff",
//   },
//   successMessage: {
//     fontSize: "1.25rem",
//     color: "#28a745",
//     fontWeight: "bold",
//     marginTop: "1rem",
//   },
// };











































// import { useState } from "react";
// import { Product } from "@/app/types/product";
// import { urlFor } from "@/sanity/lib/image";
// import Image from "next/image";
// import Navbar from "@/components/Navbar";

// type ProductDetailsProps = {
//   product: Product;
// };

// export default function ProductDetails({ product }: ProductDetailsProps) {
//   const [quantity, setQuantity] = useState(1);
//   const [addedToCart, setAddedToCart] = useState(false);

//   const handleAddToCart = () => {
//     setAddedToCart(true);
//     setTimeout(() => setAddedToCart(false), 1500); // Reset after 1.5 seconds
//   };

//   const savings =
//     product.originalPrice && product.originalPrice > product.price
//       ? product.originalPrice - product.price
//       : 0;

//   return (
//     <>
      

//       <div style={styles.container}>
//         <div style={styles.productCard}>
//           {/* Product Image */}
//           <div style={styles.productImage} className="zoom-effect">
//             <Image
//               src={urlFor(product.image).url() || "/default-image.jpg"}
//               alt={product.title || "Product Image"}
//               width={400}
//               height={400}
//               style={styles.image}
//             />
//           </div>

//           {/* Product Details */}
//           <div style={styles.productDetails}>
//             <h1 style={styles.productTitle}>{product.title || "Untitled Product"}</h1>

//             {/* Price with Original Price */}
//             <p style={styles.productPrice}>
//               {product.originalPrice && product.originalPrice > product.price && (
//                 <span style={styles.originalPrice}>${product.originalPrice.toFixed(2)}</span>
//               )}
//               <span>${product.price.toFixed(2)}</span>
//             </p>

//             {/* Display savings if applicable */}
//             {savings > 0 && (
//               <p style={styles.savings}>
//                 You saved <span style={styles.savingsAmount}>${savings.toFixed(2)}</span> on this
//                 item!
//               </p>
//             )}

//             <p style={styles.productDescription}>
//               {product.description || "No description available."}
//             </p>

//             {/* Quantity Selector */}
//             <div style={styles.quantityContainer}>
//               <button
//                 style={styles.quantityButton}
//                 onClick={() => setQuantity(Math.max(1, quantity - 1))}
//               >
//                 -
//               </button>
//               <span style={styles.quantityText}>{quantity}</span>
//               <button style={styles.quantityButton} onClick={() => setQuantity(quantity + 1)}>
//                 +
//               </button>
//             </div>

//             {/* Add to Cart Button */}
//             <button
//               style={{
//                 ...styles.addToCartBtn,
//                 ...(addedToCart ? styles.addToCartBtnClicked : {}),
//               }}
//               onClick={handleAddToCart}
//             >
//               {addedToCart ? "Added!" : "Add to Cart"}
//             </button>
//           </div>
//         </div>

//         {/* Success Message */}
//         {addedToCart && <p style={styles.successMessage}>🎉 Item added to cart!</p>}
//       </div>
//     </>
//   );
// }

// // Inline CSS styles
// const styles: { [key: string]: React.CSSProperties } = {
//   container: {
//     maxWidth: "1200px",
//     margin: "0 auto",
//     padding: "2.5rem 1rem",
//     textAlign: "center",
//   },
//   productCard: {
//     display: "grid",
//     gridTemplateColumns: "1fr",
//     gap: "2rem",
//     alignItems: "center",
//     backgroundColor: "#f7f7f7",
//     padding: "1.5rem",
//     borderRadius: "10px",
//     boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//     transition: "transform 0.3s ease-in-out",
//   },
//   productImage: {
//     display: "flex",
//     justifyContent: "center",
//     overflow: "hidden",
//     cursor: "pointer",
//   },
//   image: {
//     borderRadius: "10px",
//     boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//     border: "1px solid #ddd",
//     transition: "transform 0.3s ease-in-out",
//   },
//   productDetails: {
//     padding: "1rem",
//     textAlign: "left",
//   },
//   productTitle: {
//     fontSize: "2rem",
//     fontWeight: "bold",
//     color: "#333",
//     marginBottom: "1rem",
//   },
//   productPrice: {
//     fontSize: "1.75rem",
//     fontWeight: 600,
//     color: "#008080",
//     marginBottom: "0.5rem",
//   },
//   originalPrice: {
//     textDecoration: "line-through",
//     color: "#a0a0a0",
//     marginRight: "0.5rem",
//   },
//   savings: {
//     fontSize: "1rem",
//     color: "#28a745",
//     marginBottom: "1rem",
//   },
//   savingsAmount: {
//     fontWeight: "bold",
//   },
//   productDescription: {
//     color: "#555",
//     fontSize: "1.125rem",
//     lineHeight: "1.6",
//     marginBottom: "1.5rem",
//   },
//   quantityContainer: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: "1rem",
//   },
//   quantityButton: {
//     backgroundColor: "#007bff",
//     color: "white",
//     border: "none",
//     fontSize: "1.5rem",
//     width: "40px",
//     height: "40px",
//     borderRadius: "5px",
//     cursor: "pointer",
//     margin: "0 10px",
//     transition: "background-color 0.3s",
//   },
//   quantityText: {
//     fontSize: "1.25rem",
//     fontWeight: "bold",
//     width: "50px",
//     textAlign: "center",
//   },
//   addToCartBtn: {
//     width: "100%",
//     maxWidth: "200px",
//     padding: "0.75rem 1.5rem",
//     backgroundColor: "#007bff",
//     color: "white",
//     fontSize: "1.125rem",
//     fontWeight: "bold",
//     border: "none",
//     borderRadius: "8px",
//     cursor: "pointer",
//     transition: "background-color 0.3s ease-in-out, transform 0.2s",
//   },
//   addToCartBtnClicked: {
//     backgroundColor: "#28a745",
//     transform: "scale(1.1)",
//   },
//   successMessage: {
//     fontSize: "1.2rem",
//     color: "#28a745",
//     fontWeight: "bold",
//     marginTop: "1rem",
//   },
// };















































































// import { useState } from "react";
// import { Product } from "@/app/types/product";
// import { urlFor } from "@/sanity/lib/image";
// import Image from "next/image";
// import Navbar from "@/components/Navbar";

// type ProductDetailsProps = {
//   product: Product;
// };

// <Navbar/>
// export default function ProductDetails({ product }: ProductDetailsProps) {
//   const [quantity, setQuantity] = useState(1);
//   const [addedToCart, setAddedToCart] = useState(false);

//   const handleAddToCart = () => {
//     setAddedToCart(true);
//     setTimeout(() => setAddedToCart(false), 1500); // Reset after 1.5 seconds
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.productCard}>
//         {/* Product Image with Hover Animation */}
//         <div style={styles.productImage} className="zoom-effect">
//           <Image
//             src={urlFor(product.image).url() || "/default-image.jpg"}
//             alt={product.title || "Product Image"}
//             width={400}
//             height={400}
//             style={styles.image}
//           />
//         </div>

//         {/* Product Details */}
//         <div style={styles.productDetails}>
//           <h1 style={styles.productTitle}>{product.title || "Untitled Product"}</h1>
//           <p style={styles.productDescription}>
//             {product.description || "No description available."}
//           </p>
//           <p style={styles.productPrice}>${product.price || "N/A"}</p>

//           {/* Quantity Selector */}
//           <div style={styles.quantityContainer}>
//             <button style={styles.quantityButton} onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
//             <span style={styles.quantityText}>{quantity}</span>
//             <button style={styles.quantityButton} onClick={() => setQuantity(quantity + 1)}>+</button>
//           </div>

//           {/* Add to Cart Button with Animation */}
//           <button 
//             style={{
//               ...styles.addToCartBtn,
//               ...(addedToCart ? styles.addToCartBtnClicked : {}),
//             }} 
//             onClick={handleAddToCart}
//           >
//             {addedToCart ? "Added!" : "Add to Cart"}
//           </button>
//         </div>
//       </div>

//       {/* Success Message */}
//       {addedToCart && <p style={styles.successMessage}>🎉 Item added to cart!</p>}
//     </div>
//   );
// }

// // Inline CSS styles with animations
// const styles: { [key: string]: React.CSSProperties } = {
//   container: {
//     maxWidth: "1200px",
//     margin: "0 auto",
//     padding: "2.5rem 1rem",
//     textAlign: "center",
//   },
//   productCard: {
//     display: "grid",
//     gridTemplateColumns: "1fr",
//     gap: "2rem",
//     alignItems: "center",
//     backgroundColor: "#f7f7f7",
//     padding: "1.5rem",
//     borderRadius: "10px",
//     boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//     transition: "transform 0.3s ease-in-out",
//   },
//   productImage: {
//     display: "flex",
//     justifyContent: "center",
//     overflow: "hidden",
//     cursor: "pointer",
//   },
//   image: {
//     borderRadius: "10px",
//     boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//     border: "1px solid #ddd",
//     transition: "transform 0.3s ease-in-out",
//   },
//   productDetails: {
//     padding: "1rem",
//     textAlign: "left",
//   },
//   productTitle: {
//     fontSize: "2rem",
//     fontWeight: "bold",
//     color: "#333",
//     marginBottom: "1rem",
//   },
//   productDescription: {
//     color: "#555",
//     fontSize: "1.125rem",
//     lineHeight: "1.6",
//     marginBottom: "1.5rem",
//   },
//   productPrice: {
//     fontSize: "1.75rem",
//     fontWeight: 600,
//     color: "#008080",
//     marginBottom: "1rem",
//   },
//   quantityContainer: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: "1rem",
//   },
//   quantityButton: {
//     backgroundColor: "#007bff",
//     color: "white",
//     border: "none",
//     fontSize: "1.5rem",
//     width: "40px",
//     height: "40px",
//     borderRadius: "5px",
//     cursor: "pointer",
//     margin: "0 10px",
//   },
//   quantityText: {
//     fontSize: "1.25rem",
//     fontWeight: "bold",
//     width: "50px",
//     textAlign: "center",
//   },
//   addToCartBtn: {
//     width: "100%",
//     maxWidth: "200px",
//     padding: "0.75rem 1.5rem",
//     backgroundColor: "#007bff",
//     color: "white",
//     fontSize: "1.125rem",
//     fontWeight: "bold",
//     border: "none",
//     borderRadius: "8px",
//     cursor: "pointer",
//     transition: "background-color 0.3s ease-in-out, transform 0.2s",
//   },
//   addToCartBtnClicked: {
//     backgroundColor: "#28a745",
//     transform: "scale(1.1)",
//   },
//   successMessage: {
//     fontSize: "1.2rem",
//     color: "#28a745",
//     fontWeight: "bold",
//     marginTop: "1rem",
//     animation: "fadeIn 1s ease-in-out",
//   },
// };

// // Hover & Animation Effects
// if (typeof document !== "undefined") {
//   document.addEventListener("mouseover", (event) => {
//     const target = event.target as HTMLElement;
//     if (target && target.style) {
//       if (target.tagName === "IMG") {
//         target.style.transform = "scale(1.1)";
//       }
//       if (target.tagName === "BUTTON") {
//         target.style.backgroundColor = "#0056b3";
//       }
//     }
//   });

//   document.addEventListener("mouseout", (event) => {
//     const target = event.target as HTMLElement;
//     if (target && target.style) {
//       if (target.tagName === "IMG") {
//         target.style.transform = "scale(1)";
//       }
//       if (target.tagName === "BUTTON") {
//         target.style.backgroundColor = "#007bff";
//       }
//     }
//   });
// }

// import { Product } from "@/app/types/product";
// import { urlFor } from "@/sanity/lib/image";
// import Image from "next/image";

// type ProductDetailsProps = {
//   product: Product;
// };

// export default function ProductDetails({ product }: ProductDetailsProps) {
//   return (
//     <div style={styles.container}>
//       <div style={styles.productCard}>
//         {/* Product Image */}
//         <div style={styles.productImage}>
//           <Image
//             src={urlFor(product.image).url() || "/default-image.jpg"}
//             alt={product.title || "Product Image"}
//             width={400}
//             height={400}
//             style={styles.image}
//           />
//         </div>

//         {/* Product Details */}
//         <div style={styles.productDetails}>
//           <h1 style={styles.productTitle}>{product.title || "Untitled Product"}</h1>
//           <p style={styles.productDescription}>
//             {product.description || "No description available."}
//           </p>
//           <p style={styles.productPrice}>${product.price || "N/A"}</p>

//           {/* Add to Cart Button */}
//           <button style={styles.addToCartBtn}>Add to Cart</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Inline CSS styles
// const styles: { [key: string]: React.CSSProperties } = {
//   container: {
//     maxWidth: "1200px",
//     margin: "0 auto",
//     padding: "2.5rem 1rem",
//   },
//   productCard: {
//     display: "grid",
//     gridTemplateColumns: "1fr",
//     gap: "2rem",
//     alignItems: "center",
//     backgroundColor: "#f7f7f7",
//     padding: "1.5rem",
//     borderRadius: "10px",
//     boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//   },
//   productImage: {
//     display: "flex",
//     justifyContent: "center",
//   },
//   image: {
//     borderRadius: "10px",
//     boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//     border: "1px solid #ddd",
//   },
//   productDetails: {
//     padding: "1rem",
//   },
//   productTitle: {
//     fontSize: "2rem",
//     fontWeight: "bold",
//     color: "#333",
//     marginBottom: "1rem",
//   },
//   productDescription: {
//     color: "#555",
//     fontSize: "1.125rem",
//     lineHeight: "1.6",
//     marginBottom: "1.5rem",
//   },
//   productPrice: {
//     fontSize: "1.75rem",
//     fontWeight: 600,
//     color: "#008080",
//   },
//   addToCartBtn: {
//     width: "100%",
//     maxWidth: "200px",
//     padding: "0.75rem 1.5rem",
//     backgroundColor: "#007bff",
//     color: "white",
//     fontSize: "1.125rem",
//     fontWeight: "bold",
//     border: "none",
//     borderRadius: "8px",
//     cursor: "pointer",
//     transition: "background-color 0.3s ease-in-out",
//   },
//   addToCartBtnHover: {
//     backgroundColor: "#0056b3",
//   },
// };

// // Add hover effect manually via JavaScript
// if (typeof document !== "undefined") {
//   document.addEventListener("mouseover", (event) => {
//     const target = event.target as HTMLElement;
//     if (target && target.style && target === document.activeElement) {
//       target.style.backgroundColor = styles.addToCartBtnHover.backgroundColor;
//     }
//   });
// }
