"use client";

import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { FiMoon, FiSun, FiSend, FiEye, FiEyeOff } from "react-icons/fi";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [darkMode, setDarkMode] = useState(false);
  const [showMessagePreview, setShowMessagePreview] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === "message") {
      setCharacterCount(value.length);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    toast.dismiss();

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message.");
      }

      toast.success("Your message has been sent successfully!", { position: "top-center" });
      setFormData({ name: "", email: "", message: "" });
      setCharacterCount(0);
    } catch (error) {
      toast.error("Error sending message. Try again later.", { position: "top-center" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const handlePreview = () => {
    setShowMessagePreview(prev => !prev);
    console.log("Preview toggled:", !showMessagePreview);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-all duration-300 ${darkMode ? "bg-slate-900" : "bg-gradient-to-br from-indigo-50 to-purple-50"}`}>
      <ToastContainer position="top-center" autoClose={3000} />

      <motion.div
        className={`relative backdrop-blur-lg rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 ${darkMode ? "bg-slate-800/90 text-white border border-slate-700" : "bg-white/95 text-slate-800 border border-white"}`}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Contact Us
            </h2>
            <p className="text-sm mt-1 text-slate-500">We'd love to hear from you</p>
          </div>
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full transition-all ${darkMode ? "bg-slate-700 hover:bg-slate-600" : "bg-slate-100 hover:bg-slate-200"}`}
          >
            {darkMode ? <FiSun className="text-lg" /> : <FiMoon className="text-lg" />}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-xl border focus:ring-2 transition-all ${darkMode ? "bg-slate-700 focus:ring-blue-400 text-white" : "bg-slate-100 focus:ring-blue-500 text-black"}`}
            placeholder="Full Name"
            disabled={isSubmitting}
          />

          {/* Email Field */}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-xl border focus:ring-2 transition-all ${darkMode ? "bg-slate-700 focus:ring-blue-400 text-white" : "bg-slate-100 focus:ring-blue-500 text-black"}`}
            placeholder="Email Address"
            disabled={isSubmitting}
          />

          {/* Message Field */}
          <div className="relative">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl border focus:ring-2 transition-all resize-none ${darkMode ? "bg-slate-700 focus:ring-blue-400 text-white" : "bg-slate-100 focus:ring-blue-500 text-black"}`}
              placeholder="Your Message"
              rows={4}
              maxLength={500}
              disabled={isSubmitting}
            />
            <div className="flex justify-between items-center mt-2">
              <span className={`text-sm ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
                {characterCount}/500 characters
              </span>
              <button
                type="button"
                onClick={handlePreview}
                className={`flex items-center gap-1 text-sm ${darkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700"}`}
              >
                {showMessagePreview ? <FiEyeOff /> : <FiEye />}
                {showMessagePreview ? "Hide Preview" : "Show Preview"}
              </button>
            </div>
          </div>

          {/* Message Preview Section */}
          {showMessagePreview && (
            <motion.div
              className="mt-3 p-4 bg-gray-200 rounded-lg text-black"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h3 className="text-lg font-semibold">Message Preview:</h3>
              <p>{formData.message}</p>
            </motion.div>
          )}

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isSubmitting}
            className={`w-full py-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
              isSubmitting
                ? "bg-slate-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            }`}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                Sending...
              </>
            ) : (
              <>
                <FiSend className="text-lg" />
                Send Message
              </>
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default ContactForm;













































//                      kk
// "use client";

// import React, { useState } from "react";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { motion } from "framer-motion";
// import { FiMoon, FiSun, FiSend, FiEye, FiEyeOff } from "react-icons/fi";

// const ContactForm = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });

//   const [darkMode, setDarkMode] = useState(false);
//   const [showMessagePreview, setShowMessagePreview] = useState(false);
//   const [characterCount, setCharacterCount] = useState(0);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [focusedFields, setFocusedFields] = useState({
//     name: false,
//     email: false,
//     message: false
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));

//     if (name === "message") {
//       setCharacterCount(value.length);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     toast.dismiss();
  
//     try {
//       const response = await fetch('/api/send-email', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData),
//       });
  
//       const text = await response.text();
//       let data;
//       try {
//         data = text ? JSON.parse(text) : {};
//       } catch (error) {
//         data = { message: text };
//       }
  
//       if (!response.ok) {
//         throw new Error(data.message || `HTTP error! status: ${response.status}`);
//       }
  
//       toast.success("Your message has been sent successfully!", {
//         position: "top-center",
//         autoClose: 5000,
//         toastId: "success-toast",
//         className: "toast-success",
//       });
//     } catch (error) {
//       console.error('Submission Error:', error);
//       toast.error(
//         error instanceof Error ? 
//         error.message : 'Failed to send message. Please try again later.',
//         {
//           position: "top-center",
//           autoClose: 5000,
//           toastId: "error-toast",
//           className: "toast-error",
//         }
//       );
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const toggleDarkMode = () => setDarkMode(!darkMode);
//   const handlePreview = () => setShowMessagePreview(!showMessagePreview);
//   const handleFocus = (field: string) => setFocusedFields(prev => ({ ...prev, [field]: true }));
//   const handleBlur = (field: string) => setFocusedFields(prev => ({ ...prev, [field]: false }));

