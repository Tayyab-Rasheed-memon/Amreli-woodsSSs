

































"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from "react-icons/fi";

const Footer = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Open subscription in new tab
    const ytWindow = window.open(
      "https://www.youtube.com/@itboyvlogs?sub_confirmation=1",
      "_blank",
      "noopener,noreferrer"
    );
    
    // Optional: Add subtle visual feedback
    if(ytWindow) {
      ytWindow.focus();
    }
  };

  const footerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } }
  };

  if (!isMounted) return null;

  return (
    <motion.footer
      initial="hidden"
      animate="visible"
      variants={footerVariants}
      className="text-gray-600 body-font bg-gray-50 border-t border-gray-200"
    >
      <div className="container px-5 py-16 mx-auto flex flex-wrap justify-between">
        <div className="flex flex-wrap w-full md:justify-between gap-8">
          {/* Brand Section */}
          <motion.div 
            className="w-full md:w-1/4 px-4 mb-6"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.img
              src="/logo c.png"
              alt="Amreli Woods Logo"
              className="mb-4 w-24 h-24 rounded-full border-2 border-amber-600"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <h2 className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent mb-3">
              Amreli Woods
            </h2>
            <p className="text-gray-600">
              Crafting legacy furniture since 1927. Premium materials, timeless designs.
            </p>
          </motion.div>

          {/* Categories Section */}
          <div className="w-full md:w-1/4 px-4 mb-6">
            <h2 className="title-font font-bold text-gray-900 text-lg mb-4">
              CATEGORIES
            </h2>
            <nav className="list-none">
              {["Sofa", "Armchair", "Dining Chair", "Wooden Chair", "Park Bench"].map(
                (category, index) => (
                  <motion.li 
                    key={index} 
                    className="mb-3"
                  >
                    <motion.a
                      href="#"
                      className="text-gray-600 hover:text-amber-600 transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      {category}
                    </motion.a>
                  </motion.li>
                )
              )}
            </nav>
          </div>

          {/* Support Section */}
          <div className="w-full md:w-1/4 px-4 mb-6">
            <h2 className="title-font font-bold text-gray-900 text-lg mb-4">
              SUPPORT
            </h2>
            <nav className="list-none">
              {["Customer Service", "Warranty", "Privacy Policy", "Store Locator"].map(
                (support, index) => (
                  <motion.li 
                    key={index} 
                    className="mb-3"
                  >
                    <motion.a
                      href="#"
                      className="text-gray-600 hover:text-amber-600 transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      {support}
                    </motion.a>
                  </motion.li>
                )
              )}
            </nav>
          </div>

          {/* YouTube Section */}
          <div className="w-full md:w-1/4 px-4 mb-6">
            <h2 className="title-font font-bold text-gray-900 text-lg mb-4">
              FOLLOW US
            </h2>
            <motion.button
              onClick={handleSubscribe}
              className="text-white bg-[#FF0000] px-6 py-3 rounded-lg font-medium hover:bg-[#CC0000] transition-colors w-full flex items-center justify-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
              </svg>
              Join Our Community
            </motion.button>
            <p className="text-gray-500 text-sm mt-2 text-center">
              Discover exclusive content
            </p>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <motion.div 
        className="bg-amber-50"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="container px-5 py-6 mx-auto flex flex-wrap items-center justify-between">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} Amreli Woods — 
            <span className="ml-1 text-amber-600">Crafted with excellence</span>
          </p>
          <div className="flex space-x-5">
            {[
              { icon: FiFacebook, link: "#" },
              { icon: FiTwitter, link: "#" },
              { icon: FiInstagram, link: "#" },
              { icon: FiLinkedin, link: "#" }
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.link}
                className="text-gray-600 hover:text-amber-600 transition-colors"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;























// "use client";

// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from "react-icons/fi";

// const Footer = () => {
//   const [isMounted, setIsMounted] = useState(false);

//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   const handleSubscribe = (e: React.FormEvent) => {
//     e.preventDefault();
//     window.open(
//       "https://www.youtube.com/@itboyvlogs?sub_confirmation=1",
//       "_blank",
//       "noopener,noreferrer"
//     );
//   };

//   const footerVariants = {
//     hidden: { opacity: 0 },
//     visible: { opacity: 1, transition: { duration: 0.8 } }
//   };

//   const listItemVariants = {
//     hidden: { x: -20, opacity: 0 },
//     visible: (i: number) => ({
//       x: 0,
//       opacity: 1,
//       transition: { delay: i * 0.1 }
//     })
//   };

//   if (!isMounted) return null;

//   return (
//     <motion.footer
//       initial="hidden"
//       animate="visible"
//       variants={footerVariants}
//       className="text-gray-600 body-font bg-gray-50 border-t border-gray-200"
//     >
//       <div className="container px-5 py-16 mx-auto flex flex-wrap justify-between">
//         <div className="flex flex-wrap w-full md:justify-between gap-8">
//           {/* Brand Section */}
//           <motion.div 
//             className="w-full md:w-1/4 px-4 mb-6"
//             whileHover={{ scale: 1.02 }}
//             transition={{ type: "spring", stiffness: 300 }}
//           >
//             <motion.img
//               src="/logo c.png"
//               alt="Amreli Woods Logo"
//               className="mb-4 w-24 h-24 rounded-full border-2 border-amber-600"
//               whileHover={{ scale: 1.05 }}
//               transition={{ type: "spring", stiffness: 300 }}
//             />
//             <h2 className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent mb-3">
//               Amreli Woods
//             </h2>
//             <p className="text-gray-600">
//               Crafting legacy furniture since 1927. Premium materials, timeless designs.
//             </p>
//           </motion.div>

//           {/* Categories Section */}
//           <div className="w-full md:w-1/4 px-4 mb-6">
//             <h2 className="title-font font-bold text-gray-900 text-lg mb-4">
//               CATEGORIES
//             </h2>
//             <nav className="list-none">
//               {["Sofa", "Armchair", "Dining Chair", "Wooden Chair", "Park Bench"].map(
//                 (category, index) => (
//                   <motion.li 
//                     key={index} 
//                     className="mb-3"
//                     variants={listItemVariants}
//                     custom={index}
//                   >
//                     <motion.a
//                       href="#"
//                       className="text-gray-600 hover:text-amber-600 transition-colors"
//                       whileHover={{ x: 5 }}
//                     >
//                       {category}
//                     </motion.a>
//                   </motion.li>
//                 )
//               )}
//             </nav>
//           </div>

//           {/* Support Section */}
//           <div className="w-full md:w-1/4 px-4 mb-6">
//             <h2 className="title-font font-bold text-gray-900 text-lg mb-4">
//               SUPPORT
//             </h2>
//             <nav className="list-none">
//               {["Customer Service", "Warranty", "Privacy Policy", "Store Locator"].map(
//                 (support, index) => (
//                   <motion.li 
//                     key={index} 
//                     className="mb-3"
//                     variants={listItemVariants}
//                     custom={index}
//                   >
//                     <motion.a
//                       href="#"
//                       className="text-gray-600 hover:text-amber-600 transition-colors"
//                       whileHover={{ x: 5 }}
//                     >
//                       {support}
//                     </motion.a>
//                   </motion.li>
//                 )
//               )}
//             </nav>
//           </div>

//           {/* Newsletter Section */}
//           <div className="w-full md:w-1/4 px-4 mb-6">
//             <h2 className="title-font font-bold text-gray-900 text-lg mb-4">
//               FOLLOW US
//             </h2>
//             <form onSubmit={handleSubscribe} className="flex flex-col gap-4">
//               <motion.button
//                 type="submit"
//                 className="text-white bg-amber-600 px-6 py-3 rounded-lg font-medium hover:bg-amber-700 transition-colors flex items-center justify-center gap-2"
//                 whileHover={{ y: -2 }}
//                 whileTap={{ scale: 0.98 }}
//               >
//                 <svg 
//                   xmlns="http://www.w3.org/2000/svg" 
//                   width="24" 
//                   height="24" 
//                   viewBox="0 0 24 24" 
//                   fill="currentColor"
//                   className="w-6 h-6"
//                 >
//                   <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
//                 </svg>
//                 Subscribe on YouTube
//               </motion.button>
//               <p className="text-gray-500 text-sm mt-2">
//                 Join our community for exclusive content
//               </p>
//             </form>
//           </div>
//         </div>
//       </div>

//       {/* Copyright Section */}
//       <motion.div 
//         className="bg-amber-50"
//         initial={{ y: 20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//       >
//         <div className="container px-5 py-6 mx-auto flex flex-wrap items-center justify-between">
//           <p className="text-sm text-gray-600">
//             © {new Date().getFullYear()} Amreli Woods — 
//             <span className="ml-1 text-amber-600">Crafted with excellence</span>
//           </p>
//           <div className="flex space-x-5">
//             {[
//               { icon: FiFacebook, link: "#" },
//               { icon: FiTwitter, link: "#" },
//               { icon: FiInstagram, link: "#" },
//               { icon: FiLinkedin, link: "#" }
//             ].map((social, index) => (
//               <motion.a
//                 key={index}
//                 href={social.link}
//                 className="text-gray-600 hover:text-amber-600 transition-colors"
//                 whileHover={{ scale: 1.2 }}
//                 whileTap={{ scale: 0.9 }}
//               >
//                 <social.icon className="w-5 h-5" />
//               </motion.a>
//             ))}
//           </div>
//         </div>
//       </motion.div>
//     </motion.footer>
//   );
// };

// export default Footer;

















































// "use client";

// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from "react-icons/fi";

// const Footer = () => {
//   const [email, setEmail] = useState("");
//   const [isSubscribed, setIsSubscribed] = useState(false);
//   const [isMounted, setIsMounted] = useState(false);

//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   const handleSubscribe = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (validateEmail(email)) {
//       setIsSubscribed(true);
//       setEmail("");
//       setTimeout(() => setIsSubscribed(false), 3000);
//     }
//   };

//   const validateEmail = (email: string) => {
//     return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
//   };

//   const footerVariants = {
//     hidden: { opacity: 0 },
//     visible: { opacity: 1, transition: { duration: 0.8 } }
//   };

//   const listItemVariants = {
//     hidden: { x: -20, opacity: 0 },
//     visible: (i: number) => ({
//       x: 0,
//       opacity: 1,
//       transition: { delay: i * 0.1 }
//     })
//   };

//   if (!isMounted) return null;

//   return (
//     <motion.footer
//       initial="hidden"
//       animate="visible"
//       variants={footerVariants}
//       className="text-gray-600 body-font bg-gray-50 border-t border-gray-200"
//     >
//       <div className="container px-5 py-16 mx-auto flex flex-wrap justify-between">
//         <div className="flex flex-wrap w-full md:justify-between gap-8">
//           {/* Brand Section */}
//           <motion.div 
//             className="w-full md:w-1/4 px-4 mb-6"
//             whileHover={{ scale: 1.02 }}
//             transition={{ type: "spring", stiffness: 300 }}
//           >
//             <motion.img
//               src="/logo c.png"
//               alt="Amreli Woods Logo"
//               className="mb-4 w-24 h-24 rounded-full border-2 border-amber-600"
//               whileHover={{ scale: 1.05 }}
//               transition={{ type: "spring", stiffness: 300 }}
//             />
//             <h2 className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent mb-3">
//               Amreli Woods
//             </h2>
//             <p className="text-gray-600">
//               Crafting legacy furniture since 1927. Premium materials, timeless designs.
//             </p>
//           </motion.div>

//           {/* Categories Section */}
//           <div className="w-full md:w-1/4 px-4 mb-6">
//             <h2 className="title-font font-bold text-gray-900 text-lg mb-4">
//               CATEGORIES
//             </h2>
//             <nav className="list-none">
//               {["Sofa", "Armchair", "Dining Chair", "Wooden Chair", "Park Bench"].map(
//                 (category, index) => (
//                   <motion.li 
//                     key={index} 
//                     className="mb-3"
//                     variants={listItemVariants}
//                     custom={index}
//                   >
//                     <motion.a
//                       href="#"
//                       className="text-gray-600 hover:text-amber-600 transition-colors"
//                       whileHover={{ x: 5 }}
//                     >
//                       {category}
//                     </motion.a>
//                   </motion.li>
//                 )
//               )}
//             </nav>
//           </div>

//           {/* Support Section */}
//           <div className="w-full md:w-1/4 px-4 mb-6">
//             <h2 className="title-font font-bold text-gray-900 text-lg mb-4">
//               SUPPORT
//             </h2>
//             <nav className="list-none">
//               {["Customer Service", "Warranty", "Privacy Policy", "Store Locator"].map(
//                 (support, index) => (
//                   <motion.li 
//                     key={index} 
//                     className="mb-3"
//                     variants={listItemVariants}
//                     custom={index}
//                   >
//                     <motion.a
//                       href="#"
//                       className="text-gray-600 hover:text-amber-600 transition-colors"
//                       whileHover={{ x: 5 }}
//                     >
//                       {support}
//                     </motion.a>
//                   </motion.li>
//                 )
//               )}
//             </nav>
//           </div>

//           {/* Newsletter Section */}
//           <div className="w-full md:w-1/4 px-4 mb-6">
//             <h2 className="title-font font-bold text-gray-900 text-lg mb-4">
//               NEWSLETTER
//             </h2>
//             <form onSubmit={handleSubscribe} className="flex flex-col gap-4">
//               <motion.input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Your Email"
//                 className="w-full bg-white rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 text-base outline-none text-gray-700 py-3 px-4"
//                 whileFocus={{ scale: 1.02 }}
//               />
//               <motion.button
//                 type="submit"
//                 className="text-white bg-amber-600 px-6 py-3 rounded-lg font-medium hover:bg-amber-700 transition-colors"
//                 whileHover={{ y: -2 }}
//                 whileTap={{ scale: 0.98 }}
//               >
//                 Subscribe
//               </motion.button>
//             </form>
//             {isSubscribed && (
//               <motion.p
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="text-green-600 text-sm mt-2"
//               >
//                 Thanks for subscribing!
//               </motion.p>
//             )}
//             <p className="text-gray-500 text-sm mt-4">
//               Get 15% off your first order + design inspiration
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Copyright Section */}
//       <motion.div 
//         className="bg-amber-50"
//         initial={{ y: 20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//       >
//         <div className="container px-5 py-6 mx-auto flex flex-wrap items-center justify-between">
//           <p className="text-sm text-gray-600">
//             © {new Date().getFullYear()} Amreli Woods — 
//             <span className="ml-1 text-amber-600">Crafted with excellence</span>
//           </p>
//           <div className="flex space-x-5">
//             {[
//               { icon: FiFacebook, link: "#" },
//               { icon: FiTwitter, link: "#" },
//               { icon: FiInstagram, link: "#" },
//               { icon: FiLinkedin, link: "#" }
//             ].map((social, index) => (
//               <motion.a
//                 key={index}
//                 href={social.link}
//                 className="text-gray-600 hover:text-amber-600 transition-colors"
//                 whileHover={{ scale: 1.2 }}
//                 whileTap={{ scale: 0.9 }}
//               >
//                 <social.icon className="w-5 h-5" />
//               </motion.a>
//             ))}
//           </div>
//         </div>
//       </motion.div>
//     </motion.footer>
//   );
// };

