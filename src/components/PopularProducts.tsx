
import React from 'react';
import { motion } from 'framer-motion';

const Newsletter = () => {
  return (
    <motion.div
      id="AF"
      className="bg-gradient-to-r from-blue-50 to-blue-100 p-12 mt-[150px] rounded-3xl shadow-2xl max-w-5xl mx-auto"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Header Section */}
      <motion.header
        className="text-center mb-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h1 className="text-5xl font-bold text-gray-800">Stay Updated!</h1>
        <p className="text-lg text-gray-600 mt-4">Get exclusive deals, product updates, and more delivered to your inbox.</p>
      </motion.header>

      {/* Email Input Section */}
      <motion.div
        id="AH"
        className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <motion.input
          type="email"
          placeholder="Enter your email..."
          id="AI"
          className="border border-gray-300 rounded-lg px-6 py-4 w-full sm:w-auto focus:outline-none focus:ring-4 focus:ring-blue-500 transition-transform"
          whileFocus={{ scale: 1.05 }}
        />
        <motion.button
          id="AJ"
          whileHover={{ scale: 1.1, rotate: 1 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg shadow-lg transition-all"
        >
          Subscribe
        </motion.button>
      </motion.div>

      {/* Instagram Section */}
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-gray-800">Explore Us on Instagram</h2>
        <p className="text-gray-600 mt-3">Follow our journey and get inspired.</p>

        {/* Go To Button */}
        <motion.button
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.open('https://www.youtube.com/@itboyvlogs?si=52Oq_ul9_8nd030z', '_blank')}
        >
          Go To
        </motion.button>
      </motion.div>

      {/* Image Gallery Section */}
      <motion.div
        id="AL"
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 mb-10"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { staggerChildren: 0.3, delayChildren: 0.8 },
          },
        }}
      >
        {[
          { id: 'Chair1', src: '/download (1).jpeg', tag: ' Sofa Set' },
          { id: 'Chair2', src: '/download.jpg', tag: 'Classic Bed Set' },
          { id: 'Chair3', src: '/download (4).jpeg', tag: 'Dining Table' },
          { id: 'Chair4', src: '/Cozy Chair.jpg', tag: 'Cozy Chair' },
          { id: 'Chair5', src: '/Round Dining Table.avif', tag: ' Round Table' },
          { id: 'Chair6', src: '/d.webp', tag: 'Minimalist Chair' },
        ].map(({ id, src, tag }) => (
          <motion.div
            key={id}
            className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
          >
            <motion.img
              src={src}
              alt={tag}
              id={id}
              className="object-cover w-full h-full transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition duration-300 flex items-center justify-center">
              <motion.p
                className="text-white text-lg font-bold opacity-0 group-hover:opacity-100"
                whileHover={{ scale: 1.2 }}
              >
                {tag}
              </motion.p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Popular Furniture Section */}
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Popular Furniture</h2>
        <p className="text-gray-600 mb-8">Browse some of our best-selling furniture pieces below.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { id: 'Furniture1', src: '/download (3).jpg', tag: 'Earthly Elegance', price: '$399.99' },
            { id: 'Furniture2', src: '/images.jpg', tag: 'Cloud Nine', price: '$249.99' },
            { id: 'Furniture3', src: '/images.jpeg', tag: 'Sofa chairs', price: '$99.99' },
            { id: 'Furniture4', src: '/download (1).jpg', tag: 'Moonlit Haven', price: '$499.99' },
          ].map(({ id, src, tag, price }) => (
            <motion.div
              key={id}
              className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-2 transition-all"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={src}
                alt={tag}
                className="rounded-md mb-4 w-full"
              />
              <h3 className="text-xl font-semibold text-gray-700">{tag}</h3>
              <p className="text-gray-600 mt-2">{price}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Newsletter;




















// import React from 'react';
// import { motion } from 'framer-motion';

// const Newsletter = () => {
//   return (
//     <motion.div
//       id="AF"
//       className="bg-gradient-to-r from-blue-50 to-blue-100 p-12 mt-[150px] rounded-3xl shadow-2xl max-w-5xl mx-auto"
//       initial={{ opacity: 0, scale: 0.8 }}
//       animate={{ opacity: 1, scale: 1 }}
//       transition={{ duration: 1 }}
//     >
//       {/* Header Section */}
//       <motion.header
//         className="text-center mb-10"
//         initial={{ opacity: 0, y: -30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8, delay: 0.2 }}
//       >
//         <h1 className="text-5xl font-bold text-gray-800">Stay Updated!</h1>
//         <p className="text-lg text-gray-600 mt-4">Get exclusive deals, product updates, and more delivered to your inbox.</p>
//       </motion.header>

//       {/* Email Input Section */}
//       <motion.div
//         id="AH"
//         className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-10"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8, delay: 0.4 }}
//       >
//         <motion.input
//           type="email"
//           placeholder="Enter your email..."
//           id="AI"
//           className="border border-gray-300 rounded-lg px-6 py-4 w-full sm:w-auto focus:outline-none focus:ring-4 focus:ring-blue-500 transition-transform"
//           whileFocus={{ scale: 1.05 }}
//         />
//         <motion.button
//           id="AJ"
//           whileHover={{ scale: 1.1, rotate: 1 }}
//           whileTap={{ scale: 0.95 }}
//           className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg shadow-lg transition-all"
//         >
//           Subscribe
//         </motion.button>
//       </motion.div>

//       {/* Instagram Section */}
//       <motion.div
//         className="text-center mb-10"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8, delay: 0.6 }}
//       >
//         <h2 className="text-3xl font-bold text-gray-800">Explore Us on Instagram</h2>
//         <p className="text-gray-600 mt-3">Follow our journey and get inspired.</p>
//       </motion.div>

//       {/* Image Gallery Section */}
//       <motion.div
//         id="AL"
//         className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 mb-10"
//         initial="hidden"
//         animate="visible"
//         variants={{
//           hidden: { opacity: 0, y: 50 },
//           visible: {
//             opacity: 1,
//             y: 0,
//             transition: { staggerChildren: 0.3, delayChildren: 0.8 },
//           },
//         }}
//       >
//         {[
//           { id: 'Chair1', src: '/download (1).jpeg', tag: ' Sofa Set' },
//           { id: 'Chair2', src: '/download.jpg', tag: 'Classic Bed Set' },
//           { id: 'Chair3', src: '/download (4).jpeg', tag: 'Dining Table' },
//           { id: 'Chair4', src: '/Cozy Chair.jpg', tag: 'Cozy Chair' },
//           { id: 'Chair5', src: '/Round Dining Table.avif', tag: ' Round Table' },
//           { id: 'Chair6', src: '/d.webp', tag: 'Minimalist Chair' },
//         ].map(({ id, src, tag }) => (
//           <motion.div
//             key={id}
//             className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-xl"
//             whileHover={{ scale: 1.05 }}
//             transition={{ duration: 0.4 }}
//           >
//             <motion.img
//               src={src}
//               alt={tag}
//               id={id}
//               className="object-cover w-full h-full transition-transform duration-500"
//             />
//             <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition duration-300 flex items-center justify-center">
//               <motion.p
//                 className="text-white text-lg font-bold opacity-0 group-hover:opacity-100"
//                 whileHover={{ scale: 1.2 }}
//               >
//                 {tag}
//               </motion.p>
//             </div>
//           </motion.div>
//         ))}
//       </motion.div>

//       {/* Popular Furniture Section */}
//       <motion.div
//         className="text-center mb-10"
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8, delay: 0.7 }}
//       >
//         <h2 className="text-3xl font-bold text-gray-800 mb-6">Popular Furniture</h2>
//         <p className="text-gray-600 mb-8">Browse some of our best-selling furniture pieces below.</p>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           {[
//             { id: 'Furniture1', src: '/download (3).jpg', tag: 'Earthly Elegance', price: '$399.99' },
//             { id: 'Furniture2', src: '/images.jpg', tag: 'Cloud Nine', price: '$249.99' },
//             { id: 'Furniture3', src: '/images.jpeg', tag: 'Sofa chairs', price: '$99.99' },
//             { id: 'Furniture4', src: '/download (1).jpg', tag: 'Moonlit Haven', price: '$499.99' },
//           ].map(({ id, src, tag, price }) => (
//             <motion.div
//               key={id}
//               className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-2 transition-all"
//               whileHover={{ scale: 1.05 }}
//               transition={{ duration: 0.5 }}
//             >
//               <img
//                 src={src}
//                 alt={tag}
//                 className="rounded-md mb-4 w-full"
//               />
//               <h3 className="text-xl font-semibold text-gray-700">{tag}</h3>
//               <p className="text-gray-600 mt-2">{price}</p>
//             </motion.div>
//           ))}
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// };

// export default Newsletter;



















































// import React from 'react';  

// const Newsletter = () => {
//   return (
//     <div id="AF" className="bg-gray-100 p-10 mt-[150px]">
//       <h2 id="AG" className="text-2xl font-bold mb-4">Or Subscribe To The Newsletter</h2>
//       <div id="AH" className="flex items-center">
//         <input
//           type="email"
//           placeholder="Email Address..."
//           id="AI"
//           className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <button id="AJ" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md ml-4">
//           SUBMIT
//         </button>
//       </div>
//       <h3 id="AK" className="text-xl font-bold mt-8">Follow Products And Discounts On Instagram</h3>
//       <div id="AL" className="grid grid-cols-6 gap-4 mt-4">
//         <img
//           src="/.png"
//           alt="Chair 1"
//           id="AM"
//           className="rounded-md"
//         />
//         <img
//           src="/Image (8).png"
//           alt="Chair 2"
//           id="AN"
//           className="rounded-md"
//         />
//         <img
//           src="/Image (1).png"
//           alt="Chair 3"
//           id="AO"
//           className="rounded-md"
//         />
//         <img
//           src="/Image (2).png"
//           alt="Chair 4"
//           id="AP"
//           className="rounded-md"
//         />
//         <img
//           src="/Image (4).png"
//           alt="Chair 5"
//           id="AQ"
//           className="rounded-md"
//         />
//         <img
//           src="/Image (6).png"
//           alt="Chair 6"
//           id="AR"
//           className="rounded-md"
//         />
//       </div>
//     </div>
//   );
// };

// export default Newsletter;