//   return (
//     <div className={`min-h-screen flex items-center justify-center p-4 transition-all duration-300 ${
//       darkMode ? "bg-slate-900" : "bg-gradient-to-br from-indigo-50 to-purple-50"
//     }`}>
//       <ToastContainer position="top-center" autoClose={3000} />
      
//       <motion.div
//         className={`relative backdrop-blur-lg rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 ${
//           darkMode 
//             ? "bg-slate-800/90 text-white border border-slate-700" 
//             : "bg-white/95 text-slate-800 border border-white"
//         }`}
//         initial={{ scale: 0.95, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         transition={{ duration: 0.4 }}
//       >
//         <div className="flex justify-between items-start mb-8">
//           <div>
//             <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//               Contact Us
//             </h2>
//             <p className="text-sm mt-1 text-slate-500">
//               We'd love to hear from you
//             </p>
//           </div>
//           <button
//             onClick={toggleDarkMode}
//             className={`p-2 rounded-full transition-all ${
//               darkMode 
//                 ? "bg-slate-700 hover:bg-slate-600" 
//                 : "bg-slate-100 hover:bg-slate-200"
//             }`}
//           >
//             {darkMode ? <FiSun className="text-lg" /> : <FiMoon className="text-lg" />}
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Name Field */}
//           <motion.div
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             className="relative"
//           >
//             <input
//               type="text"
//               id="name"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               onFocus={() => handleFocus('name')}
//               onBlur={() => handleBlur('name')}
//               className={`w-full px-4 py-3 rounded-xl border-0 focus:ring-2 transition-all ${
//                 darkMode 
//                   ? "bg-slate-700/50 focus:ring-blue-400 placeholder-slate-400" 
//                   : "bg-slate-100 focus:ring-blue-500 placeholder-slate-400"
//               } ${focusedFields.name || formData.name ? "pt-6 pb-2" : "py-3"}`}
//               placeholder=" "
//               disabled={isSubmitting}
//             />
//             <label
//               htmlFor="name"
//               className={`absolute left-4 transition-all duration-200 ${
//                 focusedFields.name || formData.name 
//                   ? "top-2 text-xs text-blue-500" 
//                   : "top-3.5 text-sm text-slate-500"
//               }`}
//             >
//               Full Name
//             </label>
//           </motion.div>

//           {/* Email Field */}
//           <motion.div
//             initial={{ opacity: 0, x: 20 }}
//             animate={{ opacity: 1, x: 0 }}
//             className="relative"
//           >
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               onFocus={() => handleFocus('email')}
//               onBlur={() => handleBlur('email')}
//               className={`w-full px-4 py-3 rounded-xl border-0 focus:ring-2 transition-all ${
//                 darkMode 
//                   ? "bg-slate-700/50 focus:ring-blue-400 placeholder-slate-400" 
//                   : "bg-slate-100 focus:ring-blue-500 placeholder-slate-400"
//               } ${focusedFields.email || formData.email ? "pt-6 pb-2" : "py-3"}`}
//               placeholder=" "
//               disabled={isSubmitting}
//             />
//             <label
//               htmlFor="email"
//               className={`absolute left-4 transition-all duration-200 ${
//                 focusedFields.email || formData.email 
//                   ? "top-2 text-xs text-blue-500" 
//                   : "top-3.5 text-sm text-slate-500"
//               }`}
//             >
//               Email Address
//             </label>
//           </motion.div>

//           {/* Message Field */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="relative"
//           >
//             <textarea
//               id="message"
//               name="message"
//               value={formData.message}
//               onChange={handleChange}
//               onFocus={() => handleFocus('message')}
//               onBlur={() => handleBlur('message')}
//               className={`w-full px-4 py-3 rounded-xl border-0 focus:ring-2 transition-all resize-none ${
//                 darkMode 
//                   ? "bg-slate-700/50 focus:ring-blue-400 placeholder-slate-400" 
//                   : "bg-slate-100 focus:ring-blue-500 placeholder-slate-400"
//               } ${focusedFields.message || formData.message ? "pt-6 pb-2" : "py-3"}`}
//               placeholder=" "
//               rows={4}
//               maxLength={500}
//               disabled={isSubmitting}
//             />
//             <label
//               htmlFor="message"
//               className={`absolute left-4 transition-all duration-200 ${
//                 focusedFields.message || formData.message 
//                   ? "top-2 text-xs text-blue-500" 
//                   : "top-3.5 text-sm text-slate-500"
//               }`}
//             >
//               Your Message
//             </label>
//             <div className="flex justify-between items-center mt-2">
//               <span className={`text-sm ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
//                 {characterCount}/500 characters
//               </span>
//               <button
//                 type="button"
//                 onClick={handlePreview}
//                 className={`flex items-center gap-1 text-sm ${
//                   darkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700"
//                 }`}
//               >
//                 {showMessagePreview ? <FiEyeOff /> : <FiEye />}
//                 {showMessagePreview ? "Hide Preview" : "Show Preview"}
//               </button>
//             </div>
//           </motion.div>