// export default Footer;
















// "use client";

// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from "react-icons/fi";

// const Footer = () => {
//   const [email, setEmail] = useState("");
//   const [isSubscribed, setIsSubscribed] = useState(false);
//   const [isMounted, setIsMounted] = useState(false);

//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   const handleSubscribe = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (validateEmail(email)) {
//       setIsSubscribed(true);
//       setEmail("");
//       setTimeout(() => setIsSubscribed(false), 3000);
//     }
//   };

//   const validateEmail = (email: string) => {
//     return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
//   };

//   const footerVariants = {
//     hidden: { opacity: 0 },
//     visible: { opacity: 1, transition: { duration: 0.8 } }
//   };

//   const listItemVariants = {
//     hidden: { x: -20, opacity: 0 },
//     visible: (i: number) => ({
//       x: 0,
//       opacity: 1,
//       transition: { delay: i * 0.1 }
//     })
//   };

//   if (!isMounted) return null;

//   return (
//     <motion.footer
//       initial="hidden"
//       animate="visible"
//       variants={footerVariants}
//       className="text-gray-600 body-font bg-gray-50"
//     >
//       <div className="container px-5 py-16 mx-auto flex flex-wrap justify-between mt-[120px]">
//         <div className="flex flex-wrap w-full md:justify-between">
//           {/* Logo Section */}
//           <motion.div 
//             className="lg:w-1/4 md:w-1/2 w-full px-4 mb-6"
//             whileHover={{ scale: 1.02 }}
//             transition={{ type: "spring", stiffness: 300 }}
//           >
//             <motion.img
//               src="/logo c.png"
//               alt="Logo"
//               className="mb-4 w-[120px] h-[120px]"
//               whileHover={{ scale: 1.05, rotate: -2 }}
//               transition={{ type: "spring", stiffness: 300 }}
//             />
//             <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
//               Amreli Woods
//             </h2>
//             <motion.p 
//               className="text-gray-600"
//               whileHover={{ x: 5 }}
//             >
//               Crafting legacy furniture since 1927. Premium materials, timeless designs.
//             </motion.p>
//           </motion.div>

