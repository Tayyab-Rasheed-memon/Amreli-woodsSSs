"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

type ColorVariantKeys = "amber" | "teal" | "rose" | "indigo";

interface Feature {
  id: string;
  title: string;
  description: string;
  iconPath: string;
  color: ColorVariantKeys;
}

type StatType = {
  value: string;
  label: string;
  color: ColorVariantKeys;
};

const AboutUs = () => {
  const features: Feature[] = [
    {
      id: "hardwood-craftsmanship",
      title: "Hardwood Excellence",
      description: "Centuries-old woodworking with premium sustainable timber",
      iconPath: "M12 4v16m8-8H4M12 9l-3 3m0 0l3 3m-3-3h6",
      color: "amber",
    },
    {
      id: "sustainable-forestry",
      title: "Sustainable Forestry",
      description: "FSC-certified wood from responsibly managed forests",
      iconPath: "M12 4v16m8-8H4M12 9l-3 3m0 0l3 3m-3-3h6M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z",
      color: "teal",
    },
    {
      id: "luxury-finishes",
      title: "Artisan Finishes",
      description: "Hand-rubbed oils enhancing natural wood grain",
      iconPath: "M12 4v16m8-8H4M12 9l-3 3m0 0l3 3m-3-3h6M19 14l-7 7m0 0l-7-7m7 7V3",
      color: "rose",
    },
    {
      id: "bespoke-design",
      title: "Custom Craftsmanship",
      description: "Made-to-order furniture for discerning clients",
      iconPath: "M12 4v16m8-8H4M12 9l-3 3m0 0l3 3m-3-3h6M13 5l2 2-2 2m-2 6l2 2-2 2",
      color: "indigo",
    },
  ];

  const colorVariants = {
    amber: {
      bg: "bg-amber-100",
      text: "text-amber-800",
      border: "border-amber-200",
      hover: "hover:bg-amber-50",
    },
    teal: {
      bg: "bg-teal-100",
      text: "text-teal-800",
      border: "border-teal-200",
      hover: "hover:bg-teal-50",
    },
    rose: {
      bg: "bg-rose-100",
      text: "text-rose-800",
      border: "border-rose-200",
      hover: "hover:bg-rose-50",
    },
    indigo: {
      bg: "bg-indigo-100",
      text: "text-indigo-800",
      border: "border-indigo-200",
      hover: "hover:bg-indigo-50",
    },
  } as const;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="container mx-auto px-4 py-16"
    >
      {/* Hero Section */}
      <div className="mb-24 text-center relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-amber-700 via-teal-700 to-amber-800 py-24 shadow-2xl">
        <div className="absolute inset-0 bg-black/10" />
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-5xl font-serif mb-6 text-amber-50 relative z-10"
        >
          <span className="block text-3xl font-light mb-4">Welcome to</span>
          <span className="block text-7xl font-medium tracking-wider">Amreli Woods</span>
        </motion.h1>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-xl text-amber-100 max-w-2xl mx-auto relative z-10 space-y-2"
        >
          <p className="font-light">Crafting Legacy Through</p>
          <p className="text-4xl font-semibold">Timeless Furniture</p>
        </motion.div>
      </div>

      {/* Craftsmanship Showcase */}
      <div className="flex flex-col md:flex-row items-center gap-12 mb-24">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2 space-y-8 relative"
        >
          <h2 className="text-4xl font-serif text-amber-900 mb-4">
            <span className="block mb-2">Four Generations of</span>
            <span className="text-amber-700">Woodworking Mastery</span>
          </h2>
          <p className="text-lg text-amber-800 leading-relaxed mb-6 bg-white/50 backdrop-blur-sm p-6 rounded-xl shadow-lg">
            Since 1927, Amreli Woods has transformed premium hardwoods into 
            heirloom-quality furniture. Specializing in teak, rosewood, and 
            mahogany, our collections include iconic pieces like the 
            <span className="font-semibold text-amber-700"> Heritage Dining Table</span> and 
            <span className="font-semibold text-amber-700"> Artisan Bookcase</span>.
          </p>

          <div className="grid grid-cols-2 gap-4">
            {[
              { value: "95+", label: "Years Crafting", color: "teal" as ColorVariantKeys },
              { value: "3K+", label: "Happy Homes", color: "amber" as ColorVariantKeys },
              { value: "45+", label: "Design Awards", color: "indigo" as ColorVariantKeys },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                whileHover={{ scale: 1.05 }}
                className={`p-6 rounded-xl ${colorVariants[stat.color].bg} ${colorVariants[stat.color].border} border-2`}
              >
                <h3 className={`text-4xl font-bold mb-2 ${colorVariants[stat.color].text}`}>
                  {stat.value}
                </h3>
                <p className="text-amber-800">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="w-full md:w-1/2 relative group"
        >
          <div className="relative before:absolute before:inset-0 before:bg-amber-900/10 before:rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src="/ja.jpg"
              alt="Amreli Woods Craftsmanship"
              width={800}
              height={600}
              className="w-full h-[600px] object-cover rounded-3xl transform group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </motion.div>
      </div>

      {/* Artisan Features */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-16"
      >
        <h2 className="text-4xl font-serif text-center mb-16 text-amber-900">
          The <span className="text-amber-700">Amreli Difference</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              whileHover={{ y: -10, scale: 1.02 }}
              className={`p-8 rounded-xl ${colorVariants[feature.color].bg} ${colorVariants[feature.color].hover} transition-all duration-300 shadow-md hover:shadow-lg`}
            >
              <div className={`w-16 h-16 ${colorVariants[feature.color].bg} rounded-lg mb-6 flex items-center justify-center`}>
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`w-8 h-8 ${colorVariants[feature.color].text}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  animate={{ rotate: 360 }}
                  transition={{
                    repeat: Infinity,
                    duration: 8,
                    ease: "linear"
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={feature.iconPath}
                  />
                </motion.svg>
              </div>
              <h3 className={`text-2xl font-serif mb-3 ${colorVariants[feature.color].text}`}>
                {feature.title}
              </h3>
              <p className="text-amber-800 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Heritage Promise */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-24 bg-gradient-to-br from-amber-800 to-amber-700 rounded-3xl p-16 text-center text-amber-50 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('/woodgrain-pattern.png')] opacity-10" />
        <h3 className="text-4xl font-serif mb-6">Our Heritage Promise</h3>
        <p className="text-xl max-w-2xl mx-auto mb-8">
          Every Amreli Woods piece comes with a lifetime guarantee and 
          complimentary maintenance program, ensuring your furniture 
          becomes a family heirloom.
        </p>
        <div className="flex justify-center gap-6">
          {["FSC® Certified", "100-Year Warranty", "Carbon Neutral"].map((badge) => (
            <motion.div
              key={badge}
              whileHover={{ scale: 1.05 }}
              className="px-6 py-3 rounded-full bg-amber-100/10 backdrop-blur-sm border border-amber-200/20"
            >
              <span className="text-amber-100">{badge}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AboutUs;













































































// "use client";
// import React from "react";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import Image from "next/image";

// interface Feature {
//   id: string;
//   title: string;
//   description: string;
//   iconPath: string;
//   color: "amber" | "teal" | "rose" | "indigo";
// }

// const AboutUs = () => {
//   const features: Feature[] = [
//     {
//       id: "hardwood-craftsmanship",
//       title: "Hardwood Excellence",
//       description: "Centuries-old woodworking with premium sustainable timber",
//       iconPath: "M12 4v16m8-8H4M12 9l-3 3m0 0l3 3m-3-3h6",
//       color: "amber",
//     },
//     {
//       id: "sustainable-forestry",
//       title: "Sustainable Forestry",
//       description: "FSC-certified wood from responsibly managed forests",
//       iconPath: "M12 4v16m8-8H4M12 9l-3 3m0 0l3 3m-3-3h6M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z",
//       color: "teal",
//     },
//     {
//       id: "luxury-finishes",
//       title: "Artisan Finishes",
//       description: "Hand-rubbed oils enhancing natural wood grain",
//       iconPath: "M12 4v16m8-8H4M12 9l-3 3m0 0l3 3m-3-3h6M19 14l-7 7m0 0l-7-7m7 7V3",
//       color: "rose",
//     },
//     {
//       id: "bespoke-design",
//       title: "Custom Craftsmanship",
//       description: "Made-to-order furniture for discerning clients",
//       iconPath: "M12 4v16m8-8H4M12 9l-3 3m0 0l3 3m-3-3h6M13 5l2 2-2 2m-2 6l2 2-2 2",
//       color: "indigo",
//     },
//   ];

//   const colorVariants = {
//     amber: {
//       bg: "bg-amber-100",
//       text: "text-amber-800",
//       border: "border-amber-200",
//       hover: "hover:bg-amber-50",
//     },
//     teal: {
//       bg: "bg-teal-100",
//       text: "text-teal-800",
//       border: "border-teal-200",
//       hover: "hover:bg-teal-50",
//     },
//     rose: {
//       bg: "bg-rose-100",
//       text: "text-rose-800",
//       border: "border-rose-200",
//       hover: "hover:bg-rose-50",
//     },
//     indigo: {
//       bg: "bg-indigo-100",
//       text: "text-indigo-800",
//       border: "border-indigo-200",
//       hover: "hover:bg-indigo-50",
//     },
//   } as const;

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.8 }}
//       className="container mx-auto px-4 py-16"
//     >
//       {/* Hero Section */}
//       <div className="mb-24 text-center relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-amber-700 via-teal-700 to-amber-800 py-24 shadow-2xl">
//         <div className="absolute inset-0 bg-black/10" />
//         <motion.h1
//           initial={{ y: 50, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           className="text-5xl font-serif mb-6 text-amber-50 relative z-10"
//         >
//           <span className="block text-3xl font-light mb-4">Welcome to</span>
//           <span className="block text-7xl font-medium tracking-wider">Amreli Woods</span>
//         </motion.h1>
//         <motion.div
//           initial={{ scale: 0.9, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           className="text-xl text-amber-100 max-w-2xl mx-auto relative z-10 space-y-2"
//         >
//           <p className="font-light">Crafting Legacy Through</p>
//           <p className="text-4xl font-semibold">Timeless Furniture</p>
//         </motion.div>
//       </div>

//       {/* Craftsmanship Showcase */}
//       <div className="flex flex-col md:flex-row items-center gap-12 mb-24">
//         <motion.div
//           initial={{ x: -100, opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//           transition={{ duration: 0.8 }}
//           className="w-full md:w-1/2 space-y-8 relative"
//         >
//           <h2 className="text-4xl font-serif text-amber-900 mb-4">
//             <span className="block mb-2">Four Generations of</span>
//             <span className="text-amber-700">Woodworking Mastery</span>
//           </h2>
//           <p className="text-lg text-amber-800 leading-relaxed mb-6 bg-white/50 backdrop-blur-sm p-6 rounded-xl shadow-lg">
//             Since 1927, Amreli Woods has transformed premium hardwoods into 
//             heirloom-quality furniture. Specializing in teak, rosewood, and 
//             mahogany, our collections include iconic pieces like the 
//             <span className="font-semibold text-amber-700"> Heritage Dining Table</span> and 
//             <span className="font-semibold text-amber-700"> Artisan Bookcase</span>.
//           </p>

//           <div className="grid grid-cols-2 gap-4">
//             {[
//               { value: "95+", label: "Years Crafting", color: "teal" },
//               { value: "3K+", label: "Happy Homes", color: "amber" },
//               { value: "45+", label: "Design Awards", color: "indigo" },
//             ].map((stat, index) => (
//               <motion.div
//                 key={stat.label}
//                 whileHover={{ scale: 1.05 }}
//                 className={`p-6 rounded-xl ${colorVariants[stat.color].bg} ${colorVariants[stat.color].border} border-2`}
//               >
//                 <h3 className={`text-4xl font-bold mb-2 ${colorVariants[stat.color].text}`}>
//                   {stat.value}
//                 </h3>
//                 <p className="text-amber-800">{stat.label}</p>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>

//         <motion.div
//           initial={{ scale: 0.8, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           transition={{ duration: 1.2, delay: 0.4 }}
//           className="w-full md:w-1/2 relative group"
//         >
//           <div className="relative before:absolute before:inset-0 before:bg-amber-900/10 before:rounded-3xl overflow-hidden shadow-2xl">
//             <Image
//               src="/amreli-craftsmanship.jpg"
//               alt="Amreli Woods Craftsmanship"
//               width={800}
//               height={600}
//               className="w-full h-[600px] object-cover rounded-3xl transform group-hover:scale-105 transition-transform duration-500"
//             />
//           </div>
//         </motion.div>
//       </div>

//       {/* Artisan Features with Rotating Icons */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.8 }}
//         className="py-16"
//       >
//         <h2 className="text-4xl font-serif text-center mb-16 text-amber-900">
//           The <span className="text-amber-700">Amreli Difference</span>
//         </h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           {features.map((feature) => (
//             <motion.div
//               key={feature.id}
//               whileHover={{ y: -10, scale: 1.02 }}
//               className={`p-8 rounded-xl ${colorVariants[feature.color].bg} ${colorVariants[feature.color].hover} transition-all duration-300 shadow-md hover:shadow-lg`}
//             >
//               <div className={`w-16 h-16 ${colorVariants[feature.color].bg} rounded-lg mb-6 flex items-center justify-center`}>
//                 <motion.svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className={`w-8 h-8 ${colorVariants[feature.color].text}`}
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                   strokeWidth={2}
//                   animate={{ rotate: 360 }}
//                   transition={{
//                     repeat: Infinity,
//                     duration: 8,
//                     ease: "linear"
//                   }}
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d={feature.iconPath}
//                   />
//                 </motion.svg>
//               </div>
//               <h3 className={`text-2xl font-serif mb-3 ${colorVariants[feature.color].text}`}>
//                 {feature.title}
//               </h3>
//               <p className="text-amber-800 leading-relaxed">{feature.description}</p>
//             </motion.div>
//           ))}
//         </div>
//       </motion.div>

//       {/* Heritage Promise */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         className="mt-24 bg-gradient-to-br from-amber-800 to-amber-700 rounded-3xl p-16 text-center text-amber-50 relative overflow-hidden"
//       >
//         <div className="absolute inset-0 bg-[url('/woodgrain-pattern.png')] opacity-10" />
//         <h3 className="text-4xl font-serif mb-6">Our Heritage Promise</h3>
//         <p className="text-xl max-w-2xl mx-auto mb-8">
//           Every Amreli Woods piece comes with a lifetime guarantee and 
//           complimentary maintenance program, ensuring your furniture 
//           becomes a family heirloom.
//         </p>
//         <div className="flex justify-center gap-6">
//           {["FSC® Certified", "100-Year Warranty", "Carbon Neutral"].map((badge) => (
//             <motion.div
//               key={badge}
//               whileHover={{ scale: 1.05 }}
//               className="px-6 py-3 rounded-full bg-amber-100/10 backdrop-blur-sm border border-amber-200/20"
//             >
//               <span className="text-amber-100">{badge}</span>
//             </motion.div>
//           ))}
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// };

// export default AboutUs;








































// "use client";

// import React from "react";
// import { motion } from "framer-motion";
// import Link from "next/link";

// const AboutUs = () => {
//   const features = [
//     {
//       id: "artisan-craftsmanship",
//       title: "Artisan Craftsmanship",
//       description: "Centuries-old woodworking techniques meet modern design",
//       iconPath: "M12 4v16m8-8H4M12 9l-3 3m0 0l3 3m-3-3h6",
//     },
//     {
//       id: "sustainable-forestry",
//       title: "Sustainable Forestry",
//       description: "FSC-certified wood from responsibly managed forests",
//       iconPath: "M12 4v16m8-8H4M12 9l-3 3m0 0l3 3m-3-3h6M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z",
//     },
//     {
//       id: "luxury-finishes",
//       title: "Luxury Finishes",
//       description: "Hand-rubbed oils and natural wax preservatives",
//       iconPath: "M12 4v16m8-8H4M12 9l-3 3m0 0l3 3m-3-3h6M19 14l-7 7m0 0l-7-7m7 7V3",
//     },
//     {
//       id: "bespoke-design",
//       title: "Bespoke Design",
//       description: "Custom furniture solutions for discerning clients",
//       iconPath: "M12 4v16m8-8H4M12 9l-3 3m0 0l3 3m-3-3h6M13 5l2 2-2 2m-2 6l2 2-2 2",
//     },
//   ];

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.8 }}
//       className="container mx-auto px-4 py-16"
//     >
//       {/* Heritage Section */}
//       <div className="mb-24 text-center relative overflow-hidden rounded-2xl bg-wood-pattern bg-opacity-10 py-20 shadow-inner">
//         <div className="absolute inset-0 bg-gradient-to-b from-amber-900/20 to-amber-800/30" />
//         <motion.h1
//           initial={{ y: 50, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           className="text-5xl font-serif mb-6 text-amber-900 relative z-10"
//         >
//           Crafting Legacy Since 1927
//         </motion.h1>
//         <motion.p
//           initial={{ scale: 0.9, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           className="text-xl text-amber-800 max-w-2xl mx-auto relative z-10"
//         >
//           Four generations of master woodworkers preserving the art of fine furniture
//         </motion.p>
//       </div>

//       {/* Craftsmanship Showcase */}
//       <div className="flex flex-col md:flex-row items-center gap-8 mb-24">
//         <motion.div
//           initial={{ x: -100, opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//           transition={{ duration: 0.8 }}
//           className="w-full md:w-1/2 space-y-8 relative"
//         >
//           <div className="absolute -left-20 -top-20 w-48 h-48 bg-amber-100 rounded-full opacity-30 mix-blend-multiply" />
//           <h2 className="text-4xl font-serif text-amber-900 mb-4">
//             The Amreli Woods Ethos
//           </h2>
//           <p className="text-lg text-amber-800 leading-relaxed mb-6">
//             Where centuries-old Indian woodworking traditions converge with 
//             contemporary design philosophy. Each piece tells a story of 
//             carefully selected hardwoods, time-honored joinery techniques, 
//             and finishes that enhance natural beauty.
//           </p>
//           <div className="grid grid-cols-2 gap-4">
//             <div className="p-4 bg-amber-50 rounded-lg">
//               <h3 className="font-semibold text-amber-900">75+</h3>
//               <p className="text-sm text-amber-700">Master Craftsmen</p>
//             </div>
//             <div className="p-4 bg-amber-50 rounded-lg">
//               <h3 className="font-semibold text-amber-900">3000+</h3>
//               <p className="text-sm text-amber-700">Unique Designs</p>
//             </div>
//           </div>
//           <Link href="/products">
//             <motion.button
//               whileHover={{
//                 scale: 1.05,
//                 backgroundColor: "#5B443E",
//                 color: "#FEF3C7",
//               }}
//               whileTap={{ scale: 0.95 }}
//               className="bg-amber-900 text-amber-50 px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
//             >
//               Explore Collections
//             </motion.button>
//           </Link>
//         </motion.div>

//         <motion.div
//           initial={{ scale: 0.8, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           transition={{ duration: 1.2, delay: 0.4 }}
//           className="w-full md:w-1/2 relative group"
//         >
//           <div className="relative before:absolute before:inset-0 before:bg-amber-900/10 before:rounded-xl overflow-hidden">
//             <img
//               src="/craftsmanship-showcase.jpg"
//               alt="Amreli Woods Craftsmanship"
//               className="w-full h-[500px] object-cover rounded-xl transform group-hover:scale-105 transition-transform duration-500"
//             />
//           </div>
//           <div className="absolute -right-8 -bottom-8 bg-white p-6 rounded-xl shadow-lg border border-amber-100">
//             <h4 className="font-serif text-amber-900 mb-2">Did You Know?</h4>
//             <p className="text-sm text-amber-700 max-w-[200px]">
//               Our teak undergoes 18-month natural drying process for ultimate stability
//             </p>
//           </div>
//         </motion.div>
//       </div>

//       {/* Artisan Features */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.8, delay: 0.6 }}
//         className="py-16"
//       >
//         <h2 className="text-3xl font-serif text-center mb-12 text-amber-900">
//           Pillars of Excellence
//         </h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
//           {features.map((feature) => (
//             <motion.div
//               key={feature.id}
//               whileHover={{
//                 y: -10,
//                 rotate: -1,
//                 boxShadow: "0 20px 40px rgba(91, 68, 62, 0.15)",
//               }}
//               whileTap={{ scale: 0.98 }}
//               className="bg-white p-6 rounded-xl border border-amber-100 hover:border-amber-200 relative overflow-hidden"
//             >
//               <div className="absolute inset-0 bg-wood-pattern opacity-5 z-0" />
//               <motion.svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-12 w-12 mx-auto mb-6 text-amber-700 relative z-10"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 initial={{ rotate: 0 }}
//                 animate={{ rotate: 360 }}
//                 transition={{
//                   duration: 8,
//                   repeat: Infinity,
//                   ease: "linear",
//                 }}
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={1.5}
//                   d={feature.iconPath}
//                 />
//               </motion.svg>
//               <h3 className="text-xl font-serif text-center mb-3 text-amber-900">
//                 {feature.title}
//               </h3>
//               <p className="text-sm text-center text-amber-700 leading-relaxed">
//                 {feature.description}
//               </p>
//             </motion.div>
//           ))}
//         </div>
//       </motion.div>

//       {/* Sustainable Promise */}
//       <div className="mt-24 bg-amber-50 rounded-2xl p-12 text-center border border-amber-100 relative overflow-hidden">
//         <div className="absolute -top-20 -right-20 w-64 h-64 bg-amber-200 rounded-full opacity-20" />
//         <motion.h3
//           initial={{ scale: 0.9 }}
//           animate={{ scale: 1 }}
//           className="text-3xl font-serif mb-6 text-amber-900"
//         >
//           Our Sustainable Promise
//         </motion.h3>
//         <p className="text-amber-700 max-w-3xl mx-auto mb-8">
//           For every tree used in our creations, we plant three in our managed 
//           forests. Our closed-loop production system ensures 98% material 
//           utilization with zero chemical waste.
//         </p>
//         <div className="flex justify-center gap-4">
//           <div className="bg-white p-4 rounded-lg shadow-sm">
//             <span className="text-amber-900 font-semibold">FSC® Certified</span>
//           </div>
//           <div className="bg-white p-4 rounded-lg shadow-sm">
//             <span className="text-amber-900 font-semibold">Carbon Neutral</span>
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default AboutUs;




























































































































































// "use client";

// import React from "react";
// import { motion } from "framer-motion";
// import Link from "next/link";

// const AboutUs = () => {
//   const features = [
//     {
//       id: "quality-materials",
//       title: "Quality Materials",
//       description: "We use only the best materials for durability and comfort.",
//       iconPath: "M12 4v16m8-8H4",
//     },
//     {
//       id: "ergonomic-design",
//       title: "Ergonomic Design",
//       description: "Our chairs are designed to support your posture and comfort.",
//       iconPath: "M12 4v16m8-8H4",
//     },
//     {
//       id: "modern-aesthetics",
//       title: "Modern Aesthetics",
//       description: "Our designs are sleek and fit seamlessly into any space.",
//       iconPath: "M12 4v16m8-8H4",
//     },
//     {
//       id: "sustainability",
//       title: "Sustainability",
//       description: "We prioritize eco-friendly materials and processes.",
//       iconPath: "M12 4v16m8-8H4",
//     },
//   ];

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.8 }}
//       className="container mx-auto px-4 py-16"
//     >
//       {/* Hero Section */}
//       <div className="flex flex-col md:flex-row items-center gap-8">
//         <motion.div
//           initial={{ x: -100, opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//           transition={{ duration: 0.8 }}
//           className="w-full md:w-1/2 bg-gradient-to-r from-teal-500 to-green-400 p-8 rounded-md shadow-lg hover:shadow-xl transition-all duration-300"
//         >
//           <h2 className="text-4xl font-bold text-white mb-4">
//             About Us - Comforty
//           </h2>
//           <p className="text-white text-lg mb-6 leading-relaxed">
//             At Comforty, we believe that the right chair can transform your
//             space and elevate your comfort. Specializing in ergonomic design,
//             premium materials, and modern aesthetics, we craft chairs that
//             seamlessly blend style with functionality.
//           </p>
       
//           <a href="/Producte">
//   <motion.button
//     whileHover={{
//       scale: 1.1,
//       backgroundColor: "#e0f2f1",
//       color: "#007bff",
//     }}
//     whileTap={{ scale: 0.9 }}
//     className="bg-white text-teal-500 px-6 py-2 rounded-lg font-semibold shadow-md hover:bg-teal-100 transition-all duration-300"
//   >
//     View Collection
//   </motion.button>
// </a>


//         </motion.div>

//         <motion.div
//           initial={{ scale: 0.8, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           transition={{ duration: 1.2, delay: 0.4 }}
//           className="w-full md:w-1/2"
//         >
//           <img
//             src="/download.jpeg"
//             alt="Comforty Chair"
//             className="w-full h-auto rounded-md shadow-lg hover:shadow-xl transition-transform duration-300 hover:scale-105"
//           />
//         </motion.div>
//       </div>

//       {/* Features Section */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.8, delay: 0.6 }}
//         className="py-16"
//       >
//         <h2 className="text-3xl font-bold text-center mb-12">
//           What Makes Our Brand Different
//         </h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
//           {features.map((feature) => (
//             <motion.div
//               key={feature.id}
//               whileHover={{
//                 scale: 1.1,
//                 rotate: 2,
//                 boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
//               }}
//               whileTap={{ scale: 0.95 }}
//               className="bg-gray-100 p-6 rounded-lg text-center shadow-md hover:shadow-lg transition-all duration-300"
//             >
//               <motion.svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-12 w-12 mx-auto mb-4 text-teal-500"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 initial={{ rotate: 0 }}
//                 animate={{ rotate: 360 }}
//                 transition={{
//                   duration: 2,
//                   repeat: Infinity,
//                   ease: "easeInOut",
//                 }}
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d={feature.iconPath}
//                 />
//               </motion.svg>
//               <h3 className="text-lg font-semibold">{feature.title}</h3>
//               <p className="text-gray-600 leading-relaxed">{feature.description}</p>
//             </motion.div>
//           ))}
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// };

// export default AboutUs;

// "use client";

// import React from "react";
// import { motion } from "framer-motion";

// const AboutUs = () => {
//   const features = [
//     {
//       id: "quality-materials",
//       title: "Quality Materials",
//       description: "We use only the best materials for durability and comfort.",
//       iconPath: "M12 4v16m8-8H4",
//     },
//     {
//       id: "ergonomic-design",
//       title: "Ergonomic Design",
//       description: "Our chairs are designed to support your posture and comfort.",
//       iconPath: "M12 4v16m8-8H4",
//     },
//     {
//       id: "modern-aesthetics",
//       title: "Modern Aesthetics",
//       description: "Our designs are sleek and fit seamlessly into any space.",
//       iconPath: "M12 4v16m8-8H4",
//     },
//     {
//       id: "sustainability",
//       title: "Sustainability",
//       description: "We prioritize eco-friendly materials and processes.",
//       iconPath: "M12 4v16m8-8H4",
//     },
//   ];

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.8 }}
//       className="container mx-auto px-4 py-16"
//     >
//       {/* Hero Section */}
//       <div className="flex flex-col md:flex-row items-center gap-8">
//         <motion.div
//           initial={{ x: -100, opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//           transition={{ duration: 0.8 }}
//           className="w-full md:w-1/2 bg-gradient-to-r from-teal-500 to-green-400 p-8 rounded-md shadow-lg hover:shadow-xl transition-all duration-300"
//         >
//           <h2 className="text-4xl font-bold text-white mb-4">
//             About Us - Comforty
//           </h2>
//           <p className="text-white text-lg mb-6">
//             At Comforty, we believe that the right chair can transform your
//             space and elevate your comfort. Specializing in ergonomic design,
//             premium materials, and modern aesthetics, we craft chairs that
//             seamlessly blend style with functionality.
//           </p>
//           <motion.button
//             whileHover={{ scale: 1.1, backgroundColor: "#e0f2f1" }}
//             whileTap={{ scale: 0.9 }}
//             className="bg-white text-teal-500 px-6 py-2 rounded-lg font-semibold shadow-md hover:bg-teal-100 transition-all duration-300"
//           >
//             View Collection
//           </motion.button>
//         </motion.div>

//         <motion.div
//           initial={{ scale: 0.8, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           transition={{ duration: 1.2, delay: 0.4 }}
//           className="w-full md:w-1/2"
//         >
//           <img
//             src="/download.jpeg"
//             alt="Chair"
//             className="w-full h-auto rounded-md shadow-lg hover:shadow-xl transition-transform duration-300 hover:scale-105"
//           />
//         </motion.div>
//       </div>

//       {/* Features Section */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.8, delay: 0.6 }}
//         className="py-16"
//       >
//         <h2 className="text-3xl font-bold text-center mb-12">
//           What Makes Our Brand Different
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//           {features.map((feature) => (
//             <motion.div
//               key={feature.id}
//               whileHover={{ scale: 1.1, rotate: 2 }}
//               whileTap={{ scale: 0.95 }}
//               className="bg-gray-100 p-6 rounded-lg text-center shadow-md hover:shadow-lg transition-all duration-300"
//             >
//               <motion.svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-12 w-12 mx-auto mb-4 text-teal-500"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 initial={{ rotate: 0 }}
//                 animate={{ rotate: 360 }}
//                 transition={{
//                   duration: 1.5,
//                   repeat: Infinity,
//                   ease: "easeInOut",
//                 }}
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d={feature.iconPath}
//                 />
//               </motion.svg>
//               <h3 className="text-lg font-semibold">{feature.title}</h3>
//               <p className="text-gray-600">{feature.description}</p>
//             </motion.div>
//           ))}
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// };

// export default AboutUs;
  
// import React from 'react';

// const AboutUs = () => {
//   const features = [
//     {
//       id: 'quality-materials',
//       title: 'Quality Materials',
//       description: 'We use only the best materials for durability and comfort.',
//       iconPath: 'M12 4v16m8-8H4',
//     },
//     {
//       id: 'ergonomic-design',
//       title: 'Ergonomic Design',
//       description:
//         'Our chairs are designed to support your posture and comfort.',
//       iconPath: 'M12 4v16m8-8H4',
//     },
//     {
//       id: 'modern-aesthetics',
//       title: 'Modern Aesthetics',
//       description:
//         'Our designs are sleek and fit seamlessly into any space.',
//       iconPath: 'M12 4v16m8-8H4',
//     },
//     {
//       id: 'sustainability',
//       title: 'Sustainability',
//       description:
//         'We prioritize eco-friendly materials and processes.',
//       iconPath: 'M12 4v16m8-8H4',
//     },
//   ];

//   return (
//     <div className="container mx-auto px-4">
//       <div className="flex flex-col md:flex-row gap-8 py-16">
//         <div className="w-full md:w-1/2 bg-teal-500 p-8 rounded-md transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-2">
//           <h2 className="text-3xl font-bold text-white mb-4">
//             About Us - Comforty
//           </h2>
//           <p className="text-white text-lg mb-6">
//             At Comforty, we believe that the right chair can transform your
//             space and elevate your comfort. Specializing in ergonomic design,
//             premium materials, and modern aesthetics, we craft chairs that
//             seamlessly blend style with functionality.
//           </p>
//           <button className="bg-white text-teal-500 px-4 py-2 rounded-md transition-transform transform hover:scale-105 hover:bg-teal-100 duration-300">
//             View collection
//           </button>
//         </div>
//         <div className="w-full md:w-1/2 transition-transform duration-300 hover:scale-105">
//           <img
//             src="/download.jpeg"
//             alt="chair"
//             className="w-full h-auto rounded-md"
//           />
//         </div>
//       </div>

//       <div className="flex flex-col gap-8 py-16">
//         <h2 className="text-2xl font-bold text-center mb-8 transition-colors duration-300 hover:text-teal-500">
//           What Makes Our Brand Different
//         </h2>

//         <div className="flex flex-col md:flex-row gap-8">
//           {features.map((item) => (
//             <div
//               key={item.id}
//               className="w-full md:w-1/4 bg-gray-100 p-8 rounded-md text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-2"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-12 w-12 mx-auto mb-4 text-teal-500 transition-transform transform hover:scale-110 duration-300"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d={item.iconPath}
//                 />
//               </svg>
//               <h3 className="text-lg font-semibold">{item.title}</h3>
//               <p className="text-gray-600">{item.description}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AboutUs;