//           {/* Submit Button */}
//           <motion.button
//             type="submit"
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             disabled={isSubmitting}
//             className={`w-full py-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
//               isSubmitting
//                 ? "bg-slate-400 cursor-not-allowed"
//                 : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
//             }`}
//           >
//             {isSubmitting ? (
//               <>
//                 <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
//                 </svg>
//                 Sending...
//               </>
//             ) : (
//               <>
//                 <FiSend className="text-lg" />
//                 Send Message
//               </>
//             )}
//           </motion.button>
//         </form>
//       </motion.div>
//     </div>
//   );
// };

// export default ContactForm;





































// "use client";

// import React, { useState, useEffect } from "react";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { motion, AnimatePresence } from "framer-motion";
// import { FiCheckCircle, FiAlertCircle } from "react-icons/fi";
// type SocialPlatform = 'twitter' | 'linkedin' | 'github';
// const ContactForm = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });
//   const [errors, setErrors] = useState<{ [key: string]: string }>({});
//   const [darkMode, setDarkMode] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [cooldown, setCooldown] = useState(false);
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [characterCount, setCharacterCount] = useState(0);

//   // Autosave to localStorage
//   useEffect(() => {
//     const savedData = localStorage.getItem('contactFormDraft');
//     if (savedData) setFormData(JSON.parse(savedData));
//   }, []);

//   useEffect(() => {
//     const timeoutId = setTimeout(() => {
//       localStorage.setItem('contactFormDraft', JSON.stringify(formData));
//     }, 500);
//     return () => clearTimeout(timeoutId);
//   }, [formData]);

//   const validateField = (name: string, value: string) => {
//     let error = "";
//     switch (name) {
//       case "name":
//         if (!value.trim()) error = "Name is required";
//         break;
//       case "email":
//         if (!value.trim()) {
//           error = "Email is required";
//         } else if (!/\S+@\S+\.\S+/.test(value)) {
//           error = "Invalid email format";
//         }
//         break;
//       case "message":
//         if (!value.trim()) {
//           error = "Message is required";
//         } else if (value.length < 20) {
//           error = "Message must be at least 20 characters";
//         }
//         break;
//     }
//     setErrors(prev => ({ ...prev, [name]: error }));
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//     validateField(name, value);
//     if (name === "message") setCharacterCount(value.length);
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const honeypot = (e.currentTarget.querySelector('[name="honeypot"]') as HTMLInputElement)?.value;
//     if (honeypot) return toast.error("Bot detected!");
    
//     setIsSubmitting(true);
//     toast.dismiss();

//     try {
//       // Simulated API call
//       await new Promise(resolve => setTimeout(resolve, 1000));
      
//       setIsSubmitted(true);
//       localStorage.removeItem('contactFormDraft');
//       toast.success("Message sent successfully!", {
//         className: "toast-success",
//         icon: <FiCheckCircle className="text-2xl" />
//       });
//     } catch (error) {
//       toast.error("Failed to send message", {
//         className: "toast-error",
//         icon: <FiAlertCircle className="text-2xl" />
//       });
//     } finally {
//       setIsSubmitting(false);
//       setCooldown(true);
//       setTimeout(() => setCooldown(false), 3000);
//     }
//   };

//   return (
//     <div className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${
//       darkMode ? "bg-gray-900" : "bg-gradient-to-br from-blue-50 to-purple-50"
//     }`}>
//       <ToastContainer position="top-center" autoClose={3000} />

//       <motion.div
//         className={`relative rounded-xl shadow-2xl p-8 max-w-md w-full mx-4 ${
//           darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
//         }`}
//         initial={{ scale: 0.95, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         transition={{ duration: 0.4 }}
//       >
//         <div className="flex justify-between items-start mb-8">
//           <h1 className="text-3xl font-bold">Get in Touch</h1>
//           <button
//             onClick={() => setDarkMode(!darkMode)}
//             className={`p-2 rounded-full ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}
//             aria-label="Toggle dark mode"
//           >
//             {darkMode ? "🌞" : "🌙"}
//           </button>
//         </div>

//         <AnimatePresence>
//           {isSubmitted ? (
//             <motion.div
//               key="success"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0 }}
//               className="text-center space-y-6"
//             >
//               <div className="inline-block text-green-500 text-6xl">
//                 <FiCheckCircle />
//               </div>
//               <h2 className="text-2xl font-bold">Message Received!</h2>
//               <p>We'll respond within 24 hours</p>
//               <div className="flex justify-center space-x-4">
//                 <SocialIcon platform="twitter" />
//                 <SocialIcon platform="linkedin" />
//                 <SocialIcon platform="github" />
//               </div>
//               <button
//                 onClick={() => {
//                   setIsSubmitted(false);
//                   setFormData({ name: "", email: "", message: "" });
//                 }}
//                 className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
//               >
//                 New Message
//               </button>
//             </motion.div>
//           ) : (
//             <motion.form
//               key="form"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onSubmit={handleSubmit}
//               className="space-y-6"
//             >
//               {/* Honeypot Field */}
//               <input type="text" name="honeypot" className="hidden" />