//           {/* Categories Section */}
//           <div className="lg:w-1/4 md:w-1/2 w-full px-4 mb-6">
//             <h2 className="title-font font-bold text-gray-900 tracking-widest text-sm mb-3">
//               CATEGORIES
//             </h2>
//             <nav className="list-none mb-10">
//               {["Sofa", "Armchair", "Dining Chair", "Wooden Chair", "Park Bench"].map(
//                 (category, index) => (
//                   <motion.li 
//                     key={index} 
//                     className="mb-2"
//                     variants={listItemVariants}
//                     custom={index}
//                     initial="hidden"
//                     animate="visible"
//                   >
//                     <motion.a
//                       href="#"
//                       className="text-gray-600 hover:text-teal-500"
//                       whileHover={{ scale: 1.05 }}
//                     >
//                       {category}
//                     </motion.a>
//                   </motion.li>
//                 )
//               )}
//             </nav>
//           </div>

//           {/* Support Section */}
//           <div className="lg:w-1/4 md:w-1/2 w-full px-4 mb-6">
//             <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
//               Support
//             </h2>
//             <nav className="list-none mb-10">
//               {["Customer Service", "Warranty", "Privacy Policy", "Store Locator"].map(
//                 (support, index) => (
//                   <motion.li 
//                     key={index} 
//                     className="mb-2"
//                     variants={listItemVariants}
//                     custom={index}
//                     initial="hidden"
//                     animate="visible"
//                   >
//                     <motion.a
//                       href="#"
//                       className="text-gray-600 hover:text-teal-500"
//                       whileHover={{ scale: 1.05 }}
//                     >
//                       {support}
//                     </motion.a>
//                   </motion.li>
//                 )
//               )}
//             </nav>
//           </div>

