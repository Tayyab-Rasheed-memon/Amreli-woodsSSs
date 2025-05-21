import React from "react";

const Image = () => {
  // Function to handle feature clicks
  const handleFeatureClick = (featureName: string) => {
    alert(`${featureName} clicked!`);
  };

  return (
    <div className="flex flex-wrap justify-center sm:justify-between items-center gap-6 p-10">
      {/* Feature 1 */}
      <div
        id="I"
        onClick={() => handleFeatureClick("High Quality")}
        className="flex items-center gap-2 transform transition-transform duration-500 hover:scale-110 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-blue-600 animate-bounce"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l3 3l3-3m-3 3H12m2.5 3.5a2.121 2.121 0 01-2.12 2.12 2.121 2.121 0 01-2.12-2.12 2.121 2.121 0 012.12-2.12 2.121 2.121 0 012.12 2.12"
          />
        </svg>
        <div>
          <h3 className="text-lg font-bold text-center sm:text-left">High Quality</h3>
          <p className="text-sm text-gray-500 text-center sm:text-left">
            crafted from top materials
          </p>
        </div>
      </div>

      {/* Feature 2 */}
      <div
        id="J"
        onClick={() => handleFeatureClick("User Friendly")}
        className="flex items-center gap-2 transform transition-transform duration-500 hover:scale-110 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-green-500 animate-spin"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h18v18H3z"
          />
        </svg>
        <div>
          <h3 className="text-lg font-bold text-center sm:text-left">User Friendly</h3>
          <p className="text-sm text-gray-500 text-center sm:text-left">
            easy to navigate and use
          </p>
        </div>
      </div>

      {/* Feature 3 */}
      <div
        id="K"
        onClick={() => handleFeatureClick("Responsive Design")}
        className="flex items-center gap-2 transform transition-transform duration-500 hover:scale-110 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-purple-600 animate-pulse"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l3 3l3-3m-3 3H12m2.5 3.5a2.121 2.121 0 01-2.12 2.12 2.121 2.121 0 01-2.12-2.12 2.121 2.121 0 012.12-2.12 2.121 2.121 0 012.12 2.12"
          />
        </svg>
        <div>
          <h3 className="text-lg font-bold text-center sm:text-left">Responsive Design</h3>
          <p className="text-sm text-gray-500 text-center sm:text-left">
            looks great on all devices
          </p>
        </div>
      </div>
    </div>
  );
};

export default Image;









// import React from 'react';

// const Image = () => {
//   return (
//     <div className="flex justify-between items-center gap-10 p-10">
//       {/* Feature 1 */}
//       <div id="I" className="flex items-center gap-2 transform transition-transform duration-500 hover:scale-110">
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-8 w-8 text-blue-600 animate-bounce"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M9 12l3 3l3-3m-3 3H12m2.5 3.5a2.121 2.121 0 01-2.12 2.12 2.121 2.121 0 01-2.12-2.12 2.121 2.121 0 012.12-2.12 2.121 2.121 0 012.12 2.12"
//           />
//         </svg>
//         <div>
//           <h3 className="text-lg font-bold">High Quality</h3>
//           <p className="text-sm text-gray-500">crafted from top materials</p>
//         </div>
//       </div>

//       {/* Feature 2 */}
//       <div id="J" className="flex items-center gap-2 transform transition-transform duration-500 hover:scale-110">
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-8 w-8 text-green-500 animate-spin"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M3 3h18v18H3z"
//           />
//         </svg>
//         <div>
//           <h3 className="text-lg font-bold">User Friendly</h3>
//           <p className="text-sm text-gray-500">easy to navigate and use</p>
//         </div>
//       </div>

//       {/* Feature 3 */}
//       <div id="K" className="flex items-center gap-2 transform transition-transform duration-500 hover:scale-110">
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-8 w-8 text-purple-600 animate-pulse"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M9 12l3 3l3-3m-3 3H12m2.5 3.5a2.121 2.121 0 01-2.12 2.12 2.121 2.121 0 01-2.12-2.12 2.121 2.121 0 012.12-2.12 2.121 2.121 0 012.12 2.12"
//           />
//         </svg>
//         <div>
//           <h3 className="text-lg font-bold">Responsive Design</h3>
//           <p className="text-sm text-gray-500">looks great on all devices</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Image;