//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium mb-2">Name</label>
//                   <input
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     className={`w-full px-4 py-2 rounded-lg border ${
//                       darkMode 
//                         ? "bg-gray-700 border-gray-600 focus:ring-purple-400" 
//                         : "bg-gray-50 border-gray-200 focus:ring-blue-400"
//                     } ${errors.name ? "border-red-500" : ""}`}
//                     aria-describedby="name-error"
//                   />
//                   {errors.name && (
//                     <p id="name-error" className="text-red-500 text-sm mt-1">{errors.name}</p>
//                   )}
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium mb-2">Email</label>
//                   <input
//                     name="email"
//                     type="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     className={`w-full px-4 py-2 rounded-lg border ${
//                       darkMode 
//                         ? "bg-gray-700 border-gray-600 focus:ring-purple-400" 
//                         : "bg-gray-50 border-gray-200 focus:ring-blue-400"
//                     } ${errors.email ? "border-red-500" : ""}`}
//                     aria-describedby="email-error"
//                   />
//                   {errors.email && (
//                     <p id="email-error" className="text-red-500 text-sm mt-1">{errors.email}</p>
//                   )}
//                 </div>

//                 <div>
//                   <div className="flex justify-between items-end mb-2">
//                     <label className="block text-sm font-medium">Message</label>
//                     <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
//                       {characterCount}/500
//                     </span>
//                   </div>
//                   <textarea
//                     name="message"
//                     value={formData.message}
//                     onChange={handleChange}
//                     rows={4}
//                     maxLength={500}
//                     className={`w-full px-4 py-2 rounded-lg border ${
//                       darkMode 
//                         ? "bg-gray-700 border-gray-600 focus:ring-purple-400" 
//                         : "bg-gray-50 border-gray-200 focus:ring-blue-400"
//                     } ${errors.message ? "border-red-500" : ""}`}
//                     aria-describedby="message-error"
//                   />
//                   {errors.message && (
//                     <p id="message-error" className="text-red-500 text-sm mt-1">{errors.message}</p>
//                   )}
//                 </div>
//               </div>

//               <motion.button
//                 type="submit"
//                 disabled={isSubmitting || cooldown}
//                 whileTap={{ scale: 0.98 }}
//                 className={`w-full py-3 rounded-lg font-medium transition-colors ${
//                   isSubmitting || cooldown
//                     ? "bg-gray-400 cursor-not-allowed"
//                     : "bg-blue-600 hover:bg-blue-700 text-white"
//                 }`}
//               >
//                 {isSubmitting ? (
//                   <span className="flex items-center justify-center">
//                     <span className="animate-spin mr-2">🌀</span>
//                     Sending...
//                   </span>
//                 ) : (
//                   "Send Message"
//                 )}
//               </motion.button>
//             </motion.form>
//           )}
//         </AnimatePresence>
//       </motion.div>
//     </div>
//   );
// };

// const SocialIcon = ({ platform }: { platform: SocialPlatform }) => {
//   const icons = {
//     twitter: { icon: "🐦", url: "#" },
//     linkedin: { icon: "💼", url: "#" },
//     github: { icon: "🐱", url: "#" },
//   } as const;

//   return (
//     <a
//       href={icons[platform].url}
//       target="_blank"
//       rel="noopener noreferrer"
//       className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-2xl"
//       aria-label={platform}
//     >
//       {icons[platform].icon}
//     </a>
//   );
// };

// export default ContactForm;


































// "use client";

// import React, { useState } from "react";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { motion } from "framer-motion";

// const ContactForm = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });

//   const [darkMode, setDarkMode] = useState(false);
//   const [showMessagePreview, setShowMessagePreview] = useState(false);
//   const [characterCount, setCharacterCount] = useState(0);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));

//     if (name === "message") {
//       setCharacterCount(value.length);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     toast.dismiss();
  
//     try {
//       // Validation checks...
  
//       const response = await fetch('/api/send-email', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData),
//       });
  
//       // Handle empty responses
//       const text = await response.text();
//       let data;
//       try {
//         data = text ? JSON.parse(text) : {};
//       } catch (error) {
//         data = { message: text };
//       }
  
//       if (!response.ok) {
//         throw new Error(data.message || `HTTP error! status: ${response.status}`);
//       }
  
//       // Success handling...
//       toast.success("Your message has been sent successfully!", {
//         position: "top-center", // Use string values for position
//         autoClose: 5000,
//         toastId: "success-toast", // Unique identifier
//         className: "toast-success", // Custom class for styling
//       });
//     } catch (error) {
//       console.error('Submission Error:', error);
//       toast.error(
//         error instanceof Error ? 
//         error.message : 'Failed to send message. Please try again later.',
//         {
//           position: "top-center", // Use string values for position
//           autoClose: 5000,
//           toastId: "error-toast", // Unique identifier for error
//           className: "toast-error", // Custom class for styling
//         }
//       );
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const toggleDarkMode = () => setDarkMode(!darkMode);
//   const handlePreview = () => setShowMessagePreview(!showMessagePreview);

//   return (
//     <div className={`flex items-center justify-center min-h-screen p-6 transition-all duration-300 ${
//       darkMode ? "bg-gray-900 text-white" : "bg-gradient-to-r from-blue-500 to-purple-600 text-gray-800"
//     }`}>
//       <ToastContainer position="top-center" autoClose={3000} />
      