//           {/* Subscribe Section */}
//           <div className="lg:w-1/4 md:w-1/2 w-full px-4 mb-6">
//             <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
//               NEWSLETTER
//             </h2>
//             <form onSubmit={handleSubscribe} className="flex flex-col gap-4">
//               <motion.input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Your Email"
//                 className="w-full bg-gray-100 rounded border border-gray-300 focus:ring-2 focus:ring-teal-500 text-base outline-none text-gray-700 py-2 px-4"
//                 whileFocus={{ scale: 1.02 }}
//               />
//               <motion.button
//                 type="submit"
//                 className="text-white bg-teal-500 px-6 py-2 rounded"
//                 whileHover={{ scale: 1.05, y: -2 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 Subscribe
//               </motion.button>
//             </form>
//             {isSubscribed && (
//               <motion.p
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="text-green-500 text-sm mt-2"
//               >
//                 Thanks for subscribing!
//               </motion.p>
//             )}
//             <p className="text-gray-500 text-sm mt-4">
//               Get 15% off your first order + design inspiration
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Bottom Bar */}
//       <motion.div 
//         className="bg-gray-100"
//         initial={{ y: 20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//       >
//         <div className="container px-5 py-6 mx-auto flex flex-wrap items-center justify-between">
//           <p className="text-sm text-gray-500">
//             © {new Date().getFullYear()} Amreli Woods — 
//             <a
//               href="https://twitter.com/ItBoy"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-gray-600 ml-1 hover:text-teal-500"
//             >
//               Crafted by Ibrahim Memon
//             </a>
//           </p>
//           <div className="flex space-x-4">
//             {[
//               { icon: FiFacebook, link: "#" },
//               { icon: FiTwitter, link: "#" },
//               { icon: FiInstagram, link: "#" },
//               { icon: FiLinkedin, link: "#" }
//             ].map((social, index) => (
//               <motion.a
//                 key={index}
//                 href={social.link}
//                 className="text-gray-500 hover:text-teal-500"
//                 whileHover={{ scale: 1.2, rotate: 10 }}
//                 whileTap={{ scale: 0.9 }}
//               >
//                 <social.icon className="w-5 h-5" />
//               </motion.a>
//             ))}
//           </div>
//         </div>
//       </motion.div>
//     </motion.footer>
//   );
// };

