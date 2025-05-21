"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FiHelpCircle } from "react-icons/fi";
import { MdLocalShipping } from "react-icons/md";
import { motion } from "framer-motion";

const Top_Header: React.FC = () => {
  const { t, i18n } = useTranslation(); // Destructure i18n and t from useTranslation
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  // Function to handle language change
  const handleLanguageChange = (language: string) => {
    if (i18n?.changeLanguage) {
      i18n.changeLanguage(language); // Change the language
    } else {
      console.error("i18n or changeLanguage method is not available");
    }
  };

  // Bounce animation for icons
  const bounceAnimation = {
    animate: { y: [0, -5, 0] },
    transition: { repeat: Infinity, duration: 1 },
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center bg-gradient-to-r from-[#272343] via-[#1f2c3b] to-[#272343] text-white py-3 px-4 md:px-6 text-sm">
      {/* Left Section */}
      <div className="flex items-center gap-2">
        <motion.div
          className="relative group flex items-center gap-2"
          whileHover={{ scale: 1.1 }}
          {...bounceAnimation}
        >
          <MdLocalShipping className="text-lg text-yellow-300" />
          <span className="absolute left-8 top-[-10px] text-xs bg-gray-800 text-white px-2 py-1 rounded hidden group-hover:block">
            {t("free_shipping_tooltip")}
          </span>
        </motion.div>
        <span>{t("free_shipping")} &#10003;</span>
      </div>

      {/* Right Section */}
      <div className="flex flex-col md:flex-row items-center gap-4 mt-2 md:mt-0">
        {/* Language Selector */}
        <motion.div
          className="relative group"
          whileHover={{ scale: 1.05 }}
          {...bounceAnimation}
        >
          <select
            onChange={(e) => handleLanguageChange(e.target.value)}
            value={i18n.language}
            className="bg-transparent border border-gray-400 rounded text-white px-3 py-1 cursor-pointer appearance-none hover:border-yellow-300 transition-all"
          >
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
            <option value="zh">中文</option>
            <option value="ur">اردو</option>
          </select>
          <div className="absolute top-full left-0 w-full bg-[#1f2c3b] text-center text-gray-300 text-xs hidden group-hover:block">
            {t("change_language_tooltip")}
          </div>
        </motion.div>

        {/* FAQs */}
        <motion.span
          className="flex items-center gap-1 cursor-pointer hover:underline hover:text-yellow-300 transition-all"
          whileHover={{ scale: 1.1 }}
          {...bounceAnimation}
          onClick={() => window.open("/faqs", "_blank")}
          title={t("faqs_tooltip")}
        >
          <FiHelpCircle className="text-lg" />
          
        </motion.span>

        {/* Need Help */}
        <div className="relative">
          <motion.span
            onClick={() => setIsHelpOpen(!isHelpOpen)}
            className="cursor-pointer hover:underline hover:text-yellow-300 transition-all"
            whileHover={{ scale: 1.1 }}
            {...bounceAnimation}
          >
            {t("need_help")}
          </motion.span>
          {isHelpOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute right-0 top-full mt-2 bg-gray-800 text-white text-sm rounded shadow-lg p-4 z-10"
            >
              <p>{t("contact_support")}</p>
              <ul className="mt-2">
                <li>
                  <a href="tel:+1234567890" className="hover:text-yellow-300">
                    {t("call_us")}: +1-234-567-890
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:support@example.com"
                    className="hover:text-yellow-300"
                  >
                    {t("email_us")}: support@example.com
                  </a>
                </li>
              </ul>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Top_Header;

















// "use client";

// import React, { useState } from "react";
// import { useTranslation } from "react-i18next";
// import { FiHelpCircle } from "react-icons/fi";
// import { MdLocalShipping } from "react-icons/md";

// const Top_Header: React.FC = () => {
//   const { t, i18n } = useTranslation(); // Destructure i18n and t from useTranslation
//   const [isHelpOpen, setIsHelpOpen] = useState(false);

//   // Function to handle language change
//   const handleLanguageChange = (language: string) => {
//     if (i18n?.changeLanguage) {
//       i18n.changeLanguage(language); // Change the language
//     } else {
//       console.error("i18n or changeLanguage method is not available");
//     }
//   };

//   return (
//     <div className="flex justify-between items-center bg-gradient-to-r from-[#272343] via-[#1f2c3b] to-[#272343] text-white py-3 px-6 text-sm">
//       {/* Left Section */}
//       <div className="flex items-center gap-2">
//         <div className="relative group">
//           <MdLocalShipping className="text-lg text-yellow-300" />
//           <span className="absolute left-8 top-[-10px] text-xs bg-gray-800 text-white px-2 py-1 rounded hidden group-hover:block">
//             {t("free_shipping_tooltip")}
//           </span>
//         </div>
//         <span>{t("free_shipping")} &#10003;</span>
//       </div>

//       {/* Right Section */}
//       <div className="flex items-center gap-6">
//         {/* Language Selector */}
//         <div className="relative group">
//           <select
//             onChange={(e) => handleLanguageChange(e.target.value)}
//             value={i18n.language}
//             className="bg-transparent border border-gray-400 rounded text-white px-3 py-1 cursor-pointer appearance-none hover:border-yellow-300 transition-all"
//           >
//             <option value="en">English</option>
//             <option value="es">Español</option>
//             <option value="fr">Français</option>
//             <option value="de">Deutsch</option>
//             <option value="zh">中文</option>
//             <option value="ur">اردو</option>
//           </select>
//           <div className="absolute top-full left-0 w-full bg-[#1f2c3b] text-center text-gray-300 text-xs hidden group-hover:block">
//             {t("change_language_tooltip")}
//           </div>
//         </div>

//         {/* FAQs */}
//         <span
//           className="flex items-center gap-1 cursor-pointer hover:underline hover:text-yellow-300 transition-all"
//           onClick={() => window.open("/faqs", "_blank")}
//           title={t("faqs_tooltip")}
//         >
//           <FiHelpCircle className="text-lg" />
//           {t("faqs")}
//         </span>

//         {/* Need Help */}
//         <div className="relative">
//           <span
//             onClick={() => setIsHelpOpen(!isHelpOpen)}
//             className="cursor-pointer hover:underline hover:text-yellow-300 transition-all"
//           >
//             {t("need_help")}
//           </span>
//           {isHelpOpen && (
//             <div className="absolute right-0 top-full mt-2 bg-gray-800 text-white text-sm rounded shadow-lg p-4">
//               <p>{t("contact_support")}</p>
//               <ul className="mt-2">
//                 <li>
//                   <a
//                     href="tel:+1234567890"
//                     className="hover:text-yellow-300"
//                   >
//                     {t("call_us")}: +1-234-567-890
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="mailto:support@example.com"
//                     className="hover:text-yellow-300"
//                   >
//                     {t("email_us")}: support@example.com
//                   </a>
//                 </li>
//               </ul>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Top_Header;



// "use client"
// import React from "react";
// import { useTranslation } from "react-i18next";

// const Top_Header: React.FC = () => {
//   const { t, i18n } = useTranslation();  // Destructure i18n and t from useTranslation

//   // Function to handle language change
//   const handleLanguageChange = (language: string) => {
//     if (i18n && i18n.changeLanguage) {
//       i18n.changeLanguage(language);  // Should be available from react-i18next
//     } else {
//       console.error("i18n or changeLanguage method is not available");
// }};

//   return (
//     <div className="flex justify-between items-center bg-[#272343] text-white py-2 px-5 text-sm">
//       {/* Left Section */}
//       <div>&#10003; {t("free_shipping")}</div>

//       {/* Right Section */}
//       <div className="flex items-center gap-4">
//         {/* Language Selector */}
//         <select
//           onChange={(e) => handleLanguageChange(e.target.value)}
//           value={i18n.language} // Keeps selected language
//           className="bg-[#272343] border border-gray-400 rounded text-white px-2 py-1 cursor-pointer"
//         >
//           <option value="en">English</option>
//           <option value="es">Español</option>
//           <option value="fr">Français</option>
//           <option value="de">Deutsch</option>
//           <option value="zh">中文</option>
//           <option value="ur">اردو</option>
//         </select>

//         {/* Additional Links */}
//         <span className="cursor-pointer hover:underline">{t("faqs")}</span>
//         <span className="cursor-pointer hover:underline">{t("need_help")}</span>
//       </div>
//     </div>
//   );
// };

// export default Top_Header;













































// import React from "react";
// import { useTranslation } from "react-i18next";

// const Top_Header: React.FC = () => {
//   const { t, i18n } = useTranslation();  // Correctly destructuring i18n

//   // Function to handle language change
//   const handleLanguageChange = (language: string) => {
//     // Ensure i18n is initialized correctly
//     if (i18n && i18n.changeLanguage) {
//       i18n.changeLanguage(language);  // Should be available from react-i18next
//     } else {
//       console.error("i18n or changeLanguage method is not available");
//     }
//   };

//   return (
//     <div className="flex justify-between items-center bg-[#272343] text-white py-2 px-5 text-sm">
//       {/* Left Section */}
//       <div>&#10003; {t("free_shipping")}</div>

//       {/* Right Section */}
//       <div className="flex items-center gap-4">
//         {/* Language Selector */}
//         <select
//           onChange={(e) => handleLanguageChange(e.target.value)}
//           value={i18n.language} // Keeps selected language
//           className="bg-[#272343] border border-gray-400 rounded text-white px-2 py-1 cursor-pointer"
//         >
//           <option value="en">English</option>
//           <option value="es">Español</option>
//           <option value="fr">Français</option>
//           <option value="de">Deutsch</option>
//           <option value="zh">中文</option>
//           <option value="ur">اردو</option>
//         </select>

//         {/* Additional Links */}
//         <span className="cursor-pointer hover:underline">{t("faqs")}</span>
//         <span className="cursor-pointer hover:underline">{t("need_help")}</span>
//       </div>
//     </div>
//   );
// };

// export default Top_Header;




// import React, { useState } from "react";

// function Top_Header() {
//   const [language, setLanguage] = useState("English");

//   const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     const selectedLanguage = event.target.value;
//     setLanguage(selectedLanguage);

//     // Add logic to handle language change globally, e.g., update app state or fetch translations.
//     console.log(`Language changed to: ${selectedLanguage}`);
//   };

//   return (
//     <div className="flex justify-between items-center bg-[#272343] text-white py-2 px-5 text-sm">
//       {/* Left Section */}
//       <div>&#10003; Free Shipping On All Orders Over $50</div>

//       {/* Right Section */}
//       <div className="flex items-center gap-4">
//         {/* Language Selector */}
//         <select
//           value={language}
//           onChange={handleLanguageChange}
//           className="bg-[#272343] border border-gray-400 rounded text-white px-2 py-1 cursor-pointer"
//         >
//           <option value="English">English</option>
//           <option value="Spanish">Spanish</option>
//           <option value="French">French</option>
//           <option value="German">German</option>
//           <option value="Chinese">Chinese</option>
//           <option value="Urdu">Urdu</option>
//         </select>

//         {/* Additional Links */}
//         <span className="cursor-pointer hover:underline">FAQs</span>
//         <span className="cursor-pointer hover:underline">Need Help</span>
//       </div>
//     </div>
//   );
// }

// export default Top_Header;




// import React from "react";

// function Top_Header() {
//   return (
//     <div className="flex flex-wrap justify-between items-center bg-[#272343] text-white py-2 px-5 text-sm font-sans">
//       {/* Left Section */}
//       <div className="flex items-center">
//         <p className="m-0">&#10003; Free Shipping On All Orders Over $50</p>
//       </div>
//       {/* Right Section */}
//       <div className="flex gap-4 mt-2 sm:mt-0">
//         <p className="m-0 cursor-pointer hover:underline">Eng</p>
//         <p className="m-0 cursor-pointer hover:underline">FAQs</p>
//         <p className="m-0 cursor-pointer hover:underline">Need Help</p>
//       </div>
//     </div>
//   );
// }

// export default Top_Header;