//       <motion.div
//         className="bg-white dark:bg-gray-800 dark:text-white rounded-lg shadow-lg p-8 max-w-md w-full"
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8, ease: "easeOut" }}
//       >
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-4xl font-bold">Contact Us</h2>
//           <button
//             onClick={toggleDarkMode}
//             className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
//           >
//             {darkMode ? "Light Mode" : "Dark Mode"}
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Name Field */}
//           <motion.div
//             initial={{ opacity: 0, x: -50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.6, ease: "easeOut" }}
//           >
//             <label htmlFor="name" className={`block font-medium mb-2 ${darkMode ? "text-white" : "text-gray-800"}`}>
//               Name
//             </label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
//                 darkMode ? "bg-gray-700 border-gray-600 focus:ring-blue-400" : "bg-white border-gray-300 focus:ring-blue-500"
//               }`}
//               placeholder="Enter your name"
//               disabled={isSubmitting}
//             />
//           </motion.div>

//           {/* Email Field */}
//           <motion.div
//             initial={{ opacity: 0, x: 50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.6, ease: "easeOut" }}
//           >
//             <label htmlFor="email" className={`block font-medium mb-2 ${darkMode ? "text-white" : "text-gray-800"}`}>
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
//                 darkMode ? "bg-gray-700 border-gray-600 focus:ring-blue-400" : "bg-white border-gray-300 focus:ring-blue-500"
//               }`}
//               placeholder="Enter your email"
//               disabled={isSubmitting}
//             />
//           </motion.div>

//           {/* Message Field */}
//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, ease: "easeOut" }}
//           >
//             <label htmlFor="message" className={`block font-medium mb-2 ${darkMode ? "text-white" : "text-gray-800"}`}>
//               Message
//             </label>
//             <textarea
//               id="message"
//               name="message"
//               value={formData.message}
//               onChange={handleChange}
//               className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
//                 darkMode ? "bg-gray-700 border-gray-600 focus:ring-blue-400" : "bg-white border-gray-300 focus:ring-blue-500"
//               }`}
//               placeholder="Enter your message"
//               rows={5}
//               maxLength={500}
//               disabled={isSubmitting}
//             />
//             <div className="text-right text-sm mt-1">
//               <span className={darkMode ? "text-gray-300" : "text-gray-600"}>
//                 {characterCount}/500 characters
//               </span>
//             </div>
//           </motion.div>

//           {/* Submit Button */}
//           <motion.button
//             type="submit"
//             className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-75 transition-all"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             disabled={isSubmitting}
//           >
//             {isSubmitting ? (
//               <span className="flex items-center justify-center">
//                 <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
//                 </svg>
//                 Sending...
//               </span>
//             ) : (
//               "Send Message"
//             )}
//           </motion.button>

//           {/* Preview Button */}
//           <motion.button
//             type="button"
//             onClick={handlePreview}
//             className="w-full bg-green-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
//           >
//             {showMessagePreview ? "Hide Preview" : "Show Preview"}
//           </motion.button>
//         </form>
//       </motion.div>
//     </div>
//   );
// };

// export default ContactForm;

// "use client";

// import React, { useState } from "react";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { motion } from "framer-motion";

// const ContactForm = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });

//   const [darkMode, setDarkMode] = useState(false);
//   const [showMessagePreview, setShowMessagePreview] = useState(false);
//   const [characterCount, setCharacterCount] = useState(0);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));

//     if (name === "message") {
//       setCharacterCount(value.length);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     toast.dismiss();
  
//     try {
//       // Validation checks...
  
//       const response = await fetch('/api/send-email', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData),
//       });
  
//       // Handle empty responses
//       const text = await response.text();
//       let data;
//       try {
//         data = text ? JSON.parse(text) : {};
//       } catch (error) {
//         data = { message: text };
//       }
  
//       if (!response.ok) {
//         throw new Error(data.message || `HTTP error! status: ${response.status}`);
//       }
  
//       // Success handling...
//     } catch (error) {
//       console.error('Submission Error:', error);
//       toast.error(
//         error instanceof Error ? 
//         error.message : 'Failed to send message. Please try again later.'
//       );
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const toggleDarkMode = () => setDarkMode(!darkMode);
//   const handlePreview = () => setShowMessagePreview(!showMessagePreview);

//   return (
//     <div className={`flex items-center justify-center min-h-screen p-6 transition-all duration-300 ${
//       darkMode ? "bg-gray-900 text-white" : "bg-gradient-to-r from-blue-500 to-purple-600 text-gray-800"
//     }`}>
//       <ToastContainer position="top-center" autoClose={3000} />
      