// export default Footer;













































// "use client";

// import React, { useEffect, useState } from "react";

// const Footer = () => {
//   // State to check if the component is being rendered on the client-side
//   const [isClient, setIsClient] = useState(false);

//   useEffect(() => {
//     setIsClient(true); // This will only run on the client side
//   }, []);

//   // Prevent server-side rendering for elements that depend on client-side animations
//   if (!isClient) {
//     return null; // You can return a loading state or an empty div here
//   }

//   return (
//     <footer className="text-gray-600 body-font bg-gray-50">
//       <div className="container px-5 py-16 mx-auto flex flex-wrap justify-between mt-[120px]">
//         <div className="flex flex-wrap w-full md:justify-between">
//           {/* Logo and About Section */}
//           <div className="lg:w-1/4 md:w-1/2 w-full px-4 mb-6 animate-fadeIn">
//             <img
//               src="/logo c.png"
//               alt="Logo"
//               className="mb-4 transform hover:scale-105 transition-transform duration-300 w-[120px] h-[120px]"  
//             />
//             <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
//               Amreli Woods
//             </h2>
//             <p className="text-gray-600 hover:text-gray-800 transition-all duration-300 ease-in-out">
//               Vivamus tristique odio sit amet velit semper, eu posuere turpis
//               interdum. Cras egestas purus.
//             </p>
//           </div>

//           {/* Categories Section */}
//           <div className="lg:w-1/4 md:w-1/2 w-full px-4 mb-6 animate-slideUp">
//             <h2 className="title-font font-bold text-gray-900 tracking-widest text-sm mb-3">
//               CATEGORIES
//             </h2>
//             <nav className="list-none mb-10">
//               {["Sofa", "Armchair", "Wiring Chair", "Wooden Chair", "Park Bench"].map(
//                 (category, index) => (
//                   <li key={index} className="mb-2">
//                     <a
//                       href="#"
//                       className="text-gray-600 hover:text-teal-500 transition-colors duration-300 ease-in-out"
//                     >
//                       {category}
//                     </a>
//                   </li>
//                 )
//               )}
//             </nav>
//           </div>

//           {/* Support Section */}
//           <div className="lg:w-1/4 md:w-1/2 w-full px-4 mb-6 animate-fadeIn">
//             <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
//               Support
//             </h2>
//             <nav className="list-none mb-10">
//               {["Help And Support", "Terms & Conditions", "Privacy Policy", "Help"].map(
//                 (support, index) => (
//                   <li key={index} className="mb-2">
//                     <a
//                       href="#"
//                       className="text-gray-600 hover:text-teal-500 transition-colors duration-300 ease-in-out"
//                     >
//                       {support}
//                     </a>
//                   </li>
//                 )
//               )}
//             </nav>
//           </div>

