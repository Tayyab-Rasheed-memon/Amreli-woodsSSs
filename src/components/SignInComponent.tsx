// SignInComponent.tsx
"use client";

import { SignIn } from "@clerk/nextjs";

const SignInComponent = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100 text-center">
          Login
        </h1>
        <SignIn
          path="/signin"
          routing="path"
          signUpUrl="/signup"
          redirectUrl="/dashboard"
          appearance={{
            variables: {
              colorPrimary: "#2563eb",
              colorBackground: "var(--background)",
            },
            elements: {
              formButtonPrimary: "w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700",
              socialButtonsBlockButton: "hidden", // Hide social login options
              formFieldInput: "w-full p-2 border rounded",
              formFieldInput__password: "mt-4",
            },
            layout: {
              logoPlacement: "none",
              socialButtonsPlacement: "bottom",
            },
          }}
        />
      </div>
    </div>
  );
};

export default SignInComponent;












// "use client";

// import { SignIn } from "@clerk/nextjs";

// const SignInComponent = () => {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
//       <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
//         <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100 text-center">
//           Sign In
//         </h1>
//         <SignIn
//           path="/signin"
//           routing="path"
//           signUpUrl="/signup" // Link to your Sign-Up page
//           redirectUrl="/dashboard" // Redirect after successful sign-in
//           appearance={{
//             variables: {
//               colorPrimary: "#2563eb",
//               colorBackground: "var(--background)",
//             },
//             layout: {
//               logoPlacement: "none",
//             },
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default SignInComponent;
    