//       <motion.div
//         className="bg-white dark:bg-gray-800 dark:text-white rounded-lg shadow-lg p-8 max-w-md w-full"
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8, ease: "easeOut" }}
//       >
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-4xl font-bold">Contact Us</h2>
//           <button
//             onClick={toggleDarkMode}
//             className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
//           >
//             {darkMode ? "Light Mode" : "Dark Mode"}
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Name Field */}
//           <motion.div
//             initial={{ opacity: 0, x: -50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.6, ease: "easeOut" }}
//           >
//             <label htmlFor="name" className={`block font-medium mb-2 ${darkMode ? "text-white" : "text-gray-800"}`}>
//               Name
//             </label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
//                 darkMode ? "bg-gray-700 border-gray-600 focus:ring-blue-400" : "bg-white border-gray-300 focus:ring-blue-500"
//               }`}
//               placeholder="Enter your name"
//               disabled={isSubmitting}
//             />
//           </motion.div>

//           {/* Email Field */}
//           <motion.div
//             initial={{ opacity: 0, x: 50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.6, ease: "easeOut" }}
//           >
//             <label htmlFor="email" className={`block font-medium mb-2 ${darkMode ? "text-white" : "text-gray-800"}`}>
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
//                 darkMode ? "bg-gray-700 border-gray-600 focus:ring-blue-400" : "bg-white border-gray-300 focus:ring-blue-500"
//               }`}
//               placeholder="Enter your email"
//               disabled={isSubmitting}
//             />
//           </motion.div>

//           {/* Message Field */}
//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, ease: "easeOut" }}
//           >
//             <label htmlFor="message" className={`block font-medium mb-2 ${darkMode ? "text-white" : "text-gray-800"}`}>
//               Message
//             </label>
//             <textarea
//               id="message"
//               name="message"
//               value={formData.message}
//               onChange={handleChange}
//               className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
//                 darkMode ? "bg-gray-700 border-gray-600 focus:ring-blue-400" : "bg-white border-gray-300 focus:ring-blue-500"
//               }`}
//               placeholder="Enter your message"
//               rows={5}
//               maxLength={500}
//               disabled={isSubmitting}
//             />
//             <div className="text-right text-sm mt-1">
//               <span className={darkMode ? "text-gray-300" : "text-gray-600"}>
//                 {characterCount}/500 characters
//               </span>
//             </div>
//           </motion.div>

//           {/* Submit Button */}
//           <motion.button
//             type="submit"
//             className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-75 transition-all"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             disabled={isSubmitting}
//           >
//             {isSubmitting ? (
//               <span className="flex items-center justify-center">
//                 <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
//                 </svg>
//                 Sending...
//               </span>
//             ) : (
//               "Send Message"
//             )}
//           </motion.button>

//           {/* Preview Button */}
//           <motion.button
//             type="button"
//             onClick={handlePreview}
//             className="w-full bg-green-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 mt-4 transition-colors"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             disabled={isSubmitting}
//           >
//             {showMessagePreview ? "Hide Preview" : "Show Preview"}
//           </motion.button>
//         </form>

//         {/* Message Preview */}
//         {showMessagePreview && (
//           <div className={`mt-6 p-4 border rounded-lg ${
//             darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-100 border-gray-300"
//           }`}>
//             <h3 className="font-bold text-lg mb-2">Message Preview:</h3>
//             <p><strong>Name:</strong> {formData.name}</p>
//             <p><strong>Email:</strong> {formData.email}</p>
//             <p><strong>Message:</strong> {formData.message}</p>
//           </div>
//         )}
//       </motion.div>
//     </div>
//   );
// };

// export default ContactForm;





























// "use client";

// import React, { useState } from "react";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { motion } from "framer-motion";

// const ContactForm = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });

//   const [darkMode, setDarkMode] = useState(false);
//   const [showMessagePreview, setShowMessagePreview] = useState(false);
//   const [characterCount, setCharacterCount] = useState(0);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });

//     if (name === "message") {
//       setCharacterCount(value.length); // Update character count for the message field
//     }
//   };

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (!formData.name || !formData.email || !formData.message) {
//       toast.error("Please fill in all fields.");
//       return;
//     }

//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       toast.error("Invalid email format.");
//       return;
//     }

//     toast.success("Message sent successfully!");
//     setFormData({ name: "", email: "", message: "" });
//     setCharacterCount(0); // Reset character count
//   };

//   const toggleDarkMode = () => {
//     setDarkMode(!darkMode);
//   };

//   const handlePreview = () => {
//     setShowMessagePreview(!showMessagePreview);
//   };

//   return (
//     <div
//       className={`flex items-center justify-center min-h-screen p-6 transition-all duration-300 ${
//         darkMode ? "bg-gray-900 text-white" : "bg-gradient-to-r from-blue-500 to-purple-600 text-gray-800"
//       }`}
//     >
//       <ToastContainer />
//       <motion.div
//         className="bg-white dark:bg-gray-800 dark:text-white rounded-lg shadow-lg p-8 max-w-md w-full"
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8, ease: "easeOut" }}
//       >
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-4xl font-bold">Contact Us</h2>
//           <button
//             onClick={toggleDarkMode}
//             className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
//           >
//             {darkMode ? "Light Mode" : "Dark Mode"}
//           </button>
//         </div>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <motion.div
//             initial={{ opacity: 0, x: -50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.6, ease: "easeOut" }}
//           >
//             <label
//               htmlFor="name"
//               className={`block font-medium mb-2 ${darkMode ? "text-white" : "text-gray-800"}`}
//             >
//               Name
//             </label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                 darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-800"
//               }`}
//               placeholder="Enter your name"
//             />
//           </motion.div>
//           <motion.div
//             initial={{ opacity: 0, x: 50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.6, ease: "easeOut" }}
//           >
//             <label
//               htmlFor="email"
//               className={`block font-medium mb-2 ${darkMode ? "text-white" : "text-gray-800"}`}
//             >
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                 darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-800"
//               }`}
//               placeholder="Enter your email"
//             />
//           </motion.div>
//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, ease: "easeOut" }}
//           >
//             <label
//               htmlFor="message"
//               className={`block font-medium mb-2 ${darkMode ? "text-white" : "text-gray-800"}`}
//             >
//               Message
//             </label>
//             <textarea
//               id="message"
//               name="message"
//               value={formData.message}
//               onChange={handleChange}
//               className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                 darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-800"
//               }`}
//               placeholder="Enter your message"
//               rows={5}
//               maxLength={500} // Limit characters to 500
//             />
//             <div className="text-right text-sm mt-1">
//               <span
//                 className={`${
//                   darkMode ? "text-gray-300" : "text-gray-600"
//                 }`}
//               >
//                 {characterCount}/500 characters
//               </span>
//             </div>
//           </motion.div>
//           <motion.button
//             type="submit"
//             className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             Send Message
//           </motion.button>
//           <motion.button
//             type="button"
//             onClick={handlePreview}
//             className="w-full bg-green-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 mt-4"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             {showMessagePreview ? "Hide Preview" : "Show Preview"}
//           </motion.button>
//         </form>
//         {showMessagePreview && (
//           <div className="mt-6 p-4 border rounded-lg bg-gray-100 dark:bg-gray-700">
//             <h3 className="font-bold text-lg mb-2">Message Preview:</h3>
//             <p><strong>Name:</strong> {formData.name}</p>
//             <p><strong>Email:</strong> {formData.email}</p>
//             <p><strong>Message:</strong> {formData.message}</p>
//           </div>
//         )}
//       </motion.div>
//     </div>
//   );
// };

// export default ContactForm;

// "use client";

// import React, { useState } from "react";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const ContactForm = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (!formData.name || !formData.email || !formData.message) {
//       toast.error("Please fill in all fields.");
//       return;
//     }

//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       toast.error("Invalid email format.");
//       return;
//     }

//     toast.success("Message sent successfully!");
//     setFormData({ name: "", email: "", message: "" });
//   };

//   return (
//     <div className="container mx-auto px-4 py-16">
//       <ToastContainer />
//       <h2 className="text-3xl font-bold text-center mb-8">Get In Touch</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
//             Your Name
//           </label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             className="border rounded w-full px-3 py-2"
//             placeholder="Enter your name"
//           />
//         </div>
//         <div>
//           <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
//             Email
//           </label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             className="border rounded w-full px-3 py-2"
//             placeholder="Enter your email"
//           />
//         </div>
//         <div>
//           <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
//             Message
//           </label>
//           <textarea
//             id="message"
//             name="message"
//             value={formData.message}
//             onChange={handleChange}
//             className="border rounded w-full px-3 py-2"
//             placeholder="Enter your message"
//             rows={4}
//           />
//         </div>
//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           Send Message
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ContactForm;


// "use client";

// import { useState } from "react";

// const ContactForm = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     subject: "",
//     message: "",
//   });

//   const [errors, setErrors] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });

//   const [newsletterEmail, setNewsletterEmail] = useState("");
//   const [newsletterMessage, setNewsletterMessage] = useState("");

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleNewsletterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setNewsletterEmail(e.target.value);
//   };

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     let valid = true;
//     const newErrors = { name: "", email: "", message: "" };

//     if (!formData.name) {
//       newErrors.name = "Name is required.";
//       valid = false;
//     }
//     if (!formData.email) {
//       newErrors.email = "Email is required.";
//       valid = false;
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       newErrors.email = "Invalid email format.";
//       valid = false;
//     }
//     if (!formData.message) {
//       newErrors.message = "Message is required.";
//       valid = false;
//     }

//     if (!valid) {
//       setErrors(newErrors);
//       return;
//     }

//     console.log("Form submitted:", formData);
//     setFormData({ name: "", email: "", subject: "", message: "" });
//     setErrors({ name: "", email: "", message: "" });
//   };

//   const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     console.log("Newsletter subscription submitted:", newsletterEmail);
//     setNewsletterMessage("Thank you for subscribing!");
//     setNewsletterEmail(""); // Reset newsletter email
//   };

//   return (
//     <div className="container mx-auto px-4 py-16">
//       <h2 className="text-3xl font-bold text-center mb-8">Get In Touch With Us</h2>
//       <p className="text-center mb-12 text-gray-600">
//         For more information about our products & services, please feel free to drop us
//         an email. Our staff is always here to help you out. Do not hesitate!
//       </p>