//           {/* Subscribe Section */}
//           <div className="lg:w-1/4 md:w-1/2 w-full px-4 mb-6 animate-slideUp">
//             <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
//               SUBSCRIBE
//             </h2>
//             <div className="flex flex-wrap justify-start items-end">
//               <div className="relative w-full lg:w-auto xl:mr-4">
//                 <input
//                   type="text"
//                   id="footer-field"
//                   name="footer-field"
//                   placeholder="Your Email"
//                   className="w-full bg-gray-100 rounded border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-base outline-none text-gray-700 py-2 px-4 transition-colors duration-300 ease-in-out"
//                 />
//               </div>
//               <button className="mt-4 lg:mt-0 text-white bg-teal-500 hover:bg-teal-600 px-6 py-2 rounded transition-transform duration-300 ease-in-out hover:-translate-y-1">
//                 Subscribe
//               </button>
//             </div>
//             <p className="text-gray-500 text-sm mt-4">
//               Stay updated with our latest trends and collections.
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Bottom Bar */}
//       <div className="bg-gray-100">
//         <div className="container px-5 py-6 mx-auto flex flex-wrap items-center justify-between">
//           <p className="text-sm text-gray-500">
//             © Design And Create 2025 buy Ibrahim (Tyyab Rasheed Memon ) —{" "}
//             <a
//               href="https://twitter.com/ItBoy"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-gray-600 ml-1 hover:text-teal-500"
//             >
//               @It boy
//             </a>
//           </p>
//           <div className="flex space-x-3">
//             {["facebook", "twitter", "instagram", "linkedin"].map((platform, index) => (
//               <a
//                 key={index}
//                 href="#"
//                 className="text-gray-500 hover:text-teal-500 transition-transform duration-300 ease-in-out hover:-translate-y-1"
//               >
//                 <svg
//                   fill="currentColor"
//                   className="w-5 h-5"
//                   viewBox="0 0 24 24"
//                 >
//                   {/* Replace these with actual SVG paths for each platform */}
//                   <circle cx="12" cy="12" r="10" />
//                 </svg>
//               </a>
//             ))}
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;



































// "use client";

// import React from "react";

// const Footer = () => {
//   return (
//     <footer className="text-gray-600 body-font bg-gray-50">
//       <div className="container px-5 py-16 mx-auto flex flex-wrap justify-between mt-[120px]">
//         <div className="flex flex-wrap w-full md:justify-between">
//           {/* Logo and About Section */}
//           <div className="lg:w-1/4 md:w-1/2 w-full px-4 mb-6 animate-fadeIn">
//             <img
//               src="/logo c.png"
//               alt="Logo"
//               className="mb-4 transform hover:scale-105 transition-transform duration-300 w-1/2"  
//             />
//             <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
//               Amreli Woods
//             </h2>
//             <p className="text-gray-600 hover:text-gray-800 transition-all duration-300 ease-in-out">
//               Vivamus tristique odio sit amet velit semper, eu posuere turpis
//               interdum. Cras egestas purus.
//             </p>
//           </div>

//           {/* Categories Section */}
//           <div className="lg:w-1/4 md:w-1/2 w-full px-4 mb-6 animate-slideUp">
//             <h2 className="title-font font-bold text-gray-900 tracking-widest text-sm mb-3">
//               CATEGORIES
//             </h2>
//             <nav className="list-none mb-10">
//               {["Sofa", "Armchair", "Wiring Chair", "Wooden Chair", "Park Bench"].map(
//                 (category, index) => (
//                   <li key={index} className="mb-2">
//                     <a
//                       href="#"
//                       className="text-gray-600 hover:text-teal-500 transition-colors duration-300 ease-in-out"
//                     >
//                       {category}
//                     </a>
//                   </li>
//                 )
//               )}
//             </nav>
//           </div>

//           {/* Support Section */}
//           <div className="lg:w-1/4 md:w-1/2 w-full px-4 mb-6 animate-fadeIn">
//             <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
//               Support
//             </h2>
//             <nav className="list-none mb-10">
//               {["Help And Support", "Terms & Conditions", "Privacy Policy", "Help"].map(
//                 (support, index) => (
//                   <li key={index} className="mb-2">
//                     <a
//                       href="#"
//                       className="text-gray-600 hover:text-teal-500 transition-colors duration-300 ease-in-out"
//                     >
//                       {support}
//                     </a>
//                   </li>
//                 )
//               )}
//             </nav>
//           </div>

