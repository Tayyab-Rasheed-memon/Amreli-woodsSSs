"use client";

import { SignUp } from "@clerk/nextjs";

const SignUpComponent = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100 text-center">
          Sign Up
        </h1>
        <SignUp
          path="/signup"
          routing="path"
          signInUrl="/signin" // Link to your Sign-In page
          redirectUrl="/dashboard" // Redirect after successful sign-up
          appearance={{
            variables: {
              colorPrimary: "#2563eb",
              colorBackground: "var(--background)",
            },
            layout: {
              logoPlacement: "none",
            },
          }}
        />
      </div>
    </div>
  );
};

export default SignUpComponent;