//       {/* Contact Form */}
//       <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
//         <div>
//           <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
//             Your Name
//           </label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             placeholder="Enter your name"
//             className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//               errors.name ? "border-red-500" : ""
//             }`}
//             aria-required="true"
//           />
//           {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
//         </div>
//         <div>
//           <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
//             Email Address
//           </label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             placeholder="Enter your email"
//             className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//               errors.email ? "border-red-500" : ""
//             }`}
//             aria-required="true"
//           />
//           {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
//         </div>
//         <div>
//           <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">
//             Subject
//           </label>
//           <input
//             type="text"
//             id="subject"
//             name="subject"
//             value={formData.subject}
//             onChange={handleChange}
//             placeholder="Enter the subject"
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <div className="md:col-span-2">
//           <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
//             Message
//           </label>
//           <textarea
//             id="message"
//             name="message"
//             value={formData.message}
//             onChange={handleChange}
//             placeholder="Write your message"
//             className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 ${
//               errors.message ? "border-red-500" : ""
//             }`}
//             aria-required="true"
//           />
//           {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
//         </div>
//         <div className="md:col-span-2">
//           <button
//             type="submit"
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//             aria-label="Send Message"
//           >
//             Send Message
//           </button>
//         </div>
//       </form>

//       {/* Newsletter Section */}
//       <div className="bg-gray-100 p-8 rounded-lg shadow-lg flex flex-col md:flex-row items-center">
//         <img
//           src="/Image (2).png" // Replace with your actual image path
//           alt="Newsletter"
//           className="w-full md:w-1/3 rounded-lg mb-4 md:mb-0 md:mr-8"
//         />
//         <div className="flex-grow">
//           <h3 className="text-2xl font-bold text-center md:text-left mb-4">
//             Subscribe to Our Newsletter
//           </h3>
//           <p className="text-center md:text-left mb-6 text-gray-600">
//             Stay updated with the latest news and special offers from us.
//           </p>
//           {newsletterMessage && (
//             <p className="text-green-500 text-center mb-4">{newsletterMessage}</p>
//           )}
//           <form
//             onSubmit={handleNewsletterSubmit}
//             className="flex flex-col sm:flex-row justify-center items-center gap-4"
//           >
//             <input
//               type="email"
//               value={newsletterEmail}
//               onChange={handleNewsletterChange}
//               placeholder="Enter your email"
//               className="shadow appearance-none border rounded w-full sm:w-auto py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//             <button
//               type="submit"
//               className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//               aria-label="Subscribe to Newsletter"
//             >
//               Subscribe
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContactForm;



























// "use client";

// import { useState } from "react";

// const ContactForm = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     subject: "",
//     message: "",
//   });

//   const [newsletterEmail, setNewsletterEmail] = useState("");

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleNewsletterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setNewsletterEmail(e.target.value);
//   };

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     console.log("Form submitted:", formData);
//     setFormData({ name: "", email: "", subject: "", message: "" }); // Reset form
//   };

//   const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     console.log("Newsletter subscription submitted:", newsletterEmail);
//     setNewsletterEmail(""); // Reset newsletter email
//   };

//   return (
//     <div className="container mx-auto px-4 py-16">
//       <h2 className="text-3xl font-bold text-center mb-8">Get In Touch With Us</h2>
//       <p className="text-center mb-12 text-gray-600">
//         For more information about our products & services, please feel free to drop us
//         an email. Our staff is always here to help you out. Do not hesitate!
//       </p>
//       <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
//         <div>
//           <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
//             Your Name
//           </label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             placeholder="Enter your name"
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
//             Email Address
//           </label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             placeholder="Enter your email"
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">
//             Subject
//           </label>
//           <input
//             type="text"
//             id="subject"
//             name="subject"
//             value={formData.subject}
//             onChange={handleChange}
//             placeholder="Enter the subject"
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <div className="md:col-span-2">
//           <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
//             Message
//           </label>
//           <textarea
//             id="message"
//             name="message"
//             value={formData.message}
//             onChange={handleChange}
//             placeholder="Write your message"
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
//             required
//           />
//         </div>
//         <div className="md:col-span-2">
//           <button
//             type="submit"
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//             aria-label="Send Message"
//           >
//             Send Message
//           </button>
//         </div>
//       </form>

//       {/* Newsletter Section */}
//       <div className="bg-gray-100 p-8 rounded-lg shadow-lg flex flex-col md:flex-row items-center">
//         {/* Image Tag */}
//         <img
//           src="/Image (2).png" // Replace with your image path
//           alt="Newsletter"
//           className="w-full md:w-1/3 rounded-lg mb-4 md:mb-0 md:mr-8"
//         />
//         <div className="flex-grow">
//           <h3 className="text-2xl font-bold text-center md:text-left mb-4">
//             Subscribe to Our Newsletter
//           </h3>
//           <p className="text-center md:text-left mb-6 text-gray-600">
//             Stay updated with the latest news and special offers from us.
//           </p>
//           <form
//             onSubmit={handleNewsletterSubmit}
//             className="flex flex-col sm:flex-row justify-center items-center gap-4"
//           >
//             <input
//               type="email"
//               value={newsletterEmail}
//               onChange={handleNewsletterChange}
//               placeholder="Enter your email"
//               className="shadow appearance-none border rounded w-full sm:w-auto py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//             <button
//               type="submit"
//               className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//               aria-label="Subscribe to Newsletter"
//             >
//               Subscribe
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContactForm;