//           {/* Subscribe Section */}
//           <div className="lg:w-1/4 md:w-1/2 w-full px-4 mb-6 animate-slideUp">
//             <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
//               SUBSCRIBE
//             </h2>
//             <div className="flex flex-wrap justify-start items-end">
//               <div className="relative w-full lg:w-auto xl:mr-4">
//                 <input
//                   type="text"
//                   id="footer-field"
//                   name="footer-field"
//                   placeholder="Your Email"
//                   className="w-full bg-gray-100 rounded border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-base outline-none text-gray-700 py-2 px-4 transition-colors duration-300 ease-in-out"
//                 />
//               </div>
//               <button className="mt-4 lg:mt-0 text-white bg-teal-500 hover:bg-teal-600 px-6 py-2 rounded transition-transform duration-300 ease-in-out hover:-translate-y-1">
//                 Subscribe
//               </button>
//             </div>
//             <p className="text-gray-500 text-sm mt-4">
//               Stay updated with our latest trends and collections.
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Bottom Bar */}
//       <div className="bg-gray-100">
//         <div className="container px-5 py-6 mx-auto flex flex-wrap items-center justify-between">
//           <p className="text-sm text-gray-500">
//             © Design And Create 2025 buy Ibrahim (Tyyab Rasheed Memon ) —{" "}
//             <a
//               href="https://twitter.com/ItBoy"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-gray-600 ml-1 hover:text-teal-500"
//             >
//               @It boy
//             </a>
//           </p>
//           <div className="flex space-x-3">
//             {["facebook", "twitter", "instagram", "linkedin"].map((platform, index) => (
//               <a
//                 key={index}
//                 href="#"
//                 className="text-gray-500 hover:text-teal-500 transition-transform duration-300 ease-in-out hover:-translate-y-1"
//               >
//                 <svg
//                   fill="currentColor"
//                   className="w-5 h-5"
//                   viewBox="0 0 24 24"
//                 >
//                   {/* Replace these with actual SVG paths for each platform */}
//                   <circle cx="12" cy="12" r="10" />
//                 </svg>
//               </a>
//             ))}
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;





// import React from "react";

// const Footer = () => {
//   return (
//     <footer className="text-gray-600 body-font bg-gray-50">
//       <div className="container px-5 py-16 mx-auto flex flex-wrap justify-between mt-[120px]">
//         <div className="flex flex-wrap w-full md:justify-between">
//           {/* Logo and About Section */}
//           <div className="lg:w-1/4 md:w-1/2 w-full px-4 mb-6 animate-fadeIn">
//             <img
//               src="/logo c.png"
//               alt="/logo c.png"
//               className="mb-4 transform hover:scale-105 transition-transform duration-300"
//             />
//             <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
//             Amreli Woods
//             </h2>
//             <p className="text-gray-600 hover:text-gray-800 transition-all duration-300 ease-in-out">
//               Vivamus tristique odio sit amet velit semper, eu posuere turpis
//               interdum. Cras egestas purus.
//             </p>
//           </div>

//           {/* Categories Section */}
//           <div className="lg:w-1/4 md:w-1/2 w-full px-4 mb-6 animate-slideUp">
//             <h2 className="title-font font-bold text-gray-900 tracking-widest text-sm mb-3">
//               CATEGORIES
//             </h2>
//             <nav className="list-none mb-10">
//               {["Sofa", "Armchair", "Wiring Chair", "Wooden Chair", "Park Bench"].map(
//                 (category, index) => (
//                   <li key={index} className="mb-2">
//                     <a
//                       href="#"
//                       className="text-gray-600 hover:text-teal-500 transition-colors duration-300 ease-in-out"
//                     >
//                       {category}
//                     </a>
//                   </li>
//                 )
//               )}
//             </nav>
//           </div>

//           {/* Support Section */}
//           <div className="lg:w-1/4 md:w-1/2 w-full px-4 mb-6 animate-fadeIn">
//             <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
//               Support
//             </h2>
//             <nav className="list-none mb-10">
//               {["Help And Support", "Terms & Conditions", "Privacy Policy", "Help"].map(
//                 (support, index) => (
//                   <li key={index} className="mb-2">
//                     <a
//                       href="#"
//                       className="text-gray-600 hover:text-teal-500 transition-colors duration-300 ease-in-out"
//                     >
//                       {support}
//                     </a>
//                   </li>
//                 )
//               )}
//             </nav>
//           </div>

//           {/* Subscribe Section */}
//           <div className="lg:w-1/4 md:w-1/2 w-full px-4 mb-6 animate-slideUp">
//             <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
//               SUBSCRIBE
//             </h2>
//             <div className="flex flex-wrap justify-start items-end">
//               <div className="relative w-full lg:w-auto xl:mr-4">
//                 <input
//                   type="text"
//                   id="footer-field"
//                   name="footer-field"
//                   placeholder="Your Email"
//                   className="w-full bg-gray-100 rounded border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-base outline-none text-gray-700 py-2 px-4 transition-colors duration-300 ease-in-out"
//                 />
//               </div>
//               <button className="mt-4 lg:mt-0 text-white bg-teal-500 hover:bg-teal-600 px-6 py-2 rounded transition-transform duration-300 ease-in-out hover:-translate-y-1">
//                 Subscribe
//               </button>
//             </div>
//             <p className="text-gray-500 text-sm mt-4">
//               Stay updated with our latest trends and collections.
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Bottom Bar */}
//       <div className="bg-gray-100">
//         <div className="container px-5 py-6 mx-auto flex flex-wrap items-center justify-between">
//           <p className="text-sm text-gray-500">
//             © Design And Create 2025 buy Ibrahim (Tyyab Rasheed Memon ) —
//             <a
//               href="https://twitter.com/ItBoy"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-gray-600 ml-1 hover:text-teal-500"
//             >
//               @It boy
//             </a>
//           </p>
//           <div className="flex space-x-3">
//             {["facebook", "twitter", "instagram", "linkedin"].map((platform, index) => (
//               <a
//                 key={index}
//                 href="#"
//                 className="text-gray-500 hover:text-teal-500 transition-transform duration-300 ease-in-out hover:-translate-y-1"
//               >
//                 <svg
//                   fill="currentColor"
//                   className="w-5 h-5"
//                   viewBox="0 0 24 24"
//                 >
//                   {/* Replace these with actual SVG paths for each platform */}
//                   <circle cx="12" cy="12" r="10" />
//                 </svg>
//               </a>
//             ))}
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;














