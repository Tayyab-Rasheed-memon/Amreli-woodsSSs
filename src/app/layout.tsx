



import { ClerkProvider } from '@clerk/nextjs';
import { CartProvider } from "@/app/context/CartContext";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Top_Header from "@/components/Top_Header";
import Footer from "@/components/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Comforty",
  description: "Your premium furniture destination",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClerkProvider
          appearance={{
            variables: {
              colorPrimary: '#0d9488',
              colorText: '#374151',
              colorTextSecondary: '#6b7280',
              colorInputText: '#1f2937',
              fontSize: '1rem',
            },
            elements: {
              // Form Elements
              formButtonPrimary: 'bg-teal-500 hover:bg-teal-600 text-white rounded-lg py-2.5 transition-all',
              formFieldInput: 'border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 px-4 py-2.5',
              formFieldRow: 'flex gap-4',
              
              // Social Login
              socialButtonsBlockButton: 'border-gray-300 hover:bg-gray-50 rounded-lg',
              socialButtonsBlockButtonText: 'text-gray-700 font-medium',
              socialButtonsBlockButtonArrow: 'text-teal-500',
              
              // Header/Footer
              headerTitle: 'text-2xl font-bold text-gray-800 text-center',
              headerSubtitle: 'hidden',
              footer: 'hidden',
              footerPagesLink: 'hidden',
              
              // Divider
              dividerLine: 'hidden',
              dividerText: 'hidden',
              
              // User Button
              userButtonTrigger: 'focus:shadow-none',
              
              // Action Links
              footerActionLink: 'text-teal-500 hover:text-teal-600 font-medium',
              footerActionText: 'text-gray-600'
            }
          }}
        >
          <CartProvider>
            <Top_Header />
            <Navbar />
            <main className="min-h-[calc(100vh-160px)]">
              {children}
            </main>
            <Footer />
          </CartProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
















// import { ClerkProvider } from '@clerk/nextjs';
// import { CartProvider } from "@/app/context/CartContext";
// import type { Metadata } from "next";
// import localFont from "next/font/local";
// import "./globals.css";
// import Navbar from "@/components/Navbar";
// import Top_Header from "@/components/Top_Header";
// import Footer from "@/components/Footer";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });

// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

// export const metadata: Metadata = {
//   title: "Comforty",
//   description: "Your premium furniture destination",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (




    
//     <html lang="en">
//       <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
//         <ClerkProvider
//           appearance={{
//             variables: {
//               colorPrimary: '#0d9488',
//               colorText: '#374151',
//               colorTextSecondary: '#6b7280',
//               colorInputText: '#1f2937',
//               fontSize: '1rem',
//             },
//             elements: {
//               formButtonPrimary: 'bg-teal-500 hover:bg-teal-600 text-white rounded-lg py-2.5 transition-all',
//               formFieldInput: 'border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 px-4 py-2.5',
//               socialButtonsBlockButton: 'border-gray-300 hover:bg-gray-50 rounded-lg',
//               socialButtonsBlockButtonText: 'text-gray-700 font-medium',
//               socialButtonsBlockButtonArrow: 'text-teal-500',
//               headerTitle: 'text-2xl font-bold text-gray-800 text-center',
//               headerSubtitle: 'text-gray-600 text-center mb-6',
//               dividerLine: 'bg-gray-300',
//               dividerText: 'text-gray-500 text-sm',
//               footerActionLink: 'text-teal-500 hover:text-teal-600 font-medium',
//               footerActionText: 'text-gray-600',
//               formFieldRow: 'flex gap-4',
//               userButtonTrigger: 'focus:shadow-none'
//             }
//           }}
//         >
//           <CartProvider>
//             <Top_Header />
//             <Navbar />
//             <main className="min-h-[calc(100vh-160px)]">
//               {children}
//             </main>
//             <Footer />
//           </CartProvider>
//         </ClerkProvider>
//       </body>
//     </html>
//   );
// }
















































// import { ClerkProvider } from '@clerk/nextjs';
// import { CartProvider } from "@/app/context/CartContext"; // CartProvider import karein
// import type { Metadata } from "next";
// import localFont from "next/font/local";
// import "./globals.css";
// import Navbar from "@/components/Navbar";
// import Top_Header from "@/components/Top_Header";
// import Footer from "@/components/Footer";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//       >
//        <ClerkProvider
//   appearance={{
//     variables: {
//       colorPrimary: '#0d9488',
//       colorText: '#374151',
//       colorTextSecondary: '#6b7280',
//       colorInputText: '#1f2937',
//       fontSize: '1rem',
//     },
//     elements: {
//       // General Styles
//       formButtonPrimary: 'bg-teal-500 hover:bg-teal-600 text-white rounded-lg py-2.5',
//       formFieldInput: 'border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 px-4 py-2.5',
      
//       // Social Buttons
//       socialButtonsBlockButton: 'border-gray-300 hover:bg-gray-50 rounded-lg',
//       socialButtonsBlockButtonText: 'text-gray-700 font-medium',
//       socialButtonsBlockButtonArrow: 'text-teal-500',
      
//       // Form Structure
//       formFieldRow: 'flex gap-4',
//       formFieldFirstName: 'w-full',
//       formFieldLastName: 'w-full',
      
//       // Header Styles
//       headerTitle: 'text-2xl font-bold text-gray-800 text-center',
//       headerSubtitle: 'text-gray-600 text-center mb-6',
      
//       // Divider
//       dividerLine: 'bg-gray-300',
//       dividerText: 'text-gray-500 text-sm',
      
//       // Footer Links
//       footerActionLink: 'text-teal-500 hover:text-teal-600 font-medium',
//       footerActionText: 'text-gray-600'
      
//     }
//   }}
// >
//           <CartProvider> {/* CartProvider ko ClerkProvider ke andar wrap karein */}
//             <Top_Header />
//             <Navbar />
//             {children}
//             <Footer />
//           </CartProvider>
//         </ClerkProvider>
//       </body>
//     </html>
//   );
// }

// import { CartProvider } from "@/app/context/CartContext"; // Import CartProvider
// import type { Metadata } from "next";
// import localFont from "next/font/local";
// import "./globals.css";
// import Navbar from "@/components/Navbar";
// import Top_Header from "@/components/Top_Header";
// import Footer from "@/components/Footer";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//       >
//         <CartProvider>  {/* Wrap the entire layout with CartProvider */}
//           <Top_Header />
//           <Navbar />
//           {children}
//           <Footer />
//         </CartProvider>
//       </body>
//     </html>
//   );
// }

























































































































// import type { Metadata } from "next";
// import localFont from "next/font/local";
// import "./globals.css";
// import Navbar from "@/components/Navbar";
// import Top_Header from "@/components/Top_Header";
// import Footer from "@/components/Footer";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//       >
//         <Top_Header/>
//         <Navbar/>
       
        
//         {children}


//         <Footer/>
//       </body>
//     </html>
//   );
// }