// import React from "react";

// const Footer = () => {
//   return (
//     <footer className="text-gray-600 body-font bg-gray-50">
//       <div className="container px-5 py-16 mx-auto flex flex-wrap justify-between mt-[120px]">
//         <div className="flex flex-wrap w-full md:justify-between">
//           {/* Logo and About Section */}
//           <div className="lg:w-1/4 md:w-1/2 w-full px-4 mb-6">
//             <img src="/Logo Icon.png" alt="logo-sofa" className="mb-4" />
//             <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
//               Comforty
//             </h2>
//             <p className="text-gray-600 hover:text-gray-800 transition-all duration-300 ease-in-out">
//               Vivamus tristique odio sit amet velit semper, eu posuere turpis
//               interdum. Cras egestas purus.
//             </p>
//           </div>

//           {/* Categories Section */}
//           <div className="lg:w-1/4 md:w-1/2 w-full px-4 mb-6">
//             <h2 className="title-font font-bold text-gray-900 tracking-widest text-sm mb-3">
//               CATEGORIES
//             </h2>
//             <nav className="list-none mb-10">
//               {["Sofa", "Armchair", "Wiring Chair", "Wooden Chair", "Park Bench"].map(
//                 (category, index) => (
//                   <li key={index} className="mb-2">
//                     <a
//                       href="#"
//                       className="text-gray-600 hover:text-teal-500 transition-colors duration-300 ease-in-out"
//                     >
//                       {category}
//                     </a>
//                   </li>
//                 )
//               )}
//             </nav>
//           </div>

//           {/* Support Section */}
//           <div className="lg:w-1/4 md:w-1/2 w-full px-4 mb-6">
//             <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
//               Support
//             </h2>
//             <nav className="list-none mb-10">
//               {["Help And Support", "Terms & Conditions", "Privacy Policy", "Help"].map(
//                 (support, index) => (
//                   <li key={index} className="mb-2">
//                     <a
//                       href="#"
//                       className="text-gray-600 hover:text-teal-500 transition-colors duration-300 ease-in-out"
//                     >
//                       {support}
//                     </a>
//                   </li>
//                 )
//               )}
//             </nav>
//           </div>

//           {/* Subscribe Section */}
//           <div className="lg:w-1/4 md:w-1/2 w-full px-4 mb-6">
//             <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
//               SUBSCRIBE
//             </h2>
//             <div className="flex flex-wrap justify-start items-end">
//               <div className="relative w-full lg:w-auto xl:mr-4">
//                 <input
//                   type="text"
//                   id="footer-field"
//                   name="footer-field"
//                   placeholder="Your Email"
//                   className="w-full bg-gray-100 rounded border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-base outline-none text-gray-700 py-2 px-4 transition-colors duration-300 ease-in-out"
//                 />
//               </div>
//               <button className="mt-4 lg:mt-0 text-white bg-teal-500 hover:bg-teal-600 px-6 py-2 rounded transition-transform duration-300 ease-in-out hover:-translate-y-1">
//                 Subscribe
//               </button>
//             </div>
//             <p className="text-gray-500 text-sm mt-4">
//               Stay updated with our latest trends and collections.
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Bottom Bar */}
//       <div className="bg-gray-100">
//         <div className="container px-5 py-6 mx-auto flex flex-wrap items-center justify-between">
//           <p className="text-sm text-gray-500">
//             © Design And Create 2020 ZakirBlogs —
//             <a
//               href="https://twitter.com/knyttneve"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-gray-600 ml-1 hover:text-teal-500"
//             >
//               @knyttneve
//             </a>
//           </p>
//           <div className="flex space-x-3">
//             {["facebook", "twitter", "instagram", "linkedin"].map((platform, index) => (
//               <a
//                 key={index}
//                 href="#"
//                 className="text-gray-500 hover:text-teal-500 transition-transform duration-300 ease-in-out hover:-translate-y-1"
//               >
//                 <svg
//                   fill="currentColor"
//                   className="w-5 h-5"
//                   viewBox="0 0 24 24"
//                 >
//                   {/* Replace these with actual SVG paths for each platform */}
//                   <circle cx="12" cy="12" r="10" />
//                 </svg>
//               </a>
//             ))}
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